# Agent 3 (Görsel Bulucu) — İyileştirme Önerileri

Aşağıdaki 5 öneri, `public/images/products/` altında üretilen 24 ürün görselinin (`800×800` ve `400×400` WebP) sitedeki sunumunu, performansını, erişilebilirliğini ve görsel tutarlılığını güçlendirmek için hazırlanmıştır.

---

## Öneri 1: `srcSet`, `sizes`, `width/height` ve `decoding="async"` ile Duyarlı Görsel Yükleme
- **Başlık:** Kart ve Detay Görsellerinde `400w` / `800w` `srcSet` Kullanımı
- **Sorun:** `PackCard.tsx` ve `ProductDetailPage.tsx` şu anda yalnızca 800×800 boyutundaki `product.image` dosyasını yüklüyor; `manifest.json` içinde hazır bulunan `-400.webp` küçük görselleri (`thumb`) kullanılmıyor. Ayrıca `<img>` etiketlerinde `width`, `height` ve `decoding="async"` nitelikleri eksik olduğu için CLS riski ve gereksiz bant genişliği tüketimi oluşuyor.
- **Çözüm:** `Product` tipine `thumb?: string` eklenip `PackCard` içinde `src={product.thumb ?? product.image}`, `srcSet={`${thumb} 400w, ${product.image} 800w`}`, `sizes="(max-width: 640px) 45vw, 280px"`, `width={400}`, `height={400}` ve `decoding="async"` tanımlanmalı. `ProductDetailPage` ana görselinde `fetchPriority="high"` ile `800w` kullanılmalı.
- **Etki:** 5
- **Efor:** S
- **Etkilenen Dosyalar:** `src/data/products.d.ts`, `src/data/products.js`, `src/components/packaging/PackCard.tsx`, `src/pages/ProductDetailPage.tsx`

---

## Öneri 2: `mix-blend-mode: multiply` ile Halftone Nokta ve Kategori Zemin Entegrasyonu
- **Başlık:** Saf Beyaz (`#FFFFFF`) Ürün Görsellerini Arka Plan Dokusuyla Bütünleştirme
- **Sorun:** `PackCard.tsx` (satır 111–120) içinde `.halftone-dots` dokusu ürün görselinin arkasına yerleştirilmiş durumda; ancak `#FFFFFF` opak WebP görseller dokuyu tamamen kapattığı için nokta deseni görünmüyor.
- **Çözüm:** Ürün görselleri saf `#FFFFFF` zemine sahip olduğu için `<img>` üzerine `mix-blend-multiply` sınıfı eklenerek beyaz zemin saydamlaştırılabilir. Böylece alttaki `halftone-dots` dokusu veya yumuşak kategori rengi tint'i ürünün ve temas gölgesinin çevresinde temizce görünür. (Çift katmanlı kontrast korunumu için zemin `#FFF8EE` / `#FFFFFF` açık tutulmalıdır.)
- **Etki:** 4
- **Efor:** S
- **Etkilenen Dosyalar:** `src/components/packaging/PackCard.tsx`, `src/pages/ProductDetailPage.tsx`, `src/index.css`

---

## Öneri 3: Manifest Açıklamalarından Zengin `alt` Metinleri (`imageAlt`) Üretimi
- **Başlık:** Erişilebilirlik ve SEO İçin Betimleyici Ürün `alt` Metinleri
- **Sorun:** `PackCard.tsx` ve `ProductDetailPage.tsx` görsel `alt` metni olarak yalnızca `product.name` kullanıyor. Ekran okuyucu kullanıcıları ürünün görseldeki biçimini, rengini ve adet/sunum detayını alamıyor.
- **Çözüm:** `public/images/products/manifest.json` içindeki `description` alanları `products.js` verisine `imageAlt` olarak aktarılmalı; `<img>` etiketlerinde `alt={product.imageAlt ?? product.name}` kullanılmalı. Küçük galeri önizlemelerinde ise bağlama göre `alt={`${product.name} — yakın detay`}` gibi ayırt edici metinler verilmelidir.
- **Etki:** 4
- **Efor:** S
- **Etkilenen Dosyalar:** `public/images/products/manifest.json`, `src/data/products.d.ts`, `src/data/products.js`, `src/components/packaging/PackCard.tsx`, `src/pages/ProductDetailPage.tsx`

---

## Öneri 4: Ürün Detay Galerisi İçin Çoklu Görünüm (Tam Kadraj + Yakın Doku Kırpımı)
- **Başlık:** `ProductDetailPage` Küçük Görsel Şeridinde Gerçek Galeri Çeşitliliği
- **Sorun:** `ProductDetailPage.tsx` (satır 65) `product.gallery` yoksa yalnızca tek bir `[product.image]` gösteriyor; bu nedenle `docs/STYLE.md`'de tanımlanan *"sağ büyük görsel + küçük görsel şeridi"* düzeni çoğu üründe tek karede kalıyor.
- **Çözüm:** Her ürünün detay sayfasında en az 2–3 etkileşimli görünüm sunulmalı: (1) tam ürün kadrajı (`800×800`), (2) `object-cover scale-150` ile şeker/çikolata dokusunu vurgulayan makro detay görünümü, (3) CSS `sticker` kesim konturlu (`drop-shadow` + kalın beyaz çerçeveli) ambalaj önizleme görünümü. Ek görsel üretimi gerekmeden mevcut `800×800` WebP dosyalarından zengin galeri deneyimi elde edilir.
- **Etki:** 4
- **Efor:** M
- **Etkilenen Dosyalar:** `src/pages/ProductDetailPage.tsx`, `src/components/packaging/PackCard.tsx`

---

## Öneri 5: 4 Kategorideki Wikimedia Commons Görsellerinin Kota Açılınca `image-generator` ile Senkronizasyonu ve Atıf Notu
- **Başlık:** Tüm 24 Ürünü Tek Stüdyo Işık Diline Eşitleme ve Geçici CC Atıf Sayfası
- **Sorun:** `sert-seker` ve `jelibon` kategorileri `image-generator` ile tek stüdyo ışığında üretilirken, kota sınırı (`429`) nedeniyle diğer 4 kategori (`cikolata-kapli`, `lolipop-sakiz`, `geleneksel`, `tuzlu-atistirmalik`) Wikimedia Commons + yerel arka plan temizliği ile hazırlandı. Her ne kadar kategori içi yöntem tutarlı olsa da, çapraz kategoriler arasında stüdyo açısı ve speküler ışık farkları bulunuyor. Ayrıca `CC BY` / `CC BY-SA` lisanslı görseller için sitede atıf alanı henüz yok.
- **Çözüm:** Kısa vadede `InfoPage.tsx` (veya `/lisanslar`) altında `manifest.json` kaynaklı görsel lisans/atıf listesi yayınlanmalı; uzun vadede ise API kotası sıfırlandığında kalan 16 görsel aynı `image-generator` prompt şablonuyla yeniden üretilip tek stüdyo ışık diline %100 eşitlenmelidir.
- **Etki:** 5
- **Efor:** M
- **Etkilenen Dosyalar:** `public/images/products/manifest.json`, `src/pages/InfoPage.tsx`, `src/components/layout/Footer.tsx`
