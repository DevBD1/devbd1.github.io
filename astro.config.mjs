// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import { parse } from 'yaml';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

const { url } = parse(readFileSync(new URL('./src/data/site.yaml', import.meta.url), 'utf8'));

// https://astro.build/config
export default defineConfig({
  site: url,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
