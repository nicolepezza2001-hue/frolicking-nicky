/* Frolicking Nicky motion layer. Loaded with defer in <head>, so it runs before the page scripts. */
(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let acted = false; // only celebrate things the visitor did, not ticks restored on load
  document.addEventListener('change', e => { if (e.target.matches('input[type=checkbox]')) acted = true; }, true);
  document.addEventListener('click', e => { if (e.target.closest('#checkAll')) acted = true; }, true);

  /* 9 + 10 · Progress bars glide, and reaching 100% throws confetti */
  const desc = Object.getOwnPropertyDescriptor(HTMLProgressElement.prototype, 'value');
  document.querySelectorAll('progress').forEach(bar => {
    let target = desc.get.call(bar), raf = 0;
    Object.defineProperty(bar, 'value', {
      configurable: true,
      get: () => target,
      set(v) {
        const from = desc.get.call(bar), was = target;
        target = Number(v);
        cancelAnimationFrame(raf);
        if (still || !acted) { desc.set.call(bar, target); return; }
        const start = performance.now();
        const step = now => {
          const t = Math.min(1, (now - start) / 600), ease = 1 - Math.pow(1 - t, 3);
          desc.set.call(bar, from + (target - from) * ease);
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        const max = bar.max || 100;
        if (target >= max && was < max) confetti();
      }
    });
  });

  function confetti() {
    if (still) return;
    const box = document.createElement('div'); box.className = 'fn-confetti'; box.setAttribute('aria-hidden', 'true');
    const colours = ['#86324A', '#000000', '#D9A0B0', '#2F6B3A', '#F2C14E'];
    for (let i = 0; i < 90; i++) {
      const p = document.createElement('i');
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colours[i % colours.length];
      box.append(p);
      const drift = (Math.random() - .5) * 240, spin = (Math.random() - .5) * 1440;
      p.animate([{ transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
                 { transform: `translate(${drift}px, ${innerHeight + 60}px) rotate(${spin}deg)`, opacity: .9 }],
                { duration: 1800 + Math.random() * 1600, delay: Math.random() * 400, easing: 'cubic-bezier(.25,.6,.4,1)', fill: 'forwards' });
    }
    document.body.append(box);
    setTimeout(() => box.remove(), 4200);
  }

  // Deferred scripts run before DOMContentLoaded, so wait for it: page scripts that build checklists run after this one.
  const ready = fn => document.readyState === 'complete' ? fn() : document.addEventListener('DOMContentLoaded', fn);
  ready(() => {
    /* 12 · Wrap the ↗ arrows so they can nudge */
    document.querySelectorAll('a, button').forEach(el => {
      for (const node of [...el.childNodes]) {
        if (node.nodeType === 3 && node.data.includes('↗')) {
          const parts = node.data.split('↗'), frag = document.createDocumentFragment();
          // Keep the space before the arrow inside the same text run, so spacing is unchanged even in flex links
          parts.forEach((part, i) => {
            if (i === parts.length - 1) { if (part) frag.append(part); return; }
            const gap = part.match(/\s*$/)[0], before = part.slice(0, part.length - gap.length);
            const wrap = document.createElement('span'); wrap.className = 'fn-arrow-run'; wrap.append(before + gap);
            const s = document.createElement('span'); s.className = 'fn-arrow'; s.textContent = '↗'; wrap.append(s); frag.append(wrap);
          });
          node.replaceWith(frag);
        }
      }
    });

    /* 8 · Tick pop and 9 · section celebrations */
    document.addEventListener('change', e => {
      if (still || !e.target.matches('input[type=checkbox]')) return;
      const row = e.target.closest('label') || e.target.parentElement;
      if (row && e.target.checked) { row.classList.remove('fn-pop'); void row.offsetWidth; row.classList.add('fn-pop'); setTimeout(() => row.classList.remove('fn-pop'), 600); }
    });
    const counters = document.querySelectorAll('.day-count, .group-count, #vn-count, #progress-count, .progress-text');
    const watch = new MutationObserver(list => {
      if (still || !acted) return;
      for (const m of list) {
        const el = m.target.nodeType === 3 ? m.target.parentElement : m.target;
        const text = el.textContent, pair = text.match(/(\d+)\s*\/\s*(\d+)/);
        const done = (pair && +pair[1] === +pair[2] && +pair[2] > 0) || text.trim() === '100%';
        if (done && !el.dataset.fnCheered) {
          el.dataset.fnCheered = '1'; el.classList.remove('fn-cheer'); void el.offsetWidth; el.classList.add('fn-cheer');
          if (text.trim() === '100%') confetti();
        } else if (!done) delete el.dataset.fnCheered;
      }
    });
    counters.forEach(c => watch.observe(c, { childList: true, characterData: true, subtree: true }));

    if (still) return;

    /* 15 · Split the red headline words into letters that wave now and then */
    document.querySelectorAll('h1 em, .fn-intro h1 em').forEach(em => {
      if (em.dataset.fnSplit) return; em.dataset.fnSplit = '1';
      const text = em.textContent, sr = document.createElement('span'), vis = document.createElement('span');
      sr.className = 'fn-sr'; sr.textContent = text; vis.setAttribute('aria-hidden', 'true');
      let i = 0; // letters are grouped per word so lines still break exactly where they did
      text.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { vis.append(part); i += part.length; return; }
        const word = document.createElement('span'); word.className = 'fn-word';
        [...part].forEach(ch => { const s = document.createElement('span'); s.className = 'fn-wiggle-letter'; s.style.setProperty('--fn-i', i++); s.textContent = ch; word.append(s); });
        vis.append(word);
      });
      em.replaceChildren(sr, vis);
    });

    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('fn-in'); io.unobserve(en.target);
      if (en.target.classList.contains('fn-season')) { en.target.classList.remove('fn-season-wait'); en.target.classList.add('fn-season-go'); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });

    /* 4 · Cards and sections rise in, one after another */
    const targets = ['.fn-section-head', '.fn-card', '.fn-support', '.fn-support-list > *', '.fn-writing', '.fn-about-copy > p', '.fn-experiences',
      '.practical', 'section.day', '.outing', '.running-grid > *', '.useful', '.extras', '.vn-stop', '.vn-album', '.ba-plan > *', '.ba-dinners > *',
      '.ba-scrap-row', '.jp-city', '.jp-day-album', '.jp-day-cards-only', '.fn-footer', '.progress-panel', '.vn-progress', '.vn-nav', '.jump', '.chips'];
    const seen = new Set();
    document.querySelectorAll(targets.join(',')).forEach(el => {
      if ([...seen].some(s => s.contains(el))) return;
      if (el.closest('.fn-header')) return;
      seen.add(el);
    });
    const byParent = new Map();
    seen.forEach(el => { const i = byParent.get(el.parentElement) || 0; byParent.set(el.parentElement, i + 1); el.style.setProperty('--fn-d', Math.min(i, 6) * 0.09 + 's'); el.classList.add('fn-reveal'); io.observe(el); });

    /* 5 · Photos come into focus */
    document.querySelectorAll('main img, .fn-main img, .wrap img, .ba-scrap-photo img, .vn-album-photo img, .jp-photo img').forEach(img => {
      if (img.closest('.fn-home-portrait, .fn-about-portrait, .postcard, .fn-vienna-hero-photo, .vn-portrait, .ba-photo, .fn-header')) return;
      img.classList.add('fn-focus'); io.observe(img);
    });

    /* 6 · The red note box swings into its tilt */
    document.querySelectorAll('.fn-note').forEach(n => { n.classList.add('fn-swing'); io.observe(n); });

    /* 7 · Best-time strip fills month by month */
    document.querySelectorAll('.fn-season').forEach(s => {
      s.querySelectorAll('.fn-season-swatch').forEach((sw, i) => sw.style.setProperty('--fn-i', i));
      s.classList.add('fn-season-wait'); io.observe(s);
    });

    /* 14 · A dotted travel line draws itself behind the journal cards */
    document.querySelectorAll('.fn-grid').forEach(grid => {
      const host = grid.parentElement; host.classList.add('fn-trail-host');
      const ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('class', 'fn-trail'); svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('preserveAspectRatio', 'none'); svg.setAttribute('aria-hidden', 'true');
      const d = 'M2,4 C30,0 18,22 50,18 S96,10 92,34 S40,40 24,52 S8,80 46,74 S98,70 90,96';
      const id = 'fn-trail-mask-' + Math.random().toString(36).slice(2, 7);
      svg.innerHTML = `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120"><path class="fn-trail-reveal" d="${d}" pathLength="1" fill="none" stroke="#fff" stroke-width="6" vector-effect="non-scaling-stroke"/></mask></defs>
        <path d="${d}" fill="none" stroke="#86324A" stroke-opacity=".55" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="1 9" vector-effect="non-scaling-stroke" mask="url(#${id})"/>
        <g class="fn-trail-pin"><circle cx="90" cy="96" r="1.1" fill="#86324A"/></g>`;
      host.prepend(svg); io.observe(svg);
    });
  });
})();

/* Cute icons next to headings. Matched on the heading text, so they work in English and Italian. */
(() => {
  const g = (body, cls = '') => `<svg class="fn-icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
  const steam = '<g class="fn-i-steam"><path d="M9 7c-1-1.2 1-2 0-3.4"/><path d="M12.5 7c-1-1.2 1-2 0-3.4"/><path d="M16 7c-1-1.2 1-2 0-3.4"/></g>';
  const I = {
    pasta: g(`${steam}<path d="M3.5 11h17a8.5 7 0 0 1-17 0z"/><path class="fn-i-wob" d="M6.5 11c1-1.6 2-1.6 3 0s2 1.6 3 0 2-1.6 3 0 2 1.6 3 0"/><path d="M9 20.5h6"/>`, 'fn-i-pasta'),
    cup: g(`${steam}<path d="M5 10h11v5a4.5 4.5 0 0 1-4.5 4.5h-2A4.5 4.5 0 0 1 5 15z"/><path d="M16 11.5h1.5a2.2 2.2 0 0 1 0 4.4H16"/><path d="M4 21h14"/>`, 'fn-i-cup'),
    heart: g('<path class="fn-i-beat" d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" fill="currentColor" fill-opacity=".18"/>', 'fn-i-heart'),
    sun: g('<circle cx="12" cy="12" r="4" fill="currentColor" fill-opacity=".18"/><g class="fn-i-spin"><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></g>', 'fn-i-sun'),
    moon: g('<path class="fn-i-sway" d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z" fill="currentColor" fill-opacity=".18"/><path class="fn-i-twinkle" d="M17 4.5v2M16 5.5h2"/>', 'fn-i-moon'),
    // Footsteps that appear one after another and fade away, like someone walking across the Marauder's Map
    steps: g([[7, 20.5, 'l'], [12.2, 17.2, 'r'], [10.6, 11.4, 'l'], [16, 7.8, 'r']].map(([x, y, side]) =>
      `<g class="fn-i-step"><g transform="translate(${x} ${y}) rotate(${side === 'l' ? 22 : 36})"><ellipse cx="0" cy="-1.6" rx="1.7" ry="2.6" fill="currentColor" stroke="none"/><ellipse cx="0" cy="2.6" rx="1.3" ry="1.4" fill="currentColor" stroke="none"/></g></g>`).join(''), 'fn-i-steps'),
    pencil: g('<g class="fn-i-write"><path d="M15.5 4.5l4 4L8.5 19.5 4 20l.5-4.5z"/><path d="M13.5 6.5l4 4"/></g><path d="M12 21h8" stroke-dasharray="2 2"/>', 'fn-i-pencil'),
    check: g('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.8h6V4"/><path class="fn-i-tick" d="M8.5 12.5l2.5 2.5 4.5-5" pathLength="1"/>', 'fn-i-check'),
    mountain: g('<circle class="fn-i-rise" cx="17.5" cy="6" r="2"/><path d="M2 20l7-11 4 6 2.5-3.5L22 20z" fill="currentColor" fill-opacity=".14"/><path d="M7.2 11.8l1.8 1 1.6-1.2"/>', 'fn-i-mountain'),
    boat: g('<g class="fn-i-rock"><path d="M4 14h16l-2.5 4h-11z" fill="currentColor" fill-opacity=".14"/><path d="M12 14V4l5 7.5h-5"/></g><path class="fn-i-wave" d="M2 21c2-1.4 3-1.4 5 0s3 1.4 5 0 3-1.4 5 0 3 1.4 5 0"/>', 'fn-i-boat'),
    lantern: g('<g class="fn-i-swing"><path d="M12 1.5v2.5"/><path d="M9 4h6"/><path d="M8 6.5c-2 3.2-2 7.8 0 11h8c2-3.2 2-7.8 0-11z" fill="currentColor" fill-opacity=".2"/><path d="M8 6.5h8M8 17.5h8M12 17.5v3"/></g>', 'fn-i-lantern'),
    blossom: g('<g class="fn-i-spin-slow"><path d="M12 9.5c-1.8-2-1.2-5 0-6.5 1.2 1.5 1.8 4.5 0 6.5zM14.4 11.2c1.2-2.5 4.2-3.1 6-2.4-1 1.6-3.4 3.4-6 2.4zM13.5 14c2.7.4 4 3.1 3.9 5-1.8-.4-4.1-2.3-3.9-5zM10.5 14c.2 2.7-2.1 4.6-3.9 5-.1-1.9 1.2-4.6 3.9-5zM9.6 11.2c-2.6 1-5-.8-6-2.4 1.8-.7 4.8-.1 6 2.4z" fill="currentColor" fill-opacity=".2"/><circle cx="12" cy="12" r="1.2"/></g>', 'fn-i-blossom'),
    castle: g('<path d="M4 21V10h3v2h2.5v-2h5v2H17v-2h3v11z" fill="currentColor" fill-opacity=".12"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/><path d="M12 10V3.5"/><path class="fn-i-flag" d="M12 3.5h5l-1.5 1.5 1.5 1.5h-5"/>', 'fn-i-castle'),
    wine: g('<g class="fn-i-clink"><path d="M8 3h8l-.5 5a3.5 3.5 0 0 1-7 0z"/><path d="M8.6 7h6.8" /><path d="M12 11.5V19M9 20.5h6"/></g>', 'fn-i-wine'),
    springs: g('<g class="fn-i-steam"><path d="M8 10c-1.4-1.6 1.4-2.6 0-4.5"/><path d="M12 10c-1.4-1.6 1.4-2.6 0-4.5"/><path d="M16 10c-1.4-1.6 1.4-2.6 0-4.5"/></g><path d="M3.5 14c0 4 3.8 6.5 8.5 6.5s8.5-2.5 8.5-6.5"/><path d="M3.5 14h17"/>', 'fn-i-springs'),
    shoe: g('<g class="fn-i-hop"><path d="M3 17.5V11l3-1 2 3 4 1.5 7 1.2a2 2 0 0 1 2 2v.8z" fill="currentColor" fill-opacity=".14"/><path d="M8.5 13.5l1-1.5M11 14.3l1-1.5"/></g><path class="fn-i-dash" d="M2 21h20" stroke-dasharray="1.5 3"/>', 'fn-i-shoe'),
    sparkle: g('<path class="fn-i-twinkle" d="M11 3c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5C8.7 8.9 10.4 7.2 11 3z" fill="currentColor" fill-opacity=".18"/><path class="fn-i-twinkle2" d="M18.5 15.5v4M16.5 17.5h4"/>', 'fn-i-sparkle'),
    pyramid: g('<circle class="fn-i-rise" cx="18.5" cy="5" r="1.8"/><path d="M2 20h20M4.5 20v-3h15v3M7 17v-3h10v3M9.5 14v-3h5v3M11 11V8.5h2V11"/>', 'fn-i-pyramid'),
    books: g('<path d="M4 20.5h16M5 20.5v-4h14v4"/><g class="fn-i-wobble"><path d="M6.5 16.5v-4h10v4"/><path d="M8.5 12.5V8h7v4.5" /></g>', 'fn-i-books'),
    flower: g('<g class="fn-i-sway"><circle cx="12" cy="8" r="2"/><path d="M12 6a2.5 2.5 0 1 1 3.4 3.4M15.4 9.4A2.5 2.5 0 1 1 12 12.8M12 10A2.5 2.5 0 1 1 8.6 6.6M8.6 6.6A2.5 2.5 0 1 1 12 6"/><path d="M12 10v10.5"/><path d="M12 16c-1.5-2-3.5-2.2-5-1.5 1 1.8 3 2.6 5 1.5z"/></g>', 'fn-i-flower'),
    pin: g('<g class="fn-i-hop"><path d="M12 21s-6-5.6-6-10.5a6 6 0 0 1 12 0C18 15.4 12 21 12 21z" fill="currentColor" fill-opacity=".16"/><circle cx="12" cy="10.5" r="2.2"/></g>', 'fn-i-pin'),
    palette: g('<path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 1.8-1 1.4-2-.5-1.3.3-2.5 1.8-2.5h2a3.3 3.3 0 0 0 3.3-3.3C20.5 7.6 16.7 3.5 12 3.5z"/><circle class="fn-i-dot1" cx="7.5" cy="11" r="1.1" fill="currentColor"/><circle class="fn-i-dot2" cx="10" cy="7.3" r="1.1" fill="currentColor"/><circle class="fn-i-dot3" cx="14.5" cy="7.3" r="1.1" fill="currentColor"/>', 'fn-i-palette')
  };
  const rules = [
    [/dinner|per cena|food|cibo|cooking|cucina/i, 'pasta'],
    [/best time to visit|periodo migliore/i, 'sun'],
    [/pages from my travel journal|pagine dal mio diario|^my travels$|^i miei viaggi$/i, 'steps'],
    [/elsewhere i write|scrivo anche altrove/i, 'pencil'],
    [/before you go|just a little planning|prima di partire|giusto un po’ di programmazione|more ideas|altre idee/i, 'check'],
    [/teotihuac|pyramid|piramide/i, 'pyramid'],
    [/wine|vino|vineyard|vigneto/i, 'wine'],
    [/hot springs|sorgenti termali/i, 'springs'],
    [/mount|monte|ha giang|takayama/i, 'mountain'],
    [/ha long|phu quoc|ninh binh|xochimilco/i, 'boat'],
    [/hoi an|kyoto/i, 'lantern'],
    [/^tokyo$/i, 'blossom'],
    [/schönbrunn|^chapultepec$|osaka|historic vienna|vienna storica|guanajuato/i, 'castle'],
    [/klimt|coyoac/i, 'palette'],
    [/biblioteca/i, 'books'],
    [/parks near triver|parchi vicino/i, 'shoe'],
    [/self-care|cura di sé/i, 'flower'],
    [/experiences|esperienze|if we have time|se abbiamo tempo/i, 'sparkle'],
    [/take a plan|prendi un itinerario|where i’ve been|dove sono stata/i, 'pin'],
    [/^(hanoi|ho chi minh( city)?|around the jardín|intorno al jardín)$/i, 'cup'],
    [/^(morning|mattina)$/i, 'sun'], [/^(afternoon|pomeriggio)$/i, 'cup'], [/^(evening|sera)$/i, 'moon']
  ];
  const add = () => document.querySelectorAll('h1, h2, h3').forEach(h => {
    if (h.querySelector('.fn-icon') || h.closest('.fn-header, dialog, .fn-season')) return;
    const text = h.textContent.trim().replace(/\s+/g, ' ');
    if (h.tagName === 'H1' && !/^(my travels|i miei viaggi)$/i.test(text)) return;
    const rule = rules.find(([re]) => re.test(text));
    if (rule) place(h, I[rule[1]]);
  });
  // Icons must never move the text: if one would push a heading onto an extra line,
  // it hangs in the space after the text instead, and is hidden if there is no room.
  const placed = [];
  function place(h, svg) {
    const base = size(h);
    const tag = document.createElement('span'); tag.className = 'fn-icon-tag'; tag.innerHTML = svg;
    h.append(tag); placed.push([h, tag]); fit(h, tag, base);
  }
  function fit(h, tag) {
    tag.classList.remove('fn-icon-off');
    // hide the icon rather than let it run off the edge of the screen
    if (tag.querySelector('svg').getBoundingClientRect().right > document.documentElement.clientWidth - 4) tag.classList.add('fn-icon-off');
  }
  let resizeTimer;
  addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => placed.forEach(([h, tag]) => {
    tag.remove(); const base = size(h); h.append(tag); fit(h, tag, base); }), 200); });
  // Height and width of the heading and its box: if adding the icon changes any of them, the icon hangs instead.
  function size(h) { const a = h.getBoundingClientRect(), b = h.parentElement.getBoundingClientRect(); return [a.height, a.width, b.height, b.width]; }
  const run = () => { add(); document.querySelectorAll('.fn-season h2').forEach(h => { if (!h.querySelector('.fn-icon')) place(h, I.sun); }); };
  document.readyState === 'complete' ? run() : document.addEventListener('DOMContentLoaded', run);
})();

/* Hero photos: two strips of masking tape hold them down,
   and turning the photo over (hover, or the Turn over button on touch screens and keyboards) shows the back of a
   well-travelled postcard, with a stamp from every country Nicky has been to, postmarks and a signed note.
   Built for everyone; only the develop and the turning animation switch off with reduced motion. */
(() => {
  const it = document.documentElement.lang === 'it';
  const touch = matchMedia('(hover: none)').matches, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t = it
    ? { over: 'Gira la cartolina', back: 'Rigira la cartolina', head: 'CARTOLINA POSTALE', sub: 'POST CARD · CARTE POSTALE',
        note: ['Saluti da tutti i posti in cui ho vagato finora!', '41 paesi e non è finita.', 'Vorrei che fossi qui.'],
        to: ['A te che leggi', 'ovunque tu vada dopo', 'Il Mondo'], count: ['41 PAESI', 'E NON È FINITA'], pm: 'POSTE ✦ FROLICKING NICKY ✦ ' }
    : { over: 'Turn the postcard over', back: 'Turn it back', head: 'POST CARD', sub: 'CARTE POSTALE · CARTOLINA',
        note: ['Greetings from everywhere I’ve wandered so far!', '41 countries and counting.', 'Wish you were here.'],
        to: ['To you, dear reader', 'wherever you’re headed next', 'The World'], count: ['41 COUNTRIES', 'AND COUNTING'], pm: 'POSTE ✦ FROLICKING NICKY ✦ ' };

  /* Flags drawn small inside a 34 × 30 box. Names are written the way each country prints them on its own stamps. */
  const W = 34, H = 30;
  const rect = (x, y, w, h, f) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`;
  const bands = (dir, cols, weights) => {
    const ws = weights || cols.map(() => 1), sum = ws.reduce((a, b) => a + b, 0); let at = 0;
    return cols.map((c, i) => { const size = (dir === 'h' ? H : W) * ws[i] / sum, r = dir === 'h' ? rect(0, at, W, size + .3, c) : rect(at, 0, size + .3, H, c); at += size; return r; }).join('');
  };
  const star = (cx, cy, r, f, inner = .4) => `<polygon fill="${f}" points="${Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * inner : r; return `${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`; }).join(' ')}"/>`;
  const nordic = (bg, cross, w = 5) => rect(0, 0, W, H, bg) + rect(10, 0, w, H, cross) + rect(0, (H - w) / 2, W, w, cross);
  const jack = (s = 1) => `<g transform="scale(${s})">${rect(0, 0, W, H, '#012169')}<path d="M0 0L34 30M34 0L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0L34 30M34 0L0 30" stroke="#C8102E" stroke-width="2"/>${rect(13, 0, 8, H, '#fff') + rect(0, 11, W, 8, '#fff') + rect(14.5, 0, 5, H, '#C8102E') + rect(0, 12.5, W, 5, '#C8102E')}</g>`;
  const F = {
    Italy: ['ITALIA', () => bands('v', ['#009246', '#fff', '#CE2B37'])],
    Spain: ['ESPAÑA', () => bands('h', ['#AA151B', '#F1BF00', '#AA151B'], [1, 2, 1])],
    Portugal: ['PORTUGAL', () => bands('v', ['#046A38', '#DA291C'], [2, 3]) + `<circle cx="13.6" cy="15" r="5.4" fill="#FFE900"/><circle cx="13.6" cy="15" r="3.2" fill="#DA291C"/><circle cx="13.6" cy="15" r="1.8" fill="#fff"/>`],
    France: ['FRANCE', () => bands('v', ['#002654', '#fff', '#CE1126'])],
    Germany: ['DEUTSCHLAND', () => bands('h', ['#000', '#DD0000', '#FFCE00'])],
    Denmark: ['DANMARK', () => nordic('#C8102E', '#fff', 4)],
    Hungary: ['MAGYARORSZÁG', () => bands('h', ['#CE2939', '#fff', '#477050'])],
    Romania: ['ROMÂNIA', () => bands('v', ['#002B7F', '#FCD116', '#CE1126'])],
    'United Kingdom': ['UK', () => jack()],
    Ireland: ['ÉIRE', () => bands('v', ['#169B62', '#fff', '#FF883E'])],
    Morocco: ['MAROC', () => rect(0, 0, W, H, '#C1272D') + `<polygon points="17,6.5 20.3,23 6.8,12.6 27.2,12.6 13.7,23" fill="none" stroke="#006233" stroke-width="1.4" stroke-linejoin="round"/>`],
    Kazakhstan: ['QAZAQSTAN', () => rect(0, 0, W, H, '#00AFCA') + `<circle cx="17" cy="13" r="8.2" fill="none" stroke="#FEC50C" stroke-width="2.4" stroke-dasharray="1 1.1"/><circle cx="17" cy="13" r="5" fill="#FEC50C"/><path d="M8 23c3 2.5 6 2.5 9 0 3 2.5 6 2.5 9 0" stroke="#FEC50C" stroke-width="1.6" fill="none"/>`],
    Uzbekistan: ['OʻZBEKISTON', () => bands('h', ['#0099B5', '#CE1126', '#fff', '#CE1126', '#1EB53A'], [10, .9, 8.2, .9, 10]) + `<circle cx="6" cy="5" r="3.3" fill="#fff"/><circle cx="7.4" cy="5" r="2.9" fill="#0099B5"/><circle cx="12" cy="3.4" r=".75" fill="#fff"/><circle cx="14.4" cy="3.4" r=".75" fill="#fff"/><circle cx="12" cy="6.4" r=".75" fill="#fff"/><circle cx="14.4" cy="6.4" r=".75" fill="#fff"/>`],
    Kyrgyzstan: ['KYRGYZSTAN', () => rect(0, 0, W, H, '#E8112D') + `<circle cx="17" cy="15" r="9.5" fill="none" stroke="#FFEF00" stroke-width="3" stroke-dasharray="1.3 1.3"/><circle cx="17" cy="15" r="6.6" fill="#FFEF00"/><circle cx="17" cy="15" r="4" fill="#E8112D"/><path d="M13.6 15h6.8M17 11.6v6.8" stroke="#FFEF00" stroke-width=".8"/>`],
    Switzerland: ['HELVETIA', () => rect(0, 0, W, H, '#DA291C') + rect(14, 6, 6, 18, '#fff') + rect(8, 12, 18, 6, '#fff')],
    Austria: ['ÖSTERREICH', () => bands('h', ['#ED2939', '#fff', '#ED2939'])],
    'San Marino': ['SAN MARINO', () => bands('h', ['#fff', '#5EB6E4']) + `<path d="M14.5 17h5v-4l-1-1.5v-2h-3v2l-1 1.5z" fill="#F1BF31"/>`],
    Vatican: ['POSTE VATICANE', () => bands('v', ['#FFE000', '#fff']) + `<path d="M21 8l9 14M30 8l-9 14" stroke="#B1B1B1" stroke-width="1.6"/><path d="M21 8l9 14" stroke="#E2B13C" stroke-width="1.6"/><path d="M24 6h3v2.5h-3z" fill="#CE1126"/>`],
    Czechia: ['ČESKO', () => bands('h', ['#fff', '#D7141A']) + `<polygon points="0,0 17,15 0,30" fill="#11457E"/>`],
    Bulgaria: ['BULGARIA', () => bands('h', ['#fff', '#00966E', '#D62612'])],
    Greece: ['ΕΛΛΑΣ', () => bands('h', Array.from({ length: 9 }, (_, i) => i % 2 ? '#fff' : '#0D5EAF')) + rect(0, 0, 16.7, 16.7, '#0D5EAF') + rect(6.7, 0, 3.3, 16.7, '#fff') + rect(0, 6.7, 16.7, 3.3, '#fff')],
    Slovenia: ['SLOVENIJA', () => bands('h', ['#fff', '#005DA4', '#ED1C24']) + `<path d="M6 6h6v5c0 3-3 4.5-3 4.5S6 14 6 11z" fill="#005DA4" stroke="#ED1C24" stroke-width=".8"/><path d="M6.6 12.5l1.4-1.6 1 1.2 1-1.2 1.4 1.6" stroke="#fff" stroke-width=".7" fill="none"/>`],
    Australia: ['AUSTRALIA', () => rect(0, 0, W, H, '#012169') + jack(.5) + star(8.5, 22.5, 3.6, '#fff', .45) + star(26, 6, 1.6, '#fff') + star(29.5, 13, 1.6, '#fff') + star(23, 15, 1.6, '#fff') + star(26, 24, 1.8, '#fff') + star(28.4, 18, .9, '#fff')],
    Estonia: ['EESTI', () => bands('h', ['#0072CE', '#000', '#fff'])],
    Finland: ['SUOMI FINLAND', () => nordic('#fff', '#002F6C', 6)],
    Sweden: ['SVERIGE', () => nordic('#006AA7', '#FECC00', 5)],
    Latvia: ['LATVIJA', () => bands('h', ['#9E3039', '#fff', '#9E3039'], [2, 1, 2])],
    Georgia: ['SAKARTVELO', () => rect(0, 0, W, H, '#fff') + rect(14.5, 0, 5, H, '#FF0000') + rect(0, 12.5, W, 5, '#FF0000') + [[6.5, 6], [27.5, 6], [6.5, 24], [27.5, 24]].map(([x, y]) => rect(x - 2.5, y - .8, 5, 1.6, '#FF0000') + rect(x - .8, y - 2.5, 1.6, 5, '#FF0000')).join('')],
    Albania: ['SHQIPËRIA', () => rect(0, 0, W, H, '#E41E20') + `<path d="M17 7l2 3 4-3-1 4 5-1-3 4 4 1-4 2 2 3-4-1v4l-3-2-2 3-2-3-3 2v-4l-4 1 2-3-4-2 4-1-3-4 5 1-1-4 4 3z" fill="#000"/>`],
    Poland: ['POLSKA', () => bands('h', ['#fff', '#DC143C'])],
    Japan: ['NIPPON', () => rect(0, 0, W, H, '#fff') + `<circle cx="17" cy="15" r="8" fill="#BC002D"/>`],
    Turkey: ['TÜRKİYE', () => rect(0, 0, W, H, '#E30A17') + `<circle cx="13" cy="15" r="7.5" fill="#fff"/><circle cx="15" cy="15" r="6" fill="#E30A17"/>` + star(21.2, 15, 3.2, '#fff')],
    Oman: ['OMAN', () => rect(0, 0, W, H, '#DB161B') + rect(10, 0, 24, 10, '#fff') + rect(10, 20, 24, 10, '#008000') + `<path d="M3 3l4 4M7 3L3 7" stroke="#fff" stroke-width="1"/>`],
    India: ['BHARAT · INDIA', () => bands('h', ['#FF9933', '#fff', '#138808']) + `<circle cx="17" cy="15" r="3.6" fill="none" stroke="#000080" stroke-width=".8"/><circle cx="17" cy="15" r=".9" fill="#000080"/><path d="M17 11.4v7.2M13.4 15h7.2M14.5 12.5l5 5M19.5 12.5l-5 5" stroke="#000080" stroke-width=".35"/>`],
    Vietnam: ['VIỆT NAM', () => rect(0, 0, W, H, '#DA251D') + star(17, 15.6, 8.4, '#FFFF00', .38)],
    Indonesia: ['INDONESIA', () => bands('h', ['#CE1126', '#fff'])],
    Korea: ['KOREA', () => rect(0, 0, W, H, '#fff') + `<path d="M10.5 15a6.5 6.5 0 0 1 13 0z" fill="#CD2E3A"/><path d="M10.5 15a6.5 6.5 0 0 0 13 0z" fill="#0047A0"/><path d="M10.5 15a3.25 3.25 0 0 0 6.5 0 3.25 3.25 0 0 1 6.5 0" fill="#CD2E3A"/>` + [[4.5, 5, 35], [29.5, 5, -35], [4.5, 25, -35], [29.5, 25, 35]].map(([x, y, a]) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-3-1.8h6M-3 0h6M-3 1.8h6" stroke="#000" stroke-width="1"/></g>`).join('')],
    Netherlands: ['NEDERLAND', () => bands('h', ['#AE1C28', '#fff', '#21468B'])],
    'Bosnia and Herzegovina': ['BOSNA I HERCEGOVINA', () => rect(0, 0, W, H, '#002395') + `<polygon points="10,0 28,0 28,30" fill="#FECB00"/>` + Array.from({ length: 7 }, (_, i) => star(7.2 + i * 2.8, 2 + i * 4.4, 1.5, '#fff')).join('')],
    Slovakia: ['SLOVENSKO', () => bands('h', ['#fff', '#0B4EA2', '#EE1C25']) + `<path d="M6 7h8v7.5c0 4-4 6-4 6s-4-2-4-6z" fill="#EE1C25" stroke="#fff" stroke-width=".9"/><path d="M10 8.6v8M8 10.6h4M7.3 13h5.4" stroke="#fff" stroke-width="1"/><path d="M6.8 17.5c1-1.6 2.4-1.6 3.2 0 .8-1.6 2.2-1.6 3.2 0" fill="#0B4EA2"/>`],
    Mexico: ['MÉXICO', () => bands('v', ['#006847', '#fff', '#CE1126']) + `<ellipse cx="17" cy="15.5" rx="3.2" ry="3.6" fill="#8C5A2B"/><path d="M14.2 18.6c1.8 1.4 3.8 1.4 5.6 0" stroke="#006847" stroke-width=".9" fill="none"/>`],
  };
  const order = ['Italy', 'Spain', 'Portugal', 'France', 'Germany', 'Denmark', 'Hungary', 'Romania', 'United Kingdom', 'Ireland', 'Morocco', 'Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Switzerland', 'Austria', 'San Marino', 'Vatican', 'Czechia', 'Bulgaria', 'Greece', 'Slovenia', 'Australia', 'Estonia', 'Finland', 'Sweden', 'Latvia', 'Georgia', 'Albania', 'Poland', 'Japan', 'Turkey', 'Oman', 'India', 'Vietnam', 'Indonesia', 'Korea', 'Netherlands', 'Bosnia and Herzegovina', 'Slovakia', 'Mexico'];
  const values = ['1,30', '0,95', '2,40', '50', '1,20', '25', '120', '3', '0,85', '2', '7', '150', '4', '80', '1,10', '0,90'];
  const stampSvg = (name, i) => {
    const [label, draw] = F[name], long = label.length > 11;
    return `<svg viewBox="0 0 40 50" aria-hidden="true"><svg x="3" y="3" width="34" height="30" viewBox="0 0 34 30">${draw()}</svg>
      <rect x="3" y="3" width="34" height="30" fill="none" stroke="#0000001f" stroke-width=".4"/>
      <text x="20" y="40.6" text-anchor="middle" font-size="${long ? 3.6 : 4.4}" font-weight="700" letter-spacing=".15" fill="#2b2b2b" font-family="DM Sans, sans-serif"${label.length > 15 ? ' textLength="34" lengthAdjust="spacingAndGlyphs"' : ''}>${label}</text>
      <text x="20" y="46.6" text-anchor="middle" font-size="3.6" fill="#86324A" font-family="Playfair Display, Georgia, serif" font-style="italic">${values[i % values.length]}</text></svg>`;
  };
  // The same scatter every time, so the card looks the same on every visit
  const rand = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(41);
  const jitter = order.map(() => [rand() - .5, rand() - .5, (rand() - .5) * 14]);

  const ring = (id, r) => `<path id="${id}" d="M60,60 m-${r},0 a${r},${r} 0 1,1 ${2 * r},0 a${r},${r} 0 1,1 -${2 * r},0"/>`;
  const waves = `<g stroke="currentColor" stroke-width="2.2" fill="none">${[0, 9, 18, 27, 36].map(y => `<path d="M0 ${y + 4}c12-7 24 7 36 0s24-7 36 0 24 7 36 0 24-7 36 0 24 7 36 0"/>`).join('')}</g>`;
  const back = () => `
    <svg class="fn-pc-defs" width="0" height="0" aria-hidden="true"><filter id="fn-ink"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="2.2"/></filter></svg>
    <span class="fn-tape fn-tape-l"></span><span class="fn-tape fn-tape-r"></span>
    <div class="fn-pc-in"><p class="fn-pc-head">${t.head}<span>${t.sub}</span></p>
    <div class="fn-pc-stamps">${order.map((n, i) => `<span class="fn-st" style="--a:${jitter[i][2].toFixed(1)}deg">${stampSvg(n, i)}</span>`).join('')}</div>
    <div class="fn-pc-foot">
      <div class="fn-pc-note"><p>${t.note.join('<br>')}</p><p class="fn-pc-sign">Nicky <span>x</span></p>
        <svg class="fn-pc-scribble" viewBox="0 0 120 26" aria-hidden="true"><path d="M3 18c14-10 22 8 34-1s20-12 30 1 16 2 24-6 14 0 26-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M98 6c-2-4-8-2-5 3l5 5 5-5c3-5-3-7-5-3z" fill="none" stroke="#86324A" stroke-width="1.4"/></svg></div>
      <div class="fn-pc-to">${t.to.map(l => `<p>${l}</p>`).join('')}</div>
    </div>
    <svg class="fn-pm fn-pm-a" viewBox="0 0 230 120" aria-hidden="true"><defs>${ring('fn-pm-ring-a', 40)}</defs>
      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <text font-size="10.5" font-weight="700" letter-spacing="1" fill="currentColor" font-family="DM Sans, sans-serif" textLength="246" lengthAdjust="spacing"><textPath href="#fn-pm-ring-a">${t.pm}</textPath></text>
      <text x="60" y="56" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor" font-family="DM Sans, sans-serif">2026</text>
      <path d="M38 62h44" stroke="currentColor" stroke-width="1.4"/><text x="60" y="75" text-anchor="middle" font-size="9" fill="currentColor" font-family="DM Sans, sans-serif">✦ 41 ✦</text>
      <g transform="translate(116 38)">${waves}</g></svg>
    <svg class="fn-pm fn-pm-b" viewBox="0 0 120 120" aria-hidden="true"><defs>${ring('fn-pm-ring-b', 42)}</defs>
      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="5 3"/><circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text font-size="11" font-weight="700" letter-spacing="1.4" fill="currentColor" font-family="DM Sans, sans-serif" textLength="258" lengthAdjust="spacing"><textPath href="#fn-pm-ring-b">PRIORITY ✦ PRIORITAIRE ✦ PRIORITARIA ✦ </textPath></text>
      ${star(60, 60, 15, 'currentColor', .42)}</svg>
    <svg class="fn-pm fn-pm-c" viewBox="0 0 170 62" aria-hidden="true"><rect x="3" y="3" width="164" height="56" rx="4" fill="none" stroke="currentColor" stroke-width="3.4"/><rect x="9" y="9" width="152" height="44" rx="2" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <text x="85" y="30" text-anchor="middle" font-size="18" font-weight="800" letter-spacing="1.5" fill="currentColor" font-family="DM Sans, sans-serif">${t.count[0]}</text>
      <text x="85" y="46" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="3" fill="currentColor" font-family="DM Sans, sans-serif">${t.count[1]}</text></svg></div>`;

  // Lay the 41 stamps out in a loose, slightly overlapping grid that fits whatever shape the photo is
  const layout = box => {
    const w = box.clientWidth, h = box.clientHeight; if (!w || !h) return;
    let best = { s: 0 };
    for (let cols = 3; cols <= 14; cols++) {
      const rows = Math.ceil(order.length / cols), s = Math.min(w / cols / 40, h / rows / 50);
      if (s > best.s) best = { s, cols, rows };
    }
    const { s, cols, rows } = best, cw = w / cols, ch = h / rows, sw = 40 * s * 1.07, sh = 50 * s * 1.07;
    box.querySelectorAll('.fn-st').forEach((el, i) => {
      const r = Math.floor(i / cols), c = i % cols, inRow = r === rows - 1 ? order.length - r * cols : cols;
      const offset = (cols - inRow) * cw / 2; // centre a short last row
      el.style.width = sw + 'px'; el.style.height = sh + 'px';
      el.style.left = (offset + c * cw + (cw - sw) / 2 + jitter[i][0] * cw * .22) + 'px';
      el.style.top = (r * ch + (ch - sh) / 2 + jitter[i][1] * ch * .2) + 'px';
    });
  };

  const run = () => {
    document.querySelectorAll('.fn-home-portrait, .fn-about-portrait, .postcard, .fn-vienna-hero-photo, .vn-portrait, .ba-photo').forEach(fig => {
      if (fig.dataset.fnCard) return; fig.dataset.fnCard = '1';
      // A still wrapper takes the hover, so the card doesn't flicker while it turns
      const wrap = document.createElement('div'); wrap.className = 'fn-pc-wrap';
      fig.before(wrap); wrap.append(fig);
      if (getComputedStyle(fig).position === 'static') fig.style.position = 'relative';
      fig.classList.add('fn-alive', 'fn-pc-host');
      const tapes = ['fn-tape fn-tape-l', 'fn-tape fn-tape-r'].map(cls => { const el = document.createElement('span'); el.className = cls; el.setAttribute('aria-hidden', 'true'); return el; });
      const card = document.createElement('div'); card.className = 'fn-pc-back'; card.setAttribute('aria-hidden', 'true'); card.innerHTML = back();
      const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'fn-pc-turn';
      const label = () => { const on = fig.classList.contains('fn-pc-flipped'); btn.innerHTML = `${on ? '↺' : '↻'} <span>${on ? t.back : t.over}</span>`; btn.setAttribute('aria-pressed', on); };
      btn.addEventListener('click', () => { fig.classList.toggle('fn-pc-flipped'); label(); });
      label();
      fig.append(...tapes, card);
      if (touch) {
        // Phones: no button. The photo turns over by itself after a few seconds on screen, turns back once
        // it has scrolled away, and a tap turns it either way (and stops it turning by itself).
        fig.addEventListener('click', e => { e.preventDefault(); fig.dataset.fnManual = '1'; fig.classList.toggle('fn-pc-flipped'); });
        if (!still) {
          let timer;
          new IntersectionObserver(([en]) => {
            if (fig.dataset.fnManual) return; clearTimeout(timer);
            if (en.intersectionRatio >= .6) timer = setTimeout(() => fig.classList.add('fn-pc-flipped'), 500);
            else if (en.intersectionRatio < .15) fig.classList.remove('fn-pc-flipped');
          }, { threshold: [0, .15, .6, 1] }).observe(fig);
        }
      } else wrap.append(btn);
      const box = card.querySelector('.fn-pc-stamps');
      new ResizeObserver(() => layout(box)).observe(box);
    });
  };
  document.readyState === 'complete' ? run() : document.addEventListener('DOMContentLoaded', run);
})();

/* Home and About: a postmark spins on the corner of the hero photo, and on the home page a trail of footsteps walks
   through the empty space under the intro, each step fading as the next appears (like the Marauder's Map).
   House rule: for travel motion, use footsteps rather than paper planes. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ns = 'http://www.w3.org/2000/svg';
  // A shoe print pointing along +x: sole in front, heel behind
  const print = (x, y, angle, cls = 'fn-step', size = 1) => `<g class="${cls}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)}) scale(${size})"><ellipse cx="2.6" cy="0" rx="4.6" ry="2.6"/><ellipse cx="-5" cy="0" rx="2.4" ry="2.1"/></g>`;
  const run = () => {
    document.querySelectorAll('.fn-home-portrait, .fn-about-portrait, .postcard, .fn-vienna-hero-photo, .vn-portrait, .ba-photo').forEach(fig => {
      if (fig.dataset.fnStamp) return; fig.dataset.fnStamp = '1';
      if (fig.matches('.fn-home-portrait, .fn-about-portrait')) {
        const stamp = document.createElement('span'); stamp.className = 'fn-stamp'; stamp.setAttribute('aria-hidden', 'true');
        const it = document.documentElement.lang === 'it';
        const words = it ? 'FROLICKING NICKY ✦ DIARIO DI VIAGGIO ✦ ' : 'FROLICKING NICKY ✦ A TRAVEL JOURNAL ✦ ';
        stamp.innerHTML = `<svg viewBox="0 0 120 120"><defs><path id="fn-stamp-ring" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"/></defs>
          <circle cx="60" cy="60" r="56" fill="#E4F5E0" stroke="#86324A" stroke-width="2.5" stroke-dasharray="3 3"/><circle cx="60" cy="60" r="31" fill="none" stroke="#86324A" stroke-width="1.5"/>
          <g class="fn-stamp-ring"><text font-size="9.4" font-weight="700" letter-spacing="0.9" textLength="266" lengthAdjust="spacing" fill="#86324A" font-family="DM Sans, sans-serif"><textPath href="#fn-stamp-ring">${words}</textPath></text></g>
          <g fill="#86324A">${print(51, 70, -70, 'fn-stamp-step', 1.35)}${print(68, 52, -70, 'fn-stamp-step', 1.35)}</g></svg>`;
        fig.append(stamp); // backface-hidden like the rest of the front, so it disappears when the postcard turns
      }
    });
    const intro = document.querySelector('.fn-intro');
    if (intro && !intro.querySelector('.fn-steps')) {
      if (getComputedStyle(intro).position === 'static') intro.style.position = 'relative';
      const box = document.createElement('div'); box.className = 'fn-steps'; box.setAttribute('aria-hidden', 'true');
      const svg = document.createElementNS(ns, 'svg'); svg.setAttribute('viewBox', '0 0 400 140'); svg.setAttribute('preserveAspectRatio', 'xMinYMid meet');
      const route = document.createElementNS(ns, 'path');
      route.setAttribute('d', 'M6,124 C60,124 70,74 120,80 S180,124 232,100 S300,34 352,46 S392,66 396,58');
      svg.append(route); box.append(svg); intro.append(box);
      // Lay prints along the route, alternating left and right of the line
      const len = route.getTotalLength(), stride = 21, gap = 6, steps = [];
      for (let d = 4, i = 0; d < len - 4; d += stride, i++) {
        const a = route.getPointAtLength(d), b = route.getPointAtLength(Math.min(len, d + 1));
        const ang = Math.atan2(b.y - a.y, b.x - a.x), side = i % 2 ? 1 : -1;
        steps.push([a.x - Math.sin(ang) * gap * side, a.y + Math.cos(ang) * gap * side, ang * 180 / Math.PI]);
      }
      route.remove();
      const it = document.documentElement.lang === 'it';
      svg.innerHTML = `<g fill="#86324A">${steps.map(([x, y, a]) => print(x, y, a, 'fn-step', 1.45)).join('')}</g>
        <g class="fn-steps-name"><rect x="-22" y="-9" width="44" height="15" rx="2" fill="#F5FBF3" stroke="#86324A" stroke-width="1"/>
        <text x="0" y="2.6" text-anchor="middle" font-size="10" font-style="italic" font-weight="600" fill="#86324A" font-family="Playfair Display, Georgia, serif">Nicky</text></g>`;
      // Each print appears as the walker reaches it, then slowly fades; the name tag follows the newest step
      const beat = 380, linger = 2600, cycle = steps.length * beat + linger + 900;
      svg.querySelectorAll('.fn-step').forEach((el, i) => el.animate(
        [{ opacity: 0 }, { opacity: .9, offset: 60 / cycle }, { opacity: .9, offset: 250 / cycle }, { opacity: 0, offset: Math.min(.99, linger / cycle) }, { opacity: 0 }],
        { duration: cycle, delay: i * beat, iterations: Infinity, fill: 'backwards' }));
      const tag = svg.querySelector('.fn-steps-name'), walk = steps.length * beat;
      tag.animate(steps.map(([x, y], i) => ({ transform: `translate(${x}px, ${y - 16}px)`, opacity: 1, offset: (i * beat) / cycle }))
        .concat([{ transform: `translate(${steps.at(-1)[0]}px, ${steps.at(-1)[1] - 16}px)`, opacity: 0, offset: (walk + 900) / cycle },
                 { transform: `translate(${steps.at(-1)[0]}px, ${steps.at(-1)[1] - 16}px)`, opacity: 0, offset: 1 }]),
        { duration: cycle, iterations: Infinity, easing: 'linear' });
      // Only walk where there is genuinely empty space under the intro text
      const fit = () => { const text = intro.querySelector('.fn-lede'); box.hidden = !text || text.getBoundingClientRect().bottom + 12 > box.getBoundingClientRect().top; };
      box.hidden = false; requestAnimationFrame(fit); addEventListener('resize', () => { box.hidden = false; fit(); });
    }
  };
  document.readyState === 'complete' ? run() : document.addEventListener('DOMContentLoaded', run);
})();

/* Where I've been: the map loads when it comes into view, inks in the visited countries one by one, and then a trail
   of footsteps wanders from country to country in the order Nicky visited them, fading behind her (Marauder's Map). */
(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const run = () => document.querySelectorAll('.fn-map-scroll[data-src]').forEach(box => {
    const section = box.closest('.fn-map');
    let started = false;
    const fallback = () => { box.innerHTML = `<img class="fn-map-svg" src="${box.dataset.src}" alt="${section.querySelector('h2').textContent}">`; box.removeAttribute('data-src'); section.classList.add('fn-inked'); };
    const load = () => {
      if (started) return; started = true;
      fetch(box.dataset.src).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); }).then(svg => {
        box.innerHTML = svg; box.removeAttribute('data-src');
        if (!box.querySelector('.fn-map-v')) throw new Error('empty map');
        extras(section, box.querySelector('.fn-map-svg'));
        if (still) { section.classList.add('fn-inked'); return; }
        requestAnimationFrame(() => requestAnimationFrame(() => section.classList.add('fn-inked')));
        walk(box.querySelector('.fn-map-svg'), 41 * 55 + 900);
      }).catch(fallback);
    };
    setTimeout(load, 4000); // in case the scroll watcher never fires
    if (!('IntersectionObserver' in window)) return load();
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); load(); } }, { rootMargin: '300px 0px' });
    io.observe(box);
  });
  // Tap or click a country to see its name; on phones, fit the map to the screen and add a Europe close-up and trip links
  function extras(section, svg) {
    const picked = section.querySelector('.fn-map-picked');
    section.addEventListener('click', e => {
      const c = e.target.closest('.fn-map-v'); if (!c) return;
      section.querySelectorAll('.fn-map-hit').forEach(el => el.classList.remove('fn-map-hit'));
      section.querySelectorAll(`.fn-map-v[style="${c.getAttribute('style')}"]`).forEach(el => el.classList.add('fn-map-hit'));
      if (picked) picked.textContent = '→ ' + c.querySelector('title').textContent;
    });
    const phone = matchMedia('(max-width: 760px)').matches;
    zoomable(section, svg, phone ? [165, 40, 775, 400] : [0, 0, 1000, 500]);
    if (!phone) return;
    const trips = section.querySelector('.fn-map-trips');
    if (trips) { trips.innerHTML = [...svg.querySelectorAll('.fn-map-pin')].map(a => `<a href="${a.getAttribute('href')}"><svg viewBox="-7 -18 14 19" width="10" height="14" aria-hidden="true"><path fill="currentColor" d="M0 0c-3.5-4.5-6-7.6-6-10.6a6 6 0 0 1 12 0c0 3-2.5 6.1-6 10.6z"/></svg>${a.textContent}</a>`).join(''); trips.hidden = false; }
  }
  // Pinch or use the + / − buttons to zoom; drag to move around once zoomed in. Works with fingers, a mouse or a trackpad.
  function zoomable(section, svg, home) {
    const it = document.documentElement.lang === 'it', card = section.querySelector('.fn-map-card');
    let [x, y, w, h] = home; const ratio = home[3] / home[2], minW = home[2] / 7, pts = new Map();
    let last = null, moved = 0;
    const set = () => {
      w = Math.min(home[2], Math.max(minW, w)); h = w * ratio;
      x = Math.min(Math.max(x, home[0]), home[0] + home[2] - w);
      y = Math.min(Math.max(y, home[1]), home[1] + home[3] - h);
      svg.setAttribute('viewBox', `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`);
      const z = home[2] / w; section.classList.toggle('fn-map-zoomed', z > 1.05); section.classList.toggle('fn-map-close', z > 2.1);
      svg.style.touchAction = z > 1.05 ? 'none' : 'pan-y';
    };
    const toMap = (cx, cy) => { const r = svg.getBoundingClientRect(); return [x + (cx - r.left) / r.width * w, y + (cy - r.top) / r.height * h, r]; };
    const zoomAt = (cx, cy, f) => { const [mx, my, r] = toMap(cx, cy); const nw = Math.min(home[2], Math.max(minW, w / f)); x = mx - (cx - r.left) / r.width * nw; y = my - (cy - r.top) / r.height * nw * ratio; w = nw; set(); };
    svg.addEventListener('pointerdown', e => { pts.set(e.pointerId, [e.clientX, e.clientY]); last = null; moved = 0; });
    svg.addEventListener('pointermove', e => {
      if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, [e.clientX, e.clientY]);
      const p = [...pts.values()], r = svg.getBoundingClientRect();
      const cx = p.reduce((a, q) => a + q[0], 0) / p.length, cy = p.reduce((a, q) => a + q[1], 0) / p.length;
      const d = p.length > 1 ? Math.hypot(p[0][0] - p[1][0], p[0][1] - p[1][1]) : 0;
      if (last) {
        if (p.length > 1 && last.d) zoomAt(cx, cy, d / last.d);
        if (p.length > 1 || w < home[2] * .98) { x -= (cx - last.cx) / r.width * w; y -= (cy - last.cy) / r.height * h; set(); moved += Math.abs(cx - last.cx) + Math.abs(cy - last.cy); }
      }
      if (p.length > 1 || w < home[2] * .98) { try { svg.setPointerCapture(e.pointerId); } catch (_) {} }
      last = { cx, cy, d };
    });
    const up = e => { pts.delete(e.pointerId); last = null; };
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => svg.addEventListener(t, up));
    svg.addEventListener('click', e => { if (moved > 8) { e.preventDefault(); e.stopPropagation(); } }, true); // a drag isn't a tap
    svg.addEventListener('wheel', e => { if (!e.ctrlKey) return; e.preventDefault(); zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY / 200)); }, { passive: false }); // trackpad pinch
    const tools = document.createElement('div'); tools.className = 'fn-map-tools';
    const btn = (label, txt, fn) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', label); b.textContent = txt; b.addEventListener('click', fn); tools.append(b); return b; };
    const mid = f => { const r = svg.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, f); };
    btn(it ? 'Ingrandisci' : 'Zoom in', '+', () => mid(1.6));
    btn(it ? 'Riduci' : 'Zoom out', '−', () => mid(1 / 1.6));
    btn(it ? 'Mostra tutta la mappa' : 'Show the whole map', '⤢', () => { [x, y, w, h] = home; set(); });
    card.append(tools);
    const hint = document.createElement('p'); hint.className = 'fn-map-hint';
    hint.textContent = it ? 'Pizzica per ingrandire, trascina per spostarti' : 'Pinch to zoom, drag to explore'; card.after(hint);
    set();
  }
  function walk(svg, delay) {
    const ns = 'http://www.w3.org/2000/svg', layer = svg.querySelector('.fn-map-walk');
    const stops = [...svg.querySelectorAll('.fn-map-v')].map(el => [+el.dataset.x, +el.dataset.y, el.querySelector('title').textContent]);
    const tag = document.createElementNS(ns, 'g'); tag.setAttribute('class', 'fn-map-tag'); tag.style.opacity = 0;
    tag.innerHTML = '<rect rx="2" height="18" y="-27"/><text y="-13" text-anchor="middle"></text>';
    layer.append(tag);
    let visible = true, at = 0, timer;
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible && !timer) hop(); }).observe(svg);
    const label = name => {
      const text = tag.querySelector('text'), rect = tag.querySelector('rect'); text.textContent = name;
      const w = text.getComputedTextLength() + 14; rect.setAttribute('width', w); rect.setAttribute('x', -w / 2);
    };
    const print = (x, y, ang) => {
      const g = document.createElementNS(ns, 'g');
      g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)}) scale(.62)`);
      g.innerHTML = '<ellipse cx="2.6" cy="0" rx="4.6" ry="2.6"/><ellipse cx="-5" cy="0" rx="2.4" ry="2.1"/>';
      layer.insertBefore(g, tag);
      g.animate([{ opacity: 0 }, { opacity: .85, offset: .06 }, { opacity: 0 }], { duration: 2600, easing: 'ease-out' }).onfinish = () => g.remove();
    };
    function hop() {
      timer = 0; if (!visible || document.hidden) return;
      const [x1, y1] = stops[at], next = (at + 1) % stops.length, [x2, y2, name] = stops[next];
      const dx = x2 - x1, dy = y2 - y1, dist = Math.hypot(dx, dy) || 1, n = Math.max(3, Math.min(24, Math.round(dist / 9)));
      const bend = Math.min(40, dist * .18) * (at % 2 ? 1 : -1), nx = -dy / dist, ny = dx / dist; // a gentle curve, not a straight line
      tag.style.transition = 'opacity .3s'; tag.style.opacity = 0;
      for (let i = 1; i <= n; i++) setTimeout(() => {
        const t = i / n, u = 1 - t, b = 4 * t * u * bend;
        const x = x1 + dx * t + nx * b, y = y1 + dy * t + ny * b;
        const tx = dx + nx * bend * 4 * (1 - 2 * t), ty = dy + ny * bend * 4 * (1 - 2 * t), ang = Math.atan2(ty, tx);
        const side = i % 2 ? 2.4 : -2.4;
        print(x - Math.sin(ang) * side, y + Math.cos(ang) * side, ang * 180 / Math.PI);
        if (i === n) { label(name); tag.setAttribute('transform', `translate(${x2} ${y2 - 4})`); tag.style.opacity = 1; }
      }, i * 150);
      at = next;
      timer = setTimeout(hop, n * 150 + 1400);
    }
    document.addEventListener('visibilitychange', () => { if (!document.hidden && visible && !timer) hop(); });
    timer = setTimeout(hop, delay);
  }
  document.readyState === 'complete' ? run() : document.addEventListener('DOMContentLoaded', run);
})();

/* Destination cards: the Quick look button flips a card for touch and keyboard users (hover flips it with a mouse) */
// On touch screens a card also turns over by itself while it sits in the middle of the screen, and a tap anywhere on it turns it.
(() => {
  if (!matchMedia('(hover: none)').matches) return;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches, timers = new Map();
  const run = () => {
    document.querySelectorAll('.fn-card').forEach(card => card.addEventListener('click', e => {
      if (e.target.closest('.fn-flip, .fn-card-back') || (e.target.closest('a') && !e.target.closest('.fn-photo'))) return;
      e.preventDefault(); card.dataset.fnManual = '1'; card.classList.toggle('fn-flipped');
    }));
    if (still) return;
    // Turn once the whole card is on screen (or as much of it as fits), so its photo is seen first; turn back as it leaves
    const io = new IntersectionObserver(es => es.forEach(({ target: card, intersectionRatio: r }) => {
      if (card.dataset.fnManual) return;
      const enough = Math.min(.9, innerHeight / card.offsetHeight * .9);
      clearTimeout(timers.get(card));
      if (r >= enough) timers.set(card, setTimeout(() => card.classList.add('fn-flipped'), 500));
      else if (r < .45) card.classList.remove('fn-flipped');
    }), { threshold: [0, .2, .45, .6, .7, .8, .9, 1] });
    document.querySelectorAll('.fn-card').forEach(card => io.observe(card));
  };
  document.readyState === 'complete' ? run() : document.addEventListener('DOMContentLoaded', run);
})();
// Anywhere on the back of a turned card opens that itinerary (except the Back to the photo button)
document.addEventListener('click', e => {
  const back = e.target.closest('.fn-card-back'); if (!back || e.target.closest('.fn-flip, a')) return;
  const link = back.querySelector('.fn-back-cover'); if (link) location.href = link.href;
});
document.addEventListener('click', e => {
  const btn = e.target.closest('.fn-flip'); if (!btn) return;
  const card = btn.closest('.fn-card'), on = card.classList.toggle('fn-flipped');
  card.querySelector(on ? '.fn-flip-back' : '.fn-flip-front').focus({ preventScroll: true });
});

/* Phones: the header links fold into a menu button */
(() => {
  const run = () => document.querySelectorAll('.fn-header').forEach(head => {
    const nav = head.querySelector('.fn-nav'); if (!nav || head.querySelector('.fn-menu-btn')) return;
    const it = document.documentElement.lang === 'it';
    nav.id = nav.id || 'fn-nav';
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'fn-menu-btn';
    btn.setAttribute('aria-controls', nav.id); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', it ? 'Menu' : 'Menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    const open = on => { head.classList.toggle('fn-menu-open', on); btn.setAttribute('aria-expanded', on); };
    btn.addEventListener('click', e => { e.stopPropagation(); open(!head.classList.contains('fn-menu-open')); });
    // A tap outside only closes the menu; it doesn't also press whatever was underneath
    document.addEventListener('click', e => { if (head.classList.contains('fn-menu-open') && !head.contains(e.target)) { open(false); e.preventDefault(); e.stopPropagation(); } }, true);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && head.classList.contains('fn-menu-open')) { open(false); btn.focus(); } });
    nav.before(btn);
  });
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', run) : run();
})();
