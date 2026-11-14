# Agent 7 — İyileştirme ve Geliştirme Önerileri (`review/proposals/agent-7.md`)

Arayüz doldurma ve bileşen geliştirme sürecinde gözlemlenen iyileştirme fırsatları aşağıda özetlenmiştir.

---

### Öneri 1: "Kendi Poşetini Doldur" Oluşturucu (`/mix`)
- **Sorun:** Şekerleme alışverişinin en keyifli deneyimlerinden biri farklı tatları tek poşette karıştırmaktır; ancak şu an kullanıcı yalnızca sabit 24 hazır poşet arasından seçim yapabiliyor.
- **Çözüm:** [LAYOUT.md](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/docs/LAYOUT.md) Bölüm 4'te [cartStore.ts](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/src/store/cartStore.ts) içinde yeri ayrılan `isCustomMix` ve `mixItems` alanlarını kullanarak `/mix` rotasını hayata geçirmek. Kullanıcı 4–6 bölmeli bir poşet tepsisine 50g'lık porsiyonlar ekleyip tek özel poşet olarak sepete atabilir.
- **Etki:** 5
- **Efor:** M
- **Etkilenen Dosyalar:** `src/App.tsx`, `src/pages/MixBuilderPage.tsx` (yeni), `src/store/cartStore.ts`, `src/components/layout/Header.tsx`

---

### Öneri 2: Kart ve Sepetlerde `-400.webp` / `srcSet` Optimizasyonu
- **Sorun:** `public/images/products/` altında tüm ürünlerin `-400.webp` küçük boyutlu sürümleri hazır bulunmasına rağmen [PackCard.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/src/components/packaging/PackCard.tsx), [CartDrawer.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/src/components/packaging/CartDrawer.tsx) ve [CartPage.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/src/pages/CartPage.tsx) tam boyutlu `.webp` dosyalarını yüklüyor.
- **Çözüm:** Kart ve sepet küçük görsellerinde `-400.webp` sürümünü (veya `srcSet` ile `400w / 1000w` seçimini) kullanmak; ürün detay sayfasındaki büyük görselde tam çözünürlüklü `.webp` dosyasını korumak.
- **Etki:** 4
- **Efor:** S
- **Etkilenen Dosyalar:** `src/components/packaging/PackCard.tsx`, `src/components/packaging/CartDrawer.tsx`, `src/pages/CartPage.tsx`

---

### Öneri 3: Favorilerim Filtresi ve Üst Menü Rozeti
- **Sorun:** [cartStore.ts](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/src/store/cartStore.ts) kullanıcının favori ürünlerini (`favorites: string[]`) `localStorage` üzerinde kalıcı olarak tutuyor, ancak kullanıcının favorilediği ürünleri topluca görebileceği bir filtre veya görünüm yok.
- **Çözüm:** [ShopPage.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/src/pages/ShopPage.tsx) filtre çubuğuna `"Sadece Favorilerim"` hap düğmesi ve [Header.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/src/components/layout/Header.tsx) içine favori sayısı rozeti eklemek.
- **Etki:** 4
- **Efor:** S
- **Etkilenen Dosyalar:** `src/pages/ShopPage.tsx`, `src/components/layout/Header.tsx`

---

### Öneri 4: Ambalaj & Besin Etiketi Verilerinin Tamamlanması
- **Sorun:** [products.js](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/src/data/products.js) içindeki 24 ürünün tamamında `ingredients: null` ve `allergens: null` olduğu için [ProductDetailPage.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/src/pages/ProductDetailPage.tsx) üzerindeki `"Ambalaj & Besin Etiketi"` panelinde tüm ürünlerde `"Bilgi eklenecek"` yazıyor.
- **Çözüm:** Her ürünün gerçekçi içindekiler ve alerjen bilgisini (ör. fındık, süt, soya lesitini, susam vb.) `products.js` içine işleyerek şeffaf ambalaj vaadini tamamlamak.
- **Etki:** 4
- **Efor:** S
- **Etkilenen Dosyalar:** `src/data/products.js`

---

### Öneri 5: Klavye Odağı (`focus-visible`) & Kategori Kartı Ses/Titreşim Geri Bildirimi
- **Sorun:** Bazı özel hap düğmelerde ve arama/filtre girdilerinde `focus:outline-none` kullanıldığı için klavyeyle gezinen kullanıcılarda odak halkası yeterince belirgin değil.
- **Çözüm:** [index.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/src/index.css) içinde tüm etkileşimli öğeler için marka rengi `--color-deep-blue` (`#1E4DD8`) ile `2px` offsetli net bir `:focus-visible` kuralı tanımlamak.
- **Etki:** 3
- **Efor:** S
- **Etkilenen Dosyalar:** `src/index.css`
