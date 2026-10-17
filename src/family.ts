// The one list of the family: every site's bar, footer and diagram read it,
// and nothing else names a member, a URL or an accent. Order is the loop's:
// the umbrella first, then what notices, the inbox, and what lands.

export type MemberId = 'flywheel' | 'headwater' | 'eddy' | 'millpond' | 'sluice';

/** Where a member sits in the loop. */
export type Place = 'umbrella' | 'notice' | 'inbox' | 'land';

export type Status = 'in use' | 'designed, not built';

/** A colour for each theme, each 4.5:1 or more against its page but sluice's own light green. */
export interface Pair {
  light: string;
  dark: string;
}

export interface Member {
  id: MemberId;
  name: string;
  line: string;
  place: Place;
  status: Status;
  site: string;
  book: string;
  accent: Pair;
}

const pages = 'https://agentplot.github.io';

export const family: readonly Member[] = [
  {
    id: 'flywheel',
    name: 'Flywheel',
    line: 'The Method for running a fleet of coding agents, and the engine that runs it.',
    place: 'umbrella',
    status: 'in use',
    site: `${pages}/flywheel-web/`,
    book: `${pages}/blueprints/flywheel/`,
    accent: { light: '#7d6110', dark: '#c9a227' },
  },
  {
    id: 'headwater',
    name: 'headwater',
    line: 'Reports releases and advisories for what a repository declares.',
    place: 'notice',
    status: 'designed, not built',
    site: `${pages}/headwater/`,
    book: `${pages}/blueprints/headwater/`,
    accent: { light: '#a8442a', dark: '#ef8a6a' },
  },
  {
    id: 'eddy',
    name: 'eddy',
    line: 'Lists recorded meetings across meeting services.',
    place: 'notice',
    status: 'designed, not built',
    site: `${pages}/eddy/`,
    book: `${pages}/blueprints/eddy/`,
    accent: { light: '#6b4fd8', dark: '#a68cff' },
  },
  {
    id: 'millpond',
    name: 'millpond',
    line: 'The inbox: keeps captures and signals, and sends an item to a worktree.',
    place: 'inbox',
    status: 'designed, not built',
    site: `${pages}/millpond/`,
    book: `${pages}/blueprints/millpond/`,
    accent: { light: '#2160b0', dark: '#6ea8fe' },
  },
  {
    id: 'sluice',
    name: 'sluice',
    line: 'Tests a change as merged and lands it.',
    place: 'land',
    status: 'in use',
    site: `${pages}/sluice/`,
    book: `${pages}/blueprints/sluice/`,
    accent: { light: '#1f8a4c', dark: '#45c27a' },
  },
];

/** The Flywheel site's page of every tool. */
export const hub = `${pages}/flywheel-web/tools/`;

export const member = (id: MemberId): Member => {
  const m = family.find((f) => f.id === id);
  if (!m) throw new Error(`@agentplot/site-theme: no family member "${id}"`);
  return m;
};

/** The member a name or id names, ignoring case, if any. */
export const find = (name: string | undefined): Member | undefined =>
  name ? family.find((f) => f.id === name.toLowerCase() || f.name.toLowerCase() === name.toLowerCase()) : undefined;

/**
 * The site's title on a Starlight page, which names the member whose site it
 * is; nothing on any other page, where Starlight's route data throws.
 */
export const starlightTitle = (locals: object): string | undefined => {
  try {
    return (locals as { starlightRoute?: { siteTitle?: string } }).starlightRoute?.siteTitle;
  } catch {
    return undefined;
  }
};

/**
 * CSS giving a custom property a pair's two values, under the themes both
 * kinds of site use: Starlight's `data-theme` on <html>, and the reader's
 * setting where a page sets none. `:where()` keeps it at no specificity, so
 * a site's own `:root` rule wins.
 */
export const pairCss = (prop: string, pair: Pair): string =>
  `:where(:root){${prop}:${pair.dark}}` +
  `:where(:root[data-theme='light']){${prop}:${pair.light}}` +
  `@media (prefers-color-scheme:light){:where(:root:not([data-theme])){${prop}:${pair.light}}}`;
