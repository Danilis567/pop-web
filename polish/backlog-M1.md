# M1 — Görsel & Marka Cilası Uygulama Backlog'u (`polish/backlog-M1.md`)

> **Hazırlayan:** M1 — Görsel & Marka Cilası Ara Yöneticisi (Dalga 2)
> **Kaynak Bulgular:** `polish/findings/w1.md` (10), `w2.md` (7), `w3.md` (11), `w4.md` (11), `w5.md` (9), `w6.md` (7) — toplam 55 bulgu.
> **Kapsam Dışı Eleme:** İncelenen 55 bulgunun tamamı cila kapsamındadır; `polish/backlog.md` dosyasına aktarılan yeni özellik / fiyat / iddia bulgusu yoktur.

---

## Merge Sırası ve Dosya Kilit Planı

1. **Dalga 3a — Tokenlar (Paralel):** `M1-3A-01` (`tokens.typography.css`), `M1-3A-02` (`tokens.color.css`), `M1-3A-03` (`tokens.spacing.css`), `M1-3A-04` (`tokens.motion.css`).
2. **Dalga 3b / Sıra 1 — Ambalaj Bileşenleri & Temel Tipografi/Yerleşim:** `M1-3B-01` (`index.html` #1, `index.css` #1), `M1-3B-02`, `M1-3B-04B` (paralel) → `M1-3B-03` (`index.css` #2, `M1-3B-01` sonrası) & `M1-3B-04` (`index.html` #2, `M1-3B-01` sonrası).
3. **Dalga 3b / Sıra 2 — Görseller:** `M1-3B-05` (`ProductImage.tsx`) → `M1-3B-06` (`PackCard.tsx` #1), `M1-3B-07`, `M1-3B-08` (paralel).
4. **Dalga 3b / Sıra 3 — Hareket & Etkileşim:** `M1-3B-09` (`index.css` #3, `M1-3B-03` sonrası), `M1-3B-10` (`HomePage.tsx`), `M1-3B-11` (`PackCard.tsx` #2, `M1-3B-06` sonrası).

---

## Dalga 3a — Tasarım Tokenları (Paralel)

### Kart: `M1-3A-01`
- **ID:** `M1-3A-01` (Kaynak: `W1-06`, `W1-10`)
- **Sorumlu:** `W1`
- **Amaç:** `tokens.typography.css` içine `--leading-*` ve `--tracking-*` tokenlarını eklemek; `--text-xs`..`--text-3xl` ölçek tokenlarını `@theme` ile eşlemek/hizalamak.
- **İzinli Dosyalar:** `src/styles/tokens.typography.css`
- **Kabul Ölçütü:** `--leading-tight`, `--leading-snug`, `--leading-normal` ve `--tracking-*` tokenları tanımlı; tipografi ölçeği `DESIGN.md` ile uyumlu; `npm run build` hatasız.
- **Diff Sınırı (≤ 300 satır):** ~25 satır
- **Kanıt:** `src/styles/tokens.typography.css:1-20` (`--leading-*` / `--tracking-*` eksik, `--text-3xl: 2.5rem` Tailwind ile uyumsuz).

### Kart: `M1-3A-02`
- **ID:** `M1-3A-02` (Kaynak: `W2-03`, `W2-05`, `W2-07`)
- **Sorumlu:** `W2`
- **Amaç:** `tokens.color.css` içine odak halkası (`--focus-ring`, `--focus-ring-inverse`), scrim (`--bg-scrim`), çekmece gölgesi (`--shadow-drawer`) ve desen tokenlarını (`--pattern-grid-line`, `--pattern-halftone-dot`, `--pattern-awning-stripe`) eklemek.
- **İzinli Dosyalar:** `src/styles/tokens.color.css`
- **Kabul Ölçütü:** `--focus-ring`, `--focus-ring-inverse`, `--bg-scrim`, `--shadow-drawer` ve `color-mix` tabanlı `--pattern-*` tokenları tanımlı; `brand/BRAND.md` ve `DESIGN.md` ana renkleri değişmez.
- **Diff Sınırı (≤ 300 satır):** ~15 satır
- **Kanıt:** `src/styles/tokens.color.css:44-52`, `src/index.css:21-29,76-123`, `CartDrawer.tsx:27,30`.

### Kart: `M1-3A-03`
- **ID:** `M1-3A-03` (Kaynak: `W3-11`, `W5-07`)
- **Sorumlu:** `W3`
- **Amaç:** `tokens.spacing.css` içindeki `--space-1`..`--space-12` tokenlarını Tailwind v4 `@theme` ile eşlemek ve iç görsel çerçevesi için `--radius-md: 16px;` eklemek.
- **İzinli Dosyalar:** `src/styles/tokens.spacing.css`
- **Kabul Ölçütü:** `--space-*` tokenları `@theme` veya belgelenen 4/8px ölçeğiyle birebir hizalı; `--radius-md: 16px` tanımlı; mevcut `--container-max`, `--radius-*`, `--pattern-*` korunur.
- **Diff Sınırı (≤ 300 satır):** ~18 satır
- **Kanıt:** `src/styles/tokens.spacing.css:11-19`, `PackCard.tsx:60` (`rounded-[16px]`).

### Kart: `M1-3A-04`
- **ID:** `M1-3A-04` (Kaynak: `W6-05`)
- **Sorumlu:** `W6`
- **Amaç:** `tokens.motion.css` içindeki `--duration-fast` (`140ms`), `--duration-base` ve `--ease-pop` tokenlarının `@theme` / CSS değişkeni olarak tüm sayfa ve bileşenlerden erişilebilir olmasını doğrulamak.
- **İzinli Dosyalar:** `src/styles/tokens.motion.css`
- **Kabul Ölçütü:** `--duration-fast: 140ms` ve eğriler tutarlı tanımlı; `npm run build` hatasız.
- **Diff Sınırı (≤ 300 satır):** ~10 satır
- **Kanıt:** `src/styles/tokens.motion.css:7` (`--duration-fast: 140ms;` tanımlı ama tüketilmiyor).

---

## Dalga 3b / Sıra 1 — Ambalaj Bileşenleri & Temel Tipografi/Yerleşim

### Kart: `M1-3B-01`
- **ID:** `M1-3B-01` (Kaynak: `W1-01`, `W1-03`, `W1-04`, `W1-05`, `W1-08`)
- **Sorumlu:** `W1`
- **Amaç:** Font yükleme gecikmesini ve eksik `JetBrains Mono` `700` ağırlığını düzeltmek; `index.css` temel tipografi kurallarını (`tabular-nums`, `text-wrap: balance/pretty`, `body` `line-height`) ve `localeUpper` Türkçe büyük harf yardımcısını eklemek.
- **İzinli Dosyalar:** `index.html`, `src/index.css` *(Kilit #1)*, `src/lib/catalog.ts`
- **Kabul Ölçütü:** `JetBrains+Mono:wght@400;500;700` yüklenir; `media="print" onload` kaldırılır; `h1,h2,h3 { text-wrap: balance; }` ve `p { text-wrap: pretty; }` eklenir; `.tabular-nums` tanımlanır; `localeUpper(str)` `toLocaleUpperCase('tr-TR')` döndürür.
- **Diff Sınırı (≤ 300 satır):** ~45 satır
- **Kanıt:** `index.html:28-33`, `src/index.css:4-30`, `Select-String` (`tabular-nums`: 0, `text-wrap`: 0, `toLocaleUpperCase`: 0).

### Kart: `M1-3B-02`
- **ID:** `M1-3B-02` (Kaynak: `W1-01`, `W1-02`, `W1-07`, `W1-08`, `W2-01`, `W2-02`, `W3-06`, `W3-07`, `W5-04`, `W5-05`)
- **Sorumlu:** `W1` + `W3` + `W5` (tek ortak kart)
- **Amaç:** Küçük ambalaj bileşenleri ve `Header` üzerinde gramaj (`140 g` `normal-case`), `tabular-nums`, minimum `text-xs` (`12px`), `NetWeightTag` `pop-border` (`2px`), `StarburstBadge` `var(--color-ink)` gölge + `non-scaling-stroke`, `FlavorStripe` `min-w-0`/`title` kesilme koruması, `CategoryTabs` aktif koyu sekmede `data-surface="dark"`, 4/8px boşluk ve `Header` `top-24` konumunu düzeltmek.
- **İzinli Dosyalar:** `src/components/packaging/NetWeightTag.tsx`, `src/components/packaging/FlavorStripe.tsx`, `src/components/packaging/StarburstBadge.tsx`, `src/components/packaging/CategoryTabs.tsx`, `src/components/layout/Header.tsx`
- **Kabul Ölçütü:** Gramajlar `140 g` görünür; `tabular-nums` aktif; `text-[10px]`/`text-[11px]` kalmaz; `NetWeightTag` `2px` konturlu; `FlavorStripe` `NetWeightTag` ile çakışmaz; koyu kategori sekmelerinde odak halkası kontrastlıdır (`data-surface="dark"`); arama modalı ve mobil menü `top-24` başlar.
- **Diff Sınırı (≤ 300 satır):** ~55 satır
- **Kanıt:** `home-1440.png` (`NET 140G`), `Header.tsx:35,88,196`, `CategoryTabs.tsx:24,31-55`, `StarburstBadge.tsx:29,36,40,43`, `NetWeightTag.tsx:14`, `FlavorStripe.tsx:18-23`.

### Kart: `M1-3B-03`
- **ID:** `M1-3B-03` (Kaynak: `W1-09`, `W3-03`, `W3-08`)
- **Sorumlu:** `W3`
- **Amaç:** `html` `scroll-padding-top: 6rem` eklemek, iç sayfaların dikey dış boşluğunu `py-8 sm:py-10` olarak tekilleştirmek ve `AboutPage` `Fraunces` ağırlığını `font-semibold` ile eşitlemek.
- **İzinli Dosyalar:** `src/index.css` *(Kilit #2 — `M1-3B-01` sonrası)*, `src/pages/AboutPage.tsx`, `src/pages/InfoPage.tsx`, `src/pages/CreditsPage.tsx`, `src/pages/ShopPage.tsx`
- **Kabul Ölçütü:** `#main-content` atlama bağlantısı sticky header altında kalmaz; tüm hedef sayfalarda `py-8 sm:py-10` tutarlıdır; `AboutPage.tsx:47` `font-semibold` taşır.
- **Diff Sınırı (≤ 300 satır):** ~20 satır
- **Kanıt:** `src/index.css:5-10`, `AboutPage.tsx:12,47`, `InfoPage.tsx:11`, `ShopPage.tsx:126`.

### Kart: `M1-3B-04`
- **ID:** `M1-3B-04` (Kaynak: `W5-01`)
- **Sorumlu:** `W5`
- **Amaç:** `public/brand/logo-mark.svg` kaynağından `32x32`, `180x180`, `192x192`, `512x512` PNG favicon/ikon setini üretmek, `public/site.webmanifest` oluşturmak (`theme_color`/`background_color: "#FFF8EE"`) ve `index.html` `<head>` içine `<link>` etiketlerini eklemek.
- **İzinli Dosyalar:** `public/favicon-32x32.png`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png`, `public/site.webmanifest`, `index.html` *(Kilit #2 — `M1-3B-01` sonrası)*
- **Kabul Ölçütü:** 4 PNG ve `site.webmanifest` `public/` altında mevcuttur; `index.html` `icon`, `apple-touch-icon` ve `manifest` bağlantılarını içerir; `npm run build` sonrası `dist/` içine kopyalanır.
- **Diff Sınırı (≤ 300 satır):** ~20 satır + 4 PNG varlık
- **Kanıt:** `index.html:25`, `public/` dizini (`logo-mark.svg` var, PNG/webmanifest yok).

### Kart: `M1-3B-04B`
- **ID:** `M1-3B-04B` (Kaynak: `W2-01`, `W2-02`, `W2-04`, `W5-02`, `W5-03`, `W5-08`, `W5-09`)
- **Sorumlu:** `W5` + `W2` (ortak SVG/diyalog bileşenleri)
- **Amaç:** `ZigzagEdge` içine `vectorEffect="non-scaling-stroke"` eklemek; `logo-mono.svg` içinde `currentColor` yerine `#2B1410` kullanmak ve `logo-*.svg` varyantları arasındaki `ü` nokta/kontur farklarını hizalamak; `EmptyStateIllustration` içinde `var(--color-ink)` + `strokeWidth="3"` eşitlemek; `RetroDialog` içinde `data-surface="dark"` ve anlamsal renk tokenlarını uygulamak.
- **İzinli Dosyalar:** `src/components/packaging/ZigzagEdge.tsx`, `src/components/packaging/EmptyStateIllustration.tsx`, `src/components/packaging/RetroDialog.tsx`, `public/brand/logo-main.svg`, `public/brand/logo-horizontal.svg`, `public/brand/logo-mark.svg`, `public/brand/logo-mono.svg`
- **Kabul Ölçütü:** Tüm ekran genişliklerinde zikzak konturu `2px` kalır; `logo-mono.svg` saf siyah (`#000000`) yerine `#2B1410` basar; 4 logo varyantı tutarlıdır; `EmptyStateIllustration` dış hatları `strokeWidth="3"` ve `var(--color-ink)` kullanır.
- **Diff Sınırı (≤ 300 satır):** ~45 satır
- **Kanıt:** `ZigzagEdge.tsx:16-28`, `public/brand/logo-*.svg`, `EmptyStateIllustration.tsx:25-103`, `RetroDialog.tsx:21-63`.

---

## Dalga 3b / Sıra 2 — Görseller (`ProductImage` & Kart/Sayfa Entegrasyonu)

### Kart: `M1-3B-05`
- **ID:** `M1-3B-05` (Kaynak: `W4-06`, `W4-11`)
- **Sorumlu:** `W4`
- **Amaç:** `-400.webp` URL türetme, `srcSet`/`sizes`, `width`/`height`, `loading`/`fetchPriority` ve `onError` yer tutucu (`COPY.common.imagePlaceholder` / `EmptyStateIllustration`) fallback'ini tek ortak `ProductImage` bileşeninde toplamak.
- **İzinli Dosyalar:** `src/components/packaging/ProductImage.tsx` *(yeni dosya)*
- **Kabul Ölçütü:** Kırık/404 görselde tarayıcı broken-image ikonu yerine erişilebilir yer tutucu render edilir; `-400.webp` ve `800w` `srcSet` otomatik üretilir.
- **Diff Sınırı (≤ 300 satır):** ~60 satır
- **Kanıt:** `PackCard.tsx:26-28`, `CartDrawer.tsx:78-79`, `HomePage.tsx:156-157` yinelenen `.replace` mantığı ve 6 yüzeyde `onError` eksikliği.

### Kart: `M1-3B-06`
- **ID:** `M1-3B-06` (Kaynak: `W1-01`, `W1-02`, `W1-07`, `W2-01`, `W2-02`, `W2-03`, `W2-04`, `W3-04`, `W3-07`, `W3-10`, `W4-06`, `W4-08`, `W4-09`, `W4-10`, `W5-06`, `W5-07`, `W5-09`)
- **Sorumlu:** `W4` (W1+W2+W3+W5 `PackCard`/`CartDrawer` birleşik kartı)
- **Amaç:** `PackCard` ve `CartDrawer` bileşenlerini `ProductImage` ile güncellemek (`priority`, `300px` `sizes`, `p-1.5`); `mt-3`, rozet `-bottom-2 -right-1` (3+ haneli fiyatlarda `text-base`), `tabular-nums`, `normal-case`, `text-xs`, `--radius-md`/`--radius-sm` yarıçapları, `lucide-react` `w-3 h-3` ikonlarında `strokeWidth={2.5}`, `CartDrawer` `backdrop-blur-[2px]` kaldırma (`--bg-scrim` + `--shadow-drawer`), `data-surface="dark"` ve anlamsal tokenları (`--bg-card`, `--text-primary`, `--text-secondary`) uygulamak.
- **İzinli Dosyalar:** `src/components/packaging/PackCard.tsx` *(Kilit #1 — `M1-3B-05` sonrası)*, `src/components/packaging/CartDrawer.tsx`
- **Kabul Ölçütü:** `PackCard` masaüstü 4 sütunda `-400.webp` seçer; `ZigzagEdge` `mt-3` ile taşmaz; 320px'te yıldız rozeti başlığa değmez ve `118 TL` gibi 3 haneli fiyatlar taşmaz; `CartDrawer` `backdrop-blur` içermez, `--shadow-drawer` ve `onError` fallback kullanır.
- **Diff Sınırı (≤ 300 satır):** ~95 satır
- **Kanıt:** `PackCard.tsx:39,60,67,71-92,112,129,146`, `CartDrawer.tsx:27-33,42-63,75-99,111,123-164`, `home-320.png`, `shop-1440.png`.

### Kart: `M1-3B-07`
- **ID:** `M1-3B-07` (Kaynak: `W1-01`, `W1-02`, `W1-07`, `W3-07`, `W3-08`, `W4-01`, `W4-02`, `W4-06`, `W4-07`)
- **Sorumlu:** `W4` (W1+W3 alt düzeltmeleri dahil)
- **Amaç:** `ProductDetailPage` ana görseline `w-full`, `width={800} height={800}`, `srcSet`/`sizes` ve `fetchPriority="high"` ekleyerek mobil `CLS 0.2083` → `0` ve `LCP 4176 ms` iyileştirmesini sağlamak; galeri küçük görsellerini `80×80` `lazy` yapmak; `tabular-nums`, `normal-case`, `text-xs`, `py-8 sm:py-10` ve 4/8px boşlukları uygulamak.
- **İzinli Dosyalar:** `src/pages/ProductDetailPage.tsx` *(`M1-3B-05` sonrası)*
- **Kabul Ölçütü:** Ana görsel kapsayıcısı `w-full` ve `<img>` `800×800` boyutludur; galeri küçük görselleri `-400.webp` + `loading="lazy"` kullanır; tüm fiyat/teknik etiketler `tabular-nums` ve `≥ text-xs` olur.
- **Diff Sınırı (≤ 300 satır):** ~55 satır
- **Kanıt:** `polish/baseline/lighthouse.json:45-46` (`lcpMs: 4176`, `cls: 0.2083`), `ProductDetailPage.tsx:81,113,165,210-251,314,324-359`.

### Kart: `M1-3B-08`
- **ID:** `M1-3B-08` (Kaynak: `W1-01`, `W1-02`, `W1-03`, `W1-07`, `W3-03`, `W3-04`, `W3-08`, `W3-09`, `W4-03`, `W4-04`, `W4-06`, `W4-08`, `W4-09`)
- **Sorumlu:** `W4` (W1+W3 alt düzeltmeleri dahil)
- **Amaç:** `MixPage` ve `CartPage` görsellerini `ProductImage` (`-400.webp`, `srcSet`, `width`/`height`, `onError`, `p-1.5`) ile normalize etmek; `MixPage` yapışkan tepsisini `lg:top-28`, `mt-3` ve `line-clamp-2 min-h-[2.75rem]` yapmak; `CartPage` ve `MixPage` tipografi (`tabular-nums`, `normal-case`, `text-xs`, `font-medium`/`700`) ve `py-8 sm:py-10` boşluğunu düzeltmek.
- **İzinli Dosyalar:** `src/pages/MixPage.tsx`, `src/pages/CartPage.tsx` *(`M1-3B-05` sonrası)*
- **Kabul Ölçütü:** `/mix` ve `/cart` gereksiz 800px indirmesi yapmaz; `MixPage` tepsisi sticky header altında kalmaz; uzun ürün adları 2 satırda tam görünür.
- **Diff Sınırı (≤ 300 satır):** ~70 satır
- **Kanıt:** `MixPage.tsx:87,166-224,268-309`, `CartPage.tsx:25,63-86,113-161`.

---

## Dalga 3b / Sıra 3 — Hareket & Etkileşim (Son Aşama)

### Kart: `M1-3B-09`
- **ID:** `M1-3B-09` (Kaynak: `W1-08`, `W2-01`, `W2-05`, `W2-06`, `W2-07`, `W3-07`, `W6-01`, `W6-04`, `W6-07`)
- **Sorumlu:** `W6` (W2 `index.css` / `TickerStrip` ekleri dahil)
- **Amaç:** `TickerStrip` içine WCAG 2.2.2 uyumlu `<button aria-pressed={paused}>` duraklat/oynat kontrolü, `:focus-within`/`data-paused="true"` duraklatması, kopya şeride `aria-hidden="true"` ve ayırıcı `★` için `--color-ink` rengi eklemek; `index.css` içinde `--focus-ring`/`--focus-ring-inverse` çift katmanlı odak halkası, `--pattern-*` desen tokenları, `.pop-spring` `box-shadow` kaldırma ve `prefers-reduced-motion` genişletmesini uygulamak.
- **İzinli Dosyalar:** `src/components/packaging/TickerStrip.tsx`, `src/data/copy.ts`, `src/index.css` *(Kilit #3 — `M1-3B-03` sonrası)*
- **Kabul Ölçütü:** Kullanıcı ve klavye odağı ticker animasyonunu durdurabilir; `★` `--color-ink` (`12.20:1`) kontrastındadır; `index.css` sabit `rgba(...)` içermez ve `:focus-visible` koyu/doygun yüzeylerde kontrastlıdır; `.pop-spring` yalnızca `transform, background-color` geçirir.
- **Diff Sınırı (≤ 300 satır):** ~60 satır
- **Kanıt:** `TickerStrip.tsx:15-32`, `src/index.css:21-29,76-144`.

### Kart: `M1-3B-10`
- **ID:** `M1-3B-10` (Kaynak: `W1-07`, `W1-08`, `W3-01`, `W3-02`, `W3-05`, `W4-05`, `W4-06`, `W4-09`, `W6-03`, `W6-04`, `W6-05`, `W6-07`)
- **Sorumlu:** `W6` (W1+W3+W4 `HomePage` birleşik kartı — `M1-3B-05` ve `M1-3B-09` sonrası)
- **Amaç:** `HomePage` üzerindeki tüm görsel, yerleşim, tipografi ve hareket cilalarını tek çakışmasız geçişte tamamlamak:
  1. 320px hero vitrin etiketlerinde `line-clamp-2` / `p-1.5` (kırpılma giderimi) ve vitrin görsel zemini `bg-[var(--color-white)]` + `ProductImage` (`onError`).
  2. Karusel 4. kart genişliği `lg:flex-[0_0_calc((100%-3*1.25rem)/4)]` (11px taşma giderimi).
  3. Karusel ilerleme çubuğunu `width` + `transition-all` yerine `scaleX` + `duration-[var(--duration-fast)]` yapmak; `HERO_SHOWCASE` kartlarına `motion-reduce:transition-none motion-reduce:hover:translate-y-0` eklemek.
  4. Sayfa sonu çift boşluğunu (`pb-6` / `pb-8`) kaldırmak, `text-[10px]` → `text-xs`, `localeUpper` ve ikincil CTA geçişlerini eşitlemek.
- **İzinli Dosyalar:** `src/pages/HomePage.tsx`
- **Kabul Ölçütü:** `home-320.png` hero etiketleri kesilmez; `home-1440.png` 4. kart gölgesi kesilmez; ilerleme çubuğu reflow tetiklemez; alt boşluk diğer sayfalarla eşittir.
- **Diff Sınırı (≤ 300 satır):** ~55 satır
- **Kanıt:** `HomePage.tsx:67,95,101,121-174,246-268,280-296`, `home-320.png`, `home-1440.png`.

### Kart: `M1-3B-11`
- **ID:** `M1-3B-11` (Kaynak: `W1-01`, `W1-03`, `W3-08`, `W6-02`, `W6-06`, `W6-07`)
- **Sorumlu:** `W6` (`M1-3B-06` sonrası `PackCard.tsx` kilidi #2)
- **Amaç:** `canvas-confetti` kütüphanesini `prefersReduced` kontrolünden sonra dinamik `import('canvas-confetti')` ile tembel yüklemek; `CheckoutPage` üzerinde `tabular-nums`, `py-8 sm:py-10` ve sipariş CTA hover/active geçişini eklemek; `PackCard` hover kaldırma ve buton `active:scale-95` (`motion-reduce:active:scale-100`) etkileşimini tokenlarla hizalamak.
- **İzinli Dosyalar:** `src/lib/confetti.ts`, `src/pages/CheckoutPage.tsx`, `src/components/packaging/PackCard.tsx` *(Kilit #2 — `M1-3B-06` sonrası)*
- **Kabul Ölçütü:** `canvas-confetti` ana bundle'da yer almaz ve `reduced-motion` modunda hiç indirilmez; `PackCard` butonlarında basma geri bildirimi vardır; `npm run build` ve `npx tsc --noEmit` hatasız.
- **Diff Sınırı (≤ 300 satır):** ~35 satır
- **Kanıt:** `src/lib/confetti.ts:1,16-42`, `CheckoutPage.tsx:87,95,208,223-233`, `PackCard.tsx:36-38,124,144`.
