// Renders the Lumastoke logo concept sheet and one PNG per concept.
// Usage: NODE_PATH=$(npm root -g) node lumastoke/branding/src/build.mjs
import { createRequire } from 'node:module';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '..');

// Concave 4-point "kira" sparkle.
const kira = (cx, cy, r, fill) =>
  `<path d="M${cx} ${cy - r} Q${cx} ${cy} ${cx + r} ${cy} Q${cx} ${cy} ${cx} ${cy + r} Q${cx} ${cy} ${cx - r} ${cy} Q${cx} ${cy} ${cx} ${cy - r}Z" fill="${fill}"/>`;

// Rounded 5-point star.
const star5 = (cx, cy, R, r, fill, rot = -90) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = ((rot + i * 36) * Math.PI) / 180;
    const d = i % 2 ? r : R;
    pts.push(`${(cx + d * Math.cos(a)).toFixed(1)},${(cy + d * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${fill}" stroke="${fill}" stroke-width="7" stroke-linejoin="round"/>`;
};

const grad = (id, stops, x2 = 1, y2 = 1) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map((c, i) => `<stop offset="${i / (stops.length - 1)}" stop-color="${c}"/>`).join('')}</linearGradient>`;

const marks = {
  drop: (p) => `
    <defs>${grad(p + 'g', ['#FFC56B', '#FF5E9C', '#8A6CFF'], .6, 1)}</defs>
    <path d="M60 8 C 74 30, 98 50, 98 74 A 38 38 0 0 1 22 74 C 22 50, 46 30, 60 8Z" fill="url(#${p}g)"/>
    <path d="M36 70 q0 -16 12 -28" stroke="#fff" stroke-opacity=".75" stroke-width="6" fill="none" stroke-linecap="round"/>
    ${kira(62, 80, 17, '#fff')}
    ${kira(101, 22, 11, '#FFD36B')}<circle cx="88" cy="9" r="3.5" fill="#FF8AB8"/><circle cx="16" cy="36" r="3" fill="#8A6CFF"/>`,

  neko: (p) => `
    <defs>${grad(p + 'g', ['#FFB26B', '#FF6F9C'], .3, 1)}${grad(p + 't', ['#8A6CFF', '#5EC8FF'], 1, 1)}</defs>
    <path d="M100 86 C 118 80, 122 104, 104 114 C 112 102, 108 94, 96 96Z" fill="url(#${p}t)"/>
    <g fill="url(#${p}g)" stroke="url(#${p}g)" stroke-width="7" stroke-linejoin="round">
      <path d="M26 52 L 28 14 L 54 32Z"/><path d="M94 52 L 92 14 L 66 32Z"/>
      <path d="M18 64 C 18 40, 36 30, 60 30 C 84 30, 102 40, 102 64 C 102 88, 84 102, 60 102 C 36 102, 18 88, 18 64Z"/>
    </g>
    <path d="M33 38 L34 23 L45 32Z M87 38 L86 23 L75 32Z" fill="#FFD1DC"/>
    <g stroke="#3A1F4A" stroke-width="5.5" fill="none" stroke-linecap="round">
      <path d="M36 64 q8 -10 16 0"/><path d="M68 64 q8 -10 16 0"/>
      <path d="M52 76 q4 5 8 0 q4 5 8 0" stroke-width="4"/>
    </g>
    <ellipse cx="34" cy="76" rx="8" ry="4.5" fill="#FF4F7B" opacity=".45"/><ellipse cx="86" cy="76" rx="8" ry="4.5" fill="#FF4F7B" opacity=".45"/>
    ${kira(108, 26, 10, '#FFD36B')}${kira(12, 22, 7, '#8A6CFF')}`,

  comet: (p) => `
    <defs>${grad(p + 'g', ['#5EC8FF', '#8A6CFF', '#FF5E9C'], 1, -.6)}</defs>
    <path d="M8 110 C 26 74, 50 54, 80 46 C 58 60, 38 80, 20 114 C 16 118, 8 116, 8 110Z" fill="url(#${p}g)"/>
    <path d="M32 116 C 48 90, 64 76, 86 66 C 70 80, 56 94, 42 118 C 40 121, 32 120, 32 116Z" fill="url(#${p}g)" opacity=".55"/>
    ${star5(84, 38, 30, 14, '#FFD36B', -80)}
    <circle cx="78" cy="38" r="3.4" fill="#3A1F4A"/><circle cx="92" cy="36" r="3.4" fill="#3A1F4A"/>
    <path d="M81 46 q4 4 8 0" stroke="#3A1F4A" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${kira(22, 30, 10, '#FF8AB8')}${kira(112, 84, 8, '#5EC8FF')}<circle cx="44" cy="16" r="3" fill="#FFD36B"/>`,

  eye: (p) => `
    <defs><linearGradient id="${p}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B2A7A"/><stop offset=".45" stop-color="#8A6CFF"/><stop offset=".75" stop-color="#FF5E9C"/><stop offset="1" stop-color="#FFC56B"/></linearGradient>
    <clipPath id="${p}c"><path d="M14 62 C 34 34, 88 32, 108 54 C 104 88, 84 104, 60 104 C 36 104, 18 90, 14 62Z"/></clipPath></defs>
    <path d="M14 62 C 34 34, 88 32, 108 54 C 104 88, 84 104, 60 104 C 36 104, 18 90, 14 62Z" fill="#fff"/>
    <g clip-path="url(#${p}c)">
      <ellipse cx="60" cy="70" rx="28" ry="34" fill="url(#${p}i)"/>
      <ellipse cx="60" cy="66" rx="11" ry="15" fill="#1B1236"/>
      <ellipse cx="48" cy="56" rx="10" ry="8" fill="#fff"/><circle cx="72" cy="84" r="5" fill="#fff"/>
    </g>
    <path d="M8 62 C 28 24, 92 20, 114 48 L 106 56 C 86 34, 34 36, 16 68Z" fill="#2B1F4F"/>
    <path d="M104 46 L 120 32 L 113 54Z M96 38 L 106 22 L 106 42Z" fill="#2B1F4F"/>
    <path d="M34 108 q26 8 52 -2" stroke="#2B1F4F" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".7"/>
    ${kira(18, 22, 11, '#FF8AB8')}${kira(106, 96, 8, '#FFD36B')}`,

  ribbon: (p) => `
    <defs>${grad(p + 'g', ['#4ADEC0', '#5EC8FF', '#8A6CFF'], 1, 1)}</defs>
    <path d="M36 14 L36 82 Q36 100 54 100 L100 100" stroke="url(#${p}g)" stroke-width="28" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="#fff" opacity=".92">
      ${[22, 36, 50, 64].map(y => `<rect x="25.5" y="${y}" width="5" height="7" rx="1.6"/><rect x="41.5" y="${y}" width="5" height="7" rx="1.6"/>`).join('')}
      ${[58, 72, 86].map(x => `<rect x="${x}" y="89.5" width="7" height="5" rx="1.6"/><rect x="${x}" y="105.5" width="7" height="5" rx="1.6"/>`).join('')}
    </g>
    ${kira(88, 40, 20, '#FF5E9C')}${kira(106, 18, 9, '#FFD36B')}<circle cx="70" cy="18" r="4" fill="#FFC56B"/>`,

  mochi: (p) => `
    <defs>${grad(p + 's', ['#8A6CFF', '#5EC8FF'], 1, .4)}${grad(p + 'b', ['#FFD0DC', '#FF9EBB'], 0, 1)}</defs>
    <path d="M88 30 L106 8" stroke="#FFD36B" stroke-width="8" stroke-linecap="round"/><path d="M85 34 L90 27" stroke="#3A1F4A" stroke-width="5" stroke-linecap="round"/>
    <g fill="url(#${p}b)" stroke="url(#${p}b)" stroke-width="6" stroke-linejoin="round">
      <path d="M34 46 L30 18 L52 34Z"/><path d="M86 46 L90 18 L68 34Z"/>
      <ellipse cx="60" cy="64" rx="34" ry="30"/>
    </g>
    <ellipse cx="48" cy="60" rx="5.5" ry="7.5" fill="#2B1F4F"/><ellipse cx="72" cy="60" rx="5.5" ry="7.5" fill="#2B1F4F"/>
    <circle cx="50" cy="57" r="2.2" fill="#fff"/><circle cx="74" cy="57" r="2.2" fill="#fff"/>
    <ellipse cx="38" cy="70" rx="6" ry="3.5" fill="#FF4F7B" opacity=".45"/><ellipse cx="82" cy="70" rx="6" ry="3.5" fill="#FF4F7B" opacity=".45"/>
    <ellipse cx="60" cy="71" rx="3.5" ry="4" fill="#5A1F3A"/>
    <path d="M6 88 C 4 72, 26 70, 36 76 C 44 70, 76 70, 84 76 C 96 68, 116 74, 112 88 C 118 96, 110 108, 98 104 C 94 114, 80 114, 76 106 C 68 114, 52 114, 48 104 C 36 112, 20 108, 22 98 C 10 100, 6 96, 6 88Z" fill="url(#${p}s)"/>
    <circle cx="42" cy="80" r="6.5" fill="#FFD0DC"/><circle cx="78" cy="80" r="6.5" fill="#FFD0DC"/>
    ${kira(18, 40, 10, '#FFD36B')}${kira(110, 52, 7, '#FF5E9C')}`,
};

const concepts = [
  {
    key: 'drop', n: '01', name: 'Spark Drop', font: "'Fredoka'", weight: 700,
    idea: 'The paint drop from the mockups, now with an anime "kira" sparkle and a glossy highlight. Clean and brandable; it scales down to a tiny icon well.',
    slogan: 'Paint the light. Bring it to life.',
    word: '<span class="g">Luma</span>stoke', wg: 'linear-gradient(90deg,#FFB86B,#FF5E9C 60%,#8A6CFF)',
    icon: 'linear-gradient(145deg,#2A1F55,#16122B)', pal: ['#FFC56B', '#FF5E9C', '#8A6CFF', '#16122B'],
  },
  {
    key: 'neko', n: '02', name: 'Neko Brush', font: "'Mochiy Pop One'", weight: 400,
    idea: 'A happy cat face made of paint, with a brush-stroke tail. A mascot-style mark with a chibi feel that reads instantly as "made for anime artists".',
    slogan: 'Draw it. Paint it. Make it move.',
    word: 'Luma<span class="g">stoke</span>', wg: 'linear-gradient(90deg,#FF8A5C,#FF5E9C)',
    icon: 'linear-gradient(145deg,#FFF3E4,#FFE0EA)', pal: ['#FFB26B', '#FF6F9C', '#8A6CFF', '#3A1F4A'],
  },
  {
    key: 'comet', n: '03', name: 'Star Stroke', font: "'Baloo 2'", weight: 800,
    idea: 'A brush stroke that turns into a smiling shooting star. It stands for a sketch taking off and becoming an animation.',
    slogan: 'Every frame, a spark.',
    word: '<span class="g">Lumastoke</span>', wg: 'linear-gradient(90deg,#5EC8FF,#8A6CFF 50%,#FF5E9C)',
    icon: 'linear-gradient(145deg,#3B2A7A,#1C1640)', pal: ['#5EC8FF', '#8A6CFF', '#FF5E9C', '#FFD36B'],
  },
  {
    key: 'eye', n: '04', name: 'Kira Eye', font: "'M PLUS Rounded 1c'", weight: 800,
    idea: 'A sparkling anime eye: an inked lash line and a sunset-gradient iris with classic highlights. The most "anime" of the set, and a bold, iconic look.',
    slogan: 'See it. Draw it. Watch it move.',
    word: 'Luma<span class="g">stoke</span>', wg: 'linear-gradient(90deg,#8A6CFF,#FF5E9C 60%,#FFB86B)',
    icon: 'linear-gradient(145deg,#FFFFFF,#F1ECFF)', pal: ['#2B1F4F', '#8A6CFF', '#FF5E9C', '#FFC56B'],
  },
  {
    key: 'ribbon', n: '05', name: 'Film Ribbon', font: "'Righteous'", weight: 400,
    idea: 'An "L" drawn as a strip of animation film, with a pink sparkle. It says "animation studio" first, with a fresh mint-to-violet palette.',
    slogan: 'Where sketches come alive.',
    word: '<span class="g">Luma</span>stoke', wg: 'linear-gradient(90deg,#4ADEC0,#5EC8FF 50%,#8A6CFF)',
    icon: 'linear-gradient(145deg,#1B2A40,#121826)', pal: ['#4ADEC0', '#5EC8FF', '#8A6CFF', '#FF5E9C'],
  },
  {
    key: 'mochi', n: '06', name: 'Mochi Splash', font: "'Nunito'", weight: 900,
    idea: 'Mochi, a kawaii mascot, pops out of a paint splash holding a stylus. It is the most playful option, and Mochi can greet users, cheer during exports, and appear on stickers and merch.',
    slogan: 'Your art, alive.',
    word: 'Luma<span class="g">stoke</span>', wg: 'linear-gradient(90deg,#8A6CFF,#5EC8FF)',
    icon: 'linear-gradient(160deg,#BFE6FF,#E9D9FF)', pal: ['#FF9EBB', '#8A6CFF', '#5EC8FF', '#FFD36B'],
  },
];

const svg = (key, size, p) => `<svg viewBox="0 0 120 120" width="${size}" height="${size}">${marks[key](p)}</svg>`;

const card = (c) => `
<section class="card" id="c-${c.key}" style="--wg:${c.wg};--font:${c.font};--fw:${c.weight}">
  <header><span class="num">${c.n}</span><div><h2>${c.name}</h2><p>${c.idea}</p></div></header>
  <div class="show">
    <div class="pane light">${svg(c.key, 150, c.key + 'L')}<div class="word">${c.word}</div><div class="slogan">${c.slogan}</div></div>
    <div class="pane dark">${svg(c.key, 150, c.key + 'D')}<div class="word">${c.word}</div><div class="slogan">${c.slogan}</div></div>
  </div>
  <footer>
    <div class="icon" style="background:${c.icon}">${svg(c.key, 96, c.key + 'I')}</div>
    <div class="icon sm" style="background:${c.icon}">${svg(c.key, 50, c.key + 'S')}</div>
    <div class="icon xs" style="background:${c.icon}">${svg(c.key, 26, c.key + 'X')}</div>
    <div class="h">
      <div class="inline">${svg(c.key, 44, c.key + 'H')}<span class="word">${c.word}</span></div>
      <div class="pal">${c.pal.map(x => `<span style="background:${x}"></span>`).join('')}<em>${c.font.replace(/'/g, '')}</em></div>
    </div>
  </footer>
</section>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Lumastoke logo concepts</title>
<link href="fonts/fonts.css" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1920px;background:radial-gradient(1400px 700px at 50% 0,#221C3A,#0E0C16);font-family:Inter,sans-serif;color:#EEECF6;padding:56px 40px 48px;-webkit-font-smoothing:antialiased}
.top{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:36px}
.top h1{font-family:'Fredoka';font-weight:700;font-size:44px}
.top h1 span{background:linear-gradient(90deg,#FFC56B,#FF5E9C,#8A6CFF);-webkit-background-clip:text;color:transparent}
.top p{color:#9C98B4;font-size:16px;max-width:760px;line-height:1.5;text-align:right}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:40px}
.card{background:#17141F;border:1px solid rgba(255,255,255,.08);border-radius:28px;padding:26px;box-shadow:0 30px 60px rgba(0,0,0,.35)}
header{display:flex;gap:18px;align-items:flex-start;margin-bottom:22px;min-height:70px}
.num{font-family:'Fredoka';font-weight:700;font-size:15px;padding:8px 12px;border-radius:12px;background:var(--wg);color:#1A1320}
h2{font-family:var(--font);font-weight:var(--fw);font-size:26px;margin-bottom:6px}
header p{color:#9C98B4;font-size:14px;line-height:1.5}
.show{display:flex;gap:14px}
.pane{flex:1;height:330px;border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}
.pane.light{background:#FFF9F4;color:#2A2140}
.pane.dark{background:#110E1C;color:#fff;border:1px solid rgba(255,255,255,.06)}
.word{font-family:var(--font);font-weight:var(--fw);font-size:46px;letter-spacing:.005em;line-height:1.1}
.word .g{background:var(--wg);-webkit-background-clip:text;color:transparent}
.slogan{font-size:15px;font-weight:600;letter-spacing:.02em;opacity:.7}
footer{display:flex;align-items:center;gap:18px;margin-top:18px}
.icon{width:120px;height:120px;border-radius:28px;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.25)}
.icon.sm{width:64px;height:64px;border-radius:16px}.icon.xs{width:34px;height:34px;border-radius:9px}
.h{margin-left:auto;display:flex;flex-direction:column;align-items:flex-end;gap:14px}
.inline{display:flex;align-items:center;gap:10px}.inline .word{font-size:30px}
.pal{display:flex;gap:8px;align-items:center}.pal span{width:26px;height:26px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(255,255,255,.15)}
.pal em{font-style:normal;color:#8D8AA3;font-size:12px;margin-left:8px}
</style></head><body>
<div class="top"><h1><span>Lumastoke</span> — logo concepts</h1><p>Six directions for a playful, bright brand aimed at young anime-style artists. Each one is shown on light and dark, as an app icon at three sizes, and as a horizontal lockup.</p></div>
<div class="grid">${concepts.map(card).join('')}</div>
</body></html>`;

const file = join(here, 'logos.html');
writeFileSync(file, html);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1200 }, deviceScaleFactor: 1 });
await page.goto('file://' + file, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(out, '00-logo-concepts-overview.png'), fullPage: true });
for (const c of concepts) {
  await page.locator('#c-' + c.key).screenshot({ path: join(out, `${c.n}-logo-${c.key}.png`) });
}
await browser.close();
console.log('done');
