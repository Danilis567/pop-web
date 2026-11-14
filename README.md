# Lüpük — Pop Ambalaj Hissinde Şekerci Sitesi

**Lüpük**, eski şeker ve atıştırmalık paketlerinin ambalaj dilinden (zikzak kesim, yıldız patlaması fiyat rozeti, mono net ağırlık, parti kodu) esinlenen modern bir e-ticaret vitrinidir.

## Kurulum & Geliştirme

```bash
npm install
npm run dev
```

Üretim derlemesi:

```bash
npm run build
npm run preview
```

## Ürün Nasıl Eklenir?

1. `800×800` ve `400×400` (`-400.webp`) saf beyaz (`#FFFFFF`) zeminli WebP görselleri `public/images/products/` altına koyun (`<= 80 KB`) ve `public/images/products/manifest.json` kaydını ekleyin.
2. `src/data/products.js` içindeki `products` dizisine yeni ürünü ekleyin (`ingredients: null`, `allergens: null` bırakıldığında arayüz `"Bilgi eklenecek"` gösterir; mevcut fiyatlar yer tutucudur).

## Önemli Notlar

- **Demo Checkout:** `/checkout` sayfası yalnızca istemci tarafında adres formu doğrulaması yapar; gerçek ödeme almaz ve sipariş göndermez. Sepet verileri tarayıcı `localStorage` içinde saklanır.
- **`ref/` Klasörü:** `pop/ref/` yalnızca tasarım referansıdır; `.gitignore` ile hariç tutulmuştur, GitHub'a gönderilmez ve `dist/` build çıktısına dahil edilmez.
