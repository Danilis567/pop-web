import { Link } from 'react-router-dom';
import { COPY } from '../../content/copy';
import { getCategories } from '../../lib/catalog';
import { SITE_CONFIG } from '../../lib/siteConfig';

export function Footer() {
  const categories = getCategories();

  return (
    <footer className="mt-16 border-t-2 border-[var(--color-ink)] bg-[var(--color-cream-alt)] overflow-hidden">
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <img
              src="/brand/logo-horizontal.svg"
              alt={COPY.footer.logoAlt}
              className="h-9 w-auto"
            />
            <p className="text-sm text-[var(--color-ink-soft)] max-w-xs">
              {COPY.footer.description}
            </p>
            <p className="font-mono-spec text-xs uppercase text-[var(--color-ink)]">
              {SITE_CONFIG.batchCode}
            </p>
          </div>

          <div>
            <h3 className="font-mono-spec text-xs uppercase tracking-wider text-[var(--color-ink-soft)] mb-3">
              {COPY.footer.categoriesTitle}
            </h3>
            <ul className="space-y-1.5 text-sm font-display font-medium">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/shop/${cat.slug}`} className="hover:underline">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono-spec text-xs uppercase tracking-wider text-[var(--color-ink-soft)] mb-3">
              {COPY.footer.pagesTitle}
            </h3>
            <ul className="space-y-1.5 text-sm font-display font-medium">
              <li>
                <Link to="/shop" className="hover:underline">
                  {COPY.footer.pages.allProducts}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  {COPY.footer.pages.about}
                </Link>
              </li>
              <li>
                <Link to="/info" className="hover:underline">
                  {COPY.footer.pages.info}
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:underline">
                  {COPY.footer.pages.cart}
                </Link>
              </li>
              <li>
                <Link to="/credits" className="hover:underline">
                  {COPY.footer.pages.credits}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-mono-spec text-xs uppercase tracking-wider text-[var(--color-ink-soft)]">
              {COPY.footer.noteTitle}
            </h3>
            <p className="text-sm text-[var(--color-ink-soft)]">
              {SITE_CONFIG.footerNote}
            </p>
            <img
              src="/brand/logo-mono.svg"
              alt=""
              aria-hidden="true"
              className="h-6 w-auto opacity-75"
            />
          </div>
        </div>
      </div>

      {/* Dev Boyutlu Alttan Kırpılmış Marka Yazısı */}
      <div
        className="w-full overflow-hidden select-none pt-4"
        aria-hidden="true"
      >
        <p
          className="font-display font-bold text-center text-[var(--color-tomato)] tracking-tight leading-[0.82] translate-y-[18%]"
          style={{ fontSize: 'var(--text-footer-wordmark)' }}
        >
          {COPY.footer.wordmark}
        </p>
      </div>
    </footer>
  );
}
