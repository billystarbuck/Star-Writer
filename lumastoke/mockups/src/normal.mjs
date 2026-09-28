import { ic, logo, art, stroke, toggle, base } from './parts.mjs';

export const normalCss = `
body{background:radial-gradient(1400px 900px at 50% 45%,var(--bg2),var(--bg))}
.top{position:absolute;left:0;right:0;top:0;height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 18px}
.grp{display:flex;align-items:center;gap:4px}
.gal{display:flex;align-items:center;gap:10px;padding:0 14px 0 6px;height:40px;font-weight:600;font-size:14px}
.gal b{font-family:Fraunces,serif;font-weight:600;font-size:19px;letter-spacing:.01em}
.center{position:absolute;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:16px}
.doc{font-weight:600;font-size:13px}.doc small{display:block;font-weight:500;color:var(--muted);font-size:11px;margin-top:1px}
.sep{width:1px;height:22px;background:var(--line2);margin:0 8px}
.swatch{width:34px;height:34px;border-radius:50%;background:#e2738f;border:3px solid var(--solid);box-shadow:0 0 0 1.5px var(--line2),0 4px 12px rgba(226,115,143,.5);margin-left:8px}
.canvas{position:absolute;left:300px;top:84px;width:1320px;height:990px;border-radius:6px;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,.55),0 0 0 1px rgba(0,0,0,.2)}
[data-theme=light] .canvas{box-shadow:0 30px 70px rgba(70,50,30,.25),0 0 0 1px rgba(0,0,0,.05)}
.side{position:absolute;left:22px;top:300px;width:54px;padding:12px 0;border-radius:18px;display:flex;flex-direction:column;align-items:center;gap:12px}
.vs{position:relative;width:8px;height:150px;border-radius:8px;background:var(--field)}
.vs i{position:absolute;left:0;right:0;bottom:0;border-radius:8px;background:var(--grad);opacity:.85}
.vs b{position:absolute;left:50%;width:30px;height:18px;margin-left:-15px;border-radius:7px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.4)}
.sq{width:30px;height:30px;border-radius:9px;border:1.5px solid var(--line2);display:flex;align-items:center;justify-content:center;color:var(--muted)}
.tip{position:absolute;left:86px;top:330px;padding:7px 11px;border-radius:10px;font-weight:600;font-size:12px;display:flex;gap:8px;align-items:center}
.tip span{display:inline-block;border-radius:50%;background:#e2738f}
.dock{position:absolute;left:50%;transform:translateX(-50%);bottom:22px;height:76px;border-radius:24px;display:flex;align-items:center;padding:0 12px;gap:8px}
.chip{width:132px;height:54px;border-radius:14px;display:flex;flex-direction:column;justify-content:center;padding:4px 10px;gap:2px;border:1px solid transparent}
.chip.on{background:rgba(255,94,138,.1);border-color:rgba(255,94,138,.45)}
.chip small{font-size:10.5px;font-weight:600;color:var(--muted)}
.chip.on small{color:var(--text)}
.wet{display:flex;align-items:center;gap:10px;padding:0 10px}
.meter{width:120px}
.meter .bar{height:6px;border-radius:6px;background:var(--field);overflow:hidden}
.meter .bar i{display:block;height:100%;width:64%;background:linear-gradient(90deg,#3aa0ff,var(--wet))}
.meter small{display:flex;justify-content:space-between;font-size:10.5px;color:var(--muted);font-weight:600;margin-bottom:5px}
.cap{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:var(--field);color:var(--text)}
.cap.rec{color:#ff5a6e}
.hist{display:flex;gap:6px;padding:0 6px}.hist span{width:22px;height:22px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(255,255,255,.15)}
.zoom{position:absolute;right:24px;bottom:34px;padding:8px 12px;border-radius:12px;font-size:12px;font-weight:600;color:var(--muted)}
.hint{position:absolute;right:24px;top:84px;width:250px;padding:14px 16px;border-radius:16px;font-size:12px;line-height:1.5}
.hint b{display:flex;gap:8px;align-items:center;font-size:12.5px;margin-bottom:4px}
.hint p{color:var(--muted)}
`;

const chips = [
  ['watercolor', '#9a7bd0', 'Wet Wash', true],
  ['oil', '#c9658f', 'Oil Filbert'],
  ['gouache', '#ff9a7a', 'Gouache Flat'],
  ['pencil', '#b8b2cc', 'HB Sketch'],
  ['ink', '#8a7bff', 'Studio Ink'],
];

export const normalBody = (theme) => `
<div class="top">
  <div class="grp">
    <div class="gal">${logo(28)}<b>Lumastoke</b></div>
    <div class="sep"></div>
    <div class="btn">${ic('gallery')}</div>
    <div class="btn">${ic('wrench')}</div>
    <div class="btn">${ic('wand')}</div>
    <div class="btn">${ic('select')}</div>
    <div class="btn">${ic('move')}</div>
  </div>
  <div class="center">
    <div class="doc">Evening Tide<small>4096 × 3072 · Cold-press paper</small></div>
    ${toggle(false)}
  </div>
  <div class="grp">
    <div class="btn on">${ic('brush')}</div>
    <div class="btn">${ic('smudge')}</div>
    <div class="btn">${ic('eraser')}</div>
    <div class="btn">${ic('layers')}</div>
    <div class="swatch"></div>
  </div>
</div>

<div class="canvas">${art()}</div>

<div class="side glass">
  <div class="vs"><i style="height:38%"></i><b style="bottom:calc(38% - 9px)"></b></div>
  <div class="sq">${ic('dropper', 16)}</div>
  <div class="vs"><i style="height:80%"></i><b style="bottom:calc(80% - 9px)"></b></div>
  <div class="btn" style="width:36px;height:32px">${ic('undo', 18)}</div>
  <div class="btn" style="width:36px;height:32px">${ic('redo', 18)}</div>
</div>
<div class="tip glass"><span style="width:18px;height:18px"></span>Size 38%</div>

<div class="hint glass">
  <b>${ic('drop', 16)} The paint is still wet</b>
  <p>Strokes blend with the wash underneath. Tap <span style="color:var(--text);font-weight:600">Dry</span> in the dock, or just wait — it dries like real paper.</p>
</div>

<div class="dock glass">
  ${chips.map(([k, c, n, on]) => `<div class="chip ${on ? 'on' : ''}">${stroke(k, c, 112, 30)}<small>${n}</small></div>`).join('')}
  <div class="sep"></div>
  <div class="hist">${['#e2738f', '#6a4d8f', '#ffd9a0', '#241f47', '#ff9a7a', '#4a8fa8'].map(c => `<span style="background:${c}"></span>`).join('')}</div>
  <div class="sep"></div>
  <div class="wet">${ic('drop', 18)}<div class="meter"><small><span>Wet</span><span>Dries in 40s</span></small><div class="bar"><i></i></div></div>${ic('sun', 18)}</div>
  <div class="sep"></div>
  <div class="cap">${ic('mic', 19)}</div>
  <div class="cap">${ic('cam', 19)}</div>
</div>
<div class="zoom glass">66% · 0°</div>
`;

export const normal = (theme = 'dark') => base('Lumastoke — Normal', normalCss, normalBody(theme), theme);
