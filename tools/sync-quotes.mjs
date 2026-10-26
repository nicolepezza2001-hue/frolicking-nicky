// Copies Nicky's quotes into tools/quotes.json, then builds the Quotes shelf of the study (the three books on the painting):
// dist/assets/quote-books.js, one notes page per book, sorted by genre and then A to Z (tools/quote-books.json says which
// book and genre each quote belongs to), and bumps its ?v= in dist/hub/index.html.
// Run by .github/workflows/sync-quotes.yml every morning, or by hand: NOTION_TOKEN=… node tools/sync-quotes.mjs
// (without the secrets it just rebuilds the shelf from the last copy).
//  - Notion: her page "Quotes", read block by block through the Notion API with the NOTION_TOKEN secret
//    (an internal integration that has been added to the page under ••• → Connections). Wording is kept exactly.
//  - Goodreads: the Kindle notes & highlights she has made public (GOODREADS_USER below), book by book.
// If one source can't be reached, its last copy is kept, so a bad morning never empties the page.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const NOTION_PAGE = '295e55107ba580dfba58d344913c6a0c';
const GOODREADS_USER = process.env.GOODREADS_USER || '197324729-nicole-p'; // the number and name in her profile link
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

// Her Kindle highlights: every book whose notes she has made public. They're found on her profile and her notes list
// (plus any page listed under "goodreadsNotes" in quote-books.json), then each book's notes page is read highlight by highlight.
try {
  const get = async path => {
    const res = await fetch('https://www.goodreads.com/' + path, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Frolicking Nicky quotes sync)', 'Accept-Language': 'en' },
    });
    if (!res.ok) throw new Error(`Goodreads ${res.status} for ${path}`);
    return res.text();
  };
  const pages = new Set(JSON.parse(await readFile(CATALOG, 'utf8')).goodreadsNotes || []);
  for (const path of [`user/show/${GOODREADS_USER}`, `notes/${GOODREADS_USER}`])
    for (const [, page] of (await get(path)).matchAll(new RegExp(`/notes/(\\d+[\\w-]*/${GOODREADS_USER})(?=[?"])`, 'g'))) pages.add(page);
  const quotes = [];
  for (const page of pages) {
    const html = await get('notes/' + page);
    const book = strip((html.match(/class='readingNotesBookDetailsContainer'>[\s\S]*?<a [^>]*href="\/book\/show\/[^"]*">([\s\S]*?)<\/a>/) || [])[1] || '');
    const author = strip((html.match(/by\s*<a [^>]*href="\/author\/show\/[^"]*">([\s\S]*?)<\/a>/) || [])[1] || '');
    for (const [, text] of html.matchAll(/class='noteHighlightTextContainer__highlightText'>\s*<span[^>]*>([\s\S]*?)<\/span>/g))
      if (strip(text)) quotes.push({ text: strip(text), author, book });
  }
  if (quotes.length) out.goodreads = quotes;
  console.log(`Goodreads: ${quotes.length} highlights from ${pages.size} books`);
} catch (e) { console.log('Goodreads skipped, keeping the last copy:', e.message); }

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

const LOOSE = ['sayings', 'unnamed']; // her sayings and lines without a name, shown on the Miscellaneous page
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
    // Her source line is left off, whether it stands alone or closes the quote's last line
    const parts = paras(b.text).map(p => { const lines = p.split('\n'); return lines.length > 1 && drop.includes(norm(lines.at(-1))) ? lines.slice(0, -1).join('\n') : p; })
      .filter(p => !drop.includes(norm(p)));
    // On the Miscellaneous page each saying stays whole, with the line naming it
    if (LOOSE.includes(book.key)) book.blocks.push({ type: 'paragraph', text: parts.join('\n\n') });
    else parts.forEach(p => book.blocks.push(/^\d{4}$/.test(p.trim()) ? { type: 'heading', text: p.trim() } : { type: 'paragraph', text: p }));
  }
}
const kept = new Set(Object.values(books).flatMap(b => b.blocks.map(x => fp(x.text))));
for (const q of out.goodreads) {
  if (kept.has(fp(q.text))) continue; // already copied into Notion
  const book = bookFor(q.book || q.author || 'Goodreads', q.book ? q.author : '');
  book.blocks.push({ type: 'paragraph', text: q.book || !q.author ? q.text : q.text + '\n— ' + q.author });
}
// Nicky's call: a quote she saved twice is shown once (the first copy stays; a copy with a typo fixed counts as the same,
// so quotes are matched on their first 80 letters). Short lines are left alone: a poem's refrain repeats on purpose.
const said = new Set(), start = s => s.replace(/\n— [^\n]*$/, '').toLowerCase().replace(/[^\p{L}\p{N}_]+/gu, ' ').trim();
const twice = x => { const k = start(x.text); if (x.type !== 'paragraph' || k.length < 40) return false; return said.has(k.slice(0, 80)) || !said.add(k.slice(0, 80)); };
for (const b of Object.values(books)) b.blocks = b.blocks.filter(x => !twice(x));

const sortTitle = t => t.replace(/^(?:(?:the|an?|il|lo|la|le|les|gli|i)\s+|l[’'])/i, ''); // "The Prophet" under P, "L’ombra" under O
// Nicky's call: some people stay off the page, and every book with a single quote shares one Miscellaneous page,
// each quote signed with its book (A to Z), then her sayings and the lines without a name
const MISC = 'Miscellaneous', misc = { key: 'miscellaneous', title: MISC, author: '', genre: MISC, labels: [], blocks: [] };
const visible = Object.values(books).filter(b => b.blocks.length && !b.hidden);
const loose = visible.filter(b => b.blocks.length === 1 && !LOOSE.includes(b.key));
const sign = b => b.title + (b.author ? ', ' + b.author : '');

loose.slice().sort((a, b) => sortTitle(a.title).localeCompare(sortTitle(b.title), 'it', { sensitivity: 'base' }))
  .forEach(b => misc.blocks.push({ type: 'paragraph', text: b.blocks[0].text.replace(/\n— [^\n]*$/, '') + '\n— ' + sign(b) }));
LOOSE.forEach(k => misc.blocks.push(...(books[k]?.blocks || [])));
const genres = [NEW, ...catalog.genres];
const shelf = visible.filter(b => !loose.includes(b) && b.genre !== MISC).concat(misc.blocks.length ? [misc] : [])
  .sort((a, b) => genres.indexOf(a.genre) - genres.indexOf(b.genre) || sortTitle(a.title).localeCompare(sortTitle(b.title), 'it', { sensitivity: 'base' }))
  .map(b => ({ id: 'quote-' + b.key, title: b.title, author: b.author, genre: b.genre, kicker: b.author ? b.author + ' · ' + b.genre : b.genre === MISC ? 'Single quotes from many books' : b.genre, blocks: b.blocks }));
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
