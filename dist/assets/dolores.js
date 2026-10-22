'use strict';
const it=document.documentElement.lang==='it';
const boxes=[...document.querySelectorAll('[data-stop]')];
const key='frolicking-nicky-dolores-hidalgo-v1';
let state={},storageOK=true;
try {
 const saved=localStorage.getItem(key);
 const parsed=JSON.parse(saved||'{}');
 state=parsed&&typeof parsed==='object'&&!Array.isArray(parsed)?parsed:{};

}catch{storageOK=false;}
function update(){
 boxes.forEach(b=>b.checked=state[b.dataset.stop]===true);
 const done=boxes.filter(b=>b.checked).length;
 document.querySelector('#vn-count').textContent=`${done} / ${boxes.length} ${it?'completati':'completed'}`;
 const progress=document.querySelector('#vn-progress');progress.max=boxes.length;progress.value=done;
 document.querySelector('#vn-save').textContent=storageOK?(it?'Le tue spunte restano su questo dispositivo.':'Your ticks stay on this device.'):(it?'Il salvataggio non è disponibile; le spunte funzionano su questa pagina.':'Saving is unavailable; ticks work on this page.');
}
function save(){try{localStorage.setItem(key,JSON.stringify(state));storageOK=true;}catch{storageOK=false;}update();}
boxes.forEach(b=>b.addEventListener('change',()=>{state[b.dataset.stop]=b.checked;save();}));
window.addEventListener('storage',e=>{if(e.key!==key)return;try{const next=JSON.parse(e.newValue||'{}');state=next&&typeof next==='object'&&!Array.isArray(next)?next:{};}catch{state={};}update();});
document.querySelector('.vn-reset').addEventListener('click',()=>{if(confirm(it?'Azzerare la checklist di Dolores Hidalgo?':'Clear your Dolores Hidalgo checklist?')){state={};save();}});
update();
