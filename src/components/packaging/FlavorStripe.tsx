interface FlavorStripeProps {
  label: string;
  bgColor: string;
  inkColor: string;
  className?: string;
}

/**
 * Ambalaj üzerindeki kategori renkli aroma şeridi etiketi.
 */
export function FlavorStripe({
  label,
  bgColor,
  inkColor,
  className = '',
}: FlavorStripeProps) {
  return (
    <span
      className={`inline-flex items-center h-7 px-3 rounded-full pop-border font-mono-spec text-[11px] font-medium uppercase tracking-wider truncate ${className}`}
      style={{ backgroundColor: bgColor, color: inkColor }}
    >
      {label}
    </span>
  );
}
