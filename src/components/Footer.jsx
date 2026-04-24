import { Camera, MessageCircle, Send } from "lucide-react";

export default function Footer({ storeInfo, content, categories, locale }) {
  const quickLinks = [
    { label: content.nav.collection, href: "#collection" },
    { label: content.nav.arrivals, href: "#new-arrivals" },
    { label: content.nav.instagram, href: "#instagram" },
    { label: content.nav.reviews, href: "#testimonials" },
    { label: content.nav.visit, href: "#contact" },
  ];

  return (
    <footer className="bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto grid max-w-[92rem] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <a href="#top" className="font-logo text-5xl font-semibold">
            {storeInfo.name}
          </a>
          <p className="mt-4 max-w-sm leading-7 text-[var(--paper)]/65">
            {content.footer.text}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-normal text-[var(--paper)]/50">
            {content.footer.links}
          </h3>
          <div className="mt-4 grid gap-2">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--paper)]/70 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-normal text-[var(--paper)]/50">
            {content.footer.categories}
          </h3>
          <div className="mt-4 grid gap-2">
            {categories
              .filter((category) => category.id !== "all")
              .map((category) => (
                <a
                  key={category.id}
                  href="#collection"
                  className="text-sm text-[var(--paper)]/70 transition hover:text-white"
                >
                  {category.label[locale]}
                </a>
              ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-normal text-[var(--paper)]/50">
            {content.footer.social}
          </h3>
          <div className="mt-4 flex gap-3">
            {[Camera, MessageCircle, Send].map((Icon, index) => (
              <a
                key={index}
                href={index === 0 ? storeInfo.instagramUrl : "#top"}
                target={index === 0 ? "_blank" : undefined}
                rel={index === 0 ? "noreferrer" : undefined}
                className="grid h-10 w-10 place-items-center border border-white/15 text-[var(--paper)]/75 transition hover:border-white hover:text-white"
                aria-label={`${content.footer.social} BS SHOP`}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-[var(--paper)]/55 sm:px-6 lg:px-8">
        Copyright {storeInfo.name}. {content.footer.copyright}
      </div>
    </footer>
  );
}
