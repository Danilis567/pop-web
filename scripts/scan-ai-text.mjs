import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');
const PUBLIC_DIR = path.join(ROOT, 'public');

function walkFiles(dir, exts = ['.ts', '.tsx', '.js', '.jsx']) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full, exts));
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

function trLower(str) {
  return str.toLocaleLowerCase('tr-TR');
}

function countOccurrences(haystack, needle) {
  const h = trLower(haystack);
  const n = trLower(needle);
  let count = 0;
  let pos = 0;
  while ((pos = h.indexOf(n, pos)) !== -1) {
    count++;
    pos += n.length;
  }
  return count;
}

const srcFiles = walkFiles(SRC_DIR);
const allSrcText = srcFiles
  .map((f) => ({
    file: path.relative(ROOT, f),
    text: fs.readFileSync(f, 'utf8'),
  }));

// 1. Forbidden AI words
const forbiddenWords = [
  'keyif',
  'neşeli',
  'abartısız',
  'lezzet patlaması',
  'tatlı anılar',
  'çocukluğuna',
  'eşsiz',
  'özenle',
  'tadına doyamayacaksın',
  'her lokmada',
  'ağzında dans',
  'hayata geçir',
  'keşfet',
  'yolculuk',
  'tam kıvamında',
  'tam tat',
  'sıfır bahane',
  'hikâyemiz',
  'hikayemiz',
  'hikâyesi',
  'hikayesi',
];

const forbiddenHits = [];
for (const { file, text } of allSrcText) {
  for (const word of forbiddenWords) {
    const c = countOccurrences(text, word);
    if (c > 0) {
      forbiddenHits.push({ file, word, count: c });
    }
  }
}

// 2. Slogan count (count "gülümse" / "kıtırdat" occurrences representing the slogan)
let sloganCount = 0;
for (const { text } of allSrcText) {
  sloganCount += countOccurrences(text, 'kıtırdat');
}

// 3. "taze parti" count
let tazePartiCount = 0;
for (const { text } of allSrcText) {
  tazePartiCount += countOccurrences(text, 'taze parti');
}

// 4. "hışırt" count
let hisirtCount = 0;
for (const { text } of allSrcText) {
  hisirtCount += countOccurrences(text, 'hışırt');
}

// 5. Eyebrow count (keys ending with Eyebrow: in copy.ts)
const copyText = fs.readFileSync(path.join(SRC_DIR, 'content', 'copy.ts'), 'utf8');
const eyebrowMatches = copyText.match(/\w+Eyebrow\s*:/g) || [];
const eyebrowCount = eyebrowMatches.length;

// 6. compareAtPrice count
let compareAtPriceCount = 0;
for (const { text } of allSrcText) {
  compareAtPriceCount += countOccurrences(text, 'compareAtPrice');
}

// 7. Load products.js
const productsMod = await import(pathToFileURL(path.join(SRC_DIR, 'data', 'products.js')).href);
const { products, categories } = productsMod;

// 8. "&" in 24 product names
const ampInProductNames = products.filter((p) => p.name.includes('&')).length;

// 9. "&" in page/section titles (check title/metaTitle/navLinks/pages/categories in copy.ts)
const titleLines = copyText
  .split('\n')
  .filter((line) =>
    /(Title|navLinks\.|pages\.|defaultCategoryNames|\btitle\s*:)/i.test(line)
  );
const ampInTitles = titleLines.filter((line) => line.includes('&')).length;

// 10. Product description length range (30-110 chars)
const badDescriptions = products
  .map((p) => ({
    id: p.id,
    slug: p.slug,
    len: (p.description || '').length,
  }))
  .filter((d) => d.len < 30 || d.len > 110);

// 11. Image files exist on disk
const missingImages = [];
for (const p of products) {
  const full800 = path.join(PUBLIC_DIR, p.image);
  const full400 = path.join(PUBLIC_DIR, p.image.replace(/\.webp$/, '-400.webp'));
  if (!fs.existsSync(full800)) missingImages.push(p.image);
  if (!fs.existsSync(full400)) missingImages.push(p.image.replace(/\.webp$/, '-400.webp'));
}

// 12. "Demo" outside checkout, footerNote, README
const copyWithoutCheckoutAndFooter = copyText
  .replace(/checkout:\s*\{[\s\S]*?\n  \},/, '')
  .replace(/footerNote:[\s\S]*?,/, '')
  .replace(/demoCheckoutWarning:[\s\S]*?,/, '');
const demoOutsideCount = countOccurrences(copyWithoutCheckoutAndFooter, 'demo');

const checks = [
  {
    name: 'Yasak AI kelimeleri = 0',
    pass: forbiddenHits.length === 0,
    detail: forbiddenHits.length === 0 ? '0' : JSON.stringify(forbiddenHits),
  },
  {
    name: 'Slogan <= 2',
    pass: sloganCount <= 2,
    detail: `${sloganCount}/2`,
  },
  {
    name: '"taze parti" <= 2',
    pass: tazePartiCount <= 2,
    detail: `${tazePartiCount}/2`,
  },
  {
    name: '"hışırt" <= 1',
    pass: hisirtCount <= 1,
    detail: `${hisirtCount}/1`,
  },
  {
    name: 'Eyebrow etiketi <= 4',
    pass: eyebrowCount <= 4,
    detail: `${eyebrowCount}/4 (${eyebrowMatches.join(', ')})`,
  },
  {
    name: '"&" ürün adlarında <= 6/24',
    pass: ampInProductNames <= 6,
    detail: `${ampInProductNames}/${products.length}`,
  },
  {
    name: '"&" sayfa/bölüm başlıklarında <= 2',
    pass: ampInTitles <= 2,
    detail: `${ampInTitles}/2`,
  },
  {
    name: 'compareAtPrice yokluğu = 0',
    pass: compareAtPriceCount === 0,
    detail: `${compareAtPriceCount}`,
  },
  {
    name: 'Ürün açıklamaları 30-110 karakter',
    pass: badDescriptions.length === 0,
    detail:
      badDescriptions.length === 0
        ? `24/24 uygun (min=${Math.min(...products.map((p) => p.description.length))}, max=${Math.max(...products.map((p) => p.description.length))})`
        : JSON.stringify(badDescriptions),
  },
  {
    name: 'Ürün görselleri (.webp ve -400.webp) diskte mevcut',
    pass: missingImages.length === 0,
    detail: missingImages.length === 0 ? `${products.length * 2}/${products.length * 2} mevcut` : JSON.stringify(missingImages),
  },
  {
    name: '"Demo" yalnızca /checkout ve Footer tek satırda',
    pass: demoOutsideCount === 0,
    detail: `dışında ${demoOutsideCount} adet`,
  },
];

let allPass = true;
for (const c of checks) {
  const status = c.pass ? 'PASS' : 'FAIL';
  if (!c.pass) allPass = false;
  console.log(`[${status}] ${c.name}: ${c.detail}`);
}

console.log(`\nOVERALL: ${allPass ? 'PASS' : 'FAIL'}`);
process.exit(allPass ? 0 : 1);
