/* Frolicking Nicky: the study, Nicky's private learning hub (/hub/, English only: Nicky doesn't want an Italian copy).
   Reached only through the secret first letter of the footer tagline on every page; the pages are noindex.
   The landing page is Nicky's painting alone (full screen); each object links to a topic view (#opera, #new…).
   Topics live in TOPICS below (English and Italian side by side). Ticks, notes, vocabulary, extra steps and new topics are kept
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
        ['Introduction', 'Lesson 1 · The Silver Age, its movements and historical context.', 'Lesson 1 · The Silver Age, its movements and historical context.'],
        ['Symbolism', 'Lesson 2 · European roots, Russian Symbolists and the invisible world.', 'Lesson 2 · European roots, Russian Symbolists and the invisible world.'],
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
        ['Slides', 'Slide', 'Silver Age — lecture PowerPoints', 'The course presentation folder on Google Drive.', 'The course presentation folder on Google Drive.', 'https://drive.google.com/drive/folders/10sDBq52kFID5SfPzkNKeHnEyfLD7ZX0I'],
        ['Memoir', 'Memorie', 'Nadezhda Mandelstam, Hope Against Hope', 'The essential memoir of the end of the era.', 'Le memorie essenziali sulla fine di quell’epoca.'],
        ['Memoir', 'Memorie', 'Nina Berberova, The Italics Are Mine', 'The whole generation, seen from emigration.', 'Tutta una generazione, vista dall’emigrazione.'],
        ['Poems', 'Poesie', 'Akhmatova, Complete Poems (tr. Judith Hemschemeyer)', 'Thorough, and easy to read beside the Russian.', 'Completa, e facile da leggere accanto al russo.'],
        ['Online', 'Online', 'Russian Wikisource', 'The original texts, free.', 'I testi originali, gratis.', 'https://ru.wikisource.org/']
      ]
    },
    {
      id: 'russian',
      name: ['Russian', 'Russo'],
      why: ['B2 and climbing: my own notes and words, then the finer points (participles, prefixes, register) and real books.',
            'B2 e oltre: i miei appunti e le mie parole, poi le finezze (participi, prefissi, registro) e i libri veri.'],
      path: [ // The first three open Nicky's Notion notes (FN_RUSSIAN_LESSONS in russian-lessons.js), in order
        ['Wishing someone well', 'Хороших выходных! Хорошего дня!'],
        ['Describing a picture', 'На картине изображено…'],
        ['Дискурсивные слова: «ну» и «ведь»', 'Small words that carry a lot of feeling.'],
        ['Participles and verbal adverbs', 'Читающий, прочитанный, читая, прочитав: the written register.'],
        ['Prefixed verbs of motion, figuratively', 'Прийти в себя, выйти замуж, перейти на «ты».'],
        ['Aspect in the finer cases', 'Imperatives, negation, and “не надо было”.'],
        ['Word building', 'Prefixes and suffixes: на-, за-, раз-, -ость, -ство.'],
        ['A novel, unabridged', 'Bulgakov, Мастер и Маргарита, a chapter at a time.'],
        ['Podcasts and films without subtitles', 'Arzamas, Radio Svoboda, and Soviet classics.'],
        ['An essay, corrected', 'A page a week on any subject, checked by a teacher.']
      ],
      shelf: [
        ['Book', 'Libro', 'Terence Wade, A Comprehensive Russian Grammar', 'The reference to keep on the desk.', 'Il riferimento da tenere sulla scrivania.'],
        ['Book', 'Libro', 'Wade & Gilbert, Russian in Use', 'Exercises for upper-intermediate and advanced learners.', 'Esercizi per livello intermedio-avanzato e avanzato.'],
        ['Online', 'Online', 'Arzamas', 'Courses on Russian language, literature and history, in Russian.', 'Corsi di lingua, letteratura e storia russa, in russo.', 'https://arzamas.academy/'],
        ['Online', 'Online', 'Russian National Corpus', 'See how any word is really used.', 'Per vedere come si usa davvero una parola.', 'https://ruscorpora.ru/'],
        ['Online', 'Online', 'Forvo', 'Native speakers pronouncing words.', 'Parole pronunciate da madrelingua.', 'https://forvo.com/languages/ru/']
      ]
    },
    {
      id: 'french',
      name: ['French', 'Francese'],
      why: ['French classical culture, art and ideas, and the language to read them in.',
            'La cultura classica francese, l’arte e le idee, e la lingua per leggerle.'],
      path: [ // Nicky's Notion subjects, in order; each opens its page in FN_FRENCH_LESSONS (french-lessons.js)
        ['Present continuous', 'Être en train de + infinitif.'],
        ['Meaning ‘just did something’', 'Venir de + infinitif.'],
        ['Le futur proche', 'Aller + infinitif.'],
        ['The subjunctive', 'Il faut que, bien que, avant que.'],
        ['L’expression de l’hypothèse', 'Si + présent, imparfait or plus-que-parfait.'],
        ['Conditionnel présent', 'Future stem + imperfect endings.'],
        ['Conditionnel passé', 'Conditional of avoir or être + past participle.'],
        ['Pronouns (personal/possessive)', 'Every pronoun in one table.'],
        ['Relative pronouns', 'Qui, que, dont, où, lequel.'],
        ['Past lessons', 'Class notes, newest first.']
      ],
      shelf: [
        ['Book', 'Libro', 'Bescherelle: La conjugaison pour tous', 'Every verb, conjugated.', 'Tutti i verbi, coniugati.'],
        ['Book', 'Libro', 'Grevisse, Le Bon Usage', 'The great grammar, for settling arguments.', 'La grande grammatica, per risolvere le dispute.'],
        ['Online', 'Online', 'TV5Monde Apprendre', 'Free lessons built on real news and TV.', 'Lezioni gratuite costruite su notizie e TV vere.', 'https://apprendre.tv5monde.com/'],
        ['Online', 'Online', 'Le Robert', 'The dictionary, online.', 'Il dizionario, online.', 'https://dictionnaire.lerobert.com/'],
        ['Podcast', 'Podcast', 'Little Talk in Slow French', 'Everyday French, spoken slowly.', 'Francese di tutti i giorni, parlato lentamente.', 'https://www.spreaker.com/podcast/little-talk-in-slow-french--6084166']
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
  state.done ||= {}; state.notes ||= {}; state.custom ||= []; state.extra ||= {}; state.vocab ||= {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {} };

  const LESSONS = [
    { topic: 'silver-age', name: 'Silver Age poetry', lessons: window.FN_SILVER_AGE_LESSONS || [] },
    { topic: 'french', name: 'French', lessons: window.FN_FRENCH_LESSONS || [] },
    { topic: 'russian', name: 'Russian', lessons: window.FN_RUSSIAN_LESSONS || [] }
  ];
  const lessonsOf = id => LESSONS.find(x => x.topic === id)?.lessons || [];
  const pick = v => (Array.isArray(v) ? L(v[0], v[1]) : v);
  const topics = () => TOPICS.concat(state.custom.map(c => ({ ...c, custom: true, path: [], shelf: [] })));
  const steps = t => t.path.map((s, i) => ({ key: `${t.id}:${i}`, title: pick(s[0]), note: s[2] ? L(s[1], s[2]) : s[1], href: lessonsOf(t.id)[i] && '#' + lessonsOf(t.id)[i].id }))
    .concat(VOCAB[t.id] ? [{ key: `${t.id}:vocab`, title: 'Vocabulary', note: VOCAB[t.id][0] + ' on one side, English on the other.', href: `#${t.id}-vocabulary` }] : [])
    .concat((state.extra[t.id] || []).map(s => ({ key: `${t.id}:x${s.id}`, title: s.text, note: '', extra: s.id })));
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  const root = document.getElementById('fn-study');
  const mine = document.getElementById('fn-study-mine'); // topics Nicky adds, listed on the crystal's page
  if (!root) return;

  const count = (t, out) => {
    const s = steps(t), n = s.filter(x => state.done[x.key]).length;
    out.textContent = s.length ? `${n} / ${s.length} ${T.done}` : '';
  };

  const stepRow = (t, s, counter) => {
    const li = el('li');
    const label = el(s.href ? 'div' : 'label', 'fn-study-step');
    const box = el('input'); box.type = 'checkbox'; box.checked = !!state.done[s.key];
    box.id = 'st-' + s.key.replace(/[^a-z0-9-]/gi, '-');
    const text = el('span', 'fn-study-step-text');
    const title = el('strong', null, s.title);
    if (s.href) {
      // Keep reading navigation separate from the completion checkbox.
      const link = el('a', 'fn-study-lesson-link'); link.href = s.href;
      link.append(title); text.append(link);
      box.setAttribute('aria-label', 'Mark ' + s.title + ' as complete');
    } else text.append(title);
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

  // Vocabulary for the language pages: the word on one side, English on the other. Veil either side to test
  // yourself both ways; a tap on a veiled word lifts the veil. Words live in state.vocab (so backups include them).
  const VOCAB = { russian: ['Russian', 'ru'], french: ['French', 'fr'] };
  const SEED = { french: window.FN_FRENCH_VOCAB || [], russian: window.FN_RUSSIAN_VOCAB || [] };
  // Imported words join the list once; a word Nicky removes or edits afterwards stays that way
  Object.entries(SEED).forEach(([id, seed]) => {
    const list = (state.vocab[id] ||= []), done = (state.seeded ||= {})[id] || [];
    seed.forEach(w => { if (!done.includes(w.id) && !list.some(v => v.id === w.id)) list.push({ ...w }); });
    state.seeded[id] = seed.map(w => w.id); save();
  });
  const vocab = (id, [lang, code]) => {
    const box = el('div', 'fn-vocab'), words = (state.vocab[id] ||= []);
    const head = el('div', 'fn-vocab-head'), label = el('p', 'fn-study-label', 'Test yourself');
    const modes = el('div', 'fn-vocab-modes'); modes.setAttribute('role', 'group'); modes.setAttribute('aria-label', 'Test yourself');
    let mode = 'both', order = null;
    const btns = [['both', 'Show both'], ['word', 'Hide ' + lang], ['en', 'Hide English']].map(([m, txt]) => {
      const b = el('button', 'fn-vocab-mode', txt); b.type = 'button'; b.dataset.mode = m;
      b.addEventListener('click', () => { mode = m; draw(); }); modes.append(b); return b;
    });
    const shuffle = el('button', 'fn-vocab-mode', 'Shuffle'); shuffle.type = 'button';
    shuffle.addEventListener('click', () => { order = words.map(w => w.id).sort(() => Math.random() - .5); draw(); });
    modes.append(shuffle);
    head.append(label, modes);
    const cols = el('div', 'fn-vocab-row fn-vocab-cols'); cols.append(el('span', null, lang), el('span', null, 'English'));
    const list = el('ul', 'fn-vocab-list'), tally = el('p', 'fn-study-saved');
    const cell = (w, side, hide) => {
      const text = side === 'word' ? w.word : w.en;
      if (!hide) {
        // Shown words can be corrected in place
        const c = el('span', 'fn-vocab-cell', text); c.contentEditable = 'true'; c.spellcheck = false;
        if (side === 'word') c.lang = code;
        c.setAttribute('aria-label', (side === 'word' ? lang : 'English') + ' word');
        c.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); c.blur(); } });
        c.addEventListener('blur', () => { const v = c.textContent.trim(); if (v && v !== text) { w[side] = v; save(); } else c.textContent = text; });
        return c;
      }
      const c = el('button', 'fn-vocab-cell is-veiled', text); c.type = 'button';
      if (side === 'word') c.lang = code;
      c.setAttribute('aria-label', 'Reveal'); c.setAttribute('aria-pressed', 'false');
      c.addEventListener('click', () => { const on = c.classList.toggle('is-veiled'); c.setAttribute('aria-pressed', String(!on)); c.setAttribute('aria-label', on ? 'Reveal' : text); });
      return c;
    };
    const draw = () => {
      btns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
      list.replaceChildren();
      const shown = order ? order.map(i => words.find(w => w.id === i)).filter(Boolean).concat(words.filter(w => !order.includes(w.id))) : words;
      shown.forEach(w => {
        const li = el('li', 'fn-vocab-row');
        const x = el('button', 'fn-study-x', '×'); x.type = 'button'; x.setAttribute('aria-label', `${T.remove}: ${w.word}`);
        x.addEventListener('click', () => { words.splice(words.indexOf(w), 1); save(); li.remove(); cols.hidden = !words.length; tell(); });
        li.append(cell(w, 'word', mode === 'word'), cell(w, 'en', mode === 'en'), x); list.append(li);
      });
      cols.hidden = !words.length; tell();
    };
    const tell = () => { tally.textContent = words.length ? `${words.length} ${words.length === 1 ? 'word' : 'words'}` : 'No words yet. Add the first one below.'; };
    const form = el('form', 'fn-study-add fn-vocab-add');
    const a = el('input'); a.type = 'text'; a.placeholder = lang + '…'; a.lang = code; a.setAttribute('aria-label', lang + ' word');
    const b = el('input'); b.type = 'text'; b.placeholder = 'English…'; b.setAttribute('aria-label', 'English meaning');
    const go = el('button', 'fn-study-btn', T.add); go.type = 'submit';
    form.append(a, b, go);
    form.addEventListener('submit', e => {
      e.preventDefault(); const word = a.value.trim(), en = b.value.trim();
      if (!word || !en) { (word ? b : a).focus(); return; }
      words.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), word, en }); save(); draw();
      a.value = b.value = ''; a.focus();
    });
    // Quiz: up to ten words; Nicky types the translation and checks it. Words missed before come up more often.
    // An answer counts if it matches the whole answer or any one of its alternatives (split on / , ;), ignoring
    // case, accents, stress marks, punctuation, anything in brackets and a leading "to".
    const plain = t => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\(.*?\)/g, ' ')
      .replace(/[.,!?…;:«»“”"'’‘—–-]/g, ' ').replace(/^\s*to\s+/, '').replace(/\s+/g, ' ').trim();
    const matches = (typed, answer) => !!plain(typed) && [answer, ...answer.split(/[\/,;]/)].some(a => plain(a) === plain(typed));
    const misses = ((state.quiz ||= {})[id] ||= {});
    const quiz = el('div', 'fn-quiz'); quiz.hidden = true;
    const quizBtn = el('button', 'fn-vocab-mode', 'Quiz me'); quizBtn.type = 'button'; modes.append(quizBtn);
    const listView = [cols, list, tally, form, shuffle, ...btns];
    const close = () => { quiz.hidden = true; listView.forEach(e => { e.hidden = false; }); quizBtn.setAttribute('aria-pressed', 'false'); draw(); };
    const button = (cls, text, on) => { const b = el('button', cls, text); b.type = 'button'; b.addEventListener('click', on); return b; };
    const row = (...items) => { const r = el('div', 'fn-vocab-modes'); r.append(...items); return r; };
    const start = () => {
      if (!quiz.hidden) return close();
      if (words.length < 4) { tally.textContent = 'Add at least four words to take a quiz.'; return; }
      listView.forEach(e => { e.hidden = true; }); quiz.hidden = false; quizBtn.setAttribute('aria-pressed', 'true');
      quiz.replaceChildren(el('p', 'fn-quiz-progress', 'Which way?'), row(
        button('fn-vocab-mode', lang + ' → English', () => run('word')),
        button('fn-vocab-mode', 'English → ' + lang, () => run('en')),
        button('fn-vocab-mode', 'Both, mixed', () => run('mix'))));
    };
    quizBtn.addEventListener('click', start);
    const run = dir => {
      // Weighted draw without repeats: each miss makes a word three times as likely to come back
      const round = words.map(w => [Math.random() ** (1 / (1 + 2 * (misses[w.id] || 0))), w]).sort((x, y) => y[0] - x[0]).slice(0, 10).map(x => x[1]);
      let i = 0, score = 0; const missed = [];
      const ask = () => {
        if (i === round.length) return finish();
        const w = round[i], from = dir === 'mix' ? (Math.random() < .5 ? 'word' : 'en') : dir, to = from === 'word' ? 'en' : 'word';
        const q = el('p', 'fn-quiz-q', w[from]); if (from === 'word') q.lang = code;
        const form = el('form', 'fn-study-add fn-quiz-answer'), input = el('input');
        input.type = 'text'; input.autocomplete = 'off'; input.spellcheck = false; input.setAttribute('autocapitalize', 'off');
        input.placeholder = (to === 'word' ? lang : 'English') + '…'; input.setAttribute('aria-label', 'Your translation');
        if (to === 'word') input.lang = code;
        const check = el('button', 'fn-study-btn', 'Check'); check.type = 'submit';
        form.append(input, check);
        const result = el('div', 'fn-quiz-result'); result.setAttribute('aria-live', 'polite');
        const next = () => { i++; ask(); };
        const tally = right => {
          if (right) { score++; if (misses[w.id] > 1) misses[w.id]--; else delete misses[w.id]; }
          else { misses[w.id] = (misses[w.id] || 0) + 1; missed.push(w); }
          save();
        };
        form.addEventListener('submit', e => {
          e.preventDefault(); if (input.disabled) return;
          const right = matches(input.value, w[to]);
          input.disabled = check.disabled = true; tally(right);
          const answer = el('p', 'fn-quiz-solution', w[to]); if (to === 'word') answer.lang = code;
          result.replaceChildren(el('p', 'fn-quiz-verdict', right ? 'Right.' : input.value.trim() ? 'Not quite. The answer:' : 'The answer:'), answer);
          const go = button('fn-study-btn', i + 1 === round.length ? 'See my score' : 'Next', next);
          const buttons = [go];
          // Typed answers can be right in other words: one tap counts it
          if (!right) buttons.push(button('fn-vocab-mode', 'I was right', () => {
            missed.pop(); if (misses[w.id] > 1) misses[w.id]--; else delete misses[w.id]; score++; save(); next();
          }));
          result.append(row(...buttons)); go.focus();
        });
        quiz.replaceChildren(el('p', 'fn-quiz-progress', `${i + 1} of ${round.length}`), q, form, result);
        input.focus();
      };
      const finish = () => {
        quiz.replaceChildren(el('p', 'fn-quiz-q', `${score} / ${round.length}`),
          el('p', 'fn-quiz-progress', missed.length ? 'To look at again:' : 'Every one right.'));
        if (missed.length) {
          const ul = el('ul', 'fn-quiz-missed');
          missed.forEach(w => { const li = el('li'), a = el('span', null, w.word); a.lang = code; li.append(a, el('span', null, w.en)); ul.append(li); });
          quiz.append(ul);
        }
        quiz.append(row(button('fn-vocab-mode', 'Another round', () => run(dir)), button('fn-vocab-mode', 'Back to the list', close)));
      };
      ask();
    };
    box.append(head, quiz, cols, list, tally, form); draw();
    return box;
  };

  const section = t => {
    const sec = el('section', 'fn-study-topic fn-study-view'); sec.id = t.id; sec.hidden = true;
    const bar = el('div', 'fn-study-bar');
    const back = el('a', 'fn-study-back', T.back); back.href = '#';
    bar.append(back); sec.append(bar);
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

  // Each language's vocabulary is its own page on the path, like a lesson (but in the dark study colours)
  Object.entries(VOCAB).forEach(([id, info]) => {
    const t = TOPICS.find(x => x.id === id), sec = el('section', 'fn-study-topic fn-study-view fn-vocab-page'); sec.id = id + '-vocabulary'; sec.hidden = true;
    const bar = el('div', 'fn-study-bar'), back = el('a', 'fn-study-back', '← ' + pick(t.name)); back.href = '#' + id;
    bar.append(back); sec.append(bar, el('h2', null, 'Vocabulary'), el('p', 'fn-study-why', pick(t.name) + ' on one side, English on the other. Hide either side to test yourself.'), vocab(id, info));
    root.append(sec);
  });

  // Readable lesson views use the same hash navigation as the study topics.
  // Silver Age poetry and French (imported from Nicky's notes) share one reading layout.
  LESSONS.forEach(({ topic, name, lessons }) => lessons.forEach((lesson, index) => {
    const sec = el('article', 'fn-study-view fn-lesson'); sec.id = lesson.id; sec.hidden = true;
    const back = el('a', 'fn-study-back', '← ' + name); back.href = '#' + topic;
    const bar = el('nav', 'fn-study-bar'); bar.setAttribute('aria-label', 'Lesson navigation'); bar.append(back);
    const title = el('h2', null, lesson.title); title.id = lesson.id + '-title';
    sec.setAttribute('aria-labelledby', title.id);
    sec.append(bar, el('p', 'fn-lesson-number', lesson.kicker || 'Lesson ' + lesson.number + ' · ' + name), title);
    const notes = el('div', 'fn-lesson-notes'); let list;
    lesson.blocks.forEach((block, blockIndex) => {
      if (block.type === 'heading') { list = null; const heading = el('h3', null, block.text); heading.dataset.noteBlock = blockIndex; notes.append(heading); }
      else if (block.type === 'table') {
        list = null; const wrap = el('div', 'fn-lesson-table'), table = el('table'), head = el('tr');
        block.head.forEach(c => head.append(el('th', null, c))); table.append(head);
        block.rows.forEach(r => { const tr = el('tr'); r.forEach(c => tr.append(el('td', null, c))); table.append(tr); });
        wrap.append(table); notes.append(wrap);
      } else if (block.type === 'link') {
        list = null; const p = el('p', 'fn-lesson-link'), a = el('a', null, block.text + ' ↗\uFE0E');
        a.href = block.href; a.target = '_blank'; a.rel = 'noopener noreferrer'; p.append(a); notes.append(p);
      } else {
        if (!list) { list = el('ul'); notes.append(list); }
        const paragraph = el('li', null, block.text); paragraph.dataset.noteBlock = blockIndex; list.append(paragraph);
      }
    });
    const workspace = el('div', 'fn-lesson-workspace');
    const margin = el('aside', 'fn-lesson-margin'); margin.setAttribute('aria-label', 'Your margin notes');
    workspace.append(notes, margin); sec.append(workspace);
    window.fnAnnotateLesson?.(lesson, notes, margin, sec);
    const footer = el('nav', 'fn-lesson-footer'); footer.setAttribute('aria-label', 'Other lessons');
    const prev = lessons[index - 1], next = lessons[index + 1];
    if (prev) { const link = el('a', 'fn-study-back', '← Previous: ' + prev.title); link.href = '#' + prev.id; footer.append(link); }
    if (next) { const link = el('a', 'fn-study-back', 'Next: ' + next.title + ' →'); link.href = '#' + next.id; footer.append(link); }
    sec.append(footer); root.append(sec);
  }));

  // One room at a time: the study (no hash) or a single topic page (#opera, #new…)
  const scene = document.getElementById('fn-scene'), newBox = document.getElementById('new');
  const show = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const view = id && document.getElementById(id);
    const isView = view && view.classList.contains('fn-study-view');
    document.querySelectorAll('.fn-study-view').forEach(v => { v.hidden = v !== view; });
    if (scene) scene.hidden = !!isView;
    document.body.classList.toggle('fn-study-open', !!isView);
    document.body.classList.toggle('fn-lesson-open', !!isView && view.classList.contains('fn-lesson'));
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
