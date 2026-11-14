import { COPY } from '../../content/copy';

interface StarburstBadgeProps {
  price: number;
  ariaLabel: string;
  size?: 'md' | 'lg';
  className?: string;
}

/**
 * Yıldız patlaması fiyat rozeti (sarı #FFD447, koyu kakao konturlu).
 */
export function StarburstBadge({
  price,
  ariaLabel,
  size = 'md',
  className = '',
}: StarburstBadgeProps) {
  const dimensions = size === 'lg' ? 'w-[86px] h-[86px]' : 'w-[76px] h-[76px]';
  const priceSize = size === 'lg' ? 'text-xl' : 'text-lg';

  return (
    <div
      className={`${dimensions} -rotate-6 flex items-center justify-center pointer-events-none ${className}`}
      aria-label={ariaLabel}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full drop-shadow-[2px_2px_0_#2B1410]"
        aria-hidden="true"
      >
        <polygon
          points="50,2 61,18 80,10 78,29 97,35 84,50 97,65 78,71 80,90 61,82 50,98 39,82 20,90 22,71 3,65 16,50 3,35 22,29 20,10 39,18"
          fill="var(--color-butter)"
          stroke="var(--color-ink)"
          strokeWidth="3"
        />
      </svg>
      <div className="relative flex flex-col items-center leading-none text-[var(--color-ink)]">
        <span className={`font-display font-bold ${priceSize} leading-none`}>
          {price}
        </span>
        <span className="font-mono-spec text-[11px] font-medium uppercase">
          {COPY.common.currencyUnit}
        </span>
      </div>
    </div>
  );
}
