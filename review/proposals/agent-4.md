# Agent 4 — Ürün İçeriği & Katalog Önerileri (Bölüm 5)

Bu doküman, Lüpük e-ticaret deneyimini ürün içeriği, sepet sezgisi ve marka hikâyesi açısından güçlendirmek için 5 somut öneri içerir.

---

## Öneri 1: "Kendi Poşetini Doldur" (Karışık Seçim Kutusu)
- **Sorun:** Ziyaretçiler farklı kategorilerden (örneğin hem ekşi jelibon hem tuzlu mısır hem çikolatalı draje) denemek istediğinde her biri için tam gramajlı ayrı paket almak zorunda kalıyor; tek pakette çeşit deneme imkânı yok.
- **Çözüm:** 4'lü veya 6'lı mini bölme/karışım seçimi sunan bir "Kendi Poşetini Doldur" sayfası veya çekmecesi eklenebilir. Kullanıcı mevcut 24 ürün arasından dilediği kombinasyonu seçer, özel bir parti kodu (`KARIŞIM #...`) ve paket fiyatı ile tek kalem olarak sepete ekler.
- **Etki:** 5 / 5
- **Efor:** L
- **Etkilenen Dosyalar:** `src/pages/ShopPage.tsx`, `src/store/cartStore.ts`, `src/App.tsx`, `src/components/layout/Header.tsx`

---

## Öneri 2: Tat & Doku Etiketleriyle Hızlı Filtreleme
- **Sorun:** `ShopPage` yalnızca 6 ana kategoriye göre filtreleme yapıyor. Kullanıcı "ekşi bir şey" ya da "çıtır atıştırmalık" aradığında `sert-seker`, `jelibon` ve `tuzlu-atistirmalik` kategorilerini tek tek gezmek zorunda kalıyor.
- **Çözüm:** `src/data/products.js` içindeki `tags` ve `flavors` verilerinden yararlanılarak mağaza üstüne ikincil hızlı filtre hapları (`Ekşi`, `Çıtır`, `Yumuşak`, `Çikolatalı`, `Ferah`) eklenebilir.
- **Etki:** 4 / 5
- **Efor:** S
- **Etkilenen Dosyalar:** `src/pages/ShopPage.tsx`, `src/lib/catalog.ts`, `src/data/products.js`

---

## Öneri 3: Gerçek Reçete Geldiğinde Yapılandırılmış Alerjen & İçindekiler Rozeti
- **Sorun:** `src/data/products.js` içinde `ingredients` ve `allergens` alanları veri uydurmamak için şu an `null` bırakılmıştır (`ProductDetailPage.tsx` varsayılan olarak `"Bilgi eklenecek"` göstermektedir). Gerçek reçeteler girildiğinde alerjenlerin düz metin içinde kaybolma riski vardır.
- **Çözüm:** Gerçek üretim verileri eklendiğinde `ProductDetailPage.tsx` içindeki alerjen akordeonuna ek olarak, ürün kartı veya fiyat altı alanında `Fındık / Süt / Susam / Gluten` gibi alerjenleri yüksek kontrastlı `DM Mono` uyarı kutucuğu olarak öne çıkaran bir bileşen hazırlanabilir.
- **Etki:** 4 / 5
- **Efor:** S
- **Etkilenen Dosyalar:** `src/pages/ProductDetailPage.tsx`, `src/data/products.js`, `src/data/products.d.ts`

---

## Öneri 4: Sipariş Fişine Kısa Hediye / Masa Notu Ekleme
- **Sorun:** Şekerleme ve lokum kategorileri sıklıkla hediye veya ofis/arkadaş buluşması için alınır, ancak `CartDrawer` ve `CheckoutPage` içinde alıcıya özel kısa bir not bırakma alanı bulunmuyor.
- **Çözüm:** `cartStore` ve `CheckoutPage` içine en fazla 120 karakterlik bir "Poşet Üstü Not" alanı eklenip, sipariş özetinde `DM Mono` yazı tipiyle küçük bir kasa fişi çıktısı gibi gösterilebilir.
- **Etki:** 3 / 5
- **Efor:** S
- **Etkilenen Dosyalar:** `src/store/cartStore.ts`, `src/pages/CheckoutPage.tsx`, `src/components/packaging/CartDrawer.tsx`

---

## Öneri 5: Çoklu Paket / Paylaşım Boyu Seçeneği
- **Sorun:** Her ürün şu an tek bir sabit gramajla (`120g`–`200g`) listeleniyor. Tekrar sipariş veren kullanıcılar veya kalabalık gruplar için büyük boy veya çoklu poşet seçeneği yok.
- **Çözüm:** `Product` şemasına opsiyonel `packSizes` (ör. `Tekli Poşet` ve `3'lü Paylaşım Seti`) desteği eklenip `ProductDetailPage.tsx` üzerinden seçilebilir hâle getirilebilir; fiyatlar gerçek maliyetler netleştiğinde güncellenir.
- **Etki:** 3 / 5
- **Efor:** M
- **Etkilenen Dosyalar:** `src/data/products.d.ts`, `src/data/products.js`, `src/pages/ProductDetailPage.tsx`, `src/store/cartStore.ts`
