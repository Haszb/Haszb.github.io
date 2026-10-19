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
});
