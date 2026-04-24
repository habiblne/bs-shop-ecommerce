import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Search, ShoppingBag, Sun, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({
  cartCount,
  storeInfo,
  content,
  locale,
  isArabic,
  isDark,
  onCartOpen,
  onThemeToggle,
  onLocaleToggle,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const navLinks = [
    { label: content.nav.collection, href: "#collection" },
    { label: content.nav.arrivals, href: "#new-arrivals" },
    { label: content.nav.instagram, href: "#instagram" },
    { label: content.nav.reviews, href: "#testimonials" },
    { label: content.nav.visit, href: "#contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-transparent">
      <nav className="mx-auto flex h-20 max-w-[92rem] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="group inline-flex items-end gap-3" onClick={closeMenu}>
          <span className="font-logo text-4xl font-semibold leading-none text-[var(--ink)] sm:text-5xl">
            {storeInfo.name}
          </span>
          <span className="mb-1 hidden text-xs font-bold uppercase tracking-normal text-[var(--muted)] sm:block">
            {storeInfo.city[locale]}
          </span>
        </a>

        <div className="hidden items-center gap-8 bg-[var(--nav-bg)] px-4 py-3 backdrop-blur-xl md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase text-[var(--muted)] transition hover:text-[var(--ink)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#collection"
            className="hidden h-11 w-11 place-items-center bg-[var(--nav-bg)] text-[var(--ink)] backdrop-blur-xl transition hover:bg-[var(--paper)] lg:grid"
            aria-label={content.nav.search}
          >
            <Search size={18} />
          </a>
          <button
            type="button"
            onClick={onLocaleToggle}
            className="grid h-11 min-w-11 place-items-center bg-[var(--nav-bg)] px-3 text-xs font-bold uppercase text-[var(--ink)] backdrop-blur-xl transition hover:bg-[var(--paper)]"
            aria-label={content.nav.language}
            lang={isArabic ? "en" : "ar"}
          >
            {content.nav.language}
          </button>
          <button
            type="button"
            onClick={onThemeToggle}
            className="grid h-11 w-11 place-items-center bg-[var(--nav-bg)] text-[var(--ink)] backdrop-blur-xl transition hover:bg-[var(--paper)]"
            aria-label={content.nav.theme}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={onCartOpen}
            className="relative grid h-11 w-11 place-items-center bg-[var(--ink)] text-[var(--paper)] transition hover:-translate-y-0.5"
            aria-label={content.nav.cart}
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center bg-[var(--accent)] px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center bg-[var(--nav-bg)] text-[var(--ink)] backdrop-blur-xl md:hidden"
            aria-label={content.nav.menu}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[var(--line)] bg-[var(--page)] md:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-2 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="px-4 py-3 text-sm font-bold uppercase text-[var(--ink)] transition hover:bg-[var(--soft)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
