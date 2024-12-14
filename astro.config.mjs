import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ravi-cloudworks.github.io',
  base: '/appointment-app',
  integrations: [
    react(),
    tailwind()
  ],
  output: 'static',
});