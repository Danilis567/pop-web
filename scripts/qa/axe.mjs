import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright-core';

const CHROME_PATH = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_FILE = process.env.QA_AXE_OUT || path.join('polish', 'baseline', 'axe.json');
const PORT = Number(process.env.QA_PORT || 4180);
const BASE_URL = (process.env.QA_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
const SHOULD_START_SERVER = !process.env.QA_URL;

const WIDTHS = [320, 768, 1440];

const ROUTES = [
  '/',
  '/shop',
  '/mix',
  '/product/visne-limon-cam-seker',
  '/cart',
  '/checkout',
  '/about',
  '/info',
  '/credits',
  '/olmayan-sayfa',
];

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
  return spawn(process.execPath, [viteBin, 'preview', '--port', String(PORT), '--strictPort'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

async function main() {
  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
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

  const findings = [];
  const byRule = {};
  let criticalCount = 0;
  let seriousCount = 0;

  try {
    for (const width of WIDTHS) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      for (const route of ROUTES) {
        const page = await context.newPage();
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts?.ready);
        await page.waitForTimeout(200);

        const results = await new AxeBuilder({ page }).analyze();
        const filtered = results.violations.filter(
          (v) => v.impact === 'serious' || v.impact === 'critical'
        );

        for (const v of filtered) {
          if (v.impact === 'critical') criticalCount++;
          if (v.impact === 'serious') seriousCount++;
          byRule[v.id] = (byRule[v.id] || 0) + v.nodes.length;
          findings.push({
            route,
            width,
            id: v.id,
            impact: v.impact,
            description: v.description,
            helpUrl: v.helpUrl,
            nodeCount: v.nodes.length,
            nodes: v.nodes.slice(0, 5).map((n) => ({
              target: n.target,
              failureSummary: n.failureSummary,
            })),
          });
        }
        await page.close();
      }
      await context.close();
    }
  } finally {
    await browser.close();
    if (server) server.kill();
  }

  const output = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    summary: {
      scans: ROUTES.length * WIDTHS.length,
      violationEntries: findings.length,
      criticalViolations: criticalCount,
      seriousViolations: seriousCount,
      nodesByRule: byRule,
    },
    violations: findings,
  };

  await fs.writeFile(OUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
  console.log(
    `Axe complete: ${output.summary.scans} scans -> ${OUT_FILE} | critical=${criticalCount} | serious=${seriousCount} | rules=${JSON.stringify(byRule)}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
