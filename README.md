# Aditi S — Developer Portfolio

React + Vite single-page portfolio.

## Run

```bash
npm install
npm run dev      # local development
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Editing content

All text, links, metrics, skills, and experience live in `src/data/content.js`.
Components in `src/components/` only render that data.

## Adding project screenshots and videos

1. Put image files in `public/projects/<project id>/` (for example `public/projects/hirelens/overview.png`).
2. In `src/data/content.js`, fill that project's `media` field:
   - `thumbnail`: shown on the card and first in the modal gallery.
   - `gallery`: extra screenshots, shown only in the modal.
   - `video`: `{ url, title }`. YouTube, Vimeo, Loom, or a direct .mp4/.webm file is embedded; any other URL appears as a link.
3. Give every image a short, accurate `alt` description.

Projects without media show a labelled illustration, and the gallery and video areas stay hidden.

## Deploy

The `dist/` output is static and can be hosted on Vercel, Netlify, or GitHub Pages without extra configuration.
