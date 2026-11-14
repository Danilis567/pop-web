import { Link } from 'react-router-dom';
import { EmptyStateIllustration } from '../components/packaging/EmptyStateIllustration';
import { COPY } from '../content/copy';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFoundPage() {
  usePageMeta(COPY.notFound.metaTitle, COPY.notFound.metaDescription);
  return (
    <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-lg mx-auto p-8 rounded-[var(--radius-card-lg)] pop-border bg-[var(--color-cream-alt)] text-center space-y-5">
        <EmptyStateIllustration variant="torn-bag" className="w-28 h-28 mx-auto" />
        <h1 className="font-display font-bold text-4xl">{COPY.notFound.title}</h1>
        <p className="text-base text-[var(--color-ink-soft)]">
          {COPY.notFound.description}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-6 py-2.5 rounded-full pop-border bg-[var(--color-butter)] font-display font-semibold text-sm"
          >
            {COPY.notFound.homeCta}
          </Link>
          <Link
            to="/shop"
            className="px-6 py-2.5 rounded-full pop-border bg-[var(--color-cream)] font-display font-semibold text-sm"
          >
            {COPY.common.goToShop}
          </Link>
        </div>
      </div>
    </div>
  );
}
