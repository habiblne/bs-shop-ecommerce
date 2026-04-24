import { motion } from "framer-motion";
import { ArrowRight, AtSign, MapPin, Star } from "lucide-react";

export default function Hero({ storeInfo, content, locale }) {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden bg-[var(--hero-bg)]">
      <div className="absolute inset-0 editorial-grid opacity-70" />
      <div className="absolute left-4 top-28 hidden text-[13rem] font-black leading-none text-[var(--ink)]/[0.025] lg:block">
        01
      </div>
      <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block">
        <FashionEditorial content={content} />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-[92rem] items-center px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl pt-8"
        >
          <div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase text-[var(--muted)]">
            <span>{storeInfo.type[locale]}</span>
            <span className="h-px w-10 bg-[var(--ink)]/30" />
            <span className="inline-flex items-center gap-1">
              <Star size={14} className="fill-[var(--ink)] text-[var(--ink)]" />
              {storeInfo.rating} ({storeInfo.reviewCount})
            </span>
            <span className="inline-flex items-center gap-1">
              <AtSign size={14} />
              {storeInfo.instagram}
            </span>
          </div>
          <h1 className="max-w-5xl font-logo text-7xl font-semibold uppercase leading-[0.75] text-[var(--ink)] sm:text-9xl lg:text-[11rem] xl:text-[13rem]">
            {storeInfo.name}
          </h1>
          <p className="mt-8 max-w-2xl text-xl uppercase leading-8 text-[var(--ink)] sm:text-2xl">
            {content.hero.subtitle}
          </p>
          <p className="mt-5 flex max-w-2xl items-start gap-2 text-sm font-semibold leading-7 text-[var(--muted)] sm:text-base">
            <MapPin size={18} className="mt-1 shrink-0" />
            {storeInfo.address[locale]}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#collection"
              className="inline-flex h-14 items-center justify-center gap-2 bg-[var(--ink)] px-7 text-xs font-bold uppercase text-[var(--paper)] transition hover:-translate-y-0.5"
            >
              {content.hero.collection}
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex h-14 items-center justify-center border border-[var(--ink)] px-7 text-xs font-bold uppercase text-[var(--ink)] transition hover:-translate-y-0.5 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              {content.hero.route}
            </a>
          </div>
          <div className="mt-12 grid max-w-2xl gap-3 border-y border-[var(--line)] py-5 text-sm font-semibold uppercase text-[var(--muted)] sm:grid-cols-3">
            <span>{storeInfo.hours[locale]}</span>
            <span>{content.hero.badgeOne}</span>
            <span>{content.hero.badgeTwo}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FashionEditorial({ content }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
      className="relative h-full"
      aria-hidden="true"
    >
      <div className="absolute bottom-0 right-8 top-24 w-[58%] bg-[linear-gradient(160deg,#f4f4f2_0%,#8c8c88_42%,#111111_100%)]" />
      <div className="absolute bottom-16 right-[32%] top-40 w-[30%] border border-white/50 bg-[linear-gradient(160deg,#111111_0%,#55534f_55%,#f7f7f5_100%)]" />
      <div className="absolute bottom-24 right-10 w-80 border border-[var(--line)] bg-[var(--paper)] p-6 shadow-2xl shadow-black/12">
        <p className="text-xs font-bold uppercase text-[var(--muted)]">
          {content.hero.dropLabel}
        </p>
        <p className="mt-3 font-logo text-5xl font-semibold leading-none text-[var(--ink)]">
          00:00
        </p>
        <p className="mt-3 text-sm font-semibold text-[var(--muted)]">
          {content.hero.dropText}
        </p>
      </div>
      <div className="absolute right-[24rem] top-20 h-24 w-24 border border-[var(--ink)]/20 bg-[var(--paper)]/70 backdrop-blur" />
      <div className="absolute bottom-12 right-[26rem] h-32 w-48 border border-[var(--ink)]/20 bg-[var(--paper)]/40 backdrop-blur" />
    </motion.div>
  );
}
