# CLAUDE.md

Hassan's bilingual portfolio (Astro, static, GitHub Pages). Hassan edits the text in `src/content/`; Claude owns all code. When resuming, read the **Status** section of `README.md` first: it holds the open to-do list. The README's "Technical notes" map the code.

## Scope

The site is static. Data features (Supabase, the whitepaper explorer, deciles) belong to the future Rochondra site (rochondra.com), which is a separate project.

## Conventions

- **Twins**: every content change lands in `en/` and `fr/` together, French typography included (`5 880`, `30,4 Go`, `l’`, a space before `:` and `?`). Articles and Rochondra docs stay in English; on French pages, link labels mark them "(en anglais)".
- **Facts come from sources**: the Rochondra numbers and decisions come from `_sources/` (brief, decision log, roadmap); the Bitcoin figures come from the notebooks of the `bitcoin_price_analysis` repo. Where no source exists, use a `<span class="lorem">` placeholder and tell Hassan.
- **Rochondra framing**: describe project status as roadmap phases, never as a list of defects; the linked docs carry the candid version. The Bitcoin page is the origin story of the pivot to Rochondra (decision D1).
- **One right edge**: every block ends on the page frame's edge (`--wide`); Hassan dislikes a blank strip on the right. Where text capped at `--measure` would end short, fill the row with structure (a left column for dates, a sidebar) instead of leaving space.
- **Audience**: recruiters, mostly on desktop, so design desktop-first, but keep phones clean (links often get opened from LinkedIn or email on a phone).
- **Icons**: monochrome inline SVG in the text colour; brand marks are Simple Icons paths pasted in, never an icon package.
- **Theme tokens**: colours live only as variables in `src/styles/global.css`. The dark palette appears twice there (system preference and `[data-theme='dark']`); edit both blocks identically.
- **Dependencies**: pin exact versions, choosing releases at least two weeks old.

## Gotchas

- The site is live: `git push` to `main` publishes it at haszb.github.io within a minute. Commit and push only after Hassan says yes to each.
- Two GitHub accounts share this machine: `git@github.com` authenticates as Haszb (this repo), the SSH alias `github-compteB` as Rochondra-lab. `gh` is not installed; check deployment runs through the public API (`api.github.com/repos/Haszb/Haszb.github.io/actions/runs`).
- Node is user-local: prefix shell commands with `export PATH=$HOME/.local/node/bin:$PATH`.
- `npm run dev` and `astro preview` detach. Stop them with `npx astro dev stop` / `npx astro preview stop`.
- YAML values containing `: ` must be quoted (`articles.yaml` fails silently and the collection comes out empty; the build only warns).
- A chart's `.plot` element is `display: none` until it is drawn, so observers and width measurements target its `.chart-figure` / parent instead.
- If the Bitcoin charts stop drawing under `npm run dev` (console: "504 Outdated Optimize Dep" on a `node_modules/.vite/deps/plotly…` URL), the Vite cache is stale: stop the server, delete `node_modules/.vite`, restart. Plotly stays in `vite.optimizeDeps.include` in `astro.config.mjs` to prevent it.
- Editor saves can make the dev server drop a content entry ("Missing src/content/profile/en.md"); re-saving the file restores it.

## Verifying

Finish every change with `npm run check` and `npm run build`, both clean. For anything visual, look at it rather than trusting the build: the only browser here is Firefox, driven headless through `puppeteer-core` installed in a scratch directory (`browser: 'firefox'`, `executablePath: '/usr/bin/firefox'`). Charts load lazily, so scroll before capturing. To force dark mode, pass `extraPrefsFirefox: { 'layout.css.prefers-color-scheme.content-override': 0 }`. Check desktop and ~400px widths, in light and dark mode. Hassan tests on a real phone with `npm run dev -- --host` (the README explains how).
