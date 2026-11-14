# Agent 2 (Marka Kimliği Ajanı) — İyileştirme Önerileri

Aşağıdaki öneriler, `brand/BRAND.md`, `docs/STYLE.md` ve mevcut site uygulaması (`src/`, `public/brand/`) incelenerek hazırlanmıştır.

---

### 1. `logo-main.svg` Alt Etiketinin SVG İzolasyonuna Karşı Vektörleştirilmesi
- **Sorun:** `public/brand/logo-main.svg` içindeki `ŞEKER & ATIŞTIRMALIK` alt etiketi `<text font-family="'DM Mono', monospace">` ile tanımlı. SVG dosyası `<img>` veya `og:image` olarak yüklendiğinde tarayıcı güvenlik izolasyonu nedeniyle sayfadaki Google Fonts (`DM Mono`) SVG içine uygulanmaz ve sistemin varsayılan monospace fontuna (örn. Courier) düşer.
- **Çözüm:** Alt bant metnini `<path>` (vektör kontur) olarak dönüştürmek veya `logo-main.svg` bileşenini inline SVG olarak sunup harici `<img>` kullanımında tutarlı fallback sağlamak.
- **Etki:** 4 / 5
- **Efor:** S
- **Etkilenen Dosyalar:**
  - `public/brand/logo-main.svg`
  - `src/pages/AboutPage.tsx` (kullanılıyorsa)

---

### 2. Kartlarda Gerçek Isı Yapıştırma Zikzak Kesim (Heat-Seal Zigzag Edge)
- **Sorun:** `src/components/packaging/PackCard.tsx` üst kenarında zikzak ambalaj hissi, yuvarlatılmış dikdörtgen içine yerleştirilmiş %20 opaklıklı üçgenlerle verilmiş. Bu durum dış siluette gerçek bir poşet/ambalaj kesimi hissi yaratmıyor.
- **Çözüm:** Kartların ve kampanya fişlerinin üst/alt kenarlarında CSS `clip-path` veya SVG maske ile gerçek dışa taşan `16px × 10px` ısı yapıştırma zikzak kenarı uygulamak; tokenları `src/styles/tokens.css` (`--zigzag-tooth-width`, `--zigzag-tooth-height`) ile doğrudan bağlamak.
- **Etki:** 5 / 5
- **Efor:** M
- **Etkilenen Dosyalar:**
  - `src/components/packaging/PackCard.tsx`
  - `src/styles/tokens.css`
  - `src/index.css`

---

### 3. Ürün Görsellerinde Kategori Rengiyle Halftone / Sticker Çerçeve Entegrasyonu
- **Sorun:** `BRAND.md` Bölüm 4'te tanımlanan 6 kategori ambalaj rengi şu an yalnızca üst ince şerit ve aroma hapında görünüyor. Saf beyaz (`#FFFFFF`) ürün görsellerinin etrafında kategori karakterini güçlendirecek doku/çerçeve eksik kalabiliyor.
- **Çözüm:** `PackCard` görsel alanının arka planına kategori renginde hafif bir `10×10px` yarım ton (halftone) nokta dokusu veya köşe parıltısı eklemek; ürün görseline ise `STYLE.md` Ek #10'a uygun ince beyaz kesim konturu (`drop-shadow`) hissi vererek saf beyaz zeminli görselleri kategori rengiyle bütünleştirmek.
- **Etki:** 4 / 5
- **Efor:** M
- **Etkilenen Dosyalar:**
  - `src/components/packaging/PackCard.tsx`
  - `src/pages/ProductDetailPage.tsx`
  - `src/index.css`

---

### 4. "Dairesel Mühür Rozeti" Bileşeni ve Marka Sesi Güçlendirmesi
- **Sorun:** `STYLE.md` Ek #2'de tanımlanan *Dairesel Mühür Rozeti* ("Günlük Taze Parti" / "4.9 Puan") ile `Footer.tsx` sağ sütunundaki teknik prototip notu arasında marka sesi açısından kopukluk var; teknik not marka kişiliğini zayıflatıyor.
- **Çözüm:** Yeniden kullanılabilir bir `FreshBatchSeal` (dönen dairesel SVG metinli mühür rozeti) bileşeni ekleyip Hero ve `AboutPage`'de sergilemek; `Footer.tsx` sağ sütunundaki notu Lüpük marka sesine uygun (*"Sıcak tezgâh demosu — sepet ve ödeme adımları test amaçlıdır."*) daha samimi bir ifadeye dönüştürmek.
- **Etki:** 3 / 5
- **Efor:** S
- **Etkilenen Dosyalar:**
  - `src/components/packaging/FreshBatchSeal.tsx` (yeni)
  - `src/components/layout/Footer.tsx`
  - `src/pages/HomePage.tsx`
  - `src/pages/AboutPage.tsx`

---

### 5. Global Yüksek Kontrastlı `:focus-visible` Halkası ve İndirim Fiyatı Netliği
- **Sorun:** `Header.tsx` ve bazı interaktif elemanlarda `focus:outline-none` kullanılmış; klavye ile gezinmede erişilebilirlik odak göstergesi kaybolabiliyor. Ayrıca `PackCard` yıldız patlaması rozetinde indirimli ürünlerde (`compareAtPrice`) eski fiyat görünürlüğü güçlendirilebilir.
- **Çözüm:** `src/index.css` içinde tüm etkileşimli öğeler için `--color-deep-blue` (`#1E4DD8`) veya `--color-ink` (`#2B1410`) tabanlı `3px` offsetli `:focus-visible` halkası tanımlamak; `PackCard` fiyat rozeti yanında üstü çizili eski fiyatı `DM Mono` ile net göstermek.
- **Etki:** 4 / 5
- **Efor:** S
- **Etkilenen Dosyalar:**
  - `src/index.css`
  - `src/components/layout/Header.tsx`
  - `src/components/packaging/PackCard.tsx`
