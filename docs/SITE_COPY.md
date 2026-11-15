# Lüpük — Metin ve Görsel Haritası (`SITE_COPY.md`)

> **Kaynak Doğrulama:** Bu doküman yalnızca `src/content/copy.ts`, `src/`, `src/data/products.js`, `index.html`, `public/`, `public/images/products/manifest.json` ve `scripts/scan-ai-text.mjs` çıktısı okunarak güncel koddan yeniden üretilmiştir. Marka sesi karşılaştırması için yalnızca `brand/BRAND.md` referans alınmıştır.
> **Dil:** Kodda yalnızca Türkçe (`tr`) arayüz metinleri yer alır; ikinci bir dil dosyası veya çeviri tablosu yoktur.

---

## 1. Tüm Görünen Metinler (Sayfa → Bölüm → Öğe)

### 1.1 Ortak Düzen (`SiteLayout`, `App`, `Header`, `Footer`, `CartDrawer`)

| Anahtar (`COPY.*`) | Tür | Bileşen (dosya) | Metin (TR) | Karakter Sayısı |
| :--- | :--- | :--- | :--- | :---: |
| `common.skipToContent` | erişilebilirlik linki | `src/components/layout/SiteLayout.tsx` | `İçeriğe atla` | 12 |
| `common.loading` | durum | `src/App.tsx` | `Yükleniyor...` | 13 |
| `header.navLinks.shop` | link | `src/components/layout/Header.tsx` | `Mağaza` | 6 |
| `header.navLinks.mix` | link | `src/components/layout/Header.tsx` | `Poşet Doldur` | 12 |
| `header.navLinks.about` | link | `src/components/layout/Header.tsx` | `Hakkımızda` | 10 |
| `header.navLinks.info` | link | `src/components/layout/Header.tsx` | `Sık Sorulanlar` | 14 |
| `header.searchButton` | buton | `src/components/layout/Header.tsx` | `Ara` | 3 |
| `header.searchModalTitle` | başlık | `src/components/layout/Header.tsx` | `Ürün Ara` | 8 |
| `header.searchPlaceholder` | placeholder | `src/components/layout/Header.tsx` | `Örn: ekşi vişne, jelibon, karamel...` | 36 |
| `header.searchSubmit` | buton | `src/components/layout/Header.tsx` | `Ara` | 3 |
| `header.emptyCatalog` | durum | `src/components/layout/Header.tsx` | `Ürün kataloğu yüklenmeyi bekliyor.` | 35 |
| `header.noResults` | durum | `src/components/layout/Header.tsx` | `“{query}” için eşleşen ürün bulunamadı.` | 39 *(dinamik)* |
| `footer.description` | gövde | `src/components/layout/Footer.tsx` | `6 ambalaj renginde 24 çeşit şekerleme ve atıştırmalık.` | 54 |
| `site.batchCode` | etiket | `src/components/layout/Footer.tsx` | `PARTİ #26-01` | 12 |
| `footer.categoriesTitle` | H3 | `src/components/layout/Footer.tsx` | `Kategoriler` | 11 |
| `footer.pagesTitle` | H3 | `src/components/layout/Footer.tsx` | `Sayfalar` | 8 |
| `footer.pages.allProducts` | link | `src/components/layout/Footer.tsx` | `Tüm Ürünler` | 11 |
| `footer.pages.about` | link | `src/components/layout/Footer.tsx` | `Hakkımızda` | 10 |
| `footer.pages.info` | link | `src/components/layout/Footer.tsx` | `Teslimat ve SSS` | 15 |
| `footer.pages.cart` | link | `src/components/layout/Footer.tsx` | `Sepetim` | 7 |
| `footer.pages.credits` | link | `src/components/layout/Footer.tsx` | `Görsel Kaynakları` | 17 |
| `footer.noteTitle` | H3 | `src/components/layout/Footer.tsx` | `Not` | 3 |
| `site.footerNote` | gövde | `src/components/layout/Footer.tsx` | `Bu site arayüz demosudur; gerçek ödeme ve kargo çıkışı yapılmaz.` | 65 |
| `footer.wordmark` | dekor yazı | `src/components/layout/Footer.tsx` | `lüpük` | 5 |
| `cartDrawer.title` | başlık | `src/components/packaging/CartDrawer.tsx` | `Sepet ({count})` | 8+ |
| `cartDrawer.emptyTitle` | gövde | `src/components/packaging/CartDrawer.tsx` | `Sepetin şu an boş.` | 19 |
| `cartDrawer.emptySubtitle` | gövde | `src/components/packaging/CartDrawer.tsx` | `Mağazadan birkaç poşet seçip sepeti doldurabilirsin.` | 52 |
| `common.goToShop` | link | `src/components/packaging/CartDrawer.tsx` | `Mağazaya Git` | 12 |
| `common.productPlaceholder` | etiket | `src/components/packaging/CartDrawer.tsx` | `ÜRÜN` | 4 |
| `cartDrawer.subtotalLabel` | etiket | `src/components/packaging/CartDrawer.tsx` | `Ara Toplam` | 10 |
| `cartDrawer.goToCart` | link | `src/components/packaging/CartDrawer.tsx` | `Sepete Git` | 10 |
| `cartDrawer.goToCheckout` | link | `src/components/packaging/CartDrawer.tsx` | `Ödemeye Geç` | 11 |
| `cartDrawer.clearCart` | buton | `src/components/packaging/CartDrawer.tsx` | `Sepeti Temizle` | 14 |

### 1.2 Ana Sayfa (`/`) — `src/pages/HomePage.tsx`

| Anahtar (`COPY.*`) | Tür | Bileşen (dosya) | Metin (TR) | Karakter Sayısı |
| :--- | :--- | :--- | :--- | :---: |
| `site.batchCode` + `home.heroBadgeSuffix` | rozet | `src/pages/HomePage.tsx` | `PARTİ #26-01 · 24 ÇEŞİT VİTRİN` | 30 |
| `home.heroTitleStart` + `Highlight` + `End` | H1 | `src/pages/HomePage.tsx` | `Aç, kıtırdat, gülümse.` | 22 |
| `home.heroSubtitle` | gövde | `src/pages/HomePage.tsx` | `Sert şekerler, ekşi jelibonlar, çikolatalar ve tuzlu atıştırmalıklar tek vitrinde.` | 82 |
| `home.heroPrimaryCta` | link | `src/pages/HomePage.tsx` | `Hemen Sipariş Ver` | 17 |
| `home.heroSecondaryCta` | link | `src/pages/HomePage.tsx` | `Hakkımızda` | 10 |
| `home.sealTop` | rozet | `src/pages/HomePage.tsx` | `24 ÇEŞİT` | 8 |
| `home.sealCount` | rozet | `src/pages/HomePage.tsx` | `24` | 2 |
| `home.sealBottom` | rozet | `src/pages/HomePage.tsx` | `LÜPÜK` | 5 |
| `home.heroPackCount` | rozet | `src/pages/HomePage.tsx` | `24 ÇEŞİT POŞET` | 14 |
| `home.heroShowcaseLabels.visneLimon` | etiket | `src/pages/HomePage.tsx` | `VİŞNE LİMON` | 11 |
| `home.heroShowcaseLabels.ormanMeyveli` | etiket | `src/pages/HomePage.tsx` | `ORMAN MEYVELİ` | 13 |
| `home.heroShowcaseLabels.findikliDraje` | etiket | `src/pages/HomePage.tsx` | `FINDIKLI TRÜF` | 13 |
| `ticker.pauseLabel` | buton | `src/components/packaging/TickerStrip.tsx` | `Duraklat` | 8 |
| `ticker.playLabel` | buton | `src/components/packaging/TickerStrip.tsx` | `Oynat` | 5 |
| `ticker.defaultItems[0]` | ticker | `src/components/packaging/TickerStrip.tsx` | `6 AMBALAJ RENGİ` | 15 |
| `ticker.defaultItems[1]` | ticker | `src/components/packaging/TickerStrip.tsx` | `24 ÇEŞİT ŞEKERLEME` | 18 |
| `ticker.defaultItems[2]` | ticker | `src/components/packaging/TickerStrip.tsx` | `SERT ŞEKER VE JELİBON` | 21 |
| `ticker.defaultItems[3]` | ticker | `src/components/packaging/TickerStrip.tsx` | `ÇİKOLATA VE LOKUM` | 17 |
| `ticker.defaultItems[4]` | ticker | `src/components/packaging/TickerStrip.tsx` | `TUZLU KITIR` | 11 |
| `home.categoriesTitle` | H2 | `src/pages/HomePage.tsx` | `Kategorilere Göre Poşetler` | 26 |
| `home.seeAll` | link | `src/pages/HomePage.tsx` | `Tümünü Gör →` | 12 |
| `categoryTabs.allLabel` | sekme | `src/components/packaging/CategoryTabs.tsx` | `Tümü` | 4 |
| `home.emptyCategory` | durum | `src/pages/HomePage.tsx` | `Bu kategoride ürün bulunamadı.` | 30 |
| `home.carouselTitle` | H2 | `src/pages/HomePage.tsx` | `Öne Çıkan Paketler` | 18 |
| `home.carouselMore` | link | `src/pages/HomePage.tsx` | `Daha Fazla →` | 12 |
| `retroDialog.defaultTitle` | pencere başlığı | `src/components/packaging/RetroDialog.tsx` | `sekerleme_onayi.exe` | 19 |
| `retroDialog.defaultQuestion` | soru | `src/components/packaging/RetroDialog.tsx` | `Yeni tatlar denemeye hazır mısın?` | 34 |
| `retroDialog.defaultPrimaryLabel` | buton | `src/components/packaging/RetroDialog.tsx` | `Evet` | 4 |
| `retroDialog.defaultSecondaryLabel` | buton | `src/components/packaging/RetroDialog.tsx` | `Evet, severim` | 13 |
| `retroDialog.choiceReceived` | durum | `src/components/packaging/RetroDialog.tsx` | `Seçimin alındı: “{choice}”` | 18+ |
| `retroDialog.goToShopCta` | link | `src/components/packaging/RetroDialog.tsx` | `Mağazaya Geç →` | 14 |
| `home.stickyNoteBadge` | etiket | `src/pages/HomePage.tsx` | `TEZGÂH NOTU` | 11 |
| `home.stickyNoteText` | gövde | `src/pages/HomePage.tsx` | `24 çeşit şeker ve atıştırmalık tek rafta.` | 41 |
| `home.stickyNoteCta` | link | `src/pages/HomePage.tsx` | `Hakkımızda →` | 12 |

### 1.3 Ürün Kartı (`PackCard`) — `src/components/packaging/PackCard.tsx`

| Anahtar (`COPY.*`) | Tür | Bileşen (dosya) | Metin (TR) | Karakter Sayısı |
| :--- | :--- | :--- | :--- | :---: |
| `common.tearHere` | etiket | `src/components/packaging/PackCard.tsx` | `BURADAN YIRT` | 12 |
| `common.currencyUnit` | etiket | `src/components/packaging/PackCard.tsx` (`formatPrice`) | `TL` (`\u00A0TL` ayrılmaz boşlukla) | 2 |
| `common.netPrefix` | etiket | `src/components/packaging/PackCard.tsx` | `NET {product.netWeight}` | 7–8 |
| `common.outOfStock` | rozet | `src/components/packaging/PackCard.tsx` | `Tükendi` | 7 |
| `common.imagePlaceholder` | yer tutucu | `src/components/packaging/PackCard.tsx` | `GÖRSEL YER TUTUCU` | 17 |
| `common.freshBatchFallback` | etiket | `src/components/packaging/PackCard.tsx` | `PARTİ #26-01` | 12 |

### 1.4 Mağaza Sayfası (`/shop`, `/shop/:category`) — `src/pages/ShopPage.tsx`

| Anahtar (`COPY.*`) | Tür | Bileşen (dosya) | Metin (TR) | Karakter Sayısı |
| :--- | :--- | :--- | :--- | :---: |
| `shop.title` | H1 (varsayılan) | `src/pages/ShopPage.tsx` | `Mağaza Vitrini` | 14 |
| `shop.listedCount` | etiket | `src/pages/ShopPage.tsx` | `{count} Ürün Listeleniyor` | 18+ |
| `shop.searchPlaceholder` | placeholder | `src/pages/ShopPage.tsx` | `Ürün, aroma veya etiket ara...` | 30 |
| `shop.priceRangeLabel` | etiket | `src/pages/ShopPage.tsx` | `FİYAT ARALIĞI` | 13 |
| `shop.sortOptions[0]` | seçenek | `src/pages/ShopPage.tsx` | `Öne Çıkanlar` | 12 |
| `shop.sortOptions[1]` | seçenek | `src/pages/ShopPage.tsx` | `Fiyat: Düşükten Yükseğe` | 23 |
| `shop.sortOptions[2]` | seçenek | `src/pages/ShopPage.tsx` | `Fiyat: Yüksekten Düşüğe` | 23 |
| `shop.sortOptions[3]` | seçenek | `src/pages/ShopPage.tsx` | `İsim: A–Z` | 9 |
| `common.all` | buton | `src/pages/ShopPage.tsx` | `Tümü` | 4 |
| `shop.favoritesLabel` | buton | `src/pages/ShopPage.tsx` | `Favorilerim ({count})` | 14+ |
| `shop.emptyResultsTitle` | durum | `src/pages/ShopPage.tsx` | `Aradığın kriterlere uygun poşet bulunamadı.` | 43 |
| `shop.emptyCatalogTitle` | durum | `src/pages/ShopPage.tsx` | `Ürün kataloğu henüz boş.` | 25 |
| `shop.emptyResultsSubtitle` | durum | `src/pages/ShopPage.tsx` | `Arama kelimesini veya fiyat aralığını temizleyip tekrar deneyebilirsin.` | 70 |
| `shop.emptyCatalogSubtitle` | durum | `src/pages/ShopPage.tsx` | `Şu an vitrinde listelenecek ürün bulunmuyor.` | 43 |
| `shop.resetFilters` | buton | `src/pages/ShopPage.tsx` | `Filtreleri Sıfırla` | 17 |

### 1.5 Kendi Poşetini Doldur (`/mix`) — `src/pages/MixPage.tsx`

| Anahtar (`COPY.*`) | Tür | Bileşen (dosya) | Metin (TR) | Karakter Sayısı |
| :--- | :--- | :--- | :--- | :---: |
| `mix.pageTitle` | H1 | `src/pages/MixPage.tsx` | `Kendi Poşetini Doldur` | 21 |
| `mix.subtitle` | gövde | `src/pages/MixPage.tsx` | `Raftan en az 4, en fazla 6 farklı çeşit seç; tek bir Lüpük poşetinde toplayalım.` | 82 |
| `mix.badge` | rozet | `src/pages/MixPage.tsx` | `4–6 ÇEŞİT · HER BİRİ 50\u00A0g PORSİYON` (`\u00A0g` ayrılmaz boşluk) | 35 |
| `mix.allWithCount` | buton | `src/pages/MixPage.tsx` | `Tümü (20)` | 9 |
| `mix.portionLabel` | etiket | `src/pages/MixPage.tsx` | `50\u00A0g porsiyon` (`\u00A0g` ayrılmaz boşluk) | 12 |
| `mix.imagePlaceholder` | yer tutucu | `src/pages/MixPage.tsx` | `GÖRSEL` | 6 |
| `mix.excludedNote` | not | `src/pages/MixPage.tsx` | `Not: 70–90\u00A0g tekli lolipop ve sakız ürünleri 50\u00A0g poşet karışımına dahil edilmez.` | 82 |
| `mix.trayTitle` | H2 | `src/pages/MixPage.tsx` | `Senin Poşetin` | 13 |
| `mix.reset` | buton | `src/pages/MixPage.tsx` | `Sıfırla` | 7 |
| `mix.slotLabel` | etiket | `src/pages/MixPage.tsx` | `Bölme #{index + 1}` | 8 |
| `mix.required` | etiket | `src/pages/MixPage.tsx` | `Zorunlu` | 7 |
| `mix.optional` | etiket | `src/pages/MixPage.tsx` | `Opsiyonel` | 9 |
| `mix.selectedCountLabel` | etiket | `src/pages/MixPage.tsx` | `Seçilen Çeşit` | 13 |
| `mix.totalWeightLabel` | etiket | `src/pages/MixPage.tsx` | `Toplam Gramaj` | 13 |
| `mix.bagTotalLabel` | etiket | `src/pages/MixPage.tsx` | `Poşet Tutarı` | 12 |
| `mix.addMixToCart` | buton | `src/pages/MixPage.tsx` | `Karışım Poşetini Sepete Ekle` | 28 |
| `mix.minSelectionRemaining` | buton | `src/pages/MixPage.tsx` | `En az 4 çeşit seç ({remaining} kaldı)` | 26–27 |

### 1.6 Ürün Detay Sayfası (`/product/:slug`) — `src/pages/ProductDetailPage.tsx`

| Anahtar (`COPY.*`) | Tür | Bileşen (dosya) | Metin (TR) | Karakter Sayısı |
| :--- | :--- | :--- | :--- | :---: |
| `pdp.notFoundTitle` | H1 | `src/pages/ProductDetailPage.tsx` | `Bu poşet rafta yok.` | 19 |
| `pdp.notFoundDescription` | gövde | `src/pages/ProductDetailPage.tsx` | `Aradığın ürün kaldırılmış ya da henüz kataloğa eklenmemiş olabilir.` | 65 |
| `common.backToShop` | link | `src/pages/ProductDetailPage.tsx` | `Mağazaya Dön` | 12 |
| `common.home` | breadcrumb | `src/pages/ProductDetailPage.tsx` | `Ana Sayfa` | 9 |
| `common.shop` | breadcrumb | `src/pages/ProductDetailPage.tsx` | `Mağaza` | 6 |
| `pdp.flavorLabel` | etiket | `src/pages/ProductDetailPage.tsx` | `Aroma / Seçenek: {selectedFlavor}` | 18+ |
| `pdp.addToCart` | buton | `src/pages/ProductDetailPage.tsx` | `Sepete Ekle` (eklendikten sonra geçici `Eklendi`) | 11 |
| `common.outOfStock` | buton / rozet | `src/pages/ProductDetailPage.tsx` | `Tükendi` | 7 |
| `pdp.nutritionTitle` | başlık | `src/pages/ProductDetailPage.tsx` | `Ürün Etiketi` | 12 |
| `pdp.batchCodeLabel` | etiket | `src/pages/ProductDetailPage.tsx` | `Parti Kodu` | 10 |
| `pdp.flavorStripLabel` | etiket | `src/pages/ProductDetailPage.tsx` | `Aroma Şeridi` | 12 |
| `pdp.ingredientsLabel` | etiket | `src/pages/ProductDetailPage.tsx` | `İçindekiler` | 11 |
| `pdp.allergensLabel` | etiket | `src/pages/ProductDetailPage.tsx` | `Alerjenler` | 10 |
| `common.toBeAdded` | yer tutucu | `src/pages/ProductDetailPage.tsx` | `Bilgi eklenecek` | 15 |
| `pdp.accordionIngredients` | akordeon | `src/pages/ProductDetailPage.tsx` | `İçindekiler` | 11 |
| `pdp.accordionAllergens` | akordeon | `src/pages/ProductDetailPage.tsx` | `Alerjen Bilgisi` | 15 |
| `pdp.accordionStorage` | akordeon | `src/pages/ProductDetailPage.tsx` | `Saklama Bilgisi` | 15 |
| `pdp.defaultStorage` | gövde (yedek) | `src/pages/ProductDetailPage.tsx` | `Saklama bilgisi eklenecek.` | 25 |
| `common.tearHere` | etiket | `src/pages/ProductDetailPage.tsx` | `BURADAN YIRT` | 12 |
| `pdp.imagePlaceholder` | yer tutucu | `src/pages/ProductDetailPage.tsx` | `ÜRÜN GÖRSELİ` | 12 |
| `pdp.relatedTitle` | H2 | `src/pages/ProductDetailPage.tsx` | `Bunlar da hoşuna gidebilir` | 26 |

### 1.7 Sepet (`/cart`) ve Ödeme (`/checkout`)

| Anahtar (`COPY.*`) | Tür | Bileşen (dosya) | Metin (TR) | Karakter Sayısı |
| :--- | :--- | :--- | :--- | :---: |
| `cart.title` | H1 | `src/pages/CartPage.tsx` | `Sepetin ({count})` | 10+ |
| `cart.clearCart` | buton | `src/pages/CartPage.tsx` | `Sepeti Temizle` | 14 |
| `cart.emptyTitle` | gövde | `src/pages/CartPage.tsx` | `Sepetin şu an boş.` | 19 |
| `cart.emptySubtitle` | gövde | `src/pages/CartPage.tsx` | `Mağazaya göz atıp istediğin poşetleri sepete ekleyebilirsin.` | 58 |
| `common.mixContentsLabel` | etiket | `src/pages/CartPage.tsx` | `Poşet içeriği:` | 14 |
| `cart.receiptTitle` | H2 | `src/pages/CartPage.tsx` | `SEPET FİŞİ` | 10 |
| `cart.itemCountLabel` | etiket | `src/pages/CartPage.tsx` | `Ürün Adedi` | 10 |
| `cart.shippingLabel` | etiket | `src/pages/CartPage.tsx` | `Kargo` | 5 |
| `cart.shippingValue` | etiket | `src/pages/CartPage.tsx` | `Kargo çıkışı yok` | 16 |
| `cart.totalLabel` | etiket | `src/pages/CartPage.tsx` | `Toplam` | 6 |
| `cart.checkoutCta` | link | `src/pages/CartPage.tsx` | `Ödemeye Geç` | 11 |
| `checkout.title` | H1 | `src/pages/CheckoutPage.tsx` | `Ödeme (Demo)` | 12 |
| `checkout.warningTitle` + `warningText` | uyarı | `src/pages/CheckoutPage.tsx` | `Demo Ödeme Ekranı: Bu sayfa demo amaçlıdır; gerçek ödeme ve sipariş gönderimi yapılmaz. Kart bilgisi istenmez, yalnızca adres formu doğrulaması gösterilir.` | 158 |
| `checkout.emptyTitle` | gövde | `src/pages/CheckoutPage.tsx` | `Ödeme adımına geçmek için sepetinde ürün olmalı.` | 48 |
| `checkout.formTitle` | H2 | `src/pages/CheckoutPage.tsx` | `Teslimat Adresi` | 15 |
| `checkout.fields.fullName` | label | `src/pages/CheckoutPage.tsx` | `Ad Soyad` | 8 |
| `checkout.fields.email` | label | `src/pages/CheckoutPage.tsx` | `E-posta` | 7 |
| `checkout.fields.phone` | label | `src/pages/CheckoutPage.tsx` | `Telefon` | 7 |
| `checkout.fields.phonePlaceholder` | placeholder | `src/pages/CheckoutPage.tsx` | `05XX XXX XX XX` | 14 |
| `checkout.fields.city` | label | `src/pages/CheckoutPage.tsx` | `Şehir / İlçe` | 12 |
| `checkout.fields.address` | label | `src/pages/CheckoutPage.tsx` | `Açık Adres` | 10 |
| `checkout.submitCta` | buton | `src/pages/CheckoutPage.tsx` | `Demo Siparişi Tamamla` | 21 |
| `checkout.summaryTitle` | H2 | `src/pages/CheckoutPage.tsx` | `SİPARİŞ ÖZETİ` | 13 |
| `checkout.totalLabel` | etiket | `src/pages/CheckoutPage.tsx` | `Toplam` | 6 |
| `checkout.doneBadge` | etiket | `src/pages/CheckoutPage.tsx` | `DEMO SİPARİŞ ALINDI` | 19 |
| `checkout.doneTitle` | H1 | `src/pages/CheckoutPage.tsx` | `Demo siparişin kaydedildi!` | 26 |
| `checkout.doneDescription` | gövde | `src/pages/CheckoutPage.tsx` | `Bu bir demo ödeme akışıdır; gerçek bir tahsilat veya kargo çıkışı yapılmamıştır.` | 82 |

### 1.8 Hakkımızda (`/about`), Teslimat ve SSS (`/info`), Görsel Kaynakları (`/credits`), 404 (`*`)

| Anahtar (`COPY.*`) | Tür | Bileşen (dosya) | Metin (TR) | Karakter Sayısı |
| :--- | :--- | :--- | :--- | :---: |
| `about.titleStart` + `Highlight` + `End` | H1 | `src/pages/AboutPage.tsx` | `Şeker ve atıştırmalık, tek rafta.` | 33 |
| `about.description` | gövde | `src/pages/AboutPage.tsx` | `Lüpük, sert şekerden çikolataya, lokumdan tuzlu kıtırlara 24 çeşidi tek vitrinde toplar. Her ürünün üzerinde gramajı, parti kodu ve aroması açıkça yazar.` | 158 |
| `about.cta` | link | `src/pages/AboutPage.tsx` | `Poşetleri Gör` | 13 |
| `about.showcaseCaption` | gövde | `src/pages/AboutPage.tsx` | `6 renkte 24 çeşit şekerleme.` | 28 |
| `about.codesTitle` | H2 | `src/pages/AboutPage.tsx` | `6 Sabit Ambalaj Rengi` | 21 |
| `about.codesEyebrow` | etiket | `src/pages/AboutPage.tsx` | `AMBALAJ KODLARI` | 15 |
| `info.title` | H1 | `src/pages/InfoPage.tsx` | `Teslimat ve SSS` | 15 |
| `info.subtitle` | gövde | `src/pages/InfoPage.tsx` | `Sipariş, kargo çıkışı ve ürün saklama koşulları hakkında temel bilgiler.` | 72 |
| `info.deliveryEyebrow` | etiket | `src/pages/InfoPage.tsx` | `TESLİMAT` | 8 |
| `info.deliveryTitle` | H2 | `src/pages/InfoPage.tsx` | `Kargo ve Teslimat` | 17 |
| `info.deliveryText` | gövde | `src/pages/InfoPage.tsx` | `Teslimat süreleri ve kargo ücreti netleşince eklenecek.` | 54 |
| `info.returnsEyebrow` | etiket | `src/pages/InfoPage.tsx` | `İADE` | 4 |
| `info.returnsTitle` | H2 | `src/pages/InfoPage.tsx` | `İade ve Değişim` | 15 |
| `info.returnsText` | gövde | `src/pages/InfoPage.tsx` | `İade ve değişim koşulları netleşince eklenecek.` | 46 |
| `info.faqTitle` | H2 | `src/pages/InfoPage.tsx` | `Sıkça Sorulan Sorular` | 21 |
| `info.faqItems[0]` | akordeon | `src/pages/InfoPage.tsx` | `Teslimat süreleri nasıl işliyor?` → `Teslimat süreleri ve kargo ücreti netleşince eklenecek.` | 32 / 54 |
| `info.faqItems[1]` | akordeon | `src/pages/InfoPage.tsx` | `İade ve değişim koşulları nelerdir?` → `İade ve değişim koşulları netleşince eklenecek.` | 35 / 46 |
| `info.faqItems[2]` | akordeon | `src/pages/InfoPage.tsx` | `Şekerlemeleri nasıl saklamalıyım?` → `Her ürünün kendi sayfasındaki "Saklama Bilgisi" panelinden güncel notu görebilirsin.` | 34 / 85 |
| `info.faqItems[3]` | akordeon | `src/pages/InfoPage.tsx` | `Alerjen ve içindekiler bilgisi nerede yazar?` → `Her ürünün detay sayfasındaki "Ürün Etiketi" ve "İçindekiler" panellerinde ürün verisi yer alır; henüz eklenmemiş alanlar için "Bilgi eklenecek" notu gösterilir.` | 44 / 164 |
| `info.creditsCta` | link | `src/pages/InfoPage.tsx` | `Görsel kaynakları ve lisans atıfları →` | 38 |
| `credits.title` | H1 | `src/pages/CreditsPage.tsx` | `Görsel Kaynakları` | 17 |
| `credits.subtitle` | gövde | `src/pages/CreditsPage.tsx` | `Katalogdaki 16 ürün fotoğrafı Wikimedia Commons üzerinden CC0, CC BY ve CC BY-SA lisanslarıyla alınmıştır. Tüm görsellerde arka plan kaldırılmış veya kırpılmış ve 800×800 WebP formatına dönüştürülmüştür.` | 206 |
| `credits.fileLabel` / `authorLabel` / `licenseLabel` / `modificationLabel` | etiketler | `src/pages/CreditsPage.tsx` | `Dosya:`, `Yazar:`, `Lisans:`, `Düzenleme:` | 6 / 6 / 7 / 10 |
| `credits.modificationNote` | değer | `src/pages/CreditsPage.tsx` | `Arka plan kaldırıldı/kırpıldı` | 29 |
| `notFound.title` | H1 | `src/pages/NotFoundPage.tsx` | `Bu poşet boş çıktı!` | 19 |
| `notFound.description` | gövde | `src/pages/NotFoundPage.tsx` | `Aradığın sayfa taşınmış olabilir ya da hiç üretilmemiş olabilir.` | 62 |
| `notFound.homeCta` | link | `src/pages/NotFoundPage.tsx` | `Ana Sayfaya Dön` | 15 |

---

## 2. Koda Gömülü (Hardcoded) ve Erişilebilirlik Metinleri

> Not: Arayüz metinlerinin tamamı `src/content/copy.ts` (`COPY`) içinde merkezîleştirilmiştir. Bileşenlerde yalnızca `COPY` referansları bulunur; SVG dosyalarındaki `aria-label` değerleri ise `public/brand/*.svg` içine gömülüdür.

| Kategori | Bileşen / Dosya | Metin |
| :--- | :--- | :--- |
| `aria-label` | `src/components/layout/Header.tsx` | `Lüpük Ana Sayfa`, `Ana gezinme`, `Ürün ara`, `Aramayı kapat`, `Menüyü aç veya kapat`, `Mobil gezinme` (Favori ve Sepet butonlarında `sr-only`: `Favorilerim (… ürün)`, `Sepeti aç (… ürün)`) |
| `aria-label` | `src/components/packaging/CartDrawer.tsx` | `Sepeti kapat`, `{name} ürününü sil`, `Adet azalt`, `Adet artır` |
| `aria-label` | `src/components/packaging/CategoryTabs.tsx` | `Ürün kategorileri` |
| `aria-label` | `src/components/packaging/PackCard.tsx` | `{product.name}`, `Fiyat: {formattedPrice}`, `{name} ürününü favorilerden çıkar` / `{name} ürününü favorilere ekle`, `{name} ürününü sepete ekle`, `{name} şu an stokta yok` |
| `aria-label` | `src/components/packaging/TickerStrip.tsx` | `Kayan duyuru şeridi`, `Kayan duyuru şeridini duraklat` (`ticker.pauseAria`), `Kayan duyuru şeridini oynat` (`ticker.playAria`) |
| `aria-label` | `src/pages/HomePage.tsx` / `FeaturedCarousel.tsx` | `Lüpük — 24 Çeşit`, `Önceki ürünler`, `Sonraki ürünler` |
| `aria-label` | `src/pages/ShopPage.tsx` | `Ürün ara`, `Fiyat aralığı`, `Sıralama seç` |
| `aria-label` | `src/pages/MixPage.tsx` | `Kategori filtresi`, `Karışım poşeti özeti`, `Seçimi sıfırla`, `{name} ürününü poşetten çıkar` |
| `aria-label` | `src/pages/ProductDetailPage.tsx` | `Sayfa yolu`, `Adet azalt`, `Adet artır`, `{name} ürününü favorilerden çıkar` / `{name} ürününü favorilere ekle`, `Fiyat: {formattedPrice}` (`h2.sr-only`: `Ürün Ayrıntıları`) |
| `aria-label` | `src/pages/CartPage.tsx` | `Adet azalt`, `Adet artır`, `{name} ürününü sil` |
| `aria-label` (SVG) | `public/brand/*.svg` | `Lüpük Yatay Logo`, `Lüpük Şekerleme ve Atıştırmalık Ana Logosu`, `Lüpük Amblem`, `Lüpük Tek Renk Logo` |
| Form Hataları | `src/pages/CheckoutPage.tsx` (`COPY.checkout.errors`) | `Adını ve soyadını en az 2 karakter olarak gir.`, `Geçerli bir e-posta adresi gir.`, `10 veya 11 haneli geçerli bir telefon numarası gir.`, `Şehir / ilçe bilgisini en az 2 karakter olarak gir.`, `Açık adresini en az 10 karakter olarak gir.` |
| Boş Durumlar | `Header`, `CartDrawer`, `ShopPage`, `CartPage`, `CheckoutPage`, `HomePage` | `Ürün kataloğu yüklenmeyi bekliyor.`, `“{query}” için eşleşen ürün bulunamadı.`, `Sepetin şu an boş.`, `Ürün kataloğu henüz boş.`, `Aradığın kriterlere uygun poşet bulunamadı.`, `Bu kategoride ürün bulunamadı.`, `Ödeme adımına geçmek için sepetinde ürün olmalı.` |
| 404 / Bulunamadı | `ProductDetailPage.tsx`, `NotFoundPage.tsx` | `Bu poşet rafta yok.`, `Bu poşet boş çıktı!` |
| Sepet / Karışım İsimlendirme | `src/store/cartStore.ts`, `src/content/copy.ts` | Varsayılan aroma: `'Standart'`; Özel karışım adı: `` `Özel Karışım Poşet (${count} Çeşit)` `` |
| Demo Uyarıları | `copy.ts`, `Footer.tsx`, `CheckoutPage.tsx` | `Bu site arayüz demosudur; gerçek ödeme ve kargo çıkışı yapılmaz.`, `Ödeme (Demo)`, `Demo Ödeme Ekranı: Bu sayfa demo amaçlıdır; gerçek ödeme ve sipariş gönderimi yapılmaz. Kart bilgisi istenmez, yalnızca adres formu doğrulaması gösterilir.`, `DEMO SİPARİŞ ALINDI`, `Demo siparişin kaydedildi!` |

---

## 3. Ürün Envanteri (`src/data/products.js` — 24 Ürün)

> Tüm ürünlerde `inStock: true`, `ingredients: null` ve `allergens: null` durumundadır (`ProductDetailPage.tsx` üzerinde `"Bilgi eklenecek"` olarak gösterilir). `compareAtPrice` alanı **tüm ürünlerden kaldırılmıştır (0/24)**.
> `products.js` içindeki tüm `netWeight` değerleri sayı ile birim arasında ayrılmaz boşluk (`\u00A0g`, örn. `140\u00A0g`) kullanır; tüm fiyatlar `formatPrice()` ile `\u00A0TL` biçiminde gösterilir.
> `PackCard.tsx` içinde ürün görseli kart başlığıyla aynı bağlantıda yer aldığı için dekoratif `alt=""` kullanır (kart `<article aria-label={product.name}>` taşır); `ProductDetailPage.tsx` ise `product.imageAlt || product.name` değerini kullanır.

| id | slug | name | category | price (TL) | compareAtPrice | weight | subtitle (tam metin) | flavor | image | imageAlt (`ProductDetailPage`) | ingredients / allergens |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :--- |
| `lp-01` | `visne-limon-cam-seker` | Vişne Limon Cam Şeker | `sert-seker` | 54 | - | 140g | İki renkli, parlak yüzeyli sert cam şekerler. | `VİŞNE LİMON` | `/images/products/visne-limon-cam-seker.webp` | `Beyaz zeminde kırmızı ve sarı iki renkli beş adet cam sert şeker` | `null` / `null` |
| `lp-02` | `nane-okaliptus-kristal` | Nane Okaliptüs Kristal | `sert-seker` | 48 | - | 120g | Yeşil beyaz çizgili, ferah sert şekerler. | `NANE OKALİPTÜS` | `/images/products/nane-okaliptus-kristal.webp` | `Beyaz zeminde yeşil ve beyaz çizgili beş adet kristal sert şeker` | `null` / `null` |
| `lp-03` | `portakal-dilimi-seker` | Portakal Dilimi Şeker | `sert-seker` | 58 | - | 150g | İri şeker kristalleriyle kaplı turuncu dilimler. | `PORTAKAL DİLİMİ` | `/images/products/portakal-dilimi-seker.webp` | `Beyaz zeminde şeker kristalleriyle kaplı beş adet turuncu portakal dilimi şeker` | `null` / `null` |
| `lp-04` | `tuzlu-karamel-bonbon` | Tuzlu Karamel Bonbon | `sert-seker` | 67 | - | 140g | Üzeri iri deniz tuzu taneli kehribar bonbonlar. | `TUZLU KARAMEL` | `/images/products/tuzlu-karamel-bonbon.webp` | `Beyaz zeminde üzerinde iri deniz tuzu taneleri bulunan kehribar karamel bonbonlar` | `null` / `null` |
| `lp-05` | `eksi-seftali-halka` | Ekşi Şeftali Halka | `jelibon` | 62 | - | 150g | Ekşi şeker kaplı iki renkli yumuşak halkalar. | `EKŞİ ŞEFTALİ` | `/images/products/eksi-seftali-halka.webp` | `Beyaz zeminde sarı ve turuncu renkli ekşi şeker kaplı beş şeftali halkası` | `null` / `null` |
| `lp-06` | `orman-meyveli-ayicik` | Orman Meyveli Ayıcık | `jelibon` | 59 | - | 160g | Kırmızı ve mor tonlarda yarı saydam ayıcık jelibonlar. | `ORMAN MEYVELERİ` | `/images/products/orman-meyveli-ayicik.webp` | `Beyaz zeminde kırmızı, pembe ve mor renklerde yarı saydam jelibon ayıcıklar` | `null` / `null` |
| `lp-07` | `elma-kivi-eksimsi-serit` | Elma Kivi Ekşi Şerit | `jelibon` | 64 | - | 140g | Yeşil ve sarı ekşi şeker kaplı kıvrımlı şeritler. | `ELMA KİVİ` | `/images/products/elma-kivi-eksimsi-serit.webp` | `Beyaz zeminde yeşil ve sarı renklerde ekşi şeker kaplı kıvrımlı jelibon şeritler` | `null` / `null` |
| `lp-08` | `cilek-kremali-yumusak` | Çilek Krema Köpük | `jelibon` | 69 | - | 150g | Üstü parlak kırmızı, altı beyaz yumuşak şekerler. | `ÇİLEK KREMA` | `/images/products/cilek-kremali-yumusak.webp` | `Beyaz zeminde üstü kırmızı çilek jöleli, altı beyaz köpüklü yumuşak şekerler` | `null` / `null` |
| `lp-09` | `findikli-kakao-truf` | Fındıklı Kakao Trüf | `cikolata-kapli` | 118 | - | 150g | Fındık kırıklı ve kakao pudralı yuvarlak çikolata topları. | `FINDIK KAKAO` | `/images/products/findikli-kakao-truf.webp` | `Beyaz zeminde üzeri fındık kırığı ve kakao tozlu yuvarlak çikolata trüfler` | `null` / `null` |
| `lp-10` | `bitter-bademli-pralin` | Bitter Bademli Pralin | `cikolata-kapli` | 128 | - | 160g | Bütün bademli ve kakao kaplı bitter çikolata seçkisi. | `BİTTER BADEM` | `/images/products/bitter-bademli-pralin.webp` | `Beyaz zeminde koyu çikolata kaplı bademli pralin ve çikolata parçaları` | `null` / `null` |
| `lp-11` | `cikolatali-kahve-cekirdegi` | Çikolatalı Kahve Çekirdeği | `cikolata-kapli` | 105 | - | 120g | Parlak çikolata kaplı bütün kavrulmuş kahve çekirdekleri. | `KAHVE ÇİKOLATA` | `/images/products/cikolatali-kahve-cekirdegi.webp` | `Beyaz zeminde cam kasede parlak çikolata kaplı kavrulmuş kahve çekirdekleri` | `null` / `null` |
| `lp-12` | `ahududulu-beyaz-truf` | Ahududulu Beyaz Trüf | `cikolata-kapli` | 112 | - | 130g | Kırmızı ahududu parçalı beyaz çikolata topları. | `AHUDUDU BEYAZ` | `/images/products/ahududulu-beyaz-truf.webp` | `Beyaz zeminde kırmızı ahududu parçaları serpilmiş beyaz çikolata trüf` | `null` / `null` |
| `lp-13` | `gokkusagi-burgu-lolipop` | Gökkuşağı Burgu Lolipop | `lolipop-sakiz` | 45 | - | 85g | Çok renkli spiral desenli büyük çubuk şeker. | `KARIŞIK MEYVE` | `/images/products/gokkusagi-burgu-lolipop.webp` | `Beyaz zeminde gökkuşağı renkli spiral desenli büyük çubuk lolipop` | `null` / `null` |
| `lp-14` | `kalp-visne-lolipop` | Kalp Vişne Lolipop | `lolipop-sakiz` | 42 | - | 70g | Parlak kırmızı, kalp biçimli vişneli lolipop. | `VİŞNE` | `/images/products/kalp-visne-lolipop.webp` | `Beyaz zeminde parlak kırmızı kalp şeklinde vişneli çubuk lolipop` | `null` / `null` |
| `lp-15` | `kirmizi-beyaz-burgu-lolipop` | Kırmızı Beyaz Spiral Lolipop | `lolipop-sakiz` | 46 | - | 80g | Kırmızı beyaz spiral desenli yuvarlak lolipop. | `ÇİLEK VANİLYA` | `/images/products/kirmizi-beyaz-burgu-lolipop.webp` | `Beyaz zeminde kırmızı ve beyaz spiral desenli yuvarlak çubuk lolipop` | `null` / `null` |
| `lp-16` | `beyaz-draje-sakiz` | Beyaz Draje Sakız | `lolipop-sakiz` | 39 | - | 90g | Yastık biçimli, parlak beyaz kaplamalı sakızlar. | `MEYVELİ SAKIZ` | `/images/products/beyaz-draje-sakiz.webp` | `Beyaz zeminde yastık formunda parlak beyaz draje sakız taneleri` | `null` / `null` |
| `lp-17` | `antep-fistikli-rulo-lokum` | Antep Fıstıklı Rulo Lokum | `geleneksel` | 135 | - | 200g | Pudra şekerli, bütün Antep fıstıklı rulo dilimler. | `ANTEP FISTIĞI` | `/images/products/antep-fistikli-rulo-lokum.webp` | `Beyaz zeminde pudra şekerli ve bütün Antep fıstıklı rulo lokum dilimleri` | `null` / `null` |
| `lp-18` | `narli-gul-yaprakli-lokum` | Narlı Gül Yapraklı Lokum | `geleneksel` | 142 | - | 200g | Dışı kuru gül yaprağı ve fıstık kaplı narlı lokumlar. | `NAR GÜL YAPRAĞI` | `/images/products/narli-gul-yaprakli-lokum.webp` | `Beyaz zeminde kuru gül yaprakları ve fıstık kaplı narlı lokum çubukları` | `null` / `null` |
| `lp-19` | `renkli-akide-sekeri` | Meyveli Akide Şekeri | `geleneksel` | 74 | - | 180g | Turuncu, sarı ve mor tonlarda geleneksel sert akide. | `KARIŞIK AKİDE` | `/images/products/renkli-akide-sekeri.webp` | `Beyaz zeminde turuncu, sarı ve mor renklerde parlak meyveli akide şekerleri` | `null` / `null` |
| `lp-20` | `altin-susam-krokan-topu` | Altın Susam Krokan Topu | `geleneksel` | 89 | - | 140g | Kavrulmuş susam ve karamel şekerle kaplı toplar. | `SUSAM KROKAN` | `/images/products/altin-susam-krokan-topu.webp` | `Beyaz zeminde kavrulmuş altın susamlı iki adet yuvarlak krokan topu` | `null` / `null` |
| `lp-21` | `citir-kavrulmus-misir` | Çıtır Kavrulmuş Mısır | `tuzlu-atistirmalik` | 52 | - | 140g | Tuzlu ve gevrek, iri kavrulmuş mısır taneleri. | `TUZLU MISIR` | `/images/products/citir-kavrulmus-misir.webp` | `Beyaz zeminde cam kasede iri kavrulmuş tuzlu mısır taneleri` | `null` / `null` |
| `lp-22` | `deniz-tuzlu-mini-kraker` | Deniz Tuzlu Mini Kraker | `tuzlu-atistirmalik` | 56 | - | 150g | İri deniz tuzu taneli, gevrek mini pretzel krakerler. | `DENİZ TUZU` | `/images/products/deniz-tuzlu-mini-kraker.webp` | `Beyaz zeminde üzerinde iri tuz taneleri bulunan mini pretzel kraker` | `null` / `null` |
| `lp-23` | `tuzlu-citir-nohut` | Tuzlu Çıtır Nohut | `tuzlu-atistirmalik` | 49 | - | 160g | Hafif tuzlu, kuru kavrulmuş gevrek nohut taneleri. | `TUZLU NOHUT` | `/images/products/tuzlu-citir-nohut.webp` | `Beyaz zeminde yakın çekim kavrulmuş tuzlu nohut tanesi` | `null` / `null` |
| `lp-24` | `tuzlu-karamel-badem-krokan` | Tuzlu Karamel Badem Krokan | `tuzlu-atistirmalik` | 94 | - | 130g | Kırılmış karamel levhalar içinde kavrulmuş bademler. | `TUZLU BADEM KROKAN` | `/images/products/tuzlu-karamel-badem-krokan.webp` | `Beyaz zeminde kırılmış karamelli ve bütün bademli krokan parçaları` | `null` / `null` |

---

## 4. Kategori Tablosu

| slug | name | Ambalaj Rengi (`color` / Token) | Metin Rengi (`inkColor`) | Rozet (`badge`) | Açıklama (`description`) | Ürün Sayısı |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| `sert-seker` | `Sert Şeker` | `#C8281C` (`--color-tomato`) | `#FFF8EE` | `SERT ŞEKER` | `Cam şekerler, çizgili nane kristalleri ve karamel bonbonlar.` | 4 |
| `jelibon` | `Yumuşak Jelibon` | `#8ECAE6` (`--color-powder-blue`) | `#2B1410` | `YUMUŞAK ŞEKER` | `Şeker kaplı halkalar, şeritler, ayıcıklar ve iki katlı köpükler.` | 4 |
| `cikolata-kapli` | `Çikolata Kaplı` | `#6E352C` (`--color-cocoa`) | `#FFF8EE` | `ÇİKOLATA` | `Kakao tozlu trüfler, bademli pralinler ve çikolatalı kahve.` | 4 |
| `lolipop-sakiz` | `Lolipop & Sakız` | `#FF6FA8` (`--color-pink`) | `#2B1410` | `LOLİPOP & SAKIZ` | `Spiral burgu lolipoplar, kalp çubuk şekerler ve beyaz draje sakız.` | 4 |
| `geleneksel` | `Lokum ve Akide` | `#C9A7FF` (`--color-lavender`) | `#2B1410` | `GELENEKSEL` | `Fıstıklı rulo lokum, gül yapraklı lokum, akide ve susam krokan.` | 4 |
| `tuzlu-atistirmalik` | `Tuzlu Kıtır` | `#FFD447` (`--color-butter`) | `#2B1410` | `TUZLU` | `Kavrulmuş mısır, deniz tuzlu mini kraker, nohut ve badem krokan.` | 4 |

---

## 5. Görsel Haritası

### 5.1 Ürün Görselleri (`public/images/products/` — 24 × 800px + 24 × 400px `.webp`)

Tüm ürün görselleri `800×800` piksel (`1:1` kare) ve `-400.webp` küçük boyutları `400×400` piksel olarak diskte doğrulanmıştır. `manifest.json` içindeki `bytes800` ve `bytes400` değerlerinin **48/48'i** diskteki gerçek dosya boyutlarıyla birebir eşleşmektedir. Toplam boyut: 800px dosyalar **761,04 KB** (779.300 bayt), 400px dosyalar **257,91 KB** (264.096 bayt).

- **Kullanıldığı yerler ve gösterim (`ProductImage` ortak bileşeni):**
  - `PackCard.tsx` (`HomePage`, `ShopPage`, `ProductDetailPage` ilgili ürünler): `ProductImage` (`srcSet` `-400.webp 400w, .webp 800w`, `loading="lazy"`), `aspect-square`, `object-contain p-3 sm:p-4`, `alt=""`.
  - `CartDrawer.tsx`: `64×64px` (`w-16 h-16`), `object-contain p-1`, `srcSet`, `alt="${item.name} — ${item.flavor} (${item.netWeight})"`.
  - `ProductDetailPage.tsx`: `ProductImage` (`priority`, `srcSet`), `aspect-square`, `object-contain p-3 sm:p-4`, `alt={product.imageAlt || product.name}`.
  - `MixPage.tsx`: `ProductImage` (`srcSet`, `loading="lazy"`), `aspect-square`, `object-contain`, `alt={product.name}`.
  - `CartPage.tsx`: `ProductImage` (`srcSet`, `80×80px`), `object-contain p-1.5`, `alt={item.name}`.
  - `HomePage.tsx` Hero vitrini (3 ürün: `visne-limon-cam-seker`, `orman-meyveli-ayicik`, `findikli-kakao-truf`): `ProductImage` (`srcSet`, ilk üründe `priority`), `aspect-square`, `object-contain`, `alt={item.label}`.
  - `AboutPage.tsx` (`antep-fistikli-rulo-lokum`): `176×176px` (`w-44 h-44 rounded-full`), `object-contain`, `alt={COPY.about.showcaseImageAlt}` (`"Antep Fıstıklı Rulo Lokum"`).

| Slug | 800px Boyut (KB) | 400px Boyut (KB) | Kaynak (`manifest.json` & `/credits`) | Yazar (`/credits`) | Lisans |
| :--- | :---: | :---: | :--- | :--- | :--- |
| `visne-limon-cam-seker` | 23,41 | 8,60 | `generated` | - | `generated` |
| `nane-okaliptus-kristal` | 17,35 | 6,22 | `generated` | - | `generated` |
| `portakal-dilimi-seker` | 48,03 | 16,66 | `generated` | - | `generated` |
| `tuzlu-karamel-bonbon` | 26,47 | 10,23 | `generated` | - | `generated` |
| `eksi-seftali-halka` | 60,76 | 19,09 | `generated` | - | `generated` |
| `orman-meyveli-ayicik` | 31,58 | 10,42 | `generated` | - | `generated` |
| `elma-kivi-eksimsi-serit` | 62,28 | 18,92 | `generated` | - | `generated` |
| `cilek-kremali-yumusak` | 28,35 | 10,00 | `generated` | - | `generated` |
| `findikli-kakao-truf` | 23,29 | 8,33 | Wikimedia Commons (`Truffles_with_nuts_and_chocolate_dusting_on_plate.jpg`) | David Leggett | `CC BY 2.0` |
| `bitter-bademli-pralin` | 55,56 | 19,23 | Wikimedia Commons (`Rocky_Mountain_chocolates.jpg`) | Wilfredor | `CC0` |
| `cikolatali-kahve-cekirdegi` | 18,50 | 6,48 | Wikimedia Commons (`ChocolateCoffeeBeans.jpg`) | ChrisEngelsma | `CC BY 3.0` |
| `ahududulu-beyaz-truf` | 21,69 | 7,79 | Wikimedia Commons (`Baltic_white_chocolate_truffle.jpg`) | Liliana Bozier | `CC BY 2.0` |
| `gokkusagi-burgu-lolipop` | 33,24 | 13,00 | Wikimedia Commons (`Lollipop-Rainbox-Swirl.jpg`) | Evan-Amos | `CC0` |
| `kalp-visne-lolipop` | 35,63 | 11,28 | Wikimedia Commons (`Polish_lollipop_heart.JPG`) | MOs810 | `CC BY-SA 4.0` |
| `kirmizi-beyaz-burgu-lolipop` | 10,16 | 4,13 | Wikimedia Commons (`Red_and_white_lollipop_on_checkered_paper.jpg`) | yoppy | `CC BY 2.0` |
| `beyaz-draje-sakiz` | 9,96 | 4,07 | Wikimedia Commons (`Kaugummis.jpg`) | Pascua Theus | `CC BY-SA 2.5` |
| `antep-fistikli-rulo-lokum` | 24,02 | 7,49 | Wikimedia Commons (`Turkish_Delight_with_pistachio.jpg`) | Maurice Flesier | `CC BY-SA 4.0` |
| `narli-gul-yaprakli-lokum` | 57,45 | 19,14 | Wikimedia Commons (`Turkish_delight.jpg`) | Maksym Kozlenko | `CC BY-SA 4.0` |
| `renkli-akide-sekeri` | 26,76 | 7,33 | Wikimedia Commons (`HardCandy.jpg`) | Adam Zivner | `CC BY-SA 3.0` |
| `altin-susam-krokan-topu` | 48,29 | 13,78 | Wikimedia Commons (`Sesame_Seed_Ball_%28Candy%29.jpg`) | Augustus Binu | `CC BY-SA 3.0` |
| `citir-kavrulmus-misir` | 26,55 | 10,39 | Wikimedia Commons (`Original_flavor_Corn_Nuts.jpg`) | Egiberti | `CC BY-SA 4.0` |
| `deniz-tuzlu-mini-kraker` | 28,09 | 10,71 | Wikimedia Commons (`Mini_pretzel.jpg`) | ゴスロリ | `CC0` |
| `tuzlu-citir-nohut` | 9,19 | 3,42 | Wikimedia Commons (`Chickpea_07.jpg`) | Shams948 | `CC0` |
| `tuzlu-karamel-badem-krokan` | 34,43 | 11,19 | Wikimedia Commons (`AlmondBrittle_%286439185647%29.jpg`) | Amy Stephenson | `CC BY-SA 2.0` |

### 5.2 Logolar (`public/brand/`), Sosyal Önizleme ve Dekor SVG / Desenler

| Dosya / Desen | Boyut (`viewBox` / Dosya KB) | Nerede & Hangi Boyutta Kullanılıyor? |
| :--- | :--- | :--- |
| `/brand/logo-main.svg` | `320×140` (`4,67 KB`) | `HomePage.tsx` (Hero vitrini: `w-[170px] sm:w-48 h-auto`). |
| `/brand/logo-horizontal.svg` | `248×64` (`1,93 KB`) | `Header.tsx` (`h-9 sm:h-10 w-auto`), `Footer.tsx` (`h-9 w-auto`), `AboutPage.tsx` (`h-9 w-auto`). |
| `/brand/logo-mark.svg` | `64×64` (`0,89 KB`) | `index.html` (`<link rel="icon" type="image/svg+xml">`). |
| `/brand/logo-mono.svg` | `248×64` (`1,62 KB`) | `Footer.tsx` (`h-6 w-auto opacity-75`, `alt="" aria-hidden="true"`). |
| `/og-image.png` | `1200×630` (`33,19 KB`) | `index.html` (`og:image` ve `twitter:image`). |
| Yıldız Patlaması SVG (`StarburstBadge`) | `viewBox="0 0 100 100"` | `PackCard.tsx`, `ProductDetailPage.tsx`. |
| Zikzak Poşet Kenarı SVG (`ZigzagEdge`) | `viewBox="0 0 160 14"` | `PackCard.tsx`, `MixPage.tsx`, `ProductDetailPage.tsx`, `CartPage.tsx`. |
| CSS Desenler (`src/index.css`) | `.halftone-dots`, `.pop-checker-band`, `.notebook-grid` | `HomePage.tsx`, `PackCard.tsx`, `ProductDetailPage.tsx`, `AboutPage.tsx`. |

### 5.3 Silinen / Kullanılmayan Görseller, `alt` Durumu ve Kırpılma Notları

- **Silinen kullanılmayan dosya:** `public/images/center.jpg` projeden **silinmiştir** (diskte mevcut değil).
- **Önceden kullanılmayan logo:** `public/brand/logo-mono.svg` artık `Footer.tsx` içinde kullanılmaktadır.
- **Düzeltilen `alt` tutarsızlığı:** `AboutPage.tsx` içinde ürün dosyası ve `alt` metni `antep-fistikli-rulo-lokum.webp` / `"Antep Fıstıklı Rulo Lokum"` olarak düzeltilmiştir.
- **Küçük görsel şeridi (`ProductDetailPage.tsx`, satır 367):** `<img src={img} alt="" ... />` şu an her üründe tek görsel olduğu için render edilmemektedir; çoklu galeri eklenirse erişilebilir `alt` metni verilmelidir.
- **Performans notu:** `PackCard.tsx`, `HomePage.tsx` Hero vitrini, `MixPage.tsx`, `ProductDetailPage.tsx` ve `CartPage.tsx` artık ortak `ProductImage` bileşeni üzerinden `-400.webp` + `400w, 800w` `srcSet` kullanmaktadır (`CartDrawer.tsx` de aynı `srcSet` yapısını kullanır). `object-contain` sayesinde kırpılma riski yoktur.

---

## 6. SEO ve Meta Yönetimi

| Rota | `title` (Sonuç: `document.title`) | `meta[name="description"]` | Durum / Not |
| :--- | :--- | :--- | :--- |
| `index.html` (varsayılan) | `Lüpük — Aç, kıtırdat, gülümse.` | `Günlük taze parti şekerleme, ekşi jelibon, çikolata kaplı draje ve çıtır atıştırmalık poşetleri.` | `og:type="website"`, `og:locale="tr_TR"`, `og:site_name="Lüpük"`, `og:image="/og-image.png"` (`1200×630`), `twitter:card="summary_large_image"`, `icon="/brand/logo-mark.svg"` |
| `/` (`HomePage`) | `Ana Sayfa \| Lüpük` | `Sert şeker, yumuşak jelibon, çikolata kaplı ürünler, lokum ve tuzlu atıştırmalıklar.` | `usePageMeta` ile güncellenir. |
| `/shop` (`ShopPage`) | `Mağaza Vitrini \| Lüpük` | `Lüpük şekerleme ve atıştırmalık vitrini: 6 kategoride 24 çeşit ürün.` | `usePageMeta` ile güncellenir. |
| `/shop/:category` (`ShopPage`) | `{CatName} Poşetleri \| Lüpük` | `currentCategoryObj.description` | `usePageMeta` ile güncellenir. |
| `/mix` (`MixPage`) | `Kendi Poşetini Doldur \| Lüpük` | `4–6 farklı şekerleme ve atıştırmalıktan 50 gramlık porsiyonlarla kendi Lüpük karışım poşetini hazırla.` | `usePageMeta` ile güncellenir. |
| `/product/:slug` (`ProductDetailPage`) | `{ProductName} \| Lüpük` (veya `Ürün Bulunamadı \| Lüpük`) | `product.subtitle \|\| product.description` | `usePageMeta` ile güncellenir. |
| `/cart` (`CartPage`) | `Sepetim \| Lüpük` | `Lüpük sepetindeki şekerleme ve atıştırmalık poşetlerini yönet.` | `usePageMeta` ile güncellenir. |
| `/checkout` (`CheckoutPage`) | `Ödeme (Demo) \| Lüpük` | `Bu sayfa demo amaçlıdır; gerçek ödeme ve sipariş gönderimi yapılmaz.` | `usePageMeta` ile güncellenir. |
| `/about` (`AboutPage`) | `Hakkımızda \| Lüpük` | `Lüpük, sert şekerden çikolataya 6 kategoride 24 çeşit şekerleme ve atıştırmalık sunar.` | `usePageMeta` ile güncellenir. |
| `/info` (`InfoPage`) | `Teslimat ve SSS \| Lüpük` | `Lüpük sipariş, teslimat, iade ve ürün saklama koşulları hakkında sıkça sorulan sorular.` | `usePageMeta` ile güncellenir. |
| `/credits` (`CreditsPage`) | `Görsel Kaynakları \| Lüpük` | `Lüpük ürün kataloğunda kullanılan Wikimedia Commons fotoğraflarının yazar, lisans ve düzenleme bilgileri.` | `usePageMeta` ile güncellenir. |
| `*` (`NotFoundPage`) | `Sayfa Bulunamadı (404) \| Lüpük` | `Aradığın sayfa bulunamadı.` | `usePageMeta` ile güncellenir. |

- `public/robots.txt`: **Var** (`User-agent: *`, `Allow: /`, `Sitemap: https://lupuk.com.tr/sitemap.xml` — 66 B)
- `public/sitemap.xml`: **Var** (`https://lupuk.com.tr/` altında `/`, `/shop`, 6 kategori `/shop/:category`, `/mix`, `/about`, `/info`, `/credits` — 12 URL, 787 B)
- `public/og-image.png`: **Var** (`1200×630` — 33,19 KB)
- Favicon & Manifest: **Var** (`/brand/logo-mark.svg`, `/favicon-32x32.png`, `/apple-touch-icon.png`, `/site.webmanifest`)

---

## 7. Fiyat ve Ağırlık Özeti

- **Toplam ürün sayısı:** 24 (6 kategori × 4 ürün; `featured: true` olan 10 ürün).
- **Fiyat aralığı:** En düşük **39 TL** (`lp-16` Beyaz Draje Sakız), en yüksek **142 TL** (`lp-18` Narlı Gül Yapraklı Lokum), ortalama **75,29 TL**.
- **İndirimli (`compareAtPrice`) ürünler:** **0 adet** (sahte indirim iddiasını önlemek için tüm ürünlerden kaldırılmıştır).
- **Ağırlık çeşitleri:** `70g` (1), `80g` (1), `85g` (1), `90g` (1), `120g` (2), `130g` (2), `140g` (5), `150g` (5), `160g` (3), `180g` (1), `200g` (2).
- **Kategori dağılımı:**
  - `sert-seker`: 4 ürün · 48–67 TL (ort. 56,75 TL)
  - `jelibon`: 4 ürün · 59–69 TL (ort. 63,50 TL)
  - `cikolata-kapli`: 4 ürün · 105–128 TL (ort. 115,75 TL)
  - `lolipop-sakiz`: 4 ürün · 39–46 TL (ort. 43,00 TL)
  - `geleneksel`: 4 ürün · 74–142 TL (ort. 110,00 TL)
  - `tuzlu-atistirmalik`: 4 ürün · 49–94 TL (ort. 62,75 TL)
- **`MixPage.tsx` porsiyon mantığı:** `lolipop-sakiz` kategorisi (`70–90g` tekli ürünler) karışımdan çıkarılmıştır (`mixableProducts`: 20 ürün). 50g porsiyon fiyatı `Math.round((product.price * 50) / grams)` ile ürünün kendi gramajına orantılı hesaplanır.

---

## 8. Marka Sesi Uyumu (`brand/BRAND.md` Karşılaştırması)

`brand/BRAND.md` §7'deki 5 temel ses kuralı (*görünür/doğrulanabilir bilgi, kısa ve çeşitli yazım, samimi "sen" dili, doğrulanamayan iddia yazmama, yasak AI kalıplarından kaçınma*) güncel kodda eksiksiz uygulanmıştır.

- **Uyumlu örnek cümleler (koddan):**
  1. `Aç, kıtırdat, gülümse.` (`src/content/copy.ts` / `HomePage.tsx`)
  2. `Kırmızı vişne ve sarı limon yarımları aynı gövdede. Önce ekşi, sonra tatlı.` (`src/data/products.js`, `lp-01`)
  3. `İri taneli, gevrek kavrulmuş mısır. İnce tuz kaplamasıyla yüksek sesli kıtırlık.` (`src/data/products.js`, `lp-21`)
  4. `Mağazadan birkaç poşet seçip sepeti doldurabilirsin.` (`src/content/copy.ts` / `CartDrawer.tsx`)
  5. `Bu poşet rafta yok.` (`src/content/copy.ts` / `ProductDetailPage.tsx`)
  6. `Teslimat süreleri ve kargo ücreti netleşince eklenecek.` (`src/content/copy.ts` / `InfoPage.tsx`)
- **Önceki resmi "siz" dili hataları giderildi:**
  - `ProductDetailPage.tsx` ve `products.js` içindeki saklama notları `"sakla"` / `"tut"` / `"Saklama bilgisi eklenecek."` biçimine getirildi.
  - `CheckoutPage.tsx` form hata mesajları `"Geçerli bir e-posta adresi gir."`, `"En az 10 haneli telefon numarası gir."` olarak `"sen"` diline çevrildi.
- **Slogan sınırı:** *"Aç, kıtırdat, gülümse."* yalnızca `index.html` (`title` / `og:title`), `copy.ts` (`meta.defaultTitle`) ve `HomePage.tsx` (`h1`) olmak üzere izin verilen sınırda (2/2) kullanılmaktadır.

---

## 9. Anti-AI Tarama Sonucu (`node scripts/scan-ai-text.mjs`)

`scripts/scan-ai-text.mjs` betiğinin güncel kod üzerindeki tam çıktısı:

```text
[PASS] Yasak AI kelimeleri = 0: 0
[PASS] Slogan <= 2: 2/2
[PASS] "taze parti" <= 2: 0/2
[PASS] "hışırt" <= 1: 0/1
[PASS] Eyebrow etiketi <= 4: 3/4 (codesEyebrow:, deliveryEyebrow:, returnsEyebrow:)
[PASS] "&" ürün adlarında <= 6/24: 0/24
[PASS] "&" sayfa/bölüm başlıklarında <= 2: 0/2
[PASS] compareAtPrice yokluğu = 0: 0
[PASS] Ürün açıklamaları 30-110 karakter: 24/24 uygun (min=62, max=92)
[PASS] Ürün görselleri (.webp ve -400.webp) diskte mevcut: 48/48 mevcut
[PASS] "Demo" yalnızca /checkout ve Footer tek satırda: dışında 0 adet

OVERALL: PASS
```

---

## 10. Metin–Layout Uyumsuzlukları ve Taşma Riskleri

1. **Uzun `flavor` şeritleri (`PackCard.tsx`):** `PackCard` içinde `flavor` rozeti `truncate` ile kesilir (`pr-11` fiyat rozetine yer açmak için). `TUZLU BADEM KROKAN` (18 krk), `PORTAKAL DİLİMİ` (15 krk), `ORMAN MEYVELERİ` (15 krk) ve `NAR GÜL YAPRAĞI` (15 krk) gibi etiketler dar mobil kartlarda (`320–360px`) kesilme riski taşır.
2. **Uzun ürün adları (`MixPage.tsx`):** `Kırmızı Beyaz Spiral Lolipop` (28 krk), `Çikolatalı Kahve Çekirdeği` (26 krk), `Tuzlu Karamel Badem Krokan` (26 krk) ve `Antep Fıstıklı Rulo Lokum` (25 krk) `MixPage.tsx` içinde `line-clamp-1` kullanıldığı için tek satırda üç nokta (`...`) ile kesilebilir; `PackCard.tsx` içinde `line-clamp-2` olduğu için güvenlidir.
3. **Alt başlık ve açıklama uzunlukları:** `subtitle` 41–58 karakter (`line-clamp-2` ile 2 satıra sığar), `description` 62–92 karakter aralığındadır.
4. **Hero `HERO_SHOWCASE` rozetleri (`HomePage.tsx`):** 3 sütunlu (`grid-cols-3`) kart altında `VİŞNE LİMON` (11 krk), `ORMAN MEYVELİ` (13 krk) ve `FINDIKLI TRÜF` (13 krk) `truncate` ile dar mobilde kesilebilir.

---

## 11. Yer Tutucu ve Doğrulanmamış Alanlar

- **Yer tutucu fiyatlar:** `src/data/products.js` satır 1'de belirtildiği üzere tüm 24 ürünün `price` değerleri gerçek maliyet/satış fiyatları belirlenene kadar yer tutucudur (`compareAtPrice` kaldırılmıştır).
- **Eksik ürün verileri:** Tüm 24 üründe `ingredients: null` ve `allergens: null` (`ProductDetailPage.tsx` üzerinde `"Bilgi eklenecek"` olarak görünür; `defaultStorage` ise `"Saklama bilgisi eklenecek."`).
- **Netleşmemiş teslimat, iade ve kargo alanları:** `InfoPage.tsx` (`deliveryText`, `returnsText`, ilgili SSS yanıtları) `"netleşince eklenecek."` yer tutucusunu kullanır; `CartPage.tsx` kargo satırı `"Kargo çıkışı yok"` gösterir.
- **Demo ödeme akışı:** `Footer.tsx` (`site.footerNote`) ve `CheckoutPage.tsx` sitenin arayüz demosu olduğunu ve gerçek tahsilat/kargo çıkışı yapılmadığını açıkça belirtir; KVKK veya mesafeli satış sözleşmesi sayfaları yoktur.
