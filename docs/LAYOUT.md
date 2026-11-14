# Lüpük — Arayüz Yerleşimi ve Mimari Rehberi (`docs/LAYOUT.md`)

> **Kapsam:** Bu doküman, **Lüpük** şekerleme ve atıştırmalık e-ticaret sitesinin rota haritasını, bileşen envanterini, tüm sayfalar için masaüstü ve mobil ASCII wireframe'lerini ve gelecek özellikler için genişleme noktalarını tanımlar. Görsel stil kuralları [STYLE.md](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/docs/STYLE.md) ve marka kimliği [BRAND.md](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/brand/BRAND.md) ile uyumludur.

---

## 1. Rota Haritası (Route Map)

Tüm sayfalar `src/App.tsx` içinde `BrowserRouter` + `React.lazy` + `Suspense` ile kod bölünmeli (code-split) olarak yüklenir ve ortak `SiteLayout` kabuğu içinde sunulur.

| Rota | Sayfa Bileşeni | Amaç |
| :--- | :--- | :--- |
| `/` | `HomePage` | Çok ritimli vitrin: Hero, kayan ticker, kategori sekmeleri, Embla karusel + ilerleme çubuğu, dama bandı, retro OS diyalog kutusu, polaroid/yapışkan not blokları |
| `/shop` | `ShopPage` | Tüm ürünler: kategori filtresi, Fuse.js arama, Radix fiyat aralığı slider'ı, sıralama, ambalaj kartı ızgarası |
| `/shop/:category` | `ShopPage` | Belirli bir kategoriye ön-filtreli mağaza görünümü (ör. `/shop/sert-seker`, `/shop/jelibon`) |
| `/product/:slug` | `ProductDetailPage` | Sol teknik/aroma bilgisi + sağ büyük görsel ve küçük görsel şeridi + aroma/renk örnekleri + akordeon bilgi panelleri + "Bunlar da hoşuna gidebilir" |
| `/cart` | `CartPage` | Tam sayfa sepet yönetimi, adet artır/azalt/sil/temizle ve fiş görünümlü özet kartı |
| `/checkout` | `CheckoutPage` | Açık demo uyarılı teslimat adresi formu, doğrulama ve simüle edilmiş sipariş onayı |
| `/about` | `AboutPage` | Lüpük marka hikâyesi, üretim yaklaşımı ve 6 kategori ambalaj vitrini |
| `/info` | `InfoPage` | Teslimat, iade koşulları ve SSS (Sıkça Sorulan Sorular) yer tutucu bilgi merkezi |
| `*` | `NotFoundPage` | Gerçek 404 sayfası — kayıp poşet temalı yönlendirme |

---

## 2. Bileşen Envanteri

### Yerleşim (`src/components/layout/`)
- **`SiteLayout.tsx`**: `Header` + `<main>` (`Outlet`) + `Footer` + `CartDrawer` global yerleşim kabuğu.
- **`Header.tsx`**: Yapışkan hap menü (`rounded-full`, `2px` `#2B1410` kontur), yatay logo, gezinme bağlantıları, Fuse.js arama modalı tetikleyicisi, canlı adet rozetli sepet çekmecesi tetikleyicisi ve mobil çekmece menüsü.
- **`Footer.tsx`**: Gezinme sütunları, kategori kısayolları, mono parti/telif satırı ve alt kenardan kırpılmış dev `lüpük` marka yazısı (`overflow-hidden`).

### Ambalaj & Etkileşim (`src/components/packaging/`)
- **`PackCard.tsx`**: Isı yapıştırma zikzak üst kenar, `-6deg` yıldız patlaması fiyat rozeti, `NET ...g` mono etiketi, aroma şeridi, `#FFFFFF` kare ürün görseli alanı, başlık, kalp (favori) ve sepet (ekle) yuvarlak butonları.
- **`TickerStrip.tsx`**: Sonsuz yatay kayan bant; pop vurgu mesajları ve ayırıcı parıltılar.
- **`CategoryTabs.tsx`**: `@radix-ui/react-tabs` tabanlı 6 kategori sekmesi.
- **`RetroDialog.tsx`**: Eski işletim sistemi penceresi görünümlü, iki butonlu (`"Evet"` / `"Evet, severim"`) etkileşimli kutu.
- **`CartDrawer.tsx`**: `@radix-ui/react-dialog` tabanlı erişilebilir sağdan açılan sepet çekmecesi (`artir`, `azalt`, `sil`, `temizle`, ara toplam, `/cart` ve `/checkout` bağlantıları).

### Durum & Kancalar (`src/store/`, `src/hooks/`, `src/lib/`)
- **`src/store/cartStore.ts`**: Zustand + `localStorage` (`lupuk-cart-v1`) kalıcı sepet ve favori deposu (`ekle`, `artir`, `azalt`, `sil`, `temizle`, `toggleFavorite`). Giriş gerektirmez.
- **`src/hooks/useProductSearch.ts`**: `fuse.js` tabanlı bulanık (fuzzy) ürün arama kancası.
- **`src/lib/catalog.ts`**: Kategori/ürün yardımcı sorguları (`getProductBySlug`, `getProductsByCategory`, `formatPrice` vb.).

---

## 3. Masaüstü & Mobil ASCII Wireframe'ler

### 3.1. Ana Sayfa (`/`)

**Masaüstü (`>= 1024px`)**
```text
+-----------------------------------------------------------------------+
| [lüpük]     ( Mağaza )  ( Hikâyemiz )  ( Bilgi )     [Ara]  [Sepet 2] |  <- Hap Menü (Header)
+-----------------------------------------------------------------------+
|  [PARTİ #24-08]                                                       |
|  Aç, kıtırdat, gülümse.          +-------------------------------+    |
|  Günlük taze şekerleme           |   [Hero Ambalaj / Mühür]      |    |
|  poşetleri burada.               |   * 4.9 Puan Rozeti           |    |
|  ( Mağazaya Git ) ( Bu Hafta )   +-------------------------------+    |
+-----------------------------------------------------------------------+
| >>> GÜNLÜK TAZE PARTİ ★ ŞEKERLEME POŞETİ ★ SIFIR BAHANE >>>           |  <- TickerStrip
+-----------------------------------------------------------------------+
|  Kategorilere Göre Poşetler                                           |
|  [Tümü] [Sert Şeker] [Jelibon] [Çikolata] [Lolipop] [Lokum] [Tuzlu]   |  <- CategoryTabs
|  +----------+  +----------+  +----------+  +----------+               |
|  |/\/\/\/\/\|  |/\/\/\/\/\|  |/\/\/\/\/\|  |/\/\/\/\/\|  <- Zikzak    |
|  | [AROMA]  |  | [AROMA]  |  | [AROMA]  |  | [AROMA]  |               |
|  |  [Görsel]|  |  [Görsel]|  |  [Görsel]|  |  [Görsel]|  (* Fiyat)    |
|  | NET 140g |  | NET 120g |  | NET 150g |  | NET 110g |               |
|  | Ad  [♥][+]| | Ad  [♥][+]| | Ad  [♥][+]| | Ad  [♥][+]|               |
|  +----------+  +----------+  +----------+  +----------+               |
+-----------------------------------------------------------------------+
|  Öne Çıkanlar (Embla Karusel)                         [←] [→]         |
|  [ PackCard ]  [ PackCard ]  [ PackCard ]  [ PackCard ]               |
|  [========--------] İlerleme Çubuğu                 ( Daha Fazla -> ) |
+-----------------------------------------------------------------------+
|  ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □ ■ □  |  <- Dama Bandı
+-----------------------------------------------------------------------+
|  +---------------------------------+   +---------------------------+  |
|  | [=] şekerleme_onayı.exe     [x] |   |  [Mandallı Polaroid 1]    |  |
|  |  Poşeti hışırdatmaya hazır      |   |  (Eğik yapışkan not)      |  |
|  |  mısın?                         |   +---------------------------+  |
|  |   [ Evet ]   [ Evet, severim ]  |   |  [Mandallı Polaroid 2]    |  |
|  +---------------------------------+   +---------------------------+  |
+-----------------------------------------------------------------------+
|  Mağaza  |  Bilgi  |  PARTİ #24-08 · İstanbul                         |
|  ===================================================================  |
|                         l ü p ü k                                     |  <- Alttan kırpılı dev yazı
+-----------------------------------------------------------------------+
```

**Mobil (`< 768px`)**
```text
+-------------------------------+
| [lüpük]        [Ara] [Sepet]≡ |
+-------------------------------+
| [PARTİ #24-08]                |
| Aç, kıtırdat, gülümse.        |
| ( Mağazaya Git )              |
| +---------------------------+ |
| |   [Hero Ambalaj Görseli]  | |
| +---------------------------+ |
+-------------------------------+
| >>> GÜNLÜK TAZE PARTİ >>>     |
+-------------------------------+
| [Sert Şeker] [Jelibon] ... -> |
| +---------------------------+ |
| |/\/\/\/\/\/\/\/\/\/\/\/\/\/| |
| |        PackCard           | |
| +---------------------------+ |
+-------------------------------+
| Karusel (1-1.2 kart görünür)  |
| [=====------]  ( Daha Fazla ) |
+-------------------------------+
| [=] şekerleme_onayı.exe   [x] |
|  [ Evet ]  [ Evet, severim ]  |
+-------------------------------+
| [Polaroid 1]                  |
| [Polaroid 2]                  |
+-------------------------------+
| Linkler                       |
|           l ü p ü k           |
+-------------------------------+
```

---

### 3.2. Mağaza (`/shop` ve `/shop/:category`)

**Masaüstü**
```text
+-----------------------------------------------------------------------+
| Ana Sayfa / Mağaza / [Kategori]                                       |
| MAĞAZA VİTRİNİ                                     (24 ürün listeli)  |
+-----------------------------------------------------------------------+
| [ Ara: "ekşi vişne..." ]   Fiyat: [===o----o===] 0₺–500₺  [Sırala v]  |
| [Tümü] [Sert Şeker] [Jelibon] [Çikolata] [Lolipop] [Lokum] [Tuzlu]    |
+-----------------------------------------------------------------------+
|  +----------+  +----------+  +----------+  +----------+               |
|  | PackCard |  | PackCard |  | PackCard |  | PackCard |               |
|  +----------+  +----------+  +----------+  +----------+               |
|  +----------+  +----------+  +----------+  +----------+               |
|  | PackCard |  | PackCard |  | PackCard |  | PackCard |               |
|  +----------+  +----------+  +----------+  +----------+               |
+-----------------------------------------------------------------------+
```

**Mobil**
```text
+-------------------------------+
| Ana Sayfa / Mağaza            |
| [ Ara...                    ] |
| [Tümü] [Sert Şeker] ... ->    |
| Fiyat: [==o---o==] [Sırala v] |
+-------------------------------+
| +------------+ +------------+ |
| |  PackCard  | |  PackCard  | |
| +------------+ +------------+ |
+-------------------------------+
```

---

### 3.3. Ürün Detay (`/product/:slug`)

**Masaüstü**
```text
+-----------------------------------------------------------------------+
| Ana Sayfa / Mağaza / Sert Şeker / Ekşi Vişne Cam Şekeri               |
+------------------------------------+----------------------------------+
| [SERT ŞEKER]  [PARTİ #24-08]       |  +----------------------------+  |
| Ekşi Vişne Cam Şekeri              |  |                            |  |
| [VİŞNE & LİMON]  (* 149₺ )         |  |      BÜYÜK ÜRÜN GÖRSELİ    |  |
|                                    |  |         (1:1 Kare)         |  |
| Kısa açıklama metni...             |  |                            |  |
|                                    |  +----------------------------+  |
| Aroma / Seçenek Örnekleri:         |  [Küçük 1] [Küçük 2] [Küçük 3]   |
| (● Vişne) (○ Limon)                |                                  |
|                                    |                                  |
| NET 140g    Adet: [- 1 +]          |                                  |
| ( Sepete Ekle )      [ ♥ ]         |                                  |
|                                    |                                  |
| +--------------------------------+ |                                  |
| | + İçindekiler                  | |  <- Boşsa: "Bilgi eklenecek"     |
| | + Alerjenler                   | |  <- Boşsa: "Bilgi eklenecek"     |
| | + Kargo & Saklama              | |                                  |
| +--------------------------------+ |                                  |
+------------------------------------+----------------------------------+
| Bunlar da hoşuna gidebilir                                            |
| [ PackCard ]   [ PackCard ]   [ PackCard ]   [ PackCard ]             |
+-----------------------------------------------------------------------+
```

**Mobil**
```text
+-------------------------------+
| Ana Sayfa / ... / Ürün        |
| +---------------------------+ |
| |     BÜYÜK ÜRÜN GÖRSELİ    | |
| +---------------------------+ |
| [Küçük 1] [Küçük 2] [Küçük 3] |
| [SERT ŞEKER]   (* 149₺ )      |
| Ekşi Vişne Cam Şekeri         |
| (● Vişne) (○ Limon)           |
| [- 1 +]  ( Sepete Ekle ) [♥]  |
| [+ İçindekiler]               |
| [+ Alerjenler]                |
| Bunlar da hoşuna gidebilir    |
| [ PackCard ] [ PackCard ]     |
+-------------------------------+
```

---

### 3.4. Sepet (`/cart`)

```text
Masaüstü:                                  Mobil:
+---------------------------------------+  +---------------------------+
| SEPETİNİZ (3 Ürün)        [Temizle]   |  | SEPETİNİZ (3)   [Temizle] |
+-----------------------+---------------+  +---------------------------+
| [Görsel] Ürün Adı     | /\/\/\/\/\/\  |  | [Görsel] Ürün Adı  [- 1 +]|
| Aroma · 140g  [- 2 +] | SEPET FİŞİ    |  | [Görsel] Ürün Adı  [- 2 +]|
| 149₺          [Sil]   | Ara Toplam    |  +---------------------------+
|-----------------------| Kargo: Demo   |  | /\/\/\/\/\/\/\/\/\/\/\/\/ |
| [Görsel] Ürün Adı     | TOPLAM: 447₺  |  | TOPLAM: 447₺              |
| ...                   | (Ödemeye Geç) |  | ( Ödemeye Geç )           |
+-----------------------+---------------+  +---------------------------+
```

---

### 3.5. Demo Ödeme (`/checkout`)

```text
+-----------------------------------------------------------------------+
| [!] DEMO UYARISI: Bu sayfa yalnızca arayüz demosudur. Gerçek ödeme    |
|     alınmaz ve gerçek sipariş oluşturulmaz.                           |
+------------------------------------+----------------------------------+
| Teslimat Bilgileri                 | Sipariş Özeti (Fiş Kartı)        |
| Ad Soyad:    [__________________]  | - Ürün A x2               298₺   |
| E-posta:     [__________________]  | - Ürün B x1               149₺   |
| Telefon:     [__________________]  | -------------------------------- |
| Şehir:       [__________________]  | Toplam:                   447₺   |
| Adres:       [__________________]  |                                  |
| ( Demo Siparişi Tamamla )          |                                  |
+------------------------------------+----------------------------------+
```

---

### 3.6. Hakkımızda (`/about`), Bilgi (`/info`) ve 404 (`*`)

- **`/about`**: Üstte marka manifestosu ve vintage çerçeveli/polaroid vitrin bloğu, ortada 6 kategori ambalaj rengi ve doku kartları, altta şeffaf üretim notları.
- **`/info`**: Teslimat süreleri, iade koşulları ve Radix Accordion tabanlı SSS yer tutucu blokları (iletişim/form yok, yalnızca bilgi kartları).
- **`*` (`NotFoundPage`)**: `"404 — Bu poşet boş çıktı!"` retro hata kartı, ana sayfa ve mağaza butonları.

---

## 4. Genişleme Noktası: Opsiyonel "Kendi Poşetini Doldur" (Oylama İçin)

Kullanıcı oylamasında seçilmesi hâlinde **"Kendi Poşetini Doldur"** özelliği mevcut mimariye kırıcı değişiklik yapmadan eklenebilir:

1. **Rota Genişlemesi:** `src/App.tsx` içine `<Route path="/mix" element={<MixBuilderPage />} />` eklenir.
2. **Sepet Store (`src/store/cartStore.ts`):** `CartItem` arayüzünde opsiyonel `isCustomMix?: boolean` ve `mixItems?: Array<{ slug: string; name: string; grams: number }>` alanları için yer ayrılmıştır.
3. **Bileşen Yeniden Kullanımı:** `PackCard` içinde seçilebilir "Poşete Ekle (+50g)" modu veya `MixSlot` kabuğu ile 4–6 bölmeli bir poşet tepsisi oluşturulabilir; tamamlanan özel poşet tek bir `CartItem` olarak sepete atılır.
