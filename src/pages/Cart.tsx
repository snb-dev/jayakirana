import { Link } from 'react-router-dom';
import { ArrowLeft, Banknote, Landmark, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { DELIVERY_FEE, useCartStore } from '../store/cartStore';
import { formatLKR } from '../data/products';
import ProductImage from '../components/ProductImage';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Cart() {
  useDocumentTitle('Your Cart');
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  if (items.length === 0) {
    return (
      <div className="container-page grid place-items-center py-24 text-center">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-gray-100">
          <ShoppingCart size={44} className="text-gray-400" />
        </div>
        <h1 className="mt-6 text-2xl font-extrabold text-ink-primary">Your cart is empty</h1>
        <p className="mt-2 text-ink-secondary">
          Looks like you haven't added anything yet. Let's fix that!
        </p>
        <Link to="/shop" className="btn-primary mt-7">
          Start Shopping
        </Link>
      </div>
    );
  }

  const total = subtotal + DELIVERY_FEE;

  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-extrabold text-ink-primary">Shopping Cart</h1>
      <p className="mt-1 text-sm text-ink-secondary">
        {items.length} item{items.length !== 1 && 's'} in your cart
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* items */}
        <div className="lg:col-span-2">
          <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-white shadow-card">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap">
                <ProductImage
                  category={product.category}
                  src={product.image}
                  alt={product.name}
                  rounded="rounded-lg"
                  emojiClassName="text-3xl"
                  className="h-20 w-20 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-ink-primary">{product.name}</h3>
                  <p className="text-xs text-ink-secondary">{product.brand}</p>
                  <p className="mt-1 text-sm text-ink-secondary">{formatLKR(product.price)} each</p>
                </div>

                {/* stepper */}
                <div className="flex items-center gap-2 rounded-lg border border-border p-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="grid h-8 w-8 place-items-center rounded-md bg-brand-orange/10 text-brand-orange transition-colors hover:bg-brand-orange/20"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="grid h-8 w-8 place-items-center rounded-md bg-brand-orange/10 text-brand-orange transition-colors hover:bg-brand-orange/20"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="w-24 text-right text-base font-bold text-brand-orange">
                  {formatLKR(product.price * quantity)}
                </div>

                <button
                  type="button"
                  aria-label="Remove item"
                  onClick={() => removeItem(product.id)}
                  className="grid h-9 w-9 place-items-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <Link
            to="/shop"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:underline"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {/* summary */}
        <div>
          <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-ink-primary">Order Summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Subtotal</dt>
                <dd className="font-semibold">{formatLKR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Delivery</dt>
                <dd className="text-right">
                  <span className="font-semibold">{formatLKR(DELIVERY_FEE)}</span>
                  <span className="block text-xs font-medium text-success">
                    Free in Delgoda area
                  </span>
                </dd>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-bold text-ink-primary">Total</dt>
                  <dd className="text-xl font-extrabold text-brand-orange">{formatLKR(total)}</dd>
                </div>
              </div>
            </dl>

            <Link to="/checkout" className="btn-primary mt-6 w-full">
              Proceed to Checkout
            </Link>

            <div className="mt-5 border-t border-border pt-4">
              <p className="text-xs font-semibold text-ink-secondary">We Accept</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1.5 text-xs font-semibold text-success">
                  <Banknote size={14} /> Cash on Delivery
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-ink-secondary">
                  <Landmark size={14} /> Bank Transfer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
