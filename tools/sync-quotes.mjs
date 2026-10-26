// Copies Nicky's quotes into tools/quotes.json, then builds the Quotes shelf of the study (the three books on the painting):
// dist/assets/quote-books.js, one notes page per book, sorted by genre and then A to Z (tools/quote-books.json says which
// book and genre each quote belongs to), and bumps its ?v= in dist/hub/index.html.
// Run by .github/workflows/sync-quotes.yml every morning, or by hand: NOTION_TOKEN=… node tools/sync-quotes.mjs
// (without the secrets it just rebuilds the shelf from the last copy).
//  - Notion: her page "Quotes", read block by block through the Notion API with the NOTION_TOKEN secret
//    (an internal integration that has been added to the page under ••• → Connections). Wording is kept exactly.
//  - Goodreads: the public "Quotes" list of her profile (GOODREADS_USER below), page by page.
// If one source can't be reached, its last copy is kept, so a bad morning never empties the page.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const NOTION_PAGE = '295e55107ba580dfba58d344913c6a0c';
const GOODREADS_USER = process.env.GOODREADS_USER || ''; // the number (and name) in her profile link, e.g. "12345-nicky"
const FILE = new URL('quotes.json', import.meta.url);
const CATALOG = new URL('quote-books.json', import.meta.url);
const SHELF = new URL('../dist/assets/quote-books.js', import.meta.url), HUB = new URL('../dist/hub/index.html', import.meta.url);

const old = JSON.parse(await readFile(FILE, 'utf8').catch(() => '{}'));
const out = { notion: old.notion || [], goodreads: old.goodreads || [] };

// ---- Notion ---------------------------------------------------------------------------------------------
// Blocks become { t: 'h' } a source heading (a paragraph that is all bold), { t: 'p', text, cite? } a quote
// (bold words at the end of a quote are its source), { t: 'pre' } a code block (poems and longer passages,
// line breaks kept) and { t: 'gap' } an empty line between quotes.
const notion = async path => {
  const res = await fetch('https://api.notion.com/v1/' + path, {
    headers: { Authorization: 'Bearer ' + process.env.NOTION_TOKEN, 'Notion-Version': '2022-06-28' },
  });
  if (!res.ok) throw new Error(`Notion ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
};
const children = async id => {
  const all = [];
  let cursor;
  do {
    const page = await notion(`blocks/${id}/children?page_size=100${cursor ? '&start_cursor=' + cursor : ''}`);
    all.push(...page.results);
    cursor = page.has_more ? page.next_cursor : null;
  } while (cursor);
  return all;
};
const plain = rich => rich.map(r => r.plain_text).join('').trim();
const fromRich = rich => {
  const text = plain(rich);
  if (!text) return { t: 'gap' };
  const solid = rich.filter(r => r.plain_text.trim());
  if (solid.every(r => r.annotations.bold)) return { t: 'h', text };
  let end = rich.length;
  while (end > 0 && (rich[end - 1].annotations.bold || !rich[end - 1].plain_text.trim())) end--;
  const cite = plain(rich.slice(end));
  return cite ? { t: 'p', text: plain(rich.slice(0, end)), cite } : { t: 'p', text };
};
const walk = async (blocks, into) => {
  for (const b of blocks) {
    const body = b[b.type] || {};
    if (b.type === 'code') into.push({ t: 'pre', text: plain(body.rich_text).replace(/^\n+|\n+$/g, '') });
    else if (/^heading_/.test(b.type)) { const text = plain(body.rich_text); if (text) into.push({ t: 'h', text }); }
    else if (body.rich_text) into.push(fromRich(body.rich_text));
    if (b.has_children && b.type !== 'child_page' && b.type !== 'child_database') await walk(await children(b.id), into);
  }
  return into;
};
const tidy = blocks => {
  const list = [];
  for (const b of blocks) if (b.t !== 'gap' || (list.length && list.at(-1).t !== 'gap')) list.push(b);
  while (list.at(-1)?.t === 'gap') list.pop();
  return list;
};

if (process.env.NOTION_TOKEN) {
  try {
    out.notion = tidy(await walk(await children(NOTION_PAGE), []));
    console.log(`Notion: ${out.notion.filter(b => b.t !== 'gap').length} blocks`);
  } catch (e) { console.log('Notion skipped, keeping the last copy:', e.message); }
} else console.log('Notion skipped: no NOTION_TOKEN secret yet');

// ---- Goodreads ------------------------------------------------------------------------------------------
const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'" };
const decode = s => s.replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) =>
  e[0] === '#' ? String.fromCodePoint(parseInt(e.slice(1).replace(/^x/i, ''), /^#x/i.test(e) ? 16 : 10)) : entities[e.toLowerCase()] ?? m);
const strip = s => decode(s.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')).replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').trim();

if (GOODREADS_USER) {
  try {
    const quotes = [];
    for (let n = 1; n <= 60; n++) {
      const res = await fetch(`https://www.goodreads.com/quotes/list/${GOODREADS_USER}?page=${n}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Frolicking Nicky quotes sync)', 'Accept-Language': 'en' },
      });
      if (!res.ok) throw new Error(`Goodreads ${res.status}`);
      const html = await res.text();
      const found = html.split('<div class="quoteText">').slice(1).map(chunk => {
        const box = chunk.split(/<div class="quoteFooter"|<div class="right"/)[0];
        const [said, source = ''] = box.split('―');
        const text = strip(said).replace(/^[“"]\s*/, '').replace(/\s*[”"]$/, '');
        const author = strip((source.match(/<span class="authorOrTitle">([\s\S]*?)<\/span>/) || [])[1] || '').replace(/,$/, '');
        const book = strip((source.match(/<a class="authorOrTitle"[^>]*>([\s\S]*?)<\/a>/) || [])[1] || '');
        return { text, author, book };
      }).filter(q => q.text);
      quotes.push(...found);
      if (!found.length || !/class="next_page"(?! disabled)[^>]*href/.test(html) && !/rel="next"/.test(html)) break;
    }
    if (quotes.length) out.goodreads = quotes;
    console.log(`Goodreads: ${quotes.length} quotes`);
  } catch (e) { console.log('Goodreads skipped, keeping the last copy:', e.message); }
} else console.log('Goodreads skipped: no profile set yet');

const next = JSON.stringify(out, null, 1) + '\n';
if (next !== JSON.stringify(old, null, 1) + '\n') {
  await writeFile(FILE, next);
  console.log('quotes.json updated');
} else console.log('No new quotes');

// ---- The shelf: one page per book ---------------------------------------------------------------------
const catalog = JSON.parse(await readFile(CATALOG, 'utf8'));
const NEW = 'Newly added';
const books = Object.fromEntries(Object.entries(catalog.books).map(([key, b]) => [key, { ...b, key, blocks: [] }]));
const norm = s => s.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();
const fp = s => s.toLowerCase().replace(/[^\p{L}\p{N}_]+/gu, ' ').trim().slice(0, 60);
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'book';
// A source line ("Orlando", "Germinal, Zola") finds its book by title or by one of Nicky's labels; otherwise it starts a new one
const bookFor = (label, author = '') => {
  const n = norm(label);
  const found = Object.values(books).find(b => norm(b.title) === n || b.labels.some(l => norm(l) === n));
  if (found) return found;
  let key = slug(label); while (books[key]) key += '-2';
  return (books[key] = { key, title: label, author, genre: NEW, labels: [label], blocks: [] });
};
const isSource = s => s && !s.includes('\n') && s.length <= 60 && !/[.!?»"”…:;,]$/.test(s);
const paras = text => text.split(/\n\s*\n/).map(s => s.replace(/^\n+|\s+$/g, '')).filter(s => s.trim());

let current = books.unnamed, heading = null;
for (const b of out.notion) {
  if (b.t === 'gap') continue;
  if (b.t === 'h') { heading = b.text; continue; }
  let book = books[catalog.blocks[fp(b.text)]];
  if (!book) {
    const last = b.t === 'pre' ? paras(b.text).at(-1) : null;
    book = b.cite ? bookFor(b.cite) : isSource(last) && paras(b.text).length > 1 ? bookFor(last) : heading ? bookFor(heading) : current;
  }
  heading = null; current = book;
  if (b.t === 'p') {
    const own = !b.cite || book.labels.concat(book.title).some(l => norm(l) === norm(b.cite));
    book.blocks.push({ type: 'paragraph', text: own ? b.text : b.text + '\n— ' + b.cite });
  } else {
    const drop = book.labels.concat(book.title).map(norm);
    paras(b.text).filter(p => !drop.includes(norm(p))).forEach(p =>
      book.blocks.push(/^\d{4}$/.test(p.trim()) ? { type: 'heading', text: p.trim() } : { type: 'paragraph', text: p }));
  }
}
for (const q of out.goodreads) {
  const book = bookFor(q.book || q.author || 'Goodreads', q.book ? q.author : '');
  book.blocks.push({ type: 'paragraph', text: q.book || !q.author ? q.text : q.text + '\n— ' + q.author });
}

const genres = [NEW, ...catalog.genres];
const sortTitle = t => t.replace(/^(?:(?:the|an?|il|lo|la|le|les|gli|i)\s+|l[’'])/i, ''); // "The Prophet" under P, "L’ombra" under O
const shelf = Object.values(books).filter(b => b.blocks.length)
  .sort((a, b) => genres.indexOf(a.genre) - genres.indexOf(b.genre) || sortTitle(a.title).localeCompare(sortTitle(b.title), 'it', { sensitivity: 'base' }))
  .map(b => ({ id: 'quote-' + b.key, title: b.title, author: b.author, genre: b.genre, kicker: b.author ? b.author + ' · ' + b.genre : b.genre, blocks: b.blocks }));
const js = '// Built by tools/sync-quotes.mjs from Nicky\'s Notion and Goodreads quotes (word for word): one page per book, by genre, A to Z.\n'
  + '// Don\'t edit by hand: change tools/quote-books.json and run node tools/sync-quotes.mjs.\n'
  + 'window.FN_QUOTE_BOOKS = ' + JSON.stringify(shelf, null, 1) + ';\n';
const before = await readFile(SHELF, 'utf8').catch(() => '');
if (js !== before) {
  await writeFile(SHELF, js);
  const v = createHash('sha1').update(js).digest('hex').slice(0, 8);
  const hub = await readFile(HUB, 'utf8');
  await writeFile(HUB, hub.replace(/quote-books\.js\?v=[\w]+/, 'quote-books.js?v=' + v));
  console.log(`Shelf rebuilt: ${shelf.length} books`);
} else console.log(`Shelf unchanged: ${shelf.length} books`);
