import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright-core';

const CHROME_PATH = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = process.env.QA_OUT_DIR || path.join('polish', 'baseline', 'shots');
const PORT = Number(process.env.QA_PORT || 4180);
const BASE_URL = (process.env.QA_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
const SHOULD_START_SERVER = !process.env.QA_URL;

const WIDTHS = [320, 768, 1440];

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'shop', path: '/shop' },
  { name: 'mix', path: '/mix' },
  { name: 'product', path: '/product/visne-limon-cam-seker' },
  { name: 'cart', path: '/cart' },
  { name: 'checkout', path: '/checkout' },
  { name: 'about', path: '/about' },
  { name: 'info', path: '/info' },
  { name: 'credits', path: '/credits' },
  { name: 'not-found', path: '/olmayan-sayfa' },
];

const SEED_CART_STATE = {
  state: {
    items: [
      {
        key: 'visne-limon-cam-seker::vişne & limon',
        id: 'lp-01',
        slug: 'visne-limon-cam-seker',
        name: 'Vişne & Limon Cam Şeker',
        price: 89,
        netWeight: '140 g',
        flavor: 'Vişne & Limon',
        category: 'sert-seker',
        image: '/images/products/visne-limon-cam-seker.png',
        quantity: 2,
      },
    ],
    favorites: ['visne-limon-cam-seker'],
  },
  version: 0,
};

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Preview server did not respond within ${timeoutMs}ms at ${url}`);
}

function startPreviewServer() {
  const viteBin = path.resolve('node_modules', 'vite', 'bin', 'vite.js');
  const child = spawn(process.execPath, [viteBin, 'preview', '--port', String(PORT), '--strictPort'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return child;
}

async function capturePage(context, url, outPath, setupFn) {
  const page = await context.newPage();
  const consoleErrors = [];
  const consoleWarnings = [];
  const failed404 = [];

  page.on('console', (msg) => {
    const type = msg.type();
    if (type === 'error') consoleErrors.push(msg.text());
    else if (type === 'warning') consoleWarnings.push(msg.text());
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(String(err));
  });
  page.on('response', (res) => {
    if (res.status() === 404) {
      failed404.push(res.url());
    }
  });

  if (setupFn) {
    await setupFn(page);
  } else {
    await page.goto(url, { waitUntil: 'networkidle' });
  }

  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(250);
  await page.screenshot({ path: outPath, fullPage: true });
  await page.close();

  return { consoleErrors, consoleWarnings, failed404 };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  let server = null;
  if (SHOULD_START_SERVER) {
    server = startPreviewServer();
    await waitForServer(BASE_URL);
  }

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  const report = {
    baseUrl: BASE_URL,
    outDir: OUT_DIR,
    totalShots: 0,
    consoleErrors: [],
    consoleWarnings: [],
    failed404: [],
  };

  try {
    for (const width of WIDTHS) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });

      // 1. All main routes
      for (const route of ROUTES) {
        const fileName = `${route.name}-${width}.png`;
        const outPath = path.join(OUT_DIR, fileName);
        const res = await capturePage(context, `${BASE_URL}${route.path}`, outPath);
        report.totalShots++;
        for (const e of res.consoleErrors) report.consoleErrors.push({ route: route.path, width, msg: e });
        for (const w of res.consoleWarnings) report.consoleWarnings.push({ route: route.path, width, msg: w });
        for (const u of res.failed404) report.failed404.push({ route: route.path, width, url: u });
      }

      // 2. State: empty filter result
      {
        const outPath = path.join(OUT_DIR, `state-shop-empty-filter-${width}.png`);
        const res = await capturePage(context, `${BASE_URL}/shop?q=zzzzzz`, outPath);
        report.totalShots++;
        for (const e of res.consoleErrors) report.consoleErrors.push({ route: '/shop?q=zzzzzz', width, msg: e });
        for (const u of res.failed404) report.failed404.push({ route: '/shop?q=zzzzzz', width, url: u });
      }

      // 3. State: empty cart
      {
        const outPath = path.join(OUT_DIR, `state-cart-empty-${width}.png`);
        const res = await capturePage(context, `${BASE_URL}/cart`, outPath, async (page) => {
          await page.goto(`${BASE_URL}/cart`, { waitUntil: 'networkidle' });
          await page.evaluate(() => localStorage.removeItem('lupuk-cart-v1'));
          await page.reload({ waitUntil: 'networkidle' });
        });
        report.totalShots++;
        for (const e of res.consoleErrors) report.consoleErrors.push({ route: 'state-cart-empty', width, msg: e });
      }

      // 4. State: filled cart
      {
        const outPath = path.join(OUT_DIR, `state-cart-filled-${width}.png`);
        const res = await capturePage(context, `${BASE_URL}/cart`, outPath, async (page) => {
          await page.goto(`${BASE_URL}/cart`, { waitUntil: 'networkidle' });
          await page.evaluate((data) => {
            localStorage.setItem('lupuk-cart-v1', JSON.stringify(data));
          }, SEED_CART_STATE);
          await page.reload({ waitUntil: 'networkidle' });
        });
        report.totalShots++;
        for (const e of res.consoleErrors) report.consoleErrors.push({ route: 'state-cart-filled', width, msg: e });
      }

      // 5. State: open cart drawer
      {
        const outPath = path.join(OUT_DIR, `state-drawer-open-${width}.png`);
        const res = await capturePage(context, `${BASE_URL}/`, outPath, async (page) => {
          await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
          await page.evaluate((data) => {
            localStorage.setItem('lupuk-cart-v1', JSON.stringify(data));
          }, SEED_CART_STATE);
          await page.reload({ waitUntil: 'networkidle' });
          const cartBtn = page.locator('header button:has-text("Sepeti aç"), header button[aria-label*="Sepet"]').first();
          await cartBtn.click();
          await page.waitForTimeout(300);
        });
        report.totalShots++;
        for (const e of res.consoleErrors) report.consoleErrors.push({ route: 'state-drawer-open', width, msg: e });
      }

      // 6. State: checkout validation error
      {
        const outPath = path.join(OUT_DIR, `state-checkout-error-${width}.png`);
        const res = await capturePage(context, `${BASE_URL}/checkout`, outPath, async (page) => {
          await page.goto(`${BASE_URL}/checkout`, { waitUntil: 'networkidle' });
          await page.evaluate((data) => {
            localStorage.setItem('lupuk-cart-v1', JSON.stringify(data));
          }, SEED_CART_STATE);
          await page.reload({ waitUntil: 'networkidle' });
          const submitBtn = page.locator('form button[type="submit"]').first();
          await submitBtn.click();
          await page.waitForTimeout(200);
        });
        report.totalShots++;
        for (const e of res.consoleErrors) report.consoleErrors.push({ route: 'state-checkout-error', width, msg: e });
      }

      await context.close();
    }
  } finally {
    await browser.close();
    if (server) server.kill();
  }

  const reportPath = path.join(path.dirname(OUT_DIR), 'shots-report.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(
    `Shots complete: ${report.totalShots} PNGs -> ${OUT_DIR} | consoleErrors=${report.consoleErrors.length} | consoleWarnings=${report.consoleWarnings.length} | 404s=${report.failed404.length}`
  );
  if (report.consoleErrors.length > 0 || report.failed404.length > 0) {
    console.log('Errors/404s sample:', JSON.stringify({ errors: report.consoleErrors.slice(0, 5), failed404: report.failed404.slice(0, 5) }));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
