# Agent 1 — Tartışma ve Oylama Önerileri (`review/proposals/agent-1.md`)

## Öneri 1: Global Klavye Odak Halkası (`:focus-visible`) ve Erişilebilirlik Onarımı
- **Başlık:** Tüm Etkileşimli Öğelerde Görünür Klavye Odak Halkası Sağlanması
- **Sorun:** `review/final-audit.md` bulgusuna göre `src/index.css` ve `src/styles/tokens.css` içinde `:focus-visible` kuralı bulunmuyor; ayrıca `Header.tsx` ve `ShopPage.tsx` içindeki `focus:outline-none` / `outline-none` sınıfları klavyeyle gezinirken odak göstergesini tamamen gizliyor.
- **Çözüm:** `src/index.css` içine marka tokenları (`--color-deep-blue` ve `--color-ink`) ile yüksek kontrastlı `3px` `:focus-visible` outline kuralı eklemek; `Header.tsx` ve `ShopPage.tsx` içindeki kör `outline-none` kullanımlarını `focus-visible:` uyumlu hale getirmek.
- **Etki:** 5
- **Efor:** S
- **Etkilenen Dosyalar:** `src/index.css`, `src/components/layout/Header.tsx`, `src/pages/ShopPage.tsx`

---

## Öneri 2: Hero Rozeti, Logo Minimum Boyutu ve Marka Sesi Düzeltmeleri
- **Başlık:** Denetimlerde Kalan Logo Boyutu ve Yasaklı Metin İhlallerinin Giderilmesi
- **Sorun:** `review/ui-audit.md` ve `review/content-audit.md` raporlarına göre `HomePage.tsx` hero mühür rozetinde uydurma `"4.9 PUAN ★"` değerlendirme iddiası yer alıyor, `HomePage.tsx` (`w-36`/`sm:w-44` < `180px`) ve `AboutPage.tsx` (`h-8` < `34px`) logoları minimum dijital boyut kuralının altında kalıyor ve `AboutPage.tsx` içinde yasaklı `"keşfet"` kelimesi kullanılıyor.
- **Çözüm:** Hero mühür rozetini gerçek parti bilgisiyle (`TAZE PARTİ / #26-01 / GÜNLÜK`) değiştirmek; `HomePage.tsx` logosunu `w-[180px] sm:w-52`, `AboutPage.tsx` logosunu `h-9` yapmak ve `"Poşetleri Keşfet"` metnini `"Poşetleri Gör"` olarak güncellemek.
- **Etki:** 5
- **Efor:** S
- **Etkilenen Dosyalar:** `src/pages/HomePage.tsx`, `src/pages/AboutPage.tsx`

---

## Öneri 3: "Kendi Poşetini Doldur" (Mix & Match) İnteraktif Paket Oluşturucu
- **Başlık:** 4 Slotlu Kişisel Karışım Poşeti Hazırlama Deneyimi
- **Sorun:** Kullanıcılar şu an yalnızca hazır tekil poşetleri sepete ekleyebiliyor; oysa bir şekerleme markasında farklı dokuları (ör. Ekşi + Kıtır + Çikolatalı + Meyveli) tek bir özel ambalajda birleştirme fikri hem marka eğlencesini hem de sepet başına ürün çeşitliliğini artırır.
- **Çözüm:** Kullanıcıların 24 üründen 4 tanesini seçip zikzak kenarlı boş bir Lüpük poşeti görselinde canlı olarak biriktirebileceği, toplam gramaj/fiyatı anlık görüp tek tıkla özel karışım olarak sepete atabileceği bir `MixBagBuilder` bileşeni ve `/mix` (veya `ShopPage` sekmesi) akışı eklemek.
- **Etki:** 5
- **Efor:** L
- **Etkilenen Dosyalar:** `src/components/packaging/MixBagBuilder.tsx`, `src/store/cartStore.ts`, `src/pages/ShopPage.tsx`, `src/App.tsx`

---

## Öneri 4: Etkileşimli "BURADAN YIRT" Ambalaj Çentiği ve Doku Profili
- **Başlık:** Ürün Detay Ambalajına Yırtma Mikro-Etkileşimi Eklenmesi
- **Sorun:** `ProductDetailPage.tsx` ve `PackCard.tsx` üzerindeki ambalaj detayları ("BURADAN YIRT" çentiği, parti kodu, yarım ton nokta) yalnızca statik dekor olarak kalıyor; ziyaretçi ambalajı açma hissini etkileşimli olarak deneyimleyemiyor.
- **Çözüm:** `ProductDetailPage.tsx` üzerindeki "BURADAN YIRT" şeridine tıklandığında (veya klavyeyle tetiklendiğinde) üst ısı yapıştırma bandının hafifçe aralanıp ürünün doku/tat karakteristiğini (ekşilik, çıtırlık, yumuşaklık gibi katalog özelliklerine dayalı görsel göstergeler) ortaya çıkaran, `prefers-reduced-motion` uyumlu bir ambalaj açma etkileşimi eklemek.
- **Etki:** 4
- **Efor:** M
- **Etkilenen Dosyalar:** `src/pages/ProductDetailPage.tsx`, `src/components/packaging/PackCard.tsx`

---

## Öneri 5: Vendor Chunk Ayrımı ve İlk Ekran Görsel Önceliklendirmesi
- **Başlık:** Ana JS Bundle Boyutunu Küçültme ve LCP Optimizasyonu
- **Sorun:** `review/final-audit.md` raporuna göre sayfa bazlı `lazy()` bölünmesine rağmen ana giriş chunk'ı (`index.js`) `375.81 kB` (gzip `120.88 kB`) boyutuna ulaşıyor ve tüm büyük bağımlılıklar tek giriş paketinde toplanıyor.
- **Çözüm:** `vite.config.ts` içinde `build.rollupOptions.output.manualChunks` ile `framer-motion`, `lucide-react` ve `fuse.js` kütüphanelerini ayrı vendor chunk'lara bölmek ve `HomePage.tsx` hero vitrinindeki ilk 3 ürün görseline `fetchPriority="high"` ekleyerek ilk boyama hızını iyileştirmek.
- **Etki:** 3
- **Efor:** S
- **Etkilenen Dosyalar:** `vite.config.ts`, `src/pages/HomePage.tsx`, `src/components/packaging/PackCard.tsx`
