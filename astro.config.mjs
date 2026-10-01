// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yebt.dev',
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      themes: { dark: 'github-dark-dimmed', light: 'github-light' },
      defaultColor: 'dark',
      wrap: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/cv/print/'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-CO' },
      },
    }),
  ],
});
