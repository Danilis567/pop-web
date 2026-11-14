import * as Dialog from '@radix-ui/react-dialog';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COPY } from '../../content/copy';
import { formatPrice } from '../../lib/catalog';
import {
  selectSubtotal,
  selectTotalItems,
  useCartStore,
} from '../../store/cartStore';
import { EmptyStateIllustration } from './EmptyStateIllustration';

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isDrawerOpen);
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen);
  const items = useCartStore((s) => s.items);
  const artir = useCartStore((s) => s.artir);
  const azalt = useCartStore((s) => s.azalt);
  const sil = useCartStore((s) => s.sil);
  const temizle = useCartStore((s) => s.temizle);
  const totalItems = useCartStore(selectTotalItems);
  const subtotal = useCartStore(selectSubtotal);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setDrawerOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[var(--z-modal)] bg-[var(--color-ink)]/45 backdrop-blur-[2px]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-0 right-0 bottom-0 z-[var(--z-modal)] w-full max-w-md bg-[var(--color-cream)] border-l-2 border-[var(--color-ink)] flex flex-col shadow-[-6px_0_0_#2B1410]"
        >
          {/* Çekmece Başlığı */}
          <div className="flex items-center justify-between px-5 py-4 border-b-2 border-[var(--color-ink)] bg-[var(--color-butter)]">
            <Dialog.Title className="font-display font-bold text-xl flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              {COPY.cartDrawer.title(totalItems)}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={COPY.cartDrawer.closeAria}
                className="w-9 h-9 rounded-full pop-border bg-[var(--color-cream)] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Çekmece İçeriği */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
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
                    className="inline-flex items-center px-5 py-2.5 rounded-full pop-border pop-shadow-sm bg-[var(--color-tomato)] text-[var(--color-cream)] font-display font-semibold text-sm"
                  >
                    {COPY.common.goToShop}
                  </Link>
                </Dialog.Close>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.key}
                  className="p-3 rounded-[var(--radius-sm)] pop-border bg-[var(--color-cream-alt)] flex gap-3 items-center"
                >
                  <div className="w-16 h-16 rounded-lg pop-border bg-[var(--color-white)] shrink-0 overflow-hidden flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image.replace(/\.webp$/, '-400.webp')}
                        srcSet={`${item.image.replace(/\.webp$/, '-400.webp')} 400w, ${item.image} 800w`}
                        sizes="64px"
                        width={400}
                        height={400}
                        alt={`${item.name} — ${item.flavor} (${item.netWeight})`}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <span className="font-mono-spec text-[10px]">{COPY.common.productPlaceholder}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.slug}`}
                      onClick={() => setDrawerOpen(false)}
                      className="font-display font-semibold text-sm hover:underline block truncate"
                    >
                      {item.name}
                    </Link>
                    <p className="font-mono-spec text-[11px] text-[var(--color-ink-soft)] uppercase">
                      {item.flavor} · {item.netWeight}
                    </p>
                    {item.isCustomMix && item.mixItems && item.mixItems.length > 0 && (
                      <ul className="mt-1.5 space-y-0.5 text-xs text-[var(--color-ink-soft)]">
                        {item.mixItems.map((sub) => (
                          <li key={sub.id} className="truncate">
                            · {sub.name} ({sub.weight})
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="font-display font-bold text-sm mt-1">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      type="button"
                      onClick={() => sil(item.key)}
                      aria-label={COPY.cartDrawer.removeItemAria(item.name)}
                      className="text-[var(--color-ink-soft)] hover:text-[var(--color-tomato)] cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="inline-flex items-center rounded-full pop-border bg-[var(--color-cream)]">
                      <button
                        type="button"
                        onClick={() => azalt(item.key)}
                        aria-label={COPY.common.decreaseQtyAria}
                        className="w-7 h-7 flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono-spec text-xs font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => artir(item.key)}
                        aria-label={COPY.common.increaseQtyAria}
                        className="w-7 h-7 flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Alt Özet */}
          {items.length > 0 && (
            <div className="p-5 border-t-2 border-[var(--color-ink)] bg-[var(--color-cream-alt)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-spec text-xs uppercase text-[var(--color-ink-soft)]">
                  {COPY.cartDrawer.subtotalLabel}
                </span>
                <span className="font-display font-bold text-xl">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <Dialog.Close asChild>
                  <Link
                    to="/cart"
                    className="py-2.5 px-4 rounded-full pop-border bg-[var(--color-cream)] text-center font-display font-semibold text-sm"
                  >
                    {COPY.cartDrawer.goToCart}
                  </Link>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Link
                    to="/checkout"
                    className="py-2.5 px-4 rounded-full pop-border pop-shadow-sm bg-[var(--color-tomato)] text-[var(--color-cream)] text-center font-display font-semibold text-sm"
                  >
                    {COPY.cartDrawer.goToCheckout}
                  </Link>
                </Dialog.Close>
              </div>

              <button
                type="button"
                onClick={temizle}
                className="w-full text-center font-mono-spec text-xs underline text-[var(--color-ink-soft)] hover:text-[var(--color-tomato)] cursor-pointer pt-1"
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
