const BRAND_CONFETTI_COLORS = [
  '#C8281C',
  '#FFD447',
  '#FF6FA8',
  '#8ECAE6',
  '#9AE63B',
  '#FF7A22',
];

/**
 * Fires a light brand-colored confetti burst when motion is allowed.
 * Respects `prefers-reduced-motion: reduce` and lazy-loads `canvas-confetti`.
 */
export function triggerAddToCartConfetti(sourceEl?: HTMLElement | null): void {
  if (typeof window === 'undefined') return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  let origin = { x: 0.5, y: 0.6 };
  if (sourceEl) {
    const rect = sourceEl.getBoundingClientRect();
    origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };
  }

  void import('canvas-confetti').then(({ default: confetti }) => {
    void confetti({
      particleCount: 24,
      spread: 55,
      startVelocity: 24,
      gravity: 0.9,
      ticks: 90,
      scalar: 0.8,
      colors: BRAND_CONFETTI_COLORS,
      origin,
      disableForReducedMotion: true,
    });
  });
}
