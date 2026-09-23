# Frolicking Nicky

Static multipage travel journal. Serve dist as the website root.

Routes: /, /my-travels, /about, /austria/vienna, /mexico/mexico-city.

Original itinerary content is preserved from Nicole’s existing sites. Shared brand CSS is in dist/assets/shared.css. Browser localStorage uses separate trip keys and never sends checklist progress to a server. Old websites use different origins, so their progress does not migrate automatically.

To add a trip, create its country/city/index.html, copy shared navigation and assets, assign a new stable localStorage key, then add its destination card to home and My travels and its country to the filter. dist/assets/trips.json records card metadata for future expansion. Use stable item IDs for new checklists.

Nicole’s supplied portrait is on About Me; her final About Me copy is still to be supplied; current About text uses only the project brief. Destination images are credited on the collection pages. No world map is included in this initial two-trip edition.

Brand colours: black, #86324A and #E4F5E0.
