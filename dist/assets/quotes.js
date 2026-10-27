/* Frolicking Nicky: the Quotes page of the study (#quotes, the three books on the painting).
   Lists every book Nicky has kept quotes from, by genre and then A to Z (window.FN_QUOTE_BOOKS, quote-books.js, built every
   morning from her Notion and Goodreads quotes by tools/sync-quotes.mjs). Each book opens its own notes page (study.js
   renders them like the other lessons, with highlights and margin notes). A search box finds any quote, and "Surprise me"
   opens one at random. */
(() => {
  const root = document.getElementById('fn-quotes'), count = document.getElementById('fn-quotes-count');
  const books = window.FN_QUOTE_BOOKS || [];
  if (!root) return;
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  // Search every quote, and "Surprise me" opens one at random; both land on the quote itself on its book page
  const quotes = books.flatMap(book => book.blocks.map((b, n) => ({ book, n, text: b.text })).filter(q => q.book.blocks[q.n].type === 'paragraph'));
  const fold = t => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’']/g, "'");
  const tools = el('div', 'fn-quotes-tools'), search = el('input'), surprise = el('button', 'fn-vocab-mode', 'Surprise me');
  search.type = 'search'; search.placeholder = 'Search your quotes…'; search.setAttribute('aria-label', 'Search your quotes');
  search.autocomplete = 'off'; search.spellcheck = false; surprise.type = 'button';
  const found = el('div', 'fn-quotes-found'); found.setAttribute('aria-live', 'polite');
  tools.append(search, surprise); root.append(tools, found);
  let target = null;
  const open = q => { target = q; location.hash = q.book.id; };
  const show = q => {
    const p = document.querySelector(`#${CSS.escape(q.book.id)} [data-note-block="${q.n}"]`); if (!p) return;
    p.scrollIntoView({ block: 'center' }); p.classList.remove('fn-quote-found'); void p.offsetWidth; p.classList.add('fn-quote-found');
  };
  surprise.addEventListener('click', () => open(quotes[Math.floor(Math.random() * quotes.length)]));
  const snippet = (text, at, len) => {
    const a = Math.max(0, at - 60), b = Math.min(text.length, at + len + 90), span = el('span', 'fn-quotes-snippet');
    span.append((a ? '…' : '') + text.slice(a, at), el('mark', null, text.slice(at, at + len)), text.slice(at + len, b) + (b < text.length ? '…' : ''));
    return span;
  };
  const shelves = [];
  search.addEventListener('input', () => {
    const term = fold(search.value.trim());
    shelves.forEach(s => { s.hidden = term.length >= 2; }); root.classList.toggle('is-searching', term.length >= 2);
    if (term.length < 2) return found.replaceChildren();
    const hits = quotes.filter(q => fold(q.text).includes(term) || fold(q.book.title + ' ' + (q.book.author || '')).includes(term));
    const ul = el('ul', 'fn-quotes-hits');
    hits.slice(0, 60).forEach(q => {
      const at = fold(q.text).indexOf(term), li = el('li'), a = el('a', 'fn-quotes-hit'); a.href = '#' + q.book.id;
      a.addEventListener('click', e => { e.preventDefault(); open(q); });
      a.append(at >= 0 ? snippet(q.text.replace(/\s+/g, ' '), at, term.length) : el('span', 'fn-quotes-snippet', q.text.slice(0, 150) + (q.text.length > 150 ? '…' : '')),
        el('span', 'fn-quotes-author', q.book.title + (q.book.author ? ', ' + q.book.author : '')));
      li.append(a); ul.append(li);
    });
    found.replaceChildren(el('p', 'fn-study-label', hits.length ? (hits.length > 60 ? `First 60 of ${hits.length} quotes` : hits.length === 1 ? 'One quote' : hits.length + ' quotes') : 'No quote has those words'), ul);
  });

  let list;
  books.forEach((book, i) => {
    if (book.genre !== books[i - 1]?.genre) {
      const shelf = el('section', 'fn-quotes-genre');
      shelf.append(el('h3', 'fn-study-label', book.genre));
      shelves.push(shelf);
      list = el('ul', 'fn-quotes-books'); shelf.append(list); root.append(shelf);
    }
    const li = el('li'), a = el('a', 'fn-quotes-book'); a.href = '#' + book.id;
    a.append(el('span', 'fn-quotes-title', book.title));
    const sub = book.author || (book.id === 'quote-miscellaneous' ? book.blocks.length + ' single quotes, each with its book' : '');
    if (sub) a.append(el('span', 'fn-quotes-author', sub));
    li.append(a); list.append(li);
  });
  if (count) count.textContent = books.length + ' books';

  // Coming back from a book (its ← Quotes link, or the browser's back) lands on that book in the list, not at the top
  let last = null;
  addEventListener('hashchange', () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id.startsWith('quote-')) { last = id; if (target?.book.id === id) { const q = target; target = null; requestAnimationFrame(() => show(q)); } return; }
    if (id !== 'quotes' || !last) return;
    const link = root.querySelector(`a[href="#${CSS.escape(last)}"]`);
    if (link) requestAnimationFrame(() => { link.scrollIntoView({ block: 'center' }); });
  });
})();
