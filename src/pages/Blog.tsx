// Índice del blog: todas las publicaciones
import { articles } from "../data";
import ArticleCard from "../components/ArticleCard";
import { useReveal } from "../lib/motion";

export default function Blog() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="mx-auto max-w-7xl px-6 pb-10 pt-36 sm:px-10">
      <div className="mb-12 text-center">
        <p className="eyebrow">Colección completa</p>
        <h1 className="mt-2 text-5xl sm:text-6xl">El blog WiMAX</h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <div key={a.slug} data-reveal>
            <ArticleCard a={a} index={i + 1} />
          </div>
        ))}
      </div>
    </div>
  );
}
