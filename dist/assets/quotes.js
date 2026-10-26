/* Frolicking Nicky: the Quotes page of the study (#quotes, the three books on the painting).
   The quotes come from assets/quotes.json, which .github/workflows/sync-quotes.yml refreshes every morning from
   Nicky's Goodreads quotes and her Notion page "Quotes" (tools/sync-quotes.mjs). Her wording is kept exactly;
   this file only lays it out: a quote drawn at random, a search box, then Goodreads and Notion in their own order. */
(() => {
  const root = document.getElementById('fn-quotes'), count = document.getElementById('fn-quotes-count');
  if (!root) return;
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  const quote = (text, cite) => {
    const fig = el('figure', 'fn-quote');
    fig.append(el('blockquote', null, text));
    if (cite) fig.append(el('figcaption', null, cite));
    return fig;
  };

  fetch('/assets/quotes.json', { cache: 'no-cache' }).then(r => r.json()).then(({ notion = [], goodreads = [] }) => {
    const pool = []; // [text, cite] for the quote drawn at random
    const groups = []; // { box, items: [{ node, words }] } for the search
    const list = el('div', 'fn-quotes-list');
    const group = (label, kicker) => {
      const box = el('section', 'fn-quotes-group');
      if (kicker) box.append(el('p', 'fn-study-label', kicker));
      if (label) box.append(el('h3', 'fn-quotes-source', label));
      const g = { box, items: [] }; groups.push(g); list.append(box); return g;
    };
    const add = (g, node, words) => { g.box.append(node); g.items.push({ node, words: words.toLowerCase() }); };

    if (goodreads.length) {
      const g = group(null, 'From Goodreads');
      goodreads.forEach(q => {
        const cite = [q.author, q.book].filter(Boolean).join(', ');
        add(g, quote(q.text, cite), q.text + ' ' + cite);
        pool.push([q.text, cite]);
      });
    }

    let g = group(null, 'From Notion'), source = '';
    notion.forEach(b => {
      if (b.t === 'h') { g = group(b.text); source = b.text; }
      else if (b.t === 'gap') g.box.append(el('hr', 'fn-quotes-rule'));
      else if (b.t === 'p') {
        add(g, quote(b.text, b.cite), b.text + ' ' + (b.cite || '') + ' ' + source);
        pool.push([b.text, b.cite]); // a bold line can head her quotes or close them, so only a quote's own source is shown here
      } else if (b.t === 'pre') {
        // Poems and longer passages: each paragraph on its own, line breaks kept; a short last line is the source
        const parts = b.text.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
        const last = parts.at(-1);
        const cite = parts.length > 1 && !last.includes('\n') && last.length <= 60 && !/[.!?»"”…:;,]$/.test(last) ? parts.pop() : '';
        const fig = el('figure', 'fn-quote fn-quote-long');
        parts.forEach(p => fig.append(el('blockquote', null, p)));
        if (cite) fig.append(el('figcaption', null, cite));
        add(g, fig, b.text + ' ' + source);
        parts.forEach(p => { if (p.length <= 420 && p.length > 25) pool.push([p, parts.length === 1 ? cite : '']); });
      }
    });
    groups.forEach(x => { while (x.box.lastChild?.matches('hr')) x.box.lastChild.remove(); });

    // One quote at a time, drawn from all of them
    const drawn = el('div', 'fn-quotes-drawn');
    const showOne = () => {
      const short = pool.filter(([t]) => t.length <= 420);
      const [text, cite] = short[Math.floor(Math.random() * short.length)] || [];
      if (!text) return;
      drawn.replaceChildren(quote(text, cite));
      const again = el('button', 'fn-study-btn', 'Another quote'); again.type = 'button'; again.addEventListener('click', showOne);
      drawn.append(again);
    };
    showOne();

    const search = el('input'); search.type = 'text'; search.placeholder = 'Search the quotes';
    search.setAttribute('aria-label', 'Search the quotes'); search.className = 'fn-quotes-search';
    const none = el('p', 'fn-quotes-none', 'No quote has those words.'); none.hidden = true;
    search.addEventListener('input', () => {
      const words = search.value.toLowerCase().split(/\s+/).filter(Boolean);
      let any = false;
      groups.forEach(x => {
        let shown = 0;
        x.items.forEach(i => { const hit = words.every(w => i.words.includes(w)); i.node.hidden = !hit; if (hit) shown++; });
        x.box.classList.toggle('is-searching', !!words.length);
        x.box.hidden = !shown && !!words.length; any = any || !!shown;
      });
      none.hidden = any || !words.length;
    });

    count.textContent = groups.reduce((n, x) => n + x.items.length, 0) + ' quotes';
    root.replaceChildren(drawn, search, none, list);
  }).catch(() => { root.replaceChildren(el('p', 'fn-quotes-none', 'The quotes couldn’t be loaded just now.')); });
})();
