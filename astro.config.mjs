import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.mhdb.xyz',
  redirects: {
    '/': '/en/monsters'
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "es", "fr", "it", "ja", "ko", "pt", "zh"],
    routing: {
      // All URLs, including default language, will have a /[locale]/ prefix.
      prefixDefaultLocale: true,
    }
  },
  integrations: [tailwind(), react()]
});