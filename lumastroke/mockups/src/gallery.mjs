import { ic, logo, art, toggle, base } from './parts.mjs';

const css = `
body{background:radial-gradient(1400px 900px at 50% 0%,#1d1b29,#0b0b10)}
.top{height:84px;display:flex;align-items:center;padding:0 40px;gap:14px}
.brand{display:flex;align-items:center;gap:12px;font-family:Fraunces,serif;font-weight:600;font-size:26px}
.acts{margin-left:auto;display:flex;gap:10px;align-items:center}
.b{height:42px;padding:0 16px;border-radius:13px;display:flex;align-items:center;gap:8px;font-weight:600;background:var(--field);border:1px solid var(--line)}
.b.pri{background:var(--grad);color:#1a1320;border:0;box-shadow:0 8px 24px rgba(255,94,138,.35)}
.hero{margin:6px 40px 0;display:flex;gap:16px}
.cap{flex:1;height:120px;border-radius:20px;padding:18px 20px;display:flex;gap:16px;align-items:center;border:1px solid var(--line2);background:linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.01))}
.cap .ico{width:54px;height:54px;border-radius:16px;display:flex;align-items:center;justify-content:center;flex:none}
.cap b{font-size:15px;display:block;margin-bottom:4px}.cap p{color:var(--muted);font-size:12.5px;line-height:1.45}
.sec{display:flex;align-items:center;gap:18px;margin:30px 40px 16px}
.sec h2{font-size:22px;font-weight:700}
.chips{display:flex;gap:6px}.chips span{padding:7px 14px;border-radius:999px;background:var(--field);color:var(--muted);font-weight:600;font-size:12px}
.chips span.on{background:var(--text);color:#15141c}
.cards{display:grid;grid-template-columns:repeat(5,1fr);gap:22px;margin:0 40px}
.card .th{height:250px;border-radius:14px;overflow:hidden;position:relative;box-shadow:0 18px 40px rgba(0,0,0,.4)}
.card .th .t{position:absolute;right:10px;top:10px;padding:4px 8px;border-radius:7px;background:rgba(0,0,0,.55);font-size:10.5px;font-weight:700;display:flex;gap:5px;align-items:center}
.card b{display:block;margin-top:12px;font-size:14px}.card small{color:var(--muted);font-size:12px}
.dev{position:absolute;left:40px;right:40px;bottom:26px;height:64px;border-radius:18px;display:flex;align-items:center;gap:14px;padding:0 20px}
.dv{display:flex;align-items:center;gap:10px;padding:8px 14px;border-radius:12px;background:var(--field);font-weight:600}
.dv small{color:var(--muted);font-weight:500}
.dv i{width:8px;height:8px;border-radius:50%;background:#4ade80;display:block;box-shadow:0 0 8px #4ade80}
.shade{position:absolute;inset:0;background:rgba(6,6,10,.5)}
.modal{position:absolute;left:50%;top:360px;width:1180px;height:700px;transform:translateX(-50%);border-radius:26px;display:flex;overflow:hidden;background:rgba(22,21,30,.94)}
.mleft{flex:1;padding:26px 28px;display:flex;flex-direction:column}
.mh{display:flex;align-items:center;justify-content:space-between}
.mh h3{font-size:22px;font-weight:700}
.seg{display:flex;gap:4px;padding:4px;border-radius:12px;background:var(--field);margin:18px 0 20px;width:max-content}
.seg span{padding:8px 18px;border-radius:9px;font-weight:600;color:var(--muted)}
.seg span.on{background:var(--solid2);color:var(--text);box-shadow:0 2px 8px rgba(0,0,0,.35)}
.fmts{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.fm{height:104px;border-radius:16px;border:1px solid var(--line2);padding:14px;display:flex;flex-direction:column;justify-content:space-between;background:rgba(255,255,255,.02)}
.fm .x{font-size:20px;font-weight:700;letter-spacing:.02em}
.fm small{color:var(--muted);font-size:11.5px}
.fm.on{border-color:var(--a2);background:rgba(255,94,138,.1);box-shadow:0 0 0 1px var(--a2) inset}
.imp{margin-top:auto;border-radius:16px;border:1.5px dashed var(--line2);padding:16px 18px;display:flex;gap:14px;align-items:center;color:var(--muted);line-height:1.5}
.imp b{color:var(--text)}
.mright{width:400px;background:rgba(255,255,255,.025);border-left:1px solid var(--line);padding:26px 24px;display:flex;flex-direction:column}
.pv{height:210px;border-radius:14px;overflow:hidden;box-shadow:0 14px 30px rgba(0,0,0,.4)}
.row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--line);font-weight:500}
.row span:last-child{color:var(--muted)}
.row .f{height:30px;padding:0 10px;border-radius:8px;background:var(--field);display:flex;align-items:center;gap:6px;color:var(--text);font-weight:600}
.sw{width:34px;height:20px;border-radius:20px;background:var(--grad);position:relative}.sw:after{content:'';position:absolute;right:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#fff}
.sw.off{background:var(--field)}.sw.off:after{right:auto;left:2px;background:#888}
.go{margin-top:auto;height:52px;border-radius:15px;background:var(--grad);color:#1a1320;font-weight:700;font-size:15px;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 10px 30px rgba(255,94,138,.35)}
`;

const cards = [
  ['Evening Tide', 'Watercolor · edited now', 0, ''],
  ['Mochi — hello!', 'Animation · 5 s · 24 fps', -1, 'film'],
  ['Harbor at noon', 'Oil · 2 days ago', 150, ''],
  ['Moss study', 'Gouache · last week', 80, ''],
  ['Night market', 'Ink + wash · last week', 230, ''],
];

const fmts = [
  ['PNG', 'Lossless, transparency', 1], ['JPEG', 'Small, for sharing'], ['PSD', 'Layers for Photoshop'], ['TIFF', 'Print · 16-bit'],
  ['WebP', 'Web, lossless'], ['PDF', 'Print-ready, CMYK'], ['SVG', 'Vector ink layers'], ['.LUMA', 'Full project + paint state'],
  ['MP4', 'Animation · H.264'], ['GIF', 'Looping animation'], ['MOV', 'ProRes 4444 · alpha'], ['PNG seq.', 'Frames for compositing'],
];

const body = `
<div class="top">
  <div class="brand">${logo(36)}Lumastroke</div>
  <div class="acts"><div class="b">${ic('zoom', 16)} Search</div><div class="b">${ic('select', 16)} Select</div><div class="b">${ic('import', 16)} Import</div>${toggle(false)}<div class="b pri">${ic('plus', 16, 2.2)} New canvas</div></div>
</div>
<div class="hero">
  <div class="cap"><div class="ico" style="background:rgba(255,94,138,.15);color:var(--a2)">${ic('plus', 26)}</div><div><b>Start painting</b><p>Pick a paper — sketchbook, watercolor block, canvas board — and go.</p></div></div>
  <div class="cap"><div class="ico" style="background:rgba(138,108,255,.16);color:#b9a8ff">${ic('film', 24)}</div><div><b>Animate</b><p>Frame-by-frame with onion skin, voice lip-sync and video reference.</p></div></div>
  <div class="cap"><div class="ico" style="background:rgba(94,200,255,.15);color:var(--wet)">${ic('cam', 24)}</div><div><b>Capture</b><p>Snap a sketch with your camera, record a reference clip or a voice note.</p></div></div>
  <div class="cap"><div class="ico" style="background:rgba(255,197,107,.15);color:var(--a1)">${ic('import', 24)}</div><div><b>Open anything</b><p>PSD, Procreate, SAI, Krita, Clip Studio, images, video, audio.</p></div></div>
</div>
<div class="sec"><h2>Gallery</h2><div class="chips"><span class="on">All</span><span>Paintings</span><span>Animations</span><span>Sketches</span><span>Shared</span></div></div>
<div class="cards">
  ${cards.map(([n, s, h, t]) => `<div class="card"><div class="th" style="${h > 0 ? `filter:hue-rotate(${h}deg) saturate(1.1)` : ''}">${h < 0 ? `<div style="position:absolute;inset:0;background:linear-gradient(#9fd6ff,#fff0d8 60%,#8fd0a0 61%)"></div><svg viewBox="-150 -150 300 300" style="position:absolute;inset:0;width:100%;height:100%"><ellipse cx="0" cy="10" rx="90" ry="80" fill="#ff9a5c"/><path d="M-60 -45 L-70 -110 L-20 -65Z M60 -45 L70 -110 L20 -65Z" fill="#ff9a5c"/><ellipse cx="0" cy="40" rx="55" ry="38" fill="#ffd9b8"/><ellipse cx="-32" cy="-2" rx="11" ry="14" fill="#3a2f63"/><ellipse cx="32" cy="-2" rx="11" ry="14" fill="#3a2f63"/><path d="M-12 32 q12 10 24 0" stroke="#5a1f3a" stroke-width="4" fill="none"/></svg>` : art({ unfinished: h === 0 })}${t ? `<span class="t">${ic(t, 12)} 5.0s</span>` : ''}</div><b>${n}</b><small>${s}</small></div>`).join('')}
</div>
<div class="dev glass">
  <span class="lbl" style="margin-right:6px">Connected</span>
  <div class="dv"><i></i>${ic('tablet', 16)} Wacom Cintiq Pro 24 <small>pressure · tilt · rotation</small></div>
  <div class="dv"><i></i>${ic('pen', 16)} XP-Pen Deco Pro <small>8192 levels</small></div>
  <div class="dv"><i></i>${ic('mic', 16)} Blue Yeti <small>48 kHz</small></div>
  <div class="dv"><i></i>${ic('cam', 16)} Logitech Brio <small>4K</small></div>
  <div class="dv" style="margin-left:auto;background:transparent;border:1px dashed var(--line2)">${ic('plus', 16)} Add device</div>
</div>

<div class="shade"></div>
<div class="modal glass">
  <div class="mleft">
    <div class="mh"><h3>Share “Evening Tide”</h3><div class="btn">${ic('x', 18)}</div></div>
    <div class="seg"><span class="on">Image</span><span>Animation</span><span>Project</span><span>Print</span><span>Time-lapse</span></div>
    <div class="fmts">${fmts.map(([x, s, on]) => `<div class="fm ${on ? 'on' : ''}"><span class="x">${x}</span><small>${s}</small></div>`).join('')}</div>
    <div class="imp">${ic('import', 26)}<div><b>Drop files anywhere to import.</b> Opens PSD · PSB · .procreate · .sai / .sai2 · .kra · .clip · .ora · PNG · JPEG · TIFF · WebP · HEIC · RAW · SVG · PDF · GIF · MP4 · MOV · WAV · MP3 · ABR &amp; brushset brushes</div></div>
  </div>
  <div class="mright">
    <div class="pv">${art()}</div>
    <div style="margin-top:16px">
      <div class="row"><span>Size</span><div class="f">4096 × 3072 ${ic('chev', 12)}</div></div>
      <div class="row"><span>Color profile</span><div class="f">Display P3 ${ic('chev', 12)}</div></div>
      <div class="row"><span>Background</span><div class="f">Paper texture ${ic('chev', 12)}</div></div>
      <div class="row"><span>Transparent</span><div class="sw off"></div></div>
      <div class="row"><span>Include time-lapse</span><div class="sw"></div></div>
      <div class="row" style="border:0"><span>Est. file size</span><span>18.4 MB</span></div>
    </div>
    <div class="go">${ic('share', 18, 2)} Export PNG</div>
  </div>
</div>
`;

export const gallery = () => base('Lumastroke — Gallery', css, body);
