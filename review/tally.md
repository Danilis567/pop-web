# Oylama Sayım ve Görevlendirme Raporu (`review/tally.md`)

Toplam 9 ajan (Agent 1–9), her biri kendi önerileri hariç 5'er oy olmak üzere toplam **45 oy** kullanmıştır.

## 1. Oy Dağılımı

| Sıra | Öneri | Başlık | Oy | Etki | Efor | Durum |
| :---: | :--- | :--- | :---: | :---: | :---: | :--- |
| **1** | **P03** | `-400.webp` Thumbnail `srcSet`, `width`/`height` ve Zengin `alt` | **6** | 5 | S | **SEÇİLDİ (#1)** |
| **2** | **P10** | `360px` Mobilde Hero Vitrin Kartlarının Sıkışıklığını Giderme | **6** | 3 | S | **SEÇİLDİ (#2)** |
| **3** | **P02** | "Kendi Poşetini Doldur" (`/mix`) İnteraktif Karışım Oluşturucu | **5** | 5 | M/L | **SEÇİLDİ (#3)** |
| **4** | **P11** | `logo-main.svg` İyileştirmesi & Dışa Taşan Zikzak Poşet Kesimi | **5** | 4 | M | **SEÇİLDİ (#4)** |
| **5** | **P01** | Global `:focus-visible` Odak Halkası ve `outline-none` Temizliği | **4** | 5 | S | **SEÇİLDİ (#5)** |
| **6** | **P06** | Merkezi `siteConfig.ts`, Parti Kodu & Metin Tutarlılığı | **4** | 4 | S/M | **SEÇİLDİ (#6)** |
| **7** | **P16** | Wikimedia Commons Görsel Lisans / Atıf Listesi | **4** | 5 | M | **SEÇİLDİ (#7)** |
| **8** | **P04** | Mağazada `♥ Favorilerim` Hızlı Filtresi ve Üst Menü Sayacı | **3** | 4 | S | **SEÇİLDİ (#8)** *(Eşitlikte Etki/Efor = 4/S)* |
| 9 | **P13** | `npm run audit:content` Otomatik İçerik Denetim Scripti | 3 | 4 | S | Backlog |
| 10 | **P05** | Tat & Doku Etiketleriyle Hızlı Filtre Çipleri | 3 | 4 | S/M | Backlog |
| 11 | **P09** | `vite.config.ts` `manualChunks` ile Vendor Bundle Ayrımı | 1 | 3 | S | Backlog |
| 12 | **P12** | Ürün Detayında Çoklu Galeri Sekmeleri | 1 | 4 | M | Backlog |
| 13 | **P07** | `CartDrawer` İçinde Ücretsiz Kargo / Sürpriz Eşik Çubuğu | 0 | 3 | S | Backlog |
| 14 | **P08** | Sipariş Fişine Kısa Hediye / Masa Notu Ekleme | 0 | 3 | S | Backlog |
| 15 | **P15** | Etkileşimli "BURADAN YIRT" Çentiği & Embla Klavye Navigasyonu | 0 | 4 | M | Backlog |
| — | **P14** | Ürün İçindekiler ve Alerjen Verilerinin Doldurulması | 0 | 4 | M | **ELENDİ** |

## 2. Elenen Öneri ve Gerekçesi
- **P14 (Ürün İçindekiler ve Alerjen Verilerinin Doldurulması):** Bölüm 8 yasakları (*"uydurma alerjen ve içerik bilgisi yasaktır; `ingredients` ve `allergens` `null` kalmalı, arayüz boşken 'Bilgi eklenecek' göstermeli"*) ile doğrudan çeliştiği için elenmiştir.

## 3. Görev Dağılımı (İlk 8 Öneri)
- **Agent 6:** **P02** (`src/pages/MixPage.tsx`, `src/store/cartStore.ts`, `src/App.tsx`).
- **Agent 2:** **P11** (logo kısmı: `public/brand/logo-main.svg` sistem fontuna düşmeyen etiket düzenlemesi).
- **Agent 7:** **P01, P03, P04, P06, P10, P11** (zikzak kesim kısmı), **P16**.
