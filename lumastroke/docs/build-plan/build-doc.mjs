// Builds "Lumastroke — Build Plan.docx".
// Usage: NODE_PATH=$(npm root -g) node lumastroke/docs/build-plan/build-doc.mjs
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SECTIONS, WS } from './features.mjs';

const require = createRequire(import.meta.url);
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, HeadingLevel, PageBreak, BorderStyle, LevelFormat, TableOfContents, Header, Footer,
  PageNumber, VerticalAlign, TableLayoutType,
} = require('docx');

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const img = (p) => readFileSync(join(root, p));

// ---------- palette & helpers ----------
const C = { violet: '6E4FE0', pink: 'E8457A', ink: '2A2140', muted: '6B6680', sky: '2E9BD6', line: 'E4DFF2', tint: 'F4F0FF', warm: 'FFF6EE' };
const W = 9360; // content width (DXA) for US Letter with 1" margins

const t = (text, o = {}) => new TextRun({ text, font: 'Calibri', size: 22, color: C.ink, ...o });
const p = (children, o = {}) => new Paragraph({ spacing: { after: 120, line: 300 }, ...o, children: Array.isArray(children) ? children : [t(children)] });
const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)], pageBreakBefore: true });
const h2 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] });
const h3 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(text)] });
const bullet = (runs, level = 0) => new Paragraph({ numbering: { reference: 'bullets', level }, spacing: { after: 60, line: 288 }, children: Array.isArray(runs) ? runs : [t(runs)] });
const lead = (label, text) => bullet([t(label, { bold: true }), t(' — ' + text)]);
const image = (path, w, h, o = {}) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 80 }, ...o, children: [new ImageRun({ type: 'png', data: img(path), transformation: { width: w, height: h } })] });
const caption = (text) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, children: [t(text, { italics: true, size: 18, color: C.muted })] });
const spacer = (after = 120) => new Paragraph({ spacing: { after }, children: [] });

const border = { style: BorderStyle.SINGLE, size: 4, color: C.line };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorders = { top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' } };

const cell = (children, width, o = {}) => new TableCell({
  borders, width: { size: width, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
  margins: { top: 80, bottom: 80, left: 110, right: 110 },
  ...o, children: Array.isArray(children) ? children : [p([t(String(children))], { spacing: { after: 0 } })],
});
const headCell = (text, width, fill = C.violet) => cell([p([t(text, { bold: true, color: 'FFFFFF', size: 20 })], { spacing: { after: 0 } })], width, { shading: { fill, type: ShadingType.CLEAR, color: 'auto' } });

const table = (widths, header, rows, o = {}) => new Table({
  width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths, layout: TableLayoutType.FIXED,
  rows: [
    ...(header ? [new TableRow({ tableHeader: true, children: header.map((h, i) => headCell(h, widths[i], o.headFill)) })] : []),
    ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => c instanceof TableCell ? c : cell(typeof c === 'string' ? [p([t(c, { size: 20 })], { spacing: { after: 0 } })] : c, widths[i], ri % 2 ? { shading: { fill: 'FAF8FF', type: ShadingType.CLEAR, color: 'auto' } } : {})) })),
  ],
});

// A soft, shaded callout box (single-cell table).
const callout = (title, lines, fill = C.tint, accent = C.violet) => new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: [W],
  rows: [new TableRow({ children: [new TableCell({
    width: { size: W, type: WidthType.DXA },
    borders: { ...noBorders, left: { style: BorderStyle.SINGLE, size: 24, color: accent } },
    shading: { fill, type: ShadingType.CLEAR, color: 'auto' },
    margins: { top: 160, bottom: 160, left: 240, right: 240 },
    children: [
      ...(title ? [p([t(title, { bold: true, color: accent, size: 24 })], { spacing: { after: 80 } })] : []),
      ...lines.map(l => typeof l === 'string' ? p([t(l)], { spacing: { after: 60, line: 290 } }) : l),
    ],
  })] })],
});

// ---------- content ----------
const SRC = { R: 'Rebelle', S: 'SAI', C: 'Clip Studio EX', M: 'Moho Pro', L: 'Lumastroke original' };
const MODE = { N: ['Normal', 'E8457A'], S: ['Normal (simple)', 'D9822B'], A: ['Advanced', '6E4FE0'] };
const iconFile = (g, c) => `docs/build-plan/assets/icons/${g}-${c.slice(1).toLowerCase()}.png`;
const iconPara = (g, c, s = 30) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [new ImageRun({ type: 'png', data: img(iconFile(g, c)), transformation: { width: s, height: s } })] });
const featureCount = SECTIONS.reduce((n, s) => n + s.groups.reduce((m, [, i]) => m + i.length, 0), 0);

const cover = [
  spacer(600),
  image('docs/build-plan/assets/cover-logo.png', 520, 265),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 80 }, children: [t('BUILD PLAN', { bold: true, size: 44, color: C.violet, characterSpacing: 60 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [t('Vision, design, features and roadmap for Lumastroke — a 2D art & animation studio', { size: 26, color: C.muted })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [t('Version 1.0  ·  September 2026', { size: 22, color: C.muted })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [t(`${featureCount} planned features  ·  6 workspaces  ·  9 UI mockups  ·  6 logo concepts`, { size: 20, color: C.muted })] }),
];

const toc = [
  new Paragraph({ pageBreakBefore: true, spacing: { after: 200 }, children: [t('Contents', { bold: true, size: 40, color: C.violet })] }),
  new TableOfContents('Contents', { hyperlink: true, headingStyleRange: '1-2' }),
  p([t('Tip: if page numbers look out of date, right-click the table of contents in Word and choose "Update Field".', { italics: true, size: 18, color: C.muted })], { spacing: { before: 200 } }),
];

const vision = [
  h1('1. The Vision'),
  callout('Lumastroke in one sentence', ['A beautifully designed, feature-rich 2D art and animation program that feels as simple as Procreate, paints as realistically as Rebelle, runs as deep as SAI and Clip Studio Paint EX, and animates like Moho Pro, made for young artists who love anime-style drawing.']),
  spacer(),
  h2('1.1 What Lumastroke is'),
  p('Lumastroke is one studio for still art and animation. An artist can sketch a character, ink it, paint it with realistic watercolor or oils, lay it out as a manga page, and bring it to life, either frame by frame or with a bone rig, without ever leaving the app or exporting between programs.'),
  h2('1.2 Who it is for'),
  bullet([t('Primary: ', { bold: true }), t('young artists (teens to early twenties) who draw anime and manga-style characters, fan art, OCs (original characters), comics, webtoons and short animations.')]),
  bullet([t('Secondary: ', { bold: true }), t('hobbyist and semi-pro illustrators, indie animators and VTuber-style creators who want painting and animation in one place.')]),
  bullet([t('Mindset: ', { bold: true }), t('they want art to look amazing fast, are willing to learn deeper tools over time, and care a lot about how the app looks and feels.')]),
  h2('1.3 The promise'),
  table([2400, 6960], ['Inspiration', 'What Lumastroke takes from it'], [
    ['Procreate', 'Simplicity: a canvas-first layout, a handful of obvious tools, gestures, and nothing confusing on screen.'],
    ['Rebelle', 'Realistic paint: wet watercolor that bleeds and blooms, thick oils, pigment mixing, paper texture, tilt, blow and dry.'],
    ['PaintTool SAI', 'A precise, lightweight brush engine: stabilizer, Blending / Dilution / Persistence, linework layers, perspective rulers.'],
    ['Clip Studio Paint EX', 'Comics and manga: pages, panels, balloons, tones, vector ink, 3D poses, and a pro frame-by-frame timeline.'],
    ['Moho Pro', 'Rigged animation: bones, Smart Bones, switch layers, lip-sync, physics, meshes and a graph editor.'],
  ]),
  spacer(),
  h2('1.4 Design pillars'),
  lead('Easy first, powerful always', 'Normal mode is calm and obvious. Advanced mode holds every tool. One toggle switches between them, and the artwork never changes.'),
  lead('Beautiful by default', 'It is an art program, so it has to look like one: dark "studio glass" panels, a luminous accent gradient, and the artwork as the brightest thing on screen.'),
  lead('Real media, real fast', 'Physical paint behavior with a GPU brush engine that keeps up with a fast pen.'),
  lead('Made for anime artists', 'Line art, flats, cel shading, manga tones, speed lines, chibi rigs and lip-sync are first-class tools, not afterthoughts.'),
  lead('Every device is a creative tool', 'Drawing pads of all kinds, microphones and cameras plug straight into the creative flow.'),
  lead('Opens anything, exports anywhere', 'Wide import and export support so artists are never locked in.'),
  lead('Playful and bright', 'Mochi the mascot, sparkles and a friendly tone, while staying out of the way when an artist is focused.'),
];

const brand = [
  h1('2. Brand Identity'),
  h2('2.1 Name, logo and slogan'),
  table([3000, 6360], null, [[
    cell([image('docs/build-plan/assets/mochi-mark.png', 170, 170, { spacing: { after: 0 } })], 3000, { borders: { ...noBorders } }),
    cell([
      p([t('Lumastroke', { bold: true, size: 48, color: C.violet })], { spacing: { after: 40 } }),
      p([t('"Luma" (light) + "stroke" (a brush stroke): art that glows and moves.', { color: C.muted })]),
      p([t('Slogan: ', { bold: true }), t('Your art, alive.', { bold: true, color: C.pink })]),
      p([t('Logo: ', { bold: true }), t('Mochi Splash. Mochi, a kawaii cat-eared mascot, pops out of a paint splash holding a stylus. Playful, bright and instantly "anime".')]),
    ], 6360, { borders: { ...noBorders } }),
  ]]),
  spacer(),
  image('branding/06-logo-mochi.png', 600, 419),
  caption('The chosen logo on light and dark backgrounds, as an app icon at three sizes, and as a horizontal lockup.'),
  h2('2.2 Alternate slogans'),
  p('Keep these for campaigns, splash screens and merch:'),
  ...['Draw it. Paint it. Make it move.', 'Every frame, a spark.', 'Sketch it. Color it. Animate it.', 'Your story, frame by frame.', 'Make your characters breathe.', 'From first line to final frame.'].map(s => bullet(s)),
  h2('2.3 Color palette'),
  table([1500, 2200, 1700, 3960], ['Swatch', 'Name', 'Hex', 'Used for'], [
    ['FF9EBB', 'Mochi Pink', '#FF9EBB', 'Mascot, warm highlights, merch'],
    ['8A6CFF', 'Luma Violet', '#8A6CFF', 'Primary brand color, Advanced mode, links'],
    ['5EC8FF', 'Sky Splash', '#5EC8FF', 'Wet paint indicators, capture, secondary accent'],
    ['FFD36B', 'Sparkle Gold', '#FFD36B', 'Sparkles, stars, celebration moments'],
    ['FF5E8A', 'Active Rose', '#FF5E8A', 'The active tool, selections, playhead'],
    ['16122B', 'Studio Ink', '#16122B', 'Dark UI background'],
    ['FFF9F4', 'Paper', '#FFF9F4', 'Light "Paper" theme background'],
  ].map(([fill, ...rest]) => [cell([p('')], 1500, { shading: { fill, type: ShadingType.CLEAR, color: 'auto' } }), ...rest])),
  spacer(),
  h2('2.4 Typography'),
  lead('Logo & playful headings', 'Nunito Black (rounded and friendly).'),
  lead('Interface', 'Inter: clean, highly legible at small sizes, with tabular numbers for sliders.'),
  lead('Numbers & code', 'JetBrains Mono, for timecodes and values.'),
  lead('Comic lettering samples', 'Fredoka and Mochiy Pop One for SFX and balloon demos (final lettering fonts to be licensed).'),
  h2('2.5 Mochi the mascot'),
  bullet('Appears on the splash screen, in empty states ("No artworks yet, let\'s make one!"), in first-use tips in Normal mode, and when exports finish.'),
  bullet('Never blocks the canvas, and can be turned off with one tap.'),
  bullet('Future: stickers, merch, a sample rig included with the app so users can learn rigging on Mochi.'),
  h2('2.6 Logo exploration'),
  p('Six directions were explored before choosing Mochi Splash. They are kept here for reference and possible secondary use, for example Kira Eye as an achievement badge.'),
  image('branding/00-logo-concepts-overview.png', 600, 675),
  caption('Logo concepts 01–06. Concept 06, Mochi Splash, was selected.'),
];


const org = [
  h1('3. How Lumastroke Is Organized'),
  h2('3.1 Two modes, one document'),
  table([4680, 4680], ['Normal mode — the studio', 'Advanced mode — the workshop'], [[
    [p('A full-screen canvas. Across the top: Gallery, Actions, Adjust, Select and Transform on the left; Brush, Smudge, Eraser, Layers and Color on the right. Size and Opacity sliders on the left edge. The Quick Dock along the bottom.', { spacing: { after: 60 } }), p('Every feature marked "Normal" in this plan appears here as a simple, one-tap version.')],
    [p('A menu bar, the workspace tabs, a contextual options bar, docked panels (SAI / Clip Studio style), a tool grid, and a status bar showing the connected pen, microphone and camera.', { spacing: { after: 60 } }), p('Every setting and every tool. Panels can be moved, saved as workspaces and shared.')],
  ]]),
  spacer(),
  callout('The placement rule', ['If a beginner has to understand a feature before using it, it lives in Advanced mode, and Normal mode gets a friendly preset of it. Example: SAI\'s three mixing settings become a single "Blend" slider in Normal mode.'], C.warm, C.pink),
  spacer(),
  h2('3.2 The six workspaces'),
  p('Workspaces are saved layouts of panels for a job. They are tabs in the top bar in Advanced mode, and they all share the same .LUMA file.'),
  table([900, 1900, 2600, 3960], ['Icon', 'Workspace', 'Built for', 'Main panels'],
    WS.map(([g, c, n, f, pn]) => [cell([iconPara(g, c, 34)], 900), n, f, pn])),
  spacer(),
  h2('3.3 Advanced mode menu bar'),
  p([t('File · Edit · Canvas · Layer · Select · Paint · Filter · Comic · Animate · Rig · Capture · View · Window · Help', { bold: true, color: C.violet })]),
  h2('3.4 Feature map'),
  p('The poster below shows every feature sorted by workspace, tagged with the program that inspired it, and marked ● Normal or ○ Advanced.'),
  image('mockups/09-feature-map.png', 624, 390),
  caption('Feature map: where everything lives.'),
];

const MOCKS = [
  ['01-normal-studio-dark', 'Normal mode — the studio (dark)', ['The canvas fills the screen: the Procreate-style layout.', 'Left edge: Size and Opacity sliders with an eyedropper button, plus undo and redo.', 'Quick Dock: recent brushes shown as real strokes, color history, the Wet ↔ Dry meter, and mic and camera buttons.', 'A friendly hint explains that the paint is still wet.']],
  ['02-normal-brushes-and-color', 'Normal mode — brush library & color', ['Brush library with realistic stroke previews on paper, and tags such as WET, BLEEDS and BRISTLE.', 'Color popover: a Procreate-style disc, history, and a Rebelle-style pigment mixing palette.', 'A "Realistic paint" switch and brush import (.abr, .brushset, .sut).']],
  ['03-advanced-workspace', 'Advanced — Paint workspace', ['SAI-style docks: Navigator, HSV wheel and sliders, swatches and scratch pad.', 'Tool grid and brush-size dots; Blending, Dilution and Persistence plus Wetness, Paint load, Granulation and Edge darken.', 'Layers with WET badges, clipping and folders; a Paint Physics panel (Wet all, Dry all, Blow, tilt dial).', 'Workspace tabs and the Normal / Advanced toggle in the top bar.']],
  ['04-animation-and-capture', 'Animate — frame-by-frame with voice & video', ['Onion skins in pink (before) and green (after).', 'Timeline tracks: voice take with phoneme tags, line, paint, background and camera reference.', 'Reference capture window with face tracking and a live mic meter.']],
  ['05-gallery-import-export', 'Gallery, import & export', ['Home screen with Start painting, Animate, Capture and Open anything cards.', 'Connected devices strip (tablets, microphone, camera).', 'Share sheet with image, animation, project, print and time-lapse formats.']],
  ['06-normal-studio-paper-light', 'Normal mode — Paper (light) theme', ['The same studio in a warm, light theme for daytime work.']],
  ['07-advanced-ink-and-comic', 'Advanced — Ink & Comic workspace', ['Page manager and story editor on the left.', 'Manga page with a vector G-pen, speed lines, speech balloons, SFX lettering and screen tones.', '3D pose mannequin with perspective rulers; bleed and trim guides; a floating selection action bar.']],
  ['08-advanced-rig-and-motion', 'Advanced — Rig & Motion workspace', ['Mochi rigged with FK/IK bones, a Smart Bone dial for head turns, a curver on the tail and dynamics on the ears.', 'Actions library and switch-layer mouth shapes on the left.', 'Graph editor with easing curves and an automatic lip-sync track.']],
];

const mocks = [
  h1('4. UI Mockups'),
  p('These concept screens set the look and layout for Lumastroke. Each image is 1920 × 1200, and the full-size files are listed in Appendix A.'),
  ...MOCKS.flatMap(([f, title, pts], i) => [
    ...(i && i % 2 === 0 ? [new Paragraph({ children: [new PageBreak()] })] : []),
    h2(`4.${i + 1} ${title}`),
    image(`mockups/${f}.png`, 624, 390),
    caption(`Mockup ${f.slice(0, 2)} — ${title}`),
    ...pts.map(x => bullet(x)),
  ]),
];

const legend = callout('How to read the feature tables', [
  p([t('Icon', { bold: true }), t(' — the proposed toolbar / menu icon for that feature. Icons are tinted with their workspace color.')], { spacing: { after: 40 } }),
  p([t('Inspired by', { bold: true }), t(' — Rebelle · SAI · Clip Studio EX · Moho Pro · Lumastroke original.')], { spacing: { after: 40 } }),
  p([t('Where it shows', { bold: true }), t(' — '), t('Normal', { bold: true, color: MODE.N[1] }), t(' (in the simple studio), '), t('Normal (simple)', { bold: true, color: MODE.S[1] }), t(' (a one-tap version in Normal mode, full controls in Advanced), '), t('Advanced', { bold: true, color: MODE.A[1] }), t(' (Advanced mode only).')], { spacing: { after: 0 } }),
]);

const catalog = [
  h1('5. Feature Catalog'),
  p(`All ${featureCount} planned features and abilities, grouped the way they appear in the app. Every feature has a proposed icon.`),
  legend,
  ...SECTIONS.flatMap((s, si) => [
    spacer(),
    h2(`5.${si + 1} ${s.title}`),
    p([t(s.intro, { italics: true, color: C.muted })]),
    ...s.groups.flatMap(([g, items]) => [
      h3(g),
      table([760, 2080, 3720, 1500, 1300], ['Icon', 'Feature', 'What it does', 'Inspired by', 'Where'], items.map(([ic, name, desc, from, mode]) => [
        cell([iconPara(ic, s.color)], 760),
        [p([t(name, { bold: true, size: 20 })], { spacing: { after: 0 } })],
        desc,
        [p([t(from.split('').map(k => SRC[k]).join(', '), { size: 18, color: C.muted })], { spacing: { after: 0 } })],
        [p([t(MODE[mode][0], { bold: true, size: 18, color: MODE[mode][1] })], { spacing: { after: 0 } })],
      ]), { headFill: s.color.slice(1) === 'FFC56B' ? 'C98A1A' : s.color.slice(1) === '4ADE80' ? '1F9D55' : s.color.slice(1) === '5EC8FF' ? '2E86C1' : s.color.slice(1) === 'FF9EBB' ? 'D6477A' : s.color.slice(1) === 'FF9A5C' ? 'D9682B' : s.color.slice(1) === '9A96AC' ? '6B6680' : s.color.slice(1) === 'B9A8FF' ? '6E4FE0' : s.color.slice(1) }),
      spacer(80),
    ]),
  ]),
];

const formats = [
  h1('6. Devices & File Formats'),
  h2('6.1 Supported hardware'),
  table([2600, 6760], ['Device', 'Support'], [
    ['Pen tablets & pen displays', 'Wacom, XP-Pen, Huion and Gaomon via Windows Ink / WinTab and macOS tablet events; Apple Pencil via Sidecar; Surface Pen. Pressure, tilt, rotation, barrel buttons and eraser end, with per-device pressure curves.'],
    ['Touch', 'Pinch zoom and rotate, two-finger undo, three-finger redo, hold for eyedropper, palm rejection.'],
    ['Controllers', 'TourBox-style dials, MIDI controllers and a WebSocket remote-control API.'],
    ['Microphones', 'Any system mic; 48 kHz recording for voice takes, sound effects and voice notes.'],
    ['Cameras', 'Webcams and phone cameras for reference clips, sketch scanning, and face and body tracking.'],
  ]),
  spacer(),
  h2('6.2 Import & export'),
  table([2000, 7360], ['Direction', 'Formats'], [
    ['Open / import', '.LUMA (native), PSD/PSB, ORA, KRA, TIFF, PNG, JPEG, WebP, HEIC, BMP, GIF, SVG, PDF, MP4/MOV/WebM, WAV/MP3/AAC, brushes (.abr, .sut, .brushset). Goals, each needing a check first: .procreate, .sai/.sai2, .clip, .moho.'],
    ['Export — image', 'PNG, JPEG, WebP, TIFF (16-bit / CMYK), layered PSD, PDF, SVG (vector layers)'],
    ['Export — animation', 'MP4 (H.264/H.265), MOV (ProRes 4444 with alpha), WebM, GIF, APNG, PNG/TGA sequence, sprite sheet'],
    ['Export — comics', 'Multi-page PDF, EPUB, CBZ, webtoon strips'],
    ['Export — rigs', 'glTF / FBX for game engines, Lottie for the web'],
    ['Time-lapse', 'An automatic process recording, exported as MP4'],
  ]),
];

const tech = [
  h1('7. Technology Plan'),
  p('A proposed architecture, built for speed with a pen, realistic paint on the GPU, and long-term growth into animation and rigging. The engineering team should confirm these choices during Phase 0.'),
  table([2300, 3100, 3960], ['Layer', 'Proposed technology', 'Why'], [
    ['Core engine', 'C++20, a tile-based canvas (256 px tiles), tile-delta undo', 'Performance and memory control for huge canvases (up to 100,000 px).'],
    ['GPU rendering', 'Vulkan / Metal / Direct3D 12 through one abstraction (e.g. Qt RHI or wgpu-native); compute shaders', 'Brush dabs, blending and paint physics run on the graphics card.'],
    ['UI & pen input', 'Qt 6 (QML) with custom-styled components', 'Mature, cross-platform pen tablet support (pressure, tilt, rotation) and a fully custom look.'],
    ['Paint physics', 'GPU fluid simulation for watercolor (shallow-water / lattice methods); Kubelka–Munk pigment mixing; height-map impasto with lighting', 'Proven research approaches for realistic wet media and color mixing.'],
    ['Vector & text', 'Skia; HarfBuzz + FreeType', 'High-quality vector lines, balloons and lettering.'],
    ['Animation & rigs', 'In-house timeline, bone and mesh-deform system; Lua scripting', 'Frame-by-frame and rigged animation in one data model.'],
    ['Audio & lip-sync', 'miniaudio for audio; Rhubarb Lip Sync (MIT license) for phoneme detection', 'Record, scrub and auto-lip-sync voice takes.'],
    ['Video', 'FFmpeg (LGPL build)', 'Import reference video, and export MP4/MOV/WebM/GIF.'],
    ['Tracking', 'MediaPipe face and pose models (Apache 2.0) run on the device', 'Face-tracking puppet and pose-from-photo, with no uploads.'],
    ['Color', 'LittleCMS', 'ICC color management and CMYK soft-proofing.'],
    ['3D poses', 'glTF models, a lightweight 3D viewport', 'Posable mannequins, hands and props.'],
    ['File format', '.LUMA = a ZIP container with a JSON manifest, compressed tiles, vector data, timeline, rig and audio', 'Robust, versioned, easy to inspect and recover.'],
  ]),
  spacer(),
  h2('7.1 Platforms'),
  bullet([t('Launch: ', { bold: true }), t('Windows 10/11 and macOS (Apple silicon and Intel), where drawing-tablet users are.')]),
  bullet([t('Next: ', { bold: true }), t('iPad (Apple Pencil) and Android tablets, reusing the same core engine.')]),
  bullet([t('Later: ', { bold: true }), t('Linux.')]),
];

const PH = [
  ['0', 'Foundations', 'Months 0–3', 'Engine prototype: tiled canvas, GPU brush dabs, pen input (pressure/tilt), layers, undo, .LUMA v0. UI design system in code.', 'Internal tech demo'],
  ['1', 'Core Studio', 'Months 3–9', 'Normal mode + Advanced Paint workspace; SAI-style brush engine and stabilizer; color disc, wheel and palettes; selection and transform; PSD/PNG/JPEG I/O; Quick Dock; Mochi tips; gallery.', 'Private alpha (drawing and painting)'],
  ['2', 'Real Paint', 'Months 9–14', 'Watercolor simulation, wet/dry, drying, tilt, blow; pigment mixing palette; paper library; impasto and lighting; masking fluid.', 'Closed beta'],
  ['3', 'Animate & Capture', 'Months 12–18', 'Timeline, onion skin, light table, 2D camera; audio layers and voice recording; lip-sync; reference camera and sketch scan; MP4/GIF export; time-lapse.', 'Lumastroke 1.0 public launch'],
  ['4', 'Ink & Comic', 'Months 18–24', 'Vector and linework layers, smart fill, colorize; pages, story editor, panels, balloons, SFX; tones; perspective and special rulers; 3D pose models; webtoon; PDF/EPUB/CBZ.', 'Lumastroke 1.5'],
  ['5', 'Rig & Motion', 'Months 24–32', 'Bones (FK/IK), Smart Bones, Vitruvian sets, switch layers; meshes and curvers; graph editor; dynamics and particles; face-tracking puppet; rig templates; glTF/Lottie export.', 'Lumastroke 2.0'],
  ['6', 'Everywhere', 'Month 30+', 'iPad and Android apps, community sharing (brushes, palettes, rigs), plug-ins and scripting API, localization (Japanese, Korean, Spanish, Portuguese and more).', 'Ongoing'],
];

const roadmap = [
  h1('8. Build Roadmap'),
  p('Lumastroke combines what four professional apps do, so it has to be built in phases. Each phase ships something artists can use. The timeline assumes a core team of about 6–10 people; a smaller team stretches it.'),
  table([560, 1700, 1250, 4150, 1700], ['#', 'Phase', 'When', 'What gets built', 'Milestone'], PH.map(([n, a, b, c, d]) => [[p([t(n, { bold: true, color: C.violet, size: 28 })], { alignment: AlignmentType.CENTER, spacing: { after: 0 } })], [p([t(a, { bold: true })], { spacing: { after: 0 } })], b, c, [p([t(d, { bold: true, size: 18, color: C.pink })], { spacing: { after: 0 } })]])),
  spacer(),
  callout('Why launch 1.0 after Phase 3?', ['Painting, realistic media and simple animation with voice lip-sync already make a complete, exciting product for young anime artists. Comics (1.5) and rigging (2.0) then become big free or paid upgrades that bring people back.']),
  spacer(),
  h2('8.1 Suggested team'),
  table([3300, 1300, 4760], ['Role', 'When', 'Focus'], [
    ['Tech lead / graphics engineer', 'Phase 0', 'Engine architecture, GPU pipeline, performance'],
    ['Engine engineers (×2)', 'Phase 0', 'Canvas, layers, file formats, undo, brush engine'],
    ['UI engineer', 'Phase 0', 'Qt/QML interface, Normal/Advanced modes, workspaces'],
    ['Product / UI designer', 'Phase 0', 'Design system, icons, mockups to final UI, usability tests'],
    ['Simulation engineer', 'Phase 1', 'Watercolor, pigment mixing, impasto (GPU compute)'],
    ['Brush & content artist (anime style)', 'Phase 1', 'Default brushes, papers, palettes, templates, tutorials, Mochi art'],
    ['QA engineer', 'Phase 1', 'Tablet and device lab, regression testing, performance budgets'],
    ['Animation & rig engineer', 'Phase 3', 'Timeline, audio, lip-sync, bones, meshes, physics'],
    ['Community manager', 'Phase 2', 'Beta program, Discord, feedback loop with young artists'],
  ]),
  spacer(),
  h2('8.2 Quality targets'),
  bullet('Pen latency under 10 ms from stylus to pixels on recommended hardware.'),
  bullet('A steady 120 fps canvas while painting on 4K canvases; physics running at 60 fps or more.'),
  bullet('Canvases up to 100,000 px, with a cold start in under 3 seconds.'),
  bullet('Crash-safe: auto-save every 30 seconds, with version history.'),
  bullet('Normal mode usability goal: a new user paints and exports a first picture in under 5 minutes, without a tutorial.'),
];

const risks = [
  h1('9. Risks, Legal & Privacy'),
  table([2600, 6760], ['Risk', 'How we handle it'], [
    ['Scope is huge', 'Phased roadmap; each phase ships on its own; Advanced-only features can slip without blocking launch.'],
    ['Paint-physics performance', 'GPU-first design from Phase 0, a fast preview mode for big brushes, and hardware tiers with automatic quality settings.'],
    ['Copying other apps', 'Lumastroke implements capabilities, not copies: its own code, UI, icons, brushes, names and art. No competitor brush files or assets ship with the app.'],
    ['Proprietary file formats', '.procreate, .sai, .clip, .moho and .rebelle import each need a legal review and a technical feasibility check before being promised.'],
    ['Patents & licenses', 'Freedom-to-operate review for paint-simulation techniques; only permissively licensed libraries (MIT, BSD, Apache, LGPL-dynamic); avoid non-commercial licenses.'],
    ['Young users & privacy', 'Voice, camera and face tracking are processed on the device and never uploaded by default. Clear permission prompts, and a COPPA/GDPR-K-aware sign-up if accounts or sharing are added.'],
    ['Hardware variety', 'A dedicated tablet and device test lab (Wacom, XP-Pen, Huion, Apple Pencil, Surface) plus public beta feedback.'],
  ]),
];

const next = [
  h1('10. Next Steps'),
  ...[
    'Confirm the name "Lumastroke": check trademark availability and register domains and social handles.',
    'Finalize the Mochi logo with a professional illustrator (vector master, app icon set, mascot poses).',
    'Validate the vision with 10–20 young anime artists: show the mockups and gather feedback.',
    'Hire or contract the Phase 0 team (tech lead, 2 engine engineers, UI engineer, designer).',
    'Build the Phase 0 engine prototype: pen latency, GPU brush dabs, tiled canvas.',
    'Commission legal review of file-format import and paint-simulation IP.',
    'Turn the icon proposals in Section 5 into a final, consistent icon set.',
  ].map(x => p([t('☐   ', { color: C.violet, bold: true, size: 26 }), t(x)], { indent: { left: 360, hanging: 360 }, spacing: { after: 100 } })),
];

const ASSETS = [
  ['Mockups', 'mockups/01-normal-studio-dark.png … 09-feature-map.png', '9 UI screens at 1920 × 1200'],
  ['Mockup sources', 'mockups/src/*.mjs', 'HTML/SVG generators that re-render every screen'],
  ['Logos', 'branding/00-logo-concepts-overview.png, 01–06-logo-*.png', 'Six logo concepts; 06 Mochi Splash chosen'],
  ['Logo sources', 'branding/src/build.mjs', 'Vector (SVG) logo marks and the concept sheet generator'],
  ['Feature spec', 'FEATURES.md', 'Markdown version of the feature list'],
  ['Feature icons', 'docs/build-plan/assets/icons/*.png', `${featureCount} proposed feature icons (plus workspace variants)`],
  ['Cover art', 'docs/build-plan/assets/cover-logo.png, mochi-mark.png', 'Mochi logo lockup and standalone mark'],
  ['This document', 'docs/Lumastroke-Build-Plan.docx', 'The build plan, generated by docs/build-plan/build-doc.mjs'],
];

const appendix = [
  h1('Appendix A — Asset Inventory'),
  p('Everything created for Lumastroke so far. The paths are relative to the lumastroke/ folder in the Star-Writer repository (branch claude/beautiful-goldberg-3fatam).'),
  table([1900, 4300, 3160], ['Asset', 'File(s)', 'Notes'], ASSETS),
  spacer(),
  h2('A.1 Workspace icon set'),
  p('The six workspace icons, shown in their workspace colors:'),
  table(WS.map(() => 1560), null, [WS.map(([g, c]) => cell([iconPara(g, c, 48)], 1560, { borders: { ...noBorders } })), WS.map(([, , n]) => cell([p([t(n, { bold: true, size: 18 })], { alignment: AlignmentType.CENTER, spacing: { after: 0 } })], 1560, { borders: { ...noBorders } }))]),
  h1('Appendix B — Research Sources'),
  p('The feature research drew on public product pages, manuals, release notes and news coverage:'),
  ...[
    'Escape Motions — Rebelle 8: What\'s New; Rebelle 8 release notes; Rebelle manuals (v7–8.1); CG Channel, "Escape Motions releases Rebelle 8.3" (2026); Digital Production, "Rebelle 8" (2025).',
    'SYSTEMAX — PaintTool SAI product pages; Paint Tool SAI 2 documentation; Wikipedia, "PaintTool SAI".',
    'Celsys — Clip Studio Paint Ver. 4.0 and 5.0 announcements; "New features up to Ver. 5.0"; EX vs PRO feature differences; Clip Studio Tips, "Page manager and story editor".',
    'Lost Marble — Moho Pro 14 product page and features; Moho 14.2 and 14.4 updates; Cartoon Brew, "Moho 14 is out now"; Vitruvian Bones tutorial.',
  ].map(x => bullet(x)),
];

// ---------- document ----------
const doc = new Document({
  creator: 'Lumastroke',
  title: 'Lumastroke — Build Plan',
  description: 'Vision, design, features and roadmap for Lumastroke',
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: 'Calibri', size: 22, color: C.ink } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 40, bold: true, font: 'Calibri', color: C.violet }, paragraph: { spacing: { before: 120, after: 240 }, outlineLevel: 0, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: 'FF9EBB', space: 6 } } } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 30, bold: true, font: 'Calibri', color: C.ink }, paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1, keepNext: true } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 24, bold: true, font: 'Calibri', color: C.pink }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2, keepNext: true } },
    ],
  },
  numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } }, run: { color: C.violet } } }, { level: 1, format: LevelFormat.BULLET, text: '◦', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1080, hanging: 270 } } } }] }] },
  sections: [
    { properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } }, children: cover },
    {
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [t('Lumastroke — Build Plan', { size: 18, color: C.muted })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [t('Your art, alive.   ·   Page ', { size: 18, color: C.muted }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: C.muted, font: 'Calibri' })] })] }) },
      children: [...toc, ...vision, ...brand, ...org, ...mocks, ...catalog, ...formats, ...tech, ...roadmap, ...risks, ...next, ...appendix],
    },
  ],
});

const outFile = join(root, 'docs', 'Lumastroke-Build-Plan.docx');
writeFileSync(outFile, await Packer.toBuffer(doc));
console.log('wrote', outFile, featureCount, 'features');
