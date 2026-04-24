import { Quote, Star } from "lucide-react";

export default function Testimonials({ testimonials, storeInfo, content, locale }) {
  return (
    <section id="testimonials" className="bg-[var(--page)] py-20 sm:py-24">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">{content.reviews.kicker}</p>
            <h2 className="section-title">
              {storeInfo.rating}/5 {content.reviews.title} {storeInfo.reviewCount}{" "}
              {content.reviews.suffix}
            </h2>
          </div>
          <div className="flex gap-1 text-[var(--ink)]" aria-label={content.reviews.aria}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={20}
                className={index < 3 ? "fill-current" : "text-[var(--line)]"}
              />
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="border border-[var(--line)] bg-[var(--paper)] p-7 shadow-sm"
            >
              <Quote size={28} className="text-[var(--accent)]" />
              <p className="mt-6 text-lg leading-8 text-[var(--ink)]">"{item.quote[locale]}"</p>
              <div className="mt-8 border-t border-[var(--line)] pt-5">
                <p className="font-bold text-[var(--ink)]">{item.name}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.role[locale]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
