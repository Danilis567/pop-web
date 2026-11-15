import { COPY } from '../../content/copy';

interface NetWeightTagProps {
  weight: string;
  className?: string;
}

/**
 * Ambalaj teknik gramaj etiketi (NET 140 g).
 */
export function NetWeightTag({ weight, className = '' }: NetWeightTagProps) {
  const normalizedWeight = weight.replace(/(\d)\s*g\b/i, '$1\u00A0g');

  return (
    <span
      className={`inline-flex items-center h-6 px-2 rounded-md pop-border bg-[var(--color-cream)] font-mono-spec text-xs normal-case tabular-nums shrink-0 text-[var(--color-ink)] ${className}`}
    >
      {COPY.common.netPrefix}
      {normalizedWeight}
    </span>
  );
}
