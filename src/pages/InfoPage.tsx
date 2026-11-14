import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COPY } from '../content/copy';
import { usePageMeta } from '../hooks/usePageMeta';

export default function InfoPage() {
  usePageMeta(COPY.info.metaTitle, COPY.info.metaDescription);

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 py-10 space-y-12">
      <div className="space-y-2 max-w-2xl border-b-2 border-[var(--color-ink)] pb-5">
        <h1 className="font-display font-bold text-4xl sm:text-5xl">{COPY.info.title}</h1>
        <p className="text-base text-[var(--color-ink-soft)]">
          {COPY.info.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-[var(--radius-card)] pop-border bg-[var(--color-cream-alt)] space-y-2">
          <span className="font-mono-spec text-xs uppercase text-[var(--color-ink-soft)]">
            {COPY.info.deliveryEyebrow}
          </span>
          <h2 className="font-display font-bold text-2xl">{COPY.info.deliveryTitle}</h2>
          <p className="text-sm text-[var(--color-ink-soft)]">
            {COPY.info.deliveryText}
          </p>
        </div>

        <div className="p-6 rounded-[var(--radius-card)] pop-border bg-[var(--color-cream-alt)] space-y-2">
          <span className="font-mono-spec text-xs uppercase text-[var(--color-ink-soft)]">
            {COPY.info.returnsEyebrow}
          </span>
          <h2 className="font-display font-bold text-2xl">{COPY.info.returnsTitle}</h2>
          <p className="text-sm text-[var(--color-ink-soft)]">
            {COPY.info.returnsText}
          </p>
        </div>
      </div>

      <section className="space-y-4 max-w-3xl">
        <h2 className="font-display font-bold text-2xl">{COPY.info.faqTitle}</h2>
        <Accordion.Root type="single" collapsible className="space-y-3">
          {COPY.info.faqItems.map((item) => (
            <Accordion.Item
              key={item.id}
              value={item.id}
              className="rounded-[var(--radius-sm)] pop-border bg-[var(--color-cream-alt)] overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full px-5 py-4 flex items-center justify-between text-left font-display font-semibold text-base cursor-pointer">
                  <span>{item.question}</span>
                  <Plus className="w-4 h-4 shrink-0" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-5 pb-4 text-sm text-[var(--color-ink-soft)]">
                {item.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>

      <div className="pt-2 border-t-2 border-dashed border-[var(--color-ink)]/30">
        <Link
          to="/credits"
          className="font-mono-spec text-xs uppercase underline underline-offset-4 text-[var(--color-ink)] hover:text-[var(--color-tomato)]"
        >
          {COPY.info.creditsCta}
        </Link>
      </div>
    </div>
  );
}
