# Agent 6 — Arayüz Yerleşimi ve Mimari İyileştirme Önerileri

> **Aşama:** Bölüm 5 — Tartışma ve Oylama  
> **Hazırlayan:** Agent 6 (Arayüz Yerleşimi Ajanı)

---

## Öneri 1: Opsiyonel "Kendi Poşetini Doldur" (`/mix`) Etkileşimli Karışım Sayfası

- **Başlık:** 4–6 Bölmeli "Kendi Poşetini Doldur" (`/mix`) Deneyimi
- **Sorun:** Kullanıcılar birden fazla kategorideki şekerleme ve atıştırmalıkları tek bir hediye/deneme poşetinde birleştirmek istediğinde her ürünü ayrı poşet olarak sepete atmak zorunda kalıyor.
- **Çözüm:** `docs/LAYOUT.md` ve `src/store/cartStore.ts` içinde hazırlanan genişleme noktası (`isCustomMix`, `mixItems`) kullanılarak `/mix` rotası açılır. Kullanıcı 4 veya 6 bölmeli bir poşet tepsisine 50g'lık porsiyonlar ekleyip çıkarır; tamamlanan karışım tek bir özel `CartItem` olarak sepete eklenir ve `Header` menüsüne "Poşetini Doldur" hap bağlantısı eklenir.
- **Etki:** 5
- **Efor:** M
- **Etkilenen Dosyalar:** `src/App.tsx`, `src/pages/MixBuilderPage.tsx`, `src/components/layout/Header.tsx`, `src/store/cartStore.ts`, `src/components/packaging/CartDrawer.tsx`

---

## Öneri 2: Erişilebilirlik (a11y) — Odak Halkası, Skip-to-Content ve Hareket Azaltma (`prefers-reduced-motion`)

- **Başlık:** Klavye Gezinmesi, Görünür Focus Ring ve `prefers-reduced-motion` Desteği
- **Sorun:** `PackCard`, `Header` hap butonları ve `RetroDialog` etkileşimli öğelerinde özel klavye odak halkası (`focus-visible`) henüz standartlaştırılmamıştır; ayrıca `TickerStrip` sonsuz kaydırma animasyonu hareket hassasiyeti olan kullanıcılar için duraklatılmamaktadır.
- **Çözüm:** `src/index.css` içine `SiteLayout` başında "İçeriğe Atla" (`Skip to content`) bağlantısı, tüm etkileşimli elemanlar için yüksek kontrastlı `3px solid #1E4DD8` (`focus-visible`) odak halkası ve `@media (prefers-reduced-motion: reduce)` kuralıyla `.animate-ticker` animasyonunu durduran erişilebilirlik katmanı eklenir.
- **Etki:** 4
- **Efor:** S
- **Etkilenen Dosyalar:** `src/index.css`, `src/components/layout/SiteLayout.tsx`, `src/components/packaging/TickerStrip.tsx`

---

## Öneri 3: Favoriler / Beğenilen Poşetler Görünümü veya Hızlı Filtre

- **Başlık:** Mağaza Sayfasında "Favorilerim" Hızlı Filtre Hapı
- **Sorun:** `PackCard` ve `ProductDetailPage` üzerinde kalp ikonu ile favori listesi (`favorites` in `cartStore.ts`) `localStorage` içinde tutuluyor; ancak kullanıcının beğendiği ürünleri toplu görebileceği bir filtre veya görünüm henüz yok.
- **Çözüm:** `ShopPage.tsx` kategori haplarının yanına canlı sayaçlı `♥ Favorilerim (N)` filtre hapı eklenir. Tıklandığında yalnızca kullanıcının favorilediği poşetler listelenir.
- **Etki:** 4
- **Efor:** S
- **Etkilenen Dosyalar:** `src/pages/ShopPage.tsx`, `src/store/cartStore.ts`

---

## Öneri 4: Embla Karusel Klavye/Dokunmatik Geri Bildirimi ve Kategori Görsel Mühürleri

- **Başlık:** Ana Sayfa Karuselinde Nokta/Klavye Navigasyonu ve Kategori Rozet Mühürleri
- **Sorun:** `HomePage.tsx` üzerindeki Embla karuselinde yalnızca sol/sağ oklar ve ilerleme çubuğu bulunuyor; klavye ok tuşlarıyla kaydırma ve mobil kullanıcılar için aktif slayt göstergesi iyileştirilebilir.
- **Çözüm:** Karusel kapsayıcısına `tabIndex={0}` ile sol/sağ ok tuşu desteği eklenir ve `STYLE.md` eklerindeki dairesel mühür rozeti hero alanına entegre edilir.
- **Etki:** 3
- **Efor:** S
- **Etkilenen Dosyalar:** `src/pages/HomePage.tsx`

---

## Öneri 5: Sepet Çekmecesinde Ücretsiz Kargo / Hediye Eşiği İlerleme Çubuğu

- **Başlık:** `CartDrawer` İçinde Canlı Kargo / Sürpriz Şeker Eşiği Çubuğu
- **Sorun:** Kullanıcı sepet çekmecesini açtığında yalnızca ara toplamı görüyor; sepet değerini artırmaya teşvik eden görsel bir eşik göstergesi yok.
- **Çözüm:** `CartDrawer.tsx` üst kısmına (ör. 350₺ demo sınırı için) kalan tutarı gösteren neşeli bir ilerleme çubuğu eklenir ("Ücretsiz demo kargo için 100₺ kaldı!" / "Tamam, kargo bizden!").
- **Etki:** 3
- **Efor:** S
- **Etkilenen Dosyalar:** `src/components/packaging/CartDrawer.tsx`, `src/pages/CartPage.tsx`
