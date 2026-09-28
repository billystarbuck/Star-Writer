import { ic, menuBar, base } from './parts.mjs';
import { advCss } from './advanced.mjs';

const css = advCss + `
.pages{display:grid;grid-template-columns:1fr 1fr;gap:22px 8px;padding:10px 12px}
.pg{height:80px;background:#f4f1ea;border-radius:2px;position:relative;box-shadow:0 2px 6px rgba(0,0,0,.4)}
.pg.on{box-shadow:0 0 0 2px var(--a2),0 2px 10px rgba(255,94,138,.4)}
.pg small{position:absolute;bottom:-15px;left:0;right:0;text-align:center;font-size:9.5px;color:var(--muted)}
.pg svg{position:absolute;inset:6px;width:calc(100% - 12px);height:calc(100% - 12px)}
.story{padding:6px 12px 10px;display:flex;flex-direction:column;gap:6px}
.sl2{display:flex;gap:8px;align-items:flex-start;padding:7px 9px;border-radius:8px;background:#1c1b24;font-size:11.5px;line-height:1.35}
.sl2 b{flex:none;font-size:9.5px;padding:2px 6px;border-radius:5px;margin-top:1px}
.sl2 span{color:#d6d3e2}
.page{position:absolute;left:180px;top:62px;width:700px;height:990px;transform:scale(.97);transform-origin:top left;box-shadow:0 30px 70px rgba(0,0,0,.6)}
.trim{position:absolute;border:1.5px solid rgba(94,200,255,.7)}
.bleed{position:absolute;border:1px dashed rgba(255,94,138,.6)}
.launch{position:absolute;display:flex;gap:4px;padding:5px;border-radius:12px;background:rgba(21,20,28,.95);border:1px solid var(--line2);box-shadow:0 10px 30px rgba(0,0,0,.5)}
.launch span{height:30px;padding:0 10px;border-radius:8px;display:flex;align-items:center;gap:6px;font-weight:600;color:#d6d3e2;background:#1c1b24;font-size:11.5px}
.launch span.on{background:var(--grad);color:#1a1320}
.poses{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}
.poses span{height:58px;border-radius:8px;background:#1c1b24;display:flex;align-items:center;justify-content:center}
.poses span.on{box-shadow:inset 0 0 0 1.5px var(--a2);background:rgba(255,94,138,.1)}
`;

const tools = [
  ['G-Pen', '#d9d6e6', 1], ['Mapping pen', '#b8b2cc'], ['Brush pen', '#9a96ac'], ['Vector eraser', '#f1e9dc'],
  ['Panel cut', '#ff5e8a'], ['Panel border', '#ff9a7a'], ['Balloon', '#ffffff'], ['Balloon tail', '#d9d6e6'],
  ['Text', '#d9d6e6'], ['SFX lettering', '#ffc56b'], ['Tone', '#8a8aa0'], ['Gradient tone', '#6c6880'],
  ['Speed lines', '#5ec8ff'], ['Focus lines', '#5ec8ff'], ['Perspective', '#8a6cff'], ['Symmetry', '#8a6cff'],
  ['3D pose', '#4ade80'], ['Fill (refer)', '#f2c46b'], ['Colorize', '#ff7ab8'], ['Line width', '#b8b2cc'],
];

const mini = (cuts) => `<svg viewBox="0 0 70 100" preserveAspectRatio="none">${cuts.map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#222" stroke-width="1.6"/>`).join('')}</svg>`;
const layouts = [
  [[2, 2, 66, 30], [2, 36, 32, 30], [36, 36, 32, 30], [2, 70, 66, 28]],
  [[2, 2, 66, 46], [2, 52, 66, 46]],
  [[2, 2, 40, 60], [46, 2, 22, 60], [2, 66, 66, 32]],
  [[2, 2, 66, 22], [2, 28, 66, 22], [2, 54, 66, 44]],
];

// Mochi, inked manga-style with screentone.
const inkMochi = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" stroke="#111" stroke-width="3.2" stroke-linejoin="round">
  <path d="M-58 -40 L-66 -100 L-18 -66Z M58 -40 L66 -100 L18 -66Z" fill="#fff"/>
  <ellipse cx="0" cy="0" rx="86" ry="74" fill="#fff"/>
  <ellipse cx="0" cy="0" rx="86" ry="74" fill="url(#dots)" stroke="none" mask="url(#lower)"/>
  <path d="M-52 -72 L-58 -88 L-40 -74Z M52 -72 L58 -88 L40 -74Z" fill="url(#dots)" stroke="none"/>
  <ellipse cx="-30" cy="-6" rx="17" ry="24" fill="#111"/><ellipse cx="30" cy="-6" rx="17" ry="24" fill="#111"/>
  <ellipse cx="-24" cy="-16" rx="7" ry="9" fill="#fff" stroke="none"/><ellipse cx="36" cy="-16" rx="7" ry="9" fill="#fff" stroke="none"/>
  <circle cx="-36" cy="6" r="3" fill="#fff" stroke="none"/><circle cx="24" cy="6" r="3" fill="#fff" stroke="none"/>
  <path d="M-10 28 q10 16 20 0 z" fill="#111"/>
  <path d="M-62 14 l10 -6 M-58 22 l10 -6 M52 8 l10 6 M48 16 l10 6" stroke-width="2.4"/>
  <path d="M-96 -60 l-16 -10 M-100 -40 l-20 -2 M96 -60 l16 -10 M100 -40 l20 -2" stroke-width="3"/>
</g>`;

const mannequin = `<g stroke-linecap="round" stroke-linejoin="round">
  <g stroke="#9b99a8" fill="none">
    <path d="M500 520 L470 580 L430 600" stroke-width="16"/>
    <path d="M540 530 L590 560 L620 520" stroke-width="16"/>
    <path d="M510 600 L470 650 L440 700" stroke-width="20"/>
    <path d="M530 600 L580 640 L590 700" stroke-width="20"/>
  </g>
  <path d="M500 515 C 520 505, 545 510, 550 530 L 540 600 C 530 610, 510 610, 505 600Z" fill="#b8b6c4" stroke="#6a6878" stroke-width="2"/>
  <ellipse cx="535" cy="485" rx="24" ry="28" fill="#c8c6d4" stroke="#6a6878" stroke-width="2"/>
  <g fill="#8a8898">${[[470, 580], [590, 560], [470, 650], [580, 640], [500, 520], [540, 530]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7"/>`).join('')}</g>
  <rect x="412" y="450" width="222" height="266" fill="none" stroke="#4ade80" stroke-width="2" stroke-dasharray="6 4"/>
  ${[[412, 450], [634, 450], [412, 716], [634, 716]].map(([x, y]) => `<rect x="${x - 5}" y="${y - 5}" width="10" height="10" fill="#fff" stroke="#4ade80" stroke-width="2"/>`).join('')}
  <g stroke="#4ade80" stroke-width="3" fill="none"><circle cx="523" cy="440" r="14"/><path d="M523 426 v-10"/></g>
</g>`;

const page = `
<svg viewBox="0 0 700 990" width="700" height="990">
  <defs>
    <pattern id="dots" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="3.5" cy="3.5" r="1.5" fill="#111"/></pattern>
    <pattern id="dots2" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="3.5" cy="3.5" r="2.5" fill="#111"/></pattern>
    <linearGradient id="fadeG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
    <mask id="fade"><rect width="700" height="990" fill="url(#fadeG)"/></mask>
    <linearGradient id="lowG" x1="0" y1="0" x2="0" y2="1"><stop offset=".55" stop-color="#000"/><stop offset=".56" stop-color="#fff"/></linearGradient>
    <mask id="lower"><rect x="-100" y="-80" width="200" height="160" fill="url(#lowG)"/></mask>
    <clipPath id="p1"><rect x="40" y="40" width="620" height="300"/></clipPath>
    <clipPath id="p2"><rect x="40" y="362" width="300" height="300"/></clipPath>
    <clipPath id="p3"><rect x="360" y="362" width="300" height="300"/></clipPath>
    <clipPath id="p4"><rect x="40" y="684" width="620" height="266"/></clipPath>
  </defs>
  <rect width="700" height="990" fill="#fbfaf6"/>
  <g clip-path="url(#p1)">
    <rect x="40" y="40" width="620" height="300" fill="url(#dots)" opacity=".55" mask="url(#fade)"/>
    <g fill="#111">
      <path d="M40 340 L40 250 L80 250 L80 210 L120 210 L120 270 L160 270 L160 190 L205 190 L205 240 L240 240 L240 160 L290 160 L290 260 L330 260 L330 220 L380 220 L380 280 L420 280 L420 200 L470 200 L470 250 L520 250 L520 180 L560 180 L560 260 L610 260 L610 230 L660 230 L660 340Z"/>
    </g>
    <g fill="#fff">${Array.from({ length: 26 }, (_, i) => `<rect x="${60 + (i * 23) % 580}" y="${230 + (i * 37) % 90}" width="6" height="8"/>`).join('')}</g>
    <g stroke="#111" stroke-width="2">${Array.from({ length: 18 }, (_, i) => `<line x1="${40 + (i * 53) % 400}" y1="${60 + i * 10}" x2="${260 + (i * 53) % 400}" y2="${60 + i * 10}" opacity=".7"/>`).join('')}</g>
    ${inkMochi(520, 120, .55)}
    <text x="70" y="140" font-family="Mochiy Pop One" font-size="64" fill="#fff" stroke="#111" stroke-width="6" paint-order="stroke" transform="rotate(-8 70 140)">WHOOSH</text>
  </g>
  <g clip-path="url(#p2)">
    <rect x="40" y="362" width="300" height="300" fill="#fbfaf6"/>
    <g stroke="#111" stroke-width="1.6" opacity=".8">${Array.from({ length: 60 }, (_, i) => { const a = i / 60 * Math.PI * 2; return `<line x1="${190 + Math.cos(a) * 120}" y1="${540 + Math.sin(a) * 120}" x2="${190 + Math.cos(a) * 260}" y2="${540 + Math.sin(a) * 260}"/>`; }).join('')}</g>
    ${inkMochi(190, 560, .95)}
    <g>
      <path d="M72 382 h186 a30 30 0 0 1 30 30 v26 a30 30 0 0 1 -30 30 h-96 l-26 34 l4 -34 h-68 a30 30 0 0 1 -30 -30 v-26 a30 30 0 0 1 30 -30z" fill="#fff" stroke="#111" stroke-width="3"/>
      <text x="165" y="418" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="22" fill="#111">Wait for</text>
      <text x="165" y="446" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="22" fill="#111">me—!!</text>
    </g>
  </g>
  <g clip-path="url(#p3)">
    <rect x="360" y="362" width="300" height="300" fill="#fbfaf6"/>
    <g stroke="#8a6cff" stroke-width="1.2" opacity=".7">${Array.from({ length: 14 }, (_, i) => `<line x1="700" y1="300" x2="${340 + i * 26}" y2="700"/>`).join('')}${Array.from({ length: 6 }, (_, i) => `<line x1="700" y1="300" x2="340" y2="${420 + i * 50}"/>`).join('')}</g>
    <g transform="translate(-10 -80) scale(1)">${mannequin}</g>
  </g>
  <g clip-path="url(#p4)">
    <rect x="40" y="684" width="620" height="266" fill="url(#dots2)" opacity=".35"/>
    <rect x="40" y="684" width="620" height="266" fill="url(#dots)" opacity=".6" mask="url(#fade)"/>
    <g fill="#fff" stroke="#111" stroke-width="3">
      <path d="M470 950 C 470 860, 520 820, 560 820 C 600 820, 650 860, 650 950Z"/>
    </g>
    <text x="80" y="820" font-family="Mochiy Pop One" font-size="58" fill="#111" transform="rotate(-6 80 820)">DOKI</text>
    <text x="210" y="900" font-family="Mochiy Pop One" font-size="58" fill="#fff" stroke="#111" stroke-width="5" paint-order="stroke" transform="rotate(-6 210 900)">DOKI</text>
    <g transform="translate(560 800) scale(.35)" stroke="#111" stroke-width="7" fill="#fff"><ellipse cx="0" cy="0" rx="86" ry="74"/><path d="M-58 -40 L-66 -100 L-18 -66Z M58 -40 L66 -100 L18 -66Z"/><path d="M-40 -6 q10 -12 20 0 M20 -6 q10 -12 20 0" fill="none"/></g>
  </g>
  <g fill="none" stroke="#111" stroke-width="5">
    <rect x="40" y="40" width="620" height="300"/><rect x="40" y="362" width="300" height="300"/>
    <rect x="360" y="362" width="300" height="300"/><rect x="40" y="684" width="620" height="266"/>
  </g>
  <line x1="420" y1="660" x2="380" y2="970" stroke="#ff5e8a" stroke-width="3" stroke-dasharray="10 6"/>
</svg>`;

const body = `
${menuBar('Ink & Comic')}
<div class="opts">
  <div class="f" style="gap:8px"><i style="width:10px;height:10px;border-radius:2px;background:#d9d6e6;display:block"></i>G-Pen · Vector ${ic('chev', 12)}</div>
  <div class="vsep"></div>
  <div class="o">Size <div class="f">1.2 mm</div></div>
  <div class="o">Stabilizer <div class="f">S-9 ${ic('chev', 12)}</div></div>
  <div class="o">Pinch <span class="tg on">In</span><span class="tg on">Out</span></div>
  <div class="o">Snap <span class="tg on">Ruler</span><span class="tg">Grid</span><span class="tg on">Vector point</span></div>
  <div class="vsep"></div>
  <div class="o">Smart shape <span class="tg on">Hold to snap</span></div>
  <div class="o">Vector eraser <span class="tg on">To intersection</span></div>
  <div class="vsep"></div>
  <div class="o">Page <div class="f">B5 manga · 600 dpi · Mono + tone ${ic('chev', 12)}</div></div>
</div>

<div class="dockL">
  <div class="ph"><div class="t"><span class="on">Pages</span><span>Story</span><span>Webtoon</span></div>${ic('plus', 15)}</div>
  <div class="pages">${[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => `<div class="pg ${n === 5 ? 'on' : ''}">${mini(layouts[i % 4])}<small>${n === 1 ? 'Cover' : 'p.' + n}</small></div>`).join('')}</div>
  <div class="ph" style="margin-top:14px;border-top:1px solid var(--line)"><div class="t"><span class="on">Story editor</span><span>Notes</span></div>${ic('more', 16, 3)}</div>
  <div class="story">
    <div class="lbl">Page 5 — “The chase”</div>
    <div class="sl2"><b style="background:rgba(255,197,107,.18);color:#ffc56b">P1 SFX</b><span>WHOOSH — Mochi zips across the rooftops</span></div>
    <div class="sl2"><b style="background:rgba(255,94,138,.18);color:#ff8fb0">P2 MOCHI</b><span>“Wait for me—!!”</span></div>
    <div class="sl2"><b style="background:rgba(74,222,128,.15);color:#4ade80">P3 POSE</b><span>Running pose, low angle (3D ref)</span></div>
    <div class="sl2"><b style="background:rgba(255,197,107,.18);color:#ffc56b">P4 SFX</b><span>DOKI DOKI — heart pounding</span></div>
    <div class="sl2" style="opacity:.5"><b style="background:#2a2935;color:var(--muted)">P5</b><span>Close-up: the letter…</span></div>
  </div>
</div>

<div class="dockT">
  <div class="ph"><div class="t"><span class="on">Tools</span><span>Presets</span></div>${ic('plus', 15)}</div>
  <div class="tools">${tools.map(([n, c, on]) => `<div class="tl ${on ? 'on' : ''}"><i style="background:${c}"></i>${n}</div>`).join('')}</div>
  <div class="ph" style="border-top:1px solid var(--line)"><div class="t"><span class="on">Tone</span><span>Vector</span></div></div>
  <div class="props">
    ${[['Lines', 60, 'lpi'], ['Density', 30, '%'], ['Angle', 45, '°'], ['Softness', 10, '']].map(([n, v, u]) => `<div class="pr"><span class="n">${n}</span><div class="tr"><i style="width:${Math.min(v, 100)}%"></i><em>${v}${u}</em></div></div>`).join('')}
    <div class="pr"><span class="n">Dot</span><div class="sel">Circle ${ic('chev', 11)}</div></div>
    <div class="pr"><span class="n">Width fix</span><div class="tr"><i style="width:40%"></i><em>thicken</em></div></div>
    <div class="pr"><span class="n">Smoothing</span><div class="tr"><i style="width:65%"></i><em>65</em></div></div>
  </div>
</div>

<div class="stage">
  <div class="rul h"></div><div class="rul v"></div>
  <div class="tabsC"><span class="on">Mochi Chapter 1.luma — p.5 ${ic('x', 12)}</span><span>Cover art.luma ${ic('x', 12)}</span></div>
  <div class="page">${page}</div>
  <div class="bleed" style="left:166px;top:48px;width:707px;height:988px"></div>
  <div class="trim" style="left:196px;top:78px;width:647px;height:928px"></div>
  <div class="launch" style="left:470px;top:1016px"><span class="on">${ic('select', 13)} Divide panel</span><span>Gutter 20 px</span><span>${ic('plus', 13)} Balloon</span><span>${ic('text', 13)} Text</span><span>Tone</span></div>
</div>

<div class="dockR">
  <div class="ph"><div class="t"><span class="on">Layers</span><span>Tones</span><span>Materials</span></div>${ic('more', 16, 3)}</div>
  ${[
    ['Balloons', 'Text · 3 balloons', 'txt'], ['SFX lettering', 'Vector · outline', 'txt'],
    ['Panels', 'Frame folder · 4', 'folder'], ['Line — Mochi', 'Vector · G-Pen', 'on'],
    ['Tone 60 L · 30%', 'Tone layer', 'tone'], ['3D — Mannequin', 'Running 03', '3d'],
    ['Rough sketch', 'Draft · blue · 30%', 'draft'], ['Paper', 'Manga B5', 'lock'],
  ].map(([n, s, t]) => `<div class="ly ${t === 'on' ? 'on' : ''} ${t === 'draft' ? '' : ''}" style="${t === 'draft' ? 'opacity:.55' : ''};height:42px">
    <span class="ic">${ic(t === 'draft' ? 'eyeoff' : 'eye', 15)}</span>
    <div class="th" style="height:32px;width:44px;${t === 'folder' ? 'background:#23222e;display:flex;align-items:center;justify-content:center;color:var(--a1)' : t === 'tone' ? 'background:radial-gradient(#111 30%,transparent 32%) 0 0/5px 5px,#f4f1ea' : t === '3d' ? 'background:linear-gradient(135deg,#c8c6d4,#8a8898)' : t === 'draft' ? 'background:#e8f0ff' : 'background:#f4f1ea'}">${t === 'folder' ? ic('folder', 16) : ''}</div>
    <div class="nm"><b>${n}</b><small>${s}</small></div><span class="ic">${t === 'lock' ? ic('lock', 14) : ''}</span></div>`).join('')}
  <div class="ph" style="border-top:1px solid var(--line)"><div class="t"><span class="on">3D Pose</span><span>Body shape</span><span>Camera</span></div></div>
  <div class="pb">
    <div class="poses">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<span class="${i === 2 ? 'on' : ''}"><svg viewBox="0 0 40 50" width="34" height="44" stroke="#b8b6c4" stroke-width="3.5" stroke-linecap="round" fill="none"><circle cx="20" cy="9" r="5" fill="#b8b6c4" stroke="none"/><path d="M20 15 v14 M20 29 l${-6 + i % 3 * 3} 14 M20 29 l${6 - i % 2 * 5} 13 M20 18 l${-9 + i % 4 * 2} ${6 + i % 3 * 3} M20 18 l9 ${i % 2 ? -4 : 7}"/></svg></span>`).join('')}</div>
    <div class="sl"><span style="width:74px">Head : body</span><div class="tr"><i style="width:35%"></i><b style="left:35%"></b></div><span class="v">5.5</span></div>
    <div class="sl"><span style="width:74px">Build</span><div class="tr"><i style="width:45%"></i><b style="left:45%"></b></div><span class="v">slim</span></div>
    <div class="sl"><span style="width:74px">Lens</span><div class="tr"><i style="width:70%"></i><b style="left:70%"></b></div><span class="v">24 mm</span></div>
    <div style="display:flex;gap:6px;margin-top:10px"><span class="tg on">Pose from photo</span><span class="tg">3D → line art</span><span class="tg">Hands</span></div>
  </div>
</div>

<div class="status">
  <span><span class="dot"></span><b>Wacom Cintiq Pro 24</b> · pressure 0.48 · tilt 22°</span>
  <span>Page 5 / 24</span><span>B5 · 600 dpi · Mono + tone</span><span>Bleed 3 mm · Trim shown</span>
  <span style="margin-left:auto">Export: PDF · EPUB · CBZ · Webtoon</span><span>Autosaved 8 s ago</span>
</div>
`;

export const comic = () => base('Lumastroke — Ink & Comic', css, body);
