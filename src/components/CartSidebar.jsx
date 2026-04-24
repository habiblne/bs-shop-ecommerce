import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

const formatPrice = (price) => `${price.toLocaleString("fr-DZ")} DA`;

export default function CartSidebar({
  isOpen,
  cartItems,
  content,
  locale,
  total,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label={content.cart.closeOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-[var(--line)] bg-[var(--page)] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--line)] p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center bg-[var(--ink)] text-[var(--paper)]">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--ink)]">{content.cart.title}</h2>
                  <p className="text-sm text-[var(--muted)]">
                    {cartItems.length} {content.cart.types}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center border border-[var(--line)] text-[var(--ink)]"
                aria-label={content.cart.close}
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cartItems.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <div className="mx-auto grid h-16 w-16 place-items-center bg-[var(--soft)] text-[var(--ink)]">
                      <ShoppingBag size={24} />
                    </div>
                    <p className="mt-5 font-logo text-2xl font-semibold text-[var(--ink)]">
                      {content.cart.emptyTitle}
                    </p>
                    <p className="mt-2 text-[var(--muted)]">
                      {content.cart.emptyText}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  {cartItems.map((item) => (
                    <article
                      key={item.id}
                      className="grid grid-cols-[5rem_1fr] gap-4 border border-[var(--line)] bg-[var(--paper)] p-3"
                    >
                      <div
                        className="aspect-square"
                        style={{ background: item.gradient }}
                        aria-hidden="true"
                      />
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold leading-tight text-[var(--ink)]">
                              {item.name[locale]}
                            </h3>
                            <p className="mt-1 text-sm text-[var(--muted)]">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemove(item.id)}
                            className="grid h-8 w-8 place-items-center rounded-full text-[var(--muted)] transition hover:bg-[var(--soft)] hover:text-[var(--ink)]"
                            aria-label={`${content.cart.remove} ${item.name[locale]}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[var(--line)]">
                            <button
                              type="button"
                              onClick={() => onDecrement(item.id)}
                              className="grid h-9 w-9 place-items-center text-[var(--ink)]"
                              aria-label={`${content.cart.decrease} ${item.name[locale]}`}
                            >
                              <Minus size={15} />
                            </button>
                            <span className="grid h-9 min-w-9 place-items-center text-sm font-bold text-[var(--ink)]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onIncrement(item.id)}
                              className="grid h-9 w-9 place-items-center text-[var(--ink)]"
                              aria-label={`${content.cart.increase} ${item.name[locale]}`}
                            >
                              <Plus size={15} />
                            </button>
                          </div>
                          <p className="font-bold text-[var(--ink)]">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[var(--line)] p-5">
              <div className="mb-4 flex items-center justify-between text-lg font-bold text-[var(--ink)]">
                <span>{content.cart.total}</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button
                type="button"
                className="h-14 w-full bg-[var(--accent)] text-xs font-bold uppercase text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={cartItems.length === 0}
              >
                {content.cart.checkout}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
