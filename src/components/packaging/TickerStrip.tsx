import { useState } from 'react';
import { COPY } from '../../content/copy';

interface TickerStripProps {
  items?: readonly string[];
  className?: string;
}

export function TickerStrip({
  items = COPY.ticker.defaultItems,
  className = '',
}: TickerStripProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`group relative flex items-center w-full border-y-2 border-[var(--color-ink)] bg-[var(--color-butter)] py-2 ${className}`}
      role="region"
      aria-label={COPY.ticker.ariaLabel}
    >
      <div className="flex-1 min-w-0 overflow-hidden">
        <div
          data-paused={paused ? 'true' : 'false'}
          className="animate-ticker focus-within:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] data-[paused=true]:[animation-play-state:paused]"
        >
          <div className="flex items-center shrink-0">
            {items.map((text, index) => (
              <span
                key={`${text}-${index}`}
                className="inline-flex items-center gap-4 px-5 font-mono-spec text-xs sm:text-sm font-medium uppercase tracking-wider text-[var(--color-ink)] whitespace-nowrap"
              >
                <span>{text}</span>
                <span aria-hidden="true" className="text-[var(--color-ink)]">
                  ★
                </span>
              </span>
            ))}
          </div>
          <div className="flex items-center shrink-0" aria-hidden="true">
            {items.map((text, index) => (
              <span
                key={`dup-${text}-${index}`}
                className="inline-flex items-center gap-4 px-5 font-mono-spec text-xs sm:text-sm font-medium uppercase tracking-wider text-[var(--color-ink)] whitespace-nowrap"
              >
                <span>{text}</span>
                <span className="text-[var(--color-ink)]">★</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 pr-3 pl-2 bg-[var(--color-butter)] border-l-2 border-[var(--color-ink)]/20">
        <button
          type="button"
          onClick={() => setPaused((prev) => !prev)}
          aria-pressed={paused}
          aria-label={paused ? COPY.ticker.playAria : COPY.ticker.pauseAria}
          className="min-w-[44px] min-h-[44px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full pop-border bg-[var(--color-cream)] hover:bg-[var(--color-cream-alt)] font-mono-spec text-xs font-medium uppercase text-[var(--color-ink)] cursor-pointer transition-colors"
        >
          <span aria-hidden="true">{paused ? '▶' : '❚❚'}</span>
          <span className="hidden sm:inline">
            {paused ? COPY.ticker.playLabel : COPY.ticker.pauseLabel}
          </span>
        </button>
      </div>
    </div>
  );
}
