import { Baby, Footprints, Gem, Shirt, SlidersHorizontal, UserRound } from "lucide-react";

const icons = {
  all: SlidersHorizontal,
  men: UserRound,
  women: Shirt,
  kids: Baby,
  shoes: Footprints,
  bags: Gem,
};

export default function CategoryFilter({ categories, activeCategory, locale, onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((category) => {
        const Icon = icons[category.id] || Shirt;
        const active = category.id === activeCategory;
        return (
          <button
            type="button"
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`inline-flex h-12 shrink-0 items-center gap-2 border px-5 text-xs font-bold uppercase transition ${
              active
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--ink)]"
            }`}
          >
            <Icon size={17} />
            {category.label[locale]}
          </button>
        );
      })}
    </div>
  );
}
