# İçerik Denetim Raporu (`review/content-audit.md`)

**Denetleyen:** Agent 5 — İçerik Denetçisi  
**Kapsam:** `src/content/copy.ts`, `src/data/products.js`, `docs/CLAIMS_TO_VERIFY.md`, `brand/BRAND.md`, `docs/STYLE.md` ve `scripts/scan-ai-text.mjs`.  
**Genel Durum:** **TEMİZ** (`node scripts/scan-ai-text.mjs` → `OVERALL: PASS`)

---

## 1. Doğrulanamayan İddialar (`docs/CLAIMS_TO_VERIFY.md`)

Aşağıdaki tüm doğrulanamayan iddialar `docs/CLAIMS_TO_VERIFY.md` içinde kayıtlıdır ve kaynak koddan temizlenerek nötr metne veya açık yer tutucuya çevrilmiştir:

| İddia Alanı | `CLAIMS_TO_VERIFY.md` Kaydı | Kod Durumu (`src/`) |
| :--- | :---: | :--- |
| Glikoz şurubu / gerçek meyve püresi (`home.stickyNoteText`) | ✅ Kayıtlı | Temizlendi (`"24 çeşit şeker ve atıştırmalık tek rafta."`). |
| Günlük taze üretim / taze parti / kavrum / ısı yapıştırma / şeffaf ambalaj | ✅ Kayıtlı | Temizlendi (`"taze parti"` = `0`, `ZigzagEdge.tsx` yalnızca geliştirici JSDoc yorumu). |
| İstanbul şehri (`site.batchLocation`, `Footer.tsx`) | ✅ Kayıtlı | Temizlendi (`src/` içinde İstanbul ifadesi yok). |
| Haftalık üretim takvimi (`home.scheduleTitle`, `home.scheduleRows`) | ✅ Kayıtlı | Temizlendi (`copy.ts` içinden kaldırıldı). |
| 15:00 kesim / 24 saat / 14 gün / koşulsuz değişim garantisi (`info.*`) | ✅ Kayıtlı | Yer tutucuya döndürüldü (`"Teslimat süreleri ve kargo ücreti netleşince eklenecek."`, `"İade ve değişim koşulları netleşince eklenecek."`). |
| Ücretsiz demo kargo (`cart.shippingValue`) | ✅ Kayıtlı | Temizlendi (`"Hesaplanmadı"`). |
| Varsayılan saklama koşulu (`pdp.defaultStorage`) | ✅ Kayıtlı | Yer tutucuya döndürüldü (`"Saklama bilgisi eklenecek."`). |
| `compareAtPrice` sahte indirim fiyatlandırması | ✅ Kayıtlı | Temizlendi (`src/` genelinde `0` eşleşme). |
| Kategori nitelik rozetleri (`categories[].badge`) | ✅ Kayıtlı | Nötr etiketlere döndürüldü (`SERT ŞEKER`, `YUMUŞAK ŞEKER`, `ÇİKOLATA`, `LOLİPOP & SAKIZ`, `GELENEKSEL`, `TUZLU`). |
| Ürün reçete iddiaları (`lp-10`, `lp-12`, `lp-16`, `lp-17`, `lp-20`, `lp-21`, `lp-24`) | ✅ Kayıtlı | Temizlendi; açıklamalar görünür özelliklerle sınırlı. |

---

## 2. `node scripts/scan-ai-text.mjs` Tarama Sonuçları

| Kontrol Kalemi | Kural / Eşik | Gözlemlenen Değer | Durum |
| :--- | :---: | :--- | :---: |
| Yasak AI kelimeleri | `= 0` | `0` | ✅ PASS |
| Slogan (`"kıtırdat"`) | `≤ 2` | `2/2` | ✅ PASS |
| `"taze parti"` | `≤ 2` | `0/2` | ✅ PASS |
| `"hışırt"` | `≤ 1` | `0/1` | ✅ PASS |
| Eyebrow etiketleri | `≤ 4` | `3/4` (`codesEyebrow:`, `deliveryEyebrow:`, `returnsEyebrow:`) | ✅ PASS |
| Ürün adlarında `"&"` | `≤ 6/24` | `0/24` | ✅ PASS |
| Sayfa/bölüm başlıklarında `"&"` | `≤ 2` | `0/2` | ✅ PASS |
| `compareAtPrice` yokluğu | `= 0` | `0` | ✅ PASS |
| Ürün açıklamaları uzunluğu | `30–110` karakter | `24/24` uygun (`min=62`, `max=92`; en fazla 2 üründe aynı 2 kelimelik başlangıç) | ✅ PASS |
| Ürün görselleri (`.webp` ve `-400.webp`) | Diskte mevcut | `48/48` mevcut | ✅ PASS |
| `"demo"` kullanımı | Yalnızca `/checkout`, Footer tek satır, `README.md` (`≤ 3` yerde) | `copy.ts` içinde `/checkout` ve `footerNote` dışında `0` adet (`README.md:26` ile toplam 3 yer) | ✅ PASS |

---

## 3. Ürün Verisi (`src/data/products.js`) Kontrolleri

- **`ingredients` ve `allergens`:** 24/24 üründe `ingredients: null` ve `allergens: null` korunuyor.
- **Slug ve Görsel Dosya Adı Tutarlılığı:** 24/24 üründe `image` yolu `slug` ile birebir eşleşiyor (`/images/products/<slug>.webp` ve `-400.webp` diskte mevcut).
  - *Bilgi Notu:* `lp-07` (`Elma Kivi Ekşi Şerit` / `elma-kivi-eksimsi-serit`), `lp-08` (`Çilek Krema Köpük` / `cilek-kremali-yumusak`), `lp-15` (`Kırmızı Beyaz Spiral Lolipop` / `kirmizi-beyaz-burgu-lolipop`) ve `lp-19` (`Meyveli Akide Şekeri` / `renkli-akide-sekeri`) ürünlerinde slug ve görsel dosya adları kendi içinde tutarlıdır; önceki ürün adlarından kalan küçük sözcük farkları URL/görsel kırılması olmaması adına korunmuştur.

---

## 4. `docs/STYLE.md` ve `brand/BRAND.md` Güncelliği

- **`docs/STYLE.md` Ek 2, Ek 3, Ek 4, Ek 14:** Dördünde de doğrulanamayan puan, tazelik, mağaza ziyaret saati, haftalık üretim takvimi ve sahte yorum verileri için **`uygulanmaz: sahte veri riski`** notları günceldir.
- **`brand/BRAND.md` Bölüm 7:** 5 Temel Ses Kuralı, yasak AI kalıpları, slogan sınırı (en fazla 2 yer) ve `docs/CLAIMS_TO_VERIFY.md` referansı günceldir.
