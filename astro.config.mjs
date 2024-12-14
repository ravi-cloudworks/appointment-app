import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ravi-cloudworks.github.io',
  base: '/appointment-app',
  integrations: [
    react(),
    tailwind({
      // Enable if you want to write Tailwind classes in .astro files
      applyBaseStyles: true
    })
  ],
});