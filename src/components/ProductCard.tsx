import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { formatLKR } from '../data/products';
import { useCartStore } from '../store/cartStore';
import ProductImage from './ProductImage';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

function Badge({ product }: { product: Product }) {
  if (!product.inStock) {
    return (
      <span className="rounded-full bg-gray-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
        Out of Stock
      </span>
    );
  }
  if (product.badge === 'Best Seller') {
    return (
      <span className="rounded-full bg-brand-dark px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
        Best Seller
      </span>
    );
  }
  if (product.badge === 'Sale') {
    return (
      <span className="rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
        Sale
      </span>
    );
  }
  return null;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

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
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-card-hover">
      <Link to={`/product/${product.id}`} className="flex flex-1 flex-col">
        {/* image */}
        <div className="relative">
          <ProductImage
            category={product.category}
            src={product.image}
            alt={product.name}
            className="aspect-[4/3] w-full"
          />

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            <Badge product={product} />
          </div>

        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-secondary">
            {product.brand}
          </p>
          <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-base font-semibold leading-snug text-ink-primary transition-colors group-hover:text-brand-orange">
            {product.name}
          </h3>

          <div className="mt-2">
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-lg font-extrabold text-ink-primary">{formatLKR(product.price)}</span>
            {product.originalPrice && (
              <span className="mb-0.5 text-sm text-gray-400 line-through">
                {formatLKR(product.originalPrice)}
              </span>
            )}
          </div>
          {discount > 0 && (
            <span className="mt-1 w-fit rounded bg-green-50 px-1.5 py-0.5 text-xs font-semibold text-success">
              Save {discount}%
            </span>
          )}

          <div className="mt-4 flex-1" />
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
            !product.inStock
              ? 'cursor-not-allowed bg-gray-200 text-gray-500'
              : added
                ? 'bg-success text-white'
                : 'bg-brand-orange text-white hover:bg-brand-orange-dark'
          }`}
        >
          {!product.inStock ? (
            'Out of Stock'
          ) : added ? (
            <>
              <Check size={18} /> Added!
            </>
          ) : (
            <>
              <ShoppingCart size={18} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
