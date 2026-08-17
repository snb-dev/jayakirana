import { useState } from 'react';
import { Clock, Facebook, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const WHATSAPP_NUMBER = '94771095633';

const details = [
  {
    icon: MapPin,
    title: 'Visit the store',
    lines: ['No. 397, New Kandy Road,', 'Delgoda, Gampaha 11700, Sri Lanka'],
    href: 'https://maps.google.com/?q=Jayakirana+Delgoda',
    action: 'Get directions',
  },
  {
    icon: Phone,
    title: 'Call us',
    lines: ['+94 77 109 5633'],
    href: 'tel:+94771095633',
    action: 'Call now',
  },
  {
    icon: Mail,
    title: 'Email us',
    lines: ['jayakiranalk@gmail.com'],
    href: 'mailto:jayakiranalk@gmail.com',
    action: 'Send an email',
  },
  {
    icon: Clock,
    title: 'Opening hours',
    lines: ['Mon–Sat: 8am–6pm', 'Sun: 9am–2pm'],
  },
];

export default function Contact() {
  useDocumentTitle('Contact Us');
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      'Hello Jayakirana,',
      form.name && `My name is ${form.name}.`,
      form.message,
      form.phone && `You can reach me on ${form.phone}.`,
    ]
      .filter(Boolean)
      .join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 hero-grid opacity-25" />
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-orange/20 blur-3xl" />
        <div className="container-page relative py-16 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-orange-200">
            <MessageCircle size={14} className="text-brand-orange" /> We are happy to help
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl">
            Get in touch with <span className="text-brand-orange">Jayakirana.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
            Send us your list before you travel, ask about stock, or just say hello. Reach us by
            phone, email, WhatsApp, or the form below.
          </p>
        </div>
      </section>

      {/* Details + form */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* details */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {details.map(({ icon: Icon, title, lines, href, action }) => (
                <div key={title} className="rounded-2xl border border-border bg-white p-6 shadow-card">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-50 text-brand-orange">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 font-extrabold text-ink-primary">{title}</h3>
                  <div className="mt-1.5 text-sm leading-6 text-ink-secondary">
                    {lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  {href && action && (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-orange hover:underline"
                    >
                      {action} →
                    </a>
                  )}
                </div>
              ))}
            </div>

            <a
              href="https://www.facebook.com/jayakiranapvtltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-5 py-3 text-sm font-bold text-ink-primary shadow-card transition-colors hover:border-brand-orange hover:text-brand-orange"
            >
              <Facebook size={18} /> Follow us on Facebook
            </a>
          </div>

          {/* form */}
          <div className="rounded-[28px] border border-border bg-white p-7 shadow-card sm:p-9">
            <h2 className="text-2xl font-black tracking-tight text-ink-primary">Send us a message</h2>
            <p className="mt-2 text-sm leading-6 text-ink-secondary">
              Fill this in and we will open WhatsApp with your message ready to send.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink-primary">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="e.g. Nimal Perera"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-ink-primary">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="e.g. 077 123 4567"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink-primary">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={update('message')}
                  rows={5}
                  placeholder="Tell us what you are looking for…"
                  className="input-field resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                <Send size={18} /> Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <div className="overflow-hidden rounded-[28px] border border-border shadow-card">
            <iframe
              title="Jayakirana store location"
              src="https://www.google.com/maps?q=Jayakirana+Delgoda&output=embed"
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
