import { motion } from "framer-motion";
import { Heart, Plus, Star } from "lucide-react";

const formatPrice = (price) => `${price.toLocaleString("fr-DZ")} DA`;

export default function ProductCard({
  product,
  categories,
  content,
  locale,
  isFavorite,
  onAddToCart,
  onToggleFavorite,
}) {
  const category = categories.find((item) => item.id === product.category);
  const productName = product.name[locale];
  const categoryLabel = category?.label?.[locale] || product.categoryName?.[locale] || product.category;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group overflow-hidden bg-transparent transition"
    >
      <div className="relative overflow-hidden">
        <div
          className="relative aspect-[3/4] overflow-hidden"
          style={{ background: product.gradient }}
        >
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={productName}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 editorial-grain opacity-60" />
          )}
          <div className="absolute left-4 top-4 bg-white/85 px-3 py-1 text-[10px] font-bold uppercase text-neutral-900 backdrop-blur">
            {product.tag[locale]}
          </div>
          <button
            type="button"
            onClick={() => onToggleFavorite(product.id)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center bg-white/85 text-neutral-950 backdrop-blur transition hover:scale-105"
            aria-label={`${content.product.favorite} ${productName}`}
          >
            <Heart
              size={19}
              className={isFavorite ? "fill-[var(--accent)] text-[var(--accent)]" : ""}
            />
          </button>
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/25 bg-black/10 p-5 text-white backdrop-blur-[2px]">
            <div className="h-20 border border-white/25 bg-white/10" />
          </div>
        </div>
      </div>

      <div className="space-y-4 pb-5 pt-4">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-normal text-[var(--muted)]">
              {categoryLabel}
            </p>
            <h3 className="mt-1 text-sm font-bold uppercase leading-tight text-[var(--ink)]">
              {productName}
            </h3>
          </div>
          <p className="shrink-0 text-sm font-bold text-[var(--ink)]">
            {formatPrice(product.price)}
            {product.oldPrice && (
              <span className="ms-2 text-xs text-[var(--muted)] line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1 bg-transparent text-sm font-bold text-[var(--ink)]">
            <Star size={15} className="fill-[#d7a63c] text-[#d7a63c]" />
            {product.rating}
          </div>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="inline-flex h-10 items-center justify-center gap-2 border border-[var(--ink)] px-4 text-[11px] font-bold uppercase text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            <Plus size={17} />
            {content.product.add}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
