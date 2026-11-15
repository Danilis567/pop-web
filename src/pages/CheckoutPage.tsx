import { useEffect, useRef, useState } from 'react';
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

type FormField = keyof FormState;

const FIELD_ORDER: FormField[] = ['fullName', 'email', 'phone', 'city', 'address'];

const INITIAL_FORM: FormState = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  address: '',
};

const FIELD_LABELS: Record<FormField, string> = {
  fullName: COPY.checkout.fields.fullName,
  email: COPY.checkout.fields.email,
  phone: COPY.checkout.fields.phone,
  city: COPY.checkout.fields.city,
  address: COPY.checkout.fields.address,
};

function validateField(field: FormField, value: string): string | undefined {
  switch (field) {
    case 'fullName':
      return value.trim().length < 2 ? COPY.checkout.errors.fullName : undefined;
    case 'email':
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ? COPY.checkout.errors.email
        : undefined;
    case 'phone':
      return value.replace(/\D/g, '').length < 10
        ? COPY.checkout.errors.phone
        : undefined;
    case 'city':
      return value.trim().length < 2 ? COPY.checkout.errors.city : undefined;
    case 'address':
      return value.trim().length < 10 ? COPY.checkout.errors.address : undefined;
  }
}

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
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  const submitTimerRef = useRef<number | null>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  const fieldRefs: Record<FormField, React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>> = {
    fullName: fullNameRef,
    email: emailRef,
    phone: phoneRef,
    city: cityRef,
    address: addressRef,
  };

  useEffect(() => {
    return () => {
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  const handleFieldChange = (field: FormField, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFieldBlur = (field: FormField) => {
    const error = validateField(field, form[field]);
    setErrors((prev) => {
      if (!error) {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return { ...prev, [field]: error };
    });
  };

  const validateAll = (): Partial<FormState> => {
    const nextErrors: Partial<FormState> = {};
    for (const field of FIELD_ORDER) {
      const err = validateField(field, form[field]);
      if (err) nextErrors[field] = err;
    }
    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateAll();
    const firstInvalid = FIELD_ORDER.find((field) => Boolean(nextErrors[field]));
    if (firstInvalid) {
      setShowErrorSummary(true);
      fieldRefs[firstInvalid].current?.focus();
      return;
    }

    setShowErrorSummary(false);
    setIsSubmitting(true);
    submitTimerRef.current = window.setTimeout(() => {
      temizle();
      setOrderDone(true);
      setIsSubmitting(false);
      triggerAddToCartConfetti();
    }, 250);
  };

  const activeErrorFields = FIELD_ORDER.filter((field) => Boolean(errors[field]));

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
            className="inline-flex px-6 py-3 rounded-full pop-border bg-[var(--color-cream)] font-display font-semibold text-sm hover:bg-[var(--color-butter)] active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-deep-blue)] transition-colors duration-[var(--duration-fast)]"
          >
            {COPY.common.backToShop}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
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
            className="inline-flex px-6 py-2.5 rounded-full pop-border bg-[var(--color-tomato)] text-[var(--color-cream)] font-display font-semibold text-sm hover:brightness-95 active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-deep-blue)] transition-transform duration-[var(--duration-fast)]"
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

            {showErrorSummary && activeErrorFields.length > 0 && (
              <div
                role="alert"
                tabIndex={-1}
                className="scroll-mt-24 p-4 rounded-[var(--radius-sm)] pop-border bg-[var(--color-butter)] space-y-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-deep-blue)]"
              >
                <p className="font-display font-bold text-sm text-[var(--color-tomato)]">
                  Lütfen formdaki {activeErrorFields.length} alanı kontrol et:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  {activeErrorFields.map((field) => (
                    <li key={field}>
                      <button
                        type="button"
                        onClick={() => fieldRefs[field].current?.focus()}
                        className="text-left underline font-medium cursor-pointer hover:text-[var(--color-tomato)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-deep-blue)] rounded"
                      >
                        {FIELD_LABELS[field]}: {errors[field]}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="fullName" className="block font-mono-spec text-xs uppercase">
                {COPY.checkout.fields.fullName}
              </label>
              <input
                ref={fullNameRef}
                id="fullName"
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value)}
                onBlur={() => handleFieldBlur('fullName')}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                className="scroll-mt-24 w-full h-11 px-4 rounded-xl pop-border bg-[var(--color-white)] text-base sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-deep-blue)]"
              />
              {errors.fullName && (
                <p id="fullName-error" className="text-xs text-[var(--color-tomato)] font-medium">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="email" className="block font-mono-spec text-xs uppercase">
                  {COPY.checkout.fields.email}
                </label>
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={() => handleFieldBlur('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="scroll-mt-24 w-full h-11 px-4 rounded-xl pop-border bg-[var(--color-white)] text-base sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-deep-blue)]"
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-[var(--color-tomato)] font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="block font-mono-spec text-xs uppercase">
                  {COPY.checkout.fields.phone}
                </label>
                <input
                  ref={phoneRef}
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  onBlur={() => handleFieldBlur('phone')}
                  placeholder={COPY.checkout.fields.phonePlaceholder}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className="scroll-mt-24 w-full h-11 px-4 rounded-xl pop-border bg-[var(--color-white)] text-base sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-deep-blue)]"
                />
                {errors.phone && (
                  <p id="phone-error" className="text-xs text-[var(--color-tomato)] font-medium">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="city" className="block font-mono-spec text-xs uppercase">
                {COPY.checkout.fields.city}
              </label>
              <input
                ref={cityRef}
                id="city"
                type="text"
                autoComplete="address-level2"
                value={form.city}
                onChange={(e) => handleFieldChange('city', e.target.value)}
                onBlur={() => handleFieldBlur('city')}
                aria-invalid={Boolean(errors.city)}
                aria-describedby={errors.city ? 'city-error' : undefined}
                className="scroll-mt-24 w-full h-11 px-4 rounded-xl pop-border bg-[var(--color-white)] text-base sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-deep-blue)]"
              />
              {errors.city && (
                <p id="city-error" className="text-xs text-[var(--color-tomato)] font-medium">
                  {errors.city}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="address" className="block font-mono-spec text-xs uppercase">
                {COPY.checkout.fields.address}
              </label>
              <textarea
                ref={addressRef}
                id="address"
                rows={3}
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => handleFieldChange('address', e.target.value)}
                onBlur={() => handleFieldBlur('address')}
                aria-invalid={Boolean(errors.address)}
                aria-describedby={errors.address ? 'address-error' : undefined}
                className="scroll-mt-24 w-full p-3 rounded-xl pop-border bg-[var(--color-white)] text-base sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-deep-blue)]"
              />
              {errors.address && (
                <p id="address-error" className="text-xs text-[var(--color-tomato)] font-medium">
                  {errors.address}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full py-3.5 px-6 rounded-full pop-border pop-shadow bg-[var(--color-tomato)] text-[var(--color-cream)] font-display font-bold text-base cursor-pointer hover:brightness-95 active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-deep-blue)] disabled:opacity-60 disabled:cursor-not-allowed transition-transform duration-[var(--duration-fast)]"
            >
              {isSubmitting ? 'İşleniyor...' : COPY.checkout.submitCta}
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
                    {item.name} <span className="font-mono-spec text-xs tabular-nums">×{item.quantity}</span>
                  </span>
                  <span className="font-mono-spec shrink-0 tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t-2 border-dashed border-[var(--color-ink)] flex justify-between font-display font-bold text-xl">
              <span>{COPY.checkout.totalLabel}</span>
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
