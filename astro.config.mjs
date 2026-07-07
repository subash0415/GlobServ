import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://subash0415.github.io',
  base: '/GlobServ',
  output: 'static',
  integrations: [tailwind()],
  build: {
    assets: 'assets',
  },
});