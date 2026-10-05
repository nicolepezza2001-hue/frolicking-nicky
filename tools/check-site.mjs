// Frolicking Nicky: static checks run before every publish (see .github/workflows/deploy-pages.yml).
// Fails (exit 1) on: broken internal links or files, a page without its English/Italian twin, script syntax errors,
// oversized photos, or pages loading different versions of the same shared file.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const problems = [];
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(root);
const pages = files.filter(f => f.endsWith('.html'));
const route = f => '/' + relative(root, f).replace(/index\.html$/, '').replace(/\\/g, '/');
const resolve = url => {
  const path = decodeURIComponent(url.split(/[?#]/)[0]);
  const p = join(root, path);
  return [p, join(p, 'index.html'), p + '.html'].some(c => existsSync(c) && statSync(c).isFile());
};

// 1. Links and files referenced by each page
const versions = {};
for (const page of pages) {
  const html = readFileSync(page, 'utf8'), where = route(page);
  for (const [, attr, url] of html.matchAll(/\s(href|src|data-src)="([^"]+)"/g)) {
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    if (!resolve(url)) problems.push(`${where}: broken ${attr} → ${url}`);
    const m = url.match(/^(\/assets\/[^?]+)\?v=(\d+)/);
    if (m) (versions[m[1]] ||= {})[m[2]] = [...((versions[m[1]] || {})[m[2]] || []), where];
  }
  for (const [, url] of html.matchAll(/url\((\/[^)'"]+)\)/g)) if (!resolve(url)) problems.push(`${where}: broken url() → ${url}`);

  // 2. Every page names its English and Italian twin, and the twin exists
  const lang = (html.match(/<html lang="([a-z]+)"/) || [])[1];
  if (!lang) problems.push(`${where}: missing <html lang>`);
  for (const l of ['en', 'it']) {
    const m = html.match(new RegExp(`hreflang="${l}" href="https://frolickingnicky\\.com([^"]*)"`));
    if (!m) problems.push(`${where}: no hreflang="${l}" link`);
    else if (!resolve(m[1] || '/')) problems.push(`${where}: its ${l} twin ${m[1]} does not exist`);
  }
  if (!/<title>[^<]+<\/title>/.test(html)) problems.push(`${where}: missing <title>`);
  if (!/property="og:image"/.test(html)) problems.push(`${where}: missing share preview (og:image)`);
}

// 3. Shared files: every page should load the same version
for (const [file, byVersion] of Object.entries(versions)) {
  const vs = Object.keys(byVersion);
  if (vs.length > 1) problems.push(`${file} is loaded as ${vs.map(v => `v=${v} (${byVersion[v].length} pages, e.g. ${byVersion[v][0]})`).join(' and ')}: bump every page to the same ?v=`);
}

// 4. Scripts parse
for (const f of files.filter(f => f.endsWith('.js'))) {
  try { execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' }); }
  catch (e) { problems.push(`${relative(root, f)}: script error\n${String(e.stderr).split('\n').slice(0, 4).join('\n')}`); }
}

// 5. Photos stay light (see CLAUDE.md: ≤1400px, quality ~76)
for (const f of files.filter(f => /\.(jpe?g|png)$/i.test(f))) {
  const kb = statSync(f).size / 1024;
  if (kb > 700) problems.push(`${relative(root, f)}: ${Math.round(kb)} KB; resize to ≤1400px / quality ~76 before publishing`);
}

if (problems.length) { console.error(`✗ ${problems.length} problem(s):\n- ` + problems.join('\n- ')); process.exit(1); }
console.log(`✓ ${pages.length} pages, ${files.length} files: links, twins, versions, scripts and photos all fine`);
