import * as Select from '@radix-ui/react-select';
import * as Slider from '@radix-ui/react-slider';
import { Heart, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { EmptyStateIllustration } from '../components/packaging/EmptyStateIllustration';
import { PackCard } from '../components/packaging/PackCard';
import { COPY } from '../content/copy';
import { products } from '../data/products';
import { usePageMeta } from '../hooks/usePageMeta';
import { useProductSearch } from '../hooks/useProductSearch';
import { formatPrice, getCategories, getCategoryBySlug } from '../lib/catalog';
import { useCartStore } from '../store/cartStore';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
const VALID_SORTS: SortKey[] = ['featured', 'price-asc', 'price-desc', 'name-asc'];

export default function ShopPage() {
  const { category: routeCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const categories = getCategories();
  const activeCategory = routeCategory || 'tumu';
  const currentCategoryObj = getCategoryBySlug(routeCategory);

  usePageMeta(
    currentCategoryObj ? COPY.shop.categoryMetaTitle(currentCategoryObj.name) : COPY.shop.defaultMetaTitle,
    currentCategoryObj?.description || COPY.shop.defaultMetaDescription
  );

  const maxCatalogPrice = useMemo(() => {
    if (products.length === 0) return 500;
    return Math.ceil(Math.max(...products.map((p) => p.price)) / 50) * 50;
  }, []);

  const parseNum = (val: string | null, fallback: number) => {
    if (val === null) return fallback;
    const n = Number(val);
    return Number.isFinite(n) && n >= 0 ? n : fallback;
  };

  const initialMin = Math.min(maxCatalogPrice, parseNum(searchParams.get('min'), 0));
  const initialMax = Math.max(initialMin, Math.min(maxCatalogPrice, parseNum(searchParams.get('max'), maxCatalogPrice)));
  const rawSort = searchParams.get('sort') as SortKey | null;
  const initialSort: SortKey = rawSort && VALID_SORTS.includes(rawSort) ? rawSort : 'featured';

  const [priceRange, setPriceRange] = useState<[number, number]>([initialMin, initialMax]);
  const [sortBy, setSortBy] = useState<SortKey>(initialSort);
  const favorites = useCartStore((s) => s.favorites);
  const [favOnly, setFavOnly] = useState<boolean>(searchParams.get('fav') === '1');

  const initialQuery = searchParams.get('q') || '';
  const { query, setQuery, results } = useProductSearch(products, initialQuery);

  // Sync URL query params -> local state on external navigation (e.g. Header search or favorites link)
  useEffect(() => {
    const qParam = searchParams.get('q') || '';
    const favParam = searchParams.get('fav') === '1';
    const sortParam = searchParams.get('sort') as SortKey | null;
    const minParam = Math.min(maxCatalogPrice, parseNum(searchParams.get('min'), 0));
    const maxParam = Math.max(minParam, Math.min(maxCatalogPrice, parseNum(searchParams.get('max'), maxCatalogPrice)));

    setQuery((prev) => (prev === qParam ? prev : qParam));
    setFavOnly(favParam);
    setSortBy(sortParam && VALID_SORTS.includes(sortParam) ? sortParam : 'featured');
    setPriceRange([minParam, maxParam]);
  }, [searchParams, maxCatalogPrice, setQuery]);

  const updateUrlParams = (overrides: {
    q?: string;
    min?: number;
    max?: number;
    sort?: SortKey;
    fav?: boolean;
  }) => {
    const next = new URLSearchParams();
    const qVal = overrides.q !== undefined ? overrides.q : query;
    const minVal = overrides.min !== undefined ? overrides.min : priceRange[0];
    const maxVal = overrides.max !== undefined ? overrides.max : priceRange[1];
    const sortVal = overrides.sort !== undefined ? overrides.sort : sortBy;
    const favVal = overrides.fav !== undefined ? overrides.fav : favOnly;

    if (qVal.trim()) next.set('q', qVal.trim());
    if (minVal > 0) next.set('min', String(minVal));
    if (maxVal < maxCatalogPrice) next.set('max', String(maxVal));
    if (sortVal !== 'featured') next.set('sort', sortVal);
    if (favVal) next.set('fav', '1');

    setSearchParams(next, { replace: true });
  };

  const filteredProducts = useMemo(() => {
    const byCategory =
      activeCategory === 'tumu'
        ? results
        : results.filter((p) => p.category === activeCategory);

    const byPrice = byCategory.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    const byFav = favOnly
      ? byPrice.filter((p) => favorites.includes(p.slug))
      : byPrice;

    const sorted = [...byFav];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
        break;
      default:
        sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    }
    return sorted;
  }, [activeCategory, favOnly, favorites, priceRange, results, sortBy]);

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
      {/* Kompakt Başlık & Sayım */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-[var(--color-ink)] pb-4">
        <div className="space-y-1">
          <h1 className="font-display font-bold text-3xl sm:text-4xl">
            {currentCategoryObj ? currentCategoryObj.name : COPY.shop.title}
          </h1>
          {currentCategoryObj?.description && (
            <p className="text-sm text-[var(--color-ink-soft)]">
              {currentCategoryObj.description}
            </p>
          )}
        </div>
        <span className="font-mono-spec text-xs uppercase text-[var(--color-ink-soft)]">
          {COPY.shop.listedCount(filteredProducts.length)}
        </span>
      </div>

      {/* Düz Konturlu Filtre & Arama Çubuğu (Gölgesiz) */}
      <div className="p-4 sm:p-5 rounded-[var(--radius-card)] pop-border bg-[var(--color-cream-alt)] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Fuse.js Arama */}
          <div className="md:col-span-5 relative">
            <Search aria-hidden="true" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                const nextQ = e.target.value;
                setQuery(nextQ);
                updateUrlParams({ q: nextQ });
              }}
              placeholder={COPY.shop.searchPlaceholder}
              aria-label={COPY.shop.searchAria}
              className="w-full h-11 pl-10 pr-4 rounded-full pop-border bg-[var(--color-white)] text-base sm:text-sm"
            />
          </div>

          {/* Fiyat Slider */}
          <div className="md:col-span-4 space-y-1.5 px-1">
            <div className="flex items-center justify-between font-mono-spec text-xs">
              <span>{COPY.shop.priceRangeLabel}</span>
              <span>
                {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
              </span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={priceRange}
              max={maxCatalogPrice}
              min={0}
              step={10}
              onValueChange={(val) => {
                const nextRange: [number, number] = [val[0], val[1]];
                setPriceRange(nextRange);
                updateUrlParams({ min: nextRange[0], max: nextRange[1] });
              }}
              aria-label={COPY.shop.priceRangeAria}
            >
              <Slider.Track className="bg-[var(--color-cream)] pop-border relative grow rounded-full h-2.5">
                <Slider.Range className="absolute bg-[var(--color-tomato)] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="relative block w-5 h-5 rounded-full pop-border bg-[var(--color-butter)] cursor-pointer before:content-[''] before:absolute before:-inset-3 focus-visible:outline-3 focus-visible:outline-[var(--focus-ring)] focus-visible:outline-offset-2" />
              <Slider.Thumb className="relative block w-5 h-5 rounded-full pop-border bg-[var(--color-butter)] cursor-pointer before:content-[''] before:absolute before:-inset-3 focus-visible:outline-3 focus-visible:outline-[var(--focus-ring)] focus-visible:outline-offset-2" />
            </Slider.Root>
          </div>

          {/* Sıralama Select */}
          <div className="md:col-span-3">
            <Select.Root
              value={sortBy}
              onValueChange={(v) => {
                const nextSort = v as SortKey;
                setSortBy(nextSort);
                updateUrlParams({ sort: nextSort });
              }}
            >
              <Select.Trigger
                aria-label={COPY.shop.sortAria}
                className="w-full h-11 px-4 rounded-full pop-border bg-[var(--color-white)] flex items-center justify-between font-display font-medium text-sm cursor-pointer"
              >
                <Select.Value />
                <Select.Icon aria-hidden="true" className="font-mono-spec text-xs">
                  ▾
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="z-[var(--z-modal)] overflow-hidden rounded-[var(--radius-sm)] pop-border bg-[var(--color-cream)]">
                  <Select.Viewport className="p-1.5">
                    {COPY.shop.sortOptions.map((opt) => (
                      <Select.Item
                        key={opt.value}
                        value={opt.value}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-display cursor-pointer hover:bg-[var(--color-butter)]"
                      >
                        <Select.ItemText>{opt.label}</Select.ItemText>
                        <Select.ItemIndicator aria-hidden="true" className="font-mono-spec text-xs">
                          ✓
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>

        {/* Kategori Hapları */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => navigate(`/shop${searchParams.toString() ? `?${searchParams.toString()}` : ''}`)}
            aria-pressed={activeCategory === 'tumu'}
            className={`min-h-[44px] inline-flex items-center px-4 py-2 rounded-full pop-border font-display font-semibold text-sm cursor-pointer ${
              activeCategory === 'tumu'
                ? 'bg-[var(--color-ink)] text-[var(--color-cream)]'
                : 'bg-[var(--color-cream)]'
            }`}
          >
            {COPY.common.all}
          </button>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => navigate(`/shop/${cat.slug}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`)}
                aria-pressed={isActive}
                className="min-h-[44px] inline-flex items-center px-4 py-2 rounded-full pop-border font-display font-semibold text-sm cursor-pointer"
                style={{
                  backgroundColor: isActive ? cat.color : 'var(--color-cream)',
                  color: isActive ? cat.inkColor : 'var(--color-ink)',
                }}
              >
                {cat.name}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => {
              const nextFav = !favOnly;
              setFavOnly(nextFav);
              updateUrlParams({ fav: nextFav });
            }}
            aria-pressed={favOnly}
            className={`min-h-[44px] px-4 py-2 rounded-full pop-border font-display font-semibold text-sm cursor-pointer inline-flex items-center gap-1.5 transition-colors ${
              favOnly
                ? 'bg-[var(--color-pink)] text-[var(--color-ink)]'
                : 'bg-[var(--color-cream)] hover:bg-[var(--color-pink)]/40'
            }`}
          >
            <Heart
              aria-hidden="true"
              className="w-3.5 h-3.5"
              fill={favOnly ? 'var(--color-ink)' : 'none'}
            />
            {COPY.shop.favoritesLabel(favorites.length)}
          </button>
        </div>
      </div>

      {/* Ürün Izgarası */}
      <h2 className="sr-only">Ürünler</h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <PackCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-10 rounded-[var(--radius-card)] pop-border bg-[var(--color-cream-alt)] text-center space-y-4">
          <EmptyStateIllustration variant="no-results" className="w-24 h-24 mx-auto" />
          <p className="font-display font-bold text-xl">
            {products.length === 0
              ? COPY.shop.emptyCatalogTitle
              : COPY.shop.emptyResultsTitle}
          </p>
          <p className="text-sm text-[var(--color-ink-soft)] max-w-md mx-auto">
            {products.length === 0
              ? COPY.shop.emptyCatalogSubtitle
              : COPY.shop.emptyResultsSubtitle}
          </p>
          {products.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setPriceRange([0, maxCatalogPrice]);
                setSortBy('featured');
                setFavOnly(false);
                navigate('/shop');
              }}
              className="px-5 py-2 rounded-full pop-border bg-[var(--color-butter)] font-display font-semibold text-sm cursor-pointer"
            >
              {COPY.shop.resetFilters}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
