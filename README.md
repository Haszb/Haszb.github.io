# haszb.github.io

Personal portfolio of Hassan Zbib, in English (`/`) and French (`/fr/`). Built with [Astro](https://astro.build), deployed to GitHub Pages.

## Status (22 October 2026)

The site is complete for a first version and builds cleanly (`npm run build`, `npm run check`: 0 errors). It has been checked in Firefox on desktop and phone widths, in light and dark mode. It is **published** at <https://haszb.github.io> from the GitHub repository [Haszb/Haszb.github.io](https://github.com/Haszb/Haszb.github.io).

**Latest changes (22 October)**

- French resume (`src/content/resume/fr.yaml`): Hassan's own French text, job titles in French. Dates stay numeric ("depuis 02/2026"; "02/2026 – aujourd’hui" wraps in the date column). The English education entries follow the French (Liora in partnership with Mines Paris – PSL, RNCP level 7, MSc title), and the conflict-of-interest clause left the first Rochondra bullet. The French Download button reads "Télécharger le PDF (en anglais)", since the PDF is the English CV.
- Resume: the LinkedIn version, reworded by Hassan, is kept; the PDF version and its tab are gone. The tab bar now reads Projects | Resume | Writing, the resume tab lives at `/#resume` (the header's Resume link follows), and the file moved to `src/content/resume/en.yaml`.
- Published: the local repository was pushed to `Haszb/Haszb.github.io` (remote `origin`), Pages source set to GitHub Actions, first deployment succeeded. Every page and the chart data answer on the live site.
- Pushing works over SSH as Haszb: `github.com` in `~/.ssh/config` uses the key `id_ed25519` (Haszb); the alias `github-compteB` uses `id_ed25519_compteB` (Rochondra-lab). `ssh -T git@github.com` should answer "Hi Haszb!".
- Tab bar: one line at every width. It stays centred while it fits and scrolls sideways when it does not (at 400px the current four tabs overflow by about 40px), running out to the screen edges; opening a tab scrolls it into view. Desktop is unchanged.
- Address: `haszb.github.io` is kept for now; a personal domain stays possible later (see "Publishing").
- Inferred project periods and article reading times confirmed by Hassan.

**Changes on 20 October**

- Profile and project summaries reworded by Hassan (French profile, all French summaries, English Bitcoin and Rochondra); the English profile was brought in line with the French.
- Featured cards: the kicker line (type · period) spans the whole card, the visual starts level with the title, and titles are 10% smaller ("Bitcoin, analyse du prix" fits on one line from 1000px wide). The Rochondra figures now read URLs tried, whitepapers retrieved, volume.
- Training cards: context and team lines dropped (the meta line disappears when empty); Rakuten is dated 2024.
- Resume: the summary paragraph is gone from both versions (and from the schema).
- Dev server fix: the Bitcoin charts (and so the grid's drop-down menus) had stopped loading under `npm run dev` because Vite served a stale Plotly pre-bundle. Plotly is now pre-bundled at startup (`astro.config.mjs`). The production build was never affected.

**Changes on 19 October**

- Version control: the folder is now a git repository. Claude proposes each commit and makes it only after Hassan confirms.
- Font: Libertinus Serif replaces Inter for all text, chosen on a temporary trial page (since removed) against Latin Modern, STIX Two, Charter, EB Garamond, several screen serifs and sans. IBM Plex Mono stays for code.
- Home intro: Email, GitHub, LinkedIn and Medium links now sit under the photo in the right column, one per line, each with its logo. Phones are unchanged (small headshot beside the name, links after the summary).
- Contact tab removed, as the links under the photo carry the same information; the header's Contact link went with it (the footer still lists Email, GitHub, LinkedIn and Medium on every page).
- Training project cards (Rakuten, Cartofriches, FloraFlow): new summaries, tags and pictures from Hassan, French versions translated by Claude. The FloraFlow Grad-CAM picture is now a 51 KB JPEG.
- French profile retranslated from the current English one (new role line, five paragraphs, no more lorem ipsum); French Rochondra card brought in line with the English.

**Earlier changes (16 October)**

- Home page prototype: under the intro, a tab bar (Projects | Resume · LinkedIn | Resume · PDF | Writing) shows one section at a time; Projects opens by default. Each tab has its own URL (`/#writing`…). Two resume versions are being compared: one worded from the LinkedIn export, one from the PDF CV. Both offer the PDF for download. French pages show the English resume, marked "(en anglais)".
- Tab bar restyled: plain centred labels on a single rule, the selected tab underlined in the accent colour (the shaded boxes were too busy).
- One right edge on every page: the page frame narrowed from 72rem to 64rem and the content now fills it, so nothing stops short leaving a blank on the right. Text columns widened from 40rem to 46rem.
- Resume: dates and place moved to a left column (like the article list); the text fills the column to their right and is justified on desktop.
- Public email set to hassan.zb@gmail.com.
- Checked on a real phone over the local network (see "Running locally").
- Justified text on desktop and tablet (left-aligned on phones): home introduction, featured project cards, project page summaries and body paragraphs. Headings, lists, labels and the three small project cards stay left-aligned.

**Still to do**

- [ ] The Rochondra case study links to `Haszb/Rochondra/blob/main/docs/roadmap.md`, which answers 404 (the file is not committed yet, or the repository is private). Now that the site is live, this link is broken for visitors: commit the roadmap (item below) or make the link point elsewhere.
- [ ] Decide whether the intro role line changes to match the resume (now "Founder & Technical Product Owner" at Rochondra Lab).
- [ ] Fix "comparable scores" in the PDF CV (contradicts D21), then replace `public/hassan-zbib-resume.pdf`.
- [ ] Proofread the French text (drafted by Claude): profile, card summaries, both case studies, article summaries.
- [ ] Commit `_sources/roadmap.md` to the Rochondra repository as `docs/roadmap.md` (the Rochondra case study links there).
- [ ] Optionally delete `src/content/profile/photo_cv_small.jpg` (the site uses the resized copy `public/img/photo.jpg`; git ignores the original).
- [x] Choose a resume version: LinkedIn (22 October).
- [x] Write the French resume (22 October).
- [x] Publish (22 October).
- [x] Tab bar on phones: one line that scrolls sideways (22 October).
- [x] Address: keep `haszb.github.io` for now (22 October).
- [x] Check inferred project periods and reading times (22 October).

## What the site contains

| Page | URL | Content |
|---|---|---|
| Home | `/`, `/fr/` | Photo and short bio, then a tab bar: projects (two featured, three training cards), resume, Medium articles |
| Rochondra | `/projects/rochondra/` | Problem, approach, corpus figures, architecture diagram, decisions D6/D21/D24/D16, roadmap (Phase 1 in progress) |
| Bitcoin | `/projects/bitcoin/` | Told as the origin of Rochondra: data, market analysis, RNN experiment, result, pivot. Four interactive charts |

Design choices agreed during the planning session:

- Two sites eventually: this portfolio now, a separate Rochondra project site (e.g. rochondra.com) later. This portfolio will then become the author page and article index, linking to it.
- No database or backend here: static pages only.
- The Rochondra case study shows where the project stands (roadmap phases), not a list of known gaps; the linked documents hold the candid version.
- Articles are listed with links to Medium (not copied onto the site).
- Editorial style; follows the visitor's light/dark setting, with a toggle in the header (choice remembered in the browser).

## Editing content

All text lives in `src/content/`. You shouldn't need to touch anything else.

| What | File |
|---|---|
| Name, role, photo, email, links, short bio | `src/content/profile/en.md`, `src/content/profile/fr.md` |
| Articles (Medium list) | `src/content/articles.yaml` |
| Rochondra case study | `src/content/projects/{en,fr}/rochondra.mdx` |
| Bitcoin case study | `src/content/projects/{en,fr}/bitcoin.mdx` |
| Resume | `src/content/resume/en.yaml`, `src/content/resume/fr.yaml` |
| Resume PDF (Download button) | `public/hassan-zbib-resume.pdf`: replace the file, keep the name |
| Training project cards | `src/content/projects/{en,fr}/{rakuten,cartofriches,floraflow}.md` |
| Interface labels (menu, buttons) | `src/i18n/ui.ts` |

Every page exists in both languages: when you change an `en/` file, change its `fr/` twin.

**Photo.** Put the image in `public/img/` and reference it as `/img/<name>` (anything in `public/` is served from the site root; a path on your disk will not work). The photo's height follows the length of your bio automatically, and it is cropped from the bottom or sides so the head is never cut. Keep it under ~1000 px wide so the page stays light.

**Adding an article.** Copy an entry in `articles.yaml`, give it a new `id`, and write the summary in both languages. If a summary contains a colon followed by a space, wrap it in single quotes.

**Case studies** are Markdown with a few components (`<Stats>`, `<Chart>`, `<Decision>`, `<Roadmap>`, …). Edit the prose freely; keep the component tags as they are, or ask Claude to change them.

**Roadmap progress.** On the Rochondra page, `<Roadmap lang="en" current={1} />` marks Phase 1 as in progress. Change `current` as phases complete (in both languages).

## Running locally

Node 22 is installed for your user only, in `~/.local/node`. In a terminal, from this folder:

```bash
export PATH=$HOME/.local/node/bin:$PATH
npm install          # first time only
npm run dev          # http://localhost:4321 — the page reloads when you save a file
npx astro dev stop   # stop the dev server (it keeps running in the background otherwise)
npm run build        # production build into dist/
npm run check        # type and content checks
```

**On your phone.** With the phone on the same Wi-Fi, start the server with `npm run dev -- --host` (add `--force` if a dev server is already running) and open the "Network" address it prints, e.g. `http://192.168.1.17:4321/`; the 172.x and 192.168.122.x addresses are Docker and virtual machines. For a quick look without a phone, Firefox's Responsive Design Mode (Ctrl+Shift+M) simulates phone widths.

**Troubleshooting**

- *Error page after saving*: usually a typo (unquoted colon in YAML, wrong path). The browser and terminal name the file and line; fix and save.
- *Page stuck on old content or "Missing src/content/profile/en.md"*: save the file again; if that is not enough, stop and restart the dev server.
- *Floating dark bar at the bottom*: Astro's developer toolbar, only on the local dev server.
- *Light/dark*: use the moon/sun button in the header.

## Publishing

The repository is [Haszb/Haszb.github.io](https://github.com/Haszb/Haszb.github.io) (remote `origin`), with Settings → Pages → Source set to **GitHub Actions**. To publish, commit and run `git push`: each push to `main` rebuilds and publishes the site at <https://haszb.github.io> in about a minute (`.github/workflows/deploy.yml`). Follow the run in the repository's Actions tab; a failed run leaves the previous version online.

Only the "Deploy to GitHub Pages" workflow should run. If a "pages build and deployment" run appears, the Pages source has been switched back to "Deploy from a branch", which would publish the raw files instead of the built site.

Custom domain later: add a `public/CNAME` file containing the domain, change `site` in `astro.config.mjs`, and configure DNS as GitHub describes.

## Technical notes

- **Stack**: Astro 7.3.5 with MDX, self-hosted fonts (Libertinus Serif, IBM Plex Mono), Plotly (cartesian build) for charts. All versions pinned in `package.json`.
- **Bilingual routing**: Astro i18n, English unprefixed, French under `/fr/`. Pages: `src/pages/`; shared page bodies: `src/components/HomePage.astro`, `CasePage.astro`.
- **Theme**: colour tokens in `src/styles/global.css` (light on `:root`, dark under `prefers-color-scheme` and `[data-theme='dark']`; keep the two dark blocks identical). The toggle lives in `src/layouts/BaseLayout.astro`.
- **Charts** (`src/components/Chart.astro`, `src/scripts/charts.ts`): Plotly loads only on the Bitcoin page, when a chart scrolls into view; charts redraw on theme change. Because the import is lazy, `astro.config.mjs` lists Plotly in `vite.optimizeDeps.include`, otherwise the dev server can serve a stale copy ("504 Outdated Optimize Dep") and no chart draws. Each chart shows a static PNG until it is drawn (or if JavaScript is off).
- **Chart data**: `src/data/btc/*.json` and `public/data/btc-grid/*.json` were extracted from the [bitcoin_price_analysis](https://github.com/Haszb/bitcoin_price_analysis) notebooks and the 168 result CSVs in its `data/2026_01_15/` folder (2 datasets × 3 architectures × 7 hyperparameters). The interactive grid replaces the original Dash app, with no server. Fallback images in `public/img/btc/` are the PNGs embedded in the notebooks.
- **Typography**: one family, `--serif` (Libertinus Serif: regular, italic, semibold, bold), set in `src/styles/global.css`. Reading text is justified with automatic hyphenation from `44rem` wide: `.prose > p` plus any element given the `justified` class (home intro, featured cards, case page summary, resume text).
- **Layout widths**: `--wide` (64rem) is the page frame (`.wrap`) and every block ends on its right edge; `--measure` (46rem) caps text columns. The resume and the article list put dates in an 11rem left column so the text beside them reaches the edge; the case pages do the same with the facts sidebar.
- **Icons**: inline SVG in the text colour, no icon package. The logos under the home photo are Simple Icons 9.21.0 paths (CC0; the last release that still has LinkedIn), pasted into `HomePage.astro`.
- **Card images** in `public/img/academic/` come from the Rakuten and FloraFlow repositories and slide 12 of the Cartofriches PDF.

## Not published

`_sources/` holds the Rochondra brief, decision log and roadmap used to write the content. It is git-ignored. `_sources/roadmap.md` is the Markdown conversion of the roadmap `.docx`, ready to commit to the Rochondra repository as `docs/roadmap.md`.
