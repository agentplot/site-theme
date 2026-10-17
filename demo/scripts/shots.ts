// Screenshots of the built demo, to judge the theme by eye: every page at a
// desktop and a phone width in both themes, the diagram highlighted for each
// member, and frames of its loop. Run by `devenv shell -- shots [dir]` after
// a build; serves demo/dist itself.
import { chromium, type Page } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const out = resolve(process.argv[2] ?? 'demo/shots');
const dist = resolve(import.meta.dir, '../dist');
const base = '/site-theme';
const T = 20_000; // the loop, src/diagram.ts
mkdirSync(out, { recursive: true });

const server = Bun.serve({
  port: 0,
  async fetch(req) {
    let path = new URL(req.url).pathname.replace(base, '') || '/';
    if (path.endsWith('/')) path += 'index.html';
    const file = Bun.file(join(dist, path));
    return (await file.exists()) ? new Response(file) : new Response('not found', { status: 404 });
  },
});
const origin = `http://localhost:${server.port}${base}`;

// Nix's browsers hold the full Chromium and no headless shell.
const browser = await chromium.launch({ channel: 'chromium' });
type Scheme = 'light' | 'dark';

async function open(path: string, width: number, scheme: Scheme, reduced = false): Promise<Page> {
  const page = await browser.newPage({ viewport: { width, height: width < 600 ? 844 : 900 }, deviceScaleFactor: 2 });
  await page.emulateMedia({ colorScheme: scheme, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  await page.goto(origin + path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

// Stops every animation at one moment of the loop.
async function at(page: Page, pct: number) {
  await page.evaluate((ms) => {
    for (const a of document.getAnimations()) {
      a.pause();
      a.currentTime = ms;
    }
  }, (pct / 100) * T);
}

async function shot(page: Page, name: string, selector?: string) {
  const file = join(out, `${name}.png`);
  if (selector) await page.locator(selector).first().screenshot({ path: file });
  else await page.screenshot({ path: file, fullPage: true });
  console.log(file);
}

for (const scheme of ['light', 'dark'] as const) {
  for (const width of [1280, 390]) {
    const tag = `${width}-${scheme}`;
    let page = await open('/', width, scheme);
    await at(page, 72);
    await shot(page, `starlight-home-${tag}`);
    await page.close();

    page = await open('/page/', width, scheme);
    await shot(page, `starlight-page-${tag}`);
    await page.close();

    page = await open('/plain/flywheel/', width, scheme);
    await at(page, 72);
    await shot(page, `plain-flywheel-${tag}`);
    await page.close();
  }
}

// The diagram in a documentation page's column, beside "On this page".
for (const scheme of ['dark', 'light'] as const) {
  const page = await open('/doc/', 1280, scheme);
  await at(page, scheme === 'dark' ? 72 : 93);
  await shot(page, `starlight-doc-1280-${scheme}`);
  await shot(page, `diagram-doc-1280-${scheme}`, '.fd');
  await page.close();
}

// flywheel-web's palette mapped onto the tokens.
for (const width of [1280, 390]) {
  const page = await open('/plain/flywheel-web/', width, 'dark');
  await at(page, 72);
  await shot(page, `flywheel-web-${width}`);
  await page.close();
}

// The diagram highlighted for each member, wide and tall.
for (const id of ['flywheel', 'headwater', 'eddy', 'millpond', 'sluice']) {
  for (const [width, scheme] of [
    [1280, 'dark'],
    [1280, 'light'],
    [390, 'dark'],
  ] as const) {
    const page = await open(`/plain/${id}/`, width, scheme);
    await at(page, 72);
    await shot(page, `diagram-${id}-${width}-${scheme}`, '.fd');
    await page.close();
  }
}

// Frames of the loop, and the still a reader who asks for less motion gets.
for (const [path, width, scheme] of [
  ['/plain/sluice/', 1280, 'dark'],
  ['/plain/sluice/', 390, 'light'],
  ['/doc/', 1280, 'dark'],
] as const) {
  const page = await open(path, width, scheme);
  for (const pct of [3, 14, 24, 36, 44, 56, 70, 76, 85, 91]) {
    await at(page, pct);
    await shot(page, `frame-${path === '/doc/' ? 'doc' : width}-${scheme}-${String(pct).padStart(2, '0')}`, '.fd');
  }
  await page.close();
  const still = await open(path, width, scheme, true);
  await shot(still, `still-${path === '/doc/' ? 'doc' : width}-${scheme}`, '.fd');
  await still.close();
}

await browser.close();
server.stop();
