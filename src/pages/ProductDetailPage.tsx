import * as Accordion from '@radix-ui/react-accordion';
import { Check, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EmptyStateIllustration } from '../components/packaging/EmptyStateIllustration';
import { FlavorStripe } from '../components/packaging/FlavorStripe';
import { NetWeightTag } from '../components/packaging/NetWeightTag';
import { PackCard } from '../components/packaging/PackCard';
import { ProductImage } from '../components/packaging/ProductImage';
import { StarburstBadge } from '../components/packaging/StarburstBadge';
import { ZigzagEdge } from '../components/packaging/ZigzagEdge';
import { COPY } from '../content/copy';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  formatPrice,
  getCategoryBySlug,
  getProductBySlug,
  getRelatedProducts,
} from '../lib/catalog';
import { useCartStore } from '../store/cartStore';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  usePageMeta(
    product ? product.name : COPY.pdp.notFoundMetaTitle,
    product?.subtitle || product?.description
  );

  const ekle = useCartStore((s) => s.ekle);
  const toggleFavorite = useCartStore((s) => s.toggleFavorite);
  const isFavorite = useCartStore((s) =>
    product ? s.favorites.includes(product.slug) : false
  );

  const MAX_QTY = 99;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [justAdded, setJustAdded] = useState(false);
  const addedTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
    setSelectedFlavor(product?.flavors?.[0]?.label || product?.flavor || '');
    setJustAdded(false);
    if (addedTimerRef.current !== null) {
      window.clearTimeout(addedTimerRef.current);
      addedTimerRef.current = null;
    }
  }, [product]);

  useEffect(() => {
    return () => {
      if (addedTimerRef.current !== null) {
        window.clearTimeout(addedTimerRef.current);
      }
    };
  }, []);

  if (!product) {
    return (
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
        <div className="max-w-md mx-auto p-8 rounded-[var(--radius-card)] pop-border bg-[var(--color-cream-alt)] space-y-4">
          <EmptyStateIllustration variant="torn-bag" className="w-24 h-24 mx-auto" />
          <h1 className="font-display font-bold text-3xl">{COPY.pdp.notFoundTitle}</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">
            {COPY.pdp.notFoundDescription}
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-full pop-border bg-[var(--color-butter)] font-display font-semibold text-sm active:scale-[0.96] transition-transform"
          >
            {COPY.common.backToShop}
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategoryBySlug(product.category);
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const related = getRelatedProducts(product, 4);
  const isOutOfStock = product.inStock === false;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    ekle(product, quantity, selectedFlavor);
    setJustAdded(true);
    if (addedTimerRef.current !== null) {
      window.clearTimeout(addedTimerRef.current);
    }
    addedTimerRef.current = window.setTimeout(() => {
      setJustAdded(false);
      addedTimerRef.current = null;
    }, 1600);
  };

  const ingredientsText = Array.isArray(product.ingredients)
    ? product.ingredients.join(', ')
    : product.ingredients?.trim() || COPY.common.toBeAdded;

  const allergensText = Array.isArray(product.allergens)
    ? product.allergens.join(', ')
    : product.allergens?.trim() || COPY.common.toBeAdded;

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 pt-8 sm:py-10 pb-24 lg:pb-10 space-y-16">
      {/* Breadcrumb */}
      <nav aria-label={COPY.common.breadcrumbAria} className="font-mono-spec text-xs uppercase text-[var(--color-ink-soft)] flex flex-nowrap items-center gap-2 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="inline-flex items-center min-h-[44px] py-2 -my-2 shrink-0 hover:underline">{COPY.common.home}</Link>
        <span aria-hidden="true" className="shrink-0">/</span>
        <Link to="/shop" className="inline-flex items-center min-h-[44px] py-2 -my-2 shrink-0 hover:underline">{COPY.common.shop}</Link>
        {category && (
          <>
            <span aria-hidden="true" className="shrink-0">/</span>
            <Link to={`/shop/${category.slug}`} className="inline-flex items-center min-h-[44px] py-2 -my-2 shrink-0 hover:underline">
              {category.name}
            </Link>
          </>
        )}
        <span aria-hidden="true" className="shrink-0">/</span>
        <span aria-current="page" className="inline-flex items-center min-h-[44px] py-2 -my-2 shrink-0 text-[var(--color-ink)]">{product.name}</span>
      </nav>

      {/* Sol Bilgi + Sağ Büyük Görsel + Küçük Görsel Şeridi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Sol Bilgi Sütunu */}
        <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
          <div className="space-y-2">
            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-tight">
              {product.name}
            </h1>
            {product.subtitle && (
              <p className="text-lg text-[var(--color-ink-soft)]">{product.subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="font-display font-bold text-3xl text-[var(--color-tomato)] tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>

          {product.description && (
            <p className="text-base leading-relaxed text-[var(--color-ink-soft)]">
              {product.description}
            </p>
          )}

          {/* Aroma / Renk Örnekleri */}
          {product.flavors && product.flavors.length > 0 && (
            <div className="space-y-2">
              <p className="font-mono-spec text-xs uppercase text-[var(--color-ink-soft)]">
                {COPY.pdp.flavorLabel(selectedFlavor)}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map((opt) => {
                  const active = selectedFlavor === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      disabled={isOutOfStock}
                      aria-pressed={active}
                      onClick={() => setSelectedFlavor(opt.label)}
                      className={`min-h-[44px] px-4 py-2 rounded-full pop-border flex items-center gap-2 font-display font-medium text-sm cursor-pointer transition-transform active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${
                        active ? 'bg-[var(--color-butter)]' : 'bg-[var(--color-cream)] hover:bg-[var(--color-cream-alt)]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="w-4 h-4 rounded-full border border-[var(--color-ink)] shrink-0"
                        style={{ backgroundColor: opt.color }}
                      />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Adet + Sepete Ekle + Favori */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center h-12 rounded-full pop-border bg-[var(--color-cream-alt)] px-1">
              <button
                type="button"
                disabled={isOutOfStock || quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label={COPY.common.decreaseQtyAria}
                className="w-11 h-11 flex items-center justify-center rounded-full cursor-pointer transition-transform active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                <Minus className="w-4 h-4" aria-hidden="true" />
              </button>
              <span className="w-9 text-center font-mono-spec font-medium tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                disabled={isOutOfStock || quantity >= MAX_QTY}
                onClick={() => setQuantity((q) => Math.min(MAX_QTY, q + 1))}
                aria-label={COPY.common.increaseQtyAria}
                className="w-11 h-11 flex items-center justify-center rounded-full cursor-pointer transition-transform active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className="flex-1 min-w-[180px] h-12 min-h-[48px] px-6 rounded-full pop-border pop-shadow bg-[var(--color-tomato)] text-[var(--color-cream)] disabled:bg-[var(--color-cream-alt)] disabled:text-[var(--color-ink-soft)] disabled:shadow-none disabled:cursor-not-allowed font-display font-semibold text-base flex items-center justify-center gap-2 cursor-pointer pop-spring hover:-translate-y-0.5 active:scale-[0.96] disabled:hover:translate-y-0 disabled:active:scale-100"
            >
              {justAdded ? (
                <Check className="w-5 h-5" aria-hidden="true" />
              ) : (
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              )}
              {isOutOfStock
                ? COPY.common.outOfStock
                : justAdded
                  ? 'Eklendi'
                  : COPY.pdp.addToCart}
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite(product.slug)}
              aria-pressed={isFavorite}
              aria-label={
                isFavorite
                  ? COPY.packCard.removeFromFavoritesAria(product.name)
                  : COPY.packCard.addToFavoritesAria(product.name)
              }
              className="w-12 h-12 min-w-[44px] min-h-[44px] rounded-full pop-border flex items-center justify-center cursor-pointer transition-transform active:scale-[0.96]"
              style={{
                backgroundColor: isFavorite ? 'var(--color-pink)' : 'var(--color-cream-alt)',
              }}
            >
              <Heart className="w-5 h-5" fill={isFavorite ? 'var(--color-ink)' : 'none'} aria-hidden="true" />
            </button>
          </div>

          {/* Besin Etiketi Görünümlü Bilgi Paneli */}
          <div className="rounded-[var(--radius-sm)] border-2 border-[var(--color-ink)] bg-[var(--color-white)] overflow-hidden">
            <div className="px-4 py-3 bg-[var(--color-ink)] text-[var(--color-cream)] flex items-center justify-between gap-4">
              <span className="font-display font-bold text-sm tracking-wide uppercase">
                {COPY.pdp.nutritionTitle}
              </span>
              <span className="font-mono-spec text-xs normal-case tabular-nums shrink-0">
                {COPY.common.netPrefix}{product.netWeight}
              </span>
            </div>
            <div className="divide-y border-[var(--color-ink)] divide-[var(--color-ink)]/25 text-xs">
              <div className="px-4 py-2 flex justify-between gap-4">
                <span className="font-mono-spec text-xs uppercase text-[var(--color-ink)] shrink-0">
                  {COPY.pdp.batchCodeLabel}
                </span>
                <span className="font-mono-spec text-xs font-medium text-[var(--color-ink)] tabular-nums min-w-0 break-words text-right">
                  {product.batchCode || COPY.common.freshBatchFallback}
                </span>
              </div>
              <div className="px-4 py-2 flex justify-between gap-4">
                <span className="font-mono-spec text-xs uppercase text-[var(--color-ink)] shrink-0">
                  {COPY.pdp.flavorStripLabel}
                </span>
                <span className="font-mono-spec text-xs font-medium text-[var(--color-ink)] min-w-0 break-words text-right">
                  {product.flavor}
                </span>
              </div>
              <div className="px-4 py-2 flex justify-between gap-4">
                <span className="font-mono-spec text-xs uppercase text-[var(--color-ink)] shrink-0">
                  {COPY.pdp.ingredientsLabel}
                </span>
                <span className="font-body text-right text-[var(--color-ink)] min-w-0 break-words">
                  {ingredientsText}
                </span>
              </div>
              <div className="px-4 py-2 flex justify-between gap-4">
                <span className="font-mono-spec text-xs uppercase text-[var(--color-ink)] shrink-0">
                  {COPY.pdp.allergensLabel}
                </span>
                <span className="font-body text-right text-[var(--color-ink)] min-w-0 break-words">
                  {allergensText}
                </span>
              </div>
            </div>
          </div>

          {/* Renkli Hap Akordeon Satırları */}
          <h2 className="sr-only">Ürün Ayrıntıları</h2>
          <Accordion.Root type="multiple" defaultValue={['ingredients']} className="space-y-3 pt-2">
            <Accordion.Item
              value="ingredients"
              className="rounded-[var(--radius-sm)] pop-border bg-[var(--color-cream-alt)] overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full min-h-[44px] px-4 py-3 flex items-center justify-between font-display font-semibold text-sm cursor-pointer">
                  <span>{COPY.pdp.accordionIngredients}</span>
                  <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 text-sm text-[var(--color-ink-soft)]">
                {ingredientsText}
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item
              value="allergens"
              className="rounded-[var(--radius-sm)] pop-border bg-[var(--color-powder-blue)]/40 overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full min-h-[44px] px-4 py-3 flex items-center justify-between font-display font-semibold text-sm cursor-pointer">
                  <span>{COPY.pdp.accordionAllergens}</span>
                  <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 text-sm text-[var(--color-ink-soft)]">
                {allergensText}
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item
              value="storage"
              className="rounded-[var(--radius-sm)] pop-border bg-[var(--color-butter)]/40 overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full min-h-[44px] px-4 py-3 flex items-center justify-between font-display font-semibold text-sm cursor-pointer">
                  <span>{COPY.pdp.accordionStorage}</span>
                  <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 text-sm text-[var(--color-ink-soft)]">
                {product.storage || COPY.pdp.defaultStorage}
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>

        {/* Sağ Büyük Görsel + Küçük Görsel Şeridi */}
        <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
          <div className="relative mt-3 rounded-b-[var(--radius-card-lg)] rounded-t-sm pop-border pop-shadow-lg bg-[var(--color-cream-alt)] overflow-visible">
            <ZigzagEdge color={category?.color || 'var(--color-butter)'} />

            <div className="px-4 pt-4 pb-3 flex items-center justify-between gap-2">
              <FlavorStripe
                label={product.flavor}
                bgColor={category?.color ?? 'var(--color-butter)'}
                inkColor={category?.inkColor ?? 'var(--color-ink)'}
              />
              <NetWeightTag weight={product.netWeight} />
            </div>

            <div className="p-4 pt-0 relative">
              <div className="relative w-full aspect-square rounded-[22px] pop-border bg-[var(--color-white)] overflow-hidden flex items-center justify-center">
                {isOutOfStock && (
                  <span className="absolute top-3 left-3 z-[2] px-3 py-1 rounded-full pop-border bg-[var(--color-ink)] text-[var(--color-cream)] font-mono-spec text-xs uppercase">
                    {COPY.common.outOfStock}
                  </span>
                )}
                <ProductImage
                  src={gallery[selectedImage]}
                  alt={product.imageAlt || product.name}
                  width={800}
                  height={800}
                  priority
                  sizes="(max-width: 1023px) 92vw, 560px"
                  className={`relative z-[1] w-full h-full object-contain p-3 sm:p-4 ${isOutOfStock ? 'opacity-55' : ''}`}
                />
              </div>

              <StarburstBadge
                price={product.price}
                size="lg"
                ariaLabel={COPY.packCard.priceAria(formatPrice(product.price))}
                className="absolute bottom-1 right-1 z-[var(--z-badge)]"
              />
            </div>
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {gallery.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  aria-label={`${product.name} görsel ${idx + 1}`}
                  aria-pressed={selectedImage === idx}
                  className={`w-20 h-20 min-w-[44px] min-h-[44px] rounded-xl pop-border bg-[var(--color-white)] p-2 shrink-0 cursor-pointer transition-transform active:scale-[0.96] ${
                    selectedImage === idx ? 'ring-2 ring-[var(--color-tomato)]' : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <ProductImage
                    src={img}
                    alt=""
                    width={80}
                    height={80}
                    sizes="80px"
                    priority={false}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bunlar da hoşuna gidebilir */}
      {related.length > 0 && (
        <section className="space-y-6">
          <h2 className="font-display font-bold text-3xl">
            {COPY.pdp.relatedTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((item) => (
              <PackCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* Mobil Sabit Sepete Ekle Çubuğu */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-[var(--z-sticky,40)] border-t-2 border-[var(--color-ink)] bg-[var(--color-cream)] px-4 pb-[env(safe-area-inset-bottom)]">
        <div className="py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display font-bold text-lg text-[var(--color-tomato)] tabular-nums leading-tight">
              {formatPrice(product.price)}
            </p>
            <p className="font-mono-spec text-xs text-[var(--color-ink-soft)] truncate">
              {product.name}
            </p>
          </div>
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="min-h-[44px] h-11 px-5 rounded-full pop-border pop-shadow bg-[var(--color-tomato)] text-[var(--color-cream)] disabled:bg-[var(--color-cream-alt)] disabled:text-[var(--color-ink-soft)] disabled:shadow-none disabled:cursor-not-allowed font-display font-semibold text-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer transition-transform active:scale-[0.96] disabled:active:scale-100"
          >
            {justAdded ? (
              <Check className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            )}
            {isOutOfStock
              ? COPY.common.outOfStock
              : justAdded
                ? 'Eklendi'
                : COPY.pdp.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
