/* Frolicking Nicky: the study, Nicky's private learning hub (/hub/ and /it/studio/).
   Reached only through the secret first letter of the footer tagline on every page; the pages are noindex.
   The landing page is Nicky's painting alone (full screen); each object links to a topic view (#opera, #new…).
   Topics live in TOPICS below (English and Italian side by side). Ticks, notes, extra steps and new topics are kept
   in this browser only (localStorage key "fn-study-v1", shared by both languages), like the itinerary checklists.
   These pages load neither motion.js nor the site's header and footer: nothing but the painting (Nicky's call). */
(() => {
  const it = document.documentElement.lang === 'it';
  const L = (en, itx) => (it ? itx : en);

  // [title, note] pairs; titles that are names of works stay the same in both languages
  const TOPICS = [
    {
      id: 'opera',
      name: ['Opera', 'Opera lirica'],
      why: ['Learning to listen: the big works, how the voices work, and what’s actually happening on stage.',
            'Imparare ad ascoltare: le grandi opere, come funzionano le voci e cosa succede davvero sul palco.'],
      path: [
        ['Monteverdi, L’Orfeo (1607)', 'Where it starts. Notice how the music follows the words.', 'Dove comincia tutto. Nota come la musica segue le parole.'],
        ['Mozart, Le nozze di Figaro', 'Comedy, ensembles, and arias that reveal character.', 'Commedia, pezzi d’insieme e arie che rivelano i personaggi.'],
        ['Rossini, Il barbiere di Siviglia', 'Bel canto fireworks. Listen for the coloratura.', 'Fuochi d’artificio del bel canto. Ascolta le colorature.'],
        ['Verdi, La traviata', 'The perfect first tragic opera. Follow Violetta through three acts.', 'La prima tragedia perfetta. Segui Violetta nei tre atti.'],
        ['Bizet, Carmen', 'French opéra comique, with spoken dialogue in the original.', 'Opéra comique francese, con i dialoghi parlati nell’originale.'],
        ['Puccini, La bohème', 'Verismo: everyday people, huge melodies.', 'Verismo: gente comune, melodie enormi.'],
        ['Wagner, Tristan und Isolde', 'Prelude and Act 2 first. Leitmotifs and the “Tristan chord”.', 'Prima il Preludio e il secondo atto. Leitmotiv e l’“accordo del Tristano”.'],
        [['Learn the voice types', 'Impara i tipi di voce'], 'Soprano to bass, plus Fach: lyric, dramatic, coloratura.', 'Dal soprano al basso, e i Fach: lirico, drammatico, di coloratura.'],
        ['Strauss, Der Rosenkavalier', 'Waltzes, nostalgia, and the trio at the end.', 'Valzer, nostalgia e il terzetto finale.'],
        ['Britten, Peter Grimes', 'Twentieth-century English opera, and the Sea Interludes.', 'Opera inglese del Novecento e i Sea Interludes.'],
        [['See one live', 'Vederne una dal vivo'], 'Palacio de Bellas Artes, or wherever the travels land.', 'Al Palacio de Bellas Artes, o dovunque mi portino i viaggi.']
      ],
      shelf: [
        ['Watch', 'Guarda', 'OperaVision', 'Free full productions from European houses.', 'Produzioni complete e gratuite dei teatri europei.', 'https://operavision.eu/'],
        ['Watch', 'Guarda', 'The Met Opera', 'Live in HD screenings and the on-demand archive.', 'Le dirette Live in HD e l’archivio on demand.', 'https://www.metopera.org/'],
        ['Book', 'Libro', 'Kobbé’s Complete Opera Book', 'Plot by plot, for almost everything.', 'Trama per trama, quasi tutto il repertorio.'],
        ['Book', 'Libro', 'Abbate & Parker, A History of Opera', 'A readable overview of four hundred years.', 'Quattrocento anni raccontati in modo leggibile.']
      ]
    },
    {
      id: 'silver-age',
      name: ['Silver Age poetry', 'La poesia dell’Età d’argento'],
      why: ['Russian poetry from about 1890 to the 1920s: Symbolists, Acmeists, Futurists, and the cafés where they argued.',
            'La poesia russa dal 1890 circa agli anni Venti: simbolisti, acmeisti, futuristi e i caffè dove litigavano.'],
      path: [
        [['The map of movements', 'La mappa dei movimenti'], 'Symbolism, then Acmeism and Futurism. Who split from whom, and why.', 'Il simbolismo, poi acmeismo e futurismo. Chi si è staccato da chi, e perché.'],
        ['Aleksandr Blok', '“The Stranger”, then The Twelve.', '“La sconosciuta”, poi I dodici.'],
        ['Andrei Bely & Vyacheslav Ivanov', 'Symbolism at its most mystical, and Ivanov’s Tower salon.', 'Il simbolismo più mistico e il salotto della Torre di Ivanov.'],
        ['Nikolai Gumilev', 'The Poets’ Guild and the Acmeist manifesto: clarity, the thing itself.', 'La Corporazione dei poeti e il manifesto acmeista: chiarezza, la cosa in sé.'],
        ['Anna Akhmatova', 'The early lyrics (Evening, Rosary), then Requiem.', 'Le prime liriche (La sera, Il rosario), poi Requiem.'],
        ['Osip Mandelstam', 'Stone, then the Voronezh notebooks.', 'La pietra, poi i Quaderni di Voronež.'],
        ['Marina Tsvetaeva', '“Poems to Akhmatova” and “Poem of the End”.', '“Versi ad Achmatova” e il “Poema della fine”.'],
        [['The Futurists', 'I futuristi'], 'Mayakovsky’s “A Cloud in Trousers” and Khlebnikov’s zaum.', '“La nuvola in calzoni” di Majakovskij e lo zaum’ di Chlebnikov.'],
        ['Boris Pasternak', 'My Sister, Life (1917).', 'Mia sorella, la vita (1917).'],
        [['The Stray Dog cabaret', 'Il cabaret del Cane randagio'], 'The St Petersburg basement where everyone met.', 'Lo scantinato di San Pietroburgo dove si incontravano tutti.'],
        [['One poem in Russian', 'Una poesia in russo'], 'Side by side with a translation, then learn it by heart.', 'Con la traduzione accanto, poi impararla a memoria.']
      ],
      shelf: [
        ['Memoir', 'Memorie', 'Nadezhda Mandelstam, Hope Against Hope', 'The essential memoir of the end of the era.', 'Le memorie essenziali sulla fine di quell’epoca.'],
        ['Memoir', 'Memorie', 'Nina Berberova, The Italics Are Mine', 'The whole generation, seen from emigration.', 'Tutta una generazione, vista dall’emigrazione.'],
        ['Poems', 'Poesie', 'Akhmatova, Complete Poems (tr. Judith Hemschemeyer)', 'Thorough, and easy to read beside the Russian.', 'Completa, e facile da leggere accanto al russo.'],
        ['Online', 'Online', 'Russian Wikisource', 'The original texts, free.', 'I testi originali, gratis.', 'https://ru.wikisource.org/']
      ]
    },
    {
      id: 'russian',
      name: ['Russian', 'Russo'],
      why: ['The language of the poems on the next page: the alphabet, the cases, the verbs of motion, then real reading.',
            'La lingua delle poesie della pagina accanto: l’alfabeto, i casi, i verbi di moto, poi la lettura vera.'],
      path: [
        [['The Cyrillic alphabet', 'L’alfabeto cirillico'], 'Print and handwriting, including the letters that look familiar but aren’t.', 'Stampatello e corsivo, comprese le lettere che sembrano familiari ma non lo sono.'],
        [['Stress and vowel reduction', 'Accento e riduzione vocalica'], 'Why молоко sounds like “malakó”, and why stress marks help.', 'Perché молоко si pronuncia “malakó”, e perché gli accenti segnati aiutano.'],
        [['Gender and the six cases', 'Genere e i sei casi'], 'Nominative to prepositional, one case at a time.', 'Dal nominativo al prepositivo, un caso alla volta.'],
        [['Aspect', 'L’aspetto'], 'Perfective and imperfective pairs: the heart of the Russian verb.', 'Le coppie perfettivo e imperfettivo: il cuore del verbo russo.'],
        [['Verbs of motion', 'I verbi di moto'], 'Идти and ходить, ехать and ездить, and all their prefixes.', 'Идти e ходить, ехать e ездить, e tutti i loro prefissi.'],
        [['A fairy tale', 'Una fiaba'], 'A short skazka read aloud, with the audio.', 'Una breve skazka letta ad alta voce, con l’audio.'],
        [['Pushkin, side by side', 'Puškin, a fronte'], 'A short lyric with a translation beside it.', 'Una breve lirica con la traduzione accanto.'],
        [['A first conversation', 'Una prima conversazione'], 'Half an hour with a tutor or a language exchange partner.', 'Mezz’ora con un insegnante o in uno scambio linguistico.']
      ],
      shelf: [
        ['Book', 'Libro', 'Nicholas Brown, The New Penguin Russian Course', 'A thorough grammar course for adults.', 'Un corso di grammatica completo per adulti.'],
        ['Book', 'Libro', 'Terence Wade, A Comprehensive Russian Grammar', 'The reference to keep on the desk.', 'Il riferimento da tenere sulla scrivania.'],
        ['Online', 'Online', 'Russian National Corpus', 'See how any word is really used.', 'Per vedere come si usa davvero una parola.', 'https://ruscorpora.ru/'],
        ['Online', 'Online', 'Forvo', 'Native speakers pronouncing words.', 'Parole pronunciate da madrelingua.', 'https://forvo.com/languages/ru/']
      ]
    },
    {
      id: 'french',
      name: ['French', 'Francese'],
      why: ['French classical culture, art and ideas, and the language to read them in.',
            'La cultura classica francese, l’arte e le idee, e la lingua per leggerle.'],
      path: [
        [['Sounds and liaison', 'Suoni e liaison'], 'Nasal vowels, silent endings and when they wake up.', 'Le vocali nasali, le finali mute e quando si risvegliano.'],
        [['Passé composé and imparfait', 'Passé composé e imparfait'], 'Telling a story in the past.', 'Raccontare una storia al passato.'],
        [['The subjunctive', 'Il congiuntivo'], 'Il faut que, bien que, avant que.', 'Il faut que, bien que, avant que.'],
        [['A film a week', 'Un film a settimana'], 'With French subtitles, not Italian or English ones.', 'Con i sottotitoli in francese, non in italiano o in inglese.'],
        [['A journal page in French', 'Una pagina di diario in francese'], 'A few lines each day, about anything at all.', 'Qualche riga al giorno, su qualsiasi cosa.'],
        ['Baudelaire, Les Fleurs du mal', 'A few poems a week, aloud.', 'Qualche poesia a settimana, ad alta voce.'],
        ['Flaubert, Madame Bovary', 'The first novel in the original.', 'Il primo romanzo in lingua originale.'],
        [['The Louvre, in French', 'Il Louvre, in francese'], 'An audio guide or museum visit in French only.', 'Un’audioguida o una visita al museo solo in francese.']
      ],
      shelf: [
        ['Book', 'Libro', 'Bescherelle: La conjugaison pour tous', 'Every verb, conjugated.', 'Tutti i verbi, coniugati.'],
        ['Book', 'Libro', 'Grevisse, Le Bon Usage', 'The great grammar, for settling arguments.', 'La grande grammatica, per risolvere le dispute.'],
        ['Online', 'Online', 'TV5Monde Apprendre', 'Free lessons built on real news and TV.', 'Lezioni gratuite costruite su notizie e TV vere.', 'https://apprendre.tv5monde.com/'],
        ['Online', 'Online', 'Le Robert', 'The dictionary, online.', 'Il dizionario, online.', 'https://dictionnaire.lerobert.com/']
      ]
    },
    {
      id: 'tocharian',
      name: ['Tocharian', 'Tocario'],
      why: ['The easternmost Indo-European language: Buddhist manuscripts from the Tarim Basin, in two dialects, A and B.',
            'La lingua indoeuropea più orientale: manoscritti buddhisti dal bacino del Tarim, in due varietà, A e B.'],
      path: [
        [['The big picture', 'Il quadro generale'], 'Who wrote it, where (Kucha, Turfan), when (roughly the 5th to 8th centuries) and why it surprised everyone.', 'Chi lo scriveva, dove (Kucha, Turfan), quando (circa tra il V e l’VIII secolo) e perché ha sorpreso tutti.'],
        [['Learn the Brāhmī script', 'Impara la scrittura brāhmī'], 'The northern Turkestan variety, with its extra “Fremdzeichen” signs.', 'La varietà del Turkestan settentrionale, con i segni aggiuntivi “Fremdzeichen”.'],
        [['Tocharian A and B', 'Tocario A e B'], 'Agnean (Turfan, Karashahr) and Kuchean. Most texts are in B.', 'L’agneo (Turfan, Karashahr) e il kucheo. La maggior parte dei testi è in B.'],
        [['Sound changes from Proto-Indo-European', 'I cambiamenti fonetici dal protoindoeuropeo'], 'The vowel shifts and palatalisations that make it look so strange.', 'Gli spostamenti vocalici e le palatalizzazioni che lo rendono così strano.'],
        [['Nouns', 'I nomi'], 'Primary and secondary cases, and the agglutinative “Gruppenflexion”.', 'Casi primari e secondari, e la “Gruppenflexion” agglutinante.'],
        [['Verbs', 'I verbi'], 'Present and subjunctive classes, the preterite, the causative.', 'Classi del presente e del congiuntivo, il preterito, il causativo.'],
        [['Read a short B text', 'Leggere un breve testo in B'], 'A monastery record or a caravan pass first, then a short verse.', 'Prima un registro di monastero o un lasciapassare da carovana, poi qualche verso.'],
        [['Read from the Puṇyavanta-jātaka (A)', 'Leggere dal Puṇyavanta-jātaka (A)'], 'A classic teaching text.', 'Un classico testo di insegnamento.'],
        [['Browse real manuscripts', 'Sfogliare i manoscritti veri'], 'Fragments with images and translations on CEToM.', 'Frammenti con immagini e traduzioni su CEToM.']
      ],
      shelf: [
        ['Online', 'Online', 'CEToM', 'The Comprehensive Edition of Tocharian Manuscripts: texts, images, glossary.', 'L’edizione completa dei manoscritti tocari: testi, immagini, glossario.', 'https://cetom.univie.ac.at/'],
        ['Online', 'Online', 'TITUS', 'Frankfurt’s Indo-European text archive, Tocharian included.', 'L’archivio di testi indoeuropei di Francoforte, tocario compreso.', 'https://titus.uni-frankfurt.de/'],
        ['Book', 'Libro', 'Krause & Thomas, Tocharisches Elementarbuch', 'The classic grammar and reader, in German.', 'La grammatica e antologia classica, in tedesco.'],
        ['Book', 'Libro', 'Pinault, Chrestomathie tokharienne', 'Grammar plus annotated texts, in French.', 'Grammatica e testi commentati, in francese.'],
        ['Book', 'Libro', 'Adams, A Dictionary of Tocharian B', 'The standard B dictionary, in English.', 'Il dizionario di riferimento del tocario B, in inglese.'],
        ['Book', 'Libro', 'Malzahn, The Tocharian Verbal System', 'For when the verbs get serious.', 'Per quando i verbi si fanno seri.']
      ]
    },
    {
      id: 'avestan',
      name: ['Avestan', 'Avestico'],
      why: ['The language of the Avesta, the Zoroastrian scriptures: ritual fire, the Gathas of Zarathustra, and a close cousin of Vedic Sanskrit.',
            'La lingua dell’Avesta, le scritture zoroastriane: il fuoco rituale, le Gāthā di Zarathuštra e un cugino stretto del sanscrito vedico.'],
      path: [
        [['The big picture', 'Il quadro generale'], 'Old Avestan (the Gathas) and Young Avestan, and how the texts survived.', 'L’antico avestico (le Gāthā) e l’avestico recente, e come i testi sono sopravvissuti.'],
        [['The Avestan script', 'La scrittura avestica'], 'Written right to left, created centuries later to record the recitation exactly.', 'Si scrive da destra a sinistra, creata secoli dopo per fissare esattamente la recitazione.'],
        [['Sounds', 'I suoni'], 'A rich vowel system and the sound changes from Indo-Iranian.', 'Un sistema vocalico ricchissimo e i cambiamenti fonetici dall’indoiranico.'],
        [['Avestan beside Vedic', 'L’avestico accanto al vedico'], 'Haoma and soma, asha and ṛta: the same words, a sound shift apart.', 'Haoma e soma, aša e ṛta: le stesse parole, a un cambiamento fonetico di distanza.'],
        [['Nouns and verbs', 'Nomi e verbi'], 'Eight cases, three numbers, and the verb system.', 'Otto casi, tre numeri e il sistema verbale.'],
        [['Read the Ahuna Vairya', 'Leggere l’Ahuna Vairya'], 'The most sacred prayer, word by word.', 'La preghiera più sacra, parola per parola.'],
        [['A stanza of the Gathas', 'Una strofa delle Gāthā'], 'Start with Yasna 28.', 'Cominciare dallo Yasna 28.'],
        [['A Yasht hymn', 'Un inno Yašt'], 'The hymns to the yazatas, in Young Avestan.', 'Gli inni agli yazata, in avestico recente.']
      ],
      shelf: [
        ['Book', 'Libro', 'Skjærvø, An Introduction to Old Avestan', 'A full course with texts and glossary.', 'Un corso completo con testi e glossario.'],
        ['Book', 'Libro', 'Beekes, A Grammar of Gatha-Avestan', 'Compact and clear.', 'Compatta e chiara.'],
        ['Book', 'Libro', 'Hoffmann & Forssman, Avestische Laut- und Flexionslehre', 'The standard reference, in German.', 'Il riferimento classico, in tedesco.'],
        ['Online', 'Online', 'Avesta: Zoroastrian Archives', 'Texts and translations.', 'Testi e traduzioni.', 'https://www.avesta.org/'],
        ['Online', 'Online', 'TITUS', 'The Avestan texts in Frankfurt’s archive.', 'I testi avestici nell’archivio di Francoforte.', 'https://titus.uni-frankfurt.de/']
      ]
    },
    {
      id: 'pie',
      name: ['Proto-Indo-European', 'Protoindoeuropeo'],
      why: ['The reconstructed ancestor of them all, from Tocharian to French, and the poetry and ritual that left traces in its daughters.',
            'L’antenato ricostruito di tutte, dal tocario al francese, e la poesia e i riti che hanno lasciato tracce nelle lingue figlie.'],
      path: [
        [['The comparative method', 'Il metodo comparativo'], 'How you rebuild a language nobody wrote down.', 'Come si ricostruisce una lingua che nessuno ha mai scritto.'],
        [['The family tree', 'L’albero genealogico'], 'The branches, from Anatolian and Tocharian to Indo-Iranian and Italic.', 'I rami, dall’anatolico e dal tocario all’indoiranico e all’italico.'],
        [['Grimm’s law and friends', 'La legge di Grimm e le altre'], 'The sound laws that link pater, father and padre.', 'Le leggi fonetiche che collegano pater, father e padre.'],
        [['Laryngeals', 'Le laringali'], 'Three lost sounds, predicted by Saussure and found in Hittite.', 'Tre suoni perduti, previsti da Saussure e ritrovati nell’ittita.'],
        [['Ablaut', 'L’apofonia'], 'e, o and zero: sing, sang, sung.', 'e, o e grado zero: sing, sang, sung.'],
        [['Nouns and verbs', 'Nomi e verbi'], 'Eight cases, thematic and athematic verbs.', 'Otto casi, verbi tematici e atematici.'],
        [['Poetic formulas', 'Le formule poetiche'], '“Imperishable fame”, kléos áphthiton and śrávas ákṣitam.', '“Fama imperitura”, kléos áphthiton e śrávas ákṣitam.'],
        [['Soma and haoma', 'Soma e haoma'], 'The sacred drink of the Indo-Iranians, and the goblet on the table.', 'La bevanda sacra degli indoiranici, e il calice sul tavolo.'],
        [['Schleicher’s fable', 'La favola di Schleicher'], 'The sheep and the horses, in each new reconstruction since 1868.', 'La pecora e i cavalli, in ogni nuova ricostruzione dal 1868.']
      ],
      shelf: [
        ['Book', 'Libro', 'Fortson, Indo-European Language and Culture', 'The best introduction, branch by branch.', 'La migliore introduzione, ramo per ramo.'],
        ['Book', 'Libro', 'Mallory & Adams, The Oxford Introduction to Proto-Indo-European', 'Words, culture and the world they describe.', 'Le parole, la cultura e il mondo che descrivono.'],
        ['Book', 'Libro', 'Watkins, How to Kill a Dragon', 'Indo-European poetics, myth and formula.', 'La poetica indoeuropea, il mito e le formule.'],
        ['Book', 'Libro', 'Clackson, Indo-European Linguistics', 'A clear look at what we know, and how.', 'Uno sguardo chiaro su ciò che sappiamo, e come.']
      ]
    }
  ];

  const T = {
    path: L('The path', 'Il percorso'), shelf: L('The shelf', 'Lo scaffale'), notes: L('My notes', 'I miei appunti'),
    notesPh: L('Words, questions, favourite lines…', 'Parole, domande, versi preferiti…'),
    saved: L('Saved on this device', 'Salvato su questo dispositivo'),
    addStep: L('Add a step', 'Aggiungi una tappa'), add: L('Add', 'Aggiungi'), remove: L('Remove', 'Togli'),
    removeTopic: L('Remove this topic', 'Togli questo argomento'),
    confirmTopic: n => L(`Remove “${n}” and its notes from this device?`, `Togliere “${n}” e i suoi appunti da questo dispositivo?`),
    done: L('done', 'fatte'), back: L('← Back to the study', '← Torna allo studio')
  };

  // Device-only storage (wrapped: private windows can refuse it)
  const KEY = 'fn-study-v1';
  let state = {};
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (_) {}
  state.done ||= {}; state.notes ||= {}; state.custom ||= []; state.extra ||= {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {} };

  const pick = v => (Array.isArray(v) ? L(v[0], v[1]) : v);
  const topics = () => TOPICS.concat(state.custom.map(c => ({ ...c, custom: true, path: [], shelf: [] })));
  const steps = t => t.path.map((s, i) => ({ key: `${t.id}:${i}`, title: pick(s[0]), note: L(s[1], s[2]) }))
    .concat((state.extra[t.id] || []).map(s => ({ key: `${t.id}:x${s.id}`, title: s.text, note: '', extra: s.id })));
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  const root = document.getElementById('fn-study');
  const mine = document.getElementById('fn-study-mine'); // topics Nicky adds, listed on the crystal's page
  if (!root) return;
  const twin = it ? '/hub/' : '/it/studio/';

  const count = (t, out) => {
    const s = steps(t), n = s.filter(x => state.done[x.key]).length;
    out.textContent = s.length ? `${n} / ${s.length} ${T.done}` : '';
  };

  const stepRow = (t, s, counter) => {
    const li = el('li');
    const label = el('label', 'fn-study-step');
    const box = el('input'); box.type = 'checkbox'; box.checked = !!state.done[s.key];
    box.id = 'st-' + s.key.replace(/[^a-z0-9-]/gi, '-');
    const text = el('span', 'fn-study-step-text');
    text.append(el('strong', null, s.title));
    if (s.note) text.append(el('small', null, s.note));
    label.append(box, text); li.append(label);
    li.classList.toggle('is-done', box.checked);
    box.addEventListener('change', () => {
      if (box.checked) state.done[s.key] = true; else delete state.done[s.key];
      li.classList.toggle('is-done', box.checked); save(); count(t, counter);
    });
    if (s.extra != null) {
      const x = el('button', 'fn-study-x', '×'); x.type = 'button'; x.setAttribute('aria-label', `${T.remove}: ${s.title}`);
      x.addEventListener('click', () => {
        state.extra[t.id] = (state.extra[t.id] || []).filter(e => e.id !== s.extra);
        delete state.done[s.key]; save(); li.remove(); count(t, counter);
      });
      li.append(x);
    }
    return li;
  };

  const section = t => {
    const sec = el('section', 'fn-study-topic fn-study-view'); sec.id = t.id; sec.hidden = true;
    const bar = el('div', 'fn-study-bar');
    const back = el('a', 'fn-study-back', T.back); back.href = '#';
    const lang = el('a', 'fn-study-lang', it ? 'EN' : 'IT'); lang.href = twin + '#' + t.id; lang.hreflang = it ? 'en' : 'it';
    bar.append(back, lang); sec.append(bar);
    const head = el('div', 'fn-study-head');
    const h2 = el('h2', null, pick(t.name));
    const counter = el('p', 'fn-study-count group-count');
    head.append(h2, counter); sec.append(head);
    const why = pick(t.why); if (why) sec.append(el('p', 'fn-study-why', why));

    const grid = el('div', 'fn-study-grid');
    const left = el('div'); left.append(el('p', 'fn-study-label', T.path));
    const list = el('ol', 'fn-study-path');
    steps(t).forEach(s => list.append(stepRow(t, s, counter)));
    const form = el('form', 'fn-study-add');
    const input = el('input'); input.type = 'text'; input.placeholder = T.addStep + '…'; input.setAttribute('aria-label', T.addStep);
    const go = el('button', 'fn-study-btn', T.add); go.type = 'submit';
    form.append(input, go);
    form.addEventListener('submit', e => {
      e.preventDefault(); const v = input.value.trim(); if (!v) return;
      const item = { id: Date.now().toString(36), text: v };
      (state.extra[t.id] ||= []).push(item); save();
      list.append(stepRow(t, { key: `${t.id}:x${item.id}`, title: v, note: '', extra: item.id }, counter));
      input.value = ''; count(t, counter); input.focus();
    });
    left.append(list, form);

    const right = el('div');
    if (t.shelf.length) {
      right.append(el('p', 'fn-study-label', T.shelf));
      const ul = el('ul', 'fn-study-shelf');
      t.shelf.forEach(r => {
        const li = el('li'); li.append(el('span', 'fn-study-kind', L(r[0], r[1])));
        if (r[5]) { const a = el('a', null, r[2] + ' ↗︎'); a.href = r[5]; a.target = '_blank'; a.rel = 'noopener noreferrer'; li.append(a); }
        else li.append(el('span', 'fn-study-title', r[2]));
        li.append(el('small', null, L(r[3], r[4]))); ul.append(li);
      });
      right.append(ul);
    }
    right.append(el('p', 'fn-study-label', T.notes));
    const notes = el('textarea'); notes.placeholder = T.notesPh; notes.setAttribute('aria-label', `${T.notes}: ${pick(t.name)}`);
    notes.value = state.notes[t.id] || '';
    const ok = el('p', 'fn-study-saved'); ok.setAttribute('aria-live', 'polite');
    let timer;
    notes.addEventListener('input', () => {
      state.notes[t.id] = notes.value; clearTimeout(timer);
      timer = setTimeout(() => { save(); ok.textContent = T.saved; }, 400);
    });
    right.append(notes, ok);
    if (t.custom) {
      const rm = el('button', 'fn-study-remove', T.removeTopic); rm.type = 'button';
      rm.addEventListener('click', () => {
        if (!confirm(T.confirmTopic(pick(t.name)))) return;
        state.custom = state.custom.filter(c => c.id !== t.id);
        delete state.notes[t.id]; delete state.extra[t.id];
        Object.keys(state.done).forEach(k => { if (k.startsWith(t.id + ':')) delete state.done[k]; });
        save(); sec.remove(); mine?.querySelector(`a[href="#${t.id}"]`)?.closest('li')?.remove(); location.hash = 'new';
      });
      right.append(rm);
    }
    grid.append(left, right); sec.append(grid);
    count(t, counter);
    return sec;
  };

  const pill = t => { const li = el('li'), a = el('a', null, pick(t.name)); a.href = '#' + t.id; li.append(a); return li; };
  topics().forEach(t => { if (t.custom && mine) mine.append(pill(t)); root.append(section(t)); });

  // One room at a time: the study (no hash) or a single topic page (#opera, #new…)
  const scene = document.getElementById('fn-scene'), newBox = document.getElementById('new');
  const show = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const view = id && document.getElementById(id);
    const isView = view && view.classList.contains('fn-study-view');
    document.querySelectorAll('.fn-study-view').forEach(v => { v.hidden = v !== view; });
    if (scene) scene.hidden = !!isView;
    document.body.classList.toggle('fn-study-open', !!isView);
    scrollTo(0, 0);
    // On a narrow (portrait) screen the painting is wider than the screen: start in the middle, swipe for the rest
    if (scene && !isView) requestAnimationFrame(() => { scene.scrollLeft = (scene.scrollWidth - scene.clientWidth) / 2; });
  };
  addEventListener('hashchange', show); show();

  // A new topic: a name and, optionally, one line on why
  const nf = document.getElementById('fn-study-new');
  if (nf) nf.addEventListener('submit', e => {
    e.preventDefault();
    const name = nf.elements.name.value.trim(), why = nf.elements.why.value.trim(); if (!name) return;
    const t = { id: 'c-' + Date.now().toString(36), name, why };
    state.custom.push(t); save();
    const full = { ...t, custom: true, path: [], shelf: [] };
    mine?.append(pill(full)); root.append(section(full));
    nf.reset(); location.hash = '#' + t.id;
  });
})();
