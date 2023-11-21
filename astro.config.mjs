import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://travfu.github.io',
  // The base path to deploy to. Astro will use this path as the root for all pages and assets both
  // in development and in production build. All static asset imports and URLs should be prefixed
  // with `import.meta.env.BASE_URL`.
  base: '/curly-octo-waffle',
  integrations: [tailwind(), react()]
});