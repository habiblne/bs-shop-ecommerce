import { Mail } from "lucide-react";
import { useState } from "react";

export default function Newsletter({ content, onSubscribed }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    onSubscribed();
    setEmail("");
  };

  return (
    <section className="bg-[var(--page)] px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
      <div className="mx-auto max-w-[92rem] overflow-hidden border border-[var(--line)] bg-[var(--ink)] text-[var(--paper)]">
        <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_0.95fr] lg:p-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-[var(--paper)]/60">
              {content.newsletter.kicker}
            </p>
            <h2 className="mt-3 font-logo text-4xl font-semibold uppercase leading-tight sm:text-5xl">
              {content.newsletter.title}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="self-end">
            <label className="relative block">
              <Mail
                size={19}
                className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-[var(--paper)]/55"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={content.newsletter.placeholder}
                className="h-14 w-full rounded-full border border-white/20 bg-white/10 ps-12 pe-36 text-sm font-semibold text-white outline-none placeholder:text-white/55 focus:border-white"
              />
              <button
                type="submit"
                className="absolute end-1.5 top-1.5 h-11 rounded-full bg-[var(--accent)] px-5 text-sm font-bold text-white transition hover:brightness-110"
              >
                {content.newsletter.button}
              </button>
            </label>
          </form>
        </div>
      </div>
    </section>
  );
}
