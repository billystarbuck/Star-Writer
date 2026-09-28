// Renders every Lumastoke mockup to PNG.
// Usage: NODE_PATH=$(npm root -g) node lumastoke/mockups/src/build.mjs [name...]
import { createRequire } from 'node:module';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { normal } from './normal.mjs';
import { library } from './library.mjs';
import { advanced } from './advanced.mjs';
import { animation } from './animation.mjs';
import { gallery } from './gallery.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '..');
const htmlDir = join(here, 'html');
mkdirSync(htmlDir, { recursive: true });

const pages = {
  '01-normal-studio-dark': () => normal('dark'),
  '02-normal-brushes-and-color': library,
  '03-advanced-workspace': advanced,
  '04-animation-and-capture': animation,
  '05-gallery-import-export': gallery,
  '06-normal-studio-paper-light': () => normal('light'),
};

const want = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1200 }, deviceScaleFactor: 1 });
for (const [name, make] of Object.entries(pages)) {
  if (want.length && !want.some(w => name.includes(w))) continue;
  const file = join(htmlDir, `${name}.html`);
  writeFileSync(file, make());
  await page.goto('file://' + file, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(out, `${name}.png`) });
  console.log('rendered', name);
}
await browser.close();
