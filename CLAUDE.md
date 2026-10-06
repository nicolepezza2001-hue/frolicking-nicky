# Frolicking Nicky

Static travel journal; `dist/` is the website. See README.md for structure, the
Italian copies and the best-time-to-visit data.

## Animation preferences (Nicky's house rules)

- **Footsteps, not paper planes.** When motion should suggest travel or moving
  from place to place, use a trail of footprints that appear one after another
  and fade away behind the walker, like the Marauder's Map footsteps in Harry
  Potter. Don't use paper planes, flying planes or "flying away" motifs.
  The reusable pieces are in `dist/assets/motion.js`: the `print()` footprint
  helper, the hero footsteps, and the `steps` heading icon, which has no arch (Nicky
  asked for none): its prints lie flat and walk to the right (never
  standing upright), always show, and a trail carries on from them along the same
  line across the empty space to the right of the heading (`trail()`).
- Hero photos are taped down at the top corners with beige masking tape and
  simply appear, then stay still: no Polaroid develop or fade-in, no
  fluttering, floating or hovering up and down (Nicky didn't like those).
- Turning a hero photo over (hover on desktop, a tap on phones) shows a used
  postcard with a stamp from every country Nicky has visited. The country list
  is `order` in the postcard block of `motion.js`; add new countries there
  (with a flag in `F`) and update the "41" count in both languages.
- Heading icons are fine-line, Art Nouveau-inspired illustrations (thin ink
  lines, whiplash curves, each in a slender arched frame with curled feet), drawn
  on a 48×48 grid in the icon block of `motion.js`. New icons should match.
- All motion lives in `dist/assets/motion.css` / `motion.js` and must switch
  off for visitors with `prefers-reduced-motion: reduce`.
- When you change a shared CSS/JS file, bump its `?v=` number in every page
  that links it.
- Every English change needs the same change in its Italian copy under `/it/`.

## Where things live

- **Where I’ve been map** (home and My travels, EN + IT): `dist/assets/world-map.svg` and
  `world-map.it.svg`, generated from Natural Earth data. Inked countries carry
  `data-x`/`data-y` where the footsteps stop; the walker is in `motion.js`.
- **Rough budget and handwritten margin notes** (itinerary pages):
  `dist/assets/journal.js`. Notes attach to a stop by its checkbox id. The
  notes are practical asides written in Nicky's voice; she may replace them
  with her own.
- **Share previews**: every page has Open Graph/Twitter tags; images are
  `dist/assets/share-*.jpg` (1200×630).
- **Photos**: keep JPEGs at most 1400px on the long side, quality ~76, with
  metadata stripped (this also removes GPS).

## One itinerary look

All itinerary pages share the journal look of Vietnam / Japan / Bratislava:
paper background, Playfair titles, wine kicker labels, a wine-framed hero photo
with tape, pill jump links and soft rounded cards. Vienna and the Mexico pages
keep their own markup but are restyled by the "One itinerary look" block in
`shared.css` (scoped to `body.fn-vienna` / `body.fn-mexico`). New itineraries
should copy the Vietnam/Japan page structure.

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
dragged and zoomed with + / − (`zoomable()` in `motion.js`). Nicky didn't want
a separate Europe close-up, the map legend or the trip buttons under the map on phones. On touch screens the turned-away side is hidden with `visibility` because iPhone Safari can show it mirrored.

## Working with Nicky

- Make every finished change live without asking: open a pull request into
  `main` and merge it straight away (Nicky asked not to be asked again).
  Merging to `main` publishes the site via GitHub Pages.
- After every change, send Nicky the links: the pull request, the branch and
  the website (https://frolickingnicky.com/).
