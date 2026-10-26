/* Keeps the study the same on every device: ticks, notes, vocabulary, quiz misses, highlights, margin notes, poems by heart and
   Nicky's own lessons are copied to a secret gist on her GitHub account and fetched back on her other devices.
   The gist key (a GitHub token allowed only to read and write gists) is remembered on each device she connects. */
(() => {
  const KEYS = ['fn-study-v1', 'fn-study-lessons-v1', 'fn-study-annotations-v1', 'fn-study-heart-v1'];
  const SELF = 'fn-study-sync-v1', FILE = 'study.json', NAME = 'Frolicking Nicky study (private sync)';
  const API = 'https://api.github.com';
  let conf = {};
  try { conf = JSON.parse(localStorage.getItem(SELF)) || {}; } catch (_) {}
  const keep = () => { try { localStorage.setItem(SELF, JSON.stringify(conf)); } catch (_) {} };
  const make = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  const call = async (path, opts = {}) => {
    const r = await fetch(API + path, { ...opts, headers: { Accept: 'application/vnd.github+json', Authorization: 'Bearer ' + conf.token, 'Content-Type': 'application/json' } });
    if (r.status === 401 || r.status === 403) throw Error('GitHub did not accept the key. It may have expired.');
    if (!r.ok) throw Error('GitHub answered ' + r.status + '.');
    return r.json();
  };
  const current = () => {
    const data = {};
    KEYS.forEach(k => { try { const v = localStorage.getItem(k); if (v != null) data[k] = v; } catch (_) {} });
    return data;
  };
  const snapshot = () => JSON.stringify({ format: 'frolicking-nicky-study-sync', version: 1, changedAt: conf.changedAt || 0, data: current() });
  // A short fingerprint of everything saved, so a save that changes nothing doesn't count as a change
  const fingerprint = data => { const t = JSON.stringify(data); let h = 2166136261; for (let i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 16777619); return (h >>> 0).toString(36) + t.length; };
  // The gist is found by its description, so a second device needs only the same key
  const findGist = async () => {
    if (conf.gist) return conf.gist;
    for (let page = 1; page < 10; page++) {
      const list = await call('/gists?per_page=100&page=' + page);
      const hit = list.find(g => g.description === NAME && g.files[FILE]);
      if (hit) { conf.gist = hit.id; keep(); return hit.id; }
      if (list.length < 100) break;
    }
    return null;
  };
  const readRemote = async id => {
    const g = await call('/gists/' + id), f = g.files[FILE];
    if (!f) return null;
    const text = f.truncated ? await (await fetch(f.raw_url, { cache: 'no-store' })).text() : f.content;
    return JSON.parse(text);
  };

  let timer = 0, busy = false, again = false;
  const ui = { status: null };
  const say = text => { if (ui.status) ui.status.textContent = text; };
  const when = t => new Date(t).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const settled = () => say(conf.syncedAt ? 'Synced ' + when(conf.syncedAt) + '.' : 'Connected.');

  // Newer side wins: a newer copy from another device replaces this one and the page reopens with it
  const sync = async () => {
    if (!conf.token) return;
    if (busy) { again = true; return; }
    busy = true; say('Syncing…');
    try {
      let id = await findGist(), remote = null;
      if (id) {
        try { remote = await readRemote(id); } catch (e) { if (/404/.test(e.message)) { conf.gist = id = null; keep(); } else throw e; }
      }
      if (remote && (remote.changedAt || 0) > (conf.changedAt || 0)) {
        KEYS.forEach(k => { try { if (remote.data?.[k] != null) localStorage.setItem(k, remote.data[k]); else localStorage.removeItem(k); } catch (_) {} });
        conf.changedAt = remote.changedAt; conf.hash = fingerprint(current()); conf.syncedAt = Date.now(); keep();
        try { if (sessionStorage.getItem('fn-sync-reload') !== String(remote.changedAt)) { sessionStorage.setItem('fn-sync-reload', String(remote.changedAt)); location.reload(); return; } } catch (_) {}
      } else if (!remote || (conf.changedAt || 0) > (remote.changedAt || 0)) {
        const body = JSON.stringify({ description: NAME, files: { [FILE]: { content: snapshot() } } });
        if (id) await call('/gists/' + id, { method: 'PATCH', body });
        else { const g = await call('/gists', { method: 'POST', body: JSON.stringify({ description: NAME, public: false, files: { [FILE]: { content: snapshot() } } }) }); conf.gist = g.id; }
        conf.syncedAt = Date.now(); keep();
      } else { conf.syncedAt = Date.now(); keep(); }
      settled();
    } catch (e) {
      say((navigator.onLine === false ? 'Offline. Changes will sync when you are back online.' : 'Could not sync: ' + e.message));
    } finally {
      busy = false;
      if (again) { again = false; sync(); }
    }
  };

  // study.js, lesson-editor.js and study-annotations.js call this after every save
  window.fnStudyChanged = () => {
    const h = fingerprint(current()); if (h === conf.hash) return;
    conf.hash = h; conf.changedAt = Date.now(); keep();
    if (!conf.token) return;
    clearTimeout(timer); timer = setTimeout(sync, 3000);
  };
  const flush = () => { if (timer) { clearTimeout(timer); timer = 0; sync(); } };
  addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', () => { if (document.hidden) flush(); else if (conf.token) sync(); });
  addEventListener('online', () => { if (conf.token) sync(); });
  // Moving between topics checks for news from the other devices now and then
  addEventListener('hashchange', () => { if (conf.token && Date.now() - (conf.syncedAt || 0) > 30000) sync(); });

  // The connect box sits on the crystal's page ("What next?")
  const draw = () => {
    const host = document.getElementById('new');
    if (!host) return;
    const box = make('div', 'fn-sync'); box.setAttribute('aria-labelledby', 'fn-sync-title');
    const label = make('p', 'fn-study-label', 'On all your devices'); label.id = 'fn-sync-title';
    ui.status = make('p', 'fn-study-saved'); ui.status.setAttribute('role', 'status');
    const button = (cls, text, on) => { const b = make('button', cls, text); b.type = 'button'; b.addEventListener('click', on); return b; };
    const render = () => {
      box.replaceChildren(label);
      if (conf.token) {
        box.append(make('p', 'fn-sync-why', 'Your ticks, notes, words, highlights and own lessons are kept the same on every device you connect.'),
          make('div', 'fn-vocab-modes'), ui.status);
        box.children[2].append(button('fn-vocab-mode', 'Sync now', sync), button('fn-vocab-mode', 'Disconnect this device', () => {
          if (!confirm('Stop syncing on this device? Everything stays here as it is.')) return;
          conf = { changedAt: conf.changedAt }; keep(); render();
        }));
        settled();
        return;
      }
      const why = make('p', 'fn-sync-why', 'Keep your ticks, notes, words, highlights and own lessons the same on your phone and laptop. They are kept in a secret gist on your GitHub account.');
      const how = make('details', 'fn-sync-how'), sum = make('summary', null, 'How to connect');
      const steps = make('ol');
      const link = make('a', null, 'Create a fine-grained GitHub token'); link.href = 'https://github.com/settings/personal-access-tokens/new'; link.target = '_blank'; link.rel = 'noopener noreferrer';
      const li1 = make('li'); li1.append(link, '. Name it “Study sync”, choose a long expiry and leave “Repository access” on public repositories.');
      steps.append(li1,
        make('li', null, 'Under “Account permissions”, set Gists to Read and write. Generate the token and copy it.'),
        make('li', null, 'Paste it below. Do the same on each of your devices, with the same token.'));
      how.append(sum, steps);
      const form = make('form', 'fn-study-add');
      const input = make('input'); input.type = 'password'; input.autocomplete = 'off'; input.spellcheck = false;
      input.placeholder = 'Gist key…'; input.setAttribute('aria-label', 'GitHub token for gists');
      const go = make('button', 'fn-study-btn', 'Connect'); go.type = 'submit';
      form.append(input, go);
      form.addEventListener('submit', async e => {
        e.preventDefault(); const token = input.value.trim(); if (!token) return input.focus();
        conf.token = token; conf.gist = null; say('Connecting…');
        try { await findGist(); } catch (err) { conf = { changedAt: conf.changedAt }; keep(); say('Could not connect: ' + err.message); return; }
        // A device joining an existing sync takes the copy already there; the first device sends its own
        if (conf.gist) conf.changedAt = Math.min(conf.changedAt || 0, 1);
        keep(); render(); sync();
      });
      box.append(why, how, form, ui.status);
    };
    render();
    host.append(box);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', draw); else draw();
  if (conf.token) sync();
})();
