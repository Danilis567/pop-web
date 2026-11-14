import { COPY } from '../../content/copy';

interface TickerStripProps {
  items?: readonly string[];
  className?: string;
}

export function TickerStrip({
  items = COPY.ticker.defaultItems,
  className = '',
}: TickerStripProps) {
  const repeated = [...items, ...items];

  return (
    <div
      className={`w-full overflow-hidden border-y-2 border-[var(--color-ink)] bg-[var(--color-butter)] py-2.5 ${className}`}
      aria-label={COPY.ticker.ariaLabel}
    >
      <div className="animate-ticker">
        {repeated.map((text, index) => (
          <span
            key={`${text}-${index}`}
            className="inline-flex items-center gap-4 px-5 font-mono-spec text-xs sm:text-sm font-medium uppercase tracking-wider text-[var(--color-ink)] whitespace-nowrap"
          >
            <span>{text}</span>
            <span aria-hidden="true" className="text-[var(--color-tomato)]">
              ★
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
