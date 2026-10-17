# @agentplot/site-theme

The look the Flywheel family's sites share: one type scale and layout, a
family bar across the top, a family footer, the one list of the family, and
the family diagram. Each site keeps its own accent: sluice its green,
Flywheel its brass.

| Member | Place | Status | Accent, light / dark |
|---|---|---|---|
| Flywheel | umbrella | in use | `#7d6110` / `#c9a227` |
| headwater | notice | designed, not built | `#a8442a` / `#ef8a6a` |
| eddy | notice | designed, not built | `#6b4fd8` / `#a68cff` |
| millpond | inbox | designed, not built | `#2160b0` / `#6ea8fe` |
| sluice | land | in use | `#1f8a4c` / `#45c27a` |

Every accent meets 4.5:1 against its theme's page, except sluice's light
green, which is sluice's own (4.05:1).

Beside the accent, three tokens show a state, the same on every site:

| Token | Means | Light / dark |
|---|---|---|
| `--ap-ok` | passed, landed | `#1f8a4c` / `#45c27a` |
| `--ap-warn` | needs a look: an advisory, a source that has not answered | `#8a5a00` / `#e9b44c` |
| `--ap-bad` | failed | `#c0392b` / `#f08a7e` |

## What it exports

| Export | What |
|---|---|
| `@agentplot/site-theme` | `family`, `member(id)`, `find(name)`, `hub`, `pairCss()`, and the `Member` types |
| `@agentplot/site-theme/tokens.css` | the fonts and the `--ap-*` tokens: type, layout, ink and paper in both themes, `--ap-ok`, `--ap-warn` and `--ap-bad`, `--ap-accent`; styles no element |
| `@agentplot/site-theme/base.css` | the tokens plus a page, headings and a column (`.ap-column`, `.ap-wide`), for a plain site with no stylesheet of its own |
| `@agentplot/site-theme/starlight.css` | the tokens mapped onto Starlight's colours and type (its caution is `--ap-warn`), room for the bar in its header, and the mark's size |
| `@agentplot/site-theme/FamilyBar.astro` | the strip naming the family, the current member marked; it also sets `--ap-accent` from the list |
| `@agentplot/site-theme/FamilyFooter.astro` | each member with its line, status, site and design book |
| `@agentplot/site-theme/Family.astro` | the animated diagram; `highlight` names the member drawn in its accent |
| `@agentplot/site-theme/starlight/Header.astro` | Starlight's header with the bar above it |
| `@agentplot/site-theme/starlight/Footer.astro` | Starlight's footer, then the family's |
| `@agentplot/site-theme/starlight/Banner.astro` | the status banner on every page while the tool is designed, not built |

`src/family.ts` is the one list: a member, its URLs and its accents are
named there and nowhere else. A new member is a new entry there.

## On a Starlight site

```js
// astro.config.mjs
starlight({
  title: 'sluice', // names the current member
  customCss: ['@agentplot/site-theme/starlight.css'],
  components: {
    Header: '@agentplot/site-theme/starlight/Header.astro',
    Footer: '@agentplot/site-theme/starlight/Footer.astro',
    Banner: '@agentplot/site-theme/starlight/Banner.astro',
  },
});
```

The bar, the footer and the banner find the current member from the site's
title, so they take no props here.

- **The mark.** Every family mark is drawn in sluice's frame, a 112 by 88
  view box, and `starlight.css` draws it `--ap-mark-height` (1.5rem) tall,
  `--ap-mark-gap` (0.75rem) from the title, at every width. A site sets no
  size of its own.
- **The status banner.** While the tool's status in `family.ts` is
  "designed, not built", every page, splash or not, opens with "<tool> is
  designed, not built. Its design book holds the design whole.", linked to
  the tool's book, in line with the page's text; a page's own `banner` is
  not shown. Once the tool is in use the banner is gone, and a page's own
  `banner` shows as Starlight draws it. The accent comes from the list; a site that wants
Starlight's exact accent shades sets `--sl-color-accent-low`,
`--sl-color-accent` and `--sl-color-accent-high` in a stylesheet after the
theme's, as sluice's `brand.css` does today.

The diagram goes in any page:

```mdx
import Family from '@agentplot/site-theme/Family.astro';

<Family highlight="sluice" />
```

## On a plain Astro site

```astro
---
import '@agentplot/site-theme/tokens.css'; // or base.css, with no stylesheet of your own
import FamilyBar from '@agentplot/site-theme/FamilyBar.astro';
import FamilyFooter from '@agentplot/site-theme/FamilyFooter.astro';
import Family from '@agentplot/site-theme/Family.astro';
---
<html lang="en" data-theme="dark">
  <body>
    <FamilyBar current="flywheel" />
    <main>… <Family highlight="flywheel" /> …</main>
    <FamilyFooter current="flywheel" />
  </body>
</html>
```

Themes follow Starlight's: dark on `:root`, light under
`:root[data-theme='light']`, and a page with no `data-theme` follows the
reader's setting. A site with one theme, as flywheel-web is dark, sets
`data-theme` on `<html>`. A site with its own palette maps it onto the
tokens, so the bar, footer and diagram take its colours:

```css
:root {
  --ap-bg: var(--ground);
  --ap-bg-2: var(--ground-deep);
  --ap-bg-3: var(--ground-2);
  --ap-fg: var(--bone);
}
```

## The diagram

One loop, from what is noticed to what lands. headwater and eddy notice
events and print captures; millpond keeps them as an inbox, captures become
signals, and curation joins signals into items; an item goes to one
worktree or into a planner's plan; sluice tests the work as merged and lands
it; and the landed bump moves the pin, so headwater stops reporting that
release. Flywheel is the Method the loop belongs to.

It is CSS keyframes only (`src/diagram.ts`), a 20-second loop, so it moves
with scripts off. It draws three copies and shows one by the figure's own
width, so a site changes nothing to get the right one: wide, the stations in
a row, from 44rem; square, the loop turning clockwise through four corners,
from 32rem, which is the column of a Starlight page that keeps "On this
page" (39.5rem at 1280 pixels); and tall below that, on a phone. Under
the drawing the five steps are text, each lit while it plays. A reader who
asks for reduced motion gets the drawing stopped at the loop's last step,
with every station holding what passed through it, and every step lit; a
button pauses it for anyone else.

## Installing

Until it is published, a site depends on this checkout:

```json
"@agentplot/site-theme": "file:/Users/chuck/Code/github_agentplot/site-theme/main"
```

bun links each of the package's files into the site, so an edit shows at
once and a new file needs `bun install` again. Once the repository is on
GitHub and tagged:

```json
"@agentplot/site-theme": "github:agentplot/site-theme#v0.1.0"
```

The package ships its source: `.astro`, `.ts` and `.css` that the site's
Astro compiles. It needs `astro` 7.2 or later, and `@astrojs/starlight` 0.42
or later for the Starlight parts.

## Working on it

```sh
devenv shell             # bun and Playwright's Chromium, from devenv.nix
bun run demo             # http://localhost:4321/site-theme/
shots [dir]              # build the demo and screenshot it into dir
```

The demo in `demo/` takes the theme both ways: a Starlight site standing in
for millpond's, plain Astro pages under `/plain/<member>/`, one per member
with the diagram highlighted for it, and `/plain/flywheel-web/`, with
flywheel-web's palette mapped onto the tokens. `/doc/` is an ordinary
Starlight page with the diagram beside "On this page". It has no package.json of its
own: it runs on this package's dev dependencies and reaches the theme by
the package's name and exports, as a site does. `shots` writes each page at
1280 and 390 pixels in both themes, the diagram for each member, ten frames
of the loop and the reduced-motion still.

## Licence

MIT, in `LICENSE`.
