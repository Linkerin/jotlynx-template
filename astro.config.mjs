// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import websiteConfig from './src/website.config.json';
import deepMerge from './src/utils/deepMerge';

const config = {
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed'
      },
      defaultColor: 'light-dark()'
    }
  },
  integrations: [mdx(), sitemap()],
  prefetch: true
};

// https://astro.build/config
export default defineConfig(
  deepMerge(
    {
      // @ts-ignore
      markdown: {
        shikiConfig: {
          themes: {
            light: 'github-light',
            dark: 'github-dark-dimmed'
          },
          defaultColor: 'light-dark()'
        }
      },
      integrations: [mdx(), sitemap()],
      prefetch: true
    },
    websiteConfig.astro ?? {}
  )
);
