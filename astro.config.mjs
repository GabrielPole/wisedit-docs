import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://wisedit-docs.polelove.art',
  integrations: [
    starlight({
      title: 'Wisedit Docs',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'Português',
          lang: 'pt-BR',
        },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/GabrielPole/wisedit-docs',
        },
      ],
      sidebar: [
        {
          label: 'Início',
          autogenerate: { directory: 'inicio' },
        },
        {
          label: 'Funcionalidades',
          autogenerate: { directory: 'funcionalidades' },
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
    }),
  ],
});
