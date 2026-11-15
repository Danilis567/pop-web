import * as Dialog from '@radix-ui/react-dialog';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { COPY } from '../../content/copy';
import { products } from '../../data/products';
import { useProductSearch } from '../../hooks/useProductSearch';
import { formatPrice } from '../../lib/catalog';
import { selectTotalItems, useCartStore } from '../../store/cartStore';

const NAV_LINKS = [
  { to: '/shop', label: COPY.header.navLinks.shop },
  { to: '/mix', label: COPY.header.navLinks.mix },
  { to: '/about', label: COPY.header.navLinks.about },
  { to: '/info', label: COPY.header.navLinks.info },
];

const INTERACTIVE_CLASS =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-deep-blue)] active:translate-y-0.5 transition-colors duration-[var(--duration-fast)]';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openDrawer = useCartStore((s) => s.openDrawer);
  const totalItems = useCartStore(selectTotalItems);
  const favoritesCount = useCartStore((s) => s.favorites.length);
  const { query, setQuery, results } = useProductSearch(products);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] px-2 min-[360px]:px-4 pt-3 pb-2 pointer-events-none">
      <div className="max-w-[var(--container-max)] mx-auto pointer-events-auto">
        <div className="h-16 px-2.5 min-[360px]:px-4 sm:px-6 rounded-full pop-border bg-[var(--color-cream-alt)] flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Logo */}
          <Link
            to="/"
            className={`min-h-[44px] min-w-[44px] inline-flex items-center shrink-0 rounded-full ${INTERACTIVE_CLASS}`}
            aria-label={COPY.header.logoAria}
          >
            <img
              src="/brand/logo-horizontal.svg"
              alt={COPY.header.logoAlt}
              className="h-7 min-[360px]:h-8 sm:h-10 w-auto"
            />
          </Link>

          {/* Masaüstü Hap Menü Bağlantıları */}
          <nav aria-label={COPY.header.desktopNavAria} className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 rounded-full font-display font-semibold text-sm ${INTERACTIVE_CLASS} ${
                    isActive
                      ? 'bg-[var(--color-ink)] text-[var(--color-cream)]'
                      : 'text-[var(--color-ink)] hover:bg-[var(--color-butter)]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Sağ Aksiyonlar: Arama Modalı + Sepet Çekmecesi + Mobil Menü */}
          <div className="flex items-center gap-1 min-[360px]:gap-1.5 sm:gap-2 shrink-0">
            <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  aria-label={COPY.header.searchTriggerAria}
                  className={`min-h-[44px] min-w-[44px] h-11 px-2.5 sm:px-3.5 rounded-full pop-border bg-[var(--color-cream)] hover:bg-[var(--color-powder-blue)] inline-flex items-center justify-center gap-2 font-display font-medium text-sm cursor-pointer ${INTERACTIVE_CLASS}`}
                >
                  <Search className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline">{COPY.header.searchButton}</span>
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[var(--z-modal)] bg-[var(--bg-scrim)]" />
                <Dialog.Content
                  aria-describedby={undefined}
                  className="fixed top-24 left-1/2 -translate-x-1/2 z-[var(--z-modal)] w-[calc(100%-2rem)] max-w-lg bg-[var(--color-cream)] pop-border rounded-[var(--radius-card)] p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="font-display font-bold text-lg">
                      {COPY.header.searchModalTitle}
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label={COPY.header.searchCloseAria}
                        className={`w-11 h-11 min-h-[44px] min-w-[44px] rounded-full pop-border bg-[var(--color-cream-alt)] hover:bg-[var(--color-butter)] flex items-center justify-center cursor-pointer ${INTERACTIVE_CLASS}`}
                      >
                        <X className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <form onSubmit={handleSearchSubmit} className="flex gap-2">
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={COPY.header.searchPlaceholder}
                      aria-label={COPY.header.searchPlaceholder}
                      autoFocus
                      className="flex-1 h-11 px-4 rounded-full pop-border bg-[var(--color-white)] font-body text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-deep-blue)]"
                    />
                    <button
                      type="submit"
                      className={`h-11 min-h-[44px] min-w-[44px] px-5 rounded-full pop-border bg-[var(--color-butter)] hover:brightness-95 font-display font-semibold text-sm cursor-pointer ${INTERACTIVE_CLASS}`}
                    >
                      {COPY.header.searchSubmit}
                    </button>
                  </form>

                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {results.slice(0, 5).map((item) => (
                      <Link
                        key={item.slug}
                        to={`/product/${item.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className={`min-h-[44px] flex items-center justify-between p-2.5 rounded-[var(--radius-sm)] pop-border bg-[var(--color-cream-alt)] hover:bg-[var(--color-butter)] ${INTERACTIVE_CLASS}`}
                      >
                        <div>
                          <p className="font-display font-semibold text-sm">{item.name}</p>
                          <p className="font-mono-spec text-xs normal-case text-[var(--color-ink-soft)]">
                            {item.flavor} · {item.netWeight}
                          </p>
                        </div>
                        <span className="font-display font-bold text-sm">
                          {formatPrice(item.price)}
                        </span>
                      </Link>
                    ))}
                    {products.length === 0 && (
                      <p className="text-xs font-mono-spec text-[var(--color-ink-soft)] py-2">
                        {COPY.header.emptyCatalog}
                      </p>
                    )}
                    {products.length > 0 && results.length === 0 && (
                      <p className="text-sm text-[var(--color-ink-soft)] py-2">
                        {COPY.header.noResults(query)}
                      </p>
                    )}
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            {/* Favorilerim Sayacı */}
            <Link
              to="/shop?fav=1"
              className={`min-h-[44px] min-w-[44px] h-11 px-2 sm:px-3 rounded-full pop-border bg-[var(--color-cream)] hover:bg-[var(--color-pink)] inline-flex items-center justify-center gap-1 sm:gap-1.5 font-display font-semibold text-sm ${INTERACTIVE_CLASS}`}
            >
              <Heart
                className="w-4 h-4 shrink-0"
                aria-hidden="true"
                fill={favoritesCount > 0 ? 'var(--color-tomato)' : 'none'}
              />
              <span className="sr-only">Favorilerim (</span>
              <span className="font-mono-spec text-xs font-medium">
                {favoritesCount}
              </span>
              <span className="sr-only"> ürün)</span>
            </Link>

            {/* Sepet Çekmecesi Tetikleyicisi */}
            <button
              type="button"
              onClick={openDrawer}
              className={`min-h-[44px] min-w-[44px] h-11 px-2 sm:px-3.5 rounded-full pop-border bg-[var(--color-butter)] hover:bg-[var(--color-lime)] inline-flex items-center justify-center gap-1 sm:gap-2 font-display font-semibold text-sm cursor-pointer ${INTERACTIVE_CLASS}`}
            >
              <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="sr-only">Sepeti aç (</span>
              <span className="font-mono-spec text-xs font-medium">
                {totalItems}
              </span>
              <span className="sr-only"> ürün)</span>
            </button>

            {/* Mobil Menü (Radix Dialog: Esc + Odak Tuzağı + Erişilebilir Başlık) */}
            <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  aria-label={COPY.header.mobileMenuAria}
                  className={`md:hidden w-11 h-11 min-h-[44px] min-w-[44px] rounded-full pop-border bg-[var(--color-cream)] hover:bg-[var(--color-butter)] flex items-center justify-center cursor-pointer ${INTERACTIVE_CLASS}`}
                >
                  <Menu className="w-4 h-4" aria-hidden="true" />
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[var(--z-modal)] bg-[var(--bg-scrim)] md:hidden" />
                <Dialog.Content
                  aria-describedby={undefined}
                  className="fixed top-24 left-4 right-4 z-[var(--z-modal)] md:hidden p-5 rounded-[var(--radius-card)] pop-border bg-[var(--color-cream)] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="font-display font-bold text-lg">
                      {COPY.header.mobileNavAria}
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label={COPY.header.searchCloseAria}
                        className={`w-11 h-11 min-h-[44px] min-w-[44px] rounded-full pop-border bg-[var(--color-cream-alt)] hover:bg-[var(--color-butter)] flex items-center justify-center cursor-pointer ${INTERACTIVE_CLASS}`}
                      >
                        <X className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <nav aria-label={COPY.header.mobileNavAria} className="flex flex-col gap-2">
                    {NAV_LINKS.map((link) => (
                      <Dialog.Close asChild key={link.to}>
                        <NavLink
                          to={link.to}
                          className={({ isActive }) =>
                            `min-h-[44px] flex items-center px-4 py-2.5 rounded-full font-display font-semibold text-base ${INTERACTIVE_CLASS} ${
                              isActive
                                ? 'bg-[var(--color-ink)] text-[var(--color-cream)]'
                                : 'bg-[var(--color-cream-alt)] hover:bg-[var(--color-butter)]'
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      </Dialog.Close>
                    ))}
                  </nav>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </header>
  );
}
