// The theme's demo, both ways a site takes it: a Starlight site, here
// millpond's stand-in, with the family's header, footer and look; and plain
// Astro pages under /plain/, one per member, as flywheel-web would use them.
// It has no package.json of its own: it runs on the package's dev
// dependencies, and reaches the theme by the package's own name and exports
// (`bun run demo`, `bun run demo:build`).
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://agentplot.github.io',
  base: '/site-theme',
  vite: { server: { watch: { ignored: ['**/.devenv/**', '**/.direnv/**'] } } },
  integrations: [
    starlight({
      title: 'millpond',
      description: 'A stand-in for a family member’s Starlight site.',
      customCss: ['@agentplot/site-theme/starlight.css'],
      components: {
        Header: '@agentplot/site-theme/starlight/Header.astro',
        Footer: '@agentplot/site-theme/starlight/Footer.astro',
      },
      sidebar: [
        { label: 'Start', link: '/' },
        { label: 'A page', link: '/page/' },
      ],
    }),
  ],
});
