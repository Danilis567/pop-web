# Agent 8 (Arayüz Denetçisi) — Bölüm 5 Önerileri

## Öneri 1: Sahte "4.9 PUAN ★" Rozetinin Kaldırılması
- **Sorun:** `HomePage.tsx` (satır 130–142) sağ hero vitrinindeki dairesel mühür rozetinde `aria-label="Günlük Taze Parti 4.9 Puan"` ve `4.9 PUAN ★` metni yer alıyor. Projede gerçek müşteri oylaması veya yorum verisi bulunmadığı için bu ifade uydurma puan iddiası niteliğinde ve yasak.
- **Çözüm:** Rozet metni gerçek üretim/katalog bilgisiyle değiştirilmeli (ör. `TAZE PARTİ` / `#26-01` / `GÜNLÜK` ve `aria-label="Günlük Taze Parti #26-01"`).
- **Etki:** 5
- **Efor:** S
- **Etkilenen Dosyalar:** `src/pages/HomePage.tsx`

---

## Öneri 2: Logo Minimum Boyut İhlallerinin Giderilmesi
- **Sorun:** `BRAND.md` §2 kurallarına göre `logo-main.svg` dijitalde en az `180px` genişlikte, `logo-horizontal.svg` ise en az `132px` genişlikte (`34px` yükseklik) kullanılmalıdır. Ancak `HomePage.tsx` (satır 150) `logo-main.svg`'yi `w-36 sm:w-44` (`144px`/`176px`), `AboutPage.tsx` (satır 49) ise `logo-horizontal.svg`'yi `h-8` (`32px` yükseklik / `124px` genişlik) olarak render ediyor.
- **Çözüm:** `HomePage.tsx` içinde `w-[180px] sm:w-52 h-auto`, `AboutPage.tsx` içinde `h-9 w-auto mx-auto` sınıflarına geçilmeli.
- **Etki:** 4
- **Efor:** S
- **Etkilenen Dosyalar:** `src/pages/HomePage.tsx`, `src/pages/AboutPage.tsx`

---

## Öneri 3: Parti Kodu Tutarsızlığının Tek Kaynağa Bağlanması
- **Sorun:** `HomePage.tsx` (satır 86, 387) `PARTİ #26-01` kodunu gösterirken, `Footer.tsx` (satır 21) `PARTİ #24-08` kodunu gösteriyor. Aynı sitede farklı güncel parti kodları yer alması marka şeffaflığını zedeliyor.
- **Çözüm:** Güncel parti kodunu tek bir sabitten (ör. `src/lib/catalog.ts` veya `src/data/brand.ts` içinde `CURRENT_BATCH = 'PARTİ #26-01'`) çekip `HomePage.tsx` ve `Footer.tsx` arasında eşitlemek.
- **Etki:** 3
- **Efor:** S
- **Etkilenen Dosyalar:** `src/pages/HomePage.tsx`, `src/components/layout/Footer.tsx`, `src/lib/catalog.ts`

---

## Öneri 4: Ürün İçindekiler ve Alerjen Verilerinin Doldurulması
- **Sorun:** `src/data/products.js` içindeki tüm ürünlerde `ingredients: null` ve `allergens: null` olduğu için `ProductDetailPage.tsx` üzerindeki hem `"Ambalaj & Besin Etiketi"` panelinde hem de akordeonlarda sürekli `"Bilgi eklenecek"` fallback metni görünüyor. Bu durum `BRAND.md` §7'deki *"İçindekileri net söyle"* şeffaflık kuralını pratikte eksik bırakıyor.
- **Çözüm:** Katalogdaki 24 ürün için kategori ve aromasına uygun temel içindekiler ve alerjen listelerinin (ör. fındık, badem, süt, glüten uyarıları) `src/data/products.js` içine eklenmesi.
- **Etki:** 4
- **Efor:** M
- **Etkilenen Dosyalar:** `src/data/products.js`, `src/pages/ProductDetailPage.tsx`

---

## Öneri 5: Küçük Kartlarda `-400.webp` Thumbnail Kullanımı ve Zikzak Token Uyumu
- **Sorun:** `public/images/products/` altında tüm ürünler için `-400.webp` küçük görseller üretilmiş olmasına rağmen `PackCard.tsx` ve `HomePage.tsx` küçük kartlarda doğrudan `800×800` ana görseli yüklüyor. Ayrıca `PackCard.tsx` (satır 36–50) zikzak SVG'si `tokens.css`'deki `--zigzag-tooth-width: 16px` / `--zigzag-tooth-height: 10px` değerlerini doğrudan kullanmıyor.
- **Çözüm:** Kart ve hero önizlemelerinde `srcSet` veya `-400.webp` thumbnail desteği eklemek; zikzak kenarı `--zigzag-tooth-*` CSS tokenlarına bağlamak.
- **Etki:** 3
- **Efor:** M
- **Etkilenen Dosyalar:** `src/components/packaging/PackCard.tsx`, `src/pages/HomePage.tsx`, `src/pages/ProductDetailPage.tsx`
