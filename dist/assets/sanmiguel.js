'use strict';
const groups = [
{id:'centro', number:'01', title:'Around the Jardín', timing:'LITTLE OUTINGS THROUGHOUT THE TRIP', color:'pink', description:'The historic center, a coffee at a time. Walk, sit on a rooftop, walk a little more.', sections:[
['WANDER A LITTLE',[
['parroquia','Parroquia de San Miguel Arcángel & Jardín Allende','pink neo-Gothic church and the main square','The easiest place to start, and to end an evening.'],
['mesones','San Ignacio Mesón','courtyard of small shops on Mesones'],
['soles','Hotel Casa de los Soles','courtyard hotel decorated with suns','Visitors can usually pop in for a look.'],
['artesanias','Mercado de Artesanías','crafts market by Lavanda','Walk further in for more choice and better prices.'],
['mirador','El Mirador','viewpoint over the town at sunset','Arrive about 30 minutes before sunset.']]],
['EAT & LINGER',[
['lavanda','Lavanda Café de Especialidad','specialty coffee and breakfast; rooftop terrace','Closed Sundays. Go early or expect a short wait.'],
['tata','La Cocina de Tata','Mexican breakfast and lunch on a rooftop','Open Thursday–Sunday only.'],
['kibok','KI’BOK Coffee','coffee, chilaquiles and a roof terrace'],
['milagros','Los Milagros','Mexican restaurant and bar; molcajete'],
['quince','Quince','rooftop bar and restaurant facing the Parroquia','Book a table around sunset.']]]], note:'Some afternoons can be just a coffee, a short stroll, or nothing at all.'},
{id:'aurora',number:'02',title:'El Charco & La Aurora',timing:'ONE MORNING, ONE AFTERNOON',color:'green',description:'Cactus trails above the town, then art, design and a garden café in an old textile factory.',sections:[
['ONE MORNING',[
['charco','El Charco del Ingenio','botanical garden and nature reserve; canyon trails','Go when it opens, before the trails get hot. Take water.']]],
['ANOTHER AFTERNOON',[
['aurora','Fábrica La Aurora','art galleries and design shops in a former textile mill','Allow a couple of hours.'],
['geek','Geek & Coffee','garden café behind La Aurora','A slow coffee on the lawn.']]]],note:'El Charco opens daily, 9 a.m.–5 p.m. Phone signal can be patchy up there, so plan how you’ll get back.'},
{id:'sanantonio',number:'03',title:'South of the center',timing:'TWO RELAXED AFTERNOONS',color:'blue',description:'Bakeries and a leafy park by day, small plates and garden bars by night.',sections:[
['A SLOW DAY',[
['panina','Panina','sourdough bakery and brunch','Open 8 a.m.–3 p.m.'],
['luna','Luna de Queso','deli café, cheese shop and garden patio','Closed Sundays.'],
['juarez','Parque Benito Juárez','shady park with paths and fountains']]],
['AN EVENING OUT',[
['tostevere','Tostévere','small plates, tostadas and mezcal cocktails','Reserve well ahead; it’s small.'],
['rosewood','Rosewood — Luna Rooftop','rooftop bar with views over town','Go for sunset.'],
['santuario','Hacienda El Santuario','hotel garden bar; mezcal cocktails']]]],note:'Panina and Luna de Queso are close together in San Antonio. Easy walking from the Jardín.'},
{id:'sazon',number:'04',title:'Market day & a cooking class',timing:'A TUESDAY',color:'yellow',description:'The big weekly market in the morning, then cooking and eating what we made.',sections:[
['THE MORNING',[
['tianguis','Tianguis de los Martes','huge weekly flea market with food stalls','Tuesdays only. Go early and snack as you browse.']]],
['THE AFTERNOON',[
['sazonclass','Sazón Cooking School','market tour and hands-on Mexican cooking class','Take the 3 p.m. class. About 2½ hours; closed Mondays.']]]],note:'Book the class ahead and check which dishes are on that day’s menu.'},
{id:'dayout',number:'05',title:'A pyramid & a vineyard',timing:'ONE DAY OUT · WEDNESDAY–SUNDAY',color:'pink',description:'An ancient ceremonial site in the morning, then a long lunch among the vines.',sections:[
['THE MORNING',[
['canada','Cañada de la Virgen','pyramid site visited with a guide; 1½ km uphill walk','Closed Mondays. Bring water and a hat.']]],
['THE AFTERNOON',[
['dosbuhos','Bodega Dos Búhos','winery; tastings and lunch under the trees','Open Wednesday–Sunday. Reserve the tasting.']]]],note:'Cañada is west of town and Dos Búhos east, so book a driver or taxis for the day.'},
{id:'guanajuato',number:'★',title:'Guanajuato',timing:'SATURDAY DAY TRIP',color:'blue',weekend:true,description:'A colorful university city in a ravine. A whole day, taken slowly.',sections:[
['IDEAS FOR THE DAY',[
['gtoearly','Leave early','about 1½ hours each way by road'],
['beso','Callejón del Beso','famously narrow alley and its legend'],
['teatro','Teatro Juárez & Jardín de la Unión','grand theater and the city’s main square'],
['hidalgo','Mercado Hidalgo','historic market; lunch and snacks'],
['pipila','Funicular to El Pípila','hilltop viewpoint over the city'],
['rivera','Museo Casa Diego Rivera','the painter’s birthplace and early work']]]],note:'One of our two Saturdays. Pick a few; there’s no need to do everything.'},
{id:'ride',number:'★',title:'Horses & hot springs',timing:'SATURDAY DAY TRIP',color:'green',weekend:true,description:'A morning ride in the hills, then an afternoon soaking.',sections:[
['THE MORNING',[
['horses','Horse riding','SoTeZ Horse Ranch or Coyote Canyon Adventures','SoTeZ is about 10 minutes out, with mountain trail rides. Coyote Canyon includes lunch and is a longer, faster canyon ride.']]],
['THE AFTERNOON',[
['atotonilco','Santuario de Atotonilco','UNESCO-listed church with painted walls and ceilings','Just up the road from La Gruta. Arrange a ride back; taxis are scarce there.'],
['gruta','La Gruta hot springs','thermal pools and a steamy cave','Open Wednesday–Sunday, 7 a.m.–5 p.m. Busy at weekends, so go early. Bring a towel.'],
['spaalt','Or a hotel spa in town','Rosewood or Hacienda El Santuario','If we’d rather stay close.']]]],note:'Our other Saturday. Book the ride in advance, choose one spa option, and fit Atotonilco in if the day allows.'}
];
const optional = [
['zipline','San Miguel Parque de Aventura','seven zip lines and a suspension bridge over a canyon','Reserve in advance.'],
['sanlucas','Viñedos San Lucas','vineyard; wine tasting, brunch and lunch','About 25 minutes east of town.'],
['presa','Amigos de La Presa Boathouse','walks and boating on the reservoir','Only open Wednesday and Saturday mornings.']
];
const KEY='frolicking-nicky-san-miguel-v1';
let checked={}; let storageOK=true;
try { const saved=JSON.parse(localStorage.getItem(KEY)||'{}'); if(saved && typeof saved==='object' && !Array.isArray(saved)) checked=saved; } catch {storageOK=false;}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function item(row,extra=false) {const [id,title,desc,note]=row;return `<label class="task${checked[id]===true?' completed':''}"><input type="checkbox" id="${esc(id)}" data-extra="${extra}" ${checked[id]===true?'checked':''}><span class="checkmark" aria-hidden="true"></span><span class="task-copy"><span class="task-title">${esc(title)}</span> <span class="specialty">(${esc(desc)})</span>${note?`<span class="task-note">${esc(note)}</span>`:''}</span></label>`;}
document.querySelector('#itinerary').innerHTML=groups.map(g=>`<section id="${g.id}" class="outing ${g.color} ${g.weekend?'weekend':''}" aria-labelledby="title-${g.id}"><div class="outing-heading"><span class="number" aria-hidden="true">${g.number}</span><div><p class="eyebrow">${g.timing}</p><h2 id="title-${g.id}">${g.title}</h2><p class="section-desc">${g.description}</p></div><span class="group-count" id="count-${g.id}" aria-label="Section completion"></span></div><div class="outing-body ${g.sections.length===1?'single':''}">${g.sections.map(([title,rows])=>`<div class="task-group"><h3>${title}</h3>${rows.map(r=>item(r)).join('')}</div>`).join('')}</div><div class="outing-note"><p>${g.note}</p>${g.link?`<a href="${g.link[1]}" target="_blank" rel="noopener noreferrer">${g.link[0]} ↗</a>`:''}</div></section>`).join('');
document.querySelector('#optional-list').innerHTML=optional.map(r=>item(r,true)).join('');
const mainIds=groups.flatMap(g=>g.sections.flatMap(s=>s[1].map(r=>r[0])));
function update(announce=false){const done=mainIds.filter(id=>checked[id]===true).length;const percent=Math.round(done/mainIds.length*100);document.querySelector('#progress-count').textContent=done;document.querySelector('#progress-total').textContent=`of ${mainIds.length} places & moments`;document.querySelector('#percent').textContent=percent+'%';document.querySelector('#progress').value=percent;document.querySelector('#progress').textContent=percent+'%';groups.forEach(g=>{const ids=g.sections.flatMap(s=>s[1].map(r=>r[0]));document.querySelector('#count-'+g.id).textContent=`${ids.filter(id=>checked[id]===true).length} / ${ids.length}`;});const extra=optional.filter(r=>checked[r[0]]===true).length;document.querySelector('#extra-count').textContent=`${extra} optional ${extra===1?'stop':'stops'} done`;document.querySelector('#save-note').textContent=storageOK?'Progress saved on this device.':'Progress works here, but saving is unavailable in this browser.';if(announce)document.querySelector('#announcement').textContent=`${done} of ${mainIds.length} main items complete. ${extra} optional stops done.`;}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(checked));storageOK=true;}catch{storageOK=false;}}
document.addEventListener('change',e=>{if(!e.target.matches('.task input'))return;checked[e.target.id]=e.target.checked;e.target.closest('.task').classList.toggle('completed',e.target.checked);persist();update(true);});
window.addEventListener('storage',e=>{if(e.key!==KEY)return;try{const next=JSON.parse(e.newValue||'{}');checked=next&&typeof next==='object'&&!Array.isArray(next)?next:{};}catch{checked={};}document.querySelectorAll('.task input').forEach(el=>{el.checked=checked[el.id]===true;el.closest('.task').classList.toggle('completed',el.checked);});update();});
const dialog=document.querySelector('#reset-dialog');document.querySelector('#reset').addEventListener('click',()=>dialog.showModal());document.querySelector('#cancel-reset').addEventListener('click',()=>dialog.close());document.querySelector('#confirm-reset').addEventListener('click',()=>{checked={};persist();document.querySelectorAll('.task input').forEach(el=>{el.checked=false;el.closest('.task').classList.remove('completed');});update(true);dialog.close();});
update();
