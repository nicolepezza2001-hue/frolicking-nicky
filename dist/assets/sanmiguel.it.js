'use strict';
const groups = [
{id:'centro', number:'01', title:'Intorno al Jardín', timing:'PICCOLE USCITE DURANTE TUTTO IL VIAGGIO', color:'pink', description:'Il centro storico, un caffè alla volta. Cammina, siediti su una terrazza, cammina ancora un po’.', sections:[
['UN PO’ DI GIRI',[
['parroquia','Parroquia de San Miguel Arcángel e Jardín Allende','la chiesa neogotica rosa e la piazza principale','Il posto più facile da cui cominciare, e in cui finire una serata.'],
['mesones','San Ignacio Mesón','cortile di piccoli negozi in calle Mesones'],
['soles','Hotel Casa de los Soles','hotel con cortile decorato a soli','Di solito si può entrare a dare un’occhiata.'],
['artesanias','Mercado de Artesanías','mercato dell’artigianato vicino a Lavanda','Addentrati di più per avere più scelta e prezzi migliori.'],
['mirador','El Mirador','punto panoramico sulla città al tramonto','Arriva circa 30 minuti prima del tramonto.']]],
['MANGIARE E PRENDERSELA COMODA',[
['lavanda','Lavanda Café de Especialidad','caffè specialty e colazione; terrazza sul tetto','Chiuso la domenica. Vai presto o preparati a una breve attesa.'],
['tata','La Cocina de Tata','colazione e pranzo messicani su una terrazza','Aperto solo dal giovedì alla domenica.'],
['kibok','KI’BOK Coffee','caffè, chilaquiles e una terrazza sul tetto'],
['milagros','Los Milagros','ristorante e bar messicano; molcajete'],
['quince','Quince','bar e ristorante su una terrazza di fronte alla Parroquia','Prenota un tavolo verso il tramonto.']]]], note:'Certi pomeriggi possono essere solo un caffè, una breve passeggiata o anche niente.'},
{id:'aurora',number:'02',title:'El Charco e La Aurora',timing:'UNA MATTINA, UN POMERIGGIO',color:'green',description:'Sentieri tra i cactus sopra la città, poi arte, design e un caffè in giardino in una vecchia fabbrica tessile.',sections:[
['UNA MATTINA',[
['charco','El Charco del Ingenio','giardino botanico e riserva naturale; sentieri nel canyon','Vai all’apertura, prima che i sentieri si scaldino. Porta dell’acqua.']]],
['UN ALTRO POMERIGGIO',[
['aurora','Fábrica La Aurora','gallerie d’arte e negozi di design in un’ex fabbrica tessile','Calcola un paio d’ore.'],
['geek','Geek & Coffee','caffè con giardino dietro La Aurora','Un caffè con calma sul prato.']]]],note:'El Charco è aperto tutti i giorni, dalle 9 alle 17. Lassù il segnale del telefono va e viene, quindi organizza prima come tornare.'},
{id:'sanantonio',number:'03',title:'A sud del centro',timing:'DUE POMERIGGI RILASSATI',color:'blue',description:'Panetterie e un parco alberato di giorno, piattini e bar con giardino la sera.',sections:[
['UNA GIORNATA LENTA',[
['panina','Panina','panetteria a lievitazione naturale e brunch','Aperto dalle 8 alle 15.'],
['luna','Luna de Queso','caffè-gastronomia, formaggeria e patio con giardino','Chiuso la domenica.'],
['juarez','Parque Benito Juárez','parco ombreggiato con vialetti e fontane']]],
['UNA SERATA FUORI',[
['tostevere','Tostévere','piattini, tostadas e cocktail al mezcal','Prenota con largo anticipo: è piccolo.'],
['rosewood','Rosewood — Luna Rooftop','bar sulla terrazza con vista sulla città','Vai per il tramonto.'],
['santuario','Hacienda El Santuario','bar nel giardino dell’hotel; cocktail al mezcal']]]],note:'Panina e Luna de Queso sono vicini, a San Antonio. Facili da raggiungere a piedi dal Jardín.'},
{id:'sazon',number:'04',title:'Giorno di mercato e corso di cucina',timing:'UN MARTEDÌ',color:'yellow',description:'Il grande mercato settimanale la mattina, poi cucinare e mangiare quello che abbiamo preparato.',sections:[
['LA MATTINA',[
['tianguis','Tianguis de los Martes','enorme mercatino settimanale con bancarelle di cibo','Solo il martedì. Vai presto e sgranocchia qualcosa mentre curiosi.']]],
['IL POMERIGGIO',[
['sazonclass','Sazón Cooking School','giro al mercato e corso pratico di cucina messicana','Prendi il corso delle 15. Circa 2 ore e mezza; chiuso il lunedì.']]]],note:'Prenota il corso in anticipo e controlla quali piatti sono nel menù di quel giorno.'},
{id:'dayout',number:'05',title:'Una piramide e un vigneto',timing:'UNA GIORNATA FUORI · DAL MERCOLEDÌ ALLA DOMENICA',color:'pink',description:'Un antico sito cerimoniale la mattina, poi un lungo pranzo tra le vigne.',sections:[
['LA MATTINA',[
['canada','Cañada de la Virgen','sito con piramide, visita guidata; 1,5 km di salita a piedi','Chiuso il lunedì. Porta acqua e cappello.']]],
['IL POMERIGGIO',[
['dosbuhos','Bodega Dos Búhos','cantina; degustazioni e pranzo sotto gli alberi','Aperto dal mercoledì alla domenica. Prenota la degustazione.']]]],note:'Cañada è a ovest della città e Dos Búhos a est, quindi prenota un autista o dei taxi per la giornata.'},
{id:'guanajuato',number:'★',title:"Gita in giornata a Guanajuato",sections:[]},
{id:'ride',number:'★',title:'Cavalli e sorgenti termali',timing:'GITA DEL SABATO',color:'green',weekend:true,description:'Una cavalcata mattutina sulle colline, poi un pomeriggio a mollo.',sections:[
['LA MATTINA',[
['horses','Passeggiata a cavallo','SoTeZ Horse Ranch o Coyote Canyon Adventures','SoTeZ è a circa 10 minuti, con uscite sui sentieri di montagna. Coyote Canyon include il pranzo ed è un’uscita più lunga e veloce nel canyon.']]],
['IL POMERIGGIO',[
['atotonilco','Santuario de Atotonilco','chiesa patrimonio UNESCO con pareti e soffitti dipinti','Poco più su lungo la strada da La Gruta. Organizza il ritorno: lì i taxi sono pochi.'],
['gruta','Le terme di La Gruta','piscine termali e una grotta piena di vapore','Aperto dal mercoledì alla domenica, dalle 7 alle 17. Nel weekend c’è tanta gente, quindi vai presto. Porta un asciugamano.'],
['spaalt','Oppure la spa di un hotel in città','Rosewood o Hacienda El Santuario','Se preferiamo restare vicini.']]]],note:'Il nostro altro sabato. Prenota la cavalcata in anticipo, scegli una spa e aggiungi Atotonilco se la giornata lo permette.'}
];
const optional = [
['zipline','San Miguel Parque de Aventura','sette zipline e un ponte sospeso sopra un canyon','Prenota in anticipo.'],
['sanlucas','Viñedos San Lucas','vigneto; degustazione di vini, brunch e pranzo','Circa 25 minuti a est della città.'],
['presa','Amigos de La Presa Boathouse','passeggiate e giri in barca sul lago artificiale','Aperto solo il mercoledì e il sabato mattina.']
];
const NO_COUNT=new Set(["lavanda", "tata", "kibok", "milagros", "quince", "geek", "panina", "luna", "tostevere", "rosewood", "santuario"]);
const KEY='frolicking-nicky-san-miguel-v1';
let checked={}; let storageOK=true;
try { const saved=JSON.parse(localStorage.getItem(KEY)||'{}'); if(saved && typeof saved==='object' && !Array.isArray(saved)) checked=saved; } catch {storageOK=false;}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function item(row,extra=false) {const [id,title,desc,note]=row;return `<label class="task${checked[id]===true?' completed':''}"><input type="checkbox" id="${esc(id)}" data-extra="${extra}" ${checked[id]===true?'checked':''}><span class="checkmark" aria-hidden="true"></span><span class="task-copy"><span class="task-title">${esc(title)}</span> <span class="specialty">(${esc(desc)})</span>${note?`<span class="task-note">${esc(note)}</span>`:''}</span></label>`;}
const PHOTOS={"centro": [[["/assets/sma-dusk.jpg", "Un vicolo illuminato sotto la Parroquia al crepuscolo", 1050, 1400], ["/assets/sma-church.jpg", "Volte dipinte e lampadari dentro la chiesa", 1050, 1400]], [["/assets/sma-food.jpg", "Una pausa pranzo colorata a San Miguel", 1050, 1400], ["/assets/sma-restaurant.jpg", "Un cortile di ristorante colorato con fiori e sedie dipinte", 1050, 1400]], [["/assets/sma-botica.jpg", "La facciata della Botica de Santa Teresita di notte", 1050, 1400], ["/assets/sma-cat.jpg", "Un gatto riposa dietro la grata di una finestra", 1050, 1400]]], "aurora": [[["/assets/sma-canyon.jpg", "Il ruscello roccioso di El Charco del Ingenio", 1050, 1400], ["/assets/sma-trail.jpg", "Un sentiero ombreggiato tra i cactus a El Charco del Ingenio", 1050, 1400]], []], "sanantonio": [[["/assets/sma-street.jpg", "Ciottoli e un campanile illuminato dal sole", 1050, 1400]], [["/assets/sma-garden.jpg", "Un cortile a lume di candela incorniciato dal verde", 1050, 1400], ["/assets/sma-fountain.jpg", "Una fontana con una brocca scolpita su una parete rossa", 1050, 1400]]], "sazon": [[["/assets/sma-flowers.jpg", "Calendule trasportate per le vie della città", 1050, 1400]], [["/assets/sma-salsas.jpg", "Salse su una tavola dai colori vivaci", 1050, 1400]]], "ride": [[["/assets/sma-ride.jpg", "San Miguel vista a cavallo dalle colline", 1050, 1400], ["/assets/sma-horse.jpg", "Un momento tranquillo con un cavallo sulle colline", 1050, 1400]], []]};
const fig=([src,alt,w,h])=>`<figure class="fn-v-photo"><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy"></a></figure>`;
let rowN=0;
document.querySelector('#itinerary').innerHTML=groups.map(g=>g.id==='guanajuato'?`<section id="guanajuato" class="outing weekend"><div class="outing-heading"><span class="number" aria-hidden="true">★</span><h2><a href="/it/messico/guanajuato">Gita in giornata a Guanajuato ↗︎</a></h2></div></section>`:`<section id="${g.id}" class="outing fn-split ${g.color} ${g.weekend?'weekend':''}" aria-labelledby="title-${g.id}"><div class="outing-heading"><span class="number" aria-hidden="true">${g.number}</span><div><p class="eyebrow">${g.timing}</p><h2 id="title-${g.id}">${g.title}</h2><p class="section-desc">${g.description}</p></div><span class="group-count" id="count-${g.id}" aria-label="Completamento della sezione"></span></div><div class="outing-body fn-split-body">${g.sections.map(([title,rows],si)=>{const ps=(PHOTOS[g.id]||[])[si]||[];const card=rs=>`<div class="task-group"><h3>${title}</h3>${rs.map(r=>item(r)).join('')}</div>`;if(!ps.length)return card(rows);const first=rows.slice(0,2),rest=rows.slice(2);return `<div class="fn-v-row${rowN++%2?' fn-v-rev':''}"><div class="fn-v-side">${ps.map(fig).join('')}</div>${card(first)}</div>${rest.length?((g.id==='centro'&&si===0)?`<div class="fn-v-row${rowN++%2?' fn-v-rev':''}"><div class="fn-v-side">${PHOTOS.centro[2].map(fig).join('')}</div><div class="task-group">${rest.map(r=>item(r)).join('')}</div></div>`:`<div class="task-group">${rest.map(r=>item(r)).join('')}</div>`):''}`;}).join('')}</div><div class="outing-note"><p>${g.note}</p>${g.link?`<a href="${g.link[1]}" target="_blank" rel="noopener noreferrer">${g.link[0]} ↗︎</a>`:''}</div></section>`).join('');
document.querySelector('#optional-list').innerHTML=optional.map(r=>item(r,true)).join('');
const mainIds=groups.flatMap(g=>g.sections.flatMap(s=>s[1].map(r=>r[0]))).filter(id=>!NO_COUNT.has(id));
function update(announce=false){const done=mainIds.filter(id=>checked[id]===true).length;const percent=Math.round(done/mainIds.length*100);document.querySelector('#progress-count').textContent=done;document.querySelector('#progress-total').textContent=`su ${mainIds.length} posti e momenti`;document.querySelector('#percent').textContent=percent+'%';document.querySelector('#progress').value=percent;document.querySelector('#progress').textContent=percent+'%';groups.filter(g=>g.sections.length).forEach(g=>{const ids=g.sections.flatMap(s=>s[1].map(r=>r[0])).filter(id=>!NO_COUNT.has(id));document.querySelector('#count-'+g.id).textContent=`${ids.filter(id=>checked[id]===true).length} / ${ids.length}`;});const extra=optional.filter(r=>checked[r[0]]===true).length;document.querySelector('#extra-count').textContent=`${extra} ${extra===1?'tappa facoltativa fatta':'tappe facoltative fatte'}`;document.querySelector('#save-note').textContent=storageOK?'Progressi salvati su questo dispositivo.':'Le spunte funzionano qui, ma in questo browser il salvataggio non è disponibile.';if(announce)document.querySelector('#announcement').textContent=`${done} su ${mainIds.length} voci principali completate. ${extra} tappe facoltative fatte.`;}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(checked));storageOK=true;}catch{storageOK=false;}}
document.addEventListener('change',e=>{if(!e.target.matches('.task input'))return;checked[e.target.id]=e.target.checked;e.target.closest('.task').classList.toggle('completed',e.target.checked);persist();update(true);});
window.addEventListener('storage',e=>{if(e.key!==KEY)return;try{const next=JSON.parse(e.newValue||'{}');checked=next&&typeof next==='object'&&!Array.isArray(next)?next:{};}catch{checked={};}document.querySelectorAll('.task input').forEach(el=>{el.checked=checked[el.id]===true;el.closest('.task').classList.toggle('completed',el.checked);});update();});
const dialog=document.querySelector('#reset-dialog');document.querySelector('#reset').addEventListener('click',()=>dialog.showModal());document.querySelector('#cancel-reset').addEventListener('click',()=>dialog.close());document.querySelector('#confirm-reset').addEventListener('click',()=>{checked={};persist();document.querySelectorAll('.task input').forEach(el=>{el.checked=false;el.closest('.task').classList.remove('completed');});update(true);dialog.close();});
update();
