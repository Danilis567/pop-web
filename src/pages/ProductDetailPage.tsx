import * as Accordion from '@radix-ui/react-accordion';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EmptyStateIllustration } from '../components/packaging/EmptyStateIllustration';
import { FlavorStripe } from '../components/packaging/FlavorStripe';
import { NetWeightTag } from '../components/packaging/NetWeightTag';
import { PackCard } from '../components/packaging/PackCard';
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

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState('');

  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
    setSelectedFlavor(product?.flavors?.[0]?.label || product?.flavor || '');
  }, [product]);

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
            className="inline-flex px-6 py-2.5 rounded-full pop-border bg-[var(--color-butter)] font-display font-semibold text-sm"
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

  const ingredientsText = Array.isArray(product.ingredients)
    ? product.ingredients.join(', ')
    : product.ingredients?.trim() || COPY.common.toBeAdded;

  const allergensText = Array.isArray(product.allergens)
    ? product.allergens.join(', ')
    : product.allergens?.trim() || COPY.common.toBeAdded;

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-8 space-y-16">
      {/* Breadcrumb */}
      <nav aria-label={COPY.common.breadcrumbAria} className="font-mono-spec text-xs uppercase text-[var(--color-ink-soft)] flex flex-wrap items-center gap-2">
        <Link to="/" className="hover:underline">{COPY.common.home}</Link>
        <span>/</span>
        <Link to="/shop" className="hover:underline">{COPY.common.shop}</Link>
        {category && (
          <>
            <span>/</span>
            <Link to={`/shop/${category.slug}`} className="hover:underline">
              {category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span>{product.name}</span>
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
            <span className="font-display font-bold text-3xl text-[var(--color-tomato)]">
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
              <div className="flex flex-wrap gap-2.5">
                {product.flavors.map((opt) => {
                  const active = selectedFlavor === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setSelectedFlavor(opt.label)}
                      className={`px-3.5 py-2 rounded-full pop-border flex items-center gap-2 font-display font-medium text-sm cursor-pointer ${
                        active ? 'bg-[var(--color-butter)]' : 'bg-[var(--color-cream)]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-[var(--color-ink)]"
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
            <div className="inline-flex items-center h-12 rounded-full pop-border bg-[var(--color-cream-alt)] px-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label={COPY.common.decreaseQtyAria}
                className="w-9 h-9 flex items-center justify-center cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-mono-spec font-medium">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label={COPY.common.increaseQtyAria}
                className="w-9 h-9 flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <motion.button
              type="button"
              whileTap={isOutOfStock ? undefined : { scale: 0.96 }}
              disabled={isOutOfStock}
              onClick={() => {
                if (!isOutOfStock) ekle(product, quantity, selectedFlavor);
              }}
              className="flex-1 min-w-[180px] h-12 px-6 rounded-full pop-border pop-shadow bg-[var(--color-tomato)] text-[var(--color-cream)] disabled:bg-[var(--color-cream-alt)] disabled:text-[var(--color-ink-soft)] disabled:shadow-none disabled:cursor-not-allowed font-display font-semibold text-base flex items-center justify-center gap-2 cursor-pointer pop-spring hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-5 h-5" />
              {isOutOfStock ? COPY.common.outOfStock : COPY.pdp.addToCart}
            </motion.button>

            <button
              type="button"
              onClick={() => toggleFavorite(product.slug)}
              aria-label={isFavorite ? COPY.common.removeFromFavoritesAria : COPY.common.addToFavoritesAria}
              className="w-12 h-12 rounded-full pop-border flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: isFavorite ? 'var(--color-pink)' : 'var(--color-cream-alt)',
              }}
            >
              <Heart className="w-5 h-5" fill={isFavorite ? 'var(--color-ink)' : 'none'} />
            </button>
          </div>

          {/* Besin Etiketi Görünümlü Bilgi Paneli */}
          <div className="rounded-[var(--radius-sm)] border-2 border-[var(--color-ink)] bg-[var(--color-white)] overflow-hidden">
            <div className="px-4 py-2.5 bg-[var(--color-ink)] text-[var(--color-cream)] flex items-center justify-between">
              <span className="font-display font-bold text-sm tracking-wide uppercase">
                {COPY.pdp.nutritionTitle}
              </span>
              <span className="font-mono-spec text-[11px] uppercase">
                {COPY.common.netPrefix}{product.netWeight}
              </span>
            </div>
            <div className="divide-y border-[var(--color-ink)] divide-[var(--color-ink)]/25 text-xs">
              <div className="px-4 py-2 flex justify-between gap-4">
                <span className="font-mono-spec text-[11px] uppercase text-[var(--color-ink)]">
                  {COPY.pdp.batchCodeLabel}
                </span>
                <span className="font-mono-spec text-[11px] font-medium text-[var(--color-ink)]">
                  {product.batchCode || COPY.common.freshBatchFallback}
                </span>
              </div>
              <div className="px-4 py-2 flex justify-between gap-4">
                <span className="font-mono-spec text-[11px] uppercase text-[var(--color-ink)]">
                  {COPY.pdp.flavorStripLabel}
                </span>
                <span className="font-mono-spec text-[11px] font-medium text-[var(--color-ink)]">
                  {product.flavor}
                </span>
              </div>
              <div className="px-4 py-2 flex justify-between gap-4">
                <span className="font-mono-spec text-[11px] uppercase text-[var(--color-ink)]">
                  {COPY.pdp.ingredientsLabel}
                </span>
                <span className="font-body text-right text-[var(--color-ink)]">
                  {ingredientsText}
                </span>
              </div>
              <div className="px-4 py-2 flex justify-between gap-4">
                <span className="font-mono-spec text-[11px] uppercase text-[var(--color-ink)]">
                  {COPY.pdp.allergensLabel}
                </span>
                <span className="font-body text-right text-[var(--color-ink)]">
                  {allergensText}
                </span>
              </div>
            </div>
          </div>

          {/* Renkli Hap Akordeon Satırları */}
          <Accordion.Root type="multiple" defaultValue={['ingredients']} className="space-y-2.5 pt-2">
            <Accordion.Item
              value="ingredients"
              className="rounded-[var(--radius-sm)] pop-border bg-[var(--color-cream-alt)] overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full px-4 py-3 flex items-center justify-between font-display font-semibold text-sm cursor-pointer">
                  <span>{COPY.pdp.accordionIngredients}</span>
                  <Plus className="w-4 h-4" />
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
                <Accordion.Trigger className="w-full px-4 py-3 flex items-center justify-between font-display font-semibold text-sm cursor-pointer">
                  <span>{COPY.pdp.accordionAllergens}</span>
                  <Plus className="w-4 h-4" />
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
                <Accordion.Trigger className="w-full px-4 py-3 flex items-center justify-between font-display font-semibold text-sm cursor-pointer">
                  <span>{COPY.pdp.accordionStorage}</span>
                  <Plus className="w-4 h-4" />
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
              <div className="relative aspect-square rounded-[22px] pop-border bg-[var(--color-white)] overflow-hidden flex items-center justify-center">
                <div
                  className="absolute inset-0 halftone-dots opacity-45 pointer-events-none"
                  aria-hidden="true"
                />
                {isOutOfStock && (
                  <span className="absolute top-3 left-3 z-[2] px-3 py-1 rounded-full pop-border bg-[var(--color-ink)] text-[var(--color-cream)] font-mono-spec text-xs uppercase">
                    {COPY.common.outOfStock}
                  </span>
                )}
                {gallery[selectedImage] ? (
                  <img
                    src={gallery[selectedImage]}
                    alt={product.imageAlt || product.name}
                    className={`relative z-[1] w-full h-full object-contain p-3 sm:p-4 ${isOutOfStock ? 'opacity-55' : ''}`}
                  />
                ) : (
                  <span className="font-mono-spec text-xs text-[var(--color-ink-soft)]">
                    {COPY.pdp.imagePlaceholder}
                  </span>
                )}
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
                  className={`w-20 h-20 rounded-xl pop-border bg-[var(--color-white)] p-1.5 shrink-0 cursor-pointer ${
                    selectedImage === idx ? 'ring-2 ring-[var(--color-tomato)]' : 'opacity-75'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
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
    </div>
  );
}
