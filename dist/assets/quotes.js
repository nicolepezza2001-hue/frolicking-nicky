/* Frolicking Nicky: the Quotes page of the study (#quotes, the three books on the painting).
   Lists every book Nicky has kept quotes from, by genre and then A to Z (window.FN_QUOTE_BOOKS, quote-books.js, built every
   morning from her Notion and Goodreads quotes by tools/sync-quotes.mjs). Each book opens its own notes page (study.js
   renders them like the other lessons, with highlights and margin notes). */
(() => {
  const root = document.getElementById('fn-quotes'), count = document.getElementById('fn-quotes-count');
  const books = window.FN_QUOTE_BOOKS || [];
  if (!root) return;
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  let list;
  books.forEach((book, i) => {
    if (book.genre !== books[i - 1]?.genre) {
      const shelf = el('section', 'fn-quotes-genre');
      shelf.append(el('h3', 'fn-study-label', book.genre));
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
    if (id.startsWith('quote-')) { last = id; return; }
    if (id !== 'quotes' || !last) return;
    const link = root.querySelector(`a[href="#${CSS.escape(last)}"]`);
    if (link) requestAnimationFrame(() => { link.scrollIntoView({ block: 'center' }); });
  });
})();
