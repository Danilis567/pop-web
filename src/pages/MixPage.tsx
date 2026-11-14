import { Plus, ShoppingBag, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ZigzagEdge } from '../components/packaging/ZigzagEdge';
import { COPY } from '../content/copy';
import { products, type Product } from '../data/products';
import { usePageMeta } from '../hooks/usePageMeta';
import { formatPrice, getCategories, getCategoryBySlug } from '../lib/catalog';
import { useCartStore } from '../store/cartStore';

const MIN_MIX_ITEMS = 4;
const MAX_MIX_ITEMS = 6;
const PORTION_GRAMS = 50;
const EXCLUDED_MIX_CATEGORY = 'lolipop-sakiz';

/**
 * 50 g porsiyon fiyatını ürünün kendi gramajına orantılı hesaplar.
 */
function getPortionPrice(product: Product): number {
  const grams = parseInt(product.netWeight, 10) || 100;
  return Math.round((product.price * PORTION_GRAMS) / grams);
}

export default function MixPage() {
  usePageMeta(COPY.mix.metaTitle, COPY.mix.metaDescription);

  const mixCategories = useMemo(
    () => getCategories().filter((c) => c.slug !== EXCLUDED_MIX_CATEGORY),
    []
  );
  const mixableProducts = useMemo(
    () => products.filter((p) => p.category !== EXCLUDED_MIX_CATEGORY && p.inStock !== false),
    []
  );

  const addCustomMix = useCartStore((s) => s.addCustomMix);

  const [activeCategory, setActiveCategory] = useState<string>('tumu');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'tumu') return mixableProducts;
    return mixableProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory, mixableProducts]);

  const selectedProducts = useMemo(
    () =>
      selectedIds
        .map((id) => mixableProducts.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
    [selectedIds, mixableProducts]
  );

  const totalGrams = selectedProducts.length * PORTION_GRAMS;
  const totalPrice = selectedProducts.reduce(
    (sum, p) => sum + getPortionPrice(p),
    0
  );

  const isReady =
    selectedProducts.length >= MIN_MIX_ITEMS &&
    selectedProducts.length <= MAX_MIX_ITEMS;

  const toggleProduct = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= MAX_MIX_ITEMS) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleAddMixToCart = () => {
    if (!isReady) return;
    const mixItems = selectedProducts.map((p) => ({
      id: p.id,
      name: p.name,
      weight: `${PORTION_GRAMS}g`,
    }));
    addCustomMix(selectedProducts, totalPrice, `${totalGrams}g`, mixItems);
    setSelectedIds([]);
  };

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Tepsi Odaklı Kompakt Başlık */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-[var(--color-ink)] pb-4">
        <div className="space-y-1">
          <h1 className="font-display font-bold text-3xl sm:text-5xl">
            {COPY.mix.pageTitle}
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-ink-soft)] max-w-xl">
            {COPY.mix.subtitle(MIN_MIX_ITEMS, MAX_MIX_ITEMS)}
          </p>
        </div>
        <span className="font-mono-spec text-xs uppercase text-[var(--color-ink-soft)]">
          {COPY.mix.badge(PORTION_GRAMS)}
        </span>
      </div>

      {/* Ana İki Sütun: Sol Ürün Seçimi + Sağ Poşet Tepsisi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sol: Kategori Filtresi & Karışım Ürün Seçim Izgarası */}
        <div className="lg:col-span-8 space-y-5">
          <div
            role="group"
            aria-label={COPY.mix.categoryFilterAria}
            className="flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => setActiveCategory('tumu')}
              aria-pressed={activeCategory === 'tumu'}
              className={`px-4 py-1.5 rounded-full pop-border font-display font-semibold text-sm cursor-pointer transition-colors ${
                activeCategory === 'tumu'
                  ? 'bg-[var(--color-ink)] text-[var(--color-cream)]'
                  : 'bg-[var(--color-cream-alt)]'
              }`}
            >
              {COPY.mix.allWithCount(mixableProducts.length)}
            </button>
            {mixCategories.map((cat) => {
              const active = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveCategory(cat.slug)}
                  aria-pressed={active}
                  className="px-4 py-1.5 rounded-full pop-border font-display font-semibold text-sm cursor-pointer transition-colors"
                  style={{
                    backgroundColor: active ? cat.color : 'var(--color-cream-alt)',
                    color: active ? cat.inkColor : 'var(--color-ink)',
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {visibleProducts.map((product) => {
              const isSelected = selectedIds.includes(product.id);
              const isFull = !isSelected && selectedIds.length >= MAX_MIX_ITEMS;
              const category = getCategoryBySlug(product.category);
              const portionPrice = getPortionPrice(product);

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => toggleProduct(product.id)}
                  disabled={isFull}
                  aria-pressed={isSelected}
                  className={`text-left p-4 rounded-[var(--radius-card)] pop-border transition-transform flex flex-col gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSelected
                      ? 'bg-[var(--color-butter)] -translate-y-0.5'
                      : 'bg-[var(--color-cream-alt)] hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full pop-border font-mono-spec text-[10px] uppercase truncate"
                      style={{
                        backgroundColor: category?.color ?? 'var(--color-cream)',
                        color: category?.inkColor ?? 'var(--color-ink)',
                      }}
                    >
                      {product.flavor}
                    </span>
                    <span className="w-7 h-7 rounded-full pop-border bg-[var(--color-cream)] flex items-center justify-center shrink-0 font-mono-spec text-xs font-bold">
                      {isSelected ? (
                        <span className="text-[var(--color-tomato)]" aria-hidden="true">✓</span>
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </div>

                  <div className="aspect-square w-full rounded-xl pop-border bg-[var(--color-white)] overflow-hidden flex items-center justify-center p-3 sm:p-4">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="font-mono-spec text-xs text-[var(--color-ink-soft)]">
                        {COPY.mix.imagePlaceholder}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-display font-semibold text-base leading-snug line-clamp-1">
                      {product.name}
                    </p>
                    <div className="mt-1 flex items-center justify-between font-mono-spec text-xs">
                      <span className="text-[var(--color-ink-soft)]">
                        {COPY.mix.portionLabel(PORTION_GRAMS)}
                      </span>
                      <span className="font-bold text-[var(--color-ink)]">
                        +{formatPrice(portionPrice)}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="font-mono-spec text-xs text-[var(--color-ink-soft)]">
            {COPY.mix.excludedNote}
          </p>
        </div>

        {/* Sağ: Canlı Karışım Poşeti Tepsisi */}
        <aside
          aria-label={COPY.mix.trayAria}
          className="relative mt-2.5 lg:col-span-4 lg:sticky lg:top-24 rounded-b-[var(--radius-card)] rounded-t-sm pop-border pop-shadow-lg bg-[var(--color-cream-alt)] overflow-visible"
        >
          <ZigzagEdge color="var(--color-tomato)" />

          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display font-bold text-2xl">{COPY.mix.trayTitle}</h2>
              {selectedProducts.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  aria-label={COPY.mix.resetAria}
                  className="inline-flex items-center gap-1 font-mono-spec text-xs uppercase underline cursor-pointer text-[var(--color-ink-soft)] hover:text-[var(--color-tomato)]"
                >
                  <span aria-hidden="true">↺</span>
                  {COPY.mix.reset}
                </button>
              )}
            </div>

            {/* 6 Bölmeli Slot Listesi */}
            <div className="space-y-2">
              {Array.from({ length: MAX_MIX_ITEMS }).map((_, index) => {
                const item = selectedProducts[index];
                const isRequiredSlot = index < MIN_MIX_ITEMS;

                if (!item) {
                  return (
                    <div
                      key={`slot-${index}`}
                      className="h-12 px-3 rounded-xl border-2 border-dashed border-[var(--color-ink)]/35 bg-[var(--color-cream)]/60 flex items-center justify-between font-mono-spec text-xs text-[var(--color-ink-soft)]"
                    >
                      <span>{COPY.mix.slotLabel(index)}</span>
                      <span>{isRequiredSlot ? COPY.mix.required : COPY.mix.optional}</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className="h-12 px-3 rounded-xl pop-border bg-[var(--color-cream)] flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0 flex items-center gap-2">
                      <span className="font-mono-spec text-[11px] px-1.5 py-0.5 rounded bg-[var(--color-butter)] border border-[var(--color-ink)]">
                        {PORTION_GRAMS}g
                      </span>
                      <span className="font-display font-semibold text-sm truncate">
                        {item.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleProduct(item.id)}
                      aria-label={COPY.mix.removeFromBagAria(item.name)}
                      className="w-7 h-7 rounded-full hover:bg-[var(--color-pink)] flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Canlı Toplam Gramaj ve Fiyat */}
            <div
              aria-live="polite"
              className="pt-4 border-t-2 border-dashed border-[var(--color-ink)] space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="font-mono-spec uppercase text-[var(--color-ink-soft)]">
                  {COPY.mix.selectedCountLabel}
                </span>
                <span className="font-mono-spec font-medium">
                  {selectedProducts.length} / {MAX_MIX_ITEMS}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-mono-spec uppercase text-[var(--color-ink-soft)]">
                  {COPY.mix.totalWeightLabel}
                </span>
                <span className="font-mono-spec font-medium">{COPY.common.netPrefix}{totalGrams}g</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="font-display font-bold text-lg">{COPY.mix.bagTotalLabel}</span>
                <span className="font-display font-bold text-2xl text-[var(--color-tomato)]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddMixToCart}
              disabled={!isReady}
              className="w-full py-3.5 px-6 rounded-full pop-border pop-shadow bg-[var(--color-tomato)] text-[var(--color-cream)] font-display font-bold text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-5 h-5" />
              {isReady
                ? COPY.mix.addMixToCart
                : COPY.mix.minSelectionRemaining(MIN_MIX_ITEMS, MIN_MIX_ITEMS - selectedProducts.length)}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
