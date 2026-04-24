import { AtSign, Clock, MapPin, Phone } from "lucide-react";

export default function ContactInfo({ storeInfo, content, locale }) {
  const details = [
    {
      label: content.contact.address,
      value: storeInfo.address[locale],
      icon: MapPin,
    },
    {
      label: content.contact.phone,
      value: storeInfo.phone[locale],
      icon: Phone,
    },
    {
      label: content.contact.instagram,
      value: storeInfo.instagram,
      icon: AtSign,
    },
    {
      label: content.contact.line,
      value: storeInfo.lineContact,
      icon: AtSign,
    },
    {
      label: content.contact.hours,
      value: storeInfo.hours[locale],
      icon: Clock,
    },
  ];

  return (
    <section id="contact" className="border-t border-[var(--line)] bg-[var(--soft)] py-20 sm:py-24">
      <div className="mx-auto grid max-w-[92rem] gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="section-kicker">{content.contact.kicker}</p>
          <h2 className="section-title">{content.contact.title}</h2>
          <p className="mt-5 leading-8 text-[var(--muted)]">
            {content.contact.text}
          </p>
          <a
            href={storeInfo.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex h-12 items-center border border-[var(--ink)] px-5 text-xs font-bold uppercase text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            {content.contact.route}
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {details.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.label}
                className="border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm"
              >
                <div className="grid h-11 w-11 place-items-center bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon size={19} />
                </div>
                <p className="mt-5 text-sm font-bold uppercase tracking-normal text-[var(--muted)]">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-bold leading-7 text-[var(--ink)]">{item.value}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
