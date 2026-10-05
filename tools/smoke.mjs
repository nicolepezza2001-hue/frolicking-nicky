// Frolicking Nicky: opens every page as an iPhone and as a desktop browser before publishing.
// Fails on script errors, sideways scrolling on phones, or a missing menu button / heading.
import { chromium, devices } from 'playwright';
import { spawn } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const routes = walk(root).filter(f => f.endsWith('index.html')).map(f => '/' + relative(root, f).replace(/index\.html$/, ''));
const port = 8799, server = spawn('python3', ['-m', 'http.server', String(port)], { cwd: root, stdio: 'ignore' });
await new Promise(r => setTimeout(r, 1200));

const problems = [];
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
try {
  for (const [label, opts] of [['iPhone', devices['iPhone 13']], ['desktop', { viewport: { width: 1280, height: 900 } }]]) {
    const ctx = await browser.newContext({ ...opts, serviceWorkers: 'block' });
    for (const r of routes) {
      const page = await ctx.newPage(), errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(`http://localhost:${port}${r}`, { waitUntil: 'load' });
      await page.waitForTimeout(400);
      const s = await page.evaluate(() => ({
        sideways: (scrollTo(400, scrollY), scrollX),
        menu: !!document.querySelector('.fn-menu-btn'),
        h1: !!document.querySelector('h1')
      }));
      errors.forEach(e => problems.push(`${label} ${r}: script error: ${e}`));
      if (label === 'iPhone' && s.sideways) problems.push(`${label} ${r}: page scrolls sideways by ${s.sideways}px`);
      if (!s.menu) problems.push(`${label} ${r}: no menu button`);
      if (!s.h1) problems.push(`${label} ${r}: no main heading`);
      await page.close();
    }
    await ctx.close();
  }
} finally { await browser.close(); server.kill(); }

if (problems.length) { console.error(`✗ ${problems.length} problem(s):\n- ` + problems.join('\n- ')); process.exit(1); }
console.log(`✓ ${routes.length} pages open cleanly on iPhone and desktop`);
