import { visitSeasons } from './visit-seasons.js';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
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
      <h2 id="${heading}">Best time to visit</h2>
      <p class="fn-season-scope">${escapeHTML(data.scope || '')}</p>
      <ol class="fn-season-months" aria-label="Monthly travel ratings, January to December">${data.ratings.map((rating,i) => `<li class="fn-season-month" title="${months[i]}: ${rating}${data.reasons?.[i] ? ' — '+escapeHTML(data.reasons[i]) : ''}"><span class="fn-season-month-name">${months[i]}</span><span class="fn-season-swatch fn-season-${rating.toLowerCase()}"><span aria-hidden="true">${symbols[rating]}</span><span class="fn-season-sr">${rating}</span></span></li>`).join('')}</ol>
      <ul class="fn-season-legend" aria-label="Rating legend">${Object.entries(symbols).map(([rating,symbol]) => `<li><span class="fn-season-key fn-season-${rating.toLowerCase()}" aria-hidden="true">${symbol}</span>${rating}</li>`).join('')}</ul>
      <p class="fn-season-pick">${escapeHTML(data.note).replace(/^My pick:/,'<strong>My pick:</strong>')}</p>
      <details class="fn-season-details"><summary>Seasonal notes & sources</summary><p>Overall fit for this itinerary, balancing weather, crowds and value. “Avoid” means the least comfortable or reliable months for this route, not that travel is impossible. Conditions and holiday dates vary by year.</p>${data.reasons ? `<dl>${data.reasons.map((reason,i) => `<div><dt>${months[i]} · ${data.ratings[i]}</dt><dd>${escapeHTML(reason)}</dd></div>`).join('')}</dl>` : ''}${data.sources?.length ? `<p class="fn-season-sources">Sources: ${data.sources.map(([label,url]) => `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a>`).join(' · ')}</p>` : ''}</details>
    </section>`;
  }
}
customElements.define('best-time-to-visit', BestTimeToVisit);
