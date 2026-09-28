// Shared building blocks for the Lumastroke UI mockups.

const P = {
  gallery: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z',
  wand: 'M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5',
  select: 'M4 7V4h3M10 4h4M17 4h3v3M20 10v4M20 17v3h-3M14 20h-4M7 20H4v-3M4 14v-4',
  move: 'M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20',
  brush: 'M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z',
  smudge: 'M8 13V4.5a1.5 1.5 0 0 1 3 0V12M11 11.5v-2a1.5 1.5 0 1 1 3 0V12M14 10.5a1.5 1.5 0 0 1 3 0V12M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-5-2.7L3.7 13.2a1.5 1.5 0 0 1 .5-2 1.9 1.9 0 0 1 2.3.3L8 13',
  eraser: 'M7 21l-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21M22 21H7M5 11l9 9',
  layers: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  undo: 'M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11',
  redo: 'M15 14l5-5-5-5M20 9H9.5a5.5 5.5 0 0 0 0 11H13',
  dropper: 'M2 22l1-1h3l9-9M3 21v-3l9-9M15 6l3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4z',
  fill: 'M19 11l-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11zM5 2l5 5M2 13h15M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4z',
  text: 'M4 7V4h16v3M9 20h6M12 4v16',
  hand: 'M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-5.9-2.4L3.3 16.8a2 2 0 0 1 3-2.6L8 16',
  zoom: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3',
  cam: 'M16 13l5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11M4 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z',
  film: 'M3 3h18v18H3zM7 3v18M17 3v18M3 7.5h4M3 12h18M3 16.5h4M17 7.5h4M17 16.5h4',
  play: 'M7 4l13 8-13 8V4z',
  pause: 'M7 4h3v16H7zM14 4h3v16h-3z',
  back: 'M19 20L9 12l10-8v16zM5 19V5',
  fwd: 'M5 4l10 8-10 8V4zM19 5v14',
  loop: 'M17 2l4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3',
  plus: 'M12 5v14M5 12h14',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  eyeoff: 'M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.6 3.4M6.6 6.6C3.8 8.4 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  folder: 'M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z',
  import: 'M12 3v12M7 10l5 5 5-5M5 21h14',
  share: 'M12 15V3M7 8l5-5 5 5M5 21h14',
  drop: 'M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4',
  wind: 'M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2',
  sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  sparkle: 'M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z',
  chev: 'M6 9l6 6 6-6',
  chevr: 'M9 6l6 6-6 6',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  tablet: 'M3 5h18v12H3zM8 21h8M12 17v4',
  pen: 'M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.6 7.6M11 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  mask: 'M3 3h18v18H3zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  trash: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6',
  merge: 'M8 6l4-4 4 4M12 2v10.3a4 4 0 0 1-1.2 2.9L6 20M18 20l-3.6-3.6',
  clip: 'M4 4v8a4 4 0 0 0 4 4h12M16 12l4 4-4 4',
  rotate: 'M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5',
  grid: 'M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18',
  image: 'M3 3h18v18H3zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21',
  check: 'M20 6 9 17l-5-5',
  x: 'M18 6 6 18M6 6l12 12',
  wave: 'M2 12h2l2-6 3 12 3-15 3 18 3-12 2 6h2',
  onion: 'M12 21a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8 5.5A7 7 0 0 1 19 11M5 11a7 7 0 0 1 3-5.5',
  ruler: 'M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0zM14.5 12.5l2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2',
  cloud: 'M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9z',
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0',
};

export const ic = (n, s = 20, sw = 1.7, fill = false) =>
  `<svg class="i" viewBox="0 0 24 24" width="${s}" height="${s}" fill="${fill ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"><path d="${P[n]}"/></svg>`;

// Lumastroke logo mark: Mochi popping out of a paint splash (concept 06).
const kira = (cx, cy, r, fill) =>
  `<path d="M${cx} ${cy - r} Q${cx} ${cy} ${cx + r} ${cy} Q${cx} ${cy} ${cx} ${cy + r} Q${cx} ${cy} ${cx - r} ${cy} Q${cx} ${cy} ${cx} ${cy - r}Z" fill="${fill}"/>`;
let logoId = 0;
export const logo = (s = 28, sparkles = true) => {
  const p = 'mo' + logoId++;
  return `<svg width="${s}" height="${s}" viewBox="0 0 120 120" style="flex:none;display:block">
  <defs><linearGradient id="${p}s" x1="0" y1="0" x2="1" y2=".4"><stop offset="0" stop-color="#8A6CFF"/><stop offset="1" stop-color="#5EC8FF"/></linearGradient>
  <linearGradient id="${p}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD0DC"/><stop offset="1" stop-color="#FF9EBB"/></linearGradient></defs>
  <path d="M88 30 L106 8" stroke="#FFD36B" stroke-width="8" stroke-linecap="round"/><path d="M85 34 L90 27" stroke="#3A1F4A" stroke-width="5" stroke-linecap="round"/>
  <g fill="url(#${p}b)" stroke="url(#${p}b)" stroke-width="6" stroke-linejoin="round">
    <path d="M34 46 L30 18 L52 34Z"/><path d="M86 46 L90 18 L68 34Z"/><ellipse cx="60" cy="64" rx="34" ry="30"/>
  </g>
  <ellipse cx="48" cy="60" rx="5.5" ry="7.5" fill="#2B1F4F"/><ellipse cx="72" cy="60" rx="5.5" ry="7.5" fill="#2B1F4F"/>
  <circle cx="50" cy="57" r="2.2" fill="#fff"/><circle cx="74" cy="57" r="2.2" fill="#fff"/>
  <ellipse cx="38" cy="70" rx="6" ry="3.5" fill="#FF4F7B" opacity=".45"/><ellipse cx="82" cy="70" rx="6" ry="3.5" fill="#FF4F7B" opacity=".45"/>
  <ellipse cx="60" cy="71" rx="3.5" ry="4" fill="#5A1F3A"/>
  <path d="M6 88 C 4 72, 26 70, 36 76 C 44 70, 76 70, 84 76 C 96 68, 116 74, 112 88 C 118 96, 110 108, 98 104 C 94 114, 80 114, 76 106 C 68 114, 52 114, 48 104 C 36 112, 20 108, 22 98 C 10 100, 6 96, 6 88Z" fill="url(#${p}s)"/>
  <circle cx="42" cy="80" r="6.5" fill="#FFD0DC"/><circle cx="78" cy="80" r="6.5" fill="#FFD0DC"/>
  ${sparkles ? kira(18, 40, 10, '#FFD36B') + kira(110, 52, 7, '#FF5E9C') : ''}
</svg>`;
};

// Advanced-mode workspace switcher.
export const workspaces = ['Paint', 'Ink & Comic', 'Animate', 'Rig & Motion', 'Capture', 'Share'];
export const wsTabs = (active) => `<div class="ws">${workspaces.map(w => `<span class="${w === active ? 'on' : ''}">${w}</span>`).join('')}</div>`;

// Advanced-mode menu bar, shared by every Advanced workspace.
export const menus = ['File', 'Edit', 'Canvas', 'Layer', 'Select', 'Paint', 'Filter', 'Comic', 'Animate', 'Rig', 'Capture', 'View', 'Window', 'Help'];
export const menuBar = (active) => `<div class="menu">${logo(24, false)}${menus.map(m => `<span class="m">${m}</span>`).join('')}
  <div class="r">${wsTabs(active)}${toggle(true)}</div></div>`;

// Shared SVG filters that give painted shapes a watercolor / paper feel.
export const filters = `
<svg width="0" height="0" style="position:absolute">
  <defs>
    <filter id="wc" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency=".013" numOctaves="3" seed="4" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="wc2" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="4" seed="9" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feGaussianBlur in="d" stdDeviation=".7"/>
    </filter>
    <filter id="bleed" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="b"/>
      <feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="3" seed="2" result="n"/>
      <feDisplacementMap in="b" in2="n" scale="40" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" result="t"/>
      <feColorMatrix in="t" type="matrix" values="0 0 0 0 .35  0 0 0 0 .3  0 0 0 0 .25  0 0 0 -1.4 .9"/>
      <feComposite in2="SourceGraphic" operator="in"/>
    </filter>
    <filter id="bristle" x="-5%" y="-30%" width="110%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency=".9 .02" numOctaves="2" seed="3" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 3 -1.1" result="m"/>
      <feComposite in="SourceGraphic" in2="m" operator="in" result="c"/>
      <feDisplacementMap in="c" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="chalk" x="-5%" y="-30%" width="110%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="2" seed="11" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 4 -1.6" result="m"/>
      <feComposite in="SourceGraphic" in2="m" operator="in"/>
    </filter>
    <filter id="soft"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="soft4"><feGaussianBlur stdDeviation="4"/></filter>
  </defs>
</svg>`;

// The in-progress painting shown on the canvas: a watercolor/oil evening lake.
export const art = (opts = {}) => {
  const { unfinished = true } = opts;
  return `
<svg class="art" viewBox="0 0 1600 1200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#23205a"/><stop offset=".32" stop-color="#5b3b82"/>
      <stop offset=".55" stop-color="#c9658f"/><stop offset=".7" stop-color="#ff9a7a"/><stop offset="1" stop-color="#ffd9a0"/>
    </linearGradient>
    <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffc48f"/><stop offset=".25" stop-color="#d27593"/><stop offset=".7" stop-color="#4a3a7a"/><stop offset="1" stop-color="#1f2150"/>
    </linearGradient>
    <radialGradient id="sunG"><stop offset="0" stop-color="#fff6dc"/><stop offset=".35" stop-color="#ffe0a6"/><stop offset="1" stop-color="#ffb07a" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1600" height="1200" fill="#f1e9dc"/>
  <g filter="url(#wc)">
    <rect x="-40" y="-40" width="1680" height="820" fill="url(#sky)"/>
  </g>
  <circle cx="1010" cy="610" r="330" fill="url(#sunG)" opacity=".9"/>
  <circle cx="1010" cy="640" r="70" fill="#fff3d6" filter="url(#soft4)"/>
  <g filter="url(#wc2)" opacity=".55">
    <path d="M60 180 C 360 120, 620 230, 980 170 S 1450 140, 1600 200" stroke="#8a5ca8" stroke-width="46" fill="none" stroke-linecap="round"/>
    <path d="M-20 300 C 300 260, 700 350, 1100 290 S 1500 270, 1640 320" stroke="#b76a9c" stroke-width="30" fill="none" stroke-linecap="round" opacity=".7"/>
    <path d="M200 420 C 500 390, 800 450, 1250 400" stroke="#f0a08a" stroke-width="22" fill="none" stroke-linecap="round" opacity=".8"/>
  </g>
  <g filter="url(#wc)">
    <path d="M-40 720 L120 560 L240 640 L380 470 L520 610 L640 520 L780 660 L900 600 L1000 700 L-40 760Z" fill="#6a4d8f" opacity=".75"/>
    <path d="M700 740 L860 600 L980 680 L1120 540 L1260 650 L1380 580 L1520 690 L1660 640 L1660 760 L700 780Z" fill="#5a4486" opacity=".7"/>
    <path d="M-40 790 L180 650 L320 720 L460 620 L640 760 L820 700 L1000 780 L-40 800Z" fill="#3a2f63" opacity=".9"/>
    <path d="M900 800 L1080 690 L1220 760 L1400 670 L1660 770 L1660 810 L900 810Z" fill="#33295a" opacity=".9"/>
  </g>
  <g filter="url(#wc)">
    <rect x="-40" y="785" width="1680" height="460" fill="url(#lake)"/>
  </g>
  <g opacity=".55" filter="url(#wc2)">
    <rect x="880" y="820" width="260" height="8" rx="4" fill="#fff1d0"/>
    <rect x="930" y="860" width="180" height="6" rx="3" fill="#ffe2b0"/>
    <rect x="850" y="900" width="320" height="7" rx="3" fill="#ffd0a0" opacity=".7"/>
    <rect x="960" y="945" width="120" height="5" rx="3" fill="#fff1d0"/>
    <rect x="300" y="880" width="380" height="5" rx="3" fill="#f7b3a3" opacity=".5"/>
    <rect x="1250" y="930" width="260" height="5" rx="3" fill="#f7b3a3" opacity=".5"/>
  </g>
  <g filter="url(#wc2)" fill="#1b1838">
    ${[[70, 800, 1], [150, 820, 1.25], [245, 790, .9], [330, 830, 1.1], [1440, 815, 1.2], [1530, 800, .95]].map(([x, y, s]) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 -330 L45 -230 L20 -235 L70 -140 L30 -145 L95 -40 L-95 -40 L-30 -145 L-70 -140 L-20 -235 L-45 -230Z"/>
      <rect x="-8" y="-45" width="16" height="60"/>
    </g>`).join('')}
  </g>
  <g filter="url(#wc)" opacity=".85">
    <path d="M-40 1060 C 300 1000, 700 1080, 1100 1030 S 1500 1040, 1660 1000 L1660 1240 L-40 1240Z" fill="#241f47"/>
  </g>
  ${unfinished ? `
  <g>
    <path d="M1090 1240 C 1120 1150, 1180 1110, 1260 1090 C 1340 1070, 1420 1010, 1500 1000 C 1560 990, 1620 980, 1660 960 L1660 1240Z" fill="#f1e9dc" filter="url(#wc2)"/>
    <g stroke="#6b6070" stroke-width="2" fill="none" opacity=".55" stroke-linecap="round">
      <path d="M1250 1180 C 1300 1150, 1360 1140, 1420 1150"/>
      <path d="M1300 1200 q 40 -60 90 -30 t 80 10"/>
      <path d="M1380 1110 l 20 -40 l 18 40 M1392 1090 h 16"/>
      <path d="M1520 1080 c 20 30, 40 30, 60 0"/>
    </g>
    <path d="M1130 1210 C 1180 1150, 1250 1120, 1330 1100" stroke="#3b2f63" stroke-width="26" fill="none" stroke-linecap="round" opacity=".45" filter="url(#wc2)"/>
  </g>` : ''}
  <rect width="1600" height="1200" fill="#fff" filter="url(#grain)" opacity=".22"/>
</svg>`;
};

// A short stroke preview used in brush lists / docks.
export const stroke = (kind, color, w = 220, h = 44) => {
  const d = `M12 ${h * .62} C ${w * .22} ${h * .15}, ${w * .38} ${h * .95}, ${w * .55} ${h * .5} S ${w * .82} ${h * .2}, ${w - 12} ${h * .45}`;
  const body = {
    watercolor: `<path d="${d}" stroke="${color}" stroke-width="${h * .42}" fill="none" stroke-linecap="round" opacity=".55" filter="url(#wc2)"/><path d="${d}" stroke="${color}" stroke-width="${h * .12}" fill="none" stroke-linecap="round" opacity=".35" filter="url(#wc2)"/>`,
    oil: `<path d="${d}" stroke="${color}" stroke-width="${h * .42}" fill="none" stroke-linecap="butt" filter="url(#bristle)"/><path d="${d}" stroke="#fff" stroke-opacity=".25" stroke-width="${h * .08}" fill="none" transform="translate(0 -4)" filter="url(#bristle)"/>`,
    gouache: `<path d="${d}" stroke="${color}" stroke-width="${h * .38}" fill="none" stroke-linecap="round" filter="url(#wc2)"/>`,
    pencil: `<path d="${d}" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#chalk)"/><path d="${d}" stroke="${color}" stroke-width="2" fill="none" transform="translate(0 3)" opacity=".6" filter="url(#chalk)"/>`,
    pastel: `<path d="${d}" stroke="${color}" stroke-width="${h * .4}" fill="none" stroke-linecap="round" filter="url(#chalk)"/>`,
    ink: `<path d="M12 ${h * .6} C ${w * .25} ${h * .1}, ${w * .4} ${h * .9}, ${w * .56} ${h * .48} S ${w * .82} ${h * .15}, ${w - 12} ${h * .42} C ${w * .82} ${h * .32}, ${w * .6} ${h * .62}, ${w * .5} ${h * .62} S ${w * .25} ${h * .3}, 12 ${h * .6}Z" fill="${color}"/>`,
    airbrush: `<path d="${d}" stroke="${color}" stroke-width="${h * .5}" fill="none" stroke-linecap="round" opacity=".6" filter="url(#soft4)"/>`,
    marker: `<path d="${d}" stroke="${color}" stroke-width="${h * .3}" fill="none" stroke-linecap="square" opacity=".7"/>`,
  }[kind];
  return `<svg class="stroke" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`;
};

export const toggle = (adv = false) => `
<div class="mode ${adv ? 'is-adv' : ''}"><span class="${adv ? '' : 'on'}">Normal</span><span class="${adv ? 'on' : ''}">${ic('sparkle', 13, 2)} Advanced</span></div>`;

export const base = (title, css, body, theme = 'dark') => `<!doctype html>
<html data-theme="${theme}"><head><meta charset="utf-8"><title>${title}</title>
<link href="../fonts/fonts.css" rel="stylesheet">
<style>
:root{
  --bg:#0c0c12; --bg2:#15141d; --panel:rgba(24,23,33,.78); --solid:#17161f; --solid2:#1d1c27; --field:#23222e;
  --line:rgba(255,255,255,.07); --line2:rgba(255,255,255,.12);
  --text:#eeecf6; --muted:#8d8aa3; --dim:#5f5c72;
  --a1:#FFC56B; --a2:#FF5E8A; --a3:#8A6CFF; --acc:#FF7A7A;
  --grad:linear-gradient(120deg,var(--a1),var(--a2) 50%,var(--a3));
  --wet:#5EC8FF;
}
[data-theme=light]{
  --bg:#ece7df; --bg2:#f4f0ea; --panel:rgba(252,250,246,.82); --solid:#faf8f4; --solid2:#f1ede6; --field:#e9e4dc;
  --line:rgba(40,30,20,.08); --line2:rgba(40,30,20,.14);
  --text:#26222b; --muted:#7d7684; --dim:#aaa3ad;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1920px;height:1200px;overflow:hidden}
body{font-family:Inter,system-ui,sans-serif;color:var(--text);background:var(--bg);font-size:13px;-webkit-font-smoothing:antialiased;position:relative}
.i{display:block;flex:none}
.glass{background:var(--panel);backdrop-filter:blur(22px) saturate(1.3);border:1px solid var(--line2);box-shadow:0 20px 50px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.05)}
[data-theme=light] .glass{box-shadow:0 18px 40px rgba(60,40,20,.14),inset 0 1px 0 #fff}
.art{display:block;width:100%;height:100%}
.mode{display:inline-flex;align-items:center;padding:3px;border-radius:999px;background:var(--field);border:1px solid var(--line2);font-weight:600;font-size:12px}
.mode span{display:flex;align-items:center;gap:5px;padding:6px 14px;border-radius:999px;color:var(--muted)}
.mode span.on{color:#1a1320;background:var(--grad);box-shadow:0 4px 14px rgba(255,94,138,.35)}
.btn{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:12px;color:var(--text);opacity:.85}
.btn.on{color:var(--a2);opacity:1;background:rgba(255,94,138,.12)}
.lbl{font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:600}
.mono{font-family:'JetBrains Mono',monospace}
.stroke{display:block}
.menu{position:absolute;left:0;right:0;top:0;height:40px;display:flex;align-items:center;padding:0 12px;gap:0;background:#131219;border-bottom:1px solid var(--line);font-size:12px}
.menu .m{padding:6px 8px;border-radius:7px;color:#c9c6d8;font-weight:500}
.menu .m:first-of-type{margin-left:8px}
.menu .r{margin-left:auto;display:flex;align-items:center;gap:12px}
.ws{display:flex;gap:2px;padding:3px;border-radius:10px;background:var(--field);border:1px solid var(--line)}
.ws span{padding:5px 11px;border-radius:7px;font-weight:600;color:var(--muted);font-size:11.5px}
.ws span.on{background:var(--solid2);color:var(--text);box-shadow:inset 0 -2px 0 var(--a2),0 2px 8px rgba(0,0,0,.3)}
.mode{font-size:11.5px}.menu .mode span{padding:5px 11px}
${css}
</style></head><body>${filters}${body}</body></html>`;
