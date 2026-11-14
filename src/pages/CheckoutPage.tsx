import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyStateIllustration } from '../components/packaging/EmptyStateIllustration';
import { COPY } from '../content/copy';
import { usePageMeta } from '../hooks/usePageMeta';
import { formatPrice } from '../lib/catalog';
import { triggerAddToCartConfetti } from '../lib/confetti';
import { selectSubtotal, useCartStore } from '../store/cartStore';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
}

const INITIAL_FORM: FormState = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  address: '',
};

export default function CheckoutPage() {
  usePageMeta(
    COPY.checkout.metaTitle,
    COPY.checkout.metaDescription
  );
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);
  const temizle = useCartStore((s) => s.temizle);

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [orderDone, setOrderDone] = useState(false);

  const validate = (): boolean => {
    const nextErrors: Partial<FormState> = {};
    if (form.fullName.trim().length < 2) nextErrors.fullName = COPY.checkout.errors.fullName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = COPY.checkout.errors.email;
    }
    if (form.phone.replace(/\D/g, '').length < 10) {
      nextErrors.phone = COPY.checkout.errors.phone;
    }
    if (form.city.trim().length < 2) nextErrors.city = COPY.checkout.errors.city;
    if (form.address.trim().length < 10) nextErrors.address = COPY.checkout.errors.address;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    temizle();
    setOrderDone(true);
    triggerAddToCartConfetti();
  };

  if (orderDone) {
    return (
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-lg mx-auto p-8 rounded-[var(--radius-card)] pop-border bg-[var(--color-lime)] text-center space-y-4">
          <EmptyStateIllustration variant="order-seal" className="w-24 h-24 mx-auto" />
          <p className="font-mono-spec text-xs uppercase">{COPY.checkout.doneBadge}</p>
          <h1 className="font-display font-bold text-3xl">
            {COPY.checkout.doneTitle}
          </h1>
          <p className="text-sm">
            {COPY.checkout.doneDescription}
          </p>
          <Link
            to="/shop"
            className="inline-flex px-6 py-3 rounded-full pop-border bg-[var(--color-cream)] font-display font-semibold text-sm"
          >
            {COPY.common.backToShop}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-8 space-y-8">
      <h1 className="font-display font-bold text-4xl">{COPY.checkout.title}</h1>

      {/* Açık Demo Uyarısı */}
      <div
        role="status"
        className="p-4 rounded-[var(--radius-sm)] pop-border bg-[var(--color-butter)] flex items-start gap-3"
      >
        <span className="font-mono-spec font-bold text-sm px-2 py-0.5 rounded pop-border bg-[var(--color-cream)] shrink-0" aria-hidden="true">!</span>
        <div className="text-sm">
          <strong className="font-display font-bold">{COPY.checkout.warningTitle}</strong>{' '}
          {COPY.checkout.warningText}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="p-10 rounded-[var(--radius-card)] pop-border bg-[var(--color-cream-alt)] text-center space-y-4">
          <p className="font-display font-bold text-xl">
            {COPY.checkout.emptyTitle}
          </p>
          <Link
            to="/shop"
            className="inline-flex px-6 py-2.5 rounded-full pop-border bg-[var(--color-tomato)] text-[var(--color-cream)] font-display font-semibold text-sm"
          >
            {COPY.common.goToShop}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-7 p-6 rounded-[var(--radius-card)] pop-border bg-[var(--color-cream-alt)] space-y-4"
          >
            <h2 className="font-display font-bold text-2xl">{COPY.checkout.formTitle}</h2>

            <div className="space-y-1">
              <label htmlFor="fullName" className="block font-mono-spec text-xs uppercase">
                {COPY.checkout.fields.fullName}
              </label>
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full h-11 px-4 rounded-xl pop-border bg-[var(--color-white)] text-sm"
              />
              {errors.fullName && (
                <p className="text-xs text-[var(--color-tomato)] font-medium">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="email" className="block font-mono-spec text-xs uppercase">
                  {COPY.checkout.fields.email}
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl pop-border bg-[var(--color-white)] text-sm"
                />
                {errors.email && (
                  <p className="text-xs text-[var(--color-tomato)] font-medium">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="block font-mono-spec text-xs uppercase">
                  {COPY.checkout.fields.phone}
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={COPY.checkout.fields.phonePlaceholder}
                  className="w-full h-11 px-4 rounded-xl pop-border bg-[var(--color-white)] text-sm"
                />
                {errors.phone && (
                  <p className="text-xs text-[var(--color-tomato)] font-medium">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="city" className="block font-mono-spec text-xs uppercase">
                {COPY.checkout.fields.city}
              </label>
              <input
                id="city"
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full h-11 px-4 rounded-xl pop-border bg-[var(--color-white)] text-sm"
              />
              {errors.city && (
                <p className="text-xs text-[var(--color-tomato)] font-medium">{errors.city}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="address" className="block font-mono-spec text-xs uppercase">
                {COPY.checkout.fields.address}
              </label>
              <textarea
                id="address"
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full p-3 rounded-xl pop-border bg-[var(--color-white)] text-sm"
              />
              {errors.address && (
                <p className="text-xs text-[var(--color-tomato)] font-medium">{errors.address}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full pop-border pop-shadow bg-[var(--color-tomato)] text-[var(--color-cream)] font-display font-bold text-base cursor-pointer"
            >
              {COPY.checkout.submitCta}
            </button>
          </form>

          {/* Sipariş Özeti */}
          <aside className="lg:col-span-5 p-6 rounded-[var(--radius-card)] pop-border pop-shadow bg-[var(--color-cream-alt)] space-y-4">
            <h2 className="font-mono-spec text-sm uppercase tracking-wider border-b-2 border-dashed border-[var(--color-ink)] pb-3">
              {COPY.checkout.summaryTitle}
            </h2>
            <ul className="space-y-2.5 text-sm">
              {items.map((item) => (
                <li key={item.key} className="flex justify-between gap-3">
                  <span className="truncate">
                    {item.name} <span className="font-mono-spec text-xs">×{item.quantity}</span>
                  </span>
                  <span className="font-mono-spec shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t-2 border-dashed border-[var(--color-ink)] flex justify-between font-display font-bold text-xl">
              <span>{COPY.checkout.totalLabel}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
