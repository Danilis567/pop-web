# Anti-AI Metin ve Doğrulanamayan İddia Temizliği Raporu (`review/anti-ai-text-report.md`)

## 1. Önce / Sonra Ölçüm Tablosu

| Ölçüm / Kapı | Hedef | Önce | Sonra | Durum |
| :--- | :---: | :---: | :---: | :---: |
| Yasak AI kelimeleri (`keyif`, `neşeli`, `abartısız`, `sıfır bahane`, `hikâyemiz` vb.) | `0` | `8+` (`keyif`, `neşeli`, `abartısız`, `tam kıvamında`, `tam tat`, `sıfır bahane`, `hikâyemiz`, `hikâyeyi`) | `0` | PASS |
| Slogan ("Aç, kıtırdat, gülümse") | `≤ 2` | `7` | `2` | PASS |
| `"taze parti"` | `≤ 2` | `4` | `0` | PASS |
| `"hışırt"` | `≤ 1` | `2` | `0` | PASS |
| Eyebrow etiketi (`*Eyebrow`) | `≤ 4` | `7` | `3` | PASS |
| `"&"` — 24 ürün adında | `≤ 6/24` | `5/24` | `0/24` | PASS |
| `"&"` — sayfa/bölüm başlıklarında | `≤ 2` | `8+` | `0` | PASS |
| `compareAtPrice` (sahte indirim / üstü çizili fiyat) | `0` | `4` üründe (`lp-04`, `lp-11`, `lp-18`, `lp-24`) | `0` | PASS |
| Ürün açıklamaları uzunluk aralığı | `30–110` karakter | Çoğunluk `120–190` karakter | `24/24` uygun (`min=62`, `max=92`) | PASS |
| Ürün görseli / slug / ad tutarlılığı | `24/24` | `10` üründe eski slug/dosya adı | `24/24` eşleşik (`48/48` `.webp` + `-400.webp`) | PASS |
| `"Demo"` yerleşimi | Yalnızca `/checkout`, `Footer` tek satır, `README.md` | `info.badge`, `info.faq`, `cart.shippingValue`, `cart.checkoutCta` | Yalnızca `/checkout`, `Footer` tek satır, `README.md` | PASS |

## 2. Değiştirilen ve Oluşturulan Dosyalar

- **Yeni dosyalar:**
  - `docs/CLAIMS_TO_VERIFY.md` — Kaldırılan veya yer tutucuya çevrilen tüm doğrulanamayan iddialar tablosu.
  - `scripts/scan-ai-text.mjs` — Bölüm 3.2 sayaçları, yasak AI kelimeleri, `compareAtPrice`, açıklama uzunlukları ve görsel varlığını otomatik doğrulayan tarama betiği.
  - `review/anti-ai-text-report.md` — Bu rapor.
- **Güncellenen kod ve veri dosyaları:**
  - `src/content/copy.ts` — Doğrulanamayan iddialar, AI klişeleri, şehir bilgisi (`İstanbul`), politika rakamları, fazladan eyebrow/slogan/`&`/`Demo` kullanımları ve "siz" dili kalıntıları temizlendi; `info.attributions` ürün adları güncellendi.
  - `src/data/products.js` — `compareAtPrice` alanları kaldırıldı; 10 ürünün slug ve görsel yolları adlarıyla eşitlendi; kategori rozetleri nötrleştirildi; tüm açıklamalar 30–110 karakter aralığına çekilip çeşitlendirildi; ürün adında geçmeyen bileşen/üretim iddiaları temizlendi; 24 ürüne `imageAlt` eklendi.
  - `src/data/products.d.ts` — `compareAtPrice` kaldırıldı, `imageAlt?: string` eklendi.
  - `src/components/packaging/PackCard.tsx` — `compareAtPrice` koşullu kırmızı rozet kaldırıldı; ürün kartı görseli `alt=""` yapıldı.
  - `src/pages/ProductDetailPage.tsx` — Üstü çizili fiyat ve `compareAtPrice` rozeti kaldırıldı; ana görselde `product.imageAlt || product.name` kullanıldı.
  - `src/components/layout/Footer.tsx` — `batchLocation` (`İstanbul`) gösterimi kaldırıldı.
  - `src/pages/HomePage.tsx` — Hero showcase slug/görsel yolu (`findikli-kakao-truf`) güncellendi; 3 fazladan eyebrow etiketi kaldırıldı.
  - `src/pages/AboutPage.tsx` — Görsel yolu (`antep-fistikli-rulo-lokum.webp`) güncellendi.
  - `src/pages/InfoPage.tsx` — Fazladan `attributionsEyebrow` etiketi kaldırıldı.
- **Güncellenen görsel ve doküman dosyaları:**
  - `public/images/products/*.webp` ve `*-400.webp` — 10 ürünün 20 görsel dosyası yeni slug'larla yeniden adlandırıldı.
  - `public/images/products/manifest.json` — 10 ürün kaydı yeni slug/yollarla güncellendi, açıklamalardaki doğrulanamayan ifadeler temizlendi.
  - `docs/STYLE.md` — Ek 2, Ek 3, Ek 4 ve Ek 14 için `"uygulanmaz: sahte veri riski"` notu eklendi.
  - `brand/BRAND.md` — Bölüm 7 (Marka Sesi ve Metin Rehberi) temizlenmiş kurallara ve slogan sınırına göre güncellendi.

## 3. Doğrulama Çıktıları

### `node scripts/scan-ai-text.mjs`
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

### `npx tsc --noEmit` & `npm run build`
- `npx tsc --noEmit`: Hatasız tamamlandı (exit code `0`).
- `npm run build` (`tsc -b && vite build`): Hatasız tamamlandı (`dist/` üretildi, 2646 modül dönüştürüldü).
