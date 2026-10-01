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

  const ready = fn => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  ready(() => {
    /* 12 · Wrap the ↗ arrows so they can nudge */
    document.querySelectorAll('a, button').forEach(el => {
      for (const node of [...el.childNodes]) {
        if (node.nodeType === 3 && node.data.includes('↗')) {
          const parts = node.data.split('↗'), frag = document.createDocumentFragment();
          parts.forEach((part, i) => { frag.append(part); if (i < parts.length - 1) { const s = document.createElement('span'); s.className = 'fn-arrow'; s.textContent = '↗'; frag.append(s); } });
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
      [...text].forEach((ch, i) => { const s = document.createElement('span'); s.textContent = ch; if (ch.trim()) { s.className = 'fn-wiggle-letter'; s.style.setProperty('--fn-i', i); } vis.append(s); });
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
