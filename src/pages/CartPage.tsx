import { AlertTriangle, Minus, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COPY } from '../content/copy';
import { usePageMeta } from '../hooks/usePageMeta';
import { formatPrice, getProductBySlug } from '../lib/catalog';
import {
  MAX_QTY,
  selectSubtotal,
  selectTotalItems,
  useCartStore,
} from '../store/cartStore';
import { EmptyStateIllustration } from '../components/packaging/EmptyStateIllustration';
import { ProductImage } from '../components/packaging/ProductImage';
import { ZigzagEdge } from '../components/packaging/ZigzagEdge';

export default function CartPage() {
  usePageMeta(COPY.cart.metaTitle, COPY.cart.metaDescription);
  const items = useCartStore((s) => s.items);
  const lastRemoved = useCartStore((s) => s.lastRemoved);
  const artir = useCartStore((s) => s.artir);
  const azalt = useCartStore((s) => s.azalt);
  const sil = useCartStore((s) => s.sil);
  const temizle = useCartStore((s) => s.temizle);
  const restoreLastRemoved = useCartStore((s) => s.restoreLastRemoved);
  const dismissUndo = useCartStore((s) => s.dismissUndo);
  const totalItems = useCartStore(selectTotalItems);
  const subtotal = useCartStore(selectSubtotal);

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display font-bold text-4xl">{COPY.cart.title(totalItems)}</h1>
        {items.length > 0 && (
          <button
            type="button"
            onClick={temizle}
            className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-full pop-border bg-[var(--color-cream-alt)] font-mono-spec text-xs uppercase inline-flex items-center justify-center cursor-pointer transition-colors hover:bg-[var(--color-pink)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
          >
            {COPY.cart.clearCart}
          </button>
        )}
      </div>

      {lastRemoved && (
        <div
          role="status"
          aria-live="polite"
          className="p-4 rounded-[var(--radius-card)] pop-border bg-[var(--color-butter)] flex flex-wrap items-center justify-between gap-3"
        >
          <p className="text-sm font-medium text-[var(--color-ink)]">
            {lastRemoved.type === 'clear'
              ? 'Sepetiniz temizlendi.'
              : `${lastRemoved.label} sepetten çıkarıldı.`}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={restoreLastRemoved}
              className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-full pop-border bg-[var(--color-cream)] font-mono-spec text-xs font-semibold uppercase inline-flex items-center gap-1.5 cursor-pointer transition-colors hover:bg-[var(--color-pink)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Geri Al
            </button>
            <button
              type="button"
              onClick={dismissUndo}
              aria-label="Bildirimi kapat"
              className="min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center text-[var(--color-ink)] cursor-pointer transition-colors hover:bg-[var(--color-cream)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="p-12 rounded-[var(--radius-card)] pop-border bg-[var(--color-cream-alt)] text-center space-y-4">
          <EmptyStateIllustration variant="empty-bag" className="w-28 h-28 mx-auto" />
          <p className="font-display font-bold text-2xl">{COPY.cart.emptyTitle}</p>
          <p className="text-sm text-[var(--color-ink-soft)]">
            {COPY.cart.emptySubtitle}
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-full pop-border pop-shadow-sm bg-[var(--color-tomato)] text-[var(--color-cream)] font-display font-semibold transition-colors hover:bg-[var(--color-ink)] active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
          >
            {COPY.common.goToShop}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Ürün Listesi */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => {
              const product = !item.isCustomMix ? getProductBySlug(item.slug) : undefined;
              const isOutOfStock = product?.inStock === false;
              const isMinQty = item.quantity <= 1;
              const isMaxQty = item.quantity >= MAX_QTY;

              return (
                <div
                  key={item.key}
                  className="p-4 rounded-[var(--radius-card)] pop-border bg-[var(--color-cream-alt)] flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-xl pop-border bg-[var(--color-white)] shrink-0 overflow-hidden flex items-center justify-center">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={400}
                      sizes="80px"
                      className="w-full h-full object-contain p-1.5"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.slug}`}
                      className="font-display font-bold text-lg hover:underline rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
                    >
                      {item.name}
                    </Link>
                    <p className="font-mono-spec text-xs uppercase text-[var(--color-ink-soft)]">
                      {item.flavor} · <span className="normal-case tabular-nums">{item.netWeight}</span>
                    </p>
                    {isOutOfStock && (
                      <p
                        role="status"
                        className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full pop-border bg-[var(--color-tomato)] text-[var(--color-cream)] font-mono-spec text-xs uppercase"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        {COPY.common.outOfStock} — Sepetten çıkarabilirsiniz
                      </p>
                    )}
                    {item.isCustomMix && item.mixItems && item.mixItems.length > 0 && (
                      <div className="mt-2 text-xs text-[var(--color-ink-soft)]">
                        <span className="font-mono-spec uppercase text-xs font-medium text-[var(--color-ink)]">
                          {COPY.common.mixContentsLabel}
                        </span>
                        <ul className="mt-1 flex flex-wrap gap-1.5">
                          {item.mixItems.map((sub) => (
                            <li
                              key={sub.id}
                              className="px-2 py-0.5 rounded-full border border-[var(--color-ink)] bg-[var(--color-cream)] font-mono-spec text-xs tabular-nums"
                            >
                              {sub.name} ({sub.weight})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="inline-flex items-center rounded-full pop-border bg-[var(--color-cream)] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => azalt(item.key)}
                        disabled={isMinQty}
                        aria-label={COPY.common.decreaseQtyAria}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors enabled:hover:bg-[var(--color-butter)] enabled:active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-ink)]"
                      >
                        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <span className="px-3 font-mono-spec text-sm font-medium tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => artir(item.key)}
                        disabled={isMaxQty}
                        aria-label={COPY.common.increaseQtyAria}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors enabled:hover:bg-[var(--color-butter)] enabled:active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-ink)]"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <span className="font-display font-bold text-lg min-w-[72px] text-right tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </span>

                    <button
                      type="button"
                      onClick={() => sil(item.key)}
                      aria-label={COPY.cart.removeItemAria(item.name)}
                      className="min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center text-[var(--color-ink-soft)] hover:text-[var(--color-tomato)] hover:bg-[var(--color-cream)] active:scale-95 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fiş Görünümlü Özet Kartı */}
          <aside className="relative mt-3 lg:col-span-4 rounded-b-[var(--radius-card)] rounded-t-sm pop-border pop-shadow bg-[var(--color-cream-alt)] overflow-visible">
            <ZigzagEdge color="var(--color-butter)" />
            <div className="p-6 space-y-5">
              <h2 className="font-mono-spec text-sm uppercase tracking-wider border-b-2 border-dashed border-[var(--color-ink)] pb-3">
                {COPY.cart.receiptTitle}
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{COPY.cart.itemCountLabel}</span>
                  <span className="font-mono-spec font-medium tabular-nums">{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span>{COPY.cart.shippingLabel}</span>
                  <span className="font-mono-spec font-medium">{COPY.cart.shippingValue}</span>
                </div>
                <div className="flex justify-between pt-3 border-t-2 border-dashed border-[var(--color-ink)] font-display font-bold text-xl">
                  <span>{COPY.cart.totalLabel}</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="flex items-center justify-center w-full min-h-[44px] py-3 px-6 rounded-full pop-border pop-shadow-sm bg-[var(--color-tomato)] text-[var(--color-cream)] text-center font-display font-semibold transition-colors hover:bg-[var(--color-ink)] active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
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
