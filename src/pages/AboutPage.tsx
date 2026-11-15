import { Link } from 'react-router-dom';
import { COPY } from '../content/copy';
import { usePageMeta } from '../hooks/usePageMeta';
import { getCategories } from '../lib/catalog';

export default function AboutPage() {
  usePageMeta(COPY.about.metaTitle, COPY.about.metaDescription);

  const categories = getCategories();

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-16">
      {/* Editöryal / Asimetrik Üst Bölüm */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.06] tracking-tight">
            {COPY.about.titleStart}
            <span className="font-serif-accent text-[var(--color-tomato)]">
              {COPY.about.titleHighlight}
            </span>
            {COPY.about.titleEnd}
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-xl">
            {COPY.about.description}
          </p>
          <Link
            to="/shop"
            className="inline-flex px-6 py-3 rounded-full pop-border pop-shadow bg-[var(--color-tomato)] text-[var(--color-cream)] font-display font-semibold pop-spring hover:-translate-y-0.5"
          >
            {COPY.about.cta}
          </Link>
        </div>

        {/* Sağ Ofsetli Ambalaj Vitrini */}
        <div className="lg:col-span-5">
          <div className="p-5 rounded-[var(--radius-card-lg)] pop-border bg-[var(--color-lavender)]">
            <div className="p-6 rounded-[22px] border-2 border-dashed border-[var(--color-ink)] bg-[var(--color-cream-alt)] notebook-grid flex flex-col items-center justify-center text-center gap-4">
              <div className="w-44 h-44 rounded-full pop-border bg-[var(--color-white)] overflow-hidden flex items-center justify-center p-3 sm:p-4">
                <img
                  src="/images/products/antep-fistikli-rulo-lokum.webp"
                  alt={COPY.about.showcaseImageAlt}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <img src="/brand/logo-horizontal.svg" alt={COPY.about.logoAlt} className="h-9 w-auto mx-auto" />
                <p className="font-serif-accent font-semibold text-base text-[var(--color-ink)]">
                  {COPY.about.showcaseCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sadeleştirilmiş 6 Kategori Renk Rehberi */}
      <section className="space-y-4 border-t-2 border-[var(--color-ink)] pt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display font-bold text-2xl sm:text-3xl">{COPY.about.codesTitle}</h2>
          <p className="font-mono-spec text-xs uppercase text-[var(--color-ink-soft)]">
            {COPY.about.codesEyebrow}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop/${cat.slug}`}
              className="p-3.5 rounded-[var(--radius-sm)] pop-border bg-[var(--color-cream-alt)] hover:bg-[var(--color-butter)] transition-colors flex flex-col gap-2.5"
            >
              <span
                className="w-7 h-7 rounded-full pop-border shrink-0"
                style={{ backgroundColor: cat.color }}
                aria-hidden="true"
              />
              <span className="font-display font-semibold text-sm leading-snug text-[var(--color-ink)]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
