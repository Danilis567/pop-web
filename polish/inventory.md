# Lüpük — Kod Tabanı Envanteri (`polish/inventory.md`)

> Kaynak: `src/`, `index.html`, `src/styles/tokens.*.css` (gerçek koddan okunmuştur).

---

## 1. Rotalar (`src/App.tsx`)

Tüm rotalar `SiteLayout` içinde ve `React.lazy` + `Suspense` ile yüklenir:

| Rota | Sayfa Bileşeni | Dosya |
| :--- | :--- | :--- |
| `/` | `HomePage` | `src/pages/HomePage.tsx` |
| `/shop` | `ShopPage` | `src/pages/ShopPage.tsx` |
| `/shop/:category` | `ShopPage` | `src/pages/ShopPage.tsx` |
| `/mix` | `MixPage` | `src/pages/MixPage.tsx` |
| `/product/:slug` | `ProductDetailPage` | `src/pages/ProductDetailPage.tsx` |
| `/cart` | `CartPage` | `src/pages/CartPage.tsx` |
| `/checkout` | `CheckoutPage` | `src/pages/CheckoutPage.tsx` |
| `/about` | `AboutPage` | `src/pages/AboutPage.tsx` |
| `/info` | `InfoPage` | `src/pages/InfoPage.tsx` |
| `/credits` | `CreditsPage` | `src/pages/CreditsPage.tsx` |
| `*` | `NotFoundPage` | `src/pages/NotFoundPage.tsx` |

---

## 2. Bileşenler (`src/components/`)

### Yerleşim (`src/components/layout/`)
- `SiteLayout.tsx` — Sayfa iskeleti, `#main-content` atlama bağlantısı, `Header`, `Footer`, `CartDrawer`
- `Header.tsx` — Yapışkan hap menü, logo, Radix `Dialog` arama modalı, favoriler sayacı, sepet çekmecesi tetikleyicisi, mobil menü
- `Footer.tsx` — Alt bilgi, gezinme bağlantıları, dev kırpılmış marka wordmark

### Ambalaj ve UI (`src/components/packaging/`)
- `CartDrawer.tsx` — Sağdan açılan sepet çekmecesi
- `CategoryTabs.tsx` — Kategori filtre sekmeleri
- `EmptyStateIllustration.tsx` — Boş durum ve sipariş mühür illüstrasyonları (`variant="order-seal"` vb.)
- `FlavorStripe.tsx` — Aroma şeridi
- `NetWeightTag.tsx` — Monospace net ağırlık etiketi
- `PackCard.tsx` — Zikzak kenarlı ambalaj ürün kartı
- `RetroDialog.tsx` — Retro işletim sistemi penceresi diyalog kutusu
- `StarburstBadge.tsx` — Yıldız patlaması fiyat/vurgu rozeti
- `TickerStrip.tsx` — Kayan duyuru şeridi (`animate-ticker`)
- `ZigzagEdge.tsx` — Isı yapıştırma zikzak ambalaj kenarı

---

## 3. Tasarım Token Dosyaları (`src/styles/`)

Barrel dosya `src/styles/tokens.css` aşağıdaki 4 token dosyasını içe aktarır (`src/index.css` üzerinden yüklenir):

1. **`src/styles/tokens.color.css` (W2)**
   - Zemin & Kontrast: `--color-cream` (`#FFF8EE`), `--color-cream-alt` (`#FDF1DF`), `--color-white` (`#FFFFFF`), `--color-ink` (`#2B1410`), `--color-ink-soft` (`#4A231E`)
   - Ana Pop Palet: `--color-tomato` (`#C8281C`), `--color-pink` (`#FF6FA8`), `--color-butter` (`#FFD447`), `--color-powder-blue` (`#8ECAE6`), `--color-deep-blue` (`#1E4DD8`), `--color-lime` (`#9AE63B`), `--color-tangerine` (`#FF7A22`), `--color-lavender` (`#C9A7FF`), `--color-cocoa` (`#6E352C`)
   - 6 Kategori Ambalaj Renkleri: `--cat-sert-seker` (`#C8281C` / `#FFF8EE`), `--cat-jelibon` (`#8ECAE6` / `#2B1410`), `--cat-cikolata-kapli` (`#6E352C` / `#FFF8EE`), `--cat-lolipop-sakiz` (`#FF6FA8` / `#2B1410`), `--cat-geleneksel` (`#C9A7FF` / `#2B1410`), `--cat-tuzlu-atistirmalik` (`#FFD447` / `#2B1410`)
   - Anlamsal & Kontur/Gölge: `--bg-page`, `--bg-surface`, `--bg-card`, `--text-primary`, `--text-secondary`, `--accent-primary`, `--accent-secondary`, `--accent-highlight`, `--border-width` (`2px`), `--border-width-thick` (`3px`), `--border-ink`, `--border-ink-thick`, `--shadow-pop-sm` (`2px 2px 0`), `--shadow-pop` (`4px 4px 0`), `--shadow-pop-lg` (`6px 6px 0`)

2. **`src/styles/tokens.typography.css` (W1)**
   - Font Aileleri: `--font-display` (`'Baloo 2'`), `--font-body` (`'Plus Jakarta Sans'`), `--font-serif` (`'Fraunces'`), `--font-mono` (`'JetBrains Mono'`)
   - Ölçek: `--text-xs` (`0.75rem`), `--text-sm` (`0.875rem`), `--text-base` (`1rem`), `--text-lg` (`1.125rem`), `--text-xl` (`1.375rem`), `--text-2xl` (`1.875rem`), `--text-3xl` (`2.5rem`), `--text-hero` (`clamp(2.75rem, 6vw, 4.75rem)`), `--text-footer-wordmark` (`clamp(5rem, 18vw, 15rem)`)

3. **`src/styles/tokens.spacing.css` (W3)**
   - Köşeler: `--radius-sm` (`12px`), `--radius-card` (`24px`), `--radius-card-lg` (`32px`), `--radius-pill` (`9999px`)
   - Boşluklar: `--space-1` (`0.25rem`) .. `--space-12` (`6rem`), `--container-max` (`1280px`)
   - Ambalaj & Desen Ölçüleri: `--zigzag-tooth-width` (`16px`), `--zigzag-tooth-height` (`10px`), `--badge-star-size` (`76px`), `--badge-net-weight-height` (`24px`), `--flavor-ribbon-height` (`28px`), `--pattern-halftone-size` (`10px`), `--pattern-checker-size` (`20px`), `--pattern-grid-size` (`24px`)

4. **`src/styles/tokens.motion.css` (W6)**
   - Geçiş & Süre: `--ease-pop` (`cubic-bezier(0.34, 1.56, 0.64, 1)`), `--duration-fast` (`140ms`), `--duration-base` (`220ms`)
   - Katman (`z-index`): `--z-base` (`1`), `--z-badge` (`10`), `--z-sticky` (`40`), `--z-modal` (`100`)

---

## 4. Tam Dosya Listesi (`src/` & Kök Yapı)

- **Giriş & Stil:** `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/styles/tokens.css`, `src/styles/tokens.color.css`, `src/styles/tokens.typography.css`, `src/styles/tokens.spacing.css`, `src/styles/tokens.motion.css`
- **Veri & İçerik:** `src/content/copy.ts`, `src/data/products.js`, `src/data/products.d.ts`
- **Durum & Yardımcılar:** `src/store/cartStore.ts`, `src/hooks/usePageMeta.ts`, `src/hooks/useProductSearch.ts`, `src/lib/catalog.ts`, `src/lib/confetti.ts`, `src/lib/siteConfig.ts`
- **Yerleşim:** `src/components/layout/SiteLayout.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- **Ambalaj Bileşenleri:** `src/components/packaging/CartDrawer.tsx`, `src/components/packaging/CategoryTabs.tsx`, `src/components/packaging/EmptyStateIllustration.tsx`, `src/components/packaging/FlavorStripe.tsx`, `src/components/packaging/NetWeightTag.tsx`, `src/components/packaging/PackCard.tsx`, `src/components/packaging/RetroDialog.tsx`, `src/components/packaging/StarburstBadge.tsx`, `src/components/packaging/TickerStrip.tsx`, `src/components/packaging/ZigzagEdge.tsx`
- **Sayfalar:** `HomePage.tsx`, `ShopPage.tsx`, `MixPage.tsx`, `ProductDetailPage.tsx`, `CartPage.tsx`, `CheckoutPage.tsx`, `AboutPage.tsx`, `InfoPage.tsx`, `CreditsPage.tsx`, `NotFoundPage.tsx`
- **QA & Dokümantasyon:** `scripts/qa/shots.mjs`, `scripts/qa/axe.mjs`, `scripts/qa/lh.mjs`, `polish/inventory.md`, `polish/LOCKS.md`, `polish/DIRECTION.md`, `DESIGN.md`

---

## 5. W1–W12 Dosya Sahipliği Tablosu

> Ortak dosyalara (`PackCard.tsx`, `Header.tsx`, `SiteLayout.tsx`, `index.css`, `copy.ts`) dokunmadan önce `polish/LOCKS.md` güncellenir.

| Ajan | Odak Alanı | Sahip Olduğu Dosyalar |
| :--- | :--- | :--- |
| **W1** | Tipografi & Font | `index.html` (fontlar), `src/styles/tokens.typography.css` |
| **W2** | Renk & Kontrast | `src/styles/tokens.color.css` |
| **W3** | Boşluk & Ölçü | `src/styles/tokens.spacing.css` |
| **W4** | Ambalaj Bileşenleri | `src/components/packaging/*` (`PackCard.tsx` kilit gerektirir) |
| **W5** | Ana Sayfa & Vitrin | `src/pages/HomePage.tsx`, `src/pages/ShopPage.tsx` |
| **W6** | Hareket & Etkileşim | `src/styles/tokens.motion.css`, `src/lib/confetti.ts` |
| **W7** | Ürün Detay & Karışım | `src/pages/ProductDetailPage.tsx`, `src/pages/MixPage.tsx` |
| **W8** | Sepet & Ödeme | `src/pages/CartPage.tsx`, `src/pages/CheckoutPage.tsx`, `src/store/cartStore.ts` |
| **W9** | Bilgi & Alt Bilgi | `src/pages/AboutPage.tsx`, `src/pages/InfoPage.tsx`, `src/pages/CreditsPage.tsx`, `src/pages/NotFoundPage.tsx`, `src/components/layout/Footer.tsx` |
| **W10** | Erişilebilirlik & Klavye | `src/components/layout/Header.tsx`, `src/components/layout/SiteLayout.tsx` (kilitli) |
| **W11** | Performans & Bundle | `vite.config.ts`, `src/hooks/useProductSearch.ts`, kod bölme/lazy ayarları |
| **W12** | QA Altyapısı & Doküman | `scripts/qa/shots.mjs`, `scripts/qa/axe.mjs`, `scripts/qa/lh.mjs`, `polish/inventory.md`, `polish/baseline/*`, `DESIGN.md` |
