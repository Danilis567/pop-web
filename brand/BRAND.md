# Lüpük — Marka Kimliği ve Tasarım Rehberi (`brand/BRAND.md`)

> **Kapsam:** Bu doküman, pop ambalaj hissinde şekerleme ve atıştırmalık e-ticaret markası için sıfırdan oluşturulan özgün marka kimliğini, görsel sistemi, tipografiyi, ambalaj etiket kurallarını, marka sesini ve ürün görseli üretim standartlarını tanımlar. Temel görsel prensipler [STYLE.md](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/docs/STYLE.md) ile uyumludur; hiçbir mevcut marka, logo veya ambalaj taklit edilmez.

---

## 1. Marka Adı ve Seçim Gerekçesi

### Sunulan 2 Özgün Alternatif

1. **Lüpük** *(Seçilen Marka)*
   - **Köken & Çağrışım:** Türkçedeki *"tek lokmada keyifle yemek"* anlamındaki **"lüp"** ses yansıması ile samimi küçültme eki **"-ük"** birleşiminden türetilmiş özgün bir kelimedir.
   - **Karakter:** Kısa, ritmik, dudak hareketiyle neşeli okunan, ambalaj üzerinde dev tipografiyle güçlü duran modern bir şekerleme markası adı.
2. **Şıkırdak** *(Alternatif)*
   - **Köken & Çağrışım:** Şeker kavanozunu veya paketini sallayınca çıkan *"şıkır şıkır"* sesten türetilmiştir.
   - **Karakter:** Nostaljik bakkal ve drajeli şeker hissi verir; ancak 8 harfli uzunluğu mobil kartlarda, favicon rozetlerinde ve alttan kırpılmış footer tipografisinde **Lüpük** kadar kompakt değildir.

### Seçim Gerekçesi: Neden **Lüpük**?
- **5 Harfli Kompakt Güç:** `lüpük` kelimesi hem ambalaj etiketlerinde hem mobil üst menüde hem de footer'daki dev ekran tipografisinde tek satıra rahatça sığar.
- **Ses ve Doku Uyumluğu:** Yumuşak ünlüler (`ü`) yuvarlak pop tipografiyle (`Fredoka`), sert ünsüzler (`p`, `k`) ise çıtır ve patlayan atıştırmalık hissiyle örtüşür.
- **Marka İşareti Potansiyeli:** İki `ü` harfinin noktaları ambalaj üzerindeki iki şeker tanesine veya gülen bir yüze doğal olarak dönüşür.

### Web Çakışma Kontrolü (`search_web`)
- `"Lüpük" şeker OR atıştırmalık OR gıda` ve `"Şıkırdak" şeker OR atıştırmalık OR marka` sorgularıyla web taraması yapılmıştır.
- **Sonuç:** Türkiye'de veya uluslararası pazarda bilinen bir şekerleme, çikolata ya da atıştırmalık markasıyla doğrudan bir isim çakışması bulunmamıştır (`Lüpük` araması yalnızca tarihsel *lohuk* tatlısı veya *Lorin* gibi farklı kelimelerle ses benzerliği sonuçları döndürmüştür).
- **Yasal Not:** Bu kontrol yalnızca arama motoru üzerinden yapılmış ön incelemedir; **resmi marka tescil sorgusu (TÜRKPATENT / WIPO) yapılmamıştır.** Ticari lansman öncesinde resmi sınıf (30. sınıf) tescil araştırması yapılmalıdır.

---

## 2. Logo Sistemi ve Kullanım Kuralları

Tüm logolar hiçbir hazır ikona veya mevcut markaya dayanmadan, `2px–3.5px` koyu kakao konturlu zikzak ambalaj mührü ve özel geometrik `lüpük` harfleriyle elle vektörel olarak kurulmuştur.

### Logo Dosyaları (`public/brand/`)
| Varyant | Dosya | Boyut (`viewBox`) | Kullanım Alanı |
| :--- | :--- | :--- | :--- |
| **Ana Logo** | [logo-main.svg](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/public/brand/logo-main.svg) | `320 × 140` | Hero rozeti, ambalaj ön yüzü, açılış ekranı, baskı etiketleri |
| **Yatay Logo** | [logo-horizontal.svg](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/public/brand/logo-horizontal.svg) | `248 × 64` | Üst gezinme çubuğu (navbar), fatura/sepet başlığı |
| **Küçük İşaret (Mark)** | [logo-mark.svg](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/public/brand/logo-mark.svg) | `64 × 64` | Favicon, mobil uygulama ikonu, sosyal medya avatarı, mühür damgası |
| **Tek Renk (Mono)** | [logo-mono.svg](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/public/brand/logo-mono.svg) | `248 × 64` | `currentColor` destekli; koyu zeminler, kargo kutusu baskısı, fiş kartları |

### Güvenli Boşluk (Clear Space) ve Minimum Boyutlar
- **Güvenli Boşluk:** Logonun dört kenarında en az `logo-mark` yüksekliğinin **`0.25×`** kadarı (yatay logoda en az `16px`) boşluk bırakılmalıdır. Bu alana metin, rozet veya zikzak kenar çizgisi giremez.
- **Minimum Boyutlar:**
  - `logo-main.svg`: Dijitalde minimum genişlik **`180px`**, baskıda **`48mm`**.
  - `logo-horizontal.svg`: Dijitalde minimum genişlik **`132px`** (yükseklik `34px`), baskıda **`35mm`**.
  - `logo-mark.svg`: Dijitalde minimum **`24 × 24px`** (favicon `16px` için basitleştirilmiş kontur kabul edilir).

### Yasak Kullanımlar
- Logoyu orantısız esnetmek, eğmek veya perspektifle bükmek yasaktır.
- Logo içine renk geçişi (gradyan) veya bulanık drop-shadow eklemek yasaktır (yalnızca tanımlı sert `#2B1410` ofset gölge kullanılır).
- Düşük kontrastlı zeminler üzerine (örneğin kırmızı logonun kırmızı kart üzerine) kontursuz yerleştirmek yasaktır.
- `lüpük` harflerinin üzerindeki renkli şeker noktalarını silmek veya başka fontla yeniden yazmak yasaktır.

---

## 3. Renk Paleti ve WCAG AA Kontrast Tablosu

Tasarım dili **düz, doygun ve gradyansız** yüzeylere dayanır. Siyah (`#000000`) yerine tüm metinlerde, çerçevelerde ve sert gölgelerde sıcak **Kakao Mürekkebi (`#2B1410`)** kullanılır.

### Zemin ve Koyu Kontrastlar
| Token | Adı | Hex | Kullanım |
| :--- | :--- | :--- | :--- |
| `--color-cream` | Krem Kâğıt | `#FFF8EE` | Ana sayfa zemini, ürün etiketi arka planı |
| `--color-cream-alt` | Yumuşak Krem | `#FDF1DF` | İkincil kartlar, defter/fiş blokları |
| `--color-white` | Saf Beyaz | `#FFFFFF` | Ürün fotoğrafı arka planı, sticker kesim konturu |
| `--color-ink` | Kakao Mürekkebi | `#2B1410` | Ana metinler, `2px` dış konturlar, sert pop gölgeler |
| `--color-ink-soft` | Espresso Bordo | `#4A231E` | Yardımcı metinler, alt açıklamalar, pasif etiketler |

### 7 Ana Pop Renk (+2 Destekleyici Ambalaj Tonu)
| Token | Adı | Hex | Kullanım Rolü |
| :--- | :--- | :--- | :--- |
| `--color-tomato` | Domates Kırmızısı | `#C8281C` | Birincil CTA, fiyat patlama rozeti, Sert Şeker |
| `--color-pink` | Şeker Pembesi | `#FF6FA8` | Yan bantlar, kampanya şeridi, Lolipop & Sakız |
| `--color-butter` | Tereyağı Sarısı | `#FFD447` | Yıldız rozetler, öne çıkan vurgu, Tuzlu & Kıtır |
| `--color-powder-blue` | Toz Mavi | `#8ECAE6` | Ferah kart zeminleri, Yumuşak & Jelibon |
| `--color-deep-blue` | Derin Mavi | `#1E4DD8` | İkincil güçlü aksiyon, bağlantılar, parti rozetleri |
| `--color-lime` | Limon Yeşili | `#9AE63B` | Ekşi/taze rozetler, kayan ticker vurguları |
| `--color-tangerine` | Mandalina Turuncusu | `#FF7A22` | Sınırlı stok uyarıları, sıcak vurgu etiketleri |
| `--color-lavender` | Lavanta *(Destek)* | `#C9A7FF` | Geleneksel & Lokum kategorisi, yumuşak paneller |
| `--color-cocoa` | Kavrulmuş Kakao *(Destek)* | `#6E352C` | Çikolata Kaplı kategorisi, koyu ürün kartları |

### Kullanım Oranları (60 / 30 / 10 Dengesi)
- **%60 Sakin Zemin:** `#FFF8EE` ve `#FDF1DF` krem tonları (gözü yormayan okuma ve ürün sergileme alanı).
- **%30 Yapısal Pop & Kontur:** Kategori karoları (`#8ECAE6`, `#FFD447`, `#FF6FA8`, `#C9A7FF`), `#2B1410` metin ve `2px` çerçeveler.
- **%10 Yüksek Enerji Vurgusu:** `#C8281C` birincil butonlar, `#1E4DD8` link/etiketler, `#9AE63B` ve `#FF7A22` mikro rozetler.

### WCAG AA Kontrast Tablosu (Hesaplanmış Gerçek Oranlar)
*Kriter: Normal metin ≥ `4.5:1`, Büyük metin (≥18pt / 14pt bold) ve UI bileşenleri ≥ `3.0:1`.*

| Ön Plan (Metin) | Arka Plan (Zemin) | Kontrast Oranı | WCAG AA Durumu |
| :--- | :--- | :---: | :--- |
| `#2B1410` (Kakao Mürekkebi) | `#FFF8EE` (Krem Kâğıt) | **16.45:1** | AA / AAA Geçer (Tüm boyutlar) |
| `#2B1410` (Kakao Mürekkebi) | `#FDF1DF` (Yumuşak Krem) | **15.55:1** | AA / AAA Geçer (Tüm boyutlar) |
| `#4A231E` (Espresso Bordo) | `#FFF8EE` (Krem Kâğıt) | **12.84:1** | AA / AAA Geçer (Tüm boyutlar) |
| `#2B1410` (Kakao Mürekkebi) | `#FFD447` (Tereyağı Sarısı) | **12.20:1** | AA / AAA Geçer (Tüm boyutlar) |
| `#2B1410` (Kakao Mürekkebi) | `#9AE63B` (Limon Yeşili) | **11.37:1** | AA / AAA Geçer (Tüm boyutlar) |
| `#2B1410` (Kakao Mürekkebi) | `#8ECAE6` (Toz Mavi) | **9.70:1** | AA / AAA Geçer (Tüm boyutlar) |
| `#FFF8EE` (Krem Kâğıt) | `#6E352C` (Kavrulmuş Kakao) | **9.02:1** | AA / AAA Geçer (Tüm boyutlar) |
| `#2B1410` (Kakao Mürekkebi) | `#C9A7FF` (Lavanta) | **8.64:1** | AA / AAA Geçer (Tüm boyutlar) |
| `#2B1410` (Kakao Mürekkebi) | `#FF6FA8` (Şeker Pembesi) | **6.69:1** | AA Geçer (Tüm boyutlar) |
| `#2B1410` (Kakao Mürekkebi) | `#FF7A22` (Mandalina) | **6.66:1** | AA Geçer (Tüm boyutlar) |
| `#FFF8EE` (Krem Kâğıt) | `#1E4DD8` (Derin Mavi) | **6.41:1** | AA Geçer (Tüm boyutlar) |
| `#FFF8EE` (Krem Kâğıt) | `#C8281C` (Domates Kırmızısı) | **5.27:1** | AA Geçer (Tüm boyutlar) |

---

## 4. 6 Ürün Kategorisi ve Ambalaj Renkleri

Her kategori mağaza vitrininde ve ürün poşetlerinde kendi sabit ambalaj rengiyle tanınır:

| # | Kategori Slug | Görünen Ad | Ambalaj Rengi (Hex) | Üzerindeki Metin | Ambalaj Hissi & Doku Notu |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | `sert-seker` | **Sert Şeker** | `#C8281C` (Domates Kırmızısı) | `#FFF8EE` | Parlak cam şeker, ekşi limon/vişne dolgulu, yüksek enerjili etiket |
| 2 | `jelibon` | **Yumuşak & Jelibon** | `#8ECAE6` (Toz Mavi) | `#2B1410` | Esnek, meyve sulu, şeker kaplı ekşi/tatlı yumuşak parçalar |
| 3 | `cikolata-kapli` | **Çikolata Kaplı** | `#6E352C` (Kavrulmuş Kakao) | `#FFF8EE` | Drajeler, fındık/badem kaplamalar, yoğun kakao-bordo kontrastı |
| 4 | `lolipop-sakiz` | **Lolipop & Sakız** | `#FF6FA8` (Şeker Pembesi) | `#2B1410` | Çubuklu şekerler, şişen meyveli sakızlar, patlayan şeker poşetleri |
| 5 | `geleneksel` | **Geleneksel & Lokum** | `#C9A7FF` (Lavanta) | `#2B1410` | Güllü, fıstıklı, narlı lokumlar; akide ve modernleşmiş klasik tatlar |
| 6 | `tuzlu-atistirmalik` | **Tuzlu & Kıtır** | `#FFD447` (Tereyağı Sarısı) | `#2B1410` | Kavrulmuş mısır, baharatlı kraker, çıtır nohut ve tuzlu krokan |

---

## 5. Tipografi Sistemi (4 Google Fonts Ailesi)

Başlık–gövde ayrımını güçlendirmek ve uzun okuma/form/etiket metinlerinde göz yormayan netlik sağlamak için **4 Google Fonts ailesi** kullanılır:

1. **`Fredoka`** *(Ağırlıklar: 500, 600, 700)* — **Ana Display & Başlıklar**
   - Kalın, yuvarlak uçlu ve neşeli geometrik yapı; ana başlıklar, butonlar, kart başlıkları ve footer'daki alttan kırpılmış dev `lüpük` yazısı.
2. **`Plus Jakarta Sans`** *(Ağırlıklar: 400, 500, 600, 700)* — **Sakin Gövde Sans**
   - Yuvarlak display başlıkların yanında gövde metinlerinde, ürün açıklamalarında, SSS ve form alanlarında yüksek okunabilirlik ve sakin tipografik denge sağlar. `Fredoka`'nın her satırda tekrar etmesinden doğan tekdüzeliği kırarak başlık–gövde ağırlık ve karakter farkını netleştirir.
3. **`Fraunces`** *(Ağırlıklar: 600 Italic, 700 Italic)* — **Editöryel Vurgu**
   - Seçili vitrin başlıklarındaki tekil vurgu kelimeleri, hikâye alıntıları ve şekerleme notları.
4. **`DM Mono`** *(Ağırlıklar: 400, 500)* — **Ambalaj Teknik Bilgisi**
   - Net ağırlık (`NET 140g`), parti kodu (`PARTİ #26-01`), kategori breadcrumb, fiyat rozeti kuruşları ve ürün etiketi tablosu.

### Tipografi Ölçeği ve Kurallar
| Rol | CSS Token | Boyut | Font & Ağırlık | Satır Yüksekliği |
| :--- | :--- | :--- | :--- | :---: |
| Footer Dev Yazı | `--text-footer-wordmark` | `clamp(5rem, 18vw, 15rem)` | `Fredoka 700` | `0.82` (alttan kırpılı) |
| Hero Başlık | `--text-hero` | `clamp(2.75rem, 6vw, 4.75rem)` | `Fredoka 700` + `Fraunces Italic` | `1.05` |
| Bölüm Başlığı | `--text-3xl` / `--text-2xl` | `40px` / `30px` | `Fredoka 700` | `1.12` |
| Kart Başlığı | `--text-lg` | `18px` | `Fredoka 600` | `1.25` |
| Gövde Metni | `--text-base` | `16px` | `Plus Jakarta Sans 400/500` | `1.55` |
| Teknik Etiket | `--text-xs` / `--text-sm` | `12px` / `14px` | `DM Mono 500` | `1.3` (BÜYÜK HARF, `+0.06em` harf aralığı) |

---

## 6. Ambalaj Etiket Sistemi ve Bileşen Ölçüleri

Web arayüzü bir e-ticaret sitesinden çok **açılmayı bekleyen bir şekerleme poşeti** gibi davranır. Tüm etiketlerde `2px solid #2B1410` kontur ve blur içermeyen sert ofset gölge (`4px 4px 0 #2B1410`) uygulanır.

### A. Temel Ambalaj Bileşenleri
1. **Yıldız Patlaması Fiyat Rozeti (Starburst Price Badge)**
   - **Form:** 12 veya 14 köşeli yıldız patlaması SVG çerçevesi, `-6deg` eğim.
   - **Ölçü:** `76 × 76px` (`--badge-star-size`), kontur `2px solid #2B1410`.
   - **Renk:** Varsayılan `#FFD447` zemin / `#2B1410` yazı; indirimli ürünlerde `#C8281C` zemin / `#FFF8EE` yazı.
   - **İçerik:** Büyük fiyat `Fredoka 700 (20px)`, kuruş/birim `DM Mono 500 (11px)`.
2. **Aroma Şeridi (Flavor Ribbon)**
   - **Form:** Köşe yarıçapı `9999px` (hap) veya kategori kartının üst kenarına oturan şerit.
   - **Ölçü:** Yükseklik `28px` (`--flavor-ribbon-height`), yatay dolgu `12px`, `2px` kontur.
   - **İçerik:** Tek veya iki kelimelik aroma (`VİŞNE & LİMON`, `TUZLU KARAMEL`), `DM Mono 500 (12px)`.
3. **Net Ağırlık & Parti Etiketi (Mono Spec Tag)**
   - **Form:** Keskin veya hafif yuvarlatılmış (`6px`) kutucuk, `#FFF8EE` zemin, `1.5px` kontur.
   - **Ölçü:** Yükseklik `24px` (`--badge-net-weight-height`), yatay dolgu `8px`.
   - **İçerik:** `NET 140g` veya `PARTİ #092`, `DM Mono 400 (12px)`.
4. **Isı Yapıştırma Zikzak Kenar (Heat-Seal Zigzag Edge)**
   - **Form:** Poşet üstü/altı hissini veren tekrarlayan üçgen tırtıklar (SVG/CSS `clip-path` veya `mask-image`).
   - **Ölçü:** Diş genişliği `16px` (`--zigzag-tooth-width`), diş yüksekliği `10px` (`--zigzag-tooth-height`).
   - **Kullanım:** Kampanya banner'larının alt/üst kenarları, sepet fişi ve "haftanın kutusu" kartlarının üst kenarı.

### B. Desen Seti (Pattern Tokens)
- **Yarım Ton Nokta (Halftone Dot):** `10 × 10px` hücre içinde `2px` çapında `%15` opaklıklı `#2B1410` noktalar (kart köşelerinde gölge/doku hissi).
- **Yuvarlak Kareli Dama (Pop Checker):** `20 × 20px` (`--pattern-checker-size`) krem (`#FFF8EE`) ve kategori rengi dönüşümlü şerit; bölüm ayırıcı bantlarda kullanılır.
- **Defter Çizgisi (Notebook Grid):** `24 × 24px` (`--pattern-grid-size`) `#FDF1DF` zemin üzerinde `1px` `#2B1410` (`%10` opaklık) kareli defter kâğıdı; "İçindekiler" ve "Kendi Kutunu Yap" bölümlerinde kullanılır.

---

## 7. Marka Sesi ve Metin Rehberi

**Marka Kişiliği:** Mahalle şekercisinin kısa, düz, samimi sesi. Arada kuru espri (404, boş sepet gibi) olabilir; ne kurumsal ve soğuk ne de yapay zekâ gibi süslüdür.

### 5 Temel Ses Kuralı
1. **Görünür ve Doğrulanabilir Bilgiyle Konuş:** Ürün açıklamalarını (30–110 karakter) tür, şekil, renk ve görselde görünenle sınırla. Ürün adında geçmeyen bileşen veya doğrulanamayan üretim yöntemi yazma.
2. **Kısa ve Çeşitli Yaz:** Etiketlerde 2–4 kelime, kart açıklamalarında 1–2 kısa cümle kullan. Tüm açıklamaları aynı kalıba sokma.
3. **Samimi "Sen" Dili:** Tüm sitede tutarlı "sen" dili kullan (`sakla`, `gir`, `seç`); resmi "siz" eklerinden (`saklayınız`, `giriniz`) kaçın.
4. **Doğrulanamayan İddia Yazma:** Onaylanmamış tazelik ("günlük taze parti", "bugün kavruldu"), bileşim ("glikoz şurupsuz", "gerçek meyve püreli"), ambalaj ("ısı yapıştırmalı", "şeffaf poşet"), teslimat saati/garanti veya sahte indirim (`compareAtPrice`) iddiaları kullanma; belirsiz alanlar için açık yer tutucu göster.
5. **Yasak AI Kalıplarından Kaçın:** `keyif`, `neşeli`, `abartısız`, `lezzet patlaması`, `tatlı anılar`, `çocukluğuna`, `eşsiz`, `özenle`, `tadına doyamayacaksın`, `her lokmada`, `ağzında dans`, `hayata geçir`, `keşfet`, `yolculuk`, `tam kıvamında`, `tam tat`, `sıfır bahane`, `hikâyemiz` gibi klişeleri kullanma.

### Söyle / Söyleme Örnekleri
| Söyle (Lüpük Sesi) | Söyleme (Klişe / Doğrulanamayan İddia) |
| :--- | :--- |
| *"Kırmızı vişne ve sarı limon yarımları aynı gövdede. Önce ekşi, sonra tatlı."* | *"Damaklarda unutulmaz bir lezzet patlaması yaşayın!"* |
| *"İri taneli, gevrek kavrulmuş mısır. İnce tuz kaplamasıyla yüksek sesli kıtırlık."* | *"Bugün kavruldu, çıtırı hâlâ üzerinde!"* |
| *"Sepetin şu an boş. Mağazadan birkaç poşet seçip sepeti doldurabilirsin."* | *"Her anınıza sihirli bir dokunuş katın."* |
| *"Teslimat süreleri ve kargo ücreti netleşince eklenecek."* | *"Hafta içi 15:00'e kadar verilen siparişler aynı gün kargoda!"* |

### Slogan Sınırı
- **Ana Slogan:** *"Aç, kıtırdat, gülümse."*
- **Kullanım Sınırı:** Ana slogan tüm sitede en fazla **2 yerde** (ana sayfa hero başlığı ve varsayılan meta başlığı) kullanılır; ticker, footer veya her sayfa başlığında tekrarlanmaz.
- **Kaldırılan İddia ve Kalıplar:** *"Günlük taze parti, sıfır bahane"*, *"Glikoz şurupsuz"*, *"Bugün kavruldu"* ve doğrulanmamış kargo/iade rakamları kaldırılmıştır (bkz. [CLAIMS_TO_VERIFY.md](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/pop/docs/CLAIMS_TO_VERIFY.md)).

---

## 8. Ürün Görseli Rehberi (Agent 3 İçin Standartlar)

Tüm ürün fotoğrafları ve render'ları web sitesindeki renkli kategori karolarının (`#8ECAE6`, `#FFD447`, `#FF6FA8` vb.) üzerine temizce oturabilmesi için aşağıdaki teknik standartlara uymalıdır:

1. **Arka Plan:** Kesinlikle **saf beyaz (`#FFFFFF`)** zemin. Gradyan, stüdyo fon kumaşı kırışığı veya renkli arka plan kullanılmamalıdır.
2. **Işık Yönü ve Kalitesi:** Üst-sol **45°** açıdan gelen yumuşak, dağınık stüdyo ışığı + sağdan hafif dolgu ışığı. Şeker yüzeylerinde parlak ama patlamayan (doğal) speküler yansımalar korunmalıdır.
3. **Bakış Açısı (Kamera Açısı):** Üstten hafif eğik (**15°–25° yüksek açı**) bakış açısı; ürünün hem üst yüzeyini hem de kalınlığını/dolgusunu gösterir. Dökme şeker/kraker yığınlarında hafif dinamik dağılım tercih edilir.
4. **Temas Gölgesi:** Ürünün tam altında, `#2B1410` tonuna çalan çok hafif, kısa ve **yumuşak temas gölgesi** bırakılmalıdır (uzun sert gölgeler veya havada süzülen dekupeler yasaktır).
5. **Ölçek ve Kadraj:**
   - Kare (`1:1`, önerilen `1000 × 1000px`) format.
   - Ürün, kadrajın merkezinde yer almalı ve toplam alanın **%70–80'ini** doldurmalıdır.
   - Dört kenardan en az **%10–15** güvenli beyaz boşluk bırakılmalıdır ki arayüzde sticker konturu veya köşe rozetleri ürünün üzerini kapatmasın.
