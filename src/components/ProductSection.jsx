import { AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import CategoryFilter from "./CategoryFilter.jsx";
import ProductCard from "./ProductCard.jsx";

export default function ProductSection({
  categories,
  products,
  content,
  locale,
  activeCategory,
  searchQuery,
  loading,
  isUsingFallback,
  favorites,
  onCategoryChange,
  onSearchChange,
  onAddToCart,
  onToggleFavorite,
}) {
  return (
    <section id="collection" className="bg-[var(--page)] py-20 sm:py-24">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">{content.collection.kicker}</p>
            <h2 className="section-title">{content.collection.title}</h2>
          </div>
          <label className="relative block w-full lg:w-[24rem]">
            <Search
              size={19}
              className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
            />
            <input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={content.collection.search}
              className="h-14 w-full border border-[var(--line)] bg-[var(--paper)] ps-12 pe-5 text-sm font-semibold text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--ink)]"
            />
          </label>
        </div>

        <div className="mt-8">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            locale={locale}
            onSelect={onCategoryChange}
          />
        </div>

        {isUsingFallback && (
          <p className="mt-5 border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm font-semibold text-[var(--muted)]">
            {content.collection.fallback}
          </p>
        )}

        {loading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[3/4] bg-[var(--soft)]" />
                <div className="mt-4 h-4 w-2/3 bg-[var(--soft)]" />
                <div className="mt-3 h-4 w-1/3 bg-[var(--soft)]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
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
            </AnimatePresence>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="mt-10 rounded-lg border border-dashed border-[var(--line)] bg-[var(--paper)] p-10 text-center">
            <p className="font-logo text-2xl font-semibold text-[var(--ink)]">
              {content.collection.emptyTitle}
            </p>
            <p className="mt-2 text-[var(--muted)]">{content.collection.emptyText}</p>
          </div>
        )}
      </div>
    </section>
  );
}
