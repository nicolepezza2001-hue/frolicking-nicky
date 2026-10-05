# Frolicking Nicky

Static multipage travel journal. Serve dist as the website root.

Routes: /, /my-travels, /about, /austria/vienna, /mexico/mexico-city.

Original itinerary content is preserved from Nicole’s existing sites. Shared brand CSS is in dist/assets/shared.css. Browser localStorage uses separate trip keys and never sends checklist progress to a server. Old websites use different origins, so their progress does not migrate automatically.

To add a trip, create its country/city/index.html, copy shared navigation and assets, assign a new stable localStorage key, then add its destination card to home and My travels and its country to the filter. dist/assets/trips.json records card metadata for future expansion. Use stable item IDs for new checklists.

Nicole’s supplied portrait is on About Me; her final About Me copy is still to be supplied; current About text uses only the project brief. Destination images are credited on the collection pages. No world map is included in this initial two-trip edition.

Brand colours: black, #86324A and #E4F5E0.


## Best time to visit

All five destination pages use `<best-time-to-visit destination="KEY">`.
The one reusable renderer is `dist/assets/best-time-to-visit.js`; its isolated
styles are in `dist/assets/best-time-to-visit.css`. Seasonal information lives
in `dist/assets/visit-seasons.js`, including source links and itinerary scope.

For a future destination, add an entry with 12 `ratings` (Jan–Dec; `Best`,
`Good`, `Okay`, or `Avoid`) and a `note` beginning `My pick:`. Optional fields
are `scope`, 12 monthly `reasons`, and `sources` as `[label, URL]` pairs.
Include the shared stylesheet and module script, then place the element after
the introduction, outside photo groups and dynamically generated checklists.
No framework or build step is required. Symbols and screen-reader rating text
make the strip understandable without relying on colour alone. The details
section exposes the monthly reasoning on touch screens and keyboards.

Ratings are editorial route-specific judgments, not forecasts. Review sources
when changing them; do not apply national averages to a specific city or assume
one season fits every region of a multi-stop itinerary.


## Italian version

Every page has an Italian copy under `/it/` with Italian slugs
(`/it/i-miei-viaggi`, `/it/chi-sono`, `/it/austria/vienna`,
`/it/messico/citta-del-messico`, `/it/messico/san-miguel-de-allende`,
`/it/slovacchia/bratislava`, `/it/vietnam`, `/it/giappone`).
The `EN | IT` toggle in the header links each page to its twin, and each
page lists both versions with `hreflang` links.

When you change an English page, make the same change to its Italian copy.
Itinerary data for Mexico City and San Miguel lives in `mexico.it.js` and
`sanmiguel.it.js`; seasonal notes in `visit-seasons.it.js`. Shared scripts
switch their interface text on `<html lang="it">`. Both languages use the
same localStorage keys and item IDs, so ticks carry over between them; keep
IDs and item order identical in both copies.


## Motion

All animation is in `dist/assets/motion.css` and `dist/assets/motion.js`, and
switches off for visitors who prefer reduced motion. Hero photos are held down
with masking tape. Turning one
over shows a used postcard covered in stamps from every country Nicky has
visited (the list lives in `motion.js`). For
travel motion, use **footsteps that fade behind the walker** (Marauder's Map
style) rather than paper planes; see CLAUDE.md for the house rules.

Destination cards on the home and My travels pages flip over on hover, or with
the "Quick look" button on touch screens and keyboards, to show highlights,
best months, getting around and one practical tip. The back of each card is
plain HTML inside the card, so edit it there (in both languages) when an
itinerary changes.


## Checks, offline and the itinerary look

- **Checks**: `node tools/check-site.mjs` and `cd tools && npm ci && node smoke.mjs`
  run automatically before every publish; a failure stops the site publishing.
- **Offline**: `dist/sw.js` keeps visited pages; itinerary pages have a "Save for
  offline" button. `dist/manifest.webmanifest` allows adding to the home screen.
- **One itinerary look**: Vienna and Mexico are restyled to match the other
  itineraries by the "One itinerary look" block in `shared.css`.
