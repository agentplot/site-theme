// The family diagram's drawing: one loop of CSS keyframes, so it moves with
// no script and a still is the same drawing at one moment. Its claim: what
// is noticed lands through one loop, and the landing stops the notice.
//
// The story, one release and one meeting through the loop:
//   1  headwater reports mise 2026.10.10; eddy lists a planning call. Each
//      prints a capture.
//   2  millpond keeps both. The release is its own excerpt, so it is one
//      signal at once; a reader reads the meeting into three. Curation joins
//      signals into two items and drops one.
//   3  The bump goes to one worktree; the export into a planner's plan.
//   4  sluice tests each change as merged and lands both on main.
//   5  The landed bump moves the pin back upstream, and headwater stops
//      reporting the release.
//
// There are three drawings of the same loop, for three widths of column:
// wide, the stations in a row with the return lane beneath; square, for a
// documentation page's column, the loop turning clockwise through the four
// corners; and tall, for a phone, the stations stacked with the return lane
// up the left. Each station is drawn from its origin, so all three share
// every station's insides and every keyframe of opacity; only the origins,
// and so the moves, differ.

import type { MemberId } from './family';

/** Seconds per loop. */
export const T = 20;
/** The frame shown to a reader who asks for reduced motion, in percent. */
export const STILL = 93;
/** The five steps' windows, in percent, shared by the drawing and the captions. */
export const STEPS: [number, number][] = [
  [1, 20],
  [20, 46],
  [46, 61],
  [61, 78],
  [78, 96],
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
  wt: Pt;
  pl: Pt;
  ld: Pt;
  ldW: number;
  /** Each station's hand-on to the next, as a line through its points. */
  links: Pt[][];
  /** The return lane's height, and the loop's last line under it. */
  lane: number;
  loop: Pt;
}

// Every station's size; millpond and sluice take their width from the layout.
const BOX = { w: 146, h: 90 };
const MP_H = 190;
const LD_BOX_H = 128;
const MAIN_Y = 160; // main's line, under sluice's box

const wide: Layout = {
  key: 'w',
  W: 812,
  H: 344,
  title: [24, 34],
  sub: 'beside',
  heads: [
    { n: 1, label: 'NOTICE', at: [24, 66], of: ['headwater', 'eddy'] },
    { n: 2, label: 'INBOX', at: [192, 66], of: ['millpond'] },
    { n: 3, label: 'WORK', at: [488, 66], of: ['millpond'] },
    { n: 4, label: 'LAND', at: [656, 66], of: ['sluice'] },
    { n: 5, label: 'THE LOOP CLOSES', at: [24, 328], of: ['headwater'] },
  ],
  hw: [24, 82],
  ed: [24, 182],
  mp: [192, 82],
  mpW: 274,
  wt: [488, 82],
  pl: [488, 182],
  ld: [656, 82],
  ldW: 140,
  links: [
    [[170, 127], [192, 127]],
    [[170, 227], [192, 227]],
    [[466, 148], [488, 127]],
    [[466, 195], [488, 227]],
    [[634, 127], [656, 144]],
    [[634, 227], [656, 172]],
  ],
  lane: 300,
  loop: [196, 328],
};

// Clockwise: notice and the inbox across the top, then down to work, back
// along the bottom to land, and up the left to headwater.
const square: Layout = {
  key: 's',
  W: 496,
  H: 600,
  title: [24, 34],
  sub: 'beside',
  heads: [
    { n: 1, label: 'NOTICE', at: [24, 66], of: ['headwater', 'eddy'] },
    { n: 2, label: 'INBOX', at: [192, 66], of: ['millpond'] },
    { n: 3, label: 'WORK', at: [320, 312], of: ['millpond'] },
    { n: 4, label: 'LAND', at: [24, 312], of: ['sluice'] },
    { n: 5, label: 'THE LOOP CLOSES', at: [24, 566], of: ['headwater'] },
  ],
  hw: [24, 82],
  ed: [24, 182],
  mp: [192, 82],
  mpW: 274,
  wt: [320, 328],
  pl: [320, 428],
  ld: [24, 328],
  ldW: 274,
  links: [
    [[170, 127], [192, 127]],
    [[170, 227], [192, 227]],
    [[430, 272], [430, 328]],
    [[466, 236], [482, 236], [482, 473], [466, 473]],
    [[320, 373], [298, 390]],
    [[320, 473], [298, 418]],
  ],
  lane: 540,
  loop: [24, 586],
};

const tall: Layout = {
  key: 't',
  W: 338,
  H: 842,
  title: [24, 34],
  sub: [24, 53],
  heads: [
    { n: 1, label: 'NOTICE', at: [24, 80], of: ['headwater', 'eddy'] },
    { n: 2, label: 'INBOX', at: [24, 210], of: ['millpond'] },
    { n: 3, label: 'WORK', at: [24, 440], of: ['millpond'] },
    { n: 4, label: 'LAND', at: [24, 570], of: ['sluice'] },
    { n: 5, label: 'THE LOOP CLOSES', at: [24, 808], of: ['headwater'] },
  ],
  hw: [24, 92],
  ed: [178, 92],
  mp: [24, 222],
  mpW: 300,
  wt: [24, 452],
  pl: [178, 452],
  ld: [24, 582],
  ldW: 300,
  links: [
    [[97, 182], [97, 222]],
    [[251, 182], [251, 222]],
    [[97, 412], [97, 452]],
    [[251, 412], [251, 452]],
    [[97, 542], [97, 582]],
    [[251, 542], [251, 582]],
  ],
  lane: 790,
  loop: [24, 826],
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
const chip = (label: string) =>
  `<rect class="fd-chip" width="76" height="18" rx="9"/><text class="fd-mono fd-10" x="9" y="12.6">${label}</text>`;
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
    wt: add(L.wt, 10, 52),
    pl: add(L.pl, 10, 50),
    laneA: add(L.ld, 10, 52),
    laneB: add(L.ld, 10, 80),
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

  // The loop: each station hands on to the next, and the return lane closes it.
  put(L.links.map(arrow).join(''));
  const d = 'M' + ret.map(([x, y]) => `${x},${y}`).join(' L');
  put(`<path class="fd-ret fd-loop" d="${d}"/>`);
  s.kf('retlit', [
    [0, 'stroke-dashoffset:1;opacity:1'],
    [79, 'stroke-dashoffset:1;opacity:1'],
    [90, 'stroke-dashoffset:0;opacity:1'],
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
    put(`<text class="fd-xs fd-t ${s.show('hws1', 3, 90.5)}" x="${x + 14}" y="${y + 76}">new release · reported</text>`);
    put(`<text class="fd-xs fd-ok ${s.show('hws2', 90.5, RESET)}" x="${x + 14}" y="${y + 76}">pinned · not reported</text>`);
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
    put(tag('tagcu', 'curation', col[2], 35.5, 44));
  }

  // The two work stations.
  for (const [p, id, name, sub, h] of [
    [L.wt, 'wt', 'one worktree', 'an agent on one branch', BOX.h],
    [L.pl, 'pl', 'a planner&#39;s plan', 'a chore for a team', BOX.h],
  ] as const) {
    const [x, y] = p;
    put(
      `<g class="fd-st fd-${id}"><rect class="fd-box" x="${x}" y="${y}" width="${BOX.w}" height="${h}" rx="8"/>` +
        `<text class="fd-name fd-13" x="${x + 14}" y="${y + 24}">${name}</text>` +
        `<text class="fd-xs fd-m" x="${x + 14}" y="${y + 40}">${sub}</text></g>`,
    );
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
      ['barA', 59, 66, 71],
      ['barB', 87, 67.5, 73],
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
      ['mA', xa, 'mise', 72.5],
      ['mB', xb, 'CSV', 75.5],
    ] as const) {
      put(
        `<g class="${fade(id, a)}"><circle class="fd-merge" cx="${cx}" cy="${mainY}" r="6.5"/>` +
          `<circle class="fd-mergein" cx="${cx}" cy="${mainY}" r="2.6"/>` +
          `<text class="fd-xs fd-mono fd-m" x="${cx}" y="${mainY + 20}" text-anchor="middle">${label}</text></g>`,
      );
    }
    const head = s.move('head', [
      { t: 72, at: [x0, 0], o: 1, ease: true },
      { t: 73, at: [xa, 0], o: 1 },
      { t: 75.5, at: [xa, 0], o: 1, ease: true },
      { t: 76.5, at: [xb, 0], o: 1 },
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

  // What moves is drawn in the order it comes out from under: a signal from
  // under its capture, a change from under its item.

  // 2 · captures become signals; curation joins them into items, and drops one.
  const sigs: [string, number, Pt][] = [
    ['bump mise', 22, slot.cap1],
    ['CSV export', 27, slot.cap2],
    ['keep JSON', 29, slot.cap2],
    ['lunch', 31, slot.cap2],
  ];
  sigs.forEach(([label, t, from], i) => {
    const to = slot.sig[i];
    const later = i === 0 ? dim(40, to) : i < 3 ? dim(42.5, to) : dim(42.5, to, 0.3);
    token(`sig${i}`, until(arrive(t, add(from, 0, 2), to), later), chip(label));
  });
  // 1 · each tool prints a capture, and millpond keeps it.
  token('capR', until(arrive(6.5, slot.hwOut, slot.cap1, 5.5), dim(25, slot.cap1)), card('release'));
  token('capM', until(arrive(9.5, slot.edOut, slot.cap2, 5.5), dim(34.5, slot.cap2)), card('meeting'));
  put(
    `<line class="fd-strike ${s.show('strike', 43, RESET)}" x1="${slot.sig[3][0] + 4}" y1="${slot.sig[3][1] + 9}" x2="${slot.sig[3][0] + 72}" y2="${slot.sig[3][1] + 9}"/>`,
  );

  for (const [id, a, p] of [
    ['gh1', 47.5, slot.item1],
    ['gh2', 49.5, slot.item2],
  ] as const) {
    const h = id === 'gh1' ? 20 : 34;
    put(
      `<g class="${fade(id, a)}"><rect class="fd-ghost" x="${p[0]}" y="${p[1]}" width="70" height="${h}" rx="4"/>` +
        `<text class="fd-10 fd-m" x="${p[0] + 7}" y="${p[1] + 14}">sent</text></g>`,
    );
  }

  // 4 · the work goes to sluice, is tested as merged, and lands on main.
  token('chgA', until(arrive(62, slot.wt, slot.laneA, 4)), change('bump mise'));
  token('chgB', until(arrive(64, add(slot.pl, 0, 7), slot.laneB, 4)), change('CSV export'));

  // 3 · each item goes to one worktree, or into a planner's plan.
  token(
    'item1',
    until(arrive(38, slot.sig[0], slot.item1), [
      { t: 47, at: slot.item1, o: 1, ease: true },
      { t: 52, at: slot.wt, o: 1 },
    ]),
    item('bump mise'),
  );
  token(
    'item2',
    until(arrive(40, add(slot.sig[1], 0, 6), slot.item2), [
      { t: 49, at: slot.item2, o: 1, ease: true },
      { t: 54, at: slot.pl, o: 1 },
    ]),
    item('CSV export', '2 signals'),
  );
  put(`<g class="${fade('bot', 52.5)}">${bot(add(L.wt, BOX.w - 28, 70))}</g>`);

  // 5 · the landed bump moves the pin, back up the lane to headwater.
  {
    const len = ret.slice(1).map((p, i) => Math.hypot(p[0] - ret[i][0], p[1] - ret[i][1]));
    const total = len.reduce((a, b) => a + b, 0);
    let t = 79;
    const stops: Stop[] = [{ t: 78.5, at: ret[0], o: 0 }, { t, at: ret[0], o: 1 }];
    len.forEach((l, i) => {
      t += (l / total) * 11;
      stops.push({ t, at: ret[i + 1], o: 1 });
    });
    stops.push({ t: t + 1, at: ret.at(-1)!, o: 0 }, { t: 98, at: ret[0], o: 0 });
    token('pin', stops, `<circle class="fd-pin" r="5"/>`);
  }

  const n = ++instances;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L.W} ${L.H}" class="fd-svg" role="img" aria-labelledby="fd${n}-t fd${n}-d">` +
    `<title id="fd${n}-t">The Flywheel family: one loop from what is noticed to what lands</title>` +
    `<desc id="fd${n}-d">headwater reports a new release of mise and eddy lists a recorded planning call; each prints a capture, and millpond keeps both. ` +
    `The release is its own excerpt, so it becomes one signal; a reader reads the meeting into three signals. Curation joins the signals into two items and drops one. ` +
    `The bump goes to one worktree and the export into a planner&#39;s plan. sluice tests each change as merged and lands both on main. ` +
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
