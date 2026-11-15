import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { COPY } from '../../content/copy';
import { subscribePageTitle } from '../../hooks/usePageMeta';
import { selectTotalItems, useCartStore } from '../../store/cartStore';
import { CartDrawer } from '../packaging/CartDrawer';
import { Footer } from './Footer';
import { Header } from './Header';

export function SiteLayout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  const [routeAnnouncement, setRouteAnnouncement] = useState('');

  const totalItems = useCartStore(selectTotalItems);
  const prevTotalItems = useRef(totalItems);
  const [cartAnnouncement, setCartAnnouncement] = useState('');

  useEffect(() => {
    return subscribePageTitle((nextTitle) => {
      if (!isFirstRender.current) {
        setRouteAnnouncement(nextTitle);
      }
    });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
    setRouteAnnouncement(document.title);
  }, [pathname]);

  useEffect(() => {
    if (prevTotalItems.current !== totalItems) {
      prevTotalItems.current = totalItems;
      setCartAnnouncement(
        totalItems === 0 ? 'Sepet boşaltıldı.' : `Sepette ${totalItems} ürün var.`
      );
    }
  }, [totalItems]);

  return (
    <div className="min-h-svh flex flex-col overflow-x-clip bg-[var(--bg-page)] text-[var(--text-primary)]">
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {routeAnnouncement}
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {cartAnnouncement}
      </div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[var(--z-modal)] focus:px-4 focus:py-2 focus:rounded-full focus:pop-border focus:bg-[var(--color-butter)] focus:text-[var(--color-ink)] focus:font-display focus:font-semibold focus:text-sm"
      >
        {COPY.common.skipToContent}
      </a>
      <Header />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
