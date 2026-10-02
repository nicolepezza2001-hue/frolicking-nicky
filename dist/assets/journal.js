/* Journal extras on the itinerary pages: a rough budget under "Best time to visit", and handwritten notes in the
   margin of some stops. Notes are matched to a stop by its checkbox id (the same in English and Italian), so to add
   one, find the stop's id in the page and add [id, English, Italian] to that trip below. */
(() => {
  const it = document.documentElement.lang === 'it';

  // Levels: 1 = low, 2 = mid, 3 = high, compared with a typical Western European city.
  const budget = {
    vienna: {
      rows: [['stay', 3, 'Central hotels and apartments are pricey; book early for summer and December.', 'Hotel e appartamenti in centro sono cari; prenota presto per l’estate e dicembre.'],
             ['food', 2, 'A Beisl lunch menu is good value; dinner in the centre costs more.', 'Il menù pranzo di un Beisl conviene; cenare in centro costa di più.'],
             ['coffee', 2, 'Coffee-house prices pay for the setting: linger as long as you like.', 'Nei caffè storici paghi anche l’atmosfera: resta quanto vuoi.'],
             ['sights', 2, 'Palaces and big museums add up; choose your favourites.', 'Palazzi e grandi musei si sommano: scegli i tuoi preferiti.'],
             ['transport', 1, 'A weekly pass covers the U-Bahn, trams and buses.', 'Un abbonamento settimanale copre metro, tram e autobus.']],
      tip: ['Cards work almost everywhere. Round up or add about 10% in restaurants.', 'Le carte si usano quasi ovunque. Al ristorante arrotonda o lascia circa il 10%.'] },
    bratislava: {
      rows: [['stay', 2, 'Most people visit as a day trip from Vienna.', 'Quasi tutti la visitano in giornata da Vienna.'],
             ['food', 1, 'Brunch, lunch and dinner cost noticeably less than in Vienna.', 'Brunch, pranzo e cena costano molto meno che a Vienna.'],
             ['coffee', 1, 'Coffee and cake stops are easy on the wallet.', 'Caffè e dolce non pesano sul portafoglio.'],
             ['sights', 1, 'The castle grounds, lanes and riverside are free to wander.', 'Il parco del castello, i vicoli e il lungofiume si girano gratis.'],
             ['transport', 1, 'The centre is walkable and the train from Vienna is inexpensive.', 'Il centro si gira a piedi e il treno da Vienna costa poco.']],
      tip: ['Paid in euros. Round up the bill by around 10% in restaurants.', 'Si paga in euro. Al ristorante si arrotonda di circa il 10%.'] },
    'mexico-city': {
      rows: [['stay', 2, 'Good-value stays in Roma, Condesa and Juárez.', 'Alloggi convenienti a Roma, Condesa e Juárez.'],
             ['food', 1, 'Tacos and markets are cheap; tasting menus like Máximo are a splurge.', 'Tacos e mercati costano poco; i menù degustazione come Máximo sono uno sfizio.'],
             ['coffee', 1, 'Excellent specialty coffee for less than at home.', 'Ottimo caffè di specialità a meno che a casa.'],
             ['sights', 1, 'Museum tickets are modest; Teotihuacán tours cost more.', 'I musei costano poco; le escursioni a Teotihuacán di più.'],
             ['transport', 1, 'The Metro is very cheap and ride-hailing is affordable.', 'La metro costa pochissimo e le auto con app sono economiche.']],
      tip: ['Tip 10–15% in restaurants, and carry small notes for markets and street food.', 'Al ristorante lascia il 10–15% e tieni banconote piccole per mercati e cibo di strada.'] },
    'san-miguel': {
      rows: [['stay', 3, 'One of the pricier towns in Mexico, especially around the centre.', 'Una delle cittadine più care del Messico, soprattutto in centro.'],
             ['food', 2, 'Rooftop dinners cost more; market food is cheap.', 'Le cene in terrazza costano di più; il cibo al mercato poco.'],
             ['coffee', 1, 'Plenty of lovely cafés at fair prices.', 'Tanti bei caffè a prezzi onesti.'],
             ['sights', 1, 'Wandering is free; El Charco and the museums are inexpensive.', 'Passeggiare è gratis; El Charco e i musei costano poco.'],
             ['transport', 1, 'Walk the centre; taxis are cheap. Day trips and rides add up.', 'Il centro si gira a piedi e i taxi costano poco. Gite ed escursioni si sommano.']],
      tip: ['Tip 10–15%. Bring cash for the Tuesday market and small shops.', 'Lascia il 10–15% di mancia. Porta contanti per il mercato del martedì e i negozietti.'] },
    vietnam: {
      rows: [['stay', 1, 'Lovely guesthouses and hotels for little; cruises are the exception.', 'Guesthouse e hotel belli a poco; le crociere sono l’eccezione.'],
             ['food', 1, 'Street food is delicious and very cheap.', 'Il cibo di strada è buonissimo e costa pochissimo.'],
             ['coffee', 1, 'Egg coffee and cà phê sữa đá cost next to nothing.', 'Il caffè all’uovo e il cà phê sữa đá costano quasi niente.'],
             ['sights', 1, 'Most entry fees are low; tours like the Ha Long cruise cost more.', 'Gli ingressi costano poco; i tour come la crociera a Ha Long di più.'],
             ['transport', 1, 'Grab, buses and limousine vans are inexpensive; flights add up.', 'Grab, autobus e minivan costano poco; i voli si sommano.']],
      tip: ['Carry some đồng in cash for markets and street food, and haggle gently at markets.', 'Tieni qualche đồng in contanti per mercati e cibo di strada, e contratta con garbo.'] },
    japan: {
      rows: [['stay', 3, 'Small rooms, big prices in cherry-blossom season: book early.', 'Camere piccole e prezzi alti nella stagione dei ciliegi: prenota presto.'],
             ['food', 2, 'Ramen and konbini are cheap; sushi counters and kaiseki are a splurge.', 'Ramen e konbini costano poco; sushi al banco e kaiseki sono uno sfizio.'],
             ['coffee', 2, 'Kissaten and specialty cafés cost about what they do at home.', 'Kissaten e caffè di specialità costano più o meno come da noi.'],
             ['sights', 2, 'Temples are inexpensive; teamLab, kimono rental and tours cost more.', 'I templi costano poco; teamLab, noleggio kimono e tour di più.'],
             ['transport', 2, 'City trains are cheap; the Shinkansen is the big ticket.', 'I treni in città costano poco; lo Shinkansen è la spesa grossa.']],
      tip: ['No tipping in Japan. Cards are widely accepted, but keep some cash for small places.', 'In Giappone non si lascia la mancia. Le carte sono diffuse, ma tieni contanti per i posti piccoli.'] },
  };

  const notes = {
    vienna: [['v9', 'Go first thing, before the tour groups!', 'Vai a primissima ora, prima dei gruppi!'],
             ['v16', 'One portion is plenty for two', 'Una porzione basta per due'],
             ['v17', 'The Kiss lives here. Say hi to Klimt!', 'Qui c’è Il bacio. Saluta Klimt!'],
             ['v35', 'Sit outside if the weather’s kind', 'Se il tempo è bello, siediti fuori']],
    'mexico-city': [['frida', 'Book online days ahead: it sells out!', 'Prenota online con giorni d’anticipo: si esaurisce!'],
                    ['moro', 'Churros + hot chocolate. Non-negotiable.', 'Churros + cioccolata calda. Obbligatori.'],
                    ['anthropology', 'It’s huge: pick two or three halls', 'È enorme: scegli due o tre sale'],
                    ['teoti', 'Hat, sunscreen, water: there’s almost no shade', 'Cappello, crema e acqua: non c’è quasi ombra']],
    'san-miguel': [['charco', 'Go in the morning, before the heat', 'Vai di mattina, prima del caldo'],
                   ['quince', 'Book for sunset: that’s the whole point', 'Prenota per il tramonto: è tutto lì'],
                   ['tianguis', 'Tuesdays only! Bring cash', 'Solo il martedì! Porta contanti'],
                   ['pipila', 'Ride up, walk down the little lanes', 'Sali in funicolare, scendi a piedi tra i vicoli']],
    bratislava: [['coffee', 'Cake counts as lunch, right?', 'Il dolce vale come pranzo, no?'],
                 ['castle', 'Worth the climb for the Danube view', 'La salita vale la vista sul Danubio'],
                 ['lanes', 'Find Čumil peeking out of his manhole!', 'Cerca Čumil che sbuca dal tombino!']],
    vietnam: [['hanoi-1', 'Weekend evenings the lakeside streets go car-free', 'Nei weekend, la sera, le strade del lago sono pedonali'],
              ['hanoi-3', 'Come hungry!', 'Vieni a stomaco vuoto!'],
              ['ninh-binh-1', 'About 500 steps: worth every one at sunset', 'Circa 500 gradini: valgono tutti al tramonto'],
              ['hoi-an-1', 'Float a paper lantern on the river after dark', 'Dopo il tramonto, lascia una lanterna sul fiume']],
    japan: [['tokyo-0-5', 'Watch it from above first, then join in', 'Prima guardalo dall’alto, poi buttati'],
            ['kyoto-0-3', 'Go early: the higher you climb, the quieter it gets', 'Vai presto: più sali, più è tranquillo'],
            ['kyoto-2-0', 'Before 8am for photos without the crowds', 'Prima delle 8 per foto senza folla'],
            ['kyoto-6-0', 'Bow to the deer and they bow back!', 'Fai un inchino ai cervi: te lo restituiscono!']],
  };

  const t = it
    ? { title: 'Budget indicativo', intro: 'Quanto costano le cose rispetto a una tipica città dell’Europa occidentale. Una guida a occhio, non prezzi aggiornati.',
        cats: { stay: 'Dormire', food: 'Mangiare fuori', coffee: 'Caffè e spuntini', sights: 'Visite ed esperienze', transport: 'Spostarsi' }, levels: ['', 'Basso', 'Medio', 'Alto'], tip: 'Consiglio sui soldi:' }
    : { title: 'Rough budget', intro: 'How pricey things feel compared with a typical Western European city. A rough guide, not current prices.',
        cats: { stay: 'Staying', food: 'Eating out', coffee: 'Coffee & snacks', sights: 'Sights & experiences', transport: 'Getting around' }, levels: ['', 'Low', 'Mid', 'High'], tip: 'Money tip:' };

  const coins = n => `<span class="fn-coins" aria-hidden="true">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>`;

  const run = () => {
    const season = document.querySelector('best-time-to-visit');
    const key = season && season.getAttribute('destination');
    const b = budget[key];
    if (b && !document.querySelector('.fn-budget')) {
      const el = document.createElement('section'); el.className = 'fn-budget'; el.setAttribute('aria-labelledby', 'fn-budget-title');
      el.innerHTML = `<h2 id="fn-budget-title">${t.title}</h2><p class="fn-budget-intro">${t.intro}</p>
        <div class="fn-budget-grid">${b.rows.map(([cat, n, en, itx]) => `<div class="fn-budget-row"><p class="fn-budget-cat">${t.cats[cat]}</p>
          <p class="fn-budget-level">${coins(n)}<span>${t.levels[n]}</span></p><p class="fn-budget-note">${it ? itx : en}</p></div>`).join('')}</div>
        <p class="fn-budget-tip"><strong>${t.tip}</strong> ${it ? b.tip[1] : b.tip[0]}</p>`;
      season.after(el);
    }
    (notes[key] || []).forEach(([id, en, itx]) => {
      const box = document.querySelector(`input[type=checkbox]#${CSS.escape(id)}, input[type=checkbox][data-stop="${id}"]`);
      const label = box && box.closest('label'); if (!label || label.querySelector('.fn-margin-note')) return;
      const copy = label.querySelector('.copy') || label.querySelector('.task-copy') || label.querySelector('input + span') || label;
      const note = document.createElement('span'); note.className = 'fn-margin-note';
      note.innerHTML = `<svg viewBox="0 0 26 18" aria-hidden="true"><path d="M24 15C17 15 9 12 5 4M5 4l-1 6M5 4l5 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>${it ? itx : en}`;
      copy.append(note);
    });
  };
  // Some itineraries are drawn by their own scripts, so wait until the page has finished loading
  document.readyState === 'complete' ? run() : addEventListener('load', run);
})();
