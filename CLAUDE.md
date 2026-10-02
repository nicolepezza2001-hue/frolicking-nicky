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
- Hero photos are taped down at the top corners with beige masking tape. They
  develop once like a Polaroid when the page opens, then stay still: no
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

## Working with Nicky

- After every change is pushed, send Nicky the link to it on GitHub (the branch,
  and the pull request if there is one) in your reply.
