// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// When a custom domain is bought, change `site` (and add public/CNAME).
export default defineConfig({
  site: 'https://haszb.github.io',
  integrations: [mdx()],
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  trailingSlash: 'ignore',
  // Plotly is imported lazily (src/scripts/charts.ts), so the dev server would only discover it
  // at runtime and could serve a stale pre-bundle ("504 Outdated Optimize Dep"); bundle it upfront.
  vite: { optimizeDeps: { include: ['plotly.js-cartesian-dist-min'] } },
});
