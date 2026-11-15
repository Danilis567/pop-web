# Lüpük — Son Cila Yön Belgesi (`polish/DIRECTION.md`)

## 1. Cila Hedefleri
- **Netlik & Tutarlılık:** Tipografi (`latin-ext`, `tabular-nums`, `text-wrap`), 4/8px boşluk ritmi, yüzey hiyerarşisi ve Türkçe birim/para biçimini (`140 g`, tek para birimi) baştan sona eşitlemek.
- **Durumların Eksiksizliği:** Boş sepet, dolu sepet, açık çekmece, boş filtre sonucu, form doğrulama hataları (`aria-invalid`, `autocomplete`, `inputmode`), `inStock: false` ve 404 durumlarını eksiksiz ve erişilebilir kılmak.
- **Erişilebilirlik (WCAG AA + Klavye):** `axe-core` serious/critical = `0`, Lighthouse Accessibility `≥ 95`, tam klavye gezintisi, rota değişiminde odak/duyuru, ticker duraklatma kontrolü.
- **Performans:** Lighthouse mobil Performance `≥ 90`, LCP `≤ 2.5 s`, CLS `≤ 0.05`, ana JS gzip boyutunu düşürmek (konfeti, Fuse.js, Embla tembel yükleme + görsel önceliklendirme).

## 2. Kırmızı Çizgiler (Dokunulmazlar)
- **Marka Kimliği:** `Lüpük` adı, 4 vektör logo, kakao mürekkebi (`#2B1410`), krem zeminler (`#FFF8EE`, `#FDF1DF`) ve 6 kategori ambalaj rengi DEĞİŞMEZ.
- **Kapsam Dışı:** Yeni özellik, yeni sayfa, dark mode, framework değişimi, fiyat/ürün/kategori değişikliği ve yeni iddia/sertifika/puan eklemek YASAKTIR.
- **`ref/` Kuralı:** `ref/` GitHub'a gitmez, `dist/` içine girmez, kopyalanmaz.

## 3. Skill Çelişki Kuralı
- Herhangi bir tasarım/denetim ilkesi `brand/BRAND.md` veya `DESIGN.md` ile çelişirse **MARKA KAZANIR**. Reddedilen öneri `polish/skill-conflicts.md` dosyasına kaydedilir.
