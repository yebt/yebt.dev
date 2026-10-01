/**
 * Renders /<lang>/cv/print/ from the built site into text-based PDFs
 * (selectable text, single column -> ATS friendly).
 *
 *   npm run cv:pdf
 *
 * Uses a locally installed Chromium. Override with CHROMIUM_PATH if needed.
 */
import { createServer } from 'node:http';
import { readFile, mkdir, copyFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { chromium } from 'playwright-core';

const DIST = resolve('dist');
const OUT = resolve('public/cv');
const LANGS = ['en', 'es'];

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };

const server = createServer(async (req, res) => {
  let p = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  try {
    if ((await stat(p)).isDirectory()) p = join(p, 'index.html');
    res.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' });
    res.end(await readFile(p));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;

const candidates = [
  process.env.CHROMIUM_PATH,
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const executablePath = candidates.find((c) => existsSync(c));

const browser = await chromium.launch({ executablePath });
await mkdir(OUT, { recursive: true });

for (const lang of LANGS) {
  const page = await browser.newPage();
  await page.goto(`${base}/${lang}/cv/print/`, { waitUntil: 'networkidle' });
  const file = join(OUT, `yahir-bravo-cv-${lang}.pdf`);
  await page.pdf({ path: file, format: 'Letter', printBackground: false, preferCSSPageSize: true, tagged: true, outline: true });
  // keep dist in sync so a deploy of the current build ships the fresh PDF
  await mkdir(join(DIST, 'cv'), { recursive: true });
  await copyFile(file, join(DIST, 'cv', `yahir-bravo-cv-${lang}.pdf`));
  console.log(`✓ ${file}`);
  await page.close();
}

await browser.close();
server.close();
