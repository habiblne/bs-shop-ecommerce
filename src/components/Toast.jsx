import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          className="fixed bottom-5 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--paper)] px-5 py-3 text-sm font-bold text-[var(--ink)] shadow-2xl shadow-black/15"
        >
          <CheckCircle2 size={19} className="text-[var(--accent)]" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
