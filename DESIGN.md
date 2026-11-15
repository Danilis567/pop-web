# DESIGN.md — Lüpük Tasarım Sistemi

> `awesome-design-md` biçiminde, Lüpük'ün güncel token dosyaları (`src/styles/tokens.*.css`), bileşen standartları (`src/components/packaging/`) ve marka kuralları (`brand/BRAND.md`, `polish/DIRECTION.md`) esas alınarak son haline getirilmiştir.

---

## 1. Atmosfer (Visual Vibe & Aesthetic)
Lüpük; sıcak krem kâğıt zeminler üzerinde düz, doygun, gradyansız pop şekerleme yüzeyleri, zikzak ısı-yapıştırma poşet kenarları, yıldız patlaması rozetleri ve sert kakao-mürekkep konturlarıyla kurgulanan dokunsal bir ambalaj vitrinidir. Siyah (`#000000`) yerine derin kakao-bordo (`#2B1410`) kullanılır; hiçbir öğede yumuşak bulanık gölge veya renk geçişi yer almaz.

---

## 2. Renk Rolleri (`src/styles/tokens.color.css`)

| Rol | Token | Hex / Değer | Kullanım |
| :--- | :--- | :--- | :--- |
| Sayfa Zemini | `--bg-page` (`--color-cream`) | `#FFF8EE` | Ana okuma ve vitrin zemini |
| İkincil Yüzey | `--bg-surface` (`--color-cream-alt`) | `#FDF1DF` | Kartlar, form blokları, defter/fiş alanları |
| Kart / Dekupe | `--bg-card` (`--color-white`) | `#FFFFFF` | Ürün görseli zemini, form alanları |
| Ana Mürekkep | `--text-primary` (`--color-ink`) | `#2B1410` | Başlıklar, gövde metni, `2px` kontur ve sert gölgeler |
| Yumuşak Mürekkep | `--text-secondary` (`--color-ink-soft`) | `#4A231E` | Yardımcı metinler, alt açıklamalar |
| Birincil Vurgu | `--accent-primary` (`--color-tomato`) | `#C8281C` | Ana CTA butonları, fiyat vurgusu |
| İkincil Vurgu & Odak | `--accent-secondary` (`--color-deep-blue`) / `--focus-ring` | `#1E4DD8` | `:focus-visible` odak halkası, bağlantılar |
| Ters Odak & Perde | `--focus-ring-inverse` / `--bg-scrim` | `#FFF8EE` / `45% #2B1410` | Koyu zeminde odak halkası ve modal/çekmece perdesi |
| Parlak Vurgu | `--accent-highlight` (`--color-butter`) | `#FFD447` | Yıldız rozetler, sepet/aksiyon hapları |
| Destek Pop Tonları | `--color-pink`, `--color-powder-blue`, `--color-lime`, `--color-tangerine`, `--color-lavender`, `--color-cocoa` | `#FF6FA8`, `#8ECAE6`, `#9AE63B`, `#FF7A22`, `#C9A7FF`, `#6E352C` | Kategori karoları, aroma şeritleri, ticker |

### 6 Kategori Ambalaj Renkleri
- `sert-seker`: `--cat-sert-seker` (`#C8281C`) / `--cat-sert-seker-ink` (`#FFF8EE`)
- `jelibon`: `--cat-jelibon` (`#8ECAE6`) / `--cat-jelibon-ink` (`#2B1410`)
- `cikolata-kapli`: `--cat-cikolata-kapli` (`#6E352C`) / `--cat-cikolata-kapli-ink` (`#FFF8EE`)
- `lolipop-sakiz`: `--cat-lolipop-sakiz` (`#FF6FA8`) / `--cat-lolipop-sakiz-ink` (`#2B1410`)
- `geleneksel`: `--cat-geleneksel` (`#C9A7FF`) / `--cat-geleneksel-ink` (`#2B1410`)
- `tuzlu-atistirmalik`: `--cat-tuzlu-atistirmalik` (`#FFD447`) / `--cat-tuzlu-atistirmalik-ink` (`#2B1410`)

---

## 3. Tipografi (`src/styles/tokens.typography.css`)
- **Display:** `--font-display` (`'Baloo 2'`, ui-rounded, sans-serif) — Yuvarlak, yüksek enerjili başlıklar ve buton etiketleri
- **Gövde:** `--font-body` (`'Plus Jakarta Sans'`, ui-sans-serif, sans-serif) — Okunaklı arayüz ve açıklama metinleri
- **Vurgu Serif:** `--font-serif` (`'Fraunces'`, Georgia, serif, italic) — Editoryal kelime vurguları (`.font-serif-accent`)
- **Teknik / Etiket:** `--font-mono` (`'JetBrains Mono'`, ui-monospace, monospace) — Gramaj, parti kodu (`PARTİ #26-01`), sayaçlar (`.font-mono-spec`)
- **Ölçek, Satır Yüksekliği ve Harf Aralığı:** `--text-xs` (`0.75rem`) → `--text-3xl` (`2.5rem`), `--text-hero` (`clamp(2.75rem, 6vw, 4.75rem)`), `--text-footer-wordmark` (`clamp(5rem, 18vw, 15rem)`); `--leading-tight` (`1.15`), `--leading-snug` (`1.35`), `--leading-normal` (`1.5`); `--tracking-tight` (`-0.02em`), `--tracking-wide` (`0.04em`), `--tracking-widest` (`0.1em`).

---

## 4. Bileşen Standartları (`src/components/` & `src/index.css`)
- **`PackCard`:** `2px solid var(--color-ink)` (`.pop-border`), `--radius-card` (`24px`), üstte `ZigzagEdge`, altta `FlavorStripe`, `NetWeightTag` ve `StarburstBadge`.
- **`ProductImage`:** Responsive `srcSet` (`-400.webp 400w, .webp 800w`), varsayılan `loading="lazy"` + `decoding="async"` (`priority` prop'u ile `loading="eager"` ve `fetchPriority="high"`), eksik veya hatalı görselde kakao konturlu SVG ve `COPY.common.imagePlaceholder` yedek kutusu (`role="img"`).
- **`ZigzagEdge`:** Kart üst kenarından dışa taşan (`-top-3`) SVG ısı-yapıştırma zikzak kesimi (`--zigzag-tooth-width: 16px`, `--zigzag-tooth-height: 10px`, `vectorEffect="non-scaling-stroke"`, `2px` `--color-ink` kontur) ve altında `8px` (`h-2`) kategori rengi şerit.
- **`StarburstBadge`:** `md` (`76 × 76px`, `--badge-star-size`) ve `lg` (`86 × 86px`) boyutlu, `-6deg` eğimli, `--color-butter` (`#FFD447`) dolgulu, `drop-shadow-[2px_2px_0_var(--color-ink)]` gölgeli yıldız rozet; 3+ basamaklı fiyatlarda yazı boyutu küçülür, `tabular-nums` ve `tr-TR` biçimiyle `TL` birimi gösterir.
- **`FlavorStripe`:** `--flavor-ribbon-height` (`28px`), `rounded-full`, `.pop-border`, `font-mono-spec text-xs uppercase tracking-wider`; dar alanlarda `truncate` ve `title` ile taşma güvenliği sağlar.
- **`NetWeightTag`:** `--badge-net-weight-height` (`24px`), `rounded-md`, `.pop-border`, `--color-cream` zemin, `font-mono-spec text-xs normal-case tabular-nums` ve bölünmez boşluk (`\u00A0g`) ile `NET 140 g` biçimi.
- **Hover Güvenliği (`@media (hover: hover)`):** `src/index.css` içinde `@custom-variant hover (@media (hover: hover));` tanımlıdır; yalnızca fare işaretçisi olan cihazlarda hover yükselmesi/animasyonu tetiklenir, dokunmatik ekranlarda yapışkan hover oluşmaz.
- **Hap Gezinme (`Header` & `TickerStrip`):** `rounded-full`, `.pop-border`, aktif öğe `--color-ink` zemin / `--color-cream` metin; arama ve mobil menü Radix `Dialog` ile yönetilir. `TickerStrip` `.animate-ticker` (28s linear infinite, duraklatma kontrolü ve `prefers-reduced-motion` desteği).
- **Desen Yardımcıları (`src/index.css`):** `.pop-checker-band` (`20px`), `.notebook-grid` (`24px`), `.halftone-dots` (`10px`), `.awning-stripes` (`--pattern-grid-line`, `--pattern-halftone-dot`, `--pattern-awning-stripe`).

---

## 5. Yerleşim (`src/styles/tokens.spacing.css`)
- **Maksimum Konteyner:** `--container-max: 1280px`
- **Boşluk Ölçeği:** `--space-1` (`0.25rem` / `4px`) → `--space-12` (`6rem` / `96px`)
- **Köşe Yarıçapları:** `--radius-sm` (`12px`), `--radius-md` (`16px`), `--radius-card` (`24px`), `--radius-card-lg` (`32px`), `--radius-pill` (`9999px`)

---

## 6. Derinlik, Yükselti & Hareket (`src/styles/tokens.color.css`, `tokens.motion.css`)
- **Konturlar:** `--border-width` (`2px`), `--border-width-thick` (`3px`), `--border-ink`, `--border-ink-thick`
- **Sert Pop Gölgeler:** Bulanıklık (`blur`) değeri `0` olan katı ofset gölgeler:
  - `--shadow-pop-sm`: `2px 2px 0 var(--color-ink)`
  - `--shadow-pop`: `4px 4px 0 var(--color-ink)`
  - `--shadow-pop-lg`: `6px 6px 0 var(--color-ink)`
  - `--shadow-drawer`: `-6px 0 0 var(--color-ink)`
- **Katmanlar:** `--z-base: 1`, `--z-badge: 10`, `--z-sticky: 40`, `--z-modal: 100`
- **Yaylı Geçiş:** `.pop-spring` (`--duration-fast: 140ms`, `--duration-base: 220ms`, `--ease-pop: cubic-bezier(0.34, 1.56, 0.64, 1)`)

---

## 7. Yapılacaklar / Yapılmayacaklar
- **Yap:** Sıcak krem zeminler üzerinde `#2B1410` kontur ve sert gölge kullan; WCAG AA kontrast oranlarını koru; `MotionConfig reducedMotion="user"` ve `@media (prefers-reduced-motion: reduce)` kurallarına uy.
- **Yapma:** Saf siyah (`#000000`), gradyan yüzey, bulanık `box-shadow`, dark mode, yeni sayfa/özellik veya doğrulanmamış puan/tazelik iddiası ekleme.

---

## 8. Duyarlı Davranış (Responsive)
- **320 px (Mobil):** Tek sütun akış, hamburger menü (`md:hidden`), tam genişlikli kart ve çekmece.
- **768 px (Tablet):** 2 sütunlu ürün ızgarası, masaüstü hap gezinme çubuğu (`md:flex`).
- **1440 px (Masaüstü):** `1280px` konteyner sınırı, 3–4 sütunlu vitrin ızgarası ve yan yana ürün detay/ödeme düzeni.
- **Tam Ekran Kaplamalar (`100svh` / `100dvh`):** Mobil tarayıcı adres çubuğu sıçramasını önlemek için tam ekran çekmece ve diyaloglarda `100vh` yerine `100svh` veya `100dvh` kullanılır.

---

## 9. Ajan İstem Rehberi (Agent Prompt Guide)
1. Renk, font, boşluk ve hareket değerlerini sabit kodlamak yerine `src/styles/tokens.*.css` değişkenlerini kullan.
2. Tüm arayüz metinlerini `src/content/copy.ts` üzerinden al; Türkçe birim biçimini (`140 g`, `TL`) koru.
3. Ortak dosyalara (`PackCard.tsx`, `Header.tsx`, `SiteLayout.tsx`, `index.css`, `copy.ts`) düzenleme yapmadan önce `polish/LOCKS.md` kilidini kontrol et.
4. Tasarım kuralı çelişkisinde `brand/BRAND.md` ve `DESIGN.md` önceliklidir.
