import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function PromoBanner({ content }) {
  return (
    <section className="bg-[var(--page)] px-4 py-4 sm:px-6 lg:px-8">
      <motion.a
        href="#collection"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto flex max-w-[92rem] flex-col gap-5 overflow-hidden bg-[var(--ink)] p-7 text-[var(--paper)] shadow-2xl shadow-black/15 sm:flex-row sm:items-center sm:justify-between sm:p-9"
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-white/70">
            {content.promo.kicker}
          </p>
          <h2 className="mt-2 font-logo text-5xl font-semibold uppercase leading-[0.85] sm:text-7xl">
            {content.promo.title}
          </h2>
        </div>
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center border border-white/25 bg-white text-neutral-950">
          <ArrowUpRight size={22} />
        </span>
      </motion.a>
    </section>
  );
}
