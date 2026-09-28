import { ic, logo, toggle, base } from './parts.mjs';

const css = `
body{background:radial-gradient(1400px 800px at 45% 30%,#1b1a26,#0b0b10)}
.top{position:absolute;left:0;right:0;top:0;height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 18px}
.grp{display:flex;align-items:center;gap:4px}
.gal{display:flex;align-items:center;gap:10px;padding:0 14px 0 6px;font-weight:600;font-size:19px;font-family:Fraunces,serif}
.sep{width:1px;height:22px;background:var(--line2);margin:0 8px}
.center{position:absolute;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:16px}
.doc{font-weight:600}.doc small{display:block;color:var(--muted);font-size:11px;font-weight:500}
.badge{display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:rgba(138,108,255,.16);color:#b9a8ff;font-weight:600;font-size:12px}
.swatch{width:34px;height:34px;border-radius:50%;background:#ff9a5c;border:3px solid var(--solid);box-shadow:0 0 0 1.5px var(--line2);margin-left:8px}
.canvas{position:absolute;left:330px;top:78px;width:1000px;height:640px;border-radius:6px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.55)}
.tl{position:absolute;left:18px;right:18px;bottom:18px;height:440px;border-radius:22px;overflow:hidden;display:flex;flex-direction:column}
.bar{display:flex;align-items:center;gap:10px;height:58px;padding:0 16px;border-bottom:1px solid var(--line)}
.pb{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--text)}
.play{width:48px;height:48px;border-radius:50%;background:var(--grad);color:#1a1320;box-shadow:0 6px 20px rgba(255,94,138,.4)}
.f{height:32px;padding:0 11px;border-radius:9px;background:var(--field);display:flex;align-items:center;gap:7px;font-weight:600;border:1px solid var(--line)}
.f em{font-style:normal;color:var(--muted);font-weight:500}
.f.on{background:rgba(138,108,255,.18);color:#c5b8ff;border-color:rgba(138,108,255,.4)}
.f.ai{background:linear-gradient(120deg,rgba(255,197,107,.18),rgba(255,94,138,.18));border-color:rgba(255,94,138,.4);color:#ffc2cf}
.tc{font-family:'JetBrains Mono';font-size:15px;font-weight:500;padding:0 10px}.tc small{color:var(--muted);font-size:12px}
.grid{flex:1;display:flex;position:relative}
.names{width:230px;border-right:1px solid var(--line);flex:none}
.ruler{height:30px;border-bottom:1px solid var(--line);position:relative;font-family:'JetBrains Mono';font-size:10px;color:var(--dim)}
.tn{height:66px;display:flex;align-items:center;gap:10px;padding:0 14px;border-bottom:1px solid var(--line);font-weight:600}
.tn small{display:block;color:var(--muted);font-weight:500;font-size:11px}
.tn .ico{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex:none}
.tn .ey{margin-left:auto;color:var(--muted);display:flex;gap:8px}
.tn.on{background:rgba(255,94,138,.07)}
.lanes{flex:1;position:relative;overflow:hidden}
.lane{height:66px;border-bottom:1px solid var(--line);position:relative}
.cell{position:absolute;top:10px;height:46px;border-radius:8px;display:flex;align-items:center;padding-left:6px;overflow:hidden}
.cell i{display:block;width:34px;height:34px;border-radius:5px;background:#f1e9dc;flex:none;overflow:hidden}
.key{position:absolute;top:27px;width:12px;height:12px;transform:rotate(45deg);border-radius:2px;background:var(--a1)}
.ph{position:absolute;top:0;bottom:0;width:2px;background:var(--a2);box-shadow:0 0 12px var(--a2)}
.ph:before{content:'37';position:absolute;top:3px;left:-16px;width:34px;height:22px;border-radius:7px;background:var(--a2);color:#fff;font:600 11px 'JetBrains Mono';display:flex;align-items:center;justify-content:center}
.pho{position:absolute;top:9px;font:600 10px Inter;color:#1a1320;padding:2px 6px;border-radius:5px;background:#ffc56b}
.pip{position:absolute;right:18px;top:78px;width:540px;border-radius:20px;overflow:hidden;padding:12px}
.vid{height:290px;border-radius:12px;position:relative;overflow:hidden;background:radial-gradient(260px 200px at 60% 45%,#6a5a7a,#2a2433 60%,#16131c)}
.rec{position:absolute;left:12px;top:12px;display:flex;align-items:center;gap:6px;padding:5px 10px;border-radius:8px;background:rgba(0,0,0,.55);font-weight:700;font-size:11px}
.rec i{width:8px;height:8px;border-radius:50%;background:#ff4d5e;display:block;box-shadow:0 0 8px #ff4d5e}
.vtag{position:absolute;right:12px;top:12px;padding:5px 9px;border-radius:8px;background:rgba(0,0,0,.55);font-size:11px;color:#ddd}
.vctl{display:flex;align-items:center;gap:8px;margin-top:10px}
.vol{flex:1;display:flex;align-items:center;gap:2px;height:36px;padding:0 10px;border-radius:10px;background:var(--field)}
.vol span{flex:1;border-radius:2px;background:linear-gradient(0deg,#4ade80,#ffc56b)}
.sub{margin-top:10px;padding:10px 12px;border-radius:12px;background:var(--field);font-size:12px;color:var(--muted);line-height:1.5}
.sub b{color:var(--text)}
.side{position:absolute;left:18px;top:78px;width:290px;border-radius:20px;padding:14px}
.fr{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}
.fr div{aspect-ratio:1.4;border-radius:8px;background:#f1e9dc;position:relative;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(0,0,0,.1)}
.fr div.on{box-shadow:0 0 0 2px var(--a2)}
.fr div small{position:absolute;left:4px;bottom:3px;font:600 9px 'JetBrains Mono';color:#6b6070}
.opt{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--line);font-weight:500}
.opt span:last-child{color:var(--muted)}
.sw{width:34px;height:20px;border-radius:20px;background:var(--grad);position:relative}.sw:after{content:'';position:absolute;right:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#fff}
.sw.off{background:var(--field)}.sw.off:after{right:auto;left:2px;background:#888}
`;

// Mochi, a round little creature, drawn at a given pose.
const mochi = (x, y, sx = 1, sy = 1, tint = null, mouth = 'o', op = 1) => {
  const body = tint || '#ff9a5c';
  const dark = tint || '#3a2f63';
  const ghost = tint ? `fill-opacity=".35" stroke="${tint}" stroke-width="5" stroke-linejoin="round"` : '';
  return `<g transform="translate(${x} ${y}) scale(${sx} ${sy})" opacity="${op}" ${ghost}>
    <ellipse cx="0" cy="0" rx="90" ry="80" fill="${body}"/>
    <path d="M-60 -55 L-70 -120 L-20 -75Z M60 -55 L70 -120 L20 -75Z" fill="${body}"/>
    ${tint ? '' : `<ellipse cx="0" cy="30" rx="55" ry="38" fill="#ffd9b8"/>
    <ellipse cx="-32" cy="-12" rx="11" ry="14" fill="${dark}"/><ellipse cx="32" cy="-12" rx="11" ry="14" fill="${dark}"/>
    <circle cx="-28" cy="-17" r="4" fill="#fff"/><circle cx="36" cy="-17" r="4" fill="#fff"/>
    <ellipse cx="-55" cy="12" rx="12" ry="7" fill="#ff6f7f" opacity=".6"/><ellipse cx="55" cy="12" rx="12" ry="7" fill="#ff6f7f" opacity=".6"/>
    ${mouth === 'o' ? `<ellipse cx="0" cy="22" rx="12" ry="15" fill="#5a1f3a"/><ellipse cx="0" cy="30" rx="7" ry="5" fill="#ff7f95"/>` : `<path d="M-12 20 q12 10 24 0" stroke="#5a1f3a" stroke-width="4" fill="none" stroke-linecap="round"/>`}`}
  </g>`;
};

const scene = `
<svg viewBox="0 0 1000 640" width="1000" height="640">
  <defs><linearGradient id="as" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd6ff"/><stop offset="1" stop-color="#fff0d8"/></linearGradient></defs>
  <rect width="1000" height="640" fill="url(#as)"/>
  <g filter="url(#wc)"><path d="M-20 470 C 200 420, 400 480, 620 440 S 900 430, 1020 460 L1020 660 L-20 660Z" fill="#8fd0a0"/>
  <path d="M-20 520 C 250 500, 500 540, 1020 510 L1020 660 L-20 660Z" fill="#6bb88a"/></g>
  <g filter="url(#wc2)" opacity=".9"><ellipse cx="200" cy="120" rx="90" ry="30" fill="#fff"/><ellipse cx="760" cy="90" rx="120" ry="34" fill="#fff"/></g>
  ${mochi(240, 330, .95, 1.05, '#ff5e8a', 'o', .45)}
  ${mochi(380, 250, 1.02, .98, '#ff5e8a', 'o', .65)}
  ${mochi(660, 350, 1.1, .9, '#4ade80', 'o', .6)}
  <ellipse cx="520" cy="505" rx="80" ry="12" fill="#3a2f63" opacity=".22"/>
  ${mochi(520, 290, .96, 1.04)}
  <g stroke="#3a2f63" stroke-width="3" stroke-linecap="round" opacity=".5"><path d="M440 200 l-20 -20M600 200 l20 -20M520 175 v-24"/></g>
  <rect width="1000" height="640" fill="#fff" filter="url(#grain)" opacity=".18"/>
</svg>`;

const frames = 48; // visible frames
const W = 1612 / frames; // lane width / frames (approx)
const at = (f) => Math.round(f * W);
const cells = (list, color, withThumb = true) => list.map(([a, b]) => `<div class="cell" style="left:${at(a) + 2}px;width:${at(b - a) - 4}px;background:${color}">${withThumb ? `<i style="background:#f1e9dc"><svg viewBox="-110 -130 220 230" width="34" height="34">${mochi(0, 0, 1, 1)}</svg></i>` : ''}</div>`).join('');

const wave = Array.from({ length: 150 }, (_, i) => {
  const v = Math.abs(Math.sin(i * .37) * Math.sin(i * .11 + 1)) * (i > 20 && i < 130 ? 1 : .15);
  return `<rect x="${i * 10.7}" y="${33 - v * 26}" width="5" height="${Math.max(2, v * 52)}" rx="2" fill="#5ec8ff" opacity=".85"/>`;
}).join('');

const body = `
<div class="top">
  <div class="grp"><div class="gal">${logo(28)}Lumastoke</div><div class="sep"></div>
    <div class="btn">${ic('gallery')}</div><div class="btn">${ic('wrench')}</div><div class="btn">${ic('wand')}</div><div class="btn">${ic('select')}</div><div class="btn">${ic('move')}</div></div>
  <div class="center"><div class="doc">Mochi — hello!<small>1920 × 1080 · 24 fps · 5.0 s</small></div><div class="badge">${ic('film', 14)} Animation</div>${toggle(false)}</div>
  <div class="grp"><div class="btn on">${ic('brush')}</div><div class="btn">${ic('smudge')}</div><div class="btn">${ic('eraser')}</div><div class="btn">${ic('layers')}</div><div class="swatch"></div></div>
</div>

<div class="side glass">
  <div class="lbl">Frames near playhead</div>
  <div class="fr">${[34, 35, 36, 37, 38, 39].map(n => `<div class="${n === 37 ? 'on' : ''}"><svg viewBox="-120 -140 240 250" width="100%" height="100%">${mochi(0, (n % 3) * 8, 1, 1, null, n % 2 ? 'o' : 's')}</svg><small>${n}</small></div>`).join('')}</div>
  <div style="margin-top:14px">
    <div class="opt"><span>Onion skin</span><div class="sw"></div></div>
    <div class="opt"><span>Before / after</span><span>2 ◂ ▸ 1</span></div>
    <div class="opt"><span>Onion colors</span><span><b style="color:#ff5e8a">●</b> <b style="color:#4ade80">●</b></span></div>
    <div class="opt"><span>Auto lip-sync</span><div class="sw"></div></div>
    <div class="opt"><span>Loop playback</span><div class="sw"></div></div>
    <div class="opt" style="border:0"><span>Rotoscope video</span><div class="sw off"></div></div>
  </div>
</div>

<div class="canvas">${scene}</div>

<div class="pip glass">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><span style="font-weight:700;display:flex;gap:8px;align-items:center">${ic('cam', 17)} Reference capture</span><span style="color:var(--muted);font-size:12px">Pin to canvas</span></div>
  <div class="vid">
    <svg viewBox="0 0 516 290" width="516" height="290" style="position:absolute;inset:0">
      <ellipse cx="300" cy="120" rx="52" ry="62" fill="#c79a86"/>
      <path d="M190 300 C 200 210, 250 190, 300 188 C 350 190, 400 210, 410 300Z" fill="#43607a"/>
      <path d="M250 90 C 255 50, 345 45, 352 95 C 340 70, 270 70, 250 90Z" fill="#2c2230"/>
      <ellipse cx="300" cy="148" rx="13" ry="16" fill="#5a1f3a"/>
      <g stroke="#5ec8ff" stroke-width="2" fill="none" opacity=".9"><rect x="230" y="50" width="140" height="150" rx="10" stroke-dasharray="6 5"/></g>
      <g fill="#5ec8ff"><circle cx="280" cy="112" r="3"/><circle cx="320" cy="112" r="3"/><circle cx="300" cy="134" r="3"/><circle cx="288" cy="150" r="3"/><circle cx="312" cy="150" r="3"/></g>
    </svg>
    <div class="rec"><i></i>REC 00:04.12</div><div class="vtag">Logitech Brio · 1080p60</div>
  </div>
  <div class="vctl"><div class="f">${ic('mic', 15)} Blue Yeti</div><div class="vol">${Array.from({ length: 34 }, (_, i) => `<span style="height:${6 + Math.abs(Math.sin(i * .9)) * 22 * (i < 26 ? 1 : .2)}px;${i > 25 ? 'background:var(--field2,#3a3848)' : ''}"></span>`).join('')}</div><div class="f ai">${ic('sparkle', 14)} Face tracking</div></div>
  <div class="sub"><b>Voice take 3</b> is on the timeline. Mouth shapes were matched to the words — drag any <b>phoneme tag</b> to adjust timing.</div>
</div>

<div class="tl glass">
  <div class="bar">
    <div class="pb">${ic('back', 18)}</div><div class="pb play">${ic('play', 20, 1.7, true)}</div><div class="pb">${ic('fwd', 18)}</div>
    <div class="tc">00:01:13 <small>· frame 37 / 120</small></div>
    <div class="sep"></div>
    <div class="f">24 <em>fps</em> ${ic('chev', 12)}</div>
    <div class="f on">${ic('onion', 15)} Onion 2 · 1</div>
    <div class="f on">${ic('loop', 15)} Loop</div>
    <div class="f">${ic('plus', 15)} Frame</div>
    <div class="f">Hold <em>×2</em></div>
    <div class="f ai">${ic('sparkle', 14)} Lip-sync from voice</div>
    <div style="margin-left:auto;display:flex;gap:8px">
      <div class="f" style="color:#ff6b7c">${ic('mic', 15)} Record voice</div>
      <div class="f">${ic('cam', 15)} Import video</div>
      <div class="f">${ic('share', 15)} Export MP4</div>
    </div>
  </div>
  <div class="grid">
    <div class="names">
      <div class="ruler"></div>
      <div class="tn"><div class="ico" style="background:rgba(94,200,255,.15);color:var(--wet)">${ic('mic', 16)}</div><div>Voice take 3<small>Audio · 4.6 s</small></div><div class="ey">${ic('eye', 15)}</div></div>
      <div class="tn on"><div class="ico" style="background:rgba(255,94,138,.15);color:var(--a2)">${ic('pen', 16)}</div><div>Mochi — line<small>Frame-by-frame</small></div><div class="ey">${ic('eye', 15)}</div></div>
      <div class="tn"><div class="ico" style="background:rgba(255,197,107,.15);color:var(--a1)">${ic('brush', 16)}</div><div>Mochi — paint<small>Wet watercolor</small></div><div class="ey">${ic('eye', 15)}</div></div>
      <div class="tn"><div class="ico" style="background:rgba(74,222,128,.15);color:#4ade80">${ic('image', 16)}</div><div>Meadow<small>Background · held</small></div><div class="ey">${ic('lock', 15)}</div></div>
      <div class="tn"><div class="ico" style="background:rgba(138,108,255,.15);color:#b9a8ff">${ic('cam', 16)}</div><div>Camera reference<small>Video · 50% · hidden</small></div><div class="ey">${ic('eyeoff', 15)}</div></div>
    </div>
    <div class="lanes">
      <div class="ruler">${Array.from({ length: 10 }, (_, i) => `<span style="position:absolute;left:${at(i * 5) + 4}px;top:8px">${i * 5 + 13}</span><span style="position:absolute;left:${at(i * 5)}px;top:20px;width:1px;height:10px;background:var(--line2)"></span>`).join('')}</div>
      <div class="lane"><svg width="1612" height="66" style="position:absolute;top:0">${wave}</svg>
        ${[[3, 'HI'], [9, 'M'], [14, 'O'], [20, 'CH'], [24, 'I'], [30, 'L'], [36, 'O'], [41, 'E']].map(([f, t]) => `<span class="pho" style="left:${at(f)}px">${t}</span>`).join('')}
      </div>
      <div class="lane" style="background:rgba(255,94,138,.04)">${cells([[0, 2], [2, 4], [4, 6], [6, 8], [8, 10], [10, 12], [12, 14], [14, 16], [16, 18], [18, 20], [20, 22], [22, 24], [24, 26], [26, 28], [28, 30], [30, 32], [32, 34], [34, 36], [36, 38], [38, 40], [40, 42], [42, 44]], 'rgba(255,94,138,.22)')}</div>
      <div class="lane">${cells([[0, 4], [4, 8], [8, 12], [12, 16], [16, 20], [20, 24], [24, 28], [28, 32], [32, 36], [36, 40], [40, 44]], 'rgba(255,197,107,.2)')}</div>
      <div class="lane"><div class="cell" style="left:2px;width:1580px;background:rgba(74,222,128,.14)"><i style="width:60px;background:linear-gradient(#9fd6ff,#8fd0a0)"></i><span style="margin-left:10px;color:#9fe8b8;font-weight:600">Meadow — held 120 frames</span></div></div>
      <div class="lane" style="opacity:.55"><div class="cell" style="left:2px;width:1580px;background:rgba(138,108,255,.16);padding-left:4px;gap:3px">${Array.from({ length: 30 }, () => `<i style="width:50px;background:radial-gradient(9px 11px at 55% 40%,#c79a86 95%,transparent),radial-gradient(22px 14px at 55% 100%,#43607a 95%,transparent),#2a2433"></i>`).join('')}</div></div>
      <div class="ph" style="left:${at(24)}px"></div>
    </div>
  </div>
</div>
`;

export const animation = () => base('Lumastoke — Animation', css, body);
