import { visitSeasons as seasonsEn } from './visit-seasons.js';
import { visitSeasons as seasonsIt } from './visit-seasons.it.js';

const IT = document.documentElement.lang === 'it';
const visitSeasons = IT ? seasonsIt : seasonsEn;

const months = IT ? ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'] : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
// Ratings stay in English as data keys; only the displayed labels change.
const label = IT ? { Best: 'Ottimo', Good: 'Buono', Okay: 'Discreto', Avoid: 'Da evitare' } : { Best: 'Best', Good: 'Good', Okay: 'Okay', Avoid: 'Avoid' };
const t = IT ? { heading: 'Periodo migliore per andarci', months: 'Valutazione mese per mese, da gennaio a dicembre', legend: 'Legenda', pick: 'La mia scelta:', notes: 'Note stagionali e fonti', intro: 'Valutazione complessiva per questo itinerario, tra meteo, folla e prezzi. “Da evitare” indica i mesi meno comodi o affidabili per questo percorso, non che sia impossibile viaggiare. Condizioni e date delle festività cambiano di anno in anno.', sources: 'Fonti' } : { heading: 'Best time to visit', months: 'Monthly travel ratings, January to December', legend: 'Rating legend', pick: 'My pick:', notes: 'Seasonal notes & sources', intro: 'Overall fit for this itinerary, balancing weather, crowds and value. “Avoid” means the least comfortable or reliable months for this route, not that travel is impossible. Conditions and holiday dates vary by year.', sources: 'Sources' };
const symbols = { Best: '★', Good: '●', Okay: '–', Avoid: '×' };
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

// Every destination uses this one renderer. Only the data and mount key vary.
class BestTimeToVisit extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('.fn-season')) return;
    const key = this.getAttribute('destination');
    const data = visitSeasons[key];
    if (!data || data.ratings.length !== 12 || data.ratings.some(r => !symbols[r])) {
      console.error(`Missing or invalid seasonal data: ${key}`);
      return;
    }
    const heading = `fn-season-heading-${key}`;
    this.innerHTML = `<section class="fn-season" aria-labelledby="${heading}">
      <h2 id="${heading}">${t.heading}</h2>
      <p class="fn-season-scope">${escapeHTML(data.scope || '')}</p>
      <ol class="fn-season-months" aria-label="${t.months}">${data.ratings.map((rating,i) => `<li class="fn-season-month" title="${months[i]}: ${label[rating]}${data.reasons?.[i] ? ' — '+escapeHTML(data.reasons[i]) : ''}"><span class="fn-season-month-name">${months[i]}</span><span class="fn-season-swatch fn-season-${rating.toLowerCase()}"><span aria-hidden="true">${symbols[rating]}</span><span class="fn-season-sr">${label[rating]}</span></span></li>`).join('')}</ol>
      <ul class="fn-season-legend" aria-label="${t.legend}">${Object.entries(symbols).map(([rating,symbol]) => `<li><span class="fn-season-key fn-season-${rating.toLowerCase()}" aria-hidden="true">${symbol}</span>${label[rating]}</li>`).join('')}</ul>
      <p class="fn-season-pick">${escapeHTML(data.note).replace(t.pick,`<strong>${t.pick}</strong>`)}</p>
      <details class="fn-season-details"><summary>${t.notes}</summary><p>${t.intro}</p>${data.reasons ? `<dl>${data.reasons.map((reason,i) => `<div><dt>${months[i]} · ${label[data.ratings[i]]}</dt><dd>${escapeHTML(reason)}</dd></div>`).join('')}</dl>` : ''}${data.sources?.length ? `<p class="fn-season-sources">${t.sources}: ${data.sources.map(([label,url]) => `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a>`).join(' · ')}</p>` : ''}</details>
    </section>`;
  }
}
customElements.define('best-time-to-visit', BestTimeToVisit);
