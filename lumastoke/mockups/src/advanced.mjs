import { ic, logo, art, toggle, base } from './parts.mjs';

const css = `
body{background:#0e0d14;font-size:12px}
.menu{position:absolute;left:0;right:0;top:0;height:36px;display:flex;align-items:center;padding:0 12px;gap:2px;background:#131219;border-bottom:1px solid var(--line)}
.menu .m{padding:6px 10px;border-radius:7px;color:#c9c6d8;font-weight:500}
.menu .m:first-of-type{margin-left:8px}
.menu .r{margin-left:auto;display:flex;align-items:center;gap:12px}
.opts{position:absolute;left:0;right:0;top:36px;height:46px;display:flex;align-items:center;padding:0 12px;gap:14px;background:#15141c;border-bottom:1px solid var(--line)}
.o{display:flex;align-items:center;gap:7px;color:var(--muted);font-weight:500;white-space:nowrap}
.o b{color:var(--text);font-weight:600}
.f{height:28px;padding:0 9px;border-radius:7px;background:var(--field);display:flex;align-items:center;gap:6px;color:var(--text);font-weight:600;border:1px solid var(--line)}
.vsep{width:1px;height:24px;background:var(--line2)}
.tg{padding:5px 9px;border-radius:7px;background:var(--field);color:var(--muted);font-weight:600;border:1px solid var(--line)}
.tg.on{color:#1a1320;background:var(--grad);border-color:transparent}
.dockL{position:absolute;left:0;top:82px;bottom:28px;width:300px;background:#15141c;border-right:1px solid var(--line);display:flex;flex-direction:column}
.dockT{position:absolute;left:300px;top:82px;bottom:28px;width:214px;background:#131219;border-right:1px solid var(--line);display:flex;flex-direction:column}
.dockR{position:absolute;right:0;top:82px;bottom:28px;width:330px;background:#15141c;border-left:1px solid var(--line);display:flex;flex-direction:column}
.ph{display:flex;align-items:center;justify-content:space-between;height:32px;padding:0 12px;border-bottom:1px solid var(--line);background:#1a1922}
.ph .t{display:flex;gap:14px}.ph .t span{font-weight:600;color:var(--muted);font-size:11.5px}.ph .t span.on{color:var(--text)}
.ph .t span.on:after{content:'';display:block;height:2px;border-radius:2px;background:var(--grad);margin-top:6px;margin-bottom:-8px}
.pb{padding:10px 12px}
.nav{height:140px;border-radius:6px;overflow:hidden;position:relative}
.nav .vp{position:absolute;left:22%;top:18%;width:52%;height:58%;border:1.5px solid var(--a2);box-shadow:0 0 0 999px rgba(0,0,0,.35)}
.sl{display:flex;align-items:center;gap:8px;margin-top:8px;color:var(--muted)}
.sl .tr{flex:1;height:5px;border-radius:5px;background:var(--field);position:relative}
.sl .tr i{position:absolute;left:0;top:0;bottom:0;border-radius:5px;background:var(--grad)}
.sl .tr b{position:absolute;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.5)}
.sl .v{width:44px;text-align:right;color:var(--text);font-family:'JetBrains Mono';font-size:11px}
.sl .k{width:14px;font-weight:700;color:var(--text)}
.wheel{position:relative;width:196px;height:196px;margin:4px auto 6px;border-radius:50%;background:conic-gradient(from 90deg,#f33,#fd3,#3f5,#3df,#35f,#d3f,#f33)}
.wheel:before{content:'';position:absolute;inset:18px;border-radius:50%;background:#15141c}
.wheel .sq{position:absolute;left:50px;top:50px;width:96px;height:96px;background:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,#e8306a)}
.wheel .k{position:absolute;width:14px;height:14px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.6)}
.hue{background:linear-gradient(90deg,#f33,#fd3,#3f5,#3df,#35f,#d3f,#f33)!important}
.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:3px;margin-top:10px}
.grid span{aspect-ratio:1;border-radius:3px}
.pad{height:200px;border-radius:6px;overflow:hidden;background:#f3ece0;margin-top:8px}
.tools{display:grid;grid-template-columns:1fr 1fr;gap:3px;padding:8px}
.tl{height:30px;border-radius:6px;background:#1c1b24;display:flex;align-items:center;gap:6px;padding:0 7px;font-size:11px;font-weight:500;color:#c9c6d8;border:1px solid transparent}
.tl i{width:8px;height:8px;border-radius:2px;flex:none;display:block}
.tl.on{border-color:var(--a2);background:rgba(255,94,138,.12);color:#fff}
.dots{display:grid;grid-template-columns:repeat(6,1fr);gap:3px;padding:0 8px 6px}
.dots span{height:30px;border-radius:5px;background:#1c1b24;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;font-size:8.5px;color:var(--muted)}
.dots span i{display:block;border-radius:50%;background:#d9d6e6}
.dots span.on{background:rgba(255,94,138,.18);box-shadow:inset 0 0 0 1px var(--a2)}
.props{padding:4px 8px}
.pr{display:flex;align-items:center;gap:6px;height:25px;font-size:11px;color:var(--muted)}
.pr .n{width:66px}
.pr .tr{flex:1;height:16px;border-radius:4px;background:#1c1b24;position:relative;overflow:hidden}
.pr .tr i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,rgba(138,108,255,.55),rgba(255,94,138,.55))}
.pr .tr em{position:absolute;right:6px;top:1px;font-style:normal;color:#fff;font-family:'JetBrains Mono';font-size:10px}
.pr.wet .tr i{background:linear-gradient(90deg,rgba(58,160,255,.5),rgba(94,200,255,.7))}
.sel{height:24px;border-radius:5px;background:#1c1b24;display:flex;align-items:center;justify-content:space-between;padding:0 8px;color:var(--text);flex:1}
.stage{position:absolute;left:514px;right:330px;top:82px;bottom:28px;background:#0b0a10}
.rul{position:absolute;background:#15141c;color:var(--dim);font-size:9px;font-family:'JetBrains Mono'}
.rul.h{left:18px;right:0;top:0;height:18px;background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.14) 0 1px,transparent 1px 20px)}
.rul.v{left:0;top:18px;bottom:0;width:18px;background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.14) 0 1px,transparent 1px 20px)}
.tabsC{position:absolute;left:18px;right:0;top:18px;height:30px;display:flex;background:#121118;border-bottom:1px solid var(--line)}
.tabsC span{padding:0 14px;display:flex;align-items:center;gap:8px;color:var(--muted);font-weight:500;border-right:1px solid var(--line)}
.tabsC span.on{background:#0b0a10;color:var(--text)}
.cv{position:absolute;left:78px;top:190px;width:942px;height:707px;box-shadow:0 30px 70px rgba(0,0,0,.6);overflow:hidden}
.guide{position:absolute;background:rgba(94,200,255,.6)}
.cursor{position:absolute;left:640px;top:618px;width:74px;height:74px;border-radius:50%;border:1.5px solid rgba(255,255,255,.9);box-shadow:0 0 0 1px rgba(0,0,0,.5)}
.float{position:absolute;right:16px;top:64px;padding:10px 12px;border-radius:12px;background:rgba(21,20,28,.9);border:1px solid var(--line2);width:190px}
.curve{height:70px;border-radius:6px;background:#1c1b24;margin-top:6px;position:relative;overflow:hidden}
.ly{display:flex;align-items:center;gap:8px;height:48px;padding:0 8px;border-bottom:1px solid var(--line);color:#d6d3e2}
.ly.on{background:rgba(255,94,138,.1);box-shadow:inset 3px 0 0 var(--a2)}
.ly .th{width:52px;height:38px;border-radius:4px;overflow:hidden;flex:none;background:#f1e9dc;position:relative}
.ly .nm{flex:1;min-width:0}.ly .nm b{display:block;font-weight:600;font-size:12px}.ly .nm small{color:var(--muted);font-size:10.5px}
.ly .ic{color:var(--muted);display:flex;gap:6px;align-items:center}
.ly.ch{padding-left:26px}
.wetb{font-size:9px;font-weight:700;color:var(--wet);background:rgba(94,200,255,.12);padding:2px 5px;border-radius:4px;margin-left:4px}
.clipb{width:3px;height:30px;border-radius:2px;background:var(--a3);margin-left:-4px}
.lbar{display:flex;gap:4px;padding:8px;border-top:1px solid var(--line);margin-top:auto;color:var(--muted)}
.lbar span{flex:1;height:28px;border-radius:6px;background:#1c1b24;display:flex;align-items:center;justify-content:center}
.phys{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}
.phys span{height:48px;border-radius:8px;background:#1c1b24;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;font-size:10px;font-weight:600;color:#c9c6d8}
.phys span.on{background:rgba(94,200,255,.14);color:var(--wet);box-shadow:inset 0 0 0 1px rgba(94,200,255,.5)}
.dial{width:70px;height:70px;border-radius:50%;background:#1c1b24;position:relative;border:1px solid var(--line2);flex:none}
.dial:after{content:'';position:absolute;left:50%;top:8px;width:2px;height:27px;background:var(--wet);transform-origin:50% 100%;transform:rotate(24deg);border-radius:2px}
.status{position:absolute;left:0;right:0;bottom:0;height:28px;background:#121118;border-top:1px solid var(--line);display:flex;align-items:center;gap:18px;padding:0 12px;color:var(--muted);font-size:11px}
.status b{color:var(--text);font-weight:600}
.dot{width:7px;height:7px;border-radius:50%;background:#4ade80;display:inline-block;margin-right:6px}
`;

const menu = ['File', 'Edit', 'Canvas', 'Layer', 'Select', 'Filter', 'Paint', 'Animate', 'Capture', 'View', 'Window', 'Help'];
const tools = [
  ['Pen', '#d9d6e6'], ['Pencil', '#9a96ac'], ['Airbrush', '#ff7ab8'], ['Brush', '#c9658f'],
  ['WaterColor', '#9a7bd0', 1], ['Oil', '#e08a5a'], ['Acrylic', '#ff9a7a'], ['Gouache', '#f2c46b'],
  ['Pastel', '#8fd0c0'], ['Marker', '#5ec8ff'], ['Ink', '#6b7cff'], ['Blur', '#6c6880'],
  ['Smudge', '#b8b2cc'], ['Blend', '#a58fd8'], ['Eraser', '#f1e9dc'], ['Blow', '#5ec8ff'],
  ['Fill', '#f2c46b'], ['Text', '#d9d6e6'], ['Liquify', '#ff5e8a'], ['Clone', '#8fd0c0'],
];
const sizes = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 25, 30, 40, 50, 60, 80, 100];
const props = [
  ['Min size', 40], ['Density', 100], ['Blending', 42], ['Dilution', 30], ['Persistence', 55], ['Hardness', 18],
  ['Wetness', 72, 1], ['Paint load', 80, 1], ['Granulation', 35, 1], ['Edge darken', 48, 1], ['Bristle', 60], ['Tilt → size', 50],
];
const layers = [
  ['Glaze — sun', 'Add glow · 70%', 'on', 'wet', 'glow'],
  ['Pines', 'Normal · 100%', '', '', 'pines'],
  ['Water streaks', 'Screen · 65%', 'clip', '', 'streak'],
  ['Mountains', 'Folder · 3 layers', 'folder'],
  ['Near ridge', 'Multiply · 90%', 'ch', 'wet', 'ridge'],
  ['Far ridge', 'Normal · 75%', 'ch', '', 'far'],
  ['Sky wash', 'Normal · 100%', '', 'wet', 'sky'],
  ['Pencil sketch', 'Multiply · 40%', 'hidden', '', 'sketch'],
  ['Paper', 'Cold press 300gsm', 'lock', '', 'paper'],
];
const thumb = (k) => ({
  glow: `<div style="position:absolute;inset:0;background:radial-gradient(circle at 62% 55%,#fff3d6,#ffc98a55 35%,transparent 60%),#2a2a3a"></div>`,
  pines: `<div style="position:absolute;inset:0;background:conic-gradient(from 150deg at 20% 25%,#1b1838 0 60deg,transparent 0),conic-gradient(from 150deg at 85% 30%,#1b1838 0 60deg,transparent 0),#f1e9dc"></div>`,
  streak: `<div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,#f1e9dc 0 5px,#ffd0a0 5px 7px)"></div>`,
  ridge: `<div style="position:absolute;inset:0;background:linear-gradient(160deg,transparent 55%,#3a2f63 56%),#f1e9dc"></div>`,
  far: `<div style="position:absolute;inset:0;background:linear-gradient(200deg,transparent 45%,#6a4d8f 46%),#f1e9dc"></div>`,
  sky: `<div style="position:absolute;inset:0;background:linear-gradient(#23205a,#5b3b82,#c9658f,#ffd9a0)"></div>`,
  sketch: `<svg viewBox="0 0 52 38" style="position:absolute;inset:0"><path d="M4 30 L14 16 L20 22 L30 10 L40 24 L48 18" stroke="#6b6070" fill="none"/></svg>`,
  paper: `<div style="position:absolute;inset:0;background:#f1e9dc"></div>`,
}[k] || '');

const body = `
<div class="menu">${logo(20)}${menu.map(m => `<span class="m">${m}</span>`).join('')}
  <div class="r"><span style="color:var(--muted)">Evening Tide.luma — 4096×3072 · 300 dpi · Display P3</span>${toggle(true)}</div>
</div>
<div class="opts">
  <div class="f" style="gap:8px"><i style="width:10px;height:10px;border-radius:2px;background:#9a7bd0;display:block"></i>WaterColor · Wet Wash ${ic('chev', 12)}</div>
  <div class="vsep"></div>
  <div class="o">Size <div class="f">38.0 px</div></div>
  <div class="o">Opacity <div class="f">86%</div></div>
  <div class="o">Flow <div class="f">64%</div></div>
  <div class="vsep"></div>
  <div class="o">Stabilizer <div class="f">S-7 ${ic('chev', 12)}</div></div>
  <div class="o">Pressure <span class="tg on">Size</span><span class="tg on">Opacity</span><span class="tg">Blend</span></div>
  <div class="o">Tilt <span class="tg on">Angle</span><span class="tg">Width</span></div>
  <div class="vsep"></div>
  <div class="o">${ic('drop', 16)} Physics <span class="tg on">Wet</span><span class="tg">Dry</span> <b>Drying 1×</b></div>
  <div class="vsep"></div>
  <div class="o">Symmetry <span class="tg">Off</span></div>
  <div class="o">Perspective <span class="tg">3-pt</span></div>
  <div class="o" style="margin-left:auto">Workspace <div class="f">Painting ${ic('chev', 12)}</div></div>
</div>

<div class="dockL">
  <div class="ph"><div class="t"><span class="on">Navigator</span><span>Reference</span><span>Preview</span></div>${ic('more', 16, 3)}</div>
  <div class="pb">
    <div class="nav">${art()}<div class="vp"></div></div>
    <div class="sl">${ic('zoom', 14)}<div class="tr"><i style="width:45%"></i><b style="left:45%"></b></div><span class="v">66.7%</span></div>
    <div class="sl">${ic('rotate', 14)}<div class="tr"><i style="width:50%"></i><b style="left:50%"></b></div><span class="v">0.0°</span></div>
  </div>
  <div class="ph"><div class="t"><span class="on">Color</span><span>Swatches</span><span>Harmony</span><span>Scratch pad</span></div>${ic('more', 16, 3)}</div>
  <div class="pb">
    <div class="wheel"><div class="sq"></div><div class="k" style="left:141px;top:13px"></div><div class="k" style="left:98px;top:76px;background:#e2738f"></div></div>
    <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px"><div style="width:34px;height:24px;border-radius:5px;background:#e2738f"></div><div style="width:34px;height:24px;border-radius:5px;background:#6a4d8f"></div><div class="f" style="flex:1;font-family:'JetBrains Mono';font-weight:500">#E2738F</div><div class="f">HSV ${ic('chev', 11)}</div></div>
    <div class="sl"><span class="k">H</span><div class="tr hue"><b style="left:95%"></b></div><span class="v">343°</span></div>
    <div class="sl"><span class="k">S</span><div class="tr" style="background:linear-gradient(90deg,#e8e8e8,#e8306a)"><b style="left:49%"></b></div><span class="v">49%</span></div>
    <div class="sl"><span class="k">V</span><div class="tr" style="background:linear-gradient(90deg,#000,#e2738f)"><b style="left:89%"></b></div><span class="v">89%</span></div>
    <div class="sl"><span class="k">A</span><div class="tr" style="background:linear-gradient(90deg,transparent,#e2738f),repeating-conic-gradient(#333 0 25%,#555 0 50%) 0 0/8px 8px"><b style="left:100%"></b></div><span class="v">100%</span></div>
    <div class="grid">${['#23205a', '#5b3b82', '#c9658f', '#ff9a7a', '#ffd9a0', '#1b1838', '#3a2f63', '#6a4d8f', '#e2738f', '#f1e9dc', '#4a8fa8', '#8fd0c0', '#241f47', '#8a5ca8', '#b76a9c', '#f0a08a', '#fff1d0', '#33295a', '#e8306a', '#ffd24a', '#3a55d6', '#ffffff', '#6b6070', '#000000'].map(c => `<span style="background:${c}"></span>`).join('')}</div>
    <div class="lbl" style="margin-top:12px">Scratch pad</div>
    <div class="pad"><svg viewBox="0 0 276 200" width="276" height="200"><g filter="url(#wc2)">
      <path d="M20 40 C 80 20, 130 70, 200 40" stroke="#6a4d8f" stroke-width="26" fill="none" stroke-linecap="round" opacity=".8"/>
      <path d="M40 85 C 100 60, 160 100, 250 70" stroke="#e2738f" stroke-width="30" fill="none" stroke-linecap="round" opacity=".7"/>
      <circle cx="235" cy="30" r="18" fill="#ffd9a0"/><path d="M30 150 C 90 130, 150 175, 240 140" stroke="#4a8fa8" stroke-width="28" fill="none" stroke-linecap="round" opacity=".7"/></g></svg></div>
  </div>
</div>

<div class="dockT">
  <div class="ph"><div class="t"><span class="on">Tools</span><span>Presets</span></div>${ic('plus', 15)}</div>
  <div class="tools">${tools.map(([n, c, on]) => `<div class="tl ${on ? 'on' : ''}"><i style="background:${c}"></i>${n}</div>`).join('')}</div>
  <div class="ph" style="border-top:1px solid var(--line)"><div class="t"><span class="on">Brush</span><span>Texture</span><span>Dynamics</span></div></div>
  <div class="pr" style="padding:6px 8px 2px;height:32px"><div class="sel">Normal ${ic('chev', 11)}</div><div class="sel" style="flex:.7">Round ${ic('chev', 11)}</div></div>
  <div class="dots" style="margin-top:4px">${sizes.map((s, j) => `<span class="${s === 40 ? 'on' : ''}"><i style="width:${Math.max(2, Math.min(15, 2 + j * .8))}px;height:${Math.max(2, Math.min(15, 2 + j * .8))}px"></i>${s}</span>`).join('')}</div>
  <div class="props">${props.map(([n, v, w]) => `<div class="pr ${w ? 'wet' : ''}"><span class="n">${n}</span><div class="tr"><i style="width:${v}%"></i><em>${v}</em></div></div>`).join('')}
    <div class="pr"><span class="n">Paper</span><div class="sel">Cold press · 60 ${ic('chev', 11)}</div></div>
  </div>
</div>

<div class="stage">
  <div class="rul h"></div><div class="rul v"></div>
  <div class="tabsC"><span class="on">Evening Tide.luma ${ic('x', 12)}</span><span>Mochi walk cycle.luma ${ic('x', 12)}</span><span>Study — hands.psd ${ic('x', 12)}</span></div>
  <div class="cv">${art()}</div>
  <div class="guide" style="left:78px;width:942px;top:496px;height:1px"></div>
  <div class="guide" style="left:549px;top:190px;height:707px;width:1px"></div>
  <div class="cursor"></div>
  <div class="float">
    <div class="lbl" style="display:flex;justify-content:space-between">Pressure curve <span style="color:var(--text)">Wacom Pro Pen 3</span></div>
    <div class="curve"><svg viewBox="0 0 166 70" width="166" height="70"><path d="M0 70 C 60 68, 70 10, 166 4" stroke="url(#pc)" stroke-width="2.5" fill="none"/><defs><linearGradient id="pc"><stop offset="0" stop-color="#8A6CFF"/><stop offset="1" stop-color="#FF5E8A"/></linearGradient></defs><circle cx="70" cy="34" r="4" fill="#fff"/><circle cx="118" cy="10" r="4" fill="#fff"/></svg></div>
  </div>
</div>

<div class="dockR">
  <div class="ph"><div class="t"><span class="on">Layers</span><span>Channels</span><span>Timeline</span></div>${ic('more', 16, 3)}</div>
  <div class="pb" style="padding-bottom:6px">
    <div style="display:flex;gap:6px"><div class="sel" style="height:28px">Add (Glow) ${ic('chev', 11)}</div><div class="f" style="width:74px">70%</div></div>
    <div style="display:flex;gap:4px;margin-top:6px"><span class="tg">${'Clip'}</span><span class="tg">α Lock</span><span class="tg">${'Lock'}</span><span class="tg on">Wet layer</span><span class="tg">Ref</span></div>
  </div>
  ${layers.map(([n, s, f, w, t]) => `
  <div class="ly ${f === 'on' ? 'on' : ''} ${f === 'ch' ? 'ch' : ''}" style="${f === 'hidden' ? 'opacity:.5' : ''}">
    <span class="ic">${f === 'hidden' ? ic('eyeoff', 15) : ic('eye', 15)}</span>
    ${f === 'clip' ? '<span class="clipb"></span>' : ''}
    ${f === 'folder' ? `<div class="th" style="background:#23222e;display:flex;align-items:center;justify-content:center;color:var(--a1)">${ic('folder', 18)}</div>` : `<div class="th">${thumb(t)}</div>`}
    <div class="nm"><b>${n}${w ? '<span class="wetb">WET</span>' : ''}</b><small>${s}</small></div>
    <span class="ic">${f === 'lock' ? ic('lock', 14) : ''}${f === 'folder' ? ic('chev', 14) : ''}</span>
  </div>`).join('')}
  <div class="lbar"><span>${ic('plus', 15)}</span><span>${ic('folder', 15)}</span><span>${ic('mask', 15)}</span><span>${ic('merge', 15)}</span><span>${ic('trash', 15)}</span></div>
  <div class="ph" style="border-top:1px solid var(--line)"><div class="t"><span class="on">Paint physics</span><span>History</span></div></div>
  <div class="pb">
    <div class="phys"><span class="on">${ic('drop', 16)}Wet all</span><span>${ic('sun', 16)}Dry all</span><span>${ic('wind', 16)}Blow</span><span>${ic('eye', 16)}Show wet</span></div>
    <div style="display:flex;gap:12px;align-items:center;margin-top:10px">
      <div class="dial"></div>
      <div style="flex:1">
        <div class="lbl">Canvas tilt · 24° ↘</div>
        <div class="sl"><span style="width:48px">Drying</span><div class="tr"><i style="width:35%"></i><b style="left:35%"></b></div><span class="v">1.0×</span></div>
        <div class="sl"><span style="width:48px">Gravity</span><div class="tr"><i style="width:60%"></i><b style="left:60%"></b></div><span class="v">60</span></div>
      </div>
    </div>
  </div>
</div>

<div class="status">
  <span><span class="dot"></span><b>Wacom Cintiq Pro 24</b> · pressure 0.62 · tilt 34° / 212°</span>
  <span>X 2 811 · Y 1 904</span>
  <span>66.7% · 0.0°</span>
  <span>Wet paint: <b style="color:var(--wet)">3 layers</b></span>
  <span style="margin-left:auto">${ic('mic', 12)}</span><span>Mic: Blue Yeti · idle</span>
  <span>Cam: Logitech Brio · off</span>
  <span>GPU brush engine · 120 fps</span>
  <span>Autosaved 12 s ago</span>
</div>
`;

export const advanced = () => base('Lumastoke — Advanced', css, body);
