# PDF → Quiz & Test-Day Search (Static Site)

A single-page tool that turns *any* PDF into:
- a section-ordered quiz (MCQ + T/F, with explanations & review), and
- a fast test-day search tool (section-grouped hits, must/should filters).

All in the browser. No backend. Uses PDF.js + Lunr.js. A service worker caches the app for reliability.

## Deploy in 60 seconds

### Option A — GitHub Pages
1. Create a new repo (public is fine).
2. Upload the contents of this folder (`index.html`, `sw.js`, `manifest.webmanifest`).
3. In **Settings → Pages**, pick `Deploy from a branch` and set the branch to `main` and the folder to `/ (root)`.
4. Open the provided Pages URL. First load will cache the app & libs.

### Option B — Netlify
- Drag-and-drop this folder onto https://app.netlify.com/drop or connect your repo.
- Build command: *none*, Publish directory: `/` (root).

### Option C — Vercel
- Import the repo into Vercel. Framework preset: **Other** (static).
- Output directory: `/` (root).

## Using the tool online
1. Open the site in Chrome.
2. Click **Load PDF** to select your study guide.
3. Go to **Admin → Scan / Rebuild** to parse & build the index.
4. Use **Quiz** to practice or **Search** during review/test.
5. Optional: **Export Artifacts** (JSON) and later **Import** to skip rescanning.

## Notes
- The service worker caches CDN libraries after the first visit. If you need *zero* external calls, swap the CDN scripts for locally hosted copies and add them to the SW precache list.
- Large PDFs: first scan may take a minute depending on device/browser.
