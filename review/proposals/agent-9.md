# Agent 9 — Geliştirme Önerileri (Tartışma ve Oylama)

## Öneri 1: Global `:focus-visible` Odak Halkası ve `outline-none` Temizliği
- **Sorun:** `src/index.css` ve `src/styles/tokens.css` içinde `:focus-visible` kuralı tanımlı değil; ayrıca `Header.tsx` (satır 38, 109) ve `ShopPage.tsx` (satır 115, 139, 140, 168) içinde alternatif odak göstergesi olmadan `focus:outline-none` / `outline-none` kullanıldığı için klavyeyle gezinen kullanıcılar odak konumunu göremiyor.
- **Çözüm:** `src/index.css` içine marka paletiyle uyumlu global `:focus-visible` kuralı (ör. `outline: 3px solid var(--color-deep-blue); outline-offset: 2px;`) eklemek ve `Header.tsx` ile `ShopPage.tsx` içindeki çıplak `outline-none` sınıflarını `focus-visible` halkasını koruyacak şekilde güncellemek.
- **Etki:** 5
- **Efor:** S
- **Etkilenen Dosyalar:** `src/index.css`, `src/components/layout/Header.tsx`, `src/pages/ShopPage.tsx`

---

## Öneri 2: 360px Mobilde Hero Vitrin Kartları (`HERO_SHOWCASE`) Yerleşiminin Rahatlatılması
- **Sorun:** `src/pages/HomePage.tsx` (satır 157) içinde hero vitrin kartları `grid grid-cols-3 gap-3` ile sabit 3 sütun olarak dizilmiş durumda. 360px ekran genişliğinde kart başına düşen genişlik ~85px'e kadar daralıyor ve etiket/görsel alanı sıkışıyor.
- **Çözüm:** Küçük ekranlarda (`< 480px`) kartların daha rahat nefes alması için `gap-2 sm:gap-3` ve kart içi padding/tipografi ölçeğinin (`text-[10px] sm:text-xs`) dar ekranlara göre optimize edilmesi veya `grid-cols-1 min-[380px]:grid-cols-3` gibi esnek bir kırılım uygulanması.
- **Etki:** 3
- **Efor:** S
- **Etkilenen Dosyalar:** `src/pages/HomePage.tsx`

---

## Öneri 3: Başlangıç Bundle Boyutunu Küçültmek İçin `manualChunks` Yapılandırması
- **Sorun:** `npm run build` çıktısında ana giriş chunk'ı `dist/assets/index-CFjJh-NX.js` `375.81 kB` (gzip `120.88 kB`) boyutunda. Sayfalar `lazy()` ile ayrılmış olsa da `react`, `react-dom`, `framer-motion` ve `lucide-react` gibi çekirdek bağımlılıklar tek ana pakette toplanıyor.
- **Çözüm:** `vite.config.ts` içinde `build.rollupOptions.output.manualChunks` ile `react-vendor` (`react`, `react-dom`, `react-router-dom`) ve `motion-vendor` (`framer-motion`) chunk'larını ayırarak önbellek verimliliğini ve ilk yükleme paralel indirmesini iyileştirmek.
- **Etki:** 3
- **Efor:** S
- **Etkilenen Dosyalar:** `vite.config.ts`

---

## Öneri 4: Ürün Detayında "Bilgi eklenecek" Yerine Şeffaf Demo Etiketi veya Temel Alerjen Uyarısı
- **Sorun:** `src/data/products.js` içinde 24 ürünün tamamında `ingredients: null` ve `allergens: null` olduğu için `ProductDetailPage.tsx` hem besin etiketi tablosunda hem de akordeonlarda `"Bilgi eklenecek"` metnini gösteriyor. Gerçek bir vitrin deneyiminde bu alanların her üründe boş kalması güven hissini azaltabiliyor.
- **Çözüm:** Marka kurallarına uygun, uydurma sertifika/sağlık iddiası içermeyen sade bir demo notu (ör. `"Demo katalog ürünü — parti etiketi ambalaj üzerinde yer alır"`) göstermek veya kategori bazlı temel alerjen uyarısı (ör. çikolata drajelerde süt/fındık/badem izi) eklemek.
- **Etki:** 4
- **Efor:** M
- **Etkilenen Dosyalar:** `src/data/products.js`, `src/pages/ProductDetailPage.tsx`
