import { COPY } from '../content/copy';
import { usePageMeta } from '../hooks/usePageMeta';

export default function CreditsPage() {
  usePageMeta(COPY.credits.metaTitle, COPY.credits.metaDescription);

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="space-y-3 max-w-3xl border-b-2 border-[var(--color-ink)] pb-5">
        <h1 className="font-display font-bold text-4xl sm:text-5xl">
          {COPY.credits.title}
        </h1>
        <p className="text-base text-[var(--color-ink-soft)] leading-relaxed">
          {COPY.credits.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COPY.credits.attributions.map((item) => (
          <article
            key={item.fileName}
            className="p-4 sm:p-5 rounded-[var(--radius-sm)] pop-border bg-[var(--color-cream-alt)] space-y-2"
          >
            <h2 className="font-display font-bold text-lg text-[var(--color-ink)]">
              {item.productName}
            </h2>
            <dl className="space-y-1 text-sm text-[var(--color-ink-soft)]">
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-mono-spec text-xs uppercase text-[var(--color-ink)]">
                  {COPY.credits.fileLabel}
                </dt>
                <dd className="min-w-0 break-all">
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-[var(--color-tomato)]"
                  >
                    {item.fileName}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-mono-spec text-xs uppercase text-[var(--color-ink)]">
                  {COPY.credits.authorLabel}
                </dt>
                <dd>{item.author}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-mono-spec text-xs uppercase text-[var(--color-ink)]">
                  {COPY.credits.licenseLabel}
                </dt>
                <dd>
                  <a
                    href={item.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-spec text-xs underline underline-offset-2 hover:text-[var(--color-tomato)]"
                  >
                    {item.license}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-mono-spec text-xs uppercase text-[var(--color-ink)]">
                  {COPY.credits.modificationLabel}
                </dt>
                <dd>{COPY.credits.modificationNote}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
