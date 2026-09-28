import { ic, logo, base } from './parts.mjs';

const css = `
body{background:radial-gradient(1400px 800px at 50% -10%,#241d3d,#0c0b12);padding:44px 44px}
.hd{display:flex;align-items:center;gap:16px}
.hd h1{font-family:Fraunces,serif;font-weight:600;font-size:36px}
.hd p{color:var(--muted);font-size:14px;margin-top:2px}
.legend{margin-left:auto;display:flex;gap:8px;align-items:center}
.tag{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:18px;padding:0 5px;border-radius:5px;font:700 10px Inter;color:#15131c}
.t-R{background:#5EC8FF}.t-S{background:#FFC56B}.t-C{background:#4ade80}.t-M{background:#FF9EBB}.t-N{background:linear-gradient(120deg,#FFC56B,#FF5E8A,#8A6CFF)}
.legend span.l{display:flex;align-items:center;gap:6px;color:#c9c6d8;font-size:12px;font-weight:500;margin-left:8px}
.modes{display:flex;gap:16px;margin:26px 0 20px}
.mc{flex:1;border-radius:18px;padding:16px 18px;border:1px solid var(--line2);background:rgba(255,255,255,.03);display:flex;gap:14px;align-items:flex-start}
.mc b{font-size:15px;display:block;margin-bottom:4px}.mc p{color:var(--muted);font-size:12.5px;line-height:1.5}
.mc .ico{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex:none}
.cols{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}
.col{border-radius:18px;background:#17141F;border:1px solid var(--line2);overflow:hidden}
.col h3{display:flex;align-items:center;gap:10px;padding:14px 14px 12px;font-size:15px;border-bottom:1px solid var(--line)}
.col h3 i{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center}
.col .sub{font-size:11px;color:var(--muted);font-weight:500;display:block}
.grp{padding:14px 12px 6px}
.grp .lbl{margin-bottom:6px;display:block}
.it{display:flex;align-items:flex-start;gap:6px;padding:5.5px 0;font-size:13.5px;line-height:1.35;color:#dcd9e8}
.it .tags{display:flex;gap:2px;flex:none;margin-left:auto}
.it .tag{min-width:15px;height:15px;font-size:8.5px;padding:0 3px;border-radius:4px}
.it.n:before{content:'●';color:var(--a2);font-size:8px;margin-top:3px}
.it.a:before{content:'○';color:var(--dim);font-size:8px;margin-top:3px}
.foot{display:flex;gap:14px;margin-top:16px}
.fb{flex:1;border-radius:16px;padding:12px 16px;border:1px solid var(--line2);background:rgba(255,255,255,.03);font-size:12px;color:#c9c6d8;line-height:1.5}
.fb b{color:var(--text)}
`;

// [label, tags, normal?]
const W = [
  ['Paint', 'Illustration & real media', 'brush', '#FF5E8A', [
    ['Brushes', [['Pen · pencil · marker · airbrush', 'SC', 1], ['Watercolor · oil · acrylic · gouache', 'R', 1], ['Pastel · charcoal · ink', 'RC', 1], ['Bristle particle brushes', 'R', 1], ['Blending / Dilution / Persistence', 'S', 0], ['Stabilizer S-1…15', 'SC', 1], ['Pressure · tilt · rotation curves', 'SCR', 0], ['Dual & stamp brushes', 'C', 1], ['Smart Shape (hold to snap)', 'C', 1]]],
    ['Paint physics', [['Wet / Dry all · fast dry', 'R', 1], ['Canvas tilt · drips', 'R', 1], ['Blow tool', 'R', 1], ['Pigment mixing palette', 'R', 1], ['Impasto + RealShader light', 'R', 0], ['Masking fluid · stencils', 'R', 0], ['Paper & canvas library', 'R', 1]]],
    ['Color', [['Disc · wheel · sliders · hex', 'SC', 1], ['Scratch pad · harmony', 'SC', 0], ['Gradient maps', 'RC', 0], ['Color management · proof', 'SC', 0]]],
  ]],
  ['Ink & Comic', 'Line art, manga, webtoon', 'pen', '#FFC56B', [
    ['Line art', [['Linework layers (editable)', 'S', 0], ['Vector: erase to intersection', 'C', 0], ['Width fix · pinch ends', 'C', 0], ['Line extraction from photos', 'C', 1], ['Fill: refer · close gap · lasso', 'SC', 1], ['Colorize from hints', 'C', 1]]],
    ['Comics', [['Multi-page · page manager', 'C', 0], ['Story editor → balloons', 'C', 0], ['Panel cut · borders', 'C', 1], ['Balloons · tails · SFX text', 'C', 1], ['Screen tones · gradient tone', 'C', 0], ['Webtoon canvas & split', 'C', 1], ['Bleed · trim · print presets', 'C', 0]]],
    ['Assists', [['Perspective 1/2/3-pt', 'SC', 0], ['Symmetry · kaleidoscope', 'RC', 1], ['Speed & focus lines', 'C', 1], ['3D poses · hands · pose from photo', 'C', 0], ['3D → line art', 'C', 0]]],
  ]],
  ['Animate', 'Frame-by-frame', 'film', '#8A6CFF', [
    ['Timeline', [['Unlimited frames · cels', 'C', 1], ['Exposure sheet (X-sheet)', 'C', 0], ['Onion skin · colors', 'CM', 1], ['Light table', 'C', 0], ['Holds · loops · push frames', 'CM', 1], ['Auto in-between (vector)', 'N', 0], ['Smart line boil', 'M', 0]]],
    ['Scene', [['2D camera · shake · multiplane', 'CM', 0], ['Layer transform keys', 'C', 0], ['Rotoscope video layer', 'C', 1], ['Wet paint on every frame', 'N', 1]]],
    ['Sound', [['Audio layers · scrub', 'CM', 1], ['Record voice on the timeline', 'N', 1], ['Lip-sync from voice', 'MN', 1], ['Subtitles', 'C', 0]]],
  ]],
  ['Rig & Motion', 'Bone-rigged animation', 'move', '#4ade80', [
    ['Rigging', [['Bones · FK / IK', 'M', 0], ['Smart Bones (dial poses)', 'M', 0], ['Vitruvian body sets', 'M', 0], ['Constraints · delayed', 'M', 0], ['Switch layers (mouths, hands)', 'M', 1], ['Rig templates (chibi, bust)', 'N', 1]]],
    ['Deform', [['Meshes & image warp', 'M', 0], ['Curvers (tails, hair)', 'M', 0], ['Puppet warp', 'C', 1], ['Liquify', 'C', 0]]],
    ['Motion', [['Graph editor · easing', 'M', 0], ['Actions library (walk, blink)', 'M', 1], ['Dynamics · wiggle · gravity · wind', 'M', 0], ['Particles · liquid shapes', 'M', 0], ['3D camera · depth', 'M', 0], ['Face-tracking puppet', 'N', 1], ['Scripting & plug-ins', 'M', 0]]],
  ]],
  ['Capture', 'Devices & reference', 'cam', '#5EC8FF', [
    ['Input', [['Pen tablets & displays', 'N', 1], ['Pressure · tilt · rotation · buttons', 'SCR', 1], ['Touch gestures', 'N', 1], ['Dials · MIDI · WebSocket', 'R', 0]]],
    ['Record', [['Voice notes & takes', 'N', 1], ['Reference video clips', 'N', 1], ['Scan a paper sketch → lines', 'CN', 1], ['Face & body tracking', 'N', 0], ['Reference window (image/video/3D)', 'N', 1]]],
    ['Workflow', [['History · snapshots', 'SC', 1], ['Auto-save · versions', 'N', 1], ['Custom workspaces · shortcuts', 'SC', 0], ['Command bar', 'N', 0]]],
  ]],
  ['Share', 'Import · export · print', 'share', '#FF9EBB', [
    ['Open', [['PSD/PSB · ORA · KRA · TIFF', 'N', 1], ['PNG · JPEG · WebP · HEIC · SVG · PDF', 'N', 1], ['Video & audio', 'CM', 1], ['Brushes: abr · sut · brushset', 'N', 1], ['.procreate · .sai · .clip · .moho (need a check)', 'N', 0]]],
    ['Export', [['Images · layered PSD · SVG', 'SC', 1], ['PDF · EPUB · CBZ · webtoon', 'C', 1], ['MP4 · MOV α · WebM · GIF · APNG', 'CM', 1], ['PNG sequence · sprite sheet', 'CM', 0], ['glTF / FBX · Lottie', 'M', 0], ['Huge print scaling', 'R', 0], ['Time-lapse video', 'N', 1]]],
  ]],
];

const tags = (s) => s.split('').map(t => `<span class="tag t-${t}">${t === 'N' ? '★' : t}</span>`).join('');

const body = `
<div class="hd">${logo(58)}<div><h1>Lumastroke — where everything lives</h1><p>Every feature from Rebelle, SAI, Clip Studio Paint EX and Moho Pro, sorted into six workspaces. ● = in Normal mode · ○ = Advanced only</p></div>
  <div class="legend"><span class="l"><span class="tag t-R">R</span>Rebelle</span><span class="l"><span class="tag t-S">S</span>SAI</span><span class="l"><span class="tag t-C">C</span>Clip Studio EX</span><span class="l"><span class="tag t-M">M</span>Moho Pro</span><span class="l"><span class="tag t-N">★</span>Lumastroke original</span></div>
</div>
<div class="modes">
  <div class="mc"><div class="ico" style="background:rgba(255,94,138,.15);color:var(--a2)">${ic('brush', 20)}</div><div><b>Normal mode — the studio</b><p>A full-screen canvas, five tools, Size and Opacity sliders, and the Quick Dock. Every feature marked ● shows up here as a simple, one-tap version.</p></div></div>
  <div class="mc"><div class="ico" style="background:rgba(138,108,255,.16);color:#b9a8ff">${ic('sparkle', 20)}</div><div><b>Advanced mode — the workshop</b><p>A menu bar, six workspace tabs, docked panels, and every setting. The same document, just more controls around it.</p></div></div>
  <div class="mc"><div class="ico" style="background:rgba(255,197,107,.15);color:var(--a1)">${ic('layers', 20)}</div><div><b>One file: .LUMA</b><p>Paint, comic pages, frames, rigs, audio and capture clips all live in one project, so you can switch workspaces without exporting.</p></div></div>
</div>
<div class="cols">
  ${W.map(([n, s, i, c, groups]) => `<div class="col"><h3><i style="background:${c}22;color:${c}">${ic(i, 17)}</i><span>${n}<span class="sub">${s}</span></span></h3>
    ${groups.map(([g, items]) => `<div class="grp"><span class="lbl">${g}</span>${items.map(([t, tg, nm]) => `<div class="it ${nm ? 'n' : 'a'}"><span>${t}</span><span class="tags">${tags(tg)}</span></div>`).join('')}</div>`).join('')}
  </div>`).join('')}
</div>
<div class="foot">
  <div class="fb"><b>Always there:</b> undo history, layers (raster, vector, tone, text, 3D, audio, video, camera), selection with a floating action bar, transform, and a status bar showing the connected pen, mic and camera.</div>
  <div class="fb"><b>Mochi helps in Normal mode:</b> tips the first time you use a tool, a cheer when an export finishes, and "try this" suggestions. You can turn it off with one tap.</div>
</div>
`;

export const featureMap = () => base('Lumastroke — Feature map', css, body);
