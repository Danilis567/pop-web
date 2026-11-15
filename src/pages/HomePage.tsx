import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoryTabs } from '../components/packaging/CategoryTabs';
import { PackCard } from '../components/packaging/PackCard';
import { ProductImage } from '../components/packaging/ProductImage';
import { TickerStrip } from '../components/packaging/TickerStrip';
import { ZigzagEdge } from '../components/packaging/ZigzagEdge';
import { COPY } from '../content/copy';
import { products } from '../data/products';
import { usePageMeta } from '../hooks/usePageMeta';
import { getCategories, getProductsByCategory, localeUpper } from '../lib/catalog';
import { SITE_CONFIG } from '../lib/siteConfig';

const FeaturedCarousel = lazy(() => import('../components/home/FeaturedCarousel'));

function FeaturedCarouselFallback() {
  return (
    <section
      aria-label={COPY.home.carouselTitle}
      className="bg-[var(--color-cream-alt)] border-y-2 border-[var(--color-ink)] py-14"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            {COPY.home.carouselTitle}
          </h2>
          <div className="flex items-center gap-2" aria-hidden="true">
            <div className="w-11 h-11 rounded-full pop-border bg-[var(--color-cream)]" />
            <div className="w-11 h-11 rounded-full pop-border bg-[var(--color-cream)]" />
          </div>
        </div>
        <div
          className="h-[430px] rounded-[var(--radius-card)] bg-[var(--color-cream)]/60"
          aria-hidden="true"
        />
        <div className="flex items-center justify-between gap-4 pt-2" aria-hidden="true">
          <div className="flex-1 max-w-xs h-3 rounded-full pop-border bg-[var(--color-cream)]" />
          <div className="h-11 w-32 rounded-full pop-border bg-[var(--color-butter)]" />
        </div>
      </div>
    </section>
  );
}

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

  const tabProducts = getProductsByCategory(activeCategory).slice(0, 4);
  const carouselProducts = products.filter((p) => p.featured).slice(0, 8);

  return (
    <div>
      {/* 1. Hero Bölümü */}
      <section className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full pop-border bg-[var(--color-butter)] font-mono-spec text-xs tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[var(--color-tomato)]" aria-hidden="true" />
              {localeUpper(`${SITE_CONFIG.batchCode} · ${COPY.home.heroBadgeSuffix}`)}
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

              {/* Dairesel Mühür Rozeti */}
              <div
                className="absolute -top-4 -right-1 sm:-top-5 sm:-right-5 z-[var(--z-badge)] w-18 h-18 sm:w-24 sm:h-24 rounded-full pop-border bg-[var(--color-lime)] flex flex-col items-center justify-center text-center rotate-12 text-[var(--color-ink)]"
                aria-label={COPY.home.sealAria}
              >
                <span className="font-mono-spec text-xs font-medium tracking-wider leading-tight">
                  {localeUpper(COPY.home.sealTop)}
                </span>
                <span className="font-display font-bold text-lg sm:text-xl leading-none my-0.5">
                  {COPY.home.sealCount}
                </span>
                <span className="font-mono-spec text-xs font-medium leading-tight">
                  {localeUpper(COPY.home.sealBottom)}
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
                  <span className="hidden sm:inline-flex px-3 py-1 rounded-full pop-border bg-[var(--color-cream)] font-mono-spec text-xs">
                    {localeUpper(COPY.home.heroPackCount)}
                  </span>
                </div>

                {/* Dengeli 3'lü Ambalaj Rafı */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
                  {HERO_SHOWCASE.map((item, idx) => (
                    <Link
                      key={item.slug}
                      to={`/product/${item.slug}`}
                      className="group block p-1.5 sm:p-2 rounded-[var(--radius-md)] pop-border bg-[var(--color-white)] space-y-2 transition-transform duration-[var(--duration-fast)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <div className="aspect-square rounded-xl overflow-hidden bg-[var(--color-white)] flex items-center justify-center p-1.5 sm:p-2">
                        <ProductImage
                          src={item.image}
                          alt={item.label}
                          width={400}
                          height={400}
                          sizes="(max-width: 640px) 28vw, 150px"
                          priority={idx === 0}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span
                        className="block text-center py-1 px-1 sm:px-1.5 rounded-xl sm:rounded-full pop-border font-mono-spec text-xs leading-tight font-medium line-clamp-2"
                        style={{ backgroundColor: item.bg, color: item.ink }}
                      >
                        {localeUpper(item.label)}
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
            className="inline-flex items-center min-h-[44px] font-display font-semibold text-sm underline underline-offset-4"
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
      <Suspense fallback={<FeaturedCarouselFallback />}>
        <FeaturedCarousel products={carouselProducts} />
      </Suspense>

      {/* 5. Dama Bandı */}
      <div className="w-full h-10 pop-checker-band border-b-2 border-[var(--color-ink)]" aria-hidden="true" />

      {/* 6. Asimetrik Bölüm: Karışık Poşet Tezgâhı + Tezgâh Notu */}
      <section className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 relative mt-2.5 flex flex-col justify-between p-6 sm:p-8 rounded-b-[var(--radius-card)] rounded-t-sm pop-border pop-shadow bg-[var(--color-powder-blue)]">
            <ZigzagEdge color="var(--color-tomato)" />
            <div className="space-y-3 pt-2">
              <span className="inline-block font-mono-spec text-xs font-medium tracking-wider text-[var(--color-ink)]/80">
                {localeUpper('KARIŞIK POŞET TEZGÂHI')}
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-tight text-[var(--color-ink)]">
                {COPY.mix.metaTitle}
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-ink)] max-w-xl">
                {COPY.mix.metaDescription}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/mix"
                className="min-h-[44px] inline-flex items-center px-6 py-3 rounded-full pop-border pop-shadow bg-[var(--color-tomato)] text-[var(--color-cream)] font-display font-bold text-sm hover:-translate-y-0.5 active:scale-[0.96] transition-transform duration-[var(--duration-fast)]"
              >
                {COPY.header.navLinks.mix} →
              </Link>
              <Link
                to="/shop/sert-seker"
                className="min-h-[44px] inline-flex items-center px-4 py-2 rounded-full pop-border bg-[var(--color-cream)] hover:bg-[var(--color-butter)] font-mono-spec text-xs transition-colors duration-[var(--duration-fast)]"
              >
                {localeUpper('SERT ŞEKER')}
              </Link>
              <Link
                to="/shop/jelibon"
                className="min-h-[44px] inline-flex items-center px-4 py-2 rounded-full pop-border bg-[var(--color-cream)] hover:bg-[var(--color-butter)] font-mono-spec text-xs transition-colors duration-[var(--duration-fast)]"
              >
                {localeUpper('JELİBON')}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <div className="w-full p-6 sm:p-8 rounded-[var(--radius-card)] pop-border bg-[var(--color-butter)] flex flex-col justify-between gap-4">
              <span className="inline-block self-start font-mono-spec text-xs font-medium tracking-wider text-[var(--color-ink)]/80">
                {localeUpper(COPY.home.stickyNoteBadge)}
              </span>
              <p className="font-display font-bold text-2xl leading-snug text-[var(--color-ink)]">
                {COPY.home.stickyNoteText}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center min-h-[44px] font-mono-spec text-xs underline underline-offset-4 self-start"
              >
                {localeUpper(COPY.home.stickyNoteCta)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
