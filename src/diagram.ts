// The family diagram's drawing: one loop of CSS keyframes, so it moves with
// no script and a still is the same drawing at one moment. Its claim: what
// is noticed lands through one loop, and the landing stops the notice.
//
// The story, one release and one meeting through the loop:
//   1  headwater reports mise 2026.10.10; eddy lists a planning call. Each
//      prints a capture.
//   2  millpond keeps both. The release is its own excerpt, so it is one
//      signal at once; a reader reads the meeting into three. Curation joins
//      two of them into one item and makes the third, a question, an item of
//      its own.
//   3  Each item runs down the flume, which launches one agent in one
//      worktree for it, and tidies the place once the work lands.
//   4  The bump is worked in one worktree, the export in a planner's plan,
//      and the question in a sounding, whose accepted conclusion comes back
//      to millpond as a new item.
//   5  sluice tests each change as merged and lands both on main.
//   6  tailrace publishes what landed: the artifact signed, its verdict
//      attached, and beta moves to it.
//   7  The landed bump moves the pin back upstream, and headwater stops
//      reporting the release.
//
// There are three drawings of the same loop, for three widths of column:
// wide, the stations in a row with the flume standing between the inbox and
// the work, and the return lane beneath; square, for a documentation page's
// column, and tall, for a phone, the stations stacked with the flume lying
// across under the inbox and the return lane up the left. Each station is
// drawn from its origin, so all three share every station's insides and
// every keyframe of opacity; only the origins, and so the moves, differ.

import type { MemberId } from './family';

/** Seconds per loop. */
export const T = 20;
/** The frame shown to a reader who asks for reduced motion, in percent. */
export const STILL = 93;
/** The seven steps' windows, in percent, shared by the drawing and the captions. */
export const STEPS: [number, number][] = [
  [1, 20],
  [20, 45],
  [45, 52],
  [52, 64],
  [64, 76],
  [76, 84],
  [84, 96],
];

const E = 0.8; // fade width, percent
const RESET = 96;

type Pt = [number, number];

interface Layout {
  key: 'w' | 's' | 't';
  W: number;
  H: number;
  title: Pt;
  /** Where the subtitle starts; on the title's line when it is beside it. */
  sub: Pt | 'beside';
  heads: { n: number; label: string; at: Pt; of: MemberId[] }[];
  hw: Pt;
  ed: Pt;
  mp: Pt;
  mpW: number;
  /** The flume: standing upright between the inbox and the work, or lying across. */
  fl: Pt;
  flW: number;
  flH: number;
  upright: boolean;
  wt: Pt;
  pl: Pt;
  /** The two work stations' width; the sounding has its own. */
  wkW: number;
  sd: Pt;
  sdW: number;
  ld: Pt;
  ldW: number;
  /** tailrace, under main; the return lane passes behind it. */
  tr: Pt;
  trW: number;
  /** Each station's hand-on to the next, as a line through its points. */
  links: Pt[][];
  /** The sounding's conclusion, back to millpond as a new item. */
  back: Pt[];
  /** The return lane's height, and the loop's last line under it. */
  lane: number;
  loop: Pt;
}

// Every station's size; millpond, the flume, the work stations and sluice
// take theirs from the layout.
const BOX = { w: 146, h: 90 };
const WK_H = 86;
const MP_H = 190;
const LD_BOX_H = 128;
const MAIN_Y = 160; // main's line, under sluice's box
const TR_H = 98;

const heads = (at: Pt[]): Layout['heads'] => [
  { n: 1, label: 'NOTICE', at: at[0], of: ['headwater', 'eddy'] },
  { n: 2, label: 'INBOX', at: at[1], of: ['millpond'] },
  { n: 3, label: 'LAUNCH', at: at[2], of: ['millpond', 'flume'] },
  { n: 4, label: 'WORK', at: at[3], of: ['sounding'] },
  { n: 5, label: 'LAND', at: at[4], of: ['sluice'] },
  { n: 6, label: 'DELIVER', at: at[5], of: ['tailrace'] },
  { n: 7, label: 'THE LOOP CLOSES', at: at[6], of: ['headwater'] },
];

// The flume stands between millpond and the work column; the sounding's
// conclusion goes back under it, up into millpond under the item it answers.
// tailrace sits under main, where the merges' labels leave no room for its
// step's head, so that head is on the loop's last line, under the lane.
const wide: Layout = {
  key: 'w',
  W: 920,
  H: 456,
  title: [24, 34],
  sub: 'beside',
  heads: heads([[24, 66], [192, 66], [486, 66], [590, 66], [758, 66], [758, 440], [24, 440]]),
  hw: [24, 82],
  ed: [24, 182],
  mp: [192, 82],
  mpW: 274,
  fl: [486, 82],
  flW: 84,
  flH: 274,
  upright: true,
  wt: [590, 82],
  pl: [590, 176],
  wkW: 146,
  sd: [590, 270],
  sdW: 146,
  ld: [758, 82],
  ldW: 140,
  tr: [758, 290],
  trW: 140,
  links: [
    [[170, 127], [192, 127]],
    [[170, 227], [192, 227]],
    [[466, 190], [486, 190]],
    [[570, 125], [590, 125]],
    [[570, 219], [590, 219]],
    [[570, 313], [590, 313]],
    [[736, 125], [758, 144]],
    [[736, 219], [758, 172]],
  ],
  back: [[663, 356], [663, 368], [430, 368], [430, 272]],
  lane: 412,
  loop: [196, 440],
};

// Down the page, for a documentation column: the flume lies across under
// the inbox, the three work stations side by side under it, then sluice,
// then tailrace across under main.
const square: Layout = {
  key: 's',
  W: 520,
  H: 934,
  title: [24, 34],
  sub: 'beside',
  heads: heads([[24, 66], [192, 66], [24, 302], [24, 388], [24, 516], [24, 738], [24, 898]]),
  hw: [24, 82],
  ed: [24, 182],
  mp: [192, 82],
  mpW: 304,
  fl: [24, 314],
  flW: 472,
  flH: 44,
  upright: false,
  wt: [24, 400],
  pl: [186, 400],
  wkW: 146,
  sd: [348, 400],
  sdW: 146,
  ld: [24, 528],
  ldW: 472,
  tr: [24, 750],
  trW: 472,
  links: [
    [[170, 127], [192, 127]],
    [[170, 227], [192, 227]],
    [[447, 272], [447, 314]],
    [[97, 358], [97, 400]],
    [[259, 358], [259, 400]],
    [[421, 358], [421, 400]],
    [[97, 486], [97, 528]],
    [[259, 486], [259, 528]],
  ],
  back: [[494, 443], [508, 443], [508, 177], [496, 177]],
  lane: 872,
  loop: [24, 918],
};

// For a phone: the same, the sounding under the two other work stations
// between their lines down to sluice; its conclusion crosses the plan's line
// on its way back up the right.
const tall: Layout = {
  key: 't',
  W: 344,
  H: 1162,
  title: [24, 34],
  sub: [24, 53],
  heads: heads([[24, 80], [24, 210], [24, 440], [24, 524], [24, 746], [24, 968], [24, 1128]]),
  hw: [24, 92],
  ed: [184, 92],
  mp: [24, 222],
  mpW: 306,
  fl: [24, 452],
  flW: 306,
  flH: 44,
  upright: false,
  wt: [24, 536],
  pl: [188, 536],
  wkW: 142,
  sd: [112, 632],
  sdW: 130,
  ld: [24, 758],
  ldW: 306,
  tr: [24, 980],
  trW: 306,
  links: [
    [[97, 182], [97, 222]],
    [[257, 182], [257, 222]],
    [[281, 412], [281, 452]],
    [[95, 496], [95, 536]],
    [[259, 496], [259, 536]],
    [[177, 496], [177, 632]],
    [[95, 622], [95, 758]],
    [[259, 622], [259, 758]],
  ],
  back: [[242, 690], [337, 690], [337, 300], [330, 300]],
  lane: 1102,
  loop: [24, 1146],
};

// ---- keyframes ----------------------------------------------------------

// A keyframe that moves something belongs to its drawing; one that only
// fades or fills is the same in every drawing, and is written once.
class Sheet {
  css: string[] = [];
  constructor(
    private key: string,
    private shared: Set<string>,
  ) {}

  name(id: string, own = true) {
    return own ? `fd-${this.key}-${id}` : `fd-${id}`;
  }

  kf(id: string, frames: [number, string][], own = true) {
    const name = this.name(id, own);
    if (!own && this.shared.has(name)) return name;
    if (!own) this.shared.add(name);
    const body = frames.map(([p, v]) => `${+p.toFixed(2)}%{${v}}`).join('');
    this.css.push(`@keyframes ${name}{${body}}.${name}{animation:${name} ${T}s linear infinite}`);
    return name;
  }

  /** A class whose opacity is hi inside [a, b] percent and lo outside. */
  show(id: string, a: number, b: number, lo = 0, hi = 1) {
    const o = (v: number) => `opacity:${v}`;
    const f: [number, string][] =
      a <= 0
        ? [[0, o(hi)], [b, o(hi)], [b + E, o(lo)], [100 - E, o(lo)], [100, o(hi)]]
        : [[0, o(lo)], [a - E, o(lo)], [a, o(hi)], [b, o(hi)], [Math.min(b + E, 100), o(lo)]];
    if (a > 0 && b + E < 100) f.push([100, o(lo)]);
    return this.kf(id, f, false);
  }

  /**
   * A token that moves: each stop is a time, a place and an opacity, and a
   * stop marked `ease` eases into the next. The token is drawn at its first
   * place, and the keyframes translate it from there.
   */
  move(id: string, stops: { t: number; at: Pt; o: number; ease?: boolean }[]) {
    const [bx, by] = stops[0].at;
    const f: [number, string][] = stops.map(({ t, at: [x, y], o, ease }) => [
      t,
      `transform:translate(${x - bx}px,${y - by}px);opacity:${o}` +
        (ease ? ';animation-timing-function:cubic-bezier(.45,0,.25,1)' : ''),
    ]);
    if (stops[0].t > 0) f.unshift([0, f[0][1].replace(/;animation-timing-function:[^;]*/, '')]);
    if (stops[stops.length - 1].t < 100) f.push([100, f[0][1]]);
    return this.kf(id, f);
  }
}

// ---- drawing ----------------------------------------------------------------

const add = (a: Pt, dx: number, dy: number): Pt => [a[0] + dx, a[1] + dy];

function arrow(pts: Pt[]) {
  const [x1, y1] = pts[pts.length - 2];
  const [x2, y2] = pts[pts.length - 1];
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = (r: number, d: number) => `${(x2 - Math.cos(a + d) * r).toFixed(1)},${(y2 - Math.sin(a + d) * r).toFixed(1)}`;
  const line = [...pts.slice(0, -1), [x2 - Math.cos(a) * 3, y2 - Math.sin(a) * 3]].map(([x, y]) => `${+x.toFixed(1)},${+y.toFixed(1)}`);
  return (
    `<polyline class="fd-link fd-loop" points="${line.join(' ')}"/>` +
    `<path class="fd-head fd-loop-h" d="M${x2},${y2} L${h(7, 0.45)} L${h(7, -0.45)} Z"/>`
  );
}

const card = (label: string) =>
  `<rect class="fd-card" width="72" height="22" rx="4"/><text class="fd-mono" x="8" y="15">${label}</text>`;
const chip = (label: string, w = 76) =>
  `<rect class="fd-chip" width="${w}" height="18" rx="9"/><text class="fd-mono fd-10" x="9" y="12.6">${label}</text>`;
const item = (label: string, sub?: string) =>
  `<rect class="fd-item" width="70" height="${sub ? 34 : 20}" rx="4"/>` +
  `<text class="fd-mono fd-10 fd-ink" x="7" y="14">${label}</text>` +
  (sub ? `<text class="fd-10 fd-ink fd-soft-ink" x="7" y="28">${sub}</text>` : '');
const change = (label: string) =>
  `<rect class="fd-chg" width="76" height="20" rx="10"/><text class="fd-mono fd-10" x="8" y="14">${label}</text>`;

function bot([x, y]: Pt) {
  return (
    `<g class="fd-bot"><line x1="${x}" y1="${y - 13}" x2="${x}" y2="${y - 8}"/>` +
    `<circle cx="${x}" cy="${y - 14}" r="2"/><rect x="${x - 9}" y="${y - 8}" width="18" height="15" rx="5"/>` +
    `<circle class="fd-eye" cx="${x - 3.5}" cy="${y - 1}" r="1.8"/><circle class="fd-eye" cx="${x + 3.5}" cy="${y - 1}" r="1.8"/></g>`
  );
}

let instances = 0;

function draw(L: Layout, shared: Set<string>): { svg: string; css: string } {
  const s = new Sheet(L.key, shared);
  const out: string[] = [];
  const put = (x: string) => out.push(x);
  const at = (p: Pt, inner: string) => `<g transform="translate(${p[0]} ${p[1]})">${inner}</g>`;
  const fade = (id: string, a: number) => s.show(id, a, RESET);

  // The stations' slots, in the drawing's coordinates.
  const g = (L.mpW - 28 - 218) / 2;
  const col = [14, 14 + 72 + g, 14 + 72 + g + 76 + g];
  const mp = (dx: number, dy: number) => add(L.mp, dx, dy);
  const slot = {
    hwOut: add(L.hw, 64, 34),
    edOut: add(L.ed, 64, 34),
    cap1: mp(col[0], 56),
    cap2: mp(col[0], 104),
    sig: [56, 84, 106, 128].map((y) => mp(col[1], y)),
    item1: mp(col[2], 56),
    item2: mp(col[2], 96),
    item3: mp(col[2], 140),
    wt: add(L.wt, 10, 52),
    pl: add(L.pl, 10, 48),
    sd: add(L.sd, 10, 48),
    laneA: add(L.ld, 10, 52),
    laneB: add(L.ld, 10, 80),
    tr: add(L.tr, 10, 48),
  };
  const mainY = L.ld[1] + MAIN_Y;
  const mx = (f: number) => Math.round(L.ld[0] + 14 + (L.ldW - 28) * f);
  const [x0, xa, xb] = [mx(0), mx(0.4), mx(0.8)];
  const row = L.hw[1] + 45;
  const ret: Pt[] = [[xa, mainY + 27], [xa, L.lane], [10, L.lane], [10, row], [L.hw[0], row]];

  // The frame: Flywheel, the Method the loop belongs to.
  put(`<rect class="fd-frame" width="${L.W}" height="${L.H}"/>`);
  if (L.sub === 'beside') {
    put(
      `<text x="${L.title[0]}" y="${L.title[1]}"><tspan class="fd-title fd-of-flywheel">Flywheel</tspan>` +
        `<tspan class="fd-m fd-sm" dx="10">the Method all of it belongs to</tspan></text>`,
    );
  } else {
    put(`<text class="fd-title fd-of-flywheel" x="${L.title[0]}" y="${L.title[1]}">Flywheel</text>`);
    put(`<text class="fd-m fd-sm" x="${L.sub[0]}" y="${L.sub[1]}">the Method all of it belongs to</text>`);
  }

  // The steps' headers, each lit in its window.
  for (const h of L.heads) {
    const [a, b] = STEPS[h.n - 1];
    const cls = s.show(`h${h.n}`, a, b, 0.42);
    const [x, y] = h.at;
    put(
      `<g class="fd-badge ${cls} ${h.of.map((m) => `fd-of-${m}`).join(' ')}">` +
        `<circle class="fd-badge-c" cx="${x + 8}" cy="${y - 4}" r="8"/>` +
        `<text class="fd-badge-t" x="${x + 8}" y="${y - 0.4}" text-anchor="middle">${h.n}</text>` +
        `<text class="fd-hd" x="${x + 22}" y="${y}">${h.label}</text></g>`,
    );
  }
  put(`<text class="fd-m fd-sm" x="${L.loop[0]}" y="${L.loop[1]}">the landed bump moves the pin to 2026.10.10</text>`);

  // The loop: each station hands on to the next, main's head hands on down
  // to tailrace from under its merge's label, and the return lane closes it.
  put(L.links.map(arrow).join(''));
  put(arrow([[xb, mainY + 25], [xb, L.tr[1]]]));
  put(`<polyline class="fd-halo" points="${L.back.map((p) => p.join(',')).join(' ')}"/>` + arrow(L.back));
  const d = 'M' + ret.map(([x, y]) => `${x},${y}`).join(' L');
  put(`<path class="fd-ret fd-loop" d="${d}"/>`);
  s.kf('retlit', [
    [0, 'stroke-dashoffset:1;opacity:1'],
    [84, 'stroke-dashoffset:1;opacity:1'],
    [92, 'stroke-dashoffset:0;opacity:1'],
    [RESET, 'stroke-dashoffset:0;opacity:1'],
    [RESET + 1.5, 'stroke-dashoffset:0;opacity:0'],
    [98, 'stroke-dashoffset:1;opacity:0'],
    [100, 'stroke-dashoffset:1;opacity:1'],
  ], false);
  put(`<path class="fd-retlit ${s.name('retlit', false)}" d="${d}" pathLength="1"/>`);
  put(arrow([[L.hw[0] - 12, row], [L.hw[0], row]]));

  // headwater: its report of the release, until the pin moves.
  {
    const [x, y] = L.hw;
    put(
      `<g class="fd-st fd-of-headwater"><rect class="fd-box" x="${x}" y="${y}" width="${BOX.w}" height="${BOX.h}" rx="8"/>` +
        `<text class="fd-name" x="${x + 14}" y="${y + 24}">headwater</text></g>`,
    );
    put(
      `<g class="${fade('hwrow', 2)}"><rect class="fd-row" x="${x + 10}" y="${y + 34}" width="126" height="22" rx="5"/>` +
        `<text class="fd-mono" x="${x + 18}" y="${y + 49}">mise 2026.10.10</text></g>`,
    );
    put(`<text class="fd-xs fd-t ${s.show('hws1', 3, 92)}" x="${x + 14}" y="${y + 76}">new release · reported</text>`);
    put(`<text class="fd-xs fd-ok ${s.show('hws2', 92, RESET)}" x="${x + 14}" y="${y + 76}">pinned · not reported</text>`);
  }

  // eddy: a recorded meeting.
  {
    const [x, y] = L.ed;
    put(
      `<g class="fd-st fd-of-eddy"><rect class="fd-box" x="${x}" y="${y}" width="${BOX.w}" height="${BOX.h}" rx="8"/>` +
        `<text class="fd-name" x="${x + 14}" y="${y + 24}">eddy</text></g>`,
    );
    put(
      `<g class="${fade('edrow', 3)}"><rect class="fd-row" x="${x + 10}" y="${y + 34}" width="126" height="22" rx="5"/>` +
        `<text class="fd-mono" x="${x + 18}" y="${y + 49}">Wispr · planning</text>` +
        `<text class="fd-xs fd-m" x="${x + 14}" y="${y + 76}">recorded · 32 min</text></g>`,
    );
  }

  // millpond: the inbox, its three columns and the two sessions that work it.
  {
    const [x, y] = L.mp;
    put(
      `<g class="fd-st fd-of-millpond"><rect class="fd-box" x="${x}" y="${y}" width="${L.mpW}" height="${MP_H}" rx="8"/>` +
        `<text x="${x + 14}" y="${y + 24}"><tspan class="fd-name">millpond</tspan><tspan class="fd-m fd-xs" dx="8">the inbox</tspan></text></g>`,
    );
    ['captures', 'signals', 'items'].forEach((c, i) =>
      put(`<text class="fd-xs fd-m" x="${x + col[i]}" y="${y + 46}">${c}</text>`),
    );
    const tag = (id: string, label: string, cx: number, a: number, b: number) =>
      `<g class="fd-tag ${s.show(id, a, b, 0.45)}"><circle cx="${x + cx + 3}" cy="${y + 172}" r="3"/>` +
      `<text class="fd-xs" x="${x + cx + 11}" y="${y + 176}">${label}</text></g>`;
    put(tag('tagex', 'own excerpt', col[0], 21, 26));
    put(tag('tagrd', 'reader', col[1], 26, 35));
    put(tag('tagcu', 'curation', col[2], 35.5, 45));
  }

  // flume: the channel every item runs down from millpond to its work, its
  // water moving while it carries them.
  {
    const [x, y] = L.fl;
    const flow = s.kf('flow', [[0, 'stroke-dashoffset:0'], [44.5, 'stroke-dashoffset:0'], [52.5, 'stroke-dashoffset:-48'], [100, 'stroke-dashoffset:-48']], false);
    const lines = L.upright
      ? [20, L.flW - 20].map((dx) => `<line class="fd-flow ${flow}" x1="${x + dx}" y1="${y + 40}" x2="${x + dx}" y2="${y + L.flH - 12}"/>`)
      : [14, L.flH - 14].map((dy) => `<line class="fd-flow ${flow}" x1="${x + 70}" y1="${y + dy}" x2="${x + L.flW - 12}" y2="${y + dy}"/>`);
    put(
      `<g class="fd-st fd-of-flume"><rect class="fd-box" x="${x}" y="${y}" width="${L.flW}" height="${L.flH}" rx="8"/>` +
        lines.join('') +
        `<text class="fd-name" x="${x + 14}" y="${y + (L.upright ? 24 : 27)}">flume</text></g>`,
    );
  }

  // The work stations: one worktree, a planner's plan, and a sounding, which
  // works a question in a session of its own until it concludes.
  for (const [p, id, name, sub, w] of [
    [L.wt, 'fd-wt', 'one worktree', 'an agent on one branch', L.wkW],
    [L.pl, 'fd-pl', 'a planner&#39;s plan', 'a chore for a team', L.wkW],
    [L.sd, 'fd-of-sounding', 'sounding', 'works one question', L.sdW],
  ] as const) {
    const [x, y] = p;
    const big = id === 'fd-of-sounding' ? '' : ' fd-13';
    put(
      `<g class="fd-st ${id}"><rect class="fd-box" x="${x}" y="${y}" width="${w}" height="${WK_H}" rx="8"/>` +
        `<text class="fd-name${big}" x="${x + 14}" y="${y + 24}">${name}</text>` +
        `<text class="fd-xs fd-m" x="${x + 14}" y="${y + 40}">${sub}</text></g>`,
    );
  }
  {
    const [bx, by] = add(L.sd, L.sdW - 24, 58);
    const ping = (id: string, a: number) => {
      const f = (t: number, k: number, o: number) => [t, `transform:scale(${k});opacity:${o}`] as [number, string];
      const name = s.kf(id, [f(0, 0.5, 0), f(a, 0.5, 0), f(a + 0.1, 0.5, 0.9), f(a + 2, 2.1, 0), f(a + 2.1, 0.5, 0),
        f(a + 2.2, 0.5, 0.9), f(a + 4.1, 2.1, 0), f(100, 0.5, 0)], false);
      return `<circle class="fd-ping ${name}" cx="${bx}" cy="${by - 1}" r="9"/>`;
    };
    put(`<g class="fd-of-sounding">${ping('ping1', 53)}${ping('ping2', 54)}</g>`);
    put(`<g class="${fade('sdbot', 52.5)}">${bot([bx, by])}</g>`);
    put(`<text class="fd-xs fd-ok ${fade('sdok', 58)}" x="${L.sd[0] + 14}" y="${L.sd[1] + 81}">conclusion accepted</text>`);
    put(`<text class="fd-xs fd-m ${fade('tidy', 74.5)}" x="${L.wt[0] + 14}" y="${L.wt[1] + 66}">landed · tidied</text>`);
  }

  // sluice, and main beneath it.
  {
    const [x, y] = L.ld;
    const bar = L.ldW - 100;
    put(
      `<g class="fd-st fd-of-sluice"><rect class="fd-box" x="${x}" y="${y}" width="${L.ldW}" height="${LD_BOX_H}" rx="8"/>` +
        `<text class="fd-name" x="${x + 14}" y="${y + 24}">sluice</text>` +
        `<text class="fd-xs fd-m" x="${x + 14}" y="${y + 40}">tests each as merged</text>` +
        `<rect class="fd-track" x="${x + 90}" y="${y + 59}" width="${bar}" height="6" rx="3"/>` +
        `<rect class="fd-track" x="${x + 90}" y="${y + 87}" width="${bar}" height="6" rx="3"/>` +
        `<text class="fd-xs fd-m" x="${x + 14}" y="${y + 116}">lands what passed</text></g>`,
    );
    for (const [id, yy, a, b] of [
      ['barA', 59, 68, 72],
      ['barB', 87, 69.5, 73.5],
    ] as const) {
      // Every frame names every property: one left out is interpolated
      // from the frames that name it, across the whole loop.
      const f = (x: number, fill: string, o = 1) => `transform:scaleX(${x});fill:var(--fd-${fill});opacity:${o}`;
      s.kf(id, [
        [0, f(0, 'muted')],
        [a, f(0, 'muted')],
        [b, f(1, 'muted')],
        [b + 0.5, f(1, 'ok')],
        [RESET, f(1, 'ok')],
        [RESET + 1.5, f(1, 'ok', 0)],
        [98, f(0, 'muted')],
        [100, f(0, 'muted')],
      ], false);
      put(`<rect class="fd-bar ${s.name(id, false)}" x="${x + 90}" y="${y + yy}" width="${bar}" height="6" rx="3"/>`);
    }
    put(`<line class="fd-edge" x1="${x + 4}" y1="${mainY}" x2="${x + L.ldW - 4}" y2="${mainY}"/>`);
    put(`<circle class="fd-commit" cx="${x0}" cy="${mainY}" r="4"/>`);
    for (const [id, cx, label, a] of [
      ['mA', xa, 'mise', 73.5],
      ['mB', xb, 'CSV', 75],
    ] as const) {
      put(
        `<g class="${fade(id, a)}"><circle class="fd-merge" cx="${cx}" cy="${mainY}" r="6.5"/>` +
          `<circle class="fd-mergein" cx="${cx}" cy="${mainY}" r="2.6"/>` +
          `<text class="fd-xs fd-mono fd-m" x="${cx}" y="${mainY + 20}" text-anchor="middle">${label}</text></g>`,
      );
    }
    const head = s.move('head', [
      { t: 73, at: [x0, 0], o: 1, ease: true },
      { t: 74, at: [xa, 0], o: 1 },
      { t: 75, at: [xa, 0], o: 1, ease: true },
      { t: 76, at: [xb, 0], o: 1 },
      { t: RESET, at: [xb, 0], o: 1, ease: true },
      { t: 99, at: [x0, 0], o: 1 },
    ]);
    put(
      `<g class="${head}"><rect class="fd-pill" x="${x0 - 19}" y="${y + 136}" width="38" height="16" rx="8"/>` +
        `<text class="fd-pillt" x="${x0}" y="${y + 147.5}" text-anchor="middle">main</text></g>`,
    );
  }

  // ---- what moves ----

  type Stop = { t: number; at: Pt; o: number; ease?: boolean };
  const token = (id: string, stops: Stop[], inner: string) => {
    const cls = s.move(id, stops);
    put(at(stops[0].at, `<g class="${cls}">${inner}</g>`));
  };
  // Appears at `from`, moves to `to`, and keeps to its place until the reset.
  const arrive = (t: number, from: Pt, to: Pt, dur = 3): Stop[] => [
    { t: t - 0.5, at: from, o: 0 },
    { t, at: from, o: 1, ease: true },
    { t: t + dur, at: to, o: 1 },
  ];
  const until = (stops: Stop[], extra: Stop[] = []): Stop[] => {
    const last = [...stops, ...extra].at(-1)!;
    return [...stops, ...extra, { t: RESET, at: last.at, o: last.o }, { t: RESET + 1.5, at: last.at, o: 0 }, { t: 98, at: stops[0].at, o: 0 }];
  };
  const dim = (t: number, at: Pt, o = 0.5): Stop[] => [
    { t, at, o: 1 },
    { t: t + 1, at, o },
  ];
  // A dot that runs a line's points from t0 for dur, at one speed.
  const travel = (id: string, pts: Pt[], t0: number, dur: number, cls: string) => {
    const len = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
    const total = len.reduce((a, b) => a + b, 0);
    let t = t0;
    const stops: Stop[] = [{ t: t0 - 0.5, at: pts[0], o: 0 }, { t, at: pts[0], o: 1 }];
    len.forEach((l, i) => {
      t += (l / total) * dur;
      stops.push({ t, at: pts[i + 1], o: 1 });
    });
    stops.push({ t: t + 1, at: pts.at(-1)!, o: 0 }, { t: 98, at: pts[0], o: 0 });
    token(id, stops, `<circle class="${cls}" r="5"/>`);
  };

  // What moves is drawn in the order it comes out from under: a signal from
  // under its capture, a change from under its item.

  // 2 · captures become signals; curation joins two into one item, and
  // makes the question an item of its own.
  const sigs: [string, number, Pt, number][] = [
    ['bump mise', 22, slot.cap1, 40],
    ['CSV export', 27, slot.cap2, 42.5],
    ['keep JSON', 29, slot.cap2, 42.5],
    ['Parquet?', 31, slot.cap2, 44],
  ];
  sigs.forEach(([label, t, from, used], i) => {
    const to = slot.sig[i];
    token(`sig${i}`, until(arrive(t, add(from, 0, 2), to), dim(used, to)), chip(label));
  });
  // 1 · each tool prints a capture, and millpond keeps it.
  token('capR', until(arrive(6.5, slot.hwOut, slot.cap1, 5.5), dim(25, slot.cap1)), card('release'));
  token('capM', until(arrive(9.5, slot.edOut, slot.cap2, 5.5), dim(34.5, slot.cap2)), card('meeting'));

  for (const [id, a, p] of [
    ['gh1', 45.5, slot.item1],
    ['gh2', 47, slot.item2],
  ] as const) {
    const h = id === 'gh1' ? 20 : 34;
    put(
      `<g class="${fade(id, a)}"><rect class="fd-ghost" x="${p[0]}" y="${p[1]}" width="70" height="${h}" rx="4"/>` +
        `<text class="fd-10 fd-m" x="${p[0] + 7}" y="${p[1] + 14}">sent</text></g>`,
    );
  }

  // 4 · the work goes to sluice, is tested as merged, and lands on main.
  token('chgA', until(arrive(65, slot.wt, slot.laneA, 3)), change('bump mise'));
  token('chgB', until(arrive(66.5, add(slot.pl, 0, 7), slot.laneB, 3)), change('CSV export'));

  // 3 · each item runs down the flume to its work: into the channel, along
  // it to its station, and out; flume launches the agent there, and tidies
  // the worktree once the bump has landed. 4 · the question's sounding
  // concludes, and the conclusion comes back to millpond, where the question
  // was, as a new item.
  const flume = (from: Pt, to: Pt, h: number, t: number): Stop[] => {
    const [x, y] = L.fl;
    const [a, b]: Pt[] = L.upright
      ? [[x + 7, from[1]], [x + 7, to[1]]]
      : [[from[0], y + (L.flH - h) / 2], [to[0], y + (L.flH - h) / 2]];
    return [
      { t, at: from, o: 1, ease: true },
      { t: t + 1, at: a, o: 1, ease: true },
      { t: t + 2.5, at: b, o: 1, ease: true },
      { t: t + 3.5, at: to, o: 1 },
    ];
  };
  token(
    'item1',
    until(arrive(38, slot.sig[0], slot.item1), [...flume(slot.item1, slot.wt, 20, 45), ...dim(74, slot.wt, 0)]),
    item('bump mise'),
  );
  token(
    'item2',
    until(arrive(40, add(slot.sig[1], 0, 6), slot.item2), flume(slot.item2, slot.pl, 34, 46.5)),
    item('CSV export', '2 signals'),
  );
  token('item3', until(arrive(42, slot.sig[3], slot.item3), flume(slot.item3, slot.sd, 20, 49)), item('Parquet?'));
  put(`<g class="${s.show('bot', 49, 74)}">${bot(add(L.wt, L.wkW - 28, 70))}</g>`);
  travel('concl', L.back, 58.5, 3.5, 'fd-concl');
  put(`<g class="${fade('newit', 62)}">${at(slot.item3, item('Parquet'))}</g>`);

  // 7 · the landed bump moves the pin, back up the lane to headwater. The
  // lane passes behind tailrace, so the station is drawn after the pin.
  travel('pin', ret, 84, 8, 'fd-pin');

  // tailrace: what landed, published. 6 · the landing comes down from main's
  // head, is signed with its verdict attached, and beta moves to it.
  {
    const [x, y] = L.tr;
    put(
      `<g class="fd-st fd-of-tailrace"><rect class="fd-box" x="${x}" y="${y}" width="${L.trW}" height="${TR_H}" rx="8"/>` +
        `<text class="fd-name" x="${x + 14}" y="${y + 24}">tailrace</text>` +
        `<text class="fd-xs fd-m" x="${x + 14}" y="${y + 40}">publishes what landed</text></g>`,
    );
    token(
      'dlv',
      until(arrive(76.5, [xb - 38, mainY - 10], slot.tr, 3), dim(79.5, slot.tr, 0)),
      change('bump mise'),
    );
    put(`<g class="${fade('trchip', 80)}">${at(slot.tr, chip('mise · signed', 92))}</g>`);
    // beta: muted until the channel moves to the signed artifact.
    const lit = (id: string, off: string, on: string) =>
      s.kf(id, [[0, off], [82.5, off], [83, on], [RESET, on], [98, off], [100, off]], false);
    const betaR = lit('betar', 'fill:var(--fd-soft)', 'fill:var(--fd-ok)');
    const betaT = lit('betat', 'fill:var(--fd-muted)', 'fill:var(--fd-ink)');
    put(
      `<g class="${fade('trpill', 81.5)}"><rect class="${betaR}" x="${x + 10}" y="${y + 72}" width="38" height="16" rx="8"/>` +
        `<text class="fd-pillt ${betaT}" x="${x + 29}" y="${y + 83.5}" text-anchor="middle">beta</text>` +
        `<text class="fd-xs fd-m" x="${x + 56}" y="${y + 84}">envs converge</text></g>`,
    );
  }

  const n = ++instances;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L.W} ${L.H}" class="fd-svg" role="img" aria-labelledby="fd${n}-t fd${n}-d">` +
    `<title id="fd${n}-t">The Flywheel family: one loop from what is noticed to what lands</title>` +
    `<desc id="fd${n}-d">headwater reports a new release of mise and eddy lists a recorded planning call; each prints a capture, and millpond keeps both. ` +
    `The release is its own excerpt, so it becomes one signal; a reader reads the meeting into three signals. Curation joins two of them into one item and makes the third, a question, an item of its own. ` +
    `Each item runs down the flume, which launches one agent in one worktree for it: the bump in one worktree, the export in a planner&#39;s plan, and the question in a sounding, whose accepted conclusion comes back to millpond as a new item. sluice tests each change as merged and lands both on main, and flume tidies the bump&#39;s worktree. ` +
    `tailrace publishes the landing: signed, with its verdict attached; beta moves to it, and environments converge. ` +
    `The landed bump moves the pin back to headwater, which stops reporting that release. Flywheel is the Method the whole loop belongs to.</desc>` +
    out.join('') +
    `</svg>`;
  return { svg, css: s.css.join('') };
}

/**
 * The three drawings, and the keyframes they and the captions need. A reader
 * who asks for reduced motion gets the drawing stopped at STILL, with every
 * step lit.
 */
export function diagram() {
  const shared = new Set<string>();
  const w = draw(wide, shared);
  const q = draw(square, shared);
  const t = draw(tall, shared);
  const c = new Sheet('c', shared);
  STEPS.forEach(([a, b], i) => c.show(`c-${i + 1}`, a, b, 0.45));
  const still =
    `@media (prefers-reduced-motion:reduce){.fd-svg *{animation-play-state:paused!important;` +
    `animation-delay:${(-(STILL / 100) * T).toFixed(2)}s!important}` +
    `.fd-svg .fd-badge,.fd .fd-cap{animation:none!important;opacity:1}}`;
  return { wide: w.svg, square: q.svg, tall: t.svg, css: w.css + q.css + t.css + c.css.join('') + still };
}
