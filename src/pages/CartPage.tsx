import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COPY } from '../content/copy';
import { usePageMeta } from '../hooks/usePageMeta';
import { formatPrice } from '../lib/catalog';
import {
  selectSubtotal,
  selectTotalItems,
  useCartStore,
} from '../store/cartStore';
import { EmptyStateIllustration } from '../components/packaging/EmptyStateIllustration';
import { ZigzagEdge } from '../components/packaging/ZigzagEdge';

export default function CartPage() {
  usePageMeta(COPY.cart.metaTitle, COPY.cart.metaDescription);
  const items = useCartStore((s) => s.items);
  const artir = useCartStore((s) => s.artir);
  const azalt = useCartStore((s) => s.azalt);
  const sil = useCartStore((s) => s.sil);
  const temizle = useCartStore((s) => s.temizle);
  const totalItems = useCartStore(selectTotalItems);
  const subtotal = useCartStore(selectSubtotal);

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display font-bold text-4xl">{COPY.cart.title(totalItems)}</h1>
        {items.length > 0 && (
          <button
            type="button"
            onClick={temizle}
            className="px-4 py-2 rounded-full pop-border bg-[var(--color-cream-alt)] font-mono-spec text-xs uppercase cursor-pointer hover:bg-[var(--color-pink)]"
          >
            {COPY.cart.clearCart}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="p-12 rounded-[var(--radius-card)] pop-border bg-[var(--color-cream-alt)] text-center space-y-4">
          <EmptyStateIllustration variant="empty-bag" className="w-28 h-28 mx-auto" />
          <p className="font-display font-bold text-2xl">{COPY.cart.emptyTitle}</p>
          <p className="text-sm text-[var(--color-ink-soft)]">
            {COPY.cart.emptySubtitle}
          </p>
          <Link
            to="/shop"
            className="inline-flex px-6 py-3 rounded-full pop-border pop-shadow-sm bg-[var(--color-tomato)] text-[var(--color-cream)] font-display font-semibold"
          >
            {COPY.common.goToShop}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Ürün Listesi */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.key}
                className="p-4 rounded-[var(--radius-card)] pop-border bg-[var(--color-cream-alt)] flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="w-20 h-20 rounded-xl pop-border bg-[var(--color-white)] shrink-0 overflow-hidden flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-1.5"
                    />
                  ) : (
                    <span className="font-mono-spec text-[10px]">{COPY.common.productPlaceholder}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.slug}`}
                    className="font-display font-bold text-lg hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="font-mono-spec text-xs uppercase text-[var(--color-ink-soft)]">
                    {item.flavor} · {item.netWeight}
                  </p>
                  {item.isCustomMix && item.mixItems && item.mixItems.length > 0 && (
                    <div className="mt-2 text-xs text-[var(--color-ink-soft)]">
                      <span className="font-mono-spec uppercase text-[11px] text-[var(--color-ink)]">
                        {COPY.common.mixContentsLabel}
                      </span>
                      <ul className="mt-1 flex flex-wrap gap-1.5">
                        {item.mixItems.map((sub) => (
                          <li
                            key={sub.id}
                            className="px-2 py-0.5 rounded-full border border-[var(--color-ink)] bg-[var(--color-cream)] font-mono-spec text-[11px]"
                          >
                            {sub.name} ({sub.weight})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="inline-flex items-center rounded-full pop-border bg-[var(--color-cream)]">
                    <button
                      type="button"
                      onClick={() => azalt(item.key)}
                      aria-label={COPY.common.decreaseQtyAria}
                      className="w-9 h-9 flex items-center justify-center cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-mono-spec text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => artir(item.key)}
                      aria-label={COPY.common.increaseQtyAria}
                      className="w-9 h-9 flex items-center justify-center cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-display font-bold text-lg min-w-[72px] text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <button
                    type="button"
                    onClick={() => sil(item.key)}
                    aria-label={COPY.cart.removeItemAria(item.name)}
                    className="p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-tomato)] cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Fiş Görünümlü Özet Kartı */}
          <aside className="relative mt-2.5 lg:col-span-4 rounded-b-[var(--radius-card)] rounded-t-sm pop-border pop-shadow bg-[var(--color-cream-alt)] overflow-visible">
            <ZigzagEdge color="var(--color-butter)" />
            <div className="p-6 space-y-5">
              <h2 className="font-mono-spec text-sm uppercase tracking-wider border-b-2 border-dashed border-[var(--color-ink)] pb-3">
                {COPY.cart.receiptTitle}
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{COPY.cart.itemCountLabel}</span>
                  <span className="font-mono-spec">{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span>{COPY.cart.shippingLabel}</span>
                  <span className="font-mono-spec">{COPY.cart.shippingValue}</span>
                </div>
                <div className="flex justify-between pt-3 border-t-2 border-dashed border-[var(--color-ink)] font-display font-bold text-xl">
                  <span>{COPY.cart.totalLabel}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full py-3 px-6 rounded-full pop-border pop-shadow-sm bg-[var(--color-tomato)] text-[var(--color-cream)] text-center font-display font-semibold"
              >
                {COPY.cart.checkoutCta}
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
