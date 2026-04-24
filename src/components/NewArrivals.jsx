import ProductCard from "./ProductCard.jsx";

export default function NewArrivals({
  products,
  categories,
  content,
  locale,
  favorites,
  onAddToCart,
  onToggleFavorite,
}) {
  return (
    <section id="new-arrivals" className="bg-[var(--page)] py-20 sm:py-24">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">{content.arrivals.kicker}</p>
            <h2 className="section-title">{content.arrivals.title}</h2>
          </div>
          <a
            href="#collection"
            className="inline-flex h-12 w-fit items-center border border-[var(--line)] px-5 text-xs font-bold uppercase text-[var(--ink)] transition hover:border-[var(--ink)]"
          >
            {content.arrivals.cta}
          </a>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categories={categories}
              content={content}
              locale={locale}
              isFavorite={favorites.includes(product.id)}
              onAddToCart={onAddToCart}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
