// Página de artículo: /blog/:slug
import { Link, useParams } from "react-router-dom";
import { bySlug } from "../data";
import ArticleView from "../components/ArticleView";

export default function ArticlePage() {
  const { slug = "" } = useParams();
  const article = bySlug(slug);

  if (!article) {
    return (
      <section className="mx-auto max-w-2xl px-6 pb-10 pt-40 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-2 text-5xl">Artículo no encontrado</h1>
        <Link to="/" className="btn-premium mt-8">Volver al inicio</Link>
      </section>
    );
  }
  return <ArticleView article={article} />;
}
