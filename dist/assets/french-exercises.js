/* Frolicking Nicky: exercises Nicky's French teachers give her, each its own page reached from the lesson it belongs to
   (FN_LESSON_EXERCISES, read by study.js: a link under that lesson's notes). Loaded before study.js.
   The exercise text is the teacher's, word for word; each blank ("…………" in the handout) is a box to type in.
   The answers and the one-line "why" are Claude's key, not the teacher's. */
(() => {
  const EXERCISES = [{
    id: 'french-subjonctif-eliott',
    lesson: 'french-subjunctive', // shown under this lesson's notes
    link: 'Exercise by Eliott: subjonctif ou indicatif ?',
    kicker: 'Exercise by Eliott · French',
    title: 'Subjonctif ou indicatif ?',
    heading: 'Exercice de grammaire B2/C1 : subjonctif ou indicatif ? (thème voyage)',
    subheading: 'Préparatifs d\'un grand voyage',
    consigne: 'Complète chaque phrase avec le verbe entre parenthèses, au mode (indicatif ou subjonctif) et au temps qui conviennent.',
    // [sentence, one list of right answers per blank ({}), Eliott's hint in brackets, why]
    items: [
      ['Il est certain que ce voyage (être) {} un moment inoubliable.', [['sera', 'est']], '', 'Certainty (il est certain que) takes the indicative; the future fits a trip still to come.'],
      ['Je doute que nous (avoir) {} le temps de tout visiter en une semaine.', [['ayons']], '', 'Douter que: doubt takes the subjunctive.'],
      ['Mes amis voudraient que je (réserver) {} les billets avant la hausse des prix.', [['réserve']], '', 'Vouloir que: a wish takes the subjunctive.'],
      ['Il semble que les vols pour Lisbonne (être) {} complets.', [['soient']], '', 'Il semble que (impersonal, not sure) takes the subjunctive.'],
      ['Il me semble que cette compagnie (proposer) {} souvent des tarifs avantageux.', [['propose']], '', 'Il me semble que means “I think”: an opinion stated, so the indicative.'],
      ['Bien que nous (partir) {} à la dernière minute, tout s\'est bien passé.', [['soyons partis', 'soyons parties']], 'passé du subjonctif', 'Bien que takes the subjunctive; partir is conjugated with être, so the participle agrees.'],
      ['À moins que la grève (prendre) {} fin, notre train n\'arrivera pas à l\'heure.', [['prenne', 'ne prenne']], '', 'À moins que takes the subjunctive (often with a light “ne”: à moins que la grève ne prenne fin).'],
      ['Je suis persuadé que ce petit village (valoir) {} le détour.', [['vaut', 'vaudra']], '', 'Être persuadé que: conviction takes the indicative.'],
      ['Je ne pense pas qu\'on (pouvoir) {} réserver une chambre si tard.', [['puisse']], '', 'Penser que in the negative turns into doubt: subjunctive.'],
      ['Puisque tu (avoir) {} déjà visité Rome, choisis une autre destination.', [['as']], '', 'Puisque gives a known cause: indicative (here the passé composé, tu as visité).'],
      ['Il faut que nous (partir) {} avant que la haute saison (commencer) {}', [['partions'], ['commence', 'ne commence']], '', 'Il faut que and avant que both take the subjunctive.'],
      ['Après que les voyageurs (descendre) {} du bateau, les guides les accueilleront.', [['seront descendus', 'seront descendues']], 'temps composé', 'Après que states a fact, so the indicative; the main verb is in the future, so the futur antérieur.'],
      ['Il est dommage que tu (manquer) {} le coucher de soleil hier.', [['aies manqué']], 'passé du subjonctif', 'Il est dommage que (a feeling) takes the subjunctive; hier makes it past.'],
      ['Où que vous (aller) {}, n\'oubliez pas votre passeport.', [['alliez']], '', 'Où que (wherever) takes the subjunctive.'],
      ['Nous cherchons un guide qui (savoir) {} nous emmener hors des sentiers battus.', [['sache']], '', 'A guide we are still looking for, who may not exist: the subjunctive.']
    ]
  }];

  window.FN_LESSON_EXERCISES = {};
  EXERCISES.forEach(x => { (window.FN_LESSON_EXERCISES[x.lesson] ||= []).push({ text: x.link, href: '#' + x.id }); });

  const root = document.getElementById('fn-study') || document.querySelector('.fn-study-main'); if (!root) return;
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  const button = (cls, text, on) => { const b = el('button', cls, text); b.type = 'button'; b.addEventListener('click', on); return b; };

  // Answers: case, apostrophes, spaces and a typed pronoun don't matter; a missing accent is right, with a gentle note
  const bare = t => t.toLowerCase().replace(/[’']/g, '’').replace(/[.,!?;:…]+$/g, '').replace(/\s+/g, ' ').trim()
    .replace(/^(qu’|que )/, '').replace(/^(je |j’|tu |il |elle |on |nous |vous |ils |elles |la grève |ce voyage |les vols )/, '').trim();
  const flat = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const judge = (typed, ok) => { const t = bare(typed); if (!t) return 0; if (ok.includes(t)) return 2; return ok.some(a => flat(a) === flat(t)) ? 1 : 0; };

  EXERCISES.forEach(x => {
    const lesson = (window.FN_FRENCH_LESSONS || []).find(l => l.id === x.lesson);
    const sec = el('article', 'fn-study-view fn-lesson fn-exercise'); sec.id = x.id; sec.hidden = true;
    const bar = el('nav', 'fn-study-bar'), back = el('a', 'fn-study-back', '← ' + (lesson ? lesson.title : 'French'));
    back.href = '#' + (lesson ? lesson.id : 'french'); bar.append(back);
    const title = el('h2', null, x.title); title.id = x.id + '-title'; sec.setAttribute('aria-labelledby', title.id);
    sec.append(bar, el('p', 'fn-lesson-number', x.kicker), title);

    const sheet = el('form', 'fn-lesson-notes fn-exercise-sheet'); sheet.lang = 'fr'; sheet.noValidate = true;
    const consigne = el('p', 'fn-exercise-consigne'); consigne.append(el('strong', null, 'Consigne :'), ' ' + x.consigne);
    sheet.append(el('p', 'fn-exercise-heading', x.heading), el('h3', null, x.subheading), consigne);
    const ol = el('ol', 'fn-exercise-list'), blanks = [];
    x.items.forEach(([text, answers, hint, why], i) => {
      const li = el('li'), line = el('p', 'fn-exercise-line'), mine = [];
      text.split('{}').forEach((part, j, all) => {
        line.append(part);
        if (j === all.length - 1) return;
        const input = el('input'); input.type = 'text'; input.autocomplete = 'off'; input.spellcheck = false; input.lang = 'fr';
        input.setAttribute('autocapitalize', 'off'); input.setAttribute('aria-label', `Phrase ${i + 1}, ${all.length > 2 ? 'blank ' + (j + 1) : 'the verb'}`);
        input.size = Math.max(9, Math.max(...answers[j].map(a => a.length)) + 2);
        const b = { input, ok: answers[j], li }; blanks.push(b); mine.push(b); line.append(input);
      });
      if (hint) line.append(' ', el('em', 'fn-exercise-hint', '(' + hint + ')'));
      const fix = el('p', 'fn-exercise-fix'); fix.hidden = true;
      li.append(line, fix); li._fix = fix; li._why = why; li._mine = mine; ol.append(li);
    });
    sheet.append(ol);

    const verdict = el('p', 'fn-quiz-verdict fn-exercise-score'); verdict.setAttribute('aria-live', 'polite');
    const check = el('button', 'fn-study-btn', 'Check my answers'); check.type = 'submit';
    const again = button('fn-vocab-mode', 'Start again', () => {
      blanks.forEach(b => { b.input.value = ''; b.input.disabled = false; b.input.classList.remove('is-right', 'is-wrong'); });
      ol.querySelectorAll('li').forEach(li => { li._fix.hidden = true; li._fix.replaceChildren(); li.classList.remove('is-right', 'is-wrong'); });
      verdict.textContent = ''; check.hidden = false; again.hidden = true; blanks[0].input.focus();
    });
    again.hidden = true;
    const row = el('div', 'fn-vocab-modes fn-exercise-actions'); row.append(check, again);
    sheet.append(row, verdict);

    let score = 0;
    const tally = () => { verdict.textContent = score === x.items.length ? `All ${x.items.length} right.` : `${score} of ${x.items.length} right.`; };
    sheet.addEventListener('submit', e => {
      e.preventDefault(); if (check.hidden) return;
      score = 0;
      ol.querySelectorAll('li').forEach(li => {
        const marks = li._mine.map(b => { const j = judge(b.input.value, b.ok); b.input.disabled = true; b.input.classList.add(j ? 'is-right' : 'is-wrong'); return j; });
        const right = marks.every(j => j > 0), accent = marks.some(j => j === 1);
        if (right) score++;
        li.classList.add(right ? 'is-right' : 'is-wrong');
        const answer = li._mine.map(b => b.ok[0]).join(' … ');
        li._fix.replaceChildren(
          el('span', 'fn-exercise-answer', right ? (accent ? 'Right, but mind the accent: ' + answer : 'Right.') : (li._mine.some(b => b.input.value.trim()) ? 'Not quite: ' : 'The answer: ') + answer),
          ' ', el('span', 'fn-exercise-why', li._why));
        if (!right) li._fix.append(' ', button('fn-exercise-mine', 'I was right', ev => {
          ev.target.remove(); li.classList.replace('is-wrong', 'is-right'); li._mine.forEach(b => b.input.classList.replace('is-wrong', 'is-right')); score++; tally();
        }));
        li._fix.hidden = false;
      });
      tally(); check.hidden = true; again.hidden = false; again.focus();
    });
    sec.append(sheet);

    if (lesson) {
      const footer = el('nav', 'fn-lesson-footer'), link = el('a', 'fn-study-back', '← Back to ' + lesson.title); link.href = '#' + lesson.id;
      footer.append(link); sec.append(footer);
    }
    root.append(sec);
  });
})();
