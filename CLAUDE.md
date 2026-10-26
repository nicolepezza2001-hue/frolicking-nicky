# Frolicking Nicky

Static travel journal; `dist/` is the website. See README.md for structure, the
Italian copies and the best-time-to-visit data.

## Animation preferences (Nicky's house rules)

- **Footsteps, not paper planes.** When motion should suggest travel or moving
  from place to place, use a trail of footprints that appear one after another
  and fade away behind the walker, like the Marauder's Map footsteps in Harry
  Potter. Don't use paper planes, flying planes or "flying away" motifs.
  The reusable pieces are in `dist/assets/motion.js`: the `print()` footprint
  helper, the hero footsteps, and the **door walk** (last block of `motion.js`):
  every time a page opens (and when coming back to it), footprints appear at a
  random spot and walk to a random button or button-like link in view (Browse by
  country, My travels, Save for offline, the menu button…). As they arrive a
  little Art Nouveau arched door appears beside the button in a free spot, swings
  open, the last steps go in, then the door closes and fades away. It replaced the
  old trail beside the "Pages from my travel journal" / "My travels" headings
  (that heading has no icon now). Prints never stand upright.
  Only one trail at a time: the home page's own footsteps step aside while the
  door walk runs, and the dotted travel line behind the trip cards was removed
  (Nicky found two trails weird); don't add one back.
- Hero photos are taped down at the top corners with beige masking tape and
  simply appear, then stay still: no Polaroid develop or fade-in, no
  fluttering, floating or hovering up and down (Nicky didn't like those).
- Only the main photo turns over (home page, and the About portrait); hero photos on
  destination pages stay still (Nicky's call). Turning it over (hover on desktop, a tap on phones) shows a vintage "Greetings from"
  postcard back (Nicky picked it from four designs): antique white with a fine outline,
  "GREETINGS FROM" small, the country in big cherry italic letters, a thin rule, then
  "41 countries and counting. / Wish you were here." and "Nicky x" in handwriting. No stamp. The country is
  **where Nicky is right now**: the `NOW` setting in the postcard block of `motion.js`
  (`stamp`, `en`, `it`; `stamp` must be a name in `order`/`F`). When she says she's moved,
  change `NOW` (and fix the Italian preposition: dal/dalla/dall'/dai/dagli). Nicky found the
  old 41-stamp back and the round "a travel journal" badge too busy; don't bring either back.
  When she visits a new country, add it to `order` (with a flag in `F`) and update the "41"
  in both languages.
- Heading icons are one fixed size (60px since Oct 2026; Nicky found 34px too small) with a clear gap after the words,
  whatever the heading size (set in `refine.css`). They are fine-line, Art Nouveau-inspired illustrations (thin ink
  lines, whiplash curves) drawn on a 48×48 grid in the icon block of `motion.js`.
  **No arched frame around them** (Nicky thought it made them look like
  gravestones), and each has a playful animated extra: a Disney-style arc of
  sparkles sweeping over the castles, a hot-air balloon by the pyramid, a
  bookworm peeking out of the books, a butterfly round the flower, a rubber duck
  in the hot springs, a jumping fish by the boat, a shooting star by the moon,
  fireflies round the lantern, falling petals and confetti, hearts popping out of
  the pin, cup and heart, and so on (`star()` / `wee()` helpers, `fn-i-shoot` and
  friends in `motion.css`). New icons should match: no frame, and something fun.
  Little scenes Nicky asked for: wine is a bottle pouring into a glass until it
  overflows; Biblioteca is a quill writing across an open book and right off the
  page; Juárez, Roma & Condesa is a taco flying into a happy mouth and vanishing.
  Also: a piggy bank swallowing a coin (Rough budget), bats leaving the Phong Nha
  cave, a ringing bell (Centro Histórico), a blooming cactus with a hummingbird
  (El Charco), papel picado (South of the center), a winking portrait (More museum
  stops), a whisk (Gerstner), a trotting dog (Parque México), a Día de Muertos skeleton
  that falls apart into a bag of bones and pulls itself back together (Nicky's idea),
  a mummy sitting up in its box (Guanajuato day plan), a bus (Getting there & back),
  a spinning signpost (Choose one day trip), Santo Domingo with ringing bells, a
  chapulín hopping out of its basket (Markets & Jalatlaco), a swimmer bobbing at
  Hierve el Agua and a loom weaving a zigzag rug (Tlacolula & Teotitlán).
  Guanajuato and Oaxaca stops have hand-picked icons (`STOP` map in `motion.js`). Day-by-day and
  restaurant subheadings now get icons too: Nicky wants as many icons as possible.
  Any heading without its own rule gets one by keyword (`GUESS` in `motion.js`, a map
  pin if nothing fits); only the small-caps labels and headings inside destination
  cards stay plain. Every stop title on every itinerary gets a 36px icon the same way.
  Icons are always cherry. Only on cherry-filled cards (the Saturday day trips, the home page note) do they take the
  heading's cream colour so they don't vanish wine-on-wine.
  The "If we have time" / "Se abbiamo tempo" heading has an hourglass (Nicky's
  idea) with turned posts and curled plates: the sand runs out, a little cat pops
  up, paws it over, and it starts again (`hourglass` icon, `fn-i-turn`).
- All motion lives in `dist/assets/motion.css` / `motion.js` and must switch
  off for visitors with `prefers-reduced-motion: reduce`.
- When you change a shared CSS/JS file, bump its `?v=` number in every page
  that links it.
- Every English change needs the same change in its Italian copy under `/it/`.

## Where things live

- **Where I’ve been map** (home and My travels, EN + IT): `dist/assets/world-map.svg` and
  `world-map.it.svg`, generated from Natural Earth data. Under it, a "See all 41 countries" /
  "Vedi tutti i 41 paesi" drop-down lists every country by continent (written into the four pages;
  regenerate with the country table when she adds one; countries with an itinerary are links). Inked countries carry
  `data-x`/`data-y` where the footsteps stop; the walker is in `motion.js`.
- **Rough budget and handwritten margin notes** (itinerary pages):
  `dist/assets/journal.js`. Notes attach to a stop by its checkbox id. The
  notes are practical asides written in Nicky's voice; she may replace them
  with her own.
- **Share previews**: every page has Open Graph/Twitter tags; images are
  `dist/assets/share-*.jpg` (1200×630).
- **Photos**: keep JPEGs at most 1400px on the long side, quality ~76, with
  metadata stripped (this also removes GPS). Lay new photos out the way the
  other itinerary pages do (tilted photos beside the card they belong to, at
  most two per card, alternating sides, above the card on phones); never invent
  a new photo layout. Where Nicky has no photos of her own for a card or day,
  fill in with freely licensed stock photos (e.g. Wikimedia Commons) and credit
  the photographer and licence in a small caption.

## One itinerary look

The overall finish is "lighter journal" (Nicky picked it over warm-paper and
editorial looks): `dist/assets/refine.css`, linked last on every page, sets one
corner size, one soft shadow (no hard black offset shadows), hairline borders,
semi-bold rather than bold type, small cherry map links (just "Map"/"Mappa", no arrow; any other ↗ must be followed by U+FE0E so iPhones show a plain arrow, not an emoji) and cherry (not blue)
handwritten notes. Restyle the site there, not page by page, and link it last on
any new page.

**Palette (since Oct 2026):** antique white paper `#FDEBD8`, black ink `#030301`, cherry rose
accent `#B30545` (it replaced mint `#E4F5E0` and wine `#86324A`). Cards are outlined only: a
fine line, no fill, no shadow, and no white anywhere (Nicky's choice). The palette block at the end of
`refine.css` sets it; colours also live as literal hex in the shared CSS/JS, the SVGs and the icon PNGs.

All itinerary pages share the journal look of Vietnam / Japan / Bratislava:
paper background, Playfair titles, cherry kicker labels, a cherry-framed hero photo
with tape, pill jump links and soft rounded cards. Vienna and the Mexico pages
keep their own markup but are restyled by the "One itinerary look" block in
`shared.css` (scoped to `body.fn-vienna` / `body.fn-mexico`). New itineraries
should copy the Vietnam/Japan page structure, except Mexico trips, which copy the Mexico City
format (grouped outings, no dates or day numbers in headings; Nicky dislikes dated day plans).

## Offline

`dist/sw.js` (service worker) keeps a copy of every page opened, network-first
for pages so updates show straight away. Itinerary pages have a "Save for
offline" button (in `journal.js`) that stores the page, its scripts and every
photo in the `fn-saved` cache. `manifest.webmanifest` lets visitors add the site
to their home screen. If you rename a page or asset, nothing extra is needed:
pages and versioned assets refresh by themselves.

## Checks before publishing

Every push to `main` (and every pull request) runs `tools/check-site.mjs`
(links, English/Italian twins, script syntax, photo sizes, matching `?v=`
versions) and `tools/smoke.mjs` (opens every page as an iPhone and a desktop
browser; fails on script errors or sideways scrolling). The site only publishes
if both pass. Run them locally before pushing: `node tools/check-site.mjs` and
`cd tools && npm ci && node smoke.mjs`.

## Phones

Check every change on a phone-sized screen too (Nicky mostly looks on her
iPhone). On phones the header links sit behind a menu button. Nothing turns
over by itself (Nicky tried auto-turning and went back): destination cards
turn on click or tap on every device, the hero postcard on tap on phones and
hover on desktop, with no Turn over or Quick look buttons on phones (a dog-eared corner on each card photo, showing the wine back, hints that cards turn). Clicking
anywhere on a turned card opens its itinerary (no Open the itinerary button);
the map fits the screen with number tiles and trip links, and can be pinched,
dragged and zoomed with + / − (`zoomable()` in `motion.js`); when zoomed, pins, names, footprints
and tiny-country dots are counter-scaled and borders use non-scaling strokes, so only the countries grow. Nicky didn't want
a separate Europe close-up, the map legend or the trip buttons under the map on phones. On touch screens the turned-away side is hidden with `visibility` because iPhone Safari can show it mirrored.

## Working with Nicky

- Make every finished change live without asking: open a pull request into
  `main` and merge it straight away (Nicky asked not to be asked again).
  Merging to `main` publishes the site via GitHub Pages.
- After every change, send Nicky the links: the pull request, the branch and
  the website (https://frolickingnicky.com/).

## The study (Nicky's private learning hub)

- `/hub/` (`noindex`), reached only through the hidden link on the first letter of the footer tagline on every
  page ("A little planning…", and the "U" of "Un po’ di programmi…" on Italian pages). Never link it anywhere else.
  **English only:** Nicky doesn't want an Italian copy of the study, so the EN/IT twin rule doesn't apply here
  (`check-site.mjs` skips twins for `noindex` pages).
- The landing page is **only Nicky's painting** (`assets/study-room.jpg`, kept at its full 1536×1024 because it
  fills the screen; the 1400px photo rule doesn't apply to it), filling the whole screen: no header,
  no footer, no title, no labels (Nicky's call). It doesn't load `motion.js`, `shared.css` or `refine.css`.
  On portrait phones the painting fills the height and swipes sideways, opening in the middle.
- Each object is a traced polygon (painting coordinates 1536×1024) linking to a topic view: lute = Opera,
  pink branches = Silver Age poetry, three books = Quotes, golden icon triptych (centre, by the vase) = Russian, marble bust = French, golden horse = Hittite, alcove figure at the top = Tocharian,
  smoking vessel = Avestan, green goblet = Proto-Indo-European, big open book at the bottom right = Linguistics (Nicky's pick; ten study-notes
  pages she agreed, `assets/linguistics-lessons.js`, each with a quiz), quartz crystal = "What next?" (add a topic;
  added topics are listed on that page). Hover gives the object a faint candle glow and writes its subject
  in Arnold Böcklin (yellow `#f3d995`); on touch screens every object breathes a faint glow.
- **Quotes** (`#quotes`, the three books; `assets/quotes.js`): Nicky's books, by genre and then A to Z (leading articles
  ignored); each opens its own notes page (`#quote-…`, rendered by `study.js` like the lessons, so highlights, margin notes and
  Edit lesson work). Her quotes stay word for word. `assets/quote-books.js` is **built**, never edited by hand:
  `.github/workflows/sync-quotes.yml` runs `tools/sync-quotes.mjs` every morning, which copies her Notion page "Quotes"
  (repository secret `NOTION_TOKEN`) and the Kindle highlights she has made public on Goodreads (profile `197324729-nicole-p`; each book's notes page is
  found on her profile or notes list, or listed in `goodreadsNotes`; highlights already in Notion are skipped) into `tools/quotes.json`, sorts them into
  books with `tools/quote-books.json` (book, author and genre per quote; her source lines in `labels` are left off the page),
  bumps the shelf's `?v=` and redeploys. Nicky's calls: books marked `hidden` in `quote-books.json` stay off the page (Alessandra, Elena, Men said), and every book with a single quote is gathered, signed, on one **Miscellaneous** page with her
  sayings and unnamed lines. New quotes find their book by their bold source line; unknown books land under
  "Newly added" until they get a genre in `quote-books.json`. A source that can't be reached keeps its last copy.
- Topic pages use the study palette Nicky loves: deep purple `#2b1e38` / `#150e1d` and candle-yellow `#f3d995`,
  with cream `#efe0bf` text, all set in Cormorant Garamond, notes on yellow-ruled lines (`assets/study.css`).
  Keep it elegant: no emoji, no tooltips, no outlines; only the glow and the Arnold Böcklin word on hover.
  The pointer everywhere in the study is Nicky's golden quill (`quill-cursor-48.png` / `-96.png`, cut from her picture;
  hotspot on the nib, set in `study.css`).
- Topic content is in `TOPICS` in `assets/study.js` (old Italian strings sit beside the English; only English
  shows). Ticks, notes, vocabulary, extra steps and new topics live in the browser only (`fn-study-v1`).
- Paths work like Silver Age poetry: a step with a page links to it (`lessonsOf()` maps path steps to lessons by index).
- French path = Nicky's Notion subjects (her Notion page "French"; `assets/french-lessons.js`, wording kept exactly):
  one page per grammar subject (present continuous … relative pronouns), then "Past lessons" (her class notes by
  date, newest first), each read like the Silver Age lessons with highlights and margin notes. Nicky rejected a
  separate "Class notes" list beside the path: notes are reached by clicking through the path.
- Russian and French paths end with **Vocabulary**, its own page (`#french-vocabulary`, `VOCAB` in `study.js`): the
  word on the left, English on the right. "Hide Russian/French" or "Hide English" blurs that column to test both ways
  (a tap reveals one word), Shuffle mixes the order, and shown words can be corrected in place. Words are saved in
  `fn-study-v1` under `vocab`. "Quiz me" runs up to ten words (either direction or mixed): she types the translation, Check shows the answer (lenient match, plus an "I was right" button); misses
  are counted in `fn-study-v1` under `quiz` and make a word come back more often. `FN_FRENCH_VOCAB` (her Notion "IMPORTANT" table) seeds the French list once
  (`seeded` in `fn-study-v1`), so words she removes or edits stay that way.
- Russian is pitched at **B2/C1** (French at B1). Its path opens with her Notion notes
  (page "Russian"; `assets/russian-lessons.js`, wording kept exactly: wishes, describing a picture, «ну» и «ведь»),
  then study notes Claude wrote for her (kicker "Study notes · Russian": participles, verbal adverbs, figurative motion
  verbs, aspect, word building, numerals, register), then Vocabulary, seeded once from her Notion word list
  (`FN_RUSSIAN_VOCAB`). French likewise has "Study notes · French" pages between her Notion subjects and Past lessons.
  Every path step opens a page (Nicky had the placeholder steps without notes removed). Agree new topics with her first.
- Nicky's own lessons (`assets/lesson-editor.js`) take pictures: paste, drop or "Add image". Each is shrunk to a 1200px
  JPEG and kept in the lesson's `images`; the notes hold an `[image:id]` line where it goes (delete the line to remove it).
- Every built-in lesson page has **Edit lesson**: it opens the page as text in the same editor (`fnLessonText` in
  `study.js`: # heading, - note, | table rows, [text](url), ![alt](src), [image:id]); the edit is saved on her device
  (`overrides` in `fn-study-lessons-v1`) and shown instead of the original until she presses Restore original.
- Highlights follow their words, not their position (`study-annotations.js`): each range keeps its `text` plus a little
  `prefix`/`suffix`, and on every render it is found again in the current text (best context match, then nearest), so
  editing a lesson never shifts them. Words that were deleted keep their highlight saved but hidden. Older highlights
  (position only) are recovered from their quote, looking in the original lesson (`originalBlocks`) when it was edited.
- Every path step opens a page (Nicky: "add notes for all other topics"). Silver Age: her two lessons, then study
  notes (`silver-age-lessons.js`); Tocharian (`tocharian-lessons.js`) and Avestan (`avestan-lessons.js`) are study notes,
  kicker "Study notes · …". Linguistics: **Alignment is Nicky's own notes** (her Google Doc on Harris & Campbell, word
  for word, plus a glossary), then "Comparative syntax and Universal Grammar". Proto-Indo-European: her course notes, then a
  "Further study" path of study notes Nicky agreed (`pie-study-lessons.js`: pronouns…, syntax, Grimm/Verner, the branches,
  Schleicher's fable), mapped by `pages` like Opera. No path for Hittite (Nicky's call). Opera keeps its "Further study" list
  (Nicky's call): each step opens study notes (`opera-study-lessons.js`) where her First Nights notes don't discuss it,
  and her own Voices page for voice types (`pages` in its TOPICS entry).
- Every French, Russian, Linguistics, Silver Age, Tocharian, Avestan, Opera and PIE study-notes lesson ends with a typed quiz (`FN_LESSON_QUIZZES` in `assets/lesson-quizzes.js`,
  `[question, answer]`, alternatives split by " / "): up to ten questions shuffled, Check shows the answer, "I was right"
  overrides. New lessons need a quiz entry too.
- **Sync between devices** (`assets/study-sync.js`, loaded before `study-annotations.js`): the box "On all your devices" on the
  crystal's page. Nicky pastes a fine-grained GitHub token with only Gists read/write (remembered on that device, in
  `fn-study-sync-v1`); `fn-study-v1`, `fn-study-lessons-v1` and `fn-study-annotations-v1` are copied to a secret gist
  described "Frolicking Nicky study (private sync)" (found by that description, so every device uses the same token).
  Newest copy wins: every save calls `window.fnStudyChanged()` (only real changes count, by fingerprint) and pushes after 3s;
  opening the page, returning to the tab or moving between topics pulls, and a newer copy reloads the page with it.
  New things saved in the browser must call `fnStudyChanged()` too, and add their key to `KEYS`.
- Russian and French vocabulary rows and vocabulary quizzes have a small fine-line **speaker** button (Nicky preferred it to the word "listen"; the browser's own voice,
  hidden while the word itself is veiled). Russian answer boxes get a row of **Cyrillic letters** on computers
  (`pointer: fine`; phones have their own keyboards), and Russian answers may also be typed in Latin letters (`sameWord`).
