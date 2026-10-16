'use strict';
const groups = [
{id:'neighborhoods', number:'01', title:'Juárez, Roma & Condesa', timing:'LITTLE OUTINGS THROUGHOUT THE TRIP', color:'pink', description:'Start close to home. A walk and a meal are enough for any one afternoon.', sections:[
['WANDER A LITTLE',[
['juarez','Explore Juárez','your neighborhood around Triver'],
['reforma','Reforma & Ángel de la Independencia','grand boulevard and iconic independence monument'],
['roma','Roma Norte & Plaza Río de Janeiro','leafy square, Colima and Álvaro Obregón'],
['condesa','Parque México & Avenida Amsterdam','Art Deco neighborhood park and tree-lined walking loop']]],
['EAT & LINGER',[
['maizajo','Maizajo','taquería; traditional corn tortillas'],
['chava','Mi Compa Chava','seafood; ceviches, aguachiles and tostadas'],
['maximo','Máximo','seasonal fine dining with French influences','Our booked dinner.'],
['conchudo','Conchudo','oyster bar, seafood and wine','An easy meal near your Juárez base.'],
['drinks','Pistilo or Salón Palomilla','mezcal and Mexican spirits / cocktails and terrace','Choose whichever suits the evening.']]]], note:'Monday–Wednesday can be just dinner, a short stroll, or nothing at all.'},
{id:'centro',number:'02',title:'Centro Histórico',timing:'TWO RELAXED AFTERNOONS',color:'blue',description:'Old Mexico City, temple ruins, murals and a very good reason to stop for churros.',sections:[
['FIRST AFTERNOON',[
['zocalo','Zócalo','Mexico City’s main historic square'],
['cathedral','Metropolitan Cathedral','grand colonial cathedral'],
['templo','Templo Mayor & museum','Tenochtitlan’s main Aztec temple; ruins and archaeological finds','This is our Tenochtitlan stop, beside the Zócalo and Metropolitan Cathedral. The Aztec capital stood beneath today’s historic center.'],
['charco','CHARCO','creative contemporary bistro with historic-center views']]],
['ANOTHER AFTERNOON',[
['bellas','Palacio de Bellas Artes','grand arts palace; Mexican murals'],
['alameda','Alameda Central','historic public park'],
['moro','Churrería El Moro Centro','churros and hot chocolate']]]],note:'Do the museum before food or evening wandering. Bellas Artes opens Tuesday–Sunday, 10 a.m.–6 p.m.', link:['Official museum information','https://inba.gob.mx/recinto/67/']},
{id:'chapultepec',number:'03',title:'Chapultepec',timing:'TWO RELAXED AFTERNOONS',color:'green',description:'One major museum, a castle and space to slow down among the trees.',sections:[
['ONE AFTERNOON',[
['anthropology','Museo Nacional de Antropología','Mexico’s ancient civilizations and Indigenous cultures','Allow around three hours. Pick the rooms you’re most curious about.'],
['park','Bosque de Chapultepec','vast city park','A short walk afterward, if you feel like it.']]],
['ANOTHER AFTERNOON',[
['castle','Chapultepec Castle','historic royal residence and Mexican history museum'],
['terraces','Castle terraces & gardens','panoramic city views','Leave time to enjoy the view.'],
['moderno','Museo de Arte Moderno','modern Mexican art, including Frida Kahlo','A must. Close to the castle entrance.']]]],note:'All three museums close on Mondays. The castle closes at 5 p.m. and the Museo de Arte Moderno at 5:45 p.m., so save this afternoon for an earlier finish to work.',link:['Castle visitor information','https://mnh.inah.gob.mx/informacion-general']},
{id:'coyoacan',number:'04',title:'Coyoacán',timing:'SATURDAY DAY TRIP',color:'blue',weekend:true,description:'Frida’s world, neighborhood squares and an afternoon with room to wander.',sections:[
['FRIDA & SLOW WANDERING',[
['frida','Frida Kahlo Museum / Casa Azul','Frida’s home, life and art','Book your timed ticket online in advance.'],
['squares','Jardín Centenario & Plaza Hidalgo','historic neighborhood squares'],
['market','Mercado de Coyoacán','traditional market; food and local stalls'],
['coffee','Coffee & neighborhood wandering','a pause and a few unhurried streets']]]],note:'One of our two Saturdays. Keep the day for Coyoacán; there’s no need to add another neighborhood.',link:['Book Frida Kahlo Museum','https://www.museofridakahlo.org.mx/visita/']},
{id:'teotihuacan',number:'★',title:'Teotihuacán',timing:'SATURDAY DAY TRIP',color:'yellow',weekend:true,description:'Our definite big adventure. Ancient pyramids, an early start and the evening off.',sections:[
['THE WHOLE DAY, TAKEN SLOWLY',[
['early','Leave Triver early','make room for travel and an unhurried visit'],
['teoti','Explore Teotihuacán','ancient city, monumental pyramids and archaeological ruins'],
['avenue','Avenue of the Dead','main ceremonial avenue'],
['lunch','Lunch after exploring','choose somewhere when you’re ready'],
['home','Back to Triver','a free evening, with no extra sightseeing']]]],note:'Our other Saturday. Set aside the day, including travel. The site opens daily, 8 a.m.–5 p.m.',link:['Official visitor information','https://www.inah.gob.mx/zonas/23-zona-arqueologica-de-teotihuacan']},
{id:'library',number:'+',title:'Biblioteca Vasconcelos',timing:'ONE EXTRA SHORT OUTING',color:'pink',description:'A little time for books and extraordinary architecture.',sections:[['ON A LIGHTER AFTERNOON',[
['vasconcelos','Biblioteca Vasconcelos','dramatic modern library with suspended bookshelves','Keep it as its own short outing.']]]],note:'Fit this into a Sunday or a lighter afternoon. No museum marathon required.'}
];
const optional = [
['xochimilco','Xochimilco trajinera ride','painted boats on the old canals; music and snacks from passing boats','A morning of its own: it’s far south, up to an hour by taxi. Rent a boat for one or two hours.'],
['quetzal','Parque Quetzalcóatl','surreal organic architecture and gardens; guided visit','A separate outing. Reserve in advance.'],
['soumaya','Museo Soumaya','European and Mexican art, including Rodin sculptures'],
['dolores','Panteón de Dolores','historic cemetery; notable Mexican figures'],
['frances','Panteón Francés de la Piedad','ornate historic cemetery with European influence','South of Roma, on Avenida Cuauhtémoc. Allow about an hour; choose de la Piedad, not the San Joaquín cemetery.'],
['odette','ODETTE, Lomas branch','French-style bakery and pastries','If you’re already heading that way.'],
['mercadoroma','Mercado Roma','food hall with multiple vendors'],
['rosettapan','Panadería Rosetta','Rosetta’s bakery; pastries and bread'],
['migrante','Migrante','contemporary Mexican food with global influences'],
['xuna','Xuna','contemporary Mexican fine dining'],
['expendio','Expendio de Maíz','corn-focused Mexican cooking; no fixed menu'],
['oncemil','La Once Mil','upscale taquería'],
['la89','La 89','northern-style tacos; birria and grilled beef'],
['tromperia','La Trompería','taquería; tacos al pastor and drinks'],
['otherbar','The other evening bar','Pistilo: mezcal / Salón Palomilla: cocktails','Whichever you haven’t tried.']
];
const KEY='frolicking-nicky-mexico-city-v1';
let checked={}; let storageOK=true;
try { const saved=JSON.parse(localStorage.getItem(KEY)||'{}'); if(saved && typeof saved==='object' && !Array.isArray(saved)) checked=saved; } catch {storageOK=false;}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function item(row,extra=false) {const [id,title,desc,note]=row;return `<label class="task${checked[id]===true?' completed':''}"><input type="checkbox" id="${esc(id)}" data-extra="${extra}" ${checked[id]===true?'checked':''}><span class="checkmark" aria-hidden="true"></span><span class="task-copy"><span class="task-title">${esc(title)}</span> <span class="specialty">(${esc(desc)})</span>${note?`<span class="task-note">${esc(note)}</span>`:''}</span></label>`;}
const PHOTOS={"neighborhoods": [[["/assets/mx-david-fountain.jpeg", "A bronze copy of Michelangelo’s David among the fountain jets in Plaza Río de Janeiro", 1050, 1400], ["/assets/mx-good-idea-wall.jpeg", "A friend leaning on a pink wall painted with “Mexico is always a good idea”", 1050, 1400]], [["/assets/mx-agua-de-coco.jpeg", "A street cart piled with green coconuts under a blue umbrella, against a red wall", 1050, 1400]]], "centro": [[["/assets/mx-templo-mayor.jpeg", "The ruins of Templo Mayor with the towers and domes of the Metropolitan Cathedral behind", 1050, 1400], ["/assets/mx-tzompantli.jpeg", "Rows of carved stone skulls from the Aztec skull rack at Templo Mayor", 1050, 1400]], [["/assets/bellas-artes.jpg", "The white marble Palacio de Bellas Artes and its golden dome", 1400, 1050, "Alex Covarrubias", "CC BY 2.5", "https://commons.wikimedia.org/wiki/File:Palacio_de_las_Bellas_Artes_(Mexico_City).jpg"]]], "chapultepec": [[["/assets/mx-piedra-del-sol.jpeg", "The carved Aztec Sun Stone in the Museo Nacional de Antropología", 1050, 1400], ["/assets/mx-anthropology-maya.jpeg", "A carved Maya temple façade with stone figures among the trees in the museum garden", 1050, 1400]], [["/assets/mx-castle-stained-glass.jpeg", "A long corridor of Chapultepec Castle lined with stained-glass windows and a chequered floor", 1050, 1400], ["/assets/mx-varo-nicky.jpeg", "Nicky giving a thumbs-up beside a Remedios Varo painting at the Museo de Arte Moderno", 1050, 1400]]], "coyoacan": [[["/assets/mx-frida-sign.jpeg", "“Frida y Diego vivieron en esta casa 1929–1954” painted on the blue wall of Casa Azul", 1050, 1400], ["/assets/mx-frida-kitchen.jpeg", "Frida’s yellow-floored kitchen at Casa Azul, with clay pots and names spelt out on the wall", 1050, 1400]]], "teotihuacan": [[["/assets/mx-avenue-of-the-dead.jpeg", "The Avenue of the Dead stretching to the mountains, seen from the Pyramid of the Moon", 1050, 1400], ["/assets/mx-pyramid-sun.jpeg", "The Pyramid of the Sun under a cloudy sky at Teotihuacán", 1050, 1400]]], "library": [[["/assets/mx-vasconcelos.jpeg", "The suspended bookshelves and whale skeleton of Biblioteca Vasconcelos", 1050, 1400]]]};
const fig=([src,alt,w,h,by,lic,url])=>`<figure class="fn-v-photo"><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy"></a>${by?`<figcaption>Photo: ${by} · <a href="${url}" target="_blank" rel="noopener noreferrer">${lic}</a></figcaption>`:''}</figure>`;
let rowN=0;
document.querySelector('#itinerary').innerHTML=groups.map(g=>`<section id="${g.id}" class="outing fn-split ${g.color} ${g.weekend?'weekend':''}" aria-labelledby="title-${g.id}"><div class="outing-heading"><span class="number" aria-hidden="true">${g.number}</span><div><p class="eyebrow">${g.timing}</p><h2 id="title-${g.id}">${g.title}</h2><p class="section-desc">${g.description}</p></div><span class="group-count" id="count-${g.id}" aria-label="Section completion"></span></div><div class="outing-body fn-split-body">${g.sections.map(([title,rows],si)=>{const ps=(PHOTOS[g.id]||[])[si]||[];const card=`<div class="task-group"><h3>${title}</h3>${rows.map(r=>item(r)).join('')}</div>`;return ps.length?`<div class="fn-v-row${rowN++%2?' fn-v-rev':''}"><div class="fn-v-side">${ps.map(fig).join('')}</div>${card}</div>`:card;}).join('')}</div><div class="outing-note"><p>${g.note}</p>${g.link?`<a href="${g.link[1]}" target="_blank" rel="noopener noreferrer">${g.link[0]} ↗︎</a>`:''}</div></section>`).join('');
document.querySelector('#optional-list').innerHTML=optional.map(r=>item(r,true)).join('');
const mainIds=groups.flatMap(g=>g.sections.flatMap(s=>s[1].map(r=>r[0])));
function update(announce=false){const done=mainIds.filter(id=>checked[id]===true).length;const percent=Math.round(done/mainIds.length*100);document.querySelector('#progress-count').textContent=done;document.querySelector('#progress-total').textContent=`of ${mainIds.length} places & moments`;document.querySelector('#percent').textContent=percent+'%';document.querySelector('#progress').value=percent;document.querySelector('#progress').textContent=percent+'%';groups.forEach(g=>{const ids=g.sections.flatMap(s=>s[1].map(r=>r[0]));document.querySelector('#count-'+g.id).textContent=`${ids.filter(id=>checked[id]===true).length} / ${ids.length}`;});const extra=optional.filter(r=>checked[r[0]]===true).length;document.querySelector('#extra-count').textContent=`${extra} optional ${extra===1?'stop':'stops'} done`;document.querySelector('#save-note').textContent=storageOK?'Progress saved on this device.':'Progress works here, but saving is unavailable in this browser.';if(announce)document.querySelector('#announcement').textContent=`${done} of ${mainIds.length} main items complete. ${extra} optional stops done.`;}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(checked));storageOK=true;}catch{storageOK=false;}}
document.addEventListener('change',e=>{if(!e.target.matches('.task input'))return;checked[e.target.id]=e.target.checked;e.target.closest('.task').classList.toggle('completed',e.target.checked);persist();update(true);});
window.addEventListener('storage',e=>{if(e.key!==KEY)return;try{const next=JSON.parse(e.newValue||'{}');checked=next&&typeof next==='object'&&!Array.isArray(next)?next:{};}catch{checked={};}document.querySelectorAll('.task input').forEach(el=>{el.checked=checked[el.id]===true;el.closest('.task').classList.toggle('completed',el.checked);});update();});
const dialog=document.querySelector('#reset-dialog');document.querySelector('#reset').addEventListener('click',()=>dialog.showModal());document.querySelector('#cancel-reset').addEventListener('click',()=>dialog.close());document.querySelector('#confirm-reset').addEventListener('click',()=>{checked={};persist();document.querySelectorAll('.task input').forEach(el=>{el.checked=false;el.closest('.task').classList.remove('completed');});update(true);dialog.close();});
update();
