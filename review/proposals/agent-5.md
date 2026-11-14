# Bölüm 5 — Öneriler (Agent 5: İçerik Denetçisi)

Aşağıdaki 5 öneri; [BRAND.md](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/brand/BRAND.md) Bölüm 7 marka sesi kuralları, `src/data/products.js` katalog verisi ve `src/` içindeki sayfa metinlerinin denetimi sonucunda hazırlanmıştır.

---

## Öneri 1: `npm run audit:content` İçerik Denetim Betiğinin Projeye Eklenmesi
- **Başlık:** Marka Sesi ve İçerik Kuralları İçin Otomatik Denetim Betiği
- **Sorun:** `BRAND.md` Bölüm 7'deki yasak klişeler, `subtitle <= 90` karakter sınırı, `ingredients`/`allergens` kontrolü ve fiyat tutarlılığı kuralları şu an yalnızca tek seferlik manuel tarama ile kontrol edildi. Yeni ürün veya sayfa eklendiğinde klişe ifadelerin (ör. daha önce `AboutPage.tsx`'te yakalanan `"keşfet"`) tekrar sızma riski var.
- **Çözüm:** `scripts/content-audit.mjs` dosyasını repoya ekleyip `package.json` içine `"audit:content": "node scripts/content-audit.mjs"` script'i tanımlamak; build veya PR öncesi otomatik çalıştırmak.
- **Etki:** `4`
- **Efor:** `S`
- **Etkilenen Dosyalar:** `package.json`, `scripts/content-audit.mjs` *(yeni)*

---

## Öneri 2: `ProductDetailPage` ve `InfoPage` Arasındaki İçindekiler/Alerjen Metin Tutarsızlığının Giderilmesi
- **Başlık:** Alerjen ve İçindekiler Alanlarında Şeffaf Durum Metni
- **Sorun:** `InfoPage.tsx` (satır 28) SSS cevabında her ürünün detay sayfasında *"güncel parti verisi yer alır"* deniliyor; ancak `src/data/products.js` içindeki 24 ürünün tamamında `ingredients: null` ve `allergens: null` olduğu için `ProductDetailPage.tsx` (satır 70, 74) `"Bilgi eklenecek"` metnini gösteriyor.
- **Çözüm:** Gerçek parti reçeteleri girilene kadar `ProductDetailPage.tsx` içinde `"Bilgi eklenecek"` yerine `"Üretim reçetesi ve alerjen tablosu lansman öncesi eklenecektir."` gibi marka sesine uygun, net bir ifade kullanmak veya `InfoPage.tsx` SSS metnini mevcut demo durumuyla uyumlu hâle getirmek.
- **Etki:** `5`
- **Efor:** `S`
- **Etkilenen Dosyalar:** `src/pages/ProductDetailPage.tsx`, `src/pages/InfoPage.tsx`, `src/data/products.js`

---

## Öneri 3: Demo Modu ve Yer Tutucu Fiyat Bilgisinin Tek Konfigürasyondan Yönetilmesi
- **Başlık:** Merkezi Mağaza/Demo Konfigürasyonu (`siteConfig`)
- **Sorun:** Fiyatların yer tutucu olduğu `src/data/products.js` (satır 1) yorumunda, mağazanın demo vitrin olduğu ise `InfoPage.tsx` (satır 10, 42) ve `CartPage.tsx` (satır 132) içinde dağınık metinlerle yer alıyor. Canlı satışa geçerken bu metinlerin tek tek aranıp temizlenmesi gerekir.
- **Çözüm:** `src/lib/siteConfig.ts` dosyasında `isDemoMode`, `shippingThreshold`, `demoNotice` gibi sabitleri toplayıp tüm sayfalarda buradan beslemek.
- **Etki:** `4`
- **Efor:** `M`
- **Etkilenen Dosyalar:** `src/lib/siteConfig.ts` *(yeni)*, `src/pages/InfoPage.tsx`, `src/pages/CartPage.tsx`, `src/pages/CheckoutPage.tsx`

---

## Öneri 4: Mağazada Doku & Tat Odaklı Hızlı Filtre Çipleri
- **Başlık:** `tags` Alanı Üzerinden Doku ve Tat Filtreleme (`ekşi`, `kıtır`, `sert`, `yumuşak`)
- **Sorun:** `BRAND.md` Bölüm 7'nin ilk kuralı *"Doku ve Tatla Konuş"* diyor ve `products.js` içindeki 24 üründe bu etiketler (`ekşi`, `kıtır`, `çıtır`, `sert şeker`, `yumuşak şeker`) zaten tanımlı; ancak kullanıcı mağazada yalnızca kategoriye göre filtreleme yapabiliyor, doğrudan *"Ekşi"* veya *"Kıtır"* ürünleri tek tıkla süzemiyor.
- **Çözüm:** `ShopPage.tsx` filtre çubuğuna `products.js` etiketlerinden türetilen 4–5 adet doku/tat çipi (`Ekşi`, `Kıtır & Çıtır`, `Sert Şeker`, `Yumuşak`) eklemek.
- **Etki:** `4`
- **Efor:** `M`
- **Etkilenen Dosyalar:** `src/pages/ShopPage.tsx`, `src/lib/catalog.ts`, `src/data/products.js`

---

## Öneri 5: Parti Kodu (`batchCode`) ve Saklama Rehberi Şeffaflık Bloğu
- **Başlık:** Parti Kodları (`PARTİ #26-01`..`#26-24`) İçin Kısa Açıklama Kartı
- **Sorun:** Her üründe `PARTİ #26-01` formatında parti kodu ve `storage` saklama talimatı bulunuyor, ancak kullanıcı bu parti kodunun ne anlama geldiğini (üretim partisi takibi) yalnızca `AboutPage.tsx` içindeki genel cümleden anlayabiliyor.
- **Çözüm:** `InfoPage.tsx` veya `ProductDetailPage.tsx` akordeonunda *"Parti Kodu Nedir?"* başlıklı 2 cümlelik kısa bir açıklama ekleyerek markanın *"Gerçekçi ve Şeffaf Ol"* (Bölüm 7, Kural 4) ilkesini güçlendirmek.
- **Etki:** `3`
- **Efor:** `S`
- **Etkilenen Dosyalar:** `src/pages/InfoPage.tsx`, `src/pages/ProductDetailPage.tsx`
