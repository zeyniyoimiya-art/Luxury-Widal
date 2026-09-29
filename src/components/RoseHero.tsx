// Rosa 3D de oro rosa que florece al cargar la página (Three.js · WebGL).
//  · Pétalos procedurales con degradado de vértices y material metálico PBR (MeshPhysicalMaterial + entorno)
//  · Al terminar la floración, pétalos se desprenden y flotan en el aire
//  · Parallax con el puntero · prefers-reduced-motion: rosa estática, ya florecida, sin bucle
//  · Si WebGL no está disponible: fallback con flor SVG estilizada
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Flower } from "./Ornaments";
import { reducedMotion } from "../lib/motion";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/** Geometría de un pétalo: ancho w, largo l, copa (cup) y curvatura del borde superior (curl) */
function makePetalGeometry(w: number, l: number, cup: number, curl: number): THREE.BufferGeometry {
  const g = new THREE.PlaneGeometry(w, l, 10, 14);
  g.translate(0, l / 2, 0);
  const pos = g.attributes.position as THREE.BufferAttribute;
  const colors = new Float32Array(pos.count * 3);
  const deep = new THREE.Color("#8a4653");
  const mid = new THREE.Color("#d49a9a");
  const tip = new THREE.Color("#f3cdbf");
  const tmp = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const x0 = pos.getX(i);
    const y = pos.getY(i);
    const t = y / l;
    const u = x0 / (w / 2);
    // Perfil de ancho: estrecho en la base, redondeado en la punta
    const prof = Math.pow(Math.sin(Math.PI * (0.08 + 0.84 * t)), 0.55);
    pos.setX(i, u * (w / 2) * prof * 1.12);
    // Copa (bordes hacia dentro) y borde superior curvado hacia fuera
    pos.setZ(i, cup * u * u * prof * (0.4 + t) - curl * Math.pow(t, 3) * l);
    // Degradado de color: base profunda → oro rosa → champán en el borde
    if (t < 0.5) tmp.copy(deep).lerp(mid, t * 2);
    else tmp.copy(mid).lerp(tip, (t - 0.5) * 2);
    colors.set([tmp.r, tmp.g, tmp.b], i * 3);
  }
  g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return g;
}

interface RosePetal {
  pivot: THREE.Object3D;
  mesh: THREE.Mesh;
  a: number;
  r: number;
  y: number;
  tc: number;
  to: number;
  delay: number;
}
interface Faller {
  mesh: THREE.Mesh;
  vy: number;
  drift: number;
  sp: number;
  ph: number;
  rx: number;
  ry: number;
  startAt: number;
}

// Capas de pétalos: de dentro hacia fuera
const LAYERS = [
  { n: 3, r: 0.02, l: 0.55, w: 0.46, y: 0.12, tc: 0.14, to: -0.06 },
  { n: 4, r: 0.07, l: 0.7, w: 0.62, y: 0.08, tc: 0.08, to: -0.2 },
  { n: 5, r: 0.14, l: 0.85, w: 0.8, y: 0.04, tc: 0.02, to: -0.42 },
  { n: 6, r: 0.24, l: 1.0, w: 0.96, y: 0.0, tc: -0.08, to: -0.72 },
  { n: 7, r: 0.34, l: 1.15, w: 1.12, y: -0.04, tc: -0.15, to: -1.0 },
  { n: 8, r: 0.46, l: 1.25, w: 1.22, y: -0.08, tc: -0.25, to: -1.28 },
];
const BLOOM_DURATION = 2.5;

export default function RoseHero({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const still = reducedMotion();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0.35, 6.6);
    camera.lookAt(0, 0.15, 0);

    // Entorno de reflejos (estudio) para que el metal se vea como oro rosa pulido
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    const key = new THREE.DirectionalLight(0xffe3d0, 1.6);
    key.position.set(2.5, 3.5, 4);
    scene.add(key);
    scene.add(new THREE.HemisphereLight(0xfff1e6, 0x8a4653, 0.6));

    // Material metálico de oro rosa
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      vertexColors: true,
      metalness: 0.95,
      roughness: 0.3,
      clearcoat: 0.55,
      clearcoatRoughness: 0.22,
      envMapIntensity: 1.3,
      side: THREE.DoubleSide,
    });

    // Construcción de la rosa
    const rose = new THREE.Group();
    rose.rotation.x = 0.72;
    scene.add(rose);
    const geoms: THREE.BufferGeometry[] = [];
    const petals: RosePetal[] = [];
    LAYERS.forEach((L, li) => {
      const geo = makePetalGeometry(L.w, L.l, 0.32 - li * 0.02, 0.28 + li * 0.05);
      geoms.push(geo);
      for (let i = 0; i < L.n; i++) {
        const a = (i / L.n) * Math.PI * 2 + li * 0.62 + (Math.random() - 0.5) * 0.15;
        const pivot = new THREE.Object3D();
        pivot.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a));
        const mesh = new THREE.Mesh(geo, material);
        pivot.add(mesh);
        rose.add(pivot);
        petals.push({
          pivot, mesh, a, r: L.r, y: L.y, tc: L.tc, to: L.to + (Math.random() - 0.5) * 0.1,
          delay: 0.3 + (LAYERS.length - 1 - li) * 0.22 + Math.random() * 0.08,
        });
      }
    });

    // Pétalos que se desprenden y flotan
    const fGeo = makePetalGeometry(0.2, 0.3, 0.1, 0.2);
    geoms.push(fGeo);
    const fallers: Faller[] = [];
    const reset = (f: Faller, initial: boolean) => {
      const ang = Math.random() * Math.PI * 2;
      const rad = 0.3 + Math.random() * 0.9;
      f.mesh.position.set(Math.cos(ang) * rad, initial ? 0.4 + Math.random() * 0.6 : 1.6 + Math.random() * 0.8, Math.sin(ang) * rad * 0.6);
      f.mesh.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    };
    if (!still) {
      for (let i = 0; i < 26; i++) {
        const mesh = new THREE.Mesh(fGeo, material);
        const f: Faller = {
          mesh,
          vy: 0.16 + Math.random() * 0.22,
          drift: (Math.random() - 0.5) * 0.25,
          sp: 0.6 + Math.random() * 1.1,
          ph: Math.random() * 6,
          rx: (Math.random() - 0.5) * 1.6,
          ry: (Math.random() - 0.5) * 1.6,
          startAt: 2.8 + i * 0.16,
        };
        reset(f, true);
        mesh.visible = false;
        scene.add(mesh);
        fallers.push(f);
      }
    }

    // Aplica el estado de floración en el instante `time`
    const applyBloom = (time: number) => {
      for (const p of petals) {
        const k = ease(clamp01((time - p.delay) / BLOOM_DURATION));
        const rad = lerp(p.r * 0.35, p.r, k);
        p.pivot.position.set(Math.cos(p.a) * rad, p.y, Math.sin(p.a) * rad);
        p.mesh.rotation.x = lerp(p.tc, p.to, k);
        p.pivot.scale.setScalar(lerp(0.86, 1, k));
      }
    };

    // Tamaño responsivo
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (still) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    // Parallax con el puntero
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 0.7;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 0.35;
    };

    let raf = 0;
    if (still) {
      applyBloom(99); // rosa completamente florecida y estática
      renderer.render(scene, camera);
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      const clock = new THREE.Clock();
      let last = 0;
      const loop = () => {
        const t = clock.getElapsedTime();
        const dt = Math.min(0.05, t - last);
        last = t;
        applyBloom(t);
        cx += (tx - cx) * 0.05;
        cy += (ty - cy) * 0.05;
        rose.rotation.y = t * 0.16 + cx;
        rose.rotation.x = 0.72 + cy;
        for (const f of fallers) {
          if (t < f.startAt) continue;
          f.mesh.visible = true;
          const m = f.mesh;
          m.position.y -= f.vy * dt;
          m.position.x += (Math.sin(t * f.sp + f.ph) * 0.35 + f.drift) * dt;
          m.position.z += Math.cos(t * f.sp * 0.8 + f.ph) * 0.12 * dt;
          m.rotation.x += f.rx * dt;
          m.rotation.y += f.ry * dt;
          m.scale.setScalar(Math.min(1, (t - f.startAt) * 1.4));
          if (m.position.y < -2.3) reset(f, false);
        }
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      geoms.forEach((g) => g.dispose());
      material.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  if (failed) {
    return (
      <div className={`grid place-items-center text-rose-gold ${className}`} role="img" aria-label="Flor estilizada de oro rosa">
        <Flower size={220} />
      </div>
    );
  }
  return (
    <div
      ref={mountRef}
      className={className}
      role="img"
      aria-label="Rosa tridimensional de oro rosa que florece, con pétalos que flotan en el aire"
    />
  );
}
