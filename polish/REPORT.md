# Lüpük Son Cila Raporu (`polish/REPORT.md`)

## 1. Önce / Sonra Ölçüm Tablosu

| Metrik / Araç | Önce (`polish/baseline/`) | Sonra (`polish/after/`) | Değişim |
| :--- | :--- | :--- | :--- |
| **`axe.json` (30 tarama)** | 30 ihlal girişi (0 critical, 30 serious — `label-content-name-mismatch`: 60 düğüm) | 0 ihlal girişi (0 critical, 0 serious) | **-30 ihlal (Tam temiz)** |
| **Lighthouse `/` (Ana Sayfa)** | Perf `84` · A11y `100` · BP `100` · SEO `92` | Perf `100` · A11y `100` · BP `100` · SEO `100` | **Perf +16 · SEO +8** |
| **Lighthouse `/shop` (Mağaza)** | Perf `87` · A11y `99` · BP `100` · SEO `92` | Perf `98` · A11y `100` · BP `100` · SEO `100` | **Perf +11 · A11y +1 · SEO +8** |
| **Lighthouse `/product/visne-limon-cam-seker`** | Perf `76` · A11y `98` · BP `100` · SEO `92` | Perf `97` · A11y `100` · BP `100` · SEO `100` | **Perf +21 · A11y +2 · SEO +8** |
| **`bundle.txt` (Giriş & Kart JS)** | `index-*.js`: `396.96 kB` (`127.35 kB` gzip) · `PackCard`: `145.58 kB` (`49.73 kB` gzip) · CSS: `42.99 kB` | `index-*.js`: `105.25 kB` · `PackCard`: `5.86 kB` · CSS: `51.67 kB` (vendor chunk'lar ayrıldı: `react-vendor` `255.11 kB`, `es` `195.05 kB`, `radix-ui` `107.44 kB`) | **Giriş JS -73% · PackCard -96%** |
| **`shots-report.json` (45 ekran görüntüsü)** | `45` çekim · `0` consoleError · `0` consoleWarning · `0` failed404 | `45` çekim · `0` consoleError · `0` consoleWarning · `0` failed404 | **0 hata / 0 taşma** |

---

## 2. Uygulanan ve Reddedilen Skill İlkeleri (`polish/skill-conflicts.md` & `brand/BRAND.md`)

### Uygulanan İlkeler
- **Erişilebilirlik & Klavye:** `label-content-name-mismatch` ihlalleri giderildi; rota değişiminde odak/ekran okuyucu duyurusu, `aria-invalid`, `autocomplete`, `inputmode` ve ticker duraklatma kontrolü eklendi.
- **Performans & Görsel Optimizasyon:** `ProductImage` bileşenine `400w`/`800w` `srcSet`, `loading="lazy"` / `priority` (`fetchPriority="high"`) ve hata yer tutucusu eklendi; ağır bağımlılıklar (vendor chunk'lar, Fuse.js, Embla, konfeti) ayrıştırıldı.
- **Dokunmatik & Duyarlı Kurallar:** `@custom-variant hover (@media (hover: hover))` ile dokunmatik cihazlarda yapışkan hover önlendi; `NetWeightTag` bölünmez boşluk (`\u00A0g`) ve `StarburstBadge` uyarlanabilir fiyat boyutuyla taşmasız hale getirildi.
- **Marka Sesi & Tipografi:** Tüm metinler `brand/BRAND.md` kurallarına göre "sen" dilinde, doğrulanabilir bilgiyle ve `Baloo 2` / `Plus Jakarta Sans` / `Fraunces` / `JetBrains Mono` tokenlarıyla hizalandı.

### Reddedilen / Atlanan İlkeler (`brand/BRAND.md` Önceliği)
- **Genel E-Ticaret Minimalist Grid Önerisi:** Kart çerçevelerini kaldırıp soft `drop-shadow` kullanma önerisi **reddedildi** — `brand/BRAND.md` gereği `2px` `#2B1410` kontur ve blursız sert ofset gölgeler (`--shadow-pop*`) korundu.
- **Anthropic `brand-guidelines`:** Başka marka renkleri ve tipografisi **atlandı** — yalnızca Lüpük marka kimliği (`#FFF8EE`, `#2B1410`, 6 kategori ambalaj rengi) uygulandı.

---

## 3. Kapsam Dışı Bırakılan / Kalan Kalemler (`polish/backlog.md`)
- **JSON-LD `Product` Yapılandırılmış Verisi (`W10-03`):** Katalogdaki yer tutucu/demo fiyatlar nedeniyle `Product` fiyat/stok şeması gerçek ürün verisiyle sonraki faza bırakıldı.
- **Kategori Adı Bağlaç Kararı (`W11-10`):** `Lolipop & Sakız` / `LOLİPOP & SAKIZ` adının `ve` olarak değiştirilip değiştirilmeyeceği marka/taksonomi kararına bırakıldı.
- **Katalog İlk 8 Ürün Görsel Atfı (`W11-16`):** `credits.subtitle` 16 Wikimedia Commons fotoğrafından söz ederken katalogda 24 ürün bulunuyor; `lp-01`..`lp-08` görsellerinin kaynağı doğrulanmadan yeni atıf eklenmedi.
- **`DESIGN.md` `100svh` Güncellemesi (`W9-16`):** Tam ekran kaplamalar için `100svh`/`100dvh` kuralı bu fazda `DESIGN.md` bölüm 8'e işlendi.
