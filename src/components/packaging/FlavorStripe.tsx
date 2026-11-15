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
      title={label}
      className={`inline-flex items-center min-w-0 max-w-full h-7 px-3 rounded-full pop-border font-mono-spec text-xs font-medium uppercase tracking-wider ${className}`}
      style={{ backgroundColor: bgColor, color: inkColor }}
    >
      <span className="truncate">{label}</span>
    </span>
  );
}
