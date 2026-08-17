import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Banknote,
  Check,
  Landmark,
  Lock,
  ShoppingCart,
  Store,
} from 'lucide-react';
import { DELIVERY_FEE, useCartStore } from '../store/cartStore';
import { formatLKR } from '../data/products';
import type { PaymentMethod } from '../types';
import ProductImage from '../components/ProductImage';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const DISTRICTS = [
  'Colombo',
  'Gampaha',
  'Kandy',
  'Galle',
  'Matara',
  'Kurunegala',
  'Ratnapura',
  'Badulla',
  'Other',
];

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
}

const REQUIRED_FIELDS: (keyof FormState)[] = [
  'fullName',
  'email',
  'phone',
  'address',
  'city',
  'district',
];

const paymentOptions: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: typeof Banknote;
  recommended?: boolean;
}[] = [
  {
    id: 'cod',
    label: 'Cash on Delivery',
    description: 'Pay in cash when your order arrives. Available for Delgoda and surrounding areas.',
    icon: Banknote,
    recommended: true,
  },
  {
    id: 'bank',
    label: 'Direct Bank Transfer',
    description: 'Transfer to our bank account. Order confirmed after payment verification.',
    icon: Landmark,
  },
  {
    id: 'store',
    label: 'Pay at Store (Pickup)',
    description: 'Reserve online, pay at our Delgoda store. Ready within 24 hours.',
    icon: Store,
  },
];

const paymentLabel: Record<PaymentMethod, string> = {
  cod: 'Cash on Delivery',
  bank: 'Direct Bank Transfer',
  store: 'Pay at Store (Pickup)',
};

export default function Checkout() {
  useDocumentTitle('Checkout');
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [payment, setPayment] = useState<PaymentMethod>('cod');
  const [success, setSuccess] = useState<{ orderNo: string; name: string; phone: string } | null>(
    null,
  );

  const total = subtotal + DELIVERY_FEE;

  const orderNo = useMemo(() => `JK-${Math.floor(100000 + Math.random() * 900000)}`, []);

  const update = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    for (const field of REQUIRED_FIELDS) {
      if (!form[field].trim()) next[field] = 'This field is required';
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // focus first error
      const first = REQUIRED_FIELDS.find((f) => !form[f].trim());
      if (first) document.getElementById(first)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSuccess({ orderNo, name: form.fullName, phone: form.phone });
  };

  const finishOrder = () => {
    clearCart();
    navigate('/shop');
  };

  // Empty cart guard (but not while showing success, since the cart was just cleared logically).
  if (items.length === 0 && !success) {
    return (
      <div className="container-page grid place-items-center py-24 text-center">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-gray-100">
          <ShoppingCart size={44} className="text-gray-400" />
        </div>
        <h1 className="mt-6 text-2xl font-extrabold text-ink-primary">Your cart is empty</h1>
        <p className="mt-2 text-ink-secondary">Add some products before checking out.</p>
        <Link to="/shop" className="btn-primary mt-7">
          Browse Products
        </Link>
      </div>
    );
  }

  const inputClass = (field: keyof FormState) =>
    `input-field ${errors[field] ? '!border-red-500 ring-1 ring-red-500' : ''}`;

  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-extrabold text-ink-primary">Checkout</h1>
      <p className="mt-1 text-sm text-ink-secondary">
        Almost there! Just a few details to complete your order.
      </p>

      <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* left: form */}
        <div className="space-y-6 lg:col-span-2">
          {/* step 1 */}
          <section className="rounded-xl border border-border bg-white p-6 shadow-card">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-orange text-sm font-bold text-white">
                1
              </span>
              <h2 className="text-lg font-bold text-ink-primary">Contact & Delivery Details</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" required error={errors.fullName}>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  className={inputClass('fullName')}
                  placeholder="Chand. Vithanage"
                />
              </Field>
              <Field label="Email Address" required error={errors.email}>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={inputClass('email')}
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Phone Number" required error={errors.phone}>
                <input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className={inputClass('phone')}
                  placeholder="+94 77 XXX XXXX"
                />
              </Field>
              <Field label="City" required error={errors.city}>
                <input
                  id="city"
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  className={inputClass('city')}
                  placeholder="Delgoda"
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Delivery Address" required error={errors.address}>
                  <textarea
                    id="address"
                    rows={3}
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    className={`${inputClass('address')} resize-none`}
                    placeholder="House no, street, area…"
                  />
                </Field>
              </div>
              <Field label="District" required error={errors.district}>
                <select
                  id="district"
                  value={form.district}
                  onChange={(e) => update('district', e.target.value)}
                  className={`${inputClass('district')} cursor-pointer`}
                >
                  <option value="">Select district</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Postal Code">
                <input
                  id="postalCode"
                  value={form.postalCode}
                  onChange={(e) => update('postalCode', e.target.value)}
                  className={inputClass('postalCode')}
                  placeholder="11700"
                />
              </Field>
            </div>
          </section>

          {/* step 2 */}
          <section className="rounded-xl border border-border bg-white p-6 shadow-card">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-orange text-sm font-bold text-white">
                2
              </span>
              <h2 className="text-lg font-bold text-ink-primary">Payment Method</h2>
            </div>

            <div className="space-y-3">
              {paymentOptions.map((opt) => {
                const selected = payment === opt.id;
                const Icon = opt.icon;
                return (
                  <label
                    key={opt.id}
                    className={`block cursor-pointer rounded-xl border-2 p-4 transition-all ${
                      selected
                        ? opt.id === 'cod'
                          ? 'border-success bg-green-50'
                          : 'border-brand-orange bg-orange-50'
                        : 'border-border hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={selected}
                        onChange={() => setPayment(opt.id)}
                        className="mt-1 h-4 w-4 text-brand-orange focus:ring-brand-orange"
                      />
                      <span
                        className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg ${
                          selected ? 'bg-white' : 'bg-gray-100'
                        }`}
                      >
                        <Icon size={20} className={selected && opt.id === 'cod' ? 'text-success' : 'text-brand-orange'} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-ink-primary">{opt.label}</span>
                          {opt.recommended && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-[11px] font-bold text-white">
                              <Check size={12} /> Recommended
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-ink-secondary">{opt.description}</p>

                        {selected && opt.id === 'bank' && (
                          <div className="mt-3 rounded-lg bg-white p-3 text-xs text-ink-secondary ring-1 ring-border">
                            <p>
                              <span className="font-semibold">Bank:</span> Commercial Bank
                            </p>
                            <p>
                              <span className="font-semibold">Account:</span> Jayakirana Pvt Ltd
                            </p>
                            <p>
                              <span className="font-semibold">Acc No:</span> XXXX-XXXX-XXXX
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        {/* right: summary */}
        <div>
          <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-ink-primary">Order Summary</h2>

            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="relative">
                    <ProductImage
                      category={product.category}
                      src={product.image}
                      alt={product.name}
                      rounded="rounded-lg"
                      emojiClassName="text-xl"
                      className="h-12 w-12 flex-shrink-0"
                    />
                    <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-brand-dark text-[10px] font-bold text-white">
                      {quantity}
                    </span>
                  </div>
                  <p className="min-w-0 flex-1 truncate text-sm font-medium text-ink-primary">
                    {product.name}
                  </p>
                  <span className="text-sm font-semibold text-ink-primary">
                    {formatLKR(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <dl className="mt-5 space-y-2.5 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Subtotal</dt>
                <dd className="font-semibold">{formatLKR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-secondary">Delivery</dt>
                <dd className="font-semibold">{formatLKR(DELIVERY_FEE)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <dt className="text-base font-bold text-ink-primary">Total</dt>
                <dd className="text-xl font-extrabold text-brand-orange">{formatLKR(total)}</dd>
              </div>
            </dl>

            <button type="submit" className="btn-primary mt-6 w-full text-base">
              Place Order →
            </button>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-ink-secondary">
              <Lock size={14} className="text-success" /> Secure Checkout
            </p>
          </div>
        </div>
      </form>

      {/* success overlay */}
      {success && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <span className="mx-auto grid h-20 w-20 animate-pop-check place-items-center rounded-full bg-success">
              <Check size={44} className="text-white" strokeWidth={3} />
            </span>
            <h2 className="mt-6 text-2xl font-extrabold text-ink-primary">
              Order Placed Successfully! 🎉
            </h2>
            <p className="mt-2 text-ink-secondary">
              Thank you, <span className="font-semibold text-ink-primary">{success.name}</span>! Your
              order has been received.
            </p>

            <div className="mt-6 space-y-2 rounded-xl bg-gray-50 p-4 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-ink-secondary">Order Number</span>
                <span className="font-bold text-brand-orange">{success.orderNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Payment Method</span>
                <span className="font-semibold text-ink-primary">{paymentLabel[payment]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Total</span>
                <span className="font-semibold text-ink-primary">{formatLKR(total)}</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-ink-secondary">
              We'll contact you at <span className="font-semibold">{success.phone}</span> to confirm.
            </p>

            <button type="button" onClick={finishOrder} className="btn-primary mt-6 w-full">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink-primary">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
