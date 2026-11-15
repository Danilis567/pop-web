# M2 — Etkileşim & Kalite Cilası Görev Panosu (`polish/backlog-M2.md`)

> **Dalga 2 (M2):** `w7.md` .. `w11.md` denetim bulgularının tekilleştirilmiş, dosya kilidi çakışmasız görev kartları.  
> **Kapsam dışı bırakılanlar:** [`polish/backlog.md`](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/polish/backlog.md) içine aktarıldı.

---

## Çakışma & Bağımlılık Notları
- **Dosya Paylaşımı:** Her görev kartının `İzinli Dosyalar` listesi birbirinden ayrılmıştır; paralel ajanlar aynı dosyaya yazmaz.
- **Sıra Bağımlılığı:** `M2-06` (`copy.ts` içindeki `addToFavoritesAria` / `removeFromFavoritesAria` fonksiyon imzası) tamamlandığında `M2-04a` (`PackCard.tsx`) ve `M2-04b` (`ProductDetailPage.tsx`) bu imzayı kullanır (veya `M2-04a`/`M2-04b` geriye dönük uyumlu çağırır).
- **`LazyMotion` Koordinasyonu:** `M2-05` `App.tsx` içinde `LazyMotion` (`domAnimation`) sağlar; `M2-04a` `PackCard.tsx` içinde `motion.*` → `m.*` geçişi yapar; `M2-04b` `ProductDetailPage.tsx` içindeki tek `motion.button`'ı CSS `active:scale-[0.96]` ile değiştirir.

---

## Görev Kartları

### M2-01 — A11y Temel, Başlık/Odak & Canlı Bölgeler (`Header`, `SiteLayout`)
- **ID:** `M2-01`
- **Sorumlu:** `Ajan-A11y-Shell`
- **Amaç:** `axe` `serious=30` (`label-content-name-mismatch`: 60 düğüm) ihlallerini sıfırlamak (`Header` favoriler & sepet sayaç/ikonlarına `aria-hidden="true"`), `Header` tüm buton/linklerini `44×44 px` dokunma hedefine ve `320px` sıfır taşma düzenine getirmek, arama modalı `<input>` öğesine `aria-label` eklemek, `SiteLayout` köküne `overflow-x-clip` + rota değişiminde `#main-content` (`tabIndex={-1}`) odak yönetimi ve `aria-live="polite"` rota + sepet adedi canlı bölgelerini eklemek. *(Kapsanan: W8-01, W8-02, W8-03, W8-04 [Header], W8-07, W8-09 [Header], W9-01, W7-07/W7-08 [Header])*
- **İzinli Dosyalar:**
  - `src/components/layout/Header.tsx`
  - `src/components/layout/SiteLayout.tsx`
  - `src/hooks/usePageMeta.ts`
- **Kabul Ölçütü:**
  - `axe` taramasında tüm 10 rota × 3 genişlikte `serious === 0` (`label-content-name-mismatch === 0`).
  - `320px` genişlikte `document.documentElement.scrollWidth <= 320` (yatay taşma yok).
  - `Header` içindeki tüm etkileşimli buton/bağlantılar `≥ 44×44 px` ve `focus-visible`/`hover`/`active` stillerine sahip.
  - Rota değişiminde odak `#main-content` üzerine taşınır, sayfa başlığı ve sepet adedi değişimleri `aria-live="polite"` ile duyurulur.
- **Diff Sınırı:** `≤ 120` satır (`≤ 300` satır)
- **Kanıt:** `axe-core` tarama çıktısı (`serious=0`), `320px` ekran görüntüsü / `scrollWidth` ölçümü ve `tsc --noEmit` temiz.

---

### M2-02 — Ödeme Formu Doğrulama, Erişilebilirlik & Kaydırma (`CheckoutPage`)
- **ID:** `M2-02`
- **Sorumlu:** `Ajan-Checkout`
- **Amaç:** `CheckoutPage` form alanlarına `autoComplete` (`name`, `email`, `tel`, `address-level2`, `street-address`) ve `inputMode` (`email`, `tel`) eklemek; alan bazlı `onBlur` doğrulama + `onChange` hata temizleme, `aria-invalid`, `aria-describedby`, odaklanabilir `role="alert"` hata özeti ve submit hatasında ilk hatalı alana odaklanma (`scroll-mt-24` ile yapışkan header altında kalmadan) sağlamak; `isSubmitting` çift gönderim koruması ve `focus-visible`/`hover`/`active` durumlarını eklemek. *(Kapsanan: W7-01, W7-02, W7-07/W7-08 [Checkout], W7-09, W9-09)*
- **İzinli Dosyalar:**
  - `src/pages/CheckoutPage.tsx`
- **Kabul Ölçütü:**
  - Tüm 5 form alanında doğru `autoComplete` ve ilgili `inputMode` nitelikleri mevcut.
  - Hatalı gönderimde form üstünde odaklanabilir `role="alert"` hata özeti açılır, her hatalı alanda `aria-invalid="true"` ve `aria-describedby` bağlıdır, odak ilk hatalı alana taşınır ve alan yapışkan header altında kalmaz.
  - Gönderim sırasında buton `disabled` + `aria-busy="true"` olur.
- **Diff Sınırı:** `≤ 110` satır (`≤ 300` satır)
- **Kanıt:** Hatalı form gönderimi & klavye odak testi (320px + 1440px), `tsc --noEmit` temiz.

---

### M2-03 — Sepet Durumu, Geri Alma ("Geri Al") & Çekmece/Sayfa Etkileşimi (`cartStore`, `CartDrawer`, `CartPage`)
- **ID:** `M2-03`
- **Sorumlu:** `Ajan-Cart`
- **Amaç:** `cartStore.ts` içine maksimum adet sınırı (`MAX_QTY = 99`) ve son silinen öğe/temizlenen sepet için geri yükleme ("Geri Al") mekanizması eklemek; `CartDrawer` ve `CartPage` üzerinde silme/temizleme sonrası "Geri Al" bildirimi göstermek, `-`/`+` sınırlarında `disabled` (`1..99`) uygulamak, `inStock === false` uyarısı eklemek, tüm butonları `≥ 44×44 px` yapmak, dekoratif ikonlara `aria-hidden="true"` ve butonlara `focus-visible`/`hover`/`active` eklemek. *(Kapsanan: W7-03, W7-05 [Cart], W7-07/W7-08 [Cart], W7-11, W8-04 [Cart], W8-09 [Cart])*
- **İzinli Dosyalar:**
  - `src/store/cartStore.ts`
  - `src/components/packaging/CartDrawer.tsx`
  - `src/pages/CartPage.tsx`
- **Kabul Ölçütü:**
  - Sepet adedi `1` ile `99` arasında sınırlandırılır; sınırda `-`/`+` butonları `disabled` olur.
  - Ürün silme veya sepeti temizleme sonrası "Geri Al" aksiyonu ile önceki sepet durumu tek tıkla geri yüklenir.
  - `CartDrawer` ve `CartPage` tüm ikon/adet butonları `≥ 44×44 px`, `inStock === false` ürünlerde uyarı görünür.
- **Diff Sınırı:** `≤ 150` satır (`≤ 300` satır)
- **Kanıt:** Sepet ekleme/adet/silme/geri alma etkileşim doğrulaması ve `tsc --noEmit` temiz.

---

### M2-04a — Ortak Kart, CSS Hover Koruması & Mağaza/Ana Sayfa Cilası (`index.css`, `PackCard`, `ShopPage`, `HomePage`)
- **ID:** `M2-04a`
- **Sorumlu:** `Ajan-Storefront`
- **Amaç:** `index.css` içinde `@custom-variant hover (@media (hover: hover));` ve `scroll-padding-top` tanımlamak; `PackCard` üzerinde `"Sepete Ekle"` `aria-label` + anlık "Eklendi" geri bildirimi, favori `aria-label` ürün adı, `44×44 px` butonlar, yinelenen görsel linki (`tabIndex={-1} aria-hidden="true"`) ve çift `Tükendi` temizliği, `decoding="async"` + `width`/`height` ve `m.*` (`LazyMotion`) geçişi yapmak; `ShopPage` üzerinde `sr-only` `<h2>`, `aria-pressed`, `Slider.Thumb` `44×44` dokunma alanı + `focus-visible`, `text-base sm:text-sm` arama girişi, `min-h-[44px]` filtre hapları ve `exhaustive-deps` temizliği yapmak; `HomePage` üzerinde 320px hero etiket/rozet ayarı, `44×44` karusel düğmeleri, `touch-pan-y` + `containScroll: 'trimSnaps'`, karuselin `FeaturedCarousel.tsx` olarak lazy ayrılması ve hero `fetchPriority="high"` tekilleştirmesi yapmak. *(Kapsanan: W7-04 [PackCard], W7-07/W7-08 [Shop], W8-04 [PackCard, Shop], W8-05 [Shop], W8-08 [Shop], W8-09 [PackCard, Shop], W8-10, W9-02, W9-04, W9-06, W9-07, W9-08, W9-10, W9-12, W9-14 [Home], W9-15, W10-08, W10-11, W10-12, W10-13, W11-05 [PackCard], W11-06)*
- **İzinli Dosyalar:**
  - `src/index.css`
  - `src/components/packaging/PackCard.tsx`
  - `src/pages/ShopPage.tsx`
  - `src/pages/HomePage.tsx`
  - `src/components/home/FeaturedCarousel.tsx` *(yeni)*
- **Kabul Ölçütü:**
  - Dokunmatik cihazlarda yapışkan hover oluşmaz (`@media (hover: hover)`).
  - `PackCard` üzerinde tek odaklanabilir ürün bağlantısı, tek `Tükendi` göstergesi, ürün adıyla `aria-label`, `≥ 44×44 px` butonlar ve `m.*` kullanımı doğrulanır.
  - `ShopPage` başlık hiyerarşisi (`h1 → h2 → h3`), `Slider.Thumb` 44×44 hit area, `eslint-disable` yok.
  - `HomePage` 320px'de etiket taşması/kesilmesi yok, Embla karuseli ayrı lazy chunk olarak derlenir.
- **Diff Sınırı:** `≤ 200` satır (`≤ 300` satır)
- **Kanıt:** `vite build` chunk çıktısı, `320px`/`1440px` görsel kontrol, `eslint` & `tsc --noEmit` temiz.

---

### M2-04b — Ürün Detay & Poşet Doldur Etkileşim/Mobil Cilası (`ProductDetailPage`, `MixPage`)
- **ID:** `M2-04b`
- **Sorumlu:** `Ajan-PDP-Mix`
- **Amaç:** `ProductDetailPage` üzerinde `isOutOfStock` iken adet/aroma seçicilerini devre dışı bırakmak, `1..99` `disabled` sınırları ve "Eklendi" geri bildirimi eklemek, `44×44 px` dokunma hedefleri, `sr-only` `<h2>`, thumbnail `aria-label`+`aria-pressed`, breadcrumb `aria-current="page"`, aroma/favori `aria-pressed`, ikonlarda `aria-hidden="true"`, LCP ana görselinde `width={800} height={800} srcSet sizes fetchPriority="high"`, besin tablosu `shrink-0`/`break-words`, mobil sabit sepete ekle çubuğu (`safe-area-inset-bottom`) ve `motion.button` yerine CSS `active:scale-[0.96]` uygulamak; `MixPage` üzerinde tepsi çıkar butonu `44×44 px`, yapışkan mobil çubukta `pb-[env(safe-area-inset-bottom)]`, "Eklendi" geri bildirimi ve `hover:`/`active:` durumlarını eklemek. *(Kapsanan: W7-04 [PDP, Mix], W7-05 [PDP], W7-06, W7-08 [Mix], W8-04 [PDP, Mix], W8-05 [PDP], W8-06, W8-08 [PDP], W8-09 [PDP, Mix], W9-03, W9-05, W9-11, W9-13, W9-14 [PDP], W10-01 [PDP], W10-02)*
- **İzinli Dosyalar:**
  - `src/pages/ProductDetailPage.tsx`
  - `src/pages/MixPage.tsx`
- **Kabul Ölçütü:**
  - `ProductDetailPage` doğrudan `framer-motion` import etmez; LCP görseli `width`/`height`/`srcSet`/`fetchPriority="high"` içerir.
  - `isOutOfStock` iken aroma ve adet kontrolleri `disabled`; stokta iken `1..99` sınırları aktif.
  - `MixPage` ve `ProductDetailPage` mobil alt sabit barları `safe-area-inset-bottom` ile güvenli, tüm butonlar `≥ 44×44 px`.
- **Diff Sınırı:** `≤ 160` satır (`≤ 300` satır)
- **Kanıt:** `ProductDetailPage` Lighthouse LCP/CLS ölçümü, `320px` mobil görünüm kontrolü, `tsc --noEmit` temiz.

---

### M2-05 — Performans, Bundle Bölünmesi & Teknik SEO (`App`, `vite.config.ts`, `index.html`, `robots.txt`, `sitemap.xml`)
- **ID:** `M2-05`
- **Sorumlu:** `Ajan-Perf-SEO`
- **Amaç:** `App.tsx` içinde `MotionConfig` → `LazyMotion` (`features={() => import('framer-motion').then(m => m.domAnimation)}`) geçişi ve `PageFallback` (`role="status" aria-live="polite" min-h-[70svh]`) düzenlemesi yapmak; `vite.config.ts` içinde `manualChunks` (`react-vendor`, `radix-ui`) tanımlamak; `useProductSearch.ts` içinde `fuse.js` dinamik import yapmak; `confetti.ts` dinamik importunu doğrulamak; `index.html` içine `<link rel="canonical">`, `og:url` / tam `og:image` ve font CLS azaltıcı yükleme düzeni eklemek; `public/robots.txt` ve `public/sitemap.xml` oluşturmak *(JSON-LD `Product` eklenmez)*. *(Kapsanan: W7-10, W10-01 [App], W10-03, W10-04, W10-05, W10-06, W10-07, W10-09, W10-10)*
- **İzinli Dosyalar:**
  - `src/App.tsx`
  - `vite.config.ts`
  - `src/hooks/useProductSearch.ts`
  - `src/lib/confetti.ts`
  - `index.html`
  - `public/robots.txt` *(yeni)*
  - `public/sitemap.xml` *(yeni)*
- **Kabul Ölçütü:**
  - `vite build` sonrası ana `index` + `PackCard` gzip toplamı belirgin şekilde düşer (`framer-motion` `domAnimation` ayrı/tembel yüklenir, `fuse.js` ilk `/shop` chunk'ında yer almaz).
  - Lighthouse SEO `≥ 95` (tüm rotalarda `canonical`, `robots.txt`, `sitemap.xml` geçerli).
  - Lighthouse LCP ve CLS iyileşir (CLS `< 0.1`).
- **Diff Sınırı:** `≤ 140` satır (`≤ 300` satır)
- **Kanıt:** `vite build` bundle boyut karşılaştırması, Lighthouse SEO/LCP/CLS raporu, `tsc --noEmit` temiz.

---

### M2-06 — TR Mikro Metin, Tek Para Birimi (`TL`) & Birim Biçimi (`catalog`, `StarburstBadge`, `NetWeightTag`, `products.js`, `copy.ts`)
- **ID:** `M2-06`
- **Sorumlu:** `Ajan-Copy-TR`
- **Amaç:** `formatPrice()` çıktısını `TL` standardına (`Intl.NumberFormat('tr-TR') + '\u00A0TL'`) çekerek `StarburstBadge` ile tam uyum sağlamak; `StarburstBadge` içinde `toLocaleString('tr-TR')`, `role="img"` ve iç metne `aria-hidden="true"` eklemek; `products.js`, `NetWeightTag.tsx` ve `copy.ts` (`mix`) içindeki tüm gramajları kırılmaz boşlukla (`140\u00A0g`, `50\u00A0g`) standartlaştırmak; `copy.ts` içinde `addToFavoritesAria`/`removeFromFavoritesAria` ürün adına bağlamak, tırnakları (`“...”`), sıralama tirelerini (`A–Z`), `warningTitle` sonundaki `:` işaretini, `aria-label` belirtme eklerini, `checkout.errors` kip/etiket uyumunu, `cart.shippingValue` demo ifadesini ve boş katalog metnini düzeltmek. *(Kapsanan: W11-01, W11-02, W11-03, W11-04, W11-05 [copy], W11-07, W11-08, W11-09, W11-11, W11-12, W11-13, W11-14, W11-15)*
- **İzinli Dosyalar:**
  - `src/lib/catalog.ts`
  - `src/components/packaging/StarburstBadge.tsx`
  - `src/components/packaging/NetWeightTag.tsx`
  - `src/data/products.js`
  - `src/content/copy.ts`
- **Kabul Ölçütü:**
  - Vitrin ve `aria-label` genelinde yalnızca `TL` para birimi kullanılır (`₺` yok).
  - Tüm gramaj gösterimleri `sayı\u00A0g` biçimindedir.
  - `node scripts/scan-ai-text.mjs` çıktısı regresyonsuz `OVERALL: PASS` (çıkış kodu `0`).
- **Diff Sınırı:** `≤ 120` satır (`≤ 300` satır)
- **Kanıt:** `node scripts/scan-ai-text.mjs` `PASS` çıktısı ve `tsc --noEmit` temiz.
