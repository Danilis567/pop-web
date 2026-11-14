import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COPY } from '../../content/copy';
import type { Product } from '../../data/products';
import { formatPrice, getCategoryBySlug } from '../../lib/catalog';
import { useCartStore } from '../../store/cartStore';
import { FlavorStripe } from './FlavorStripe';
import { NetWeightTag } from './NetWeightTag';
import { StarburstBadge } from './StarburstBadge';
import { ZigzagEdge } from './ZigzagEdge';

interface PackCardProps {
  product: Product;
}

export function PackCard({ product }: PackCardProps) {
  const ekle = useCartStore((s) => s.ekle);
  const toggleFavorite = useCartStore((s) => s.toggleFavorite);
  const isFavorite = useCartStore((s) => s.favorites.includes(product.slug));
  const category = getCategoryBySlug(product.category);

  const badgeBg = category?.color ?? 'var(--color-butter)';
  const badgeInk = category?.inkColor ?? 'var(--color-ink)';
  const isOutOfStock = product.inStock === false;
  const thumbSrc = product.image
    ? product.image.replace(/\.webp$/, '-400.webp')
    : '';

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    ekle(product, 1);
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      className="relative mt-2.5 flex flex-col bg-[var(--color-cream-alt)] pop-border rounded-b-[var(--radius-card)] rounded-t-sm pop-shadow overflow-visible"
      aria-label={product.name}
    >
      <ZigzagEdge color={badgeBg} />

      <div className="p-4 pt-4 flex flex-col gap-3 flex-1 relative">
        {/* Aroma Şeridi + Net Ağırlık Mono Etiketi */}
        <div className="flex items-center justify-between gap-2">
          <FlavorStripe
            label={product.flavor}
            bgColor={badgeBg}
            inkColor={badgeInk}
          />
          <NetWeightTag weight={product.netWeight} />
        </div>

        {/* Kare Ürün Görseli Kabuğu + Yarım Ton Nokta Köşe Dokusu */}
        <div className="relative">
          <Link
            to={`/product/${product.slug}`}
            aria-label={product.name}
            className="block relative aspect-square w-full rounded-[16px] pop-border bg-[var(--color-white)] overflow-hidden"
          >
            <div
              className="absolute inset-0 halftone-dots opacity-45 pointer-events-none"
              aria-hidden="true"
            />
            {isOutOfStock && (
              <span className="absolute top-2.5 left-2.5 z-[2] px-2.5 py-1 rounded-full pop-border bg-[var(--color-ink)] text-[var(--color-cream)] font-mono-spec text-[10px] uppercase">
                {COPY.common.outOfStock}
              </span>
            )}
            {product.image ? (
              <img
                src={thumbSrc}
                srcSet={`${thumbSrc} 400w, ${product.image} 800w`}
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 24vw"
                width={400}
                height={400}
                alt=""
                loading="lazy"
                className={`relative z-[1] w-full h-full object-contain p-3 sm:p-4 ${isOutOfStock ? 'opacity-55' : ''}`}
              />
            ) : (
              <div className="relative z-[1] w-full h-full flex items-center justify-center text-xs font-mono-spec text-[var(--color-ink-soft)]">
                {COPY.common.imagePlaceholder}
              </div>
            )}
          </Link>

          <StarburstBadge
            price={product.price}
            ariaLabel={COPY.packCard.priceAria(formatPrice(product.price))}
            className="absolute -bottom-3 -right-2 z-[var(--z-badge)]"
          />
        </div>

        {/* Başlık & Alt Başlık */}
        <div className="flex-1">
          <Link to={`/product/${product.slug}`} className="block hover:underline">
            <h3 className="font-display font-semibold text-lg leading-snug text-[var(--color-ink)] line-clamp-2">
              {product.name}
            </h3>
          </Link>
          {product.subtitle && (
            <p className="mt-1 text-sm text-[var(--color-ink-soft)] line-clamp-2">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Alt Aksiyonlar: Kalp & Sepet Yuvarlak Butonları */}
        <div className="pt-1 flex items-center justify-between gap-2">
          <span className="font-mono-spec text-[11px] uppercase text-[var(--color-ink)]">
            {isOutOfStock
              ? COPY.common.outOfStock
              : product.batchCode || COPY.common.freshBatchFallback}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite(product.slug)}
              aria-label={isFavorite ? COPY.common.removeFromFavoritesAria : COPY.common.addToFavoritesAria}
              aria-pressed={isFavorite}
              className="w-10 h-10 rounded-full pop-border flex items-center justify-center transition-colors cursor-pointer"
              style={{
                backgroundColor: isFavorite ? 'var(--color-pink)' : 'var(--color-cream)',
              }}
            >
              <Heart
                className="w-4 h-4"
                fill={isFavorite ? 'var(--color-ink)' : 'none'}
              />
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              aria-label={
                isOutOfStock
                  ? COPY.common.outOfStockAria(product.name)
                  : COPY.packCard.addToCartAria(product.name)
              }
              className="w-10 h-10 rounded-full pop-border bg-[var(--color-butter)] hover:bg-[var(--color-lime)] disabled:bg-[var(--color-cream)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
