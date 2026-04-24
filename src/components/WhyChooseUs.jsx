import { CreditCard, PackageCheck, RotateCcw, ShieldCheck } from "lucide-react";

const icons = [PackageCheck, ShieldCheck, CreditCard, RotateCcw];

export default function WhyChooseUs({ content }) {
  return (
    <section className="border-y border-[var(--line)] bg-[var(--soft)] py-20 sm:py-24">
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-kicker">{content.benefits.kicker}</p>
          <h2 className="section-title">{content.benefits.title}</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.benefits.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <article
                key={item.title}
                className="border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm"
              >
                <div className="grid h-12 w-12 place-items-center bg-[var(--ink)] text-[var(--paper)]">
                  <Icon size={20} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-[var(--ink)]">{item.title}</h3>
                <p className="mt-3 leading-7 text-[var(--muted)]">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
