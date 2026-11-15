interface EmptyStateIllustrationProps {
  variant: 'empty-bag' | 'torn-bag' | 'no-results' | 'order-seal';
  className?: string;
}

/**
 * Boş durumlar ve onay ekranları için ambalaj motifli özgün satır içi SVG illüstrasyonları.
 */
export function EmptyStateIllustration({
  variant,
  className = 'w-28 h-28',
}: EmptyStateIllustrationProps) {
  if (variant === 'torn-bag') {
    return (
      <svg
        viewBox="0 0 120 120"
        className={className}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M26 24 L34 16 L42 24 L50 16 L58 24 L66 16 L74 24 L82 16 L90 24 L94 24 L94 94 C94 100 89 104 84 104 L36 104 C31 104 26 100 26 94 Z"
          fill="var(--color-cream)"
          stroke="var(--color-ink)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M26 44 L44 38 L56 48 L72 36 L94 45"
          stroke="var(--color-tomato)"
          strokeWidth="3"
          strokeDasharray="5 4"
          strokeLinecap="round"
        />
        <rect x="42" y="60" width="36" height="22" rx="6" fill="var(--color-butter)" stroke="var(--color-ink)" strokeWidth="3" />
        <text x="60" y="75" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="12" fill="var(--color-ink)">
          404
        </text>
      </svg>
    );
  }

  if (variant === 'no-results') {
    return (
      <svg
        viewBox="0 0 120 120"
        className={className}
        fill="none"
        aria-hidden="true"
      >
        <rect x="20" y="26" width="66" height="72" rx="14" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="3" />
        <path d="M20 42 H86" stroke="var(--color-ink)" strokeWidth="3" />
        <circle cx="34" cy="34" r="3" fill="var(--color-tomato)" />
        <circle cx="44" cy="34" r="3" fill="var(--color-butter)" />
        <circle cx="72" cy="70" r="20" fill="var(--color-powder-blue)" stroke="var(--color-ink)" strokeWidth="3" />
        <path d="M86 84 L102 100" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" />
        <path d="M65 63 L79 77 M79 63 L65 77" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === 'order-seal') {
    return (
      <svg
        viewBox="0 0 120 120"
        className={className}
        fill="none"
        aria-hidden="true"
      >
        <polygon
          points="60,8 71,24 90,16 88,35 107,42 94,58 107,74 88,81 90,100 71,92 60,108 49,92 30,100 32,81 13,74 26,58 13,42 32,35 30,16 49,24"
          fill="var(--color-butter)"
          stroke="var(--color-ink)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M42 60 L54 72 L78 46"
          stroke="var(--color-tomato)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // empty-bag
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M28 32 L36 22 L44 32 L52 22 L60 32 L68 22 L76 32 L84 22 L92 32 L92 94 C92 100 87 104 82 104 L38 104 C33 104 28 100 28 94 Z"
        fill="var(--color-cream)"
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M28 46 H92" stroke="var(--color-ink)" strokeWidth="3" strokeDasharray="4 4" />
      <circle cx="60" cy="72" r="14" fill="var(--color-pink)" stroke="var(--color-ink)" strokeWidth="3" />
      <path d="M54 72 H66" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
