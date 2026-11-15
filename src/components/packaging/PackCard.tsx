import { Check, Heart, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COPY } from '../../content/copy';
import type { Product } from '../../data/products';
import { formatPrice, getCategoryBySlug } from '../../lib/catalog';
import { useCartStore } from '../../store/cartStore';
import { FlavorStripe } from './FlavorStripe';
import { NetWeightTag } from './NetWeightTag';
import { ProductImage } from './ProductImage';
import { StarburstBadge } from './StarburstBadge';
import { ZigzagEdge } from './ZigzagEdge';

interface PackCardProps {
  product: Product;
  priority?: boolean;
}

export function PackCard({ product, priority = false }: PackCardProps) {
  const ekle = useCartStore((s) => s.ekle);
  const toggleFavorite = useCartStore((s) => s.toggleFavorite);
  const isFavorite = useCartStore((s) => s.favorites.includes(product.slug));
  const category = getCategoryBySlug(product.category);

  const badgeBg = category?.color ?? 'var(--color-butter)';
  const badgeInk = category?.inkColor ?? 'var(--color-ink)';
  const isOutOfStock = product.inStock === false;
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(false), 1400);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    ekle(product, 1);
    setJustAdded(true);
  };

  return (
    <article
      className="relative mt-2.5 flex flex-col bg-[var(--color-cream-alt)] pop-border rounded-b-[var(--radius-card)] rounded-t-sm pop-shadow overflow-visible hover:-translate-y-1 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-pop)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      aria-label={product.name}
    >
      <ZigzagEdge color={badgeBg} />

      <div className="mt-3 p-4 pt-4 flex flex-col gap-3 flex-1 relative">
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
            tabIndex={-1}
            aria-hidden="true"
            className="block relative aspect-square w-full p-1.5 rounded-[var(--radius-md)] pop-border bg-[var(--color-white)] overflow-hidden"
          >
            {isOutOfStock && (
              <span className="absolute top-2.5 left-2.5 z-[2] px-2.5 py-1 rounded-full pop-border bg-[var(--color-ink)] text-[var(--color-cream)] font-mono-spec text-xs uppercase">
                {COPY.common.outOfStock}
              </span>
            )}
            <ProductImage
              src={product.image}
              alt=""
              width={400}
              height={400}
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 300px"
              priority={priority}
              className={`relative z-[1] w-full h-full object-contain p-3 sm:p-4 ${isOutOfStock ? 'opacity-55' : ''}`}
            />
          </Link>

          <StarburstBadge
            price={product.price}
            ariaLabel={COPY.packCard.priceAria(formatPrice(product.price))}
            className="absolute -bottom-2 -right-1 z-[var(--z-badge)]"
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
          <span className="font-mono-spec text-xs tabular-nums uppercase text-[var(--color-ink)]">
            {product.batchCode || COPY.common.freshBatchFallback}
          </span>

          <div className="relative flex items-center gap-2">
            {justAdded && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 right-0 z-[var(--z-badge)] px-2.5 py-0.5 rounded-full pop-border bg-[var(--color-lime)] text-[var(--color-ink)] font-mono-spec text-xs font-medium whitespace-nowrap"
              >
                Eklendi
              </span>
            )}

            <button
              type="button"
              onClick={() => toggleFavorite(product.slug)}
              aria-label={
                isFavorite
                  ? COPY.packCard.removeFromFavoritesAria(product.name)
                  : COPY.packCard.addToFavoritesAria(product.name)
              }
              aria-pressed={isFavorite}
              className="w-11 h-11 rounded-full pop-border flex items-center justify-center transition-[background-color,transform] active:scale-95 motion-reduce:active:scale-100 cursor-pointer"
              style={{
                backgroundColor: isFavorite ? 'var(--color-pink)' : 'var(--color-cream)',
              }}
            >
              <Heart
                aria-hidden="true"
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
                  : justAdded
                    ? `${product.name} sepete eklendi`
                    : COPY.packCard.addToCartAria(product.name)
              }
              className={`w-11 h-11 rounded-full pop-border ${
                justAdded ? 'bg-[var(--color-lime)]' : 'bg-[var(--color-butter)]'
              } hover:bg-[var(--color-lime)] disabled:bg-[var(--color-cream)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-[background-color,transform] active:scale-95 motion-reduce:active:scale-100 cursor-pointer`}
            >
              {justAdded ? (
                <Check aria-hidden="true" className="w-4 h-4" />
              ) : (
                <ShoppingBag aria-hidden="true" className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
