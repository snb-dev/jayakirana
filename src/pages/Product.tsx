import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  Check,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import { formatLKR, getCategory, products } from '../data/products';
import { getReviewsForProduct } from '../data/reviews';
import { useCartStore } from '../store/cartStore';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';

const assurances = [
  { icon: Truck, text: 'Delivery or store pickup' },
  { icon: ShieldCheck, text: 'Genuine, warrantied products' },
  { icon: RotateCcw, text: '7-day exchange on faults' },
];

export default function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useDocumentTitle(product ? product.name : 'Product');

  useEffect(() => {
    setQty(1);
    setAdded(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [id]);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const category = getCategory(product.category);
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const reviews = getReviewsForProduct(product);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i += 1) addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="container-page py-8 lg:py-10">
      <Breadcrumbs
        items={[
          { label: 'Shop', to: '/shop' },
          { label: category.name, to: `/shop?category=${category.id}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* gallery */}
        <div>
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
            <ProductImage
              category={product.category}
              src={product.image}
              alt={product.name}
              rounded="rounded-none"
              emojiClassName="text-8xl"
              className="aspect-square w-full"
              priority
            />
          </div>
        </div>

        {/* info */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brand-orange">{product.brand}</p>
          <h1 className="mt-1.5 text-2xl font-black tracking-tight text-ink-primary sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} reviews={product.reviews} size={16} />
            {product.inStock ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-bold text-success">
                <Check size={12} /> In Stock
              </span>
            ) : (
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-500">
                Out of Stock
              </span>
            )}
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-3xl font-black text-ink-primary">{formatLKR(product.price)}</span>
            {product.originalPrice && (
              <span className="mb-1 text-base text-gray-400 line-through">
                {formatLKR(product.originalPrice)}
              </span>
            )}
            {discount > 0 && (
              <span className="mb-1 rounded bg-green-50 px-2 py-0.5 text-xs font-bold text-success">
                Save {discount}%
              </span>
            )}
          </div>

          <p className="mt-5 leading-7 text-ink-secondary">{product.description}</p>

          {/* specs */}
          {product.specs && product.specs.length > 0 && (
            <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 rounded-xl border border-border bg-white p-4 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-3 border-b border-border/70 py-1.5 text-sm last:border-0 sm:border-0">
                  <dt className="text-ink-secondary">{spec.label}</dt>
                  <dd className="text-right font-semibold text-ink-primary">{spec.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* quantity + add to cart */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border p-1">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-10 w-10 place-items-center rounded-md bg-brand-orange/10 text-brand-orange transition-colors hover:bg-brand-orange/20"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center text-base font-bold">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="grid h-10 w-10 place-items-center rounded-md bg-brand-orange/10 text-brand-orange transition-colors hover:bg-brand-orange/20"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 active:scale-[0.98] ${
                !product.inStock
                  ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                  : added
                    ? 'bg-success'
                    : 'bg-brand-orange hover:bg-brand-orange-dark'
              }`}
            >
              {!product.inStock ? (
                'Out of Stock'
              ) : added ? (
                <>
                  <Check size={18} /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} /> Add {qty > 1 ? `${qty} to Cart` : 'to Cart'}
                </>
              )}
            </button>
          </div>

          {/* assurances */}
          <div className="mt-7 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
            {assurances.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <Icon size={18} className="flex-shrink-0 text-brand-orange" />
                <span className="text-xs font-semibold text-ink-secondary">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* reviews */}
      <section className="mt-16 border-t border-border pt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tight text-ink-primary sm:text-2xl">
            Customer reviews
          </h2>
          <StarRating rating={product.rating} reviews={product.reviews} size={16} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <div key={i} className="rounded-xl border border-border bg-white p-5 shadow-card">
              <div className="flex items-center justify-between">
                <p className="font-bold text-ink-primary">{review.author}</p>
                <span className="text-xs text-ink-secondary">{review.date}</span>
              </div>
              <div className="mt-1.5">
                <StarRating rating={review.rating} size={13} />
              </div>
              <p className="mt-3 text-sm leading-6 text-ink-secondary">{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-black tracking-tight text-ink-primary sm:text-2xl">
              You may also like
            </h2>
            <Link
              to={`/shop?category=${category.id}`}
              className="hidden text-sm font-bold text-brand-orange sm:block"
            >
              View all →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
