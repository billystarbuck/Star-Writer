// Renders the feature icon badges and cover art used by the build-plan document.
// Usage: NODE_PATH=$(npm root -g) node lumastroke/docs/build-plan/render-assets.mjs
import { createRequire } from 'node:module';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { G } from './glyphs.mjs';
import { SECTIONS, WS } from './features.mjs';
import { logo } from '../../mockups/src/parts.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'assets');
mkdirSync(join(out, 'icons'), { recursive: true });

const hex = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => '#' + hex(a).map((v, i) => Math.round(v + (hex(b)[i] - v) * t).toString(16).padStart(2, '0')).join('');

export const iconFile = (glyph, color) => `icons/${glyph}-${color.slice(1).toLowerCase()}.png`;

const badges = new Map();
for (const s of SECTIONS) {
  badges.set(iconFile('sparkle', s.color), ['sparkle', s.color]);
  for (const [, items] of s.groups) for (const [g] of items) {
    if (!G[g]) throw new Error('missing glyph ' + g);
    badges.set(iconFile(g, s.color), [g, s.color]);
  }
}

for (const [g, c] of WS) badges.set(iconFile(g, c), [g, c]);

const badge = (id, g, c) => `<div class="b" id="${id}" style="background:linear-gradient(145deg,${mix(c, '#ffffff', .78)},${mix(c, '#ffffff', .62)})">
  <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="${mix(c, '#1a1030', .38)}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="${G[g]}"/></svg></div>`;

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="../../branding/src/fonts/fonts.css" rel="stylesheet">
<style>body{margin:0;background:transparent;font-family:Inter}
.wrap{display:flex;flex-wrap:wrap;gap:8px;padding:8px}
.b{width:96px;height:96px;border-radius:24px;display:flex;align-items:center;justify-content:center}
#cover{width:1100px;height:560px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}
#cover .w{font-family:Nunito;font-weight:900;font-size:120px;color:#2A2140;letter-spacing:-.01em;line-height:1}
#cover .w span{background:linear-gradient(90deg,#8A6CFF,#5EC8FF);-webkit-background-clip:text;color:transparent}
#cover .s{font-family:Nunito;font-weight:900;font-size:34px;color:#8A6CFF;letter-spacing:.04em;margin-top:10px}
#mark{width:512px;height:512px;display:flex;align-items:center;justify-content:center}
</style></head><body>
<div id="cover">${logo(250)}<div class="w">Luma<span>stroke</span></div><div class="s">Your art, alive.</div></div>
<div id="mark">${logo(480)}</div>
<div class="wrap">${[...badges].map(([f, [g, c]], i) => badge('b' + i, g, c)).join('')}</div>
</body></html>`;

const file = join(here, 'assets.html');
writeFileSync(file, html);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1 });
await page.goto('file://' + file, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.locator('#cover').screenshot({ path: join(out, 'cover-logo.png'), omitBackground: true });
await page.locator('#mark').screenshot({ path: join(out, 'mochi-mark.png'), omitBackground: true });
let i = 0;
for (const [f] of badges) await page.locator('#b' + i++).screenshot({ path: join(out, f), omitBackground: true });
await browser.close();
console.log('rendered', badges.size, 'icons');
