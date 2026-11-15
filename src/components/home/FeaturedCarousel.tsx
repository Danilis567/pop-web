import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COPY } from '../../content/copy';
import type { Product } from '../../data/products';
import { PackCard } from '../packaging/PackCard';

interface FeaturedCarouselProps {
  products: Product[];
}

export default function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    containScroll: 'trimSnaps',
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onScroll);
    return () => {
      emblaApi.off('scroll', onScroll);
      emblaApi.off('reInit', onScroll);
    };
  }, [emblaApi, onScroll]);

  return (
    <section className="bg-[var(--color-cream-alt)] border-y-2 border-[var(--color-ink)] py-14">
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            {COPY.home.carouselTitle}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label={COPY.home.carouselPrevAria}
              className="w-11 h-11 rounded-full pop-border bg-[var(--color-cream)] hover:bg-[var(--color-butter)] flex items-center justify-center cursor-pointer font-display font-bold transition-colors"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label={COPY.home.carouselNextAria}
              className="w-11 h-11 rounded-full pop-border bg-[var(--color-cream)] hover:bg-[var(--color-butter)] flex items-center justify-center cursor-pointer font-display font-bold transition-colors"
            >
              →
            </button>
          </div>
        </div>

        <div className="overflow-hidden py-4 -my-4 touch-pan-y" ref={emblaRef}>
          <div className="flex gap-5">
            {products.map((product) => (
              <div
                key={product.slug}
                className="flex-[0_0_82%] sm:flex-[0_0_46%] lg:flex-[0_0_calc((100%-3*1.25rem)/4)] min-w-0"
              >
                <PackCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="flex-1 max-w-xs h-3 rounded-full pop-border bg-[var(--color-cream)] overflow-hidden">
            <div
              className="w-full h-full origin-left bg-[var(--color-tomato)] transition-transform duration-[var(--duration-fast)] motion-reduce:transition-none"
              style={{ transform: `scaleX(${Math.max(0.15, scrollProgress / 100)})` }}
            />
          </div>
          <Link
            to="/shop"
            className="min-h-[44px] inline-flex items-center px-5 py-2 rounded-full pop-border bg-[var(--color-butter)] hover:bg-[var(--color-lime)] font-display font-semibold text-sm transition-colors"
          >
            {COPY.home.carouselMore}
          </Link>
        </div>
      </div>
    </section>
  );
}
