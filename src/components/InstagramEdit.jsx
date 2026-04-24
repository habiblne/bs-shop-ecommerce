import { ArrowUpRight, AtSign } from "lucide-react";

export default function InstagramEdit({ storeInfo, content, locale }) {
  return (
    <section id="instagram" className="border-y border-[var(--line)] bg-[var(--page)]">
      <div className="mx-auto grid max-w-[92rem] gap-0 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <div className="border-b border-[var(--line)] py-12 lg:border-b-0 lg:border-r lg:py-16 lg:pr-10">
          <p className="section-kicker">{content.instagram.kicker}</p>
          <h2 className="mt-3 font-logo text-6xl font-semibold uppercase leading-[0.82] text-[var(--ink)] sm:text-7xl">
            {storeInfo.instagram}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm font-bold uppercase text-[var(--muted)]">
            <span>
              <strong className="block text-2xl text-[var(--ink)]">
                {storeInfo.instagramPosts}
              </strong>
              {content.instagram.posts}
            </span>
            <span>
              <strong className="block text-2xl text-[var(--ink)]">
                {storeInfo.instagramFollowers}
              </strong>
              {content.instagram.followers}
            </span>
          </div>
          <a
            href={storeInfo.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex h-12 items-center gap-2 border border-[var(--ink)] px-5 text-xs font-bold uppercase text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            <AtSign size={16} />
            {content.instagram.cta}
          </a>
        </div>

        <div className="grid sm:grid-cols-3">
          {storeInfo.instagramFocus.map((item, index) => (
            <article
              key={item.en}
              className="min-h-72 border-b border-[var(--line)] p-6 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:min-h-96"
            >
              <p className="text-xs font-bold uppercase text-[var(--muted)]">
                0{index + 1}
              </p>
              <div className="mt-10 aspect-[3/4] bg-[var(--soft)]">
                <div
                  className="h-full w-full editorial-grain"
                  style={{
                    background:
                      index === 0
                        ? "linear-gradient(145deg,#080808 0%,#4d4a43 54%,#f8f7f3 100%)"
                        : index === 1
                          ? "linear-gradient(145deg,#ffffff 0%,#d7d4cf 44%,#101010 100%)"
                          : "linear-gradient(145deg,#141414 0%,#88847b 52%,#f6f3ec 100%)",
                  }}
                />
              </div>
              <h3 className="mt-5 text-sm font-bold uppercase text-[var(--ink)]">
                {item[locale]}
              </h3>
            </article>
          ))}
        </div>

        <div className="border-t border-[var(--line)] py-7 lg:col-span-2">
          <div className="flex flex-col gap-4 text-sm font-semibold text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
            <p>
              {content.instagram.bio}{" "}
              <span className="font-bold text-[var(--ink)]">{storeInfo.lineContact}</span>.
            </p>
            <a
              href={storeInfo.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[var(--ink)]"
            >
              {content.instagram.drops}
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
