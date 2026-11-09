// Builds dist/albero/index.html: Nicky's family tree, encrypted with a password.
// The tree itself (names, dates, photos) never sits in the repository in readable form:
// only the AES-GCM ciphertext does. The page asks for the password and decrypts in the browser.
//
// Usage (the source page and photos live outside the repo):
//   TREE_PASSWORD=… node tools/build-family-tree.mjs <tree.html> [photos-dir]
// photos-dir holds <person-id>.jpg files (small square face crops) to show in the circles.
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { webcrypto as crypto } from 'node:crypto';
import { basename, extname, join } from 'node:path';

const [src, photoDir] = process.argv.slice(2);
const password = process.env.TREE_PASSWORD;
if (!src || !password) { console.error('Usage: TREE_PASSWORD=… node tools/build-family-tree.mjs <tree.html> [photos-dir]'); process.exit(1); }

let tree = await readFile(src, 'utf8');
const photos = {};
if (photoDir) for (const f of await readdir(photoDir)) {
  if (!/\.jpe?g$/i.test(f)) continue;
  photos[basename(f, extname(f))] = { url: 'data:image/jpeg;base64,' + (await readFile(join(photoDir, f))).toString('base64') };
}
tree = tree.replace(/const photos = \{\};/, 'const photos = ' + JSON.stringify(photos) + ';');
const doc = `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex, nofollow, noarchive"><link rel="icon" type="image/png" sizes="512x512" href="/assets/snail-stamp-favicon.png?v=3"></head><body>
<a href="/about" style="position:fixed;top:10px;right:12px;z-index:50;font:500 13px/1 system-ui,sans-serif;color:#7a6538;background:#fffbea;border:1px solid #e2d08f;border-radius:999px;padding:7px 12px;text-decoration:none" onclick="try{sessionStorage.removeItem('fn-albero')}catch(e){}">Chiudi l'albero</a>
${tree}</body></html>`;

const enc = new TextEncoder();
const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
const ITER = 250000;
const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(doc)));
const b64 = u => Buffer.from(u).toString('base64');
const payload = JSON.stringify({ s: b64(salt), i: b64(iv), n: ITER, c: b64(ct) });

const page = `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Albero di Famiglia — Frolicking Nicky</title><meta name="robots" content="noindex, nofollow, noarchive"><meta name="description" content="Un angolo privato di Frolicking Nicky."><link rel="icon" type="image/png" sizes="512x512" href="/assets/snail-stamp-favicon.png?v=3"><link rel="alternate icon" href="/favicon.ico?v=cherry1"><link rel="canonical" href="https://frolickingnicky.com/albero/"><meta property="og:type" content="website"><meta property="og:site_name" content="Frolicking Nicky"><meta property="og:title" content="Albero di Famiglia — Frolicking Nicky"><meta property="og:description" content="Un angolo privato di Frolicking Nicky."><meta property="og:url" content="https://frolickingnicky.com/albero/"><meta property="og:image" content="https://frolickingnicky.com/assets/share-about.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="theme-color" content="#B30545">
<style>
:root{--paper:#FDEBD8;--ink:#030301;--cherry:#B30545}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--paper);color:var(--ink);font-family:Georgia,"Times New Roman",serif;padding:24px 16px}
.gate{width:100%;max-width:420px;border:1px solid rgba(179,5,69,.35);border-radius:18px;padding:32px 24px;text-align:center}
.k{font:600 12px/1 system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--cherry);margin:0 0 12px}
h1{font-weight:400;font-size:34px;line-height:1.1;margin:0 0 10px}
h1 em{color:var(--cherry)}
p{margin:0 0 20px;font-size:16px;line-height:1.5}
form{display:grid;gap:12px}
input{font:16px system-ui,sans-serif;padding:12px 14px;border:1px solid rgba(3,3,1,.3);border-radius:10px;background:transparent;color:var(--ink);width:100%}
input:focus{outline:2px solid var(--cherry);outline-offset:1px}
button{font:600 16px system-ui,sans-serif;padding:12px 14px;border:0;border-radius:999px;background:var(--cherry);color:var(--paper);cursor:pointer}
button[disabled]{opacity:.6;cursor:wait}
.err{min-height:1.4em;margin:4px 0 0;color:var(--cherry);font:14px system-ui,sans-serif}
a{color:var(--cherry)}
.back{display:inline-block;margin-top:18px;font:14px system-ui,sans-serif}
</style></head><body>
<main class="gate"><p class="k">Un angolo privato</p><h1>La famiglia <em>Pezza-Sămian</em></h1><p>Per vedere l'albero di famiglia serve la password.</p>
<form id="f"><label for="pw" style="position:absolute;left:-9999px">Password</label><input id="pw" type="password" autocomplete="current-password" placeholder="Password" required><button id="b" type="submit">Apri l'albero</button><p class="err" id="e" role="alert"></p></form>
<a class="back" href="/about">← Torna a About me</a></main>
<script>
const P=${payload};
const d=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function open(pw){
  const base=await crypto.subtle.importKey("raw",new TextEncoder().encode(pw),"PBKDF2",false,["deriveKey"]);
  const key=await crypto.subtle.deriveKey({name:"PBKDF2",salt:d(P.s),iterations:P.n,hash:"SHA-256"},base,{name:"AES-GCM",length:256},false,["decrypt"]);
  const html=new TextDecoder().decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:d(P.i)},key,d(P.c)));
  try{sessionStorage.setItem("fn-albero",pw)}catch(e){}
  document.open();document.write(html);document.close();
}
const f=document.getElementById("f"),b=document.getElementById("b"),e=document.getElementById("e");
f.addEventListener("submit",async ev=>{ev.preventDefault();b.disabled=true;e.textContent="";
  try{await open(document.getElementById("pw").value)}catch(x){b.disabled=false;e.textContent="Password sbagliata. Riprova.";}});
(async()=>{let s=null;try{s=sessionStorage.getItem("fn-albero")}catch(x){}if(s){try{await open(s)}catch(x){try{sessionStorage.removeItem("fn-albero")}catch(y){}}}})();
</script></body></html>`;
await writeFile(new URL('../dist/albero/index.html', import.meta.url), page);
console.log('✓ dist/albero/index.html written (' + Math.round(page.length / 1024) + ' KB, ' + Object.keys(photos).length + ' photos)');
