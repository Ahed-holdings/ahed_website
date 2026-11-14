# Images

## Photos in `public/img/` (from the client's content document)
| File | Used on |
|---|---|
| strategy.webp | Strategy Advisory card + page, Services hero, hero slide 1, CTA band |
| performance.webp | Performance Improvement, hero slide 2, How We Work hero, articles |
| people.webp | People & Change, hero slide 3, About CTA, articles |
| digital.webp | Digital & Innovation, Insights hero, articles |
| finance.webp | Finance & Accounting, About hero, articles |
| managed.webp | Managed Services, Home "Who we work with", Industries hero |

These came embedded in the content document. Several look like images taken from other companies' websites, so **confirm the licence or replace them before launch**.
To swap a photo, replace the file in `public/img/` with the same name, or change the path where it's used (`src/lib/site.js` for service images).

## Logos in `public/img/`
| File | Used on |
|---|---|
| logo.webp | Navy & gold AHED logo for light backgrounds (currently unused: the header is navy) |
| logo-inverse.webp | White letters + gold "D"/swoosh for navy backgrounds: header and footer |

Both were recoloured from the client's 640×193 original (`docs/brand/logo-original.webp`). Ask the client for a vector (SVG/AI) master.

## Brand references in `docs/brand/`
- `palette-reference.jpg`: the navy & gold palette board the site colours come from.
- `logo-original.webp`: the client's original logo in the old green/blue colours. Source only, not used by the site.

## Extra photos generated in Figma (not downloaded)
Figma AI generated 9 original photos for the design. Their download links expired around **10 Nov 2026**, but the images
remain in the Figma file "Ahed – Everything Ahead · Website" under "🖼 Image Library". Export the ones you want into
`public/img/` and update the paths. Subjects: advisor and owner by a city window (hero), partnership handshake
(About / CTA), operations / warehouse (Industries), strategy meeting, performance dashboards, leadership workshop,
digital transformation, finance analysis, business support team.
