import { COPY } from '../../content/copy';

interface NetWeightTagProps {
  weight: string;
  className?: string;
}

/**
 * Ambalaj teknik gramaj etiketi (NET 140g).
 */
export function NetWeightTag({ weight, className = '' }: NetWeightTagProps) {
  return (
    <span
      className={`inline-flex items-center h-6 px-2 rounded-md border-[1.5px] border-[var(--color-ink)] bg-[var(--color-cream)] font-mono-spec text-[11px] uppercase shrink-0 text-[var(--color-ink)] ${className}`}
    >
      {COPY.common.netPrefix}
      {weight}
    </span>
  );
}
