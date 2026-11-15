import * as Dialog from '@radix-ui/react-dialog';
import { AlertTriangle, Minus, Plus, RotateCcw, ShoppingBag, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COPY } from '../../content/copy';
import { formatPrice, getProductBySlug } from '../../lib/catalog';
import {
  MAX_QTY,
  selectSubtotal,
  selectTotalItems,
  useCartStore,
} from '../../store/cartStore';
import { EmptyStateIllustration } from './EmptyStateIllustration';
import { ProductImage } from './ProductImage';

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isDrawerOpen);
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen);
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
    <Dialog.Root open={isOpen} onOpenChange={setDrawerOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[var(--z-modal)] bg-[var(--bg-scrim)]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-0 right-0 bottom-0 z-[var(--z-modal)] w-full max-w-md bg-[var(--color-cream)] border-l-2 border-[var(--color-ink)] flex flex-col shadow-[var(--shadow-drawer)]"
        >
          {/* Çekmece Başlığı */}
          <div className="flex items-center justify-between px-5 py-4 border-b-2 border-[var(--color-ink)] bg-[var(--color-butter)]">
            <Dialog.Title className="font-display font-bold text-xl flex items-center gap-2 tabular-nums">
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              {COPY.cartDrawer.title(totalItems)}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={COPY.cartDrawer.closeAria}
                className="min-h-[44px] min-w-[44px] rounded-full pop-border bg-[var(--color-cream)] flex items-center justify-center cursor-pointer transition-colors hover:bg-[var(--color-pink)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
              >
                <X className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          {/* Çekmece İçeriği */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {lastRemoved && (
              <div
                role="status"
                aria-live="polite"
                className="p-3 rounded-[var(--radius-sm)] pop-border bg-[var(--color-butter)] flex items-center justify-between gap-2"
              >
                <p className="text-xs font-medium text-[var(--color-ink)] min-w-0 truncate">
                  {lastRemoved.type === 'clear'
                    ? 'Sepet temizlendi.'
                    : `${lastRemoved.label} çıkarıldı.`}
                </p>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={restoreLastRemoved}
                    className="min-h-[44px] min-w-[44px] px-3 rounded-full pop-border bg-[var(--color-cream)] font-mono-spec text-xs font-semibold uppercase inline-flex items-center gap-1.5 cursor-pointer transition-colors hover:bg-[var(--color-pink)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
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
              <div className="py-10 text-center space-y-4">
                <EmptyStateIllustration variant="empty-bag" className="w-24 h-24 mx-auto" />
                <p className="font-display font-semibold text-lg">
                  {COPY.cartDrawer.emptyTitle}
                </p>
                <p className="text-sm text-[var(--color-ink-soft)]">
                  {COPY.cartDrawer.emptySubtitle}
                </p>
                <Dialog.Close asChild>
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full pop-border pop-shadow-sm bg-[var(--color-tomato)] text-[var(--color-cream)] font-display font-semibold text-sm transition-colors hover:bg-[var(--color-ink)] active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
                  >
                    {COPY.common.goToShop}
                  </Link>
                </Dialog.Close>
              </div>
            ) : (
              items.map((item) => {
                const product = !item.isCustomMix ? getProductBySlug(item.slug) : undefined;
                const isOutOfStock = product?.inStock === false;
                const isMinQty = item.quantity <= 1;
                const isMaxQty = item.quantity >= MAX_QTY;

                return (
                  <div
                    key={item.key}
                    className="p-3 rounded-[var(--radius-sm)] pop-border bg-[var(--color-cream-alt)] flex gap-3 items-center"
                  >
                    <div className="w-16 h-16 rounded-[var(--radius-sm)] pop-border bg-[var(--color-white)] shrink-0 overflow-hidden flex items-center justify-center">
                      <ProductImage
                        src={item.image}
                        alt={`${item.name} — ${item.flavor} (${item.netWeight})`}
                        width={64}
                        height={64}
                        sizes="64px"
                        className="w-full h-full object-contain p-1.5"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={() => setDrawerOpen(false)}
                        className="font-display font-semibold text-sm hover:underline block truncate rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
                      >
                        {item.name}
                      </Link>
                      <p className="font-mono-spec text-xs text-[var(--color-ink-soft)] uppercase">
                        {item.flavor} · {item.netWeight}
                      </p>
                      {isOutOfStock && (
                        <p
                          role="status"
                          className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full pop-border bg-[var(--color-tomato)] text-[var(--color-cream)] font-mono-spec text-xs uppercase"
                        >
                          <AlertTriangle className="w-3 h-3 shrink-0" aria-hidden="true" />
                          {COPY.common.outOfStock}
                        </p>
                      )}
                      {item.isCustomMix && item.mixItems && item.mixItems.length > 0 && (
                        <ul className="mt-1.5 space-y-0.5 text-xs text-[var(--color-ink-soft)]">
                          {item.mixItems.map((sub) => (
                            <li key={sub.id} className="truncate">
                              · {sub.name} ({sub.weight})
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="font-display font-bold text-sm mt-1 tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => sil(item.key)}
                        aria-label={COPY.cartDrawer.removeItemAria(item.name)}
                        className="min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center text-[var(--color-ink-soft)] hover:text-[var(--color-tomato)] hover:bg-[var(--color-cream)] active:scale-95 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                      </button>
                      <div className="inline-flex items-center rounded-full pop-border bg-[var(--color-cream)] overflow-hidden">
                        <button
                          type="button"
                          onClick={() => azalt(item.key)}
                          disabled={isMinQty}
                          aria-label={COPY.common.decreaseQtyAria}
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors enabled:hover:bg-[var(--color-butter)] enabled:active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-ink)]"
                        >
                          <Minus className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
                        </button>
                        <span className="px-2 font-mono-spec text-xs font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => artir(item.key)}
                          disabled={isMaxQty}
                          aria-label={COPY.common.increaseQtyAria}
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors enabled:hover:bg-[var(--color-butter)] enabled:active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-ink)]"
                        >
                          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Alt Özet */}
          {items.length > 0 && (
            <div className="p-5 border-t-2 border-[var(--color-ink)] bg-[var(--color-cream-alt)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-spec text-xs uppercase text-[var(--color-ink-soft)]">
                  {COPY.cartDrawer.subtotalLabel}
                </span>
                <span className="font-display font-bold text-xl tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <Dialog.Close asChild>
                  <Link
                    to="/cart"
                    className="min-h-[44px] inline-flex items-center justify-center py-2.5 px-4 rounded-full pop-border bg-[var(--color-cream)] text-center font-display font-semibold text-sm transition-colors hover:bg-[var(--color-butter)] active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
                  >
                    {COPY.cartDrawer.goToCart}
                  </Link>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Link
                    to="/checkout"
                    className="min-h-[44px] inline-flex items-center justify-center py-2.5 px-4 rounded-full pop-border pop-shadow-sm bg-[var(--color-tomato)] text-[var(--color-cream)] text-center font-display font-semibold text-sm transition-colors hover:bg-[var(--color-ink)] active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
                  >
                    {COPY.cartDrawer.goToCheckout}
                  </Link>
                </Dialog.Close>
              </div>

              <button
                type="button"
                onClick={temizle}
                className="w-full min-h-[44px] inline-flex items-center justify-center text-center font-mono-spec text-xs underline text-[var(--color-ink-soft)] hover:text-[var(--color-tomato)] active:scale-95 cursor-pointer rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
              >
                {COPY.cartDrawer.clearCart}
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
