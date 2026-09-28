import { ic, stroke, base } from './parts.mjs';
import { normalCss, normalBody } from './normal.mjs';

const css = normalCss + `
.dim{position:absolute;inset:64px 0 0 0;background:rgba(8,8,12,.35)}
.pop{position:absolute;top:70px;border-radius:22px;overflow:hidden}
.pop:before{content:'';position:absolute}
.lib{left:760px;width:640px;height:760px;display:flex;flex-direction:column}
.ph{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 12px}
.ph h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:10px}
.ph .acts{display:flex;gap:6px;color:var(--muted)}
.search{margin:0 18px 12px;height:38px;border-radius:12px;background:var(--field);display:flex;align-items:center;gap:10px;padding:0 12px;color:var(--muted)}
.real{margin-left:auto;display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:var(--text)}
.sw{width:34px;height:20px;border-radius:20px;background:var(--grad);position:relative}.sw:after{content:'';position:absolute;right:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#fff}
.lb{display:flex;flex:1;border-top:1px solid var(--line)}
.cats{width:200px;padding:10px;border-right:1px solid var(--line);display:flex;flex-direction:column;gap:2px}
.cat{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;font-weight:500;color:var(--muted)}
.cat i{width:26px;height:26px;border-radius:8px;display:block;flex:none}
.cat.on{background:var(--field);color:var(--text);font-weight:600}
.cat em{margin-left:auto;font-style:normal;font-size:11px;color:var(--dim)}
.brs{flex:1;padding:10px 12px;display:flex;flex-direction:column;gap:6px}
.br{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:14px;border:1px solid transparent}
.br.on{background:rgba(255,94,138,.08);border-color:rgba(255,94,138,.45)}
.br .nm{width:110px}.br .nm b{display:block;font-size:13px}.br .nm small{font-size:11px;color:var(--muted)}
.br .pv svg{width:100%;height:52px}.br .pv{flex:1;min-width:0;height:52px;border-radius:10px;background:#efe7da;display:flex;align-items:center;justify-content:center;overflow:hidden}
.tags{display:flex;gap:4px;margin-top:4px}.tags span{font-size:9.5px;font-weight:700;padding:2px 6px;border-radius:6px;background:var(--field);color:var(--muted)}
.tags span.w{color:var(--wet);background:rgba(94,200,255,.12)}
.foot{display:flex;gap:10px;padding:12px 18px;border-top:1px solid var(--line);align-items:center;font-size:12px;color:var(--muted)}
.pill{display:flex;align-items:center;gap:6px;padding:7px 12px;border-radius:10px;background:var(--field);color:var(--text);font-weight:600}
.col{right:18px;width:400px;height:905px;padding-bottom:16px}
.tabs{display:flex;gap:4px;margin:0 16px 14px;padding:4px;border-radius:12px;background:var(--field)}
.tabs span{flex:1;text-align:center;padding:7px 0;border-radius:9px;font-weight:600;font-size:12px;color:var(--muted)}
.tabs span.on{background:var(--solid2);color:var(--text);box-shadow:0 2px 8px rgba(0,0,0,.3)}
.disc{position:relative;width:300px;height:300px;margin:0 auto;border-radius:50%;background:conic-gradient(from 90deg,#f33,#fd3,#3f5,#3df,#35f,#d3f,#f33)}
.disc .in{position:absolute;inset:34px;border-radius:50%;background:radial-gradient(circle at 50% 50%,#fff 0,rgba(255,255,255,0) 68%),linear-gradient(180deg,rgba(0,0,0,0) 30%,#000 100%),#e8306a;box-shadow:0 0 0 4px var(--solid)}
.knob{position:absolute;width:28px;height:28px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,.5)}
.row{display:flex;align-items:center;gap:8px;margin:16px 16px 0}
.cur{display:flex;border-radius:12px;overflow:hidden;height:40px;flex:1}.cur span{flex:1}
.hex{font-family:'JetBrains Mono';font-size:12px;padding:0 12px;height:40px;display:flex;align-items:center;border-radius:12px;background:var(--field)}
.sec{margin:18px 16px 8px;display:flex;justify-content:space-between;align-items:center}
.hs{display:grid;grid-template-columns:repeat(10,1fr);gap:6px;margin:0 16px}
.hs span{aspect-ratio:1;border-radius:8px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}
.mix{margin:0 16px;height:230px;border-radius:14px;overflow:hidden;position:relative;background:#f3ece0}
.mixtools{position:absolute;right:8px;top:8px;display:flex;gap:6px}
.mixtools span{width:30px;height:30px;border-radius:9px;background:rgba(20,18,28,.75);color:#fff;display:flex;align-items:center;justify-content:center}
.mixtools span.on{background:var(--a2)}
.pick{position:absolute;left:236px;top:120px;width:44px;height:44px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 1.5px rgba(0,0,0,.35),0 6px 16px rgba(0,0,0,.35);background:#b0507a}
`;

const cats = [
  ['Watercolor', '#9a7bd0', 18, true], ['Oils', '#c9658f', 24], ['Acrylic', '#ff9a7a', 16], ['Gouache', '#f2c46b', 12],
  ['Pastel & Chalk', '#8fd0c0', 14], ['Pencils', '#9a96ac', 20], ['Inks', '#6b7cff', 22], ['Airbrush', '#ff7ab8', 8],
  ['Markers', '#5ec8ff', 10], ['Texture & FX', '#c2a27a', 26], ['My Brushes', '#ffffff', 7],
];
const brushes = [
  ['Wet Wash', 'Round sable · 12', 'watercolor', '#6a4d8f', ['WET', 'BLEEDS', 'GRANULATES'], true],
  ['Soft Glaze', 'Flat hake · 30', 'watercolor', '#c9658f', ['WET', 'TRANSPARENT']],
  ['Salt Bloom', 'Texture stamp', 'watercolor', '#3b6f9a', ['WET', 'FX']],
  ['Dry Brush', 'Round · 6', 'oil', '#4a3a7a', ['DRY', 'BRISTLE']],
  ['Pigment Drop', 'Pipette', 'watercolor', '#e0708a', ['WET', 'FLOWS']],
  ['Rigger Line', 'Rigger · 2', 'ink', '#2a2350', ['WET', 'TAPER']],
];

const blobs = [
  [60, 60, 40, '#e8306a'], [150, 50, 34, '#ffd24a'], [70, 165, 38, '#3a55d6'], [330, 60, 30, '#ffffff'], [340, 170, 34, '#241f47'],
];

const body = normalBody('dark') + `
<div class="dim"></div>
<div class="pop glass lib">
  <div class="ph"><h3>${ic('brush', 18)} Brush Library</h3>
    <div class="real">Realistic paint <div class="sw"></div></div>
  </div>
  <div class="search">${ic('zoom', 16)} Search 240 brushes…</div>
  <div class="lb">
    <div class="cats">
      ${cats.map(([n, c, k, on]) => `<div class="cat ${on ? 'on' : ''}"><i style="background:linear-gradient(135deg,${c},${c}55)"></i>${n}<em>${k}</em></div>`).join('')}
    </div>
    <div class="brs">
      ${brushes.map(([n, s, k, c, t, on]) => `<div class="br ${on ? 'on' : ''}"><div class="nm"><b>${n}</b><small>${s}</small><div class="tags">${t.slice(0, 2).map(x => `<span class="${x === 'WET' ? 'w' : ''}">${x}</span>`).join('')}</div></div><div class="pv">${stroke(k, c, 400, 52)}</div></div>`).join('')}
    </div>
  </div>
  <div class="foot"><div class="pill">${ic('plus', 15)} New brush</div><div class="pill">${ic('import', 15)} Import .abr / .brushset / .sut</div><span style="margin-left:auto">Tap a brush twice to edit</span></div>
</div>

<div class="pop glass col">
  <div class="ph"><h3><span style="width:18px;height:18px;border-radius:50%;background:#e2738f;display:block"></span> Color</h3><div class="acts">${ic('more', 20, 3)}</div></div>
  <div class="tabs"><span class="on">Disc</span><span>Classic</span><span>Harmony</span><span>Mixer</span><span>Palettes</span></div>
  <div class="disc"><div class="in"></div>
    <div class="knob" style="left:228px;top:14px;background:#e8306a"></div>
    <div class="knob" style="left:120px;top:128px;width:40px;height:40px;background:#e2738f"></div>
  </div>
  <div class="row"><div class="cur"><span style="background:#e2738f"></span><span style="background:#6a4d8f"></span></div><div class="hex">#E2738F</div><div class="btn" style="background:var(--field)">${ic('dropper', 17)}</div></div>
  <div class="sec"><span class="lbl">History</span></div>
  <div class="hs">${['#e2738f', '#6a4d8f', '#ffd9a0', '#241f47', '#ff9a7a', '#4a8fa8', '#c9658f', '#f1e9dc', '#3a2f63', '#8fd0c0'].map(c => `<span style="background:${c}"></span>`).join('')}</div>
  <div class="sec"><span class="lbl">Mixing palette · real pigment</span><span style="font-size:11px;color:var(--muted)">Tap to pick up</span></div>
  <div class="mix">
    <svg viewBox="0 0 368 230" width="368" height="230">
      <g filter="url(#wc2)">
        ${blobs.map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('')}
        <path d="M70 70 C 140 110, 200 90, 260 140" stroke="#b0507a" stroke-width="40" fill="none" stroke-linecap="round" opacity=".9"/>
        <path d="M150 60 C 180 110, 230 110, 260 140" stroke="#f08a50" stroke-width="26" fill="none" stroke-linecap="round" opacity=".85"/>
        <path d="M70 165 C 140 170, 200 160, 250 145" stroke="#6a3f8f" stroke-width="30" fill="none" stroke-linecap="round" opacity=".9"/>
        <path d="M330 60 C 300 90, 290 120, 270 140" stroke="#f0b0c8" stroke-width="18" fill="none" stroke-linecap="round" opacity=".9"/>
      </g>
      <rect width="368" height="230" fill="#fff" filter="url(#grain)" opacity=".3"/>
    </svg>
    <div class="pick"></div>
    <div class="mixtools"><span class="on">${ic('brush', 15)}</span><span>${ic('smudge', 15)}</span><span>${ic('drop', 15)}</span><span>${ic('trash', 15)}</span></div>
  </div>
  <div class="sec"><span class="lbl">Palette · Dusk</span><span style="font-size:11px;color:var(--muted)">5 of 12</span></div>
  <div class="hs" style="grid-template-columns:repeat(6,1fr)">${['#23205a', '#5b3b82', '#c9658f', '#ff9a7a', '#ffd9a0', '#1b1838'].map(c => `<span style="background:${c};border-radius:50%"></span>`).join('')}</div>
</div>
`;

export const library = () => base('Lumastoke — Brushes & Color', css, body);
