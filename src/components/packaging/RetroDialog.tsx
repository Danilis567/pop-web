import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COPY } from '../../content/copy';

interface RetroDialogProps {
  title?: string;
  question?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}

export function RetroDialog({
  title = COPY.retroDialog.defaultTitle,
  question = COPY.retroDialog.defaultQuestion,
  primaryLabel = COPY.retroDialog.defaultPrimaryLabel,
  secondaryLabel = COPY.retroDialog.defaultSecondaryLabel,
}: RetroDialogProps) {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <div className="bg-[var(--color-cream-alt)] pop-border rounded-[var(--radius-card)] pop-shadow-lg overflow-hidden max-w-md w-full">
      {/* Retro OS Pencere Başlık Çubuğu */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--color-powder-blue)] border-b-2 border-[var(--color-ink)]">
        <span className="font-mono-spec text-xs font-medium text-[var(--color-ink)]">
          {title}
        </span>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-butter)]" />
          <span className="w-3 h-3 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-pink)]" />
        </div>
      </div>

      {/* İçerik */}
      <div className="p-6 space-y-5">
        <p className="font-display font-semibold text-xl leading-snug text-[var(--color-ink)]">
          {question}
        </p>

        {choice ? (
          <div className="p-3 rounded-[var(--radius-sm)] pop-border bg-[var(--color-lime)] flex items-center justify-between gap-3">
            <span className="font-display font-medium text-sm">
              {COPY.retroDialog.choiceReceived(choice)}
            </span>
            <Link
              to="/shop"
              className="px-3 py-1.5 rounded-full pop-border bg-[var(--color-cream)] font-display font-semibold text-xs whitespace-nowrap"
            >
              {COPY.retroDialog.goToShopCta}
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setChoice(primaryLabel)}
              className="px-5 py-2.5 rounded-full pop-border bg-[var(--color-cream)] hover:bg-[var(--color-butter)] font-display font-semibold text-sm cursor-pointer transition-colors"
            >
              {primaryLabel}
            </button>
            <button
              type="button"
              onClick={() => setChoice(secondaryLabel)}
              className="px-5 py-2.5 rounded-full pop-border bg-[var(--color-tomato)] text-[var(--color-cream)] hover:opacity-95 font-display font-semibold text-sm cursor-pointer transition-opacity"
            >
              {secondaryLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
