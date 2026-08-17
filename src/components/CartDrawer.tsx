import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatLKR } from '../data/products';
import ProductImage from './ProductImage';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md animate-drawer-in flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-ink-primary">
            <ShoppingBag size={20} className="text-brand-orange" />
            Your Cart
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-secondary transition-colors hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-gray-100">
              <ShoppingBag size={36} className="text-gray-400" />
            </div>
            <p className="text-base font-semibold text-ink-primary">Your cart is empty</p>
            <Link to="/shop" onClick={onClose} className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3">
                  <ProductImage
                    category={product.category}
                    src={product.image}
                    alt={product.name}
                    rounded="rounded-lg"
                    emojiClassName="text-2xl"
                    className="h-16 w-16 flex-shrink-0"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="truncate text-sm font-semibold text-ink-primary">{product.name}</p>
                    <p className="text-xs text-ink-secondary">{product.brand}</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="grid h-6 w-6 place-items-center rounded bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="grid h-6 w-6 place-items-center rounded bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-brand-orange">
                        {formatLKR(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => removeItem(product.id)}
                    className="self-start text-gray-400 transition-colors hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-5 py-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-ink-secondary">Subtotal</span>
                <span className="text-lg font-bold text-ink-primary">{formatLKR(subtotal)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="btn-ghost justify-center"
                >
                  View Cart
                </Link>
                <Link to="/checkout" onClick={onClose} className="btn-primary">
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
