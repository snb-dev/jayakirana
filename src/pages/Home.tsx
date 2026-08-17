import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Hand,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Store,
  Truck,
  Wrench,
} from 'lucide-react';
import { categories, categoryColors, products } from '../data/products';
import { testimonials } from '../data/testimonials';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';
import CategoryIcon from '../components/CategoryIcon';
import StarRating from '../components/StarRating';

const AvatarScene = lazy(() => import('../components/AvatarScene'));

const bestSellers = products.filter((product) => product.badge === 'Best Seller').slice(0, 4);
const saleProducts = products.filter((product) => product.badge === 'Sale').slice(0, 4);
const featured = [...saleProducts, ...bestSellers];

const assurances = [
  { icon: BadgeCheck, title: 'Carefully selected', text: 'Practical products for real jobs' },
  { icon: MessageCircle, title: 'Helpful advice', text: 'Talk to our in-store team' },
  { icon: Truck, title: 'Flexible fulfilment', text: 'Delivery or store pickup' },
  { icon: ShieldCheck, title: 'Buy with confidence', text: 'Clear prices and support' },
];

const storeBenefits = [
  {
    icon: Wrench,
    title: 'For the trade',
    text: 'Dependable tools, consumables, and everyday workshop essentials.',
  },
  {
    icon: PackageCheck,
    title: 'For the project',
    text: 'A broad selection for repairs, renovations, garden work, and upkeep.',
  },
  {
    icon: Store,
    title: 'For the home',
    text: 'Useful kitchen, electrical, and household products in one convenient stop.',
  },
];

export default function Home() {
  useDocumentTitle('Hardware & Home, Delgoda');

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 hero-grid opacity-25" />
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-orange/20 blur-3xl" />
        <div className="container-page relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-14 lg:py-20">
          <div className="order-2 lg:order-1">
            <Suspense fallback={<AvatarFallback />}>
              <AvatarScene />
            </Suspense>
          </div>

          <div className="order-1 max-w-2xl lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-orange-200">
              <MapPin size={14} className="text-brand-orange" /> Delgoda · Serving since 1998
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.04em] text-white sm:text-5xl lg:text-[64px]">
              Hardware for work, home, and{' '}
              <span className="text-brand-orange">everything between.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-300 sm:text-lg">
              Tools, garden equipment, electrical goods, and home essentials—selected for value and
              backed by a team that knows the aisle.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary !px-7 !py-3.5 text-base">
                Browse products <ArrowRight size={18} />
              </Link>
              <a href="https://wa.me/94771095633" className="btn-outline !px-7 !py-3.5 text-base">
                Ask on WhatsApp
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-orange" /> Store pickup available
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-orange" /> Delivery can be arranged
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 bg-brand-dark">
        <div className="absolute -left-40 -bottom-40 h-[460px] w-[460px] rounded-full bg-brand-orange/15 blur-3xl" />
        <div className="container-page relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-14 lg:py-16">
          <div className="max-w-md">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">
              Featured deals
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
              Hand-picked offers, refreshed often.
            </h2>
            <p className="mt-4 leading-7 text-stone-300">
              Best sellers and current sale items in one place—browse the highlights and add to your
              cart in a tap.
            </p>
            <Link to="/shop" className="btn-primary mt-7 !px-7 !py-3.5 text-base">
              Shop all deals <ArrowRight size={18} />
            </Link>
          </div>

          <div className="lg:pl-4">
            <HeroSlider products={featured} />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="container-page grid divide-y divide-border py-3 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {assurances.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3 px-3 py-4 first:pl-0 lg:px-6">
              <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-orange-50 text-brand-orange">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-sm font-bold text-ink-primary">{title}</p>
                <p className="mt-0.5 text-xs text-ink-secondary">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="categories" className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="Find your aisle"
          title="Shop by category"
          subtitle="Six focused departments. One easy place to start."
        />
        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const colors = categoryColors[category.id];
            return (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group relative min-h-44 overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-card-hover"
              >
                <span
                  className="grid h-14 w-14 place-items-center rounded-2xl text-brand-dark transition-transform duration-300 group-hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                >
                  <CategoryIcon category={category.id} size={28} />
                </span>
                <span className="mt-6 block text-sm font-extrabold leading-tight text-ink-primary">
                  {category.name}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand-orange">
                  Explore <ArrowRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Customer favourites" title="Popular right now" />
          <Link to="/shop" className="hidden items-center gap-1 text-sm font-bold text-brand-orange sm:flex">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="about" className="container-page pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-[28px] bg-brand-dark px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">
                One store, many projects
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                The useful kind of superstore.
              </h2>
              <p className="mt-4 max-w-md leading-7 text-stone-300">
                Come in with a list—or just the problem you are trying to solve. Our team can help
                you find a practical option without turning a simple job into a complicated one.
              </p>
              <Link to="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-orange">
                Plan your visit <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {storeBenefits.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <Icon size={24} className="text-brand-orange" />
                  <h3 className="mt-5 font-extrabold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Good value, clearly marked"
            title="Current offers"
            subtitle="Useful products at sharper prices while stocks last."
          />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Trusted locally"
            title="What our customers say"
            subtitle="Real feedback from people who shop and work with us regularly."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-page p-6 shadow-card">
                <StarRating rating={t.rating} size={15} />
                <p className="mt-4 leading-6 text-ink-secondary">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5">
                  <p className="font-extrabold text-ink-primary">{t.name}</p>
                  <p className="text-xs text-ink-secondary">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-8 rounded-[28px] border border-border bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">
              Visit Jayakirana
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink-primary">
              Need help finding the right item?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-ink-secondary">
              Send us your list before you travel, or visit the Delgoda store and speak with our team.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink-secondary">
              <span className="flex items-center gap-2"><MapPin size={16} className="text-brand-orange" /> New Kandy Road, Delgoda</span>
              <span className="flex items-center gap-2"><Clock3 size={16} className="text-brand-orange" /> Open seven days</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href="https://wa.me/94771095633" className="btn-primary whitespace-nowrap">
              Message us <MessageCircle size={18} />
            </a>
            <a href="tel:+94771095633" className="btn-ghost whitespace-nowrap justify-center">
              Call +94 77 109 5633
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function AvatarFallback() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] lg:mx-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-white/15 bg-[#f6ead7] shadow-2xl shadow-black/25">
        <img
          src={`${import.meta.env.BASE_URL}images/team/boss-avatar.jpg`}
          alt="Jayakirana owner welcoming customers"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-white/10" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-brand-dark/80 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-orange-200 backdrop-blur">
          <Hand size={12} className="text-brand-orange" /> Welcome
        </span>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      {eyebrow && (
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-ink-primary sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm leading-6 text-ink-secondary sm:text-base">{subtitle}</p>}
    </div>
  );
}
