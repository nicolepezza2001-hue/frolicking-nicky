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
