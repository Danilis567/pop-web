# Lüpük — Oylama Pusulası (`review/ballot.md`)

9 ajanın `review/proposals/agent-1.md` .. `agent-9.md` önerileri birleştirilerek 16 maddelik oylama pusulası oluşturulmuştur.

| No | Öneri Başlığı | Yazar(lar) | Etki | Efor | Özet & Etkilenen Dosyalar |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **P01** | Global `:focus-visible` Odak Halkası ve `outline-none` Temizliği | Agent 1, 2, 6, 7, 9 | 5 | S | `index.css`, `Header.tsx`, `ShopPage.tsx` — yüksek kontrastlı klavye odak halkası. |
| **P02** | "Kendi Poşetini Doldur" (`/mix`) İnteraktif Karışım Oluşturucu | Agent 1, 4, 6, 7 | 5 | M/L | `MixPage.tsx`, `cartStore.ts`, `App.tsx` — 4–6 çeşit seçip tek poşette sepete ekleme. |
| **P03** | `-400.webp` Thumbnail `srcSet`, `width`/`height` ve Zengin `alt` | Agent 3, 7, 8 | 5 | S | `PackCard.tsx`, `CartDrawer.tsx`, `products.js` — `400w/800w` `srcSet` ve betimleyici `alt`. |
| **P04** | Mağazada `♥ Favorilerim` Hızlı Filtresi ve Üst Menü Sayacı | Agent 6, 7 | 4 | S | `ShopPage.tsx`, `Header.tsx` — `cartStore.favorites` filtresi ve sayaç. |
| **P05** | Tat & Doku Etiketleriyle Hızlı Filtre Çipleri | Agent 4, 5 | 4 | S/M | `ShopPage.tsx` — `products.js` `tags` değerleriyle tek tıkla filtreleme. |
| **P06** | Merkezi `siteConfig.ts`, Parti Kodu & Metin Tutarlılığı | Agent 2, 5, 8 | 4 | S/M | `siteConfig.ts`, `HomePage.tsx`, `Footer.tsx`, `InfoPage.tsx` — tek parti kodu ve tutarlı demo metinleri. |
| **P07** | `CartDrawer` İçinde Ücretsiz Kargo / Sürpriz Eşik Çubuğu | Agent 6 | 3 | S | `CartDrawer.tsx` — 350 TL eşiğine göre ilerleme çubuğu. |
| **P08** | Sipariş Fişine Kısa Hediye / Masa Notu Ekleme | Agent 4 | 3 | S | `CartPage.tsx`, `CheckoutPage.tsx` — demo fişine isteğe bağlı hediye notu. |
| **P09** | `vite.config.ts` `manualChunks` ile Vendor Bundle Ayrımı | Agent 1, 9 | 3 | S | `vite.config.ts` — `framer-motion`, `embla`, `radix` chunk ayrımı. |
| **P10** | `360px` Mobilde Hero Vitrin Kartlarının Sıkışıklığını Giderme | Agent 9 | 3 | S | `HomePage.tsx` — dar ekranda 3'lü yelpaze destesini taşmasız düzenleme. |
| **P11** | `logo-main.svg` İyileştirmesi & Dışa Taşan Zikzak Poşet Kesimi | Agent 2 | 4 | M | `logo-main.svg`, `PackCard.tsx` — gerçek dışa taşan zikzak üst kenar. |
| **P12** | Ürün Detayında Çoklu Galeri Sekmeleri (Tam / Yakın Doku / Sticker) | Agent 3 | 4 | M | `ProductDetailPage.tsx` — küçük görsel şeridinde çoklu görünüm. |
| **P13** | `npm run audit:content` Otomatik İçerik Denetim Scripti | Agent 5 | 4 | S | `package.json`, `scripts/audit-content.mjs` — yasak kelime/kural taraması. |
| **P14** | Ürün İçindekiler ve Alerjen Verilerinin Doldurulması | Agent 4, 7, 8, 9 | 4 | M | `products.js` — `null` alanların doldurulması *(Uyarı: Bölüm 8 yasağıyla çelişebilir)*. |
| **P15** | Etkileşimli "BURADAN YIRT" Çentiği & Embla Klavye Navigasyonu | Agent 1, 6 | 4 | M | `ProductDetailPage.tsx`, `HomePage.tsx` — yırtma etkileşimi ve ok tuşları. |
| **P16** | Wikimedia Commons Görsel Lisans / Atıf Listesi | Agent 3 | 5 | M | `InfoPage.tsx` veya `AboutPage.tsx` — CC lisanslı görseller için atıf alanı. |
