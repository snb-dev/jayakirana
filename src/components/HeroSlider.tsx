import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, Check, Sparkles } from 'lucide-react';
import type { Product } from '../types';
import { formatLKR } from '../data/products';
import { useCartStore } from '../store/cartStore';
import ProductImage from './ProductImage';
import StarRating from './StarRating';

interface HeroSliderProps {
  products: Product[];
  interval?: number;
}

/**
 * Auto-rotating showcase of featured products (best sellers + on-sale items)
 * used in the hero. Pauses on hover, with arrows and dot navigation.
 */
export default function HeroSlider({ products, interval = 4000 }: HeroSliderProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [added, setAdded] = useState(false);

  const count = products.length;
  const product = products[index];

  const go = (next: number) => setIndex(((next % count) + count) % count);

  useEffect(() => {
    if (paused || count <= 1) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(t);
  }, [paused, count, interval]);

  if (!product) return null;

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="absolute -left-2 -top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-lg">
        <Sparkles size={13} /> Featured deal
      </span>

      <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5">
        <div className="relative">
          <Link to={`/product/${product.id}`} className="block">
            <ProductImage
              key={product.id}
              category={product.category}
              src={product.image}
              alt={product.name}
              rounded="rounded-xl"
              emojiClassName="text-7xl"
              className="aspect-[4/3] w-full"
              priority
            />
          </Link>

          {product.badge && (
            <span
              className={`pointer-events-none absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow ${
                product.badge === 'Sale' ? 'bg-red-600' : 'bg-brand-dark'
              }`}
            >
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="pointer-events-none absolute right-3 top-3 grid h-12 w-12 place-items-center rounded-full bg-accent-yellow text-xs font-extrabold text-brand-dark shadow-lg">
              -{discount}%
            </span>
          )}

          {/* arrows */}
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(index - 1)}
            className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-dark shadow-md transition-colors hover:bg-brand-orange hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(index + 1)}
            className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-dark shadow-md transition-colors hover:bg-brand-orange hover:text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="px-1 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-secondary">
            {product.brand}
          </p>
          <h3 className="mt-0.5 truncate text-lg font-bold text-ink-primary">{product.name}</h3>
          <div className="mt-1.5">
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-end gap-2">
              <span className="text-2xl font-extrabold text-brand-orange">
                {formatLKR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="mb-1 text-sm text-gray-400 line-through">
                  {formatLKR(product.originalPrice)}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all active:scale-95 ${
                added ? 'bg-success' : 'bg-brand-orange hover:bg-brand-orange-dark'
              }`}
            >
              {added ? (
                <>
                  <Check size={16} /> Added
                </>
              ) : (
                <>
                  <ShoppingCart size={16} /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-6 bg-brand-orange' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <Link
        to="/shop"
        className="mt-3 block text-center text-sm font-semibold text-brand-orange hover:underline"
      >
        View all deals →
      </Link>
    </div>
  );
}
