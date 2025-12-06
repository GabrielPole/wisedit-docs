import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://wisedit-docs.polelove.art',
  integrations: [
    starlight({
      title: 'Wisedit Docs',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
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
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon-light.svg',
            type: 'image/svg+xml',
            media: '(prefers-color-scheme: light)',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon-dark.svg',
            type: 'image/svg+xml',
            media: '(prefers-color-scheme: dark)',
          },
        },
      ],
    }),
  ],
});
