// widal te informa — blog editorial de lujo sobre WiMAX · por Cruz Muños Luis Vidal
// Enrutado con hash (compatible con un único index.html estático) y View Transitions API nativa.
import { useEffect } from "react";
import { createHashRouter, Link, Outlet, RouterProvider, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import PetalRain from "./components/PetalRain";
import { installChimeListener } from "./lib/audio";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import ArticlePage from "./pages/ArticlePage";
import About from "./pages/About";
import Contact from "./pages/Contact";

/** Estructura común: header, contenido con transición tipo "página de revista", footer y efectos globales */
function Layout() {
  const { pathname } = useLocation();

  // Vuelve al inicio al cambiar de página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Campanita de oro rosa al pasar sobre elementos importantes (solo si el usuario activó el sonido)
  useEffect(() => installChimeListener(), []);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded focus:bg-burgundy focus:px-4 focus:py-2 focus:text-ivory"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" key={pathname} className="page-enter">
        <Outlet />
      </main>
      <Footer />
      <PetalRain />
      <Cursor />
    </div>
  );
}

function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 pb-10 pt-44 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-2 text-5xl">Esta página se marchitó</h1>
      <p className="mt-4 text-lg italic">La ruta que buscas no existe en el jardín.</p>
      <Link to="/" className="btn-premium mt-8">Volver al inicio</Link>
    </section>
  );
}

const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:slug", element: <ArticlePage /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
