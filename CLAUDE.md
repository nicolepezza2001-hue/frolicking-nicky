# Frolicking Nicky

Static travel journal; `dist/` is the website. See README.md for structure, the
Italian copies and the best-time-to-visit data.

## Animation preferences (Nicky's house rules)

- **Footsteps, not paper planes.** When motion should suggest travel or moving
  from place to place, use a trail of footprints that appear one after another
  and fade away behind the walker, like the Marauder's Map footsteps in Harry
  Potter. Don't use paper planes, flying planes or "flying away" motifs.
  The reusable pieces are in `dist/assets/motion.js`: the `print()` footprint
  helper and the hero footsteps, and the `steps` heading icon.
- Hero photos are taped down at the top corners with beige masking tape and
  simply appear, then stay still: no Polaroid develop or fade-in, no
  fluttering, floating or hovering up and down (Nicky didn't like those).
- Turning a hero photo over (hover, or the Turn over button) shows a used
  postcard with a stamp from every country Nicky has visited. The country list
  is `order` in the postcard block of `motion.js`; add new countries there
  (with a flag in `F`) and update the "41" count in both languages.
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

## Phones

Check every change on a phone-sized screen too (Nicky mostly looks on her
iPhone). On touch screens destination cards turn over by themselves once fully
on screen and on tap; the map fits the screen with a Europe close-up, number
tiles and trip links instead of tiny pin labels (`extras()` in `motion.js`).

## Working with Nicky

- Make every finished change live without asking: open a pull request into
  `main` and merge it straight away (Nicky asked not to be asked again).
  Merging to `main` publishes the site via GitHub Pages.
- After every change, send Nicky the links: the pull request, the branch and
  the website (https://frolickingnicky.com/).
