interface ZigzagEdgeProps {
  color: string;
  className?: string;
}

/**
 * Ambalaj poşetinin üst kısmındaki dışa taşan ısı yapıştırma zikzak kesimi.
 */
export function ZigzagEdge({ color, className = '' }: ZigzagEdgeProps) {
  return (
    <>
      <div
        className={`absolute -top-3 -left-[2px] -right-[2px] h-3.5 overflow-visible pointer-events-none ${className}`}
        aria-hidden="true"
      >
        <svg
          className="w-full h-full block"
          preserveAspectRatio="none"
          viewBox="0 0 160 14"
        >
          <polygon
            fill={color}
            stroke="var(--color-ink)"
            strokeWidth="2"
            strokeLinejoin="round"
            points="1,14 1,10 8,2 16,10 24,2 32,10 40,2 48,10 56,2 64,10 72,2 80,10 88,2 96,10 104,2 112,10 120,2 128,10 136,2 144,10 152,2 159,10 159,14"
          />
        </svg>
      </div>
      <div
        className="w-full h-2 border-b-2 border-[var(--color-ink)]"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
    </>
  );
}
