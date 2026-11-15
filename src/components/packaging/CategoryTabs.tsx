import { COPY } from '../../content/copy';
import type { Category } from '../../data/products';

interface CategoryTabsProps {
  categories: Category[];
  value: string;
  onValueChange: (value: string) => void;
  includeAll?: boolean;
  children?: React.ReactNode;
}

export function CategoryTabs({
  categories,
  value,
  onValueChange,
  includeAll = true,
  children,
}: CategoryTabsProps) {
  return (
    <div className="w-full">
      <div
        role="group"
        aria-label={COPY.categoryTabs.listAria}
        className="flex flex-wrap gap-3 pb-6"
      >
        {includeAll && (
          <button
            type="button"
            aria-pressed={value === 'tumu'}
            data-surface={value === 'tumu' ? 'dark' : undefined}
            onClick={() => onValueChange('tumu')}
            className={`min-h-[44px] inline-flex items-center px-4 py-2 rounded-full pop-border font-display font-semibold text-sm cursor-pointer transition-colors ${
              value === 'tumu'
                ? 'bg-[var(--color-ink)] text-[var(--color-cream)]'
                : 'bg-[var(--color-cream-alt)] text-[var(--color-ink)]'
            }`}
          >
            {COPY.categoryTabs.allLabel}
          </button>
        )}
        {categories.map((cat) => {
          const isActive = value === cat.slug;
          const isDarkSurface = isActive && cat.inkColor.toUpperCase() !== '#2B1410';
          return (
            <button
              key={cat.slug}
              type="button"
              aria-pressed={isActive}
              data-surface={isDarkSurface ? 'dark' : undefined}
              onClick={() => onValueChange(cat.slug)}
              className="min-h-[44px] inline-flex items-center px-4 py-2 rounded-full pop-border font-display font-semibold text-sm cursor-pointer transition-colors"
              style={{
                backgroundColor: isActive ? cat.color : 'var(--color-cream-alt)',
                color: isActive ? cat.inkColor : 'var(--color-ink)',
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {children}
    </div>
  );
}
