# haszb.github.io

Personal portfolio of Hassan Zbib, data scientist and author of [Rochondra](https://github.com/Haszb/Rochondra), in English and French.

**Live site: <https://haszb.github.io>** (French: <https://haszb.github.io/fr/>)

Built with [Astro](https://astro.build) as a fully static site and deployed to GitHub Pages on every push to `main`.

## Features

- **Bilingual**: every page exists in English (`/`) and French (`/fr/`), and a link in the header switches between them without losing the reading position.
- **Home page**: photo, short bio and contact links, then a tab bar with one section at a time: Projects, Resume and Writing (Medium articles). Each tab has its own URL (`/#resume`, `/#writing`).
- **Two case studies**:
  - *Rochondra*: the problem, the approach, corpus figures, an architecture diagram, the key decisions from the project's decision log, and the roadmap.
  - *Bitcoin price analysis*: told as the origin of Rochondra (data, market analysis, RNN experiment, result, pivot), with four interactive Plotly charts.
- **Resume** in both languages, with a PDF download in each.
- **Light and dark themes**: follows the visitor's system setting, with a toggle in the header that the browser remembers.
- **No backend**: static HTML, CSS and a little JavaScript. Plotly loads only on the Bitcoin page, once a chart scrolls into view.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Astro 7.3.5 with MDX (`@astrojs/mdx` 8.0.2) |
| Charts | Plotly (`plotly.js-cartesian-dist-min` 4.1.1) |
| Fonts | Libertinus Serif and IBM Plex Mono, self-hosted |
| Icons | Inline SVG; brand logos from Simple Icons 9.21.0 (CC0) |
| Hosting | GitHub Pages, built by GitHub Actions |

All dependency versions are pinned in `package.json`.

## Getting started

Requires Node 22.

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:4321, reloads on save
npx astro dev stop   # stop the dev server (it runs in the background)
npm run check        # type and content checks
npm run build        # production build into dist/
npx astro preview    # serve dist/ locally (stop with npx astro preview stop)
```

To open the dev server on a phone on the same Wi-Fi, start it with `npm run dev -- --host` and open the "Network" address it prints (for example `http://192.168.1.17:4321/`). The 172.x and 192.168.122.x addresses belong to Docker and virtual machines.

On this machine Node is installed for the user only: run `export PATH=$HOME/.local/node/bin:$PATH` first.

## Project structure

```
public/                 static files served from the site root
  data/btc-grid/        results of the Bitcoin hyperparameter grid (JSON)
  img/                  photo, card images, chart fallback images
  resume/{en,fr}/       resume PDFs
src/
  content/              all the text: profile, projects, resume, articles
  components/           page sections and case-study components
  data/btc/             Bitcoin chart data (JSON)
  i18n/ui.ts            interface labels in both languages
  layouts/              base layout (header, footer, theme toggle)
  pages/                routes; French pages under pages/fr/
  scripts/charts.ts     lazy Plotly loading and drawing
  styles/global.css     theme tokens, typography, layout widths
.github/workflows/      deployment to GitHub Pages
```

## Editing content

All text lives in `src/content/`, and every English file has a French twin: change both together.

| What | File |
|---|---|
| Name, role, photo, email, links, short bio | `src/content/profile/{en,fr}.md` |
| Articles (Medium list) | `src/content/articles.yaml` |
| Rochondra case study | `src/content/projects/{en,fr}/rochondra.mdx` |
| Bitcoin case study | `src/content/projects/{en,fr}/bitcoin.mdx` |
| Training project cards | `src/content/projects/{en,fr}/{rakuten,cartofriches,floraflow}.md` |
| Resume | `src/content/resume/{en,fr}.yaml` |
| Resume PDFs (Download button) | `public/resume/en/Hassan Zbib resume.pdf`, `public/resume/fr/Hassan Zbib cv.pdf`: replace a file and keep its name, or change `pdf:` in the matching resume YAML (spaces written as `%20`) |
| Interface labels (menu, buttons) | `src/i18n/ui.ts` |

- **YAML**: wrap any value containing a colon followed by a space in quotes. Otherwise the file breaks silently and its collection comes out empty (the build only warns).
- **Photo**: put the image in `public/img/` and reference it as `/img/<name>`. Its height follows the length of the bio, and it is cropped from the bottom or sides so the head is never cut. Keep it under about 1000 px wide.
- **Articles**: copy an entry in `articles.yaml`, give it a new `id`, and write the summary in both languages.
- **Case studies** are Markdown with a few components (`<Stats>`, `<Chart>`, `<Decision>`, `<Roadmap>`…). The prose can be edited freely; the component tags stay as they are.
- **Roadmap progress**: on the Rochondra page, `<Roadmap lang="en" current={1} />` marks Phase 1 as in progress. Raise `current` as phases complete, in both languages.

### Troubleshooting

- *Error page after saving*: usually a typo, such as an unquoted colon in YAML or a wrong path. The browser and the terminal name the file and the line.
- *Old content, or "Missing src/content/profile/en.md"*: save the file again. If that is not enough, restart the dev server.
- *Bitcoin charts not drawing under `npm run dev`* (console: "504 Outdated Optimize Dep"): the Vite cache is stale. Stop the server, delete `node_modules/.vite`, restart.
- *Floating dark bar at the bottom*: Astro's developer toolbar. It only appears on the dev server.

## Deployment

Each push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it at <https://haszb.github.io> in about a minute. A failed run leaves the previous version online. The repository's Pages source must be set to **GitHub Actions** (Settings → Pages). If a "pages build and deployment" run appears, the source has been switched back to "Deploy from a branch", which would publish the raw files instead of the built site.

For a custom domain, add a `public/CNAME` file containing the domain, change `site` in `astro.config.mjs`, and configure DNS as GitHub describes.

## Technical notes

- **Bilingual routing**: Astro i18n, English unprefixed, French under `/fr/`. Routes are in `src/pages/`; the shared page bodies are `src/components/HomePage.astro` and `CasePage.astro`.
- **Theme**: colour tokens in `src/styles/global.css`, light on `:root` and dark twice, under `prefers-color-scheme` and under `[data-theme='dark']`. Keep the two dark blocks identical. The toggle lives in `src/layouts/BaseLayout.astro`.
- **Charts** (`src/components/Chart.astro`, `src/scripts/charts.ts`): Plotly is imported lazily when a chart scrolls into view, and charts redraw when the theme changes. Each chart shows a static PNG until it is drawn, or if JavaScript is off. Because the import is lazy, `astro.config.mjs` lists Plotly in `vite.optimizeDeps.include` so the dev server never serves a stale copy.
- **Chart data**: `src/data/btc/*.json` and `public/data/btc-grid/*.json` were extracted from the notebooks of [bitcoin_price_analysis](https://github.com/Haszb/bitcoin_price_analysis) and the 168 result CSVs in its `data/2026_01_15/` folder (2 datasets × 3 architectures × 7 hyperparameters). The interactive grid replaces the original Dash app, with no server. The fallback images in `public/img/btc/` are the PNGs embedded in the notebooks.
- **Typography**: one family, `--serif` (Libertinus Serif in regular, italic, semibold and bold). Reading text is justified with automatic hyphenation from `44rem` wide: `.prose > p` plus any element with the `justified` class.
- **Layout widths**: `--wide` (64rem) is the page frame (`.wrap`), and every block ends on its right edge. `--measure` (46rem) caps text columns. The resume and the article list put dates in an 11rem left column so the text beside them reaches the edge; the case pages do the same with a facts sidebar.
- **Icons**: inline SVG in the text colour, no icon package. The logos under the home photo are Simple Icons 9.21.0 paths (the last release that still has LinkedIn), pasted into `HomePage.astro`.
- **Card images** in `public/img/academic/` come from the Rakuten and FloraFlow repositories and from slide 12 of the Cartofriches PDF.
- **Not in the repository**: `_sources/`, the Rochondra brief, decision log and roadmap the case study was written from, is git-ignored, as is the original photo `src/content/profile/photo_cv_small.jpg`.
