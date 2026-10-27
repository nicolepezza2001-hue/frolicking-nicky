/* Frolicking Nicky: the Today page of the study (#today). Everything due in one place: poems and quotes to review
   (by-heart.js, window.fnHeartDue), lesson-quiz questions she missed that have come back (state.review in study.js) and
   the vocabulary words she keeps missing (state.quiz). A small "Today" link sits beside "← Back" on the study's pages. */
(() => {
  const main = document.querySelector('.fn-study-main'); if (!main) return;
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5);
  const read = key => { try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (_) { return {}; } };
  const LANGS = { french: 'French', russian: 'Russian' };

  const sec = el('section', 'fn-study-view fn-today'); sec.id = 'today'; sec.hidden = true;
  const bar = el('div', 'fn-study-bar'), back = el('a', 'fn-study-back', '← Back to the study'); back.href = '#';
  bar.append(back);
  const head = el('div', 'fn-study-head'), title = el('h2', null, 'Today'); title.id = 'today-title';
  sec.setAttribute('aria-labelledby', title.id);
  const count = el('p', 'fn-study-count'); head.append(title, count);
  const body = el('div');
  sec.append(bar, head, el('p', 'fn-study-why', 'Everything waiting for you today, in one place.'), body);
  main.append(sec);

  const item = (name, sub, href, onClick) => {
    const li = el('li'), a = el('a', 'fn-quotes-book'); a.href = href;
    a.append(el('span', 'fn-quotes-title', name), el('span', 'fn-quotes-author', sub));
    if (onClick) a.addEventListener('click', onClick);
    li.append(a); return li;
  };
  const group = (label, items) => {
    if (!items.length) return null;
    const box = el('section', 'fn-quotes-genre'), ul = el('ul', 'fn-quotes-books');
    ul.append(...items); box.append(el('h3', 'fn-study-label', label), ul); return box;
  };

  const draw = () => {
    const state = read('fn-study-v1'), d = today();
    const heart = (window.fnHeartDue?.() || []).map(p => item(p.title, p.sub, p.href, p.open));
    const quiz = Object.entries(state.review || {}).map(([id, r]) => [id, r, Object.values(r.q || {}).filter(q => q.d <= d).length])
      .filter(([id, , n]) => n && document.getElementById(id))
      .map(([id, r, n]) => item(r.title || id, n === 1 ? 'One question you missed' : n + ' questions you missed', '#' + id));
    const vocab = Object.entries(LANGS).map(([id, lang]) => {
      const words = new Set((state.vocab?.[id] || []).map(w => w.id)), n = Object.keys(state.quiz?.[id] || {}).filter(w => !words.size || words.has(w)).length;
      return n && document.getElementById(id + '-vocabulary') ? item(lang + ' vocabulary', (n === 1 ? 'One word' : n + ' words') + ' you keep missing: Quiz me brings them up first', '#' + id + '-vocabulary') : null;
    }).filter(Boolean);
    const parts = [group('By heart', heart), group('Quiz questions to try again', quiz), group('Words to practise', vocab)].filter(Boolean);
    const total = heart.length + quiz.length + vocab.length;
    count.textContent = total ? (total === 1 ? 'One thing due' : total + ' things due') : 'All done';
    body.replaceChildren(...(parts.length ? parts : [el('p', 'fn-today-none', 'Nothing is due today. Open a poem to learn by heart, or take a quiz.')]));
  };
  addEventListener('hashchange', () => { if (location.hash === '#today') draw(); });
  if (location.hash === '#today') { draw(); dispatchEvent(new HashChangeEvent('hashchange')); }

  // "Today" beside "← Back" on the study's pages (topics, Quotes, vocabulary, By heart), not on the lessons
  const links = () => document.querySelectorAll('section.fn-study-view:not(#today) > .fn-study-bar').forEach(b => {
    if (b.querySelector('.fn-today-link')) return;
    const a = el('a', 'fn-study-back fn-today-link', 'Today'); a.href = '#today'; b.append(a);
  });
  links(); addEventListener('hashchange', links);
})();
