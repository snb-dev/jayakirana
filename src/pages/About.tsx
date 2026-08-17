import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  HandHeart,
  MapPin,
  MessageCircle,
  PackageCheck,
  Store,
  Users,
  Wrench,
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const stats = [
  { value: '1998', label: 'Serving since' },
  { value: '6', label: 'Departments' },
  { value: '1000s', label: 'Products stocked' },
  { value: '7 days', label: 'Open every week' },
];

const values = [
  {
    icon: BadgeCheck,
    title: 'Practical selection',
    text: 'We stock products that earn their place—useful for real jobs, not just the shelf.',
  },
  {
    icon: HandHeart,
    title: 'Honest help',
    text: 'Ask our team. We would rather point you to the right item than the priciest one.',
  },
  {
    icon: PackageCheck,
    title: 'Fair value',
    text: 'Clear prices, dependable brands, and offers that are genuinely worth it.',
  },
];

const departments = [
  { icon: Wrench, title: 'For the trade', text: 'Tools, consumables, and everyday workshop essentials.' },
  { icon: PackageCheck, title: 'For the project', text: 'Repairs, renovations, garden work, and upkeep.' },
  { icon: Store, title: 'For the home', text: 'Kitchen, electrical, and household products in one stop.' },
];

export default function About() {
  useDocumentTitle('About Us');

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 hero-grid opacity-25" />
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-orange/20 blur-3xl" />
        <div className="container-page relative py-16 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-orange-200">
            <MapPin size={14} className="text-brand-orange" /> Delgoda · Serving since 1998
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl">
            A neighbourhood hardware store, grown into a{' '}
            <span className="text-brand-orange">useful superstore.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
            Jayakirana has helped the people of Delgoda fix, build, and finish their projects for
            more than two decades—with the right products and a team that knows the aisle.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative mx-auto w-full max-w-[460px] lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-border bg-[#f6ead7] shadow-card">
              <img
                src={`${import.meta.env.BASE_URL}images/team/boss-avatar.jpg`}
                alt="The owner of Jayakirana"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">
              Our story
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-ink-primary sm:text-4xl">
              Built on local knowledge.
            </h2>
            <p className="mt-4 leading-7 text-ink-secondary">
              What began in 1998 as a small hardware shop on New Kandy Road has grown into one of
              Delgoda&apos;s most trusted destinations for tools, garden equipment, electrical goods,
              and home essentials.
            </p>
            <p className="mt-4 leading-7 text-ink-secondary">
              Through it all, the approach has stayed the same: stock products that work, price them
              fairly, and give honest advice. Walk in with a list—or just the problem you are trying
              to solve—and our team will help you find a practical answer.
            </p>
            <Link to="/contact" className="btn-primary mt-7">
              Get in touch <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white">
        <div className="container-page grid grid-cols-2 gap-6 border-y border-border py-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-black tracking-tight text-brand-orange sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-page py-16 sm:py-20">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">
            What we stand for
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-ink-primary sm:text-4xl">
            The way we like to help.
          </h2>
        </div>
        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-white p-6 shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-brand-orange">
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-ink-primary">{title}</h3>
              <p className="mt-2 leading-6 text-ink-secondary">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Departments */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-[28px] bg-brand-dark px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl" />
          <div className="relative">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">
              One store, many projects
            </span>
            <h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight text-white sm:text-4xl">
              Everything you need, under one roof.
            </h2>
            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {departments.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <Icon size={24} className="text-brand-orange" />
                  <h3 className="mt-5 font-extrabold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="grid items-center gap-8 rounded-[28px] border border-border bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">
              Visit Jayakirana
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink-primary">
              Come and say hello.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-ink-secondary">
              Visit the Delgoda store and speak with our team, or reach out before you travel.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link to="/contact" className="btn-primary whitespace-nowrap">
              Contact us <Users size={18} />
            </Link>
            <a href="https://wa.me/94771095633" className="btn-ghost whitespace-nowrap justify-center">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
