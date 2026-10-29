// Prints dist/resume/ to dist/resume.pdf after `astro build`.
// Uses an installed Chrome or Edge (playwright-core downloads no browser).
// In CI a failure stops the build; locally it only warns, so `npm run build`
// still works on a machine without Chrome or Edge.
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright-core';

const dist = new URL('../dist/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1');
const out = join(dist, 'resume.pdf');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };

const server = createServer((req, res) => {
  let file = join(dist, normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, ''));
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

async function launch() {
  for (const channel of ['chrome', 'msedge']) {
    try {
      return await chromium.launch({ channel });
    } catch {}
  }
  throw new Error('no Chrome or Edge found');
}

try {
  const browser = await launch();
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}/resume/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
  await browser.close();
  console.log(`resume-pdf: wrote ${out}`);
} catch (e) {
  console.error(`resume-pdf: ${e.message}`);
  if (process.env.CI) process.exitCode = 1;
  else console.warn('resume-pdf: skipped locally; the deploy build will generate it.');
} finally {
  server.close();
}
