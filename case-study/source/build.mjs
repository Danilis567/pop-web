import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { renderHtml } from './render-pages.mjs';

const SRC_DIR = import.meta.dirname;
const CASE_DIR = path.resolve(SRC_DIR, '..');
const ROOT = path.resolve(CASE_DIR, '..');
const SHOTS_DIR = path.join(SRC_DIR, 'shots');
const PORT = 4179;
const BASE_URL = `http://localhost:${PORT}`;

fs.mkdirSync(SHOTS_DIR, { recursive: true });
fs.mkdirSync(path.join(CASE_DIR, 'behance/en'), { recursive: true });
fs.mkdirSync(path.join(CASE_DIR, 'behance/tr'), { recursive: true });

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Dev server did not start on ${url}`);
}

function loadAttributions() {
  const copyTs = fs.readFileSync(path.join(ROOT, 'src/content/copy.ts'), 'utf8');
  const match = copyTs.match(/attributions:\s*(\[[\s\S]*?\n\s{4}\])/);
  if (!match) throw new Error('Could not parse attributions from src/content/copy.ts');
  // Safe static array literal evaluation
  return Function(`"use strict"; return (${match[1]});`)();
}

async function captureSiteShots(browser) {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await desktop.newPage();

  // 1. Home + Ticker + RetroDialog
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(450);
  await page.screenshot({ path: path.join(SHOTS_DIR, 'desktop-home.png'), fullPage: true });

  const ticker = page.locator('div:has(> .animate-ticker)').first();
  await ticker.screenshot({ path: path.join(SHOTS_DIR, 'comp-ticker.png') });

  const retro = page.locator('div:has-text("sekerleme_onayi.exe")').filter({ has: page.locator('button') }).last();
  await retro.scrollIntoViewIfNeeded();
  await retro.screenshot({ path: path.join(SHOTS_DIR, 'comp-retrodialog.png') });

  // 2. Shop + Component close-ups + Add to cart for Drawer/Cart/Checkout
  await page.goto(`${BASE_URL}/shop?sort=price-asc`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(SHOTS_DIR, 'desktop-shop.png'), fullPage: true });

  const firstCard = page.locator('article').first();
  await firstCard.screenshot({ path: path.join(SHOTS_DIR, 'comp-packcard.png') });
  await firstCard.locator('div.-rotate-6').first().screenshot({ path: path.join(SHOTS_DIR, 'comp-starburst.png') });
  await firstCard.locator('svg').first().screenshot({ path: path.join(SHOTS_DIR, 'comp-zigzag.png') });

  // Open CartDrawer by adding first product
  await firstCard.locator('button').last().click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(SHOTS_DIR, 'desktop-drawer.png') });

  // 3. PDP, Mix, Cart, Checkout, About, Credits, 404
  const routes = [
    ['desktop-pdp.png', '/product/visne-limon-cam-seker'],
    ['desktop-mix.png', '/mix'],
    ['desktop-cart.png', '/cart'],
    ['desktop-checkout.png', '/checkout'],
    ['desktop-about.png', '/about'],
    ['desktop-credits.png', '/credits'],
    ['desktop-404.png', '/olmayan-sayfa'],
  ];
  for (const [file, route] of routes) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(SHOTS_DIR, file), fullPage: true });
  }
  await desktop.close();

  // 4. Mobile 390x844 @2x
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const mPage = await mobile.newPage();
  for (const [file, route] of [['mobile-home.png', '/'], ['mobile-shop.png', '/shop']]) {
    await mPage.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
    await mPage.waitForTimeout(350);
    await mPage.screenshot({ path: path.join(SHOTS_DIR, file), fullPage: true });
  }
  await mobile.close();
}

async function buildDeck(browser, lang, data) {
  const copy = JSON.parse(fs.readFileSync(path.join(SRC_DIR, `copy.${lang}.json`), 'utf8'));
  const html = renderHtml(copy, data);
  const htmlPath = path.join(SRC_DIR, `deck-${lang}.html`);
  fs.writeFileSync(htmlPath, html, 'utf8');

  const ctx = await browser.newContext({ viewport: { width: 1400, height: 875 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);

  const pdfName = lang === 'en' ? 'Lupuk-Case-Study-EN.pdf' : 'Lupuk-Case-Study-TR.pdf';
  const pdfPath = path.join(CASE_DIR, pdfName);
  await page.pdf({
    path: pdfPath,
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
    outline: true,
  });

  const pages = page.locator('section.page');
  const count = await pages.count();
  const outDir = path.join(CASE_DIR, 'behance', lang);
  for (let i = 0; i < count; i++) {
    const num = String(i + 1).padStart(2, '0');
    await pages.nth(i).screenshot({
      path: path.join(outDir, `${num}.jpg`),
      type: 'jpeg',
      quality: 85,
    });
  }
  await ctx.close();
  return { pdfPath, count };
}

async function buildCover(browser) {
  const logoMain = fs.readFileSync(path.join(ROOT, 'public/brand/logo-main.svg'), 'utf8');
  const prod1 = `data:image/webp;base64,${fs.readFileSync(path.join(ROOT, 'public/images/products/visne-limon-cam-seker.webp')).toString('base64')}`;
  const prod2 = `data:image/webp;base64,${fs.readFileSync(path.join(ROOT, 'public/images/products/orman-meyveli-ayicik.webp')).toString('base64')}`;
  const stylesCss = fs.readFileSync(path.join(SRC_DIR, 'styles.css'), 'utf8');
  const baloo = `file:///${path.join(SRC_DIR, 'node_modules/@fontsource/baloo-2/800.css').replace(/\\/g, '/')}`;
  const mono = `file:///${path.join(SRC_DIR, 'node_modules/@fontsource/jetbrains-mono/500.css').replace(/\\/g, '/')}`;

  const coverHtml = `<!doctype html><html><head><meta charset="UTF-8"/>
    <link rel="stylesheet" href="${baloo}"/><link rel="stylesheet" href="${mono}"/>
    <style>${stylesCss}
      body { width:1616px; height:1264px; overflow:hidden; background:#FFF8EE; }
      .wrap { width:1616px; height:1264px; padding:72px; display:flex; flex-direction:column; justify-content:space-between; }
    </style></head><body>
    <div class="wrap">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="mono-tag" style="font-size:24px; padding:8px 22px;">BRAND IDENTITY &amp; E-COMMERCE UI</span>
        <span class="mono-tag" style="font-size:24px; padding:8px 22px; background:#FFD447;">CONCEPT PROJECT</span>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center;">
        <div style="display:flex; flex-direction:column; gap:28px;">
          <div style="width:460px;">${logoMain}</div>
          <p style="font-family:var(--font-display); font-weight:700; font-size:44px; line-height:1.12; color:#2B1410;">Retro-pop packaging system &amp; 24-SKU candy storefront.</p>
        </div>
        <div class="box-pop" style="background:#8ECAE6; padding:36px; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
          <div style="background:#FFF; border:3px solid #2B1410; border-radius:20px; padding:24px; display:flex; justify-content:center;">
            <img src="${prod1}" style="width:240px; height:240px; object-fit:contain;" />
          </div>
          <div style="background:#FFF; border:3px solid #2B1410; border-radius:20px; padding:24px; display:flex; justify-content:center;">
            <img src="${prod2}" style="width:240px; height:240px; object-fit:contain;" />
          </div>
        </div>
      </div>
      <div class="cover-band pattern-checker" style="height:44px; border-radius:14px;"></div>
    </div></body></html>`;

  const coverPath = path.join(SRC_DIR, 'cover.html');
  fs.writeFileSync(coverPath, coverHtml, 'utf8');
  const ctx = await browser.newContext({ viewport: { width: 1616, height: 1264 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(`file:///${coverPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  const out = path.join(CASE_DIR, 'behance/cover-1616x1264.jpg');
  await page.screenshot({ path: out, type: 'jpeg', quality: 88 });
  await ctx.close();
  return out;
}

const server = spawn('npm', ['run', 'dev', '--', '--port', String(PORT), '--strictPort'], {
  cwd: ROOT,
  shell: true,
  stdio: 'ignore',
});

try {
  await waitForServer(BASE_URL);
  const { products, categories } = await import(`file:///${path.join(ROOT, 'src/data/products.js').replace(/\\/g, '/')}`);
  const attributions = loadAttributions();

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  console.log('1/4 Capturing live site screenshots...');
  await captureSiteShots(browser);

  console.log('2/4 Building EN & TR PDFs + 2800px Behance JPEGs...');
  const en = await buildDeck(browser, 'en', { products, categories, attributions });
  const tr = await buildDeck(browser, 'tr', { products, categories, attributions });

  console.log('3/4 Building 1616x1264 Behance cover...');
  const coverOut = await buildCover(browser);

  await browser.close();

  console.log('4/4 Output summary:');
  for (const p of [en.pdfPath, tr.pdfPath, coverOut]) {
    console.log(` - ${path.relative(CASE_DIR, p)}: ${(fs.statSync(p).size / 1024 / 1024).toFixed(2)} MB`);
  }
  console.log(` - EN JPEGs: ${en.count} files, TR JPEGs: ${tr.count} files`);
} finally {
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(server.pid), '/f', '/t'], { stdio: 'ignore' });
  } else {
    server.kill('SIGTERM');
  }
}
