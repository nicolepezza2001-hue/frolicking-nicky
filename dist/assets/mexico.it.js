'use strict';
const groups = [
{id:'neighborhoods', number:'01', title:'Juárez, Roma e Condesa', timing:'PICCOLE USCITE DURANTE TUTTO IL VIAGGIO', color:'pink', description:'Comincia vicino a casa. Una passeggiata e un pasto bastano per un pomeriggio.', sections:[
['UN PO’ DI GIRI',[
['juarez','Esplora Juárez','il tuo quartiere intorno a Triver'],
['reforma','Reforma e Ángel de la Independencia','grande viale e iconico monumento all’indipendenza'],
['roma','Roma Norte e Plaza Río de Janeiro','piazza alberata, Colima e Álvaro Obregón'],
['condesa','Parque México e Avenida Amsterdam','parco di quartiere Art Déco e anello alberato da percorrere a piedi']]],
['MANGIARE E PRENDERSELA COMODA',[
['maizajo','Maizajo','taquería; tortillas di mais tradizionali'],
['chava','Mi Compa Chava','pesce; ceviche, aguachile e tostadas'],
['maximo','Máximo','alta cucina stagionale con influenze francesi','La nostra cena prenotata.'],
['conchudo','Conchudo','bar di ostriche, pesce e vino','Un pasto facile vicino alla base a Juárez.'],
['drinks','Pistilo o Salón Palomilla','mezcal e distillati messicani / cocktail e terrazza','Scegli quello che si adatta alla serata.']]]], note:'Dal lunedì al mercoledì può bastare una cena, una breve passeggiata o anche niente.'},
{id:'centro',number:'02',title:'Centro Histórico',timing:'DUE POMERIGGI RILASSATI',color:'blue',description:'La vecchia Città del Messico, rovine di templi, murales e un ottimo motivo per fermarsi a mangiare churros.',sections:[
['PRIMO POMERIGGIO',[
['zocalo','Zócalo','la piazza storica principale di Città del Messico'],
['cathedral','Cattedrale Metropolitana','grandiosa cattedrale coloniale'],
['templo','Templo Mayor e museo','il tempio azteco principale di Tenochtitlan; rovine e reperti archeologici','Questa è la nostra tappa a Tenochtitlan, accanto allo Zócalo e alla Cattedrale Metropolitana. La capitale azteca si trovava sotto l’attuale centro storico.'],
['charco','CHARCO','bistrot contemporaneo e creativo con vista sul centro storico']]],
['UN ALTRO POMERIGGIO',[
['bellas','Palacio de Bellas Artes','grandioso palazzo delle arti; murales messicani'],
['alameda','Alameda Central','storico parco pubblico'],
['moro','Churrería El Moro Centro','churros e cioccolata calda']]]],note:'Fai il museo prima di mangiare o di girare la sera. Bellas Artes è aperto dal martedì alla domenica, dalle 10 alle 18.', link:['Informazioni ufficiali sul museo','https://inba.gob.mx/recinto/67/']},
{id:'chapultepec',number:'03',title:'Chapultepec',timing:'DUE POMERIGGI RILASSATI',color:'green',description:'Un grande museo, un castello e spazio per rallentare tra gli alberi.',sections:[
['UN POMERIGGIO',[
['anthropology','Museo Nacional de Antropología','le antiche civiltà e le culture indigene del Messico','Calcola circa tre ore. Scegli le sale che ti incuriosiscono di più.'],
['park','Bosque de Chapultepec','vastissimo parco cittadino','Una breve passeggiata dopo, se ti va.']]],
['UN ALTRO POMERIGGIO',[
['castle','Castello di Chapultepec','storica residenza reale e museo di storia messicana'],
['terraces','Terrazze e giardini del castello','vista panoramica sulla città','Lascia il tempo di goderti la vista.'],
['moderno','Museo de Arte Moderno','arte moderna messicana, tra cui Frida Kahlo','Da non perdere. Vicino all’ingresso del castello.']]]],note:'Tutti e tre i musei il lunedì sono chiusi. Il castello chiude alle 17 e il Museo de Arte Moderno alle 17:45, quindi tieni questo pomeriggio per un giorno in cui finisci di lavorare prima.',link:['Informazioni per visitare il castello','https://mnh.inah.gob.mx/informacion-general']},
{id:'coyoacan',number:'04',title:'Xochimilco e Coyoacán',timing:'GITA DEL SABATO',color:'blue',weekend:true,description:'Una mattina sui canali, poi il mondo di Frida, piazze di quartiere e un pomeriggio con spazio per girovagare.',sections:[
['UNA MATTINA SUI CANALI',[
['xochimilco','Giro in trajinera a Xochimilco','barche dipinte sugli antichi canali; musica e spuntini dalle barche che passano','Vai la mattina e noleggia una barca per una o due ore. Coyoacán è a circa 15 km: calcola fino a un’ora in taxi, a seconda del traffico.']]],
['FRIDA E GIRI CON CALMA',[
['frida','Museo Frida Kahlo / Casa Azul','la casa, la vita e l’arte di Frida','Prenota online in anticipo il biglietto a orario.'],
['squares','Jardín Centenario e Plaza Hidalgo','storiche piazze di quartiere'],
['market','Mercado de Coyoacán','mercato tradizionale; cibo e bancarelle locali'],
['coffee','Caffè e giri nel quartiere','una pausa e qualche via percorsa senza fretta']]]],note:'Uno dei nostri due sabati. Canali la mattina, Coyoacán dopo pranzo: prenota un orario pomeridiano per la Casa Azul.',link:['Prenota il Museo Frida Kahlo','https://www.museofridakahlo.org.mx/visita/']},
{id:'teotihuacan',number:'★',title:'Teotihuacán',timing:'GITA DEL SABATO',color:'yellow',weekend:true,description:'La nostra grande avventura, quella sicura. Piramidi antiche, partenza presto e serata libera.',sections:[
['TUTTA LA GIORNATA, CON CALMA',[
['early','Partenza presto da Triver','lascia tempo per il viaggio e per una visita senza fretta'],
['teoti','Esplora Teotihuacán','città antica, piramidi monumentali e rovine archeologiche'],
['avenue','Viale dei Morti','il viale cerimoniale principale'],
['lunch','Pranzo dopo la visita','scegli un posto quando ti va'],
['home','Ritorno a Triver','una serata libera, senza altre visite']]]],note:'Il nostro altro sabato. Tieni libera la giornata, viaggio compreso. Il sito è aperto tutti i giorni, dalle 8 alle 17.',link:['Informazioni ufficiali per i visitatori','https://www.inah.gob.mx/zonas/23-zona-arqueologica-de-teotihuacan']},
{id:'library',number:'+',title:'Biblioteca Vasconcelos',timing:'UN’USCITA BREVE IN PIÙ',color:'pink',description:'Un po’ di tempo per i libri e un’architettura straordinaria.',sections:[['IN UN POMERIGGIO PIÙ LEGGERO',[
['vasconcelos','Biblioteca Vasconcelos','spettacolare biblioteca moderna con scaffali sospesi','Tienila come uscita breve a sé.']]]],note:'Inseriscila di domenica o in un pomeriggio più leggero. Nessuna maratona di musei.'}
];
const optional = [
['quetzal','Parque Quetzalcóatl','architettura organica surreale e giardini; visita guidata','Un’uscita a parte. Prenota in anticipo.'],
['soumaya','Museo Soumaya','arte europea e messicana, tra cui sculture di Rodin'],
['dolores','Panteón de Dolores','cimitero storico; personaggi messicani illustri'],
['frances','Panteón Francés de la Piedad','cimitero storico riccamente decorato, di influenza europea','A sud di Roma, su Avenida Cuauhtémoc. Calcola circa un’ora; scegli quello de la Piedad, non il cimitero di San Joaquín.'],
['odette','ODETTE, sede di Lomas','panetteria e pasticceria alla francese','Se vai già da quelle parti.'],
['mercadoroma','Mercado Roma','mercato gastronomico con tanti banchi'],
['rosettapan','Panadería Rosetta','la panetteria di Rosetta; dolci e pane'],
['migrante','Migrante','cucina messicana contemporanea con influenze internazionali'],
['xuna','Xuna','alta cucina messicana contemporanea'],
['expendio','Expendio de Maíz','cucina messicana incentrata sul mais; niente menù fisso'],
['oncemil','La Once Mil','taquería raffinata'],
['la89','La 89','tacos in stile del nord; birria e manzo alla griglia'],
['tromperia','La Trompería','taquería; tacos al pastor e drink'],
['otherbar','L’altro bar per la sera','Pistilo: mezcal / Salón Palomilla: cocktail','Quello che non hai ancora provato.']
];
const KEY='frolicking-nicky-mexico-city-v1';
let checked={}; let storageOK=true;
try { const saved=JSON.parse(localStorage.getItem(KEY)||'{}'); if(saved && typeof saved==='object' && !Array.isArray(saved)) checked=saved; } catch {storageOK=false;}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function item(row,extra=false) {const [id,title,desc,note]=row;return `<label class="task${checked[id]===true?' completed':''}"><input type="checkbox" id="${esc(id)}" data-extra="${extra}" ${checked[id]===true?'checked':''}><span class="checkmark" aria-hidden="true"></span><span class="task-copy"><span class="task-title">${esc(title)}</span> <span class="specialty">(${esc(desc)})</span>${note?`<span class="task-note">${esc(note)}</span>`:''}</span></label>`;}
document.querySelector('#itinerary').innerHTML=groups.map(g=>`<section id="${g.id}" class="outing ${g.color} ${g.weekend?'weekend':''}" aria-labelledby="title-${g.id}"><div class="outing-heading"><span class="number" aria-hidden="true">${g.number}</span><div><p class="eyebrow">${g.timing}</p><h2 id="title-${g.id}">${g.title}</h2><p class="section-desc">${g.description}</p></div><span class="group-count" id="count-${g.id}" aria-label="Completamento della sezione"></span></div><div class="outing-body ${g.sections.length===1?'single':''}">${g.sections.map(([title,rows])=>`<div class="task-group"><h3>${title}</h3>${rows.map(r=>item(r)).join('')}</div>`).join('')}</div><div class="outing-note"><p>${g.note}</p>${g.link?`<a href="${g.link[1]}" target="_blank" rel="noopener noreferrer">${g.link[0]} ↗</a>`:''}</div></section>`).join('');
document.querySelector('#optional-list').innerHTML=optional.map(r=>item(r,true)).join('');
const mainIds=groups.flatMap(g=>g.sections.flatMap(s=>s[1].map(r=>r[0])));
function update(announce=false){const done=mainIds.filter(id=>checked[id]===true).length;const percent=Math.round(done/mainIds.length*100);document.querySelector('#progress-count').textContent=done;document.querySelector('#progress-total').textContent=`su ${mainIds.length} posti e momenti`;document.querySelector('#percent').textContent=percent+'%';document.querySelector('#progress').value=percent;document.querySelector('#progress').textContent=percent+'%';groups.forEach(g=>{const ids=g.sections.flatMap(s=>s[1].map(r=>r[0]));document.querySelector('#count-'+g.id).textContent=`${ids.filter(id=>checked[id]===true).length} / ${ids.length}`;});const extra=optional.filter(r=>checked[r[0]]===true).length;document.querySelector('#extra-count').textContent=`${extra} ${extra===1?'tappa facoltativa fatta':'tappe facoltative fatte'}`;document.querySelector('#save-note').textContent=storageOK?'Progressi salvati su questo dispositivo.':'Le spunte funzionano qui, ma in questo browser il salvataggio non è disponibile.';if(announce)document.querySelector('#announcement').textContent=`${done} su ${mainIds.length} voci principali completate. ${extra} tappe facoltative fatte.`;}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(checked));storageOK=true;}catch{storageOK=false;}}
document.addEventListener('change',e=>{if(!e.target.matches('.task input'))return;checked[e.target.id]=e.target.checked;e.target.closest('.task').classList.toggle('completed',e.target.checked);persist();update(true);});
window.addEventListener('storage',e=>{if(e.key!==KEY)return;try{const next=JSON.parse(e.newValue||'{}');checked=next&&typeof next==='object'&&!Array.isArray(next)?next:{};}catch{checked={};}document.querySelectorAll('.task input').forEach(el=>{el.checked=checked[el.id]===true;el.closest('.task').classList.toggle('completed',el.checked);});update();});
const dialog=document.querySelector('#reset-dialog');document.querySelector('#reset').addEventListener('click',()=>dialog.showModal());document.querySelector('#cancel-reset').addEventListener('click',()=>dialog.close());document.querySelector('#confirm-reset').addEventListener('click',()=>{checked={};persist();document.querySelectorAll('.task input').forEach(el=>{el.checked=false;el.closest('.task').classList.remove('completed');});update(true);dialog.close();});
update();
