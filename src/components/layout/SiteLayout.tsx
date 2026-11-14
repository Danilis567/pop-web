import { Outlet } from 'react-router-dom';
import { COPY } from '../../content/copy';
import { CartDrawer } from '../packaging/CartDrawer';
import { Footer } from './Footer';
import { Header } from './Header';

export function SiteLayout() {
  return (
    <div className="min-h-svh flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[var(--z-modal)] focus:px-4 focus:py-2 focus:rounded-full focus:pop-border focus:bg-[var(--color-butter)] focus:text-[var(--color-ink)] focus:font-display focus:font-semibold focus:text-sm"
      >
        {COPY.common.skipToContent}
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
