import { useEffect, useState } from 'react';
import { COPY } from '../../content/copy';

export interface ProductImageProps {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export function getSmallWebpUrl(src: string): string {
  if (!src) return '';
  if (/-400\.webp$/i.test(src)) return src;
  if (/\.webp$/i.test(src)) {
    return src.replace(/\.webp$/i, '-400.webp');
  }
  return src;
}

export function getProductImageSrcSet(src: string): string | undefined {
  if (!src || !/\.webp$/i.test(src)) return undefined;
  const smallUrl = getSmallWebpUrl(src);
  const largeUrl = /-400\.webp$/i.test(src)
    ? src.replace(/-400\.webp$/i, '.webp')
    : src;
  return `${smallUrl} 400w, ${largeUrl} 800w`;
}

export function ProductImage({
  src,
  alt,
  width = 400,
  height = 400,
  sizes,
  priority = false,
  className = '',
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const trimmedSrc = src?.trim() ?? '';

  if (!trimmedSrc || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-1.5 bg-[var(--color-cream)] text-[var(--color-ink-soft)] select-none ${className}`}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          className="shrink-0 opacity-75"
        >
          <rect
            x="6"
            y="7"
            width="20"
            height="18"
            rx="3"
            fill="var(--color-butter)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M6 12H26"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="16" cy="18.5" r="2.5" fill="currentColor" />
        </svg>
        <span className="font-mono-spec text-[10px] leading-tight uppercase tracking-wide text-center px-1.5">
          {COPY.common.imagePlaceholder}
        </span>
      </div>
    );
  }

  const smallSrc = getSmallWebpUrl(trimmedSrc);
  const srcSet = getProductImageSrcSet(trimmedSrc);

  return (
    <img
      src={smallSrc}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? undefined : 'async'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
