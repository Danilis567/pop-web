import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoryTabs } from '../components/packaging/CategoryTabs';
import { PackCard } from '../components/packaging/PackCard';
import { RetroDialog } from '../components/packaging/RetroDialog';
import { TickerStrip } from '../components/packaging/TickerStrip';
import { COPY } from '../content/copy';
import { products } from '../data/products';
import { usePageMeta } from '../hooks/usePageMeta';
import { getCategories, getProductsByCategory } from '../lib/catalog';
import { SITE_CONFIG } from '../lib/siteConfig';

const HERO_SHOWCASE = [
  {
    slug: 'visne-limon-cam-seker',
    image: '/images/products/visne-limon-cam-seker.webp',
    label: COPY.home.heroShowcaseLabels.visneLimon,
    bg: 'var(--color-tomato)',
    ink: 'var(--color-cream)',
  },
  {
    slug: 'orman-meyveli-ayicik',
    image: '/images/products/orman-meyveli-ayicik.webp',
    label: COPY.home.heroShowcaseLabels.ormanMeyveli,
    bg: 'var(--color-butter)',
    ink: 'var(--color-ink)',
  },
  {
    slug: 'findikli-kakao-truf',
    image: '/images/products/findikli-kakao-truf.webp',
    label: COPY.home.heroShowcaseLabels.findikliDraje,
    bg: 'var(--color-pink)',
    ink: 'var(--color-ink)',
  },
];

export default function HomePage() {
  usePageMeta(COPY.home.metaTitle, COPY.home.metaDescription);

  const categories = getCategories();
  const [activeCategory, setActiveCategory] = useState<string>('tumu');
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });
  const [scrollProgress, setScrollProgress] = useState(0);

  const tabProducts = getProductsByCategory(activeCategory).slice(0, 4);
  const carouselProducts = products.filter((p) => p.featured).slice(0, 8);

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
    <div className="pb-6">
      {/* 1. Hero Bölümü */}
      <section className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full pop-border bg-[var(--color-butter)] font-mono-spec text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[var(--color-tomato)]" aria-hidden="true" />
              {SITE_CONFIG.batchCode} · {COPY.home.heroBadgeSuffix}
            </div>

            <h1
              className="font-display font-bold tracking-tight leading-[1.03]"
              style={{ fontSize: 'var(--text-hero)' }}
            >
              {COPY.home.heroTitleStart}
              <span className="font-serif-accent text-[var(--color-tomato)]">
                {COPY.home.heroTitleHighlight}
              </span>
              {COPY.home.heroTitleEnd}
            </h1>

            <p className="text-lg text-[var(--color-ink-soft)] max-w-xl leading-relaxed">
              {COPY.home.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="px-6 py-3 rounded-full pop-border pop-shadow bg-[var(--color-tomato)] text-[var(--color-cream)] font-display font-semibold text-base pop-spring hover:-translate-y-0.5"
              >
                {COPY.home.heroPrimaryCta}
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 rounded-full border-2 border-dashed border-[var(--color-ink)] bg-[var(--color-cream-alt)] font-display font-semibold text-base hover:bg-[var(--color-butter)] transition-colors"
              >
                {COPY.home.heroSecondaryCta}
              </Link>
            </div>
          </div>

          {/* Sağ Hero Ambalaj Vitrini — Tek Dengeli Kompozisyon */}
          <div className="lg:col-span-6">
            <div className="relative p-5 sm:p-7 rounded-[var(--radius-card-lg)] pop-border pop-shadow-lg bg-[var(--color-powder-blue)] overflow-visible">
              <div
                className="absolute inset-0 halftone-dots opacity-40 rounded-[30px] pointer-events-none"
                aria-hidden="true"
              />

              {/* Dairesel Mühür Rozeti */}
              <div
                className="absolute -top-4 -right-2 sm:-top-5 sm:-right-5 z-[var(--z-badge)] w-20 h-20 sm:w-24 sm:h-24 rounded-full pop-border bg-[var(--color-lime)] flex flex-col items-center justify-center text-center rotate-12 text-[var(--color-ink)]"
                aria-label={COPY.home.sealAria}
              >
                <span className="font-mono-spec text-[10px] sm:text-[11px] font-medium uppercase tracking-wider leading-tight">
                  {COPY.home.sealTop}
                </span>
                <span className="font-display font-bold text-lg sm:text-xl leading-none my-0.5">
                  {COPY.home.sealCount}
                </span>
                <span className="font-mono-spec text-[10px] sm:text-[11px] font-medium uppercase leading-tight">
                  {COPY.home.sealBottom}
                </span>
              </div>

              <div className="relative z-[1] space-y-5">
                <div className="flex items-center justify-between gap-3 pr-16 sm:pr-20">
                  <img
                    src="/brand/logo-main.svg"
                    alt={COPY.home.heroLogoAlt}
                    width={192}
                    height={64}
                    className="w-[170px] sm:w-48 h-auto"
                  />
                  <span className="hidden sm:inline-flex px-3 py-1 rounded-full pop-border bg-[var(--color-cream)] font-mono-spec text-[11px] uppercase">
                    {COPY.home.heroPackCount}
                  </span>
                </div>

                {/* Dengeli 3'lü Ambalaj Rafı */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
                  {HERO_SHOWCASE.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/product/${item.slug}`}
                      className="group block p-2 rounded-[16px] pop-border bg-[var(--color-white)] space-y-2 transition-transform duration-150 hover:-translate-y-1"
                    >
                      <div className="aspect-square rounded-xl overflow-hidden bg-[var(--color-cream)] flex items-center justify-center p-2">
                        <img
                          src={item.image.replace(/\.webp$/, '-400.webp')}
                          srcSet={`${item.image.replace(/\.webp$/, '-400.webp')} 400w, ${item.image} 800w`}
                          sizes="(max-width: 640px) 28vw, 150px"
                          width={400}
                          height={400}
                          fetchPriority="high"
                          alt={item.label}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span
                        className="block text-center py-1 px-1.5 rounded-full pop-border font-mono-spec text-[10px] sm:text-[11px] font-medium uppercase truncate"
                        style={{ backgroundColor: item.bg, color: item.ink }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Kayan Ticker Bandı (Tam Genişlik) */}
      <TickerStrip />

      {/* 3. Tek Kategori Gezintisi (CategoryTabs) */}
      <section className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            {COPY.home.categoriesTitle}
          </h2>
          <Link
            to="/shop"
            className="font-display font-semibold text-sm underline underline-offset-4"
          >
            {COPY.home.seeAll}
          </Link>
        </div>

        <CategoryTabs
          categories={categories}
          value={activeCategory}
          onValueChange={setActiveCategory}
        >
          {tabProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tabProducts.map((product) => (
                <PackCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-[var(--radius-card)] pop-border bg-[var(--color-cream-alt)] text-center space-y-2">
              <p className="font-display font-semibold text-lg">
                {COPY.home.emptyCategory}
              </p>
            </div>
          )}
        </CategoryTabs>
      </section>

      {/* 4. Tam Genişlik Bant: Öne Çıkan Paketler Karuseli */}
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
                className="w-10 h-10 rounded-full pop-border bg-[var(--color-cream)] hover:bg-[var(--color-butter)] flex items-center justify-center cursor-pointer font-display font-bold transition-colors"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                aria-label={COPY.home.carouselNextAria}
                className="w-10 h-10 rounded-full pop-border bg-[var(--color-cream)] hover:bg-[var(--color-butter)] flex items-center justify-center cursor-pointer font-display font-bold transition-colors"
              >
                →
              </button>
            </div>
          </div>

          <div className="overflow-hidden py-4 -my-4" ref={emblaRef}>
            <div className="flex gap-5">
              {carouselProducts.map((product) => (
                <div
                  key={product.slug}
                  className="flex-[0_0_82%] sm:flex-[0_0_46%] lg:flex-[0_0_24%] min-w-0"
                >
                  <PackCard product={product} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex-1 max-w-xs h-3 rounded-full pop-border bg-[var(--color-cream)] overflow-hidden">
              <div
                className="h-full bg-[var(--color-tomato)] transition-all duration-150"
                style={{ width: `${Math.max(15, scrollProgress)}%` }}
              />
            </div>
            <Link
              to="/shop"
              className="px-5 py-2 rounded-full pop-border bg-[var(--color-butter)] hover:bg-[var(--color-lime)] font-display font-semibold text-sm transition-colors"
            >
              {COPY.home.carouselMore}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Dama Bandı */}
      <div className="w-full h-10 pop-checker-band border-b-2 border-[var(--color-ink)]" aria-hidden="true" />

      {/* 6. Ofsetli Bölüm: Retro OS Diyalog + Tezgâh Notu */}
      <section className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 lg:col-start-2 flex justify-center">
            <RetroDialog />
          </div>

          <div className="lg:col-span-4">
            <div className="p-6 rounded-[var(--radius-card)] pop-border bg-[var(--color-butter)] flex flex-col justify-between gap-4">
              <span className="inline-block self-start px-2.5 py-1 rounded-md pop-border bg-[var(--color-cream)] font-mono-spec text-[11px] uppercase">
                {COPY.home.stickyNoteBadge}
              </span>
              <p className="font-display font-bold text-2xl leading-snug text-[var(--color-ink)]">
                {COPY.home.stickyNoteText}
              </p>
              <Link
                to="/about"
                className="font-mono-spec text-xs uppercase underline underline-offset-4 self-start"
              >
                {COPY.home.stickyNoteCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
