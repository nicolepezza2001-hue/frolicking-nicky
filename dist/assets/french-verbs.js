/* Frolicking Nicky: Irregular verbs, a page on the French path (#french-verbs). Each verb opens its tables (présent,
   passé composé, imparfait, futur simple, conditionnel, subjonctif présent and the passé simple of books); "Test yourself"
   asks one form at a time or a whole tense to fill in. Forms she misses come up more often and are listed on Today
   (today.js); they live in fn-study-verbs-v1, synced with the other study keys (study-sync.js).
   The tables are built from a few forms per verb: the six present forms, the past participle and auxiliary, the future
   stem, the passé simple stem and type; the imparfait comes from "nous", the subjunctive from "ils" and "nous", except
   where a verb has its own (SUBJ). */
(() => {
  const main = document.querySelector('.fn-study-main'); if (!main) return;

  // [infinitive, English, présent ×6, participle, être?, future stem, passé simple stem + type (i, u, in, a)]
  const VERBS = [
    ['être', 'to be', 'suis es est sommes êtes sont', 'été', 0, 'ser', 'f u'],
    ['avoir', 'to have', 'ai as a avons avez ont', 'eu', 0, 'aur', 'e u'],
    ['aller', 'to go', 'vais vas va allons allez vont', 'allé', 1, 'ir', 'all a'],
    ['faire', 'to do, to make', 'fais fais fait faisons faites font', 'fait', 0, 'fer', 'f i'],
    ['dire', 'to say', 'dis dis dit disons dites disent', 'dit', 0, 'dir', 'd i'],
    ['pouvoir', 'can, to be able to', 'peux peux peut pouvons pouvez peuvent', 'pu', 0, 'pourr', 'p u'],
    ['vouloir', 'to want', 'veux veux veut voulons voulez veulent', 'voulu', 0, 'voudr', 'voul u'],
    ['devoir', 'must, to owe', 'dois dois doit devons devez doivent', 'dû', 0, 'devr', 'd u'],
    ['savoir', 'to know (a fact)', 'sais sais sait savons savez savent', 'su', 0, 'saur', 's u'],
    ['venir', 'to come', 'viens viens vient venons venez viennent', 'venu', 1, 'viendr', 'v in'],
    ['tenir', 'to hold', 'tiens tiens tient tenons tenez tiennent', 'tenu', 0, 'tiendr', 't in'],
    ['prendre', 'to take', 'prends prends prend prenons prenez prennent', 'pris', 0, 'prendr', 'pr i'],
    ['mettre', 'to put', 'mets mets met mettons mettez mettent', 'mis', 0, 'mettr', 'm i'],
    ['voir', 'to see', 'vois vois voit voyons voyez voient', 'vu', 0, 'verr', 'v i'],
    ['croire', 'to believe', 'crois crois croit croyons croyez croient', 'cru', 0, 'croir', 'cr u'],
    ['boire', 'to drink', 'bois bois boit buvons buvez boivent', 'bu', 0, 'boir', 'b u'],
    ['connaître', 'to know (a person, a place)', 'connais connais connaît connaissons connaissez connaissent', 'connu', 0, 'connaîtr', 'conn u'],
    ['vivre', 'to live', 'vis vis vit vivons vivez vivent', 'vécu', 0, 'vivr', 'véc u'],
    ['écrire', 'to write', 'écris écris écrit écrivons écrivez écrivent', 'écrit', 0, 'écrir', 'écriv i'],
    ['lire', 'to read', 'lis lis lit lisons lisez lisent', 'lu', 0, 'lir', 'l u'],
    ['partir', 'to leave', 'pars pars part partons partez partent', 'parti', 1, 'partir', 'part i'],
    ['sortir', 'to go out', 'sors sors sort sortons sortez sortent', 'sorti', 1, 'sortir', 'sort i'],
    ['dormir', 'to sleep', 'dors dors dort dormons dormez dorment', 'dormi', 0, 'dormir', 'dorm i'],
    ['ouvrir', 'to open', 'ouvre ouvres ouvre ouvrons ouvrez ouvrent', 'ouvert', 0, 'ouvrir', 'ouvr i'],
    ['recevoir', 'to receive', 'reçois reçois reçoit recevons recevez reçoivent', 'reçu', 0, 'recevr', 'reç u'],
    ['courir', 'to run', 'cours cours court courons courez courent', 'couru', 0, 'courr', 'cour u'],
    ['mourir', 'to die', 'meurs meurs meurt mourons mourez meurent', 'mort', 1, 'mourr', 'mour u'],
    ['naître', 'to be born', 'nais nais naît naissons naissez naissent', 'né', 1, 'naîtr', 'naqu i'],
    ['suivre', 'to follow', 'suis suis suit suivons suivez suivent', 'suivi', 0, 'suivr', 'suiv i'],
    ['conduire', 'to drive', 'conduis conduis conduit conduisons conduisez conduisent', 'conduit', 0, 'conduir', 'conduis i'],
    ['envoyer', 'to send', 'envoie envoies envoie envoyons envoyez envoient', 'envoyé', 0, 'enverr', 'envoy a']
  ];
  const SUBJ = {
    être: 'sois sois soit soyons soyez soient', avoir: 'aie aies ait ayons ayez aient',
    aller: 'aille ailles aille allions alliez aillent', faire: 'fasse fasses fasse fassions fassiez fassent',
    pouvoir: 'puisse puisses puisse puissions puissiez puissent', vouloir: 'veuille veuilles veuille voulions vouliez veuillent',
    savoir: 'sache saches sache sachions sachiez sachent'
  };
  const TENSES = [
    ['present', 'Présent'], ['pc', 'Passé composé'], ['imparfait', 'Imparfait'], ['futur', 'Futur simple'],
    ['conditionnel', 'Conditionnel'], ['subjonctif', 'Subjonctif présent'], ['ps', 'Passé simple']
  ];
  const PERSONS = ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles'];
  const end = (stem, endings) => endings.split(' ').map(e => stem + e);
  const PS = { i: 's s t ^mes ^tes rent', u: 's s t ^mes ^tes rent', in: 's s t ^mes ^tes rent', a: 'ai as a âmes âtes èrent' };
  const HAT = { i: 'î', u: 'û', in: 'în' };

  const forms = v => {
    const [inf, , pres, pp, etre, fut, ps] = v, p = pres.split(' ');
    const imp = inf === 'être' ? 'ét' : p[3].slice(0, -3);
    const ils = p[5].slice(0, -3), subj = SUBJ[inf] ? SUBJ[inf].split(' ') : [...end(ils, 'e es e'), imp + 'ions', imp + 'iez', ils + 'ent'];
    const [psStem, type] = ps.split(' ');
    const passe = type === 'a' ? end(psStem, PS.a)
      : PS[type].split(' ').map(e => psStem + (e.startsWith('^') ? HAT[type] + e.slice(1) : type + e));
    const aux = etre ? 'suis es est sommes êtes sont'.split(' ') : 'ai as a avons avez ont'.split(' ');
    // With être the participle agrees: allé(e), allé(e)s; the answer may be typed either way
    const pc = aux.map((a, i) => a + ' ' + pp + (etre ? (i < 3 ? '(e)' : '(e)s') : ''));
    return { present: p, pc, imparfait: end(imp, 'ais ais ait ions iez aient'), futur: end(fut, 'ai as a ons ez ont'),
      conditionnel: end(fut, 'ais ais ait ions iez aient'), subjonctif: subj, ps: passe };
  };
  const TABLE = Object.fromEntries(VERBS.map(v => [v[0], forms(v)]));

  // "je" becomes "j’" before a vowel; the subjunctive is said with "que"
  const who = (i, form, tense) => {
    let p = PERSONS[i]; if (i === 0 && /^[aeéèêiîoôuh]/i.test(form)) p = 'j’';
    if (tense === 'subjonctif') p = (/^[ie]/.test(p) ? 'qu’' : 'que ') + p;
    return p;
  };
  const say = (i, form, tense) => { const p = who(i, form, tense); return (p.endsWith('’') ? p : p + ' ') + form; };

  const KEY = 'fn-study-verbs-v1';
  let saved = {}; try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) {}
  const store = () => { saved.miss ||= {}; try { localStorage.setItem(KEY, JSON.stringify(saved)); window.fnStudyChanged?.(); } catch (_) {} };
  const misses = () => (saved.miss ||= {});
  const chosen = () => saved.tenses || ['present', 'pc', 'imparfait', 'futur', 'conditionnel', 'subjonctif'];

  // Answers: case, apostrophes, a typed pronoun or "que" and the (e)/(s) of agreement don't matter; accents do, gently
  const bare = t => t.toLowerCase().replace(/[’']/g, '’').replace(/\s+/g, ' ').trim()
    .replace(/^qu(e |’)/, '').replace(/^(je |j’|tu |il |elle |on |nous |vous |ils |elles )/, '').trim();
  const flat = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const answers = form => {
    const m = form.match(/^(.*)\(e\)(\(?s\)?)?$/); if (!m) return [form];
    return m[2] ? [m[1] + 's', m[1] + 'es'] : [m[1], m[1] + 'e'];
  };
  const judge = (typed, form) => {
    const t = bare(typed); if (!t) return 0;
    const ok = answers(form);
    if (ok.includes(t)) return 2;
    return ok.some(a => flat(a) === flat(t)) ? 1 : 0; // 1: right but for an accent
  };

  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  const button = (cls, text, on) => { const b = el('button', cls, text); b.type = 'button'; b.addEventListener('click', on); return b; };
  const row = (...items) => { const r = el('div', 'fn-vocab-modes'); r.append(...items); return r; };
  const VOICE = () => speechSynthesis.getVoices().find(v => /^fr/i.test(v.lang));
  const listen = text => {
    if (!('speechSynthesis' in window)) return null;
    const b = el('button', 'fn-listen'); b.type = 'button'; b.setAttribute('aria-label', 'Listen');
    b.innerHTML = '<svg viewBox="0 0 24 24" width="1.15em" height="1.15em" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z"/><path d="M15.2 9.2a4 4 0 0 1 0 5.6"/><path d="M17.6 6.8a7.4 7.4 0 0 1 0 10.4"/></svg>';
    b.addEventListener('click', () => {
      speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text.replace(/\(e?\)|\(s\)/g, ''));
      u.lang = 'fr-FR'; const v = VOICE(); if (v) u.voice = v; u.rate = .9; speechSynthesis.speak(u);
    });
    return b;
  };

  const sec = el('section', 'fn-study-topic fn-study-view fn-vocab-page fn-verbs'); sec.id = 'french-verbs'; sec.hidden = true;
  const bar = el('div', 'fn-study-bar'), back = el('a', 'fn-study-back', '← French'); back.href = '#french';
  bar.append(back);
  sec.append(bar, el('h2', null, 'Irregular verbs'),
    el('p', 'fn-study-why', 'The verbs that don’t follow the rules, in every tense. Open one to see its tables, then test yourself.'));

  // Test yourself: which tenses, then one form at a time or a whole tense
  const head = el('div', 'fn-vocab-head'), label = el('p', 'fn-study-label', 'Test yourself');
  const tenses = el('div', 'fn-vocab-modes fn-verbs-tenses'); tenses.setAttribute('role', 'group'); tenses.setAttribute('aria-label', 'Tenses to test');
  TENSES.forEach(([id, name]) => {
    const b = button('fn-vocab-mode', name, () => {
      const on = chosen().includes(id), next = on ? chosen().filter(x => x !== id) : chosen().concat(id);
      if (!next.length) return; saved.tenses = TENSES.map(t => t[0]).filter(t => next.includes(t)); store(); paint();
    });
    b.dataset.tense = id; tenses.append(b);
  });
  const paint = () => tenses.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(chosen().includes(b.dataset.tense))));
  const modes = el('div', 'fn-vocab-modes');
  const missedBtn = button('fn-vocab-mode', 'The ones I miss', () => run('form', null, true));
  modes.append(button('fn-study-btn', 'One form at a time', () => run('form')), button('fn-vocab-mode', 'A whole tense', () => run('table')), missedBtn);
  head.append(label);
  const hint = el('p', 'fn-study-saved', 'Tenses to test (tap to choose):');
  const quiz = el('div', 'fn-quiz'); quiz.hidden = true;

  // The verbs, each a drop-down with its tables
  const list = el('div', 'fn-verbs-list');
  VERBS.forEach(v => {
    const d = el('details', 'fn-verb'), s = el('summary');
    s.append(el('span', 'fn-verb-inf', v[0]), el('span', 'fn-verb-en', v[1]));
    d.append(s);
    d.addEventListener('toggle', () => {
      if (!d.open || d.querySelector('.fn-verb-tables')) return;
      const grid = el('div', 'fn-verb-tables');
      TENSES.forEach(([id, name]) => {
        const box = el('div', 'fn-verb-tense'), h = el('p', 'fn-verb-tense-name', name), ol = el('ol');
        TABLE[v[0]][id].forEach((f, i) => { const li = el('li'); li.lang = 'fr'; const w = who(i, f, id); li.append(el('span', 'fn-verb-who', w), w.endsWith('’') ? '' : ' ', el('span', 'fn-verb-form', f)); ol.append(li); });
        const ear = listen(TABLE[v[0]][id].map((f, i) => say(i, f, id)).join(', ')); if (ear) h.append(' ', ear);
        box.append(h, ol); grid.append(box);
      });
      d.append(grid, row(button('fn-vocab-mode', 'Test me on ' + v[0], () => run('form', v[0]))));
    });
    list.append(d);
  });

  const listView = [hint, tenses, modes, list];
  const close = () => { quiz.hidden = true; listView.forEach(e => { e.hidden = false; }); missedBtn.hidden = !Object.keys(misses()).length; scrollTo(0, 0); };
  const pickItems = (n, only, missedOnly) => {
    const pool = [];
    VERBS.forEach(v => { if (only && v[0] !== only) return; chosen().forEach(t => TABLE[v[0]][t].forEach((f, i) => pool.push({ verb: v, tense: t, i, form: f, key: `${v[0]}|${t}|${i}` }))); });
    const m = misses(), from = missedOnly ? pool.filter(x => m[x.key]) : pool;
    // Weighted draw without repeats: each miss makes a form three times as likely to come back
    return from.map(x => [Math.random() ** (1 / (1 + 2 * (m[x.key] || 0))), x]).sort((a, b) => b[0] - a[0]).slice(0, n).map(x => x[1]);
  };
  const mark = (key, right) => { const m = misses(); if (right) { if (m[key] > 1) m[key]--; else delete m[key]; } else m[key] = (m[key] || 0) + 1; store(); };
  const tenseName = id => TENSES.find(t => t[0] === id)[1];

  const run = (kind, only, missedOnly) => {
    listView.forEach(e => { e.hidden = true; }); quiz.hidden = false;
    let n = 0, score = 0, out = 0; const missed = [];
    const finish = () => {
      quiz.replaceChildren(el('p', 'fn-quiz-q', `${score} / ${out}`), el('p', 'fn-quiz-progress', missed.length ? 'To look at again:' : 'Every one right.'));
      if (missed.length) {
        const ul = el('ul', 'fn-quiz-missed');
        missed.forEach(x => { const li = el('li'), a = el('span', null, say(x.i, x.form, x.tense)); a.lang = 'fr'; li.append(a, el('span', null, x.verb[0] + ', ' + tenseName(x.tense).toLowerCase())); ul.append(li); });
        quiz.append(ul);
      }
      quiz.append(row(button('fn-vocab-mode', 'Another round', () => run(kind, only, missedOnly && Object.keys(misses()).length)), button('fn-vocab-mode', 'Back to the verbs', close)));
    };
    if (kind === 'table') {
      const rounds = [];
      VERBS.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).slice(0, 5)
        .forEach(([, v]) => { const t = chosen()[Math.floor(Math.random() * chosen().length)]; rounds.push({ verb: v, tense: t }); });
      const ask = () => {
        if (n === rounds.length) return finish();
        const { verb, tense } = rounds[n], q = el('p', 'fn-quiz-q', verb[0]); q.lang = 'fr';
        const form = el('form', 'fn-verbs-fill'), boxes = TABLE[verb[0]][tense].map((f, i) => {
          const r = el('label', 'fn-verbs-line'), input = el('input');
          input.type = 'text'; input.autocomplete = 'off'; input.spellcheck = false; input.lang = 'fr'; input.setAttribute('autocapitalize', 'off');
          r.append(el('span', 'fn-verb-who', who(i, f, tense)), input);
          form.append(r); return [input, f, i, r];
        });
        const check = el('button', 'fn-study-btn', 'Check'); check.type = 'submit'; form.append(row(check));
        form.addEventListener('submit', e => {
          e.preventDefault(); if (check.disabled) return; check.disabled = true;
          let right = 0;
          boxes.forEach(([input, f, i, r]) => {
            const j = judge(input.value, f); input.disabled = true; out++;
            mark(`${verb[0]}|${tense}|${i}`, j > 0);
            if (j) { right++; score++; } else missed.push({ verb, tense, i, form: f });
            r.classList.add(j ? 'is-right' : 'is-wrong');
            if (j < 2) r.append(el('span', 'fn-verbs-fix', (j ? 'mind the accent: ' : '') + f));
          });
          check.replaceWith(button('fn-study-btn', n + 1 === rounds.length ? 'See my score' : 'Next', () => { n++; ask(); }));
          form.querySelector('.fn-study-btn').focus();
          const ear = listen(TABLE[verb[0]][tense].map((f, i) => say(i, f, tense)).join(', ')); if (ear) q.append(' ', ear);
          tally.textContent = right === 6 ? 'All six.' : `${right} of 6.`;
        });
        const tally = el('p', 'fn-quiz-verdict'); tally.setAttribute('aria-live', 'polite');
        q.append(' ', el('span', 'fn-verb-en', verb[1]));
        quiz.replaceChildren(el('p', 'fn-quiz-progress', `${n + 1} of ${rounds.length} · ${tenseName(tense)}`), q, form, tally);
        boxes[0][0].focus();
      };
      return ask();
    }
    const round = pickItems(10, only, missedOnly);
    if (!round.length) return close();
    const ask = () => {
      if (n === round.length) return finish();
      const x = round[n], q = el('p', 'fn-quiz-q', x.verb[0]); q.lang = 'fr'; q.append(' ', el('span', 'fn-verb-en', x.verb[1]));
      const cue = el('p', 'fn-verbs-cue'); cue.append(el('em', null, tenseName(x.tense)), ' · ', el('span', null, who(x.i, x.form, x.tense) + (who(x.i, x.form, x.tense).endsWith('’') ? '…' : ' …')));
      const form = el('form', 'fn-study-add fn-quiz-answer'), input = el('input');
      input.type = 'text'; input.autocomplete = 'off'; input.spellcheck = false; input.lang = 'fr'; input.setAttribute('autocapitalize', 'off');
      input.placeholder = 'The verb…'; input.setAttribute('aria-label', 'Your answer');
      const check = el('button', 'fn-study-btn', 'Check'); check.type = 'submit'; form.append(input, check);
      const result = el('div', 'fn-quiz-result'); result.setAttribute('aria-live', 'polite');
      const next = () => { n++; ask(); };
      form.addEventListener('submit', e => {
        e.preventDefault(); if (input.disabled) return;
        const j = judge(input.value, x.form); input.disabled = check.disabled = true; out++;
        mark(x.key, j > 0); if (j) score++; else missed.push(x);
        const answer = el('p', 'fn-quiz-solution', say(x.i, x.form, x.tense)); answer.lang = 'fr';
        const ear = listen(say(x.i, x.form, x.tense)); if (ear) answer.append(' ', ear);
        result.replaceChildren(el('p', 'fn-quiz-verdict', j === 2 ? 'Right.' : j ? 'Right, but mind the accent:' : input.value.trim() ? 'Not quite. The answer:' : 'The answer:'), answer);
        const go = button('fn-study-btn', n + 1 === round.length ? 'See my score' : 'Next', next), btns = [go];
        if (!j) btns.push(button('fn-vocab-mode', 'I was right', () => { missed.pop(); mark(x.key, true); mark(x.key, true); score++; next(); }));
        result.append(row(...btns)); go.focus();
      });
      quiz.replaceChildren(el('p', 'fn-quiz-progress', `${n + 1} of ${round.length}`), q, cue, form, result);
      input.focus();
    };
    ask();
  };

  const box = el('div', 'fn-vocab');
  box.append(head, quiz, hint, tenses, modes, list);
  sec.append(box);
  (document.getElementById('fn-study') || main).append(sec);
  paint(); missedBtn.hidden = !Object.keys(misses()).length;
  window.FN_FRENCH_VERBS = { VERBS, TABLE, TENSES, misses: () => Object.keys(misses()).length };
  addEventListener('hashchange', () => { if (location.hash === '#french-verbs') close(); });
  if (location.hash === '#french-verbs') dispatchEvent(new HashChangeEvent('hashchange'));
})();
