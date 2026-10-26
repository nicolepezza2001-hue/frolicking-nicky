/* Frolicking Nicky: learning poems by heart in the study. Every poem in window.FN_POEMS (built into quote-books.js from
   tools/quote-poems.json) gets a "Learn by heart" link under its heading on its Quotes page and its own room, #heart-<poem>,
   where it can be learned in any of its versions (the original, pinyin, English, Italian), each with its own progress.
   A stanza is learned in three steps: read it (with its translation), let its words fade to first letters, then recite it
   from memory. Recited stanzas come back for review after 1, 2, 4, 7, 15, 30, 60 and 120 days (a miss starts again at one
   day), and the top of Quotes lists what is due today. Progress is saved in fn-study-heart-v1 and synced like the rest. */
(() => {
  const POEMS = window.FN_POEMS || [];
  if (!POEMS.length) return;
  const KEY = 'fn-study-heart-v1', GAPS = [0, 1, 2, 4, 7, 15, 30, 60, 120], PASS = 0.9;
  let state = {};
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) {}
  state.poems ||= {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {} window.fnStudyChanged?.(); };
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  const button = (text, cls = 'fn-study-btn') => { const b = el('button', cls, text); b.type = 'button'; return b; };
  const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5);
  // Each poem remembers the version she is learning it in ("at") and her progress in every version ("v")
  const saved = poem => {
    const p = state.poems[poem.id] ||= {};
    if (p.s) { p.v = { [poem.versions[0].lang]: { s: p.s } }; delete p.s; } // progress saved before poems had versions
    p.v ||= {}; return p;
  };
  const version = poem => poem.versions.find(v => v.lang === saved(poem).at) || poem.versions[0];
  const progress = poem => (saved(poem).v[version(poem).lang] ||= { s: {} }).s;
  const lines = poem => version(poem).stanzas;
  const learned = poem => Object.keys(progress(poem)).length;
  const due = poem => Object.entries(progress(poem)).filter(([, s]) => s.d <= today()).map(([i]) => +i).sort((a, b) => a - b);
  const fresh = poem => lines(poem).findIndex((_, i) => !progress(poem)[i]);
  const plural = (n, one, many) => n + ' ' + (n === 1 ? one : many);
  const summary = poem => {
    const n = learned(poem), d = due(poem).length;
    return `${n} of ${plural(lines(poem).length, 'stanza', 'stanzas')} by heart` + (poem.versions.length > 1 ? ` in ${version(poem).label}` : '') + (d ? ` · ${d} to review today` : '');
  };
  // A recited stanza moves up a step and comes back later; a miss starts it again tomorrow
  const mark = (poem, i, right) => {
    const s = progress(poem), b = right ? Math.min((s[i]?.b || 0) + 1, GAPS.length - 1) : 1;
    s[i] = { b, d: today() + GAPS[b] }; save();
  };

  // Words are compared without case, accents or punctuation, so "Soffrire," and "soffrire" match
  const fold = w => w.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
  // Dashes part words too ("softly—fairer", "lute-playings"), and every Chinese character counts as a word of its own
  const SPLIT = /(\p{Script=Han}|[\s\u2013\u2014-]+)/u, HAN = /^\p{Script=Han}$/u;
  const words = text => text.split(SPLIT).filter(w => fold(w));
  // Which words of the stanza were said, in order (longest common run of words)
  const said = (stanza, typed) => {
    const a = words(stanza).map(fold), b = words(typed).map(fold), L = a.map(() => new Array(b.length + 1).fill(0));
    L.push(new Array(b.length + 1).fill(0));
    for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const hit = new Set(); let i = 0, j = 0;
    while (i < a.length && j < b.length) { if (a[i] === b[j]) { hit.add(i); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++; }
    return hit;
  };
  // The stanza as lines of word spans, so single words can fade, be revealed or be marked
  const verse = (stanza, each) => {
    const box = el('div', 'fn-heart-verse'); let n = 0;
    stanza.split('\n').forEach(line => {
      const row = el('p', 'fn-heart-line');
      line.split(SPLIT).forEach(part => {
        if (!fold(part)) { row.append(part); return; }
        const w = el('span', 'fn-heart-word', part); each?.(w, n++, part); row.append(w);
      });
      box.append(row);
    });
    return box;
  };
  const hint = word => { if (HAN.test(word)) return '〇'; const m = word.match(/^([^\p{L}\p{N}]*[\p{L}\p{N}])(.*)$/u); return m ? m[1] + m[2].replace(/[\p{L}\p{N}]/gu, '·') : word; };

  // ---- A poem's room ------------------------------------------------------------------------------------
  const main = document.querySelector('.fn-study-main') || document.body;
  const room = poem => {
    const sec = el('section', 'fn-study-view fn-heart'); sec.id = 'heart-' + poem.id; sec.hidden = true;
    const bar = el('nav', 'fn-study-bar'), back = el('a', 'fn-study-back', '← ' + poem.title); back.href = '#' + poem.book;
    const all = el('a', 'fn-study-back fn-heart-all', 'All quotes'); all.href = '#quotes';
    bar.append(back, all);
    const head = el('div', 'fn-study-head'), title = el('h2', null, 'By heart'); title.id = sec.id + '-title';
    sec.setAttribute('aria-labelledby', title.id);
    const count = el('p', 'fn-study-count'); head.append(title, count);
    const why = el('p', 'fn-study-why', poem.title + (poem.author ? ', ' + poem.author : '') + '. One stanza at a time: read it, let it fade, then say it from memory.');
    // The version she learns it in; each keeps its own progress
    const langs = el('div', 'fn-vocab-modes fn-heart-langs');
    if (poem.versions.length > 1) {
      langs.append(el('span', 'fn-heart-langs-label', 'Learn it in'));
      poem.versions.forEach(v => {
        const b = button(v.label, 'fn-vocab-mode'); b.lang = v.lang;
        b.addEventListener('click', () => { saved(poem).at = v.lang; save(); queue = []; stage.replaceChildren(); draw(); });
        langs.append(b);
      });
    }
    const actions = el('div', 'fn-vocab-modes fn-heart-actions'), stage = el('div', 'fn-heart-stage');
    stage.setAttribute('aria-live', 'polite');
    const mapLabel = el('h3', 'fn-study-label', 'The stanzas'), map = el('ol', 'fn-heart-map');
    sec.append(bar, head, why, langs, actions, stage, mapLabel, map);

    let queue = [], kind = '';
    const draw = () => {
      count.textContent = summary(poem); sec.dataset.script = /^zh/.test(version(poem).lang) ? 'zh' : '';
      langs.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.lang === version(poem).lang)));
      const d = due(poem), next = fresh(poem);
      actions.replaceChildren();
      if (d.length) { const b = button(`Review ${plural(d.length, 'stanza', 'stanzas')}`); b.addEventListener('click', () => start(d, 'review')); actions.append(b); }
      if (next >= 0) { const b = button(learned(poem) ? 'Learn the next stanza' : 'Learn the first stanza', d.length ? 'fn-vocab-mode' : 'fn-study-btn'); b.addEventListener('click', () => start([next], 'learn')); actions.append(b); }
      const known = lines(poem).map((_, i) => i).filter(i => progress(poem)[i]);
      if (known.length > 1) { const b = button('Recite all I know', 'fn-vocab-mode'); b.addEventListener('click', () => start(known, 'recite')); actions.append(b); }
      map.replaceChildren(...lines(poem).map((stanza, i) => {
        const s = progress(poem)[i], li = el('li'), a = button(String(i + 1), 'fn-heart-dot');
        a.title = stanza.split('\n')[0];
        a.setAttribute('aria-label', `Stanza ${i + 1}` + (s ? (s.d <= today() ? ', to review' : ', by heart') : ''));
        a.dataset.step = s ? Math.min(s.b, 5) : 0; if (s && s.d <= today()) a.dataset.due = '';
        a.addEventListener('click', () => start([i], s ? 'review' : 'learn'));
        li.append(a); return li;
      }));
    };
    const start = (list, how) => { queue = [...list]; kind = how; turn(); stage.scrollIntoView({ block: 'start', behavior: 'smooth' }); };
    const done = () => {
      stage.replaceChildren(el('p', 'fn-quiz-q', 'Well done.'), el('p', 'fn-quiz-progress', summary(poem)));
      const again = due(poem), next = fresh(poem), row = el('div', 'fn-vocab-modes');
      if (again.length) { const b = button('Review the rest'); b.addEventListener('click', () => start(again, 'review')); row.append(b); }
      else if (next >= 0) { const b = button('Learn the next stanza'); b.addEventListener('click', () => start([next], 'learn')); row.append(b); }
      stage.append(row); draw();
    };
    const turn = () => {
      draw();
      if (!queue.length) return done();
      const i = queue[0], learning = kind === 'learn' && !progress(poem)[i];
      learning ? read(i) : recite(i, kind === 'recite' ? 'all' : 'review');
    };
    const label = i => el('p', 'fn-quiz-progress', `Stanza ${i + 1} of ${lines(poem).length}` + (queue.length > 1 ? ` · ${queue.length - 1} more after this` : ''));
    // The line before a stanza, so she can hear where it starts from
    const cue = i => i > 0 ? el('p', 'fn-heart-cue', '… ' + lines(poem)[i - 1].split('\n').at(-1)) : null;

    // Step 1: read it, with the translation underneath
    const read = i => {
      const v = version(poem), parts = [label(i), el('p', 'fn-heart-step', 'Read it slowly, aloud if you can.'), verse(v.stanzas[i])];
      parts[2].lang = v.lang;
      poem.versions.filter(o => o !== v && o.stanzas[i]).forEach(o => { const t = el('p', 'fn-heart-translation', o.stanzas[i]); t.lang = o.lang; parts.push(t); });
      const go = button('Let it fade'); go.addEventListener('click', () => fade(i, 1));
      const row = el('div', 'fn-vocab-modes'); row.append(go);
      stage.replaceChildren(...parts, row); go.focus({ preventScroll: true });
    };
    // Step 2: more words fade to their first letter each time; tap a word to see it again
    const fade = (i, level) => {
      const v = verse(lines(poem)[i], (w, n, word) => {
        if ((n * 7 + 3) % 4 < level) { w.textContent = hint(word); w.classList.add('is-faded'); w.tabIndex = 0;
          const peek = () => { w.textContent = word; w.classList.remove('is-faded'); };
          w.addEventListener('click', peek); w.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); peek(); } }); }
      });
      v.lang = version(poem).lang;
      const row = el('div', 'fn-vocab-modes');
      if (level < 4) { const more = button('Fade more'); more.addEventListener('click', () => fade(i, level + 1)); row.append(more); }
      const go = button('Say it from memory', level < 4 ? 'fn-vocab-mode' : 'fn-study-btn'); go.addEventListener('click', () => recite(i, 'learn'));
      row.append(go);
      stage.replaceChildren(label(i), el('p', 'fn-heart-step', level < 4 ? 'Say it through, peeking only when you must. Tap a word to see it.' : 'Only first letters now. Tap a word if you are stuck.'), v, row);
    };
    // Step 3: type it from memory; the words she said are shown in yellow, the ones she missed underlined
    const recite = (i, how) => {
      const form = el('form', 'fn-heart-form'), box = el('textarea'); box.rows = lines(poem)[i].split('\n').length + 1;
      box.lang = version(poem).lang; box.setAttribute('aria-label', `Stanza ${i + 1} from memory`); box.spellcheck = false;
      box.autocapitalize = 'off'; box.setAttribute('autocorrect', 'off');
      const check = el('button', 'fn-study-btn', 'Check'); check.type = 'submit';
      const peek = button('First letters', 'fn-vocab-mode'), row = el('div', 'fn-vocab-modes'); row.append(check, peek);
      const help = el('div', 'fn-heart-help');
      peek.addEventListener('click', () => { const v = verse(lines(poem)[i], (w, n, word) => { w.textContent = hint(word); w.classList.add('is-faded'); }); help.replaceChildren(v); peek.remove(); box.focus(); });
      form.append(box, row);
      const result = el('div', 'fn-quiz-result');
      form.addEventListener('submit', e => {
        e.preventDefault(); if (!box.value.trim()) return box.focus();
        const hit = said(lines(poem)[i], box.value), total = words(lines(poem)[i]).length, score = hit.size / total, right = score >= PASS;
        const v = verse(lines(poem)[i], (w, n) => w.classList.add(hit.has(n) ? 'is-said' : 'is-missed')); v.lang = version(poem).lang;
        box.disabled = true; row.remove(); help.remove();
        const next = button('Next'), redo = button('Try again', 'fn-vocab-mode'), fine = button('I was right', 'fn-vocab-mode'), buttons = el('div', 'fn-vocab-modes');
        const tally = ok => { mark(poem, i, ok); queue.shift(); if (!ok) queue.push(i); };
        next.addEventListener('click', () => { tally(right); turn(); });
        fine.addEventListener('click', () => { tally(true); turn(); });
        redo.addEventListener('click', () => recite(i, how));
        buttons.append(next); if (!right) buttons.append(redo, fine);
        result.replaceChildren(el('p', 'fn-quiz-verdict', right ? (score === 1 ? 'Every word.' : `Yes: ${hit.size} of ${total} words.`) : `${hit.size} of ${total} words. Underlined: the ones that slipped away.`), v, buttons);
        next.focus({ preventScroll: true });
      });
      stage.replaceChildren(...[label(i), el('p', 'fn-heart-step', how === 'learn' ? 'Now without looking.' : 'From memory.'), cue(i), help, form, result].filter(Boolean));
      box.focus({ preventScroll: true });
    };
    draw();
    addEventListener('hashchange', () => { if (location.hash === '#' + sec.id) { queue = []; stage.replaceChildren(); draw(); } });
    return sec;
  };
  POEMS.forEach(poem => main.append(room(poem)));

  // A "Learn by heart" link under each poem's heading on its Quotes page
  const buttons = () => POEMS.forEach(poem => {
    const page = document.getElementById(poem.book);
    const heading = [...(page?.querySelectorAll('.fn-lesson-notes h3') || [])].find(h => h.textContent === poem.heading);
    if (!heading || heading.nextElementSibling?.classList.contains('fn-heart-open')) return;
    const p = el('p', 'fn-heart-open'), a = el('a', 'fn-highlight-mode', 'Learn by heart'); a.href = '#heart-' + poem.id;
    p.append(a); heading.after(p);
  });
  buttons();
  // Edit lesson redraws the page, so the links are put back
  const redraw = window.fnRedrawLesson;
  if (redraw) window.fnRedrawLesson = id => { const r = redraw(id); buttons(); return r; };

  // At the top of Quotes: the poems being learned, and how many stanzas are due today
  const shelf = document.getElementById('fn-quotes');
  const list = () => {
    shelf?.querySelector('.fn-heart-shelf')?.remove();
    const going = POEMS.filter(p => learned(p));
    const box = el('section', 'fn-heart-shelf'), ul = el('ul', 'fn-quotes-books');
    box.append(el('h3', 'fn-study-label', 'By heart'));
    (going.length ? going : POEMS).forEach(poem => {
      const li = el('li'), a = el('a', 'fn-quotes-book'); a.href = '#heart-' + poem.id;
      a.append(el('span', 'fn-quotes-title', poem.title), el('span', 'fn-quotes-author', learned(poem) ? summary(poem) : 'Not started yet'));
      if (due(poem).length) a.dataset.due = '';
      li.append(a); ul.append(li);
    });
    box.append(ul); shelf?.prepend(box);
  };
  list();
  addEventListener('hashchange', () => { if (location.hash === '#quotes') list(); });
})();
