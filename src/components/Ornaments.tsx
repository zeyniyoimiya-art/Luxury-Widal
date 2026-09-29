// Ornamentos geométricos de inspiración azteca, muy estilizados (arte decorativo de lujo, nunca folclórico literal)

/** Flor estilizada de ocho pétalos (icono del "Dato Azteca") */
export function Flower({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        {[0, 45, 90, 135].map((r) => (
          <ellipse key={r} cx="24" cy="24" rx="4.6" ry="19" transform={`rotate(${r} 24 24)`} />
        ))}
        <circle cx="24" cy="24" r="4" fill="currentColor" />
      </g>
    </svg>
  );
}

/** Sol estilizado: círculo con rayos escalonados */
export function Sun({ size = 34, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="24" cy="24" r="8" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d="M24 4v6" transform={`rotate(${i * 30} 24 24)`} strokeLinecap="square" />
        ))}
      </g>
    </svg>
  );
}

/** Greca escalonada: pieza suelta */
export function Greca({ size = 34, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M6 42V6h36v26H18V18h16" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Separador entre secciones: greca – flor – greca */
export function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 text-rose-gold ${className}`} role="separator" aria-hidden="true">
      <div className="greca-band flex-1" />
      <Flower size={26} />
      <Sun size={26} />
      <Flower size={26} />
      <div className="greca-band flex-1" />
    </div>
  );
}
