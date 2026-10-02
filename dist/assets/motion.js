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
    plane: g('<g class="fn-i-fly"><path d="M2.5 13.5l19-8-5.5 15-3.5-6.5z" fill="currentColor" fill-opacity=".14"/><path d="M12.5 14l9-8.5"/></g><path class="fn-i-dash" d="M2 20c3-.5 5-2 6.5-4" stroke-dasharray="1.5 2.5"/>', 'fn-i-plane'),
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
    [/pages from my travel journal|pagine dal mio diario|^my travels$|^i miei viaggi$/i, 'plane'],
    [/elsewhere i write|scrivo anche altrove/i, 'pencil'],
    [/before you go|just a little planning|prima di partire|giusto un po’ di programmazione|more ideas|altre idee/i, 'check'],
    [/teotihuac|pyramid|piramide/i, 'pyramid'],
    [/wine|vino|vineyard|vigneto/i, 'wine'],
    [/hot springs|sorgenti termali/i, 'springs'],
    [/mount|monte|ha giang|takayama/i, 'mountain'],
    [/ha long|phu quoc|ninh binh/i, 'boat'],
    [/hoi an|kyoto/i, 'lantern'],
    [/^tokyo$/i, 'blossom'],
    [/schönbrunn|^chapultepec$|osaka|historic vienna|vienna storica|guanajuato/i, 'castle'],
    [/klimt|coyoac/i, 'palette'],
    [/biblioteca/i, 'books'],
    [/parks near triver|parchi vicino/i, 'shoe'],
    [/self-care|cura di sé/i, 'flower'],
    [/experiences|esperienze|if we have time|se abbiamo tempo/i, 'sparkle'],
    [/take a plan|prendi un itinerario/i, 'pin'],
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

/* Hero photos come alive: they float on the page, catch a passing glint of light and carry a fluttering strip of washi tape.
   On the home and About pages a postmark spins on the corner, and on the home page a paper plane loops through the empty space under the intro. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const run = () => {
    document.querySelectorAll('.fn-home-portrait, .fn-about-portrait, .postcard, .fn-vienna-hero-photo, .vn-portrait, .ba-photo').forEach((fig, n) => {
      if (fig.dataset.fnAlive) return; fig.dataset.fnAlive = '1';
      if (getComputedStyle(fig).position === 'static') fig.style.position = 'relative';
      fig.classList.add('fn-alive');
      const glint = document.createElement('span'); glint.className = 'fn-glint'; glint.setAttribute('aria-hidden', 'true');
      const tape = document.createElement('span'); tape.className = 'fn-tape' + (n % 2 ? ' fn-tape-right' : ''); tape.setAttribute('aria-hidden', 'true');
      fig.append(glint, tape);
      if (fig.matches('.fn-home-portrait, .fn-about-portrait')) {
        const stamp = document.createElement('span'); stamp.className = 'fn-stamp'; stamp.setAttribute('aria-hidden', 'true');
        const it = document.documentElement.lang === 'it';
        const words = it ? 'FROLICKING NICKY ✦ DIARIO DI VIAGGIO ✦ ' : 'FROLICKING NICKY ✦ A TRAVEL JOURNAL ✦ ';
        stamp.innerHTML = `<svg viewBox="0 0 120 120"><defs><path id="fn-stamp-ring" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"/></defs>
          <circle cx="60" cy="60" r="56" fill="#E4F5E0" stroke="#86324A" stroke-width="2.5" stroke-dasharray="3 3"/><circle cx="60" cy="60" r="31" fill="none" stroke="#86324A" stroke-width="1.5"/>
          <g class="fn-stamp-ring"><text font-size="9.4" font-weight="700" letter-spacing="0.9" textLength="266" lengthAdjust="spacing" fill="#86324A" font-family="DM Sans, sans-serif"><textPath href="#fn-stamp-ring">${words}</textPath></text></g>
          <g class="fn-stamp-plane"><path d="M44 66l32-14-9 24-6-9z" fill="#86324A"/><path d="M61 67l15-15" stroke="#E4F5E0" stroke-width="1.5"/></g></svg>`;
        fig.append(stamp);
      }
    });
    const intro = document.querySelector('.fn-intro');
    if (intro && !intro.querySelector('.fn-flight')) {
      if (getComputedStyle(intro).position === 'static') intro.style.position = 'relative';
      const f = document.createElement('div'); f.className = 'fn-flight'; f.setAttribute('aria-hidden', 'true');
      f.innerHTML = `<svg viewBox="0 0 400 140" preserveAspectRatio="xMinYMid meet"><path class="fn-flight-path" d="M10,110 C70,20 130,130 190,70 S300,-10 320,60 S260,120 230,80 S330,20 390,40" fill="none" stroke="#86324A" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="2 9"/>
        <g class="fn-flight-plane"><path d="M-11,-7 L13,0 L-11,7 L-6,0 Z" fill="#86324A"/><path d="M-6,0 L13,0" stroke="#E4F5E0" stroke-width="1.2"/>
          <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" keyPoints="0;1;1" keyTimes="0;.85;1" calcMode="spline" keySplines=".45 0 .4 1;0 0 1 1" path="M10,110 C70,20 130,130 190,70 S300,-10 320,60 S260,120 230,80 S330,20 390,40"/></g>
        <g class="fn-flight-heart" transform="translate(390 40)"><circle r="5" fill="#86324A"/></g></svg>`;
      intro.append(f);
      // Only fly where there is genuinely empty space under the intro text
      const fit = () => { const text = intro.querySelector('.fn-lede'); f.hidden = !text || text.getBoundingClientRect().bottom + 12 > f.getBoundingClientRect().top; };
      f.hidden = false; requestAnimationFrame(fit); addEventListener('resize', () => { f.hidden = false; fit(); });
    }
  };
  document.readyState === 'complete' ? run() : document.addEventListener('DOMContentLoaded', run);
})();
