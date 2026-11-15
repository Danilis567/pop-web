import { execFile, spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const CHROME_PATH = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_FILE = process.env.QA_LH_OUT || path.join('polish', 'baseline', 'lighthouse.json');
const PORT = Number(process.env.QA_PORT || 4180);
const BASE_URL = (process.env.QA_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
const SHOULD_START_SERVER = !process.env.QA_URL;

const ROUTES = ['/', '/shop', '/product/visne-limon-cam-seker'];

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

async function runLighthouse(url, tmpOutPath) {
  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const args = [
    '--yes',
    'lighthouse',
    url,
    '--output=json',
    `--output-path=${tmpOutPath}`,
    '--quiet',
    '--chrome-flags=--headless=new --no-sandbox --disable-gpu',
  ];

  await execFileAsync(npxCmd, args, {
    env: { ...process.env, CHROME_PATH },
    shell: process.platform === 'win32',
    maxBuffer: 20 * 1024 * 1024,
  });

  const raw = JSON.parse(await fs.readFile(tmpOutPath, 'utf-8'));
  return {
    scores: {
      performance: Math.round((raw.categories?.performance?.score ?? 0) * 100),
      accessibility: Math.round((raw.categories?.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((raw.categories?.['best-practices']?.score ?? 0) * 100),
      seo: Math.round((raw.categories?.seo?.score ?? 0) * 100),
    },
    metrics: {
      fcpMs: Math.round(raw.audits?.['first-contentful-paint']?.numericValue ?? 0),
      lcpMs: Math.round(raw.audits?.['largest-contentful-paint']?.numericValue ?? 0),
      cls: Number((raw.audits?.['cumulative-layout-shift']?.numericValue ?? 0).toFixed(4)),
      tbtMs: Math.round(raw.audits?.['total-blocking-time']?.numericValue ?? 0),
      speedIndexMs: Math.round(raw.audits?.['speed-index']?.numericValue ?? 0),
    },
  };
}

async function main() {
  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  let server = null;
  if (SHOULD_START_SERVER) {
    server = startPreviewServer();
    await waitForServer(BASE_URL);
  }

  const results = {};
  try {
    for (const route of ROUTES) {
      const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
      const tmpPath = path.join(path.dirname(OUT_FILE), `.lh-${slug}.tmp.json`);
      const url = `${BASE_URL}${route}`;
      results[route] = await runLighthouse(url, tmpPath);
      await fs.rm(tmpPath, { force: true });
    }
  } finally {
    if (server) server.kill();
  }

  const output = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    formFactor: 'mobile',
    routes: results,
  };

  await fs.writeFile(OUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
  for (const [route, data] of Object.entries(results)) {
    console.log(
      `LH ${route}: Perf=${data.scores.performance} A11y=${data.scores.accessibility} BP=${data.scores.bestPractices} SEO=${data.scores.seo} | LCP=${data.metrics.lcpMs}ms CLS=${data.metrics.cls}`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
