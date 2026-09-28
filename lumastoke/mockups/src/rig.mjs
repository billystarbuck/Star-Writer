import { ic, menuBar, base } from './parts.mjs';
import { advCss } from './advanced.mjs';

const css = advCss + `
.stage{bottom:358px}
.cv{left:58px;top:125px;width:960px;height:540px;border-radius:4px}
.acts{padding:8px 10px;display:flex;flex-direction:column;gap:5px}
.act{display:flex;align-items:center;gap:10px;padding:7px 9px;border-radius:9px;background:#1c1b24;border:1px solid transparent}
.act.on{border-color:var(--a2);background:rgba(255,94,138,.1)}
.act .ai{width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex:none}
.act b{display:block;font-size:12px}.act small{color:var(--muted);font-size:10.5px}
.act em{margin-left:auto;font-style:normal;font-size:9.5px;font-weight:700;padding:2px 6px;border-radius:5px;background:#2a2935;color:var(--muted)}
.mouths{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;padding:8px 10px}
.mouths span{height:50px;border-radius:8px;background:#ffe3ea;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;font-size:9px;font-weight:700;color:#5a1f3a}
.mouths span.on{box-shadow:0 0 0 2px var(--a2)}
.bn{display:flex;align-items:center;gap:7px;height:29px;padding:0 10px;font-size:11.5px;color:#d6d3e2;border-bottom:1px solid var(--line)}
.bn i{width:9px;height:9px;transform:rotate(45deg);border-radius:2px;display:block;flex:none}
.bn em{margin-left:auto;font-style:normal;font-size:9.5px;font-weight:700;padding:2px 6px;border-radius:5px}
.bn.on{background:rgba(255,94,138,.1);box-shadow:inset 3px 0 0 var(--a2)}
.dialw{display:flex;gap:12px;align-items:center}
.poseth{display:flex;gap:5px;flex:1}
.poseth span{flex:1;height:56px;border-radius:8px;background:#1c1b24;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:9.5px;color:var(--muted);gap:2px}
.poseth span.on{box-shadow:inset 0 0 0 1.5px var(--a2)}
.tlr{position:absolute;left:514px;right:330px;bottom:28px;height:330px;background:#121118;border-top:1px solid var(--line2);display:flex;flex-direction:column}
.tbar{height:44px;display:flex;align-items:center;gap:8px;padding:0 12px;border-bottom:1px solid var(--line)}
.tb{white-space:nowrap;height:28px;padding:0 9px;border-radius:7px;background:var(--field);display:flex;align-items:center;gap:6px;font-weight:600;border:1px solid var(--line);font-size:11.5px;color:#d6d3e2}
.tb.on{background:rgba(255,94,138,.14);color:#ffb3c7;border-color:rgba(255,94,138,.4)}
.tplay{width:30px;height:30px;border-radius:50%;background:var(--grad);color:#1a1320;display:flex;align-items:center;justify-content:center}
.tbody{flex:1;display:flex}
.chn{width:200px;border-right:1px solid var(--line);flex:none}
.ch{height:40px;display:flex;align-items:center;gap:8px;padding:0 10px;border-bottom:1px solid var(--line);font-size:11.5px;color:#d6d3e2}
.ch i{width:10px;height:10px;border-radius:3px;display:block;flex:none}
.ch small{color:var(--muted);margin-left:auto;font-size:10px}
.graph{flex:1;position:relative;overflow:hidden;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:100% 40px,44px 100%}
`;

const bone = (x1, y1, x2, y2, c, w = 9, sel = false) => {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
  const mx = x1 + dx * .22, my = y1 + dy * .22;
  return `<polygon points="${x1},${y1} ${mx + nx * w},${my + ny * w} ${x2},${y2} ${mx - nx * w},${my - ny * w}" fill="${c}" fill-opacity="${sel ? .75 : .45}" stroke="${sel ? '#fff' : c}" stroke-width="${sel ? 2 : 1.5}"/><circle cx="${x1}" cy="${y1}" r="4" fill="${c}"/>`;
};

const scene = `
<svg viewBox="0 0 960 540" width="960" height="540">
  <defs>
    <linearGradient id="rs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9e8ff"/><stop offset="1" stop-color="#ffeef3"/></linearGradient>
    <linearGradient id="rb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD0DC"/><stop offset="1" stop-color="#FF9EBB"/></linearGradient>
  </defs>
  <rect width="960" height="540" fill="url(#rs)"/>
  <g filter="url(#wc)"><path d="M-20 430 C 200 400, 500 440, 980 410 L980 560 L-20 560Z" fill="#bfe8c8"/></g>
  <ellipse cx="480" cy="470" rx="110" ry="14" fill="#3a2f63" opacity=".15"/>
  <path d="M300 250 C 340 190, 380 170, 420 190" stroke="#ff5e8a" stroke-width="2" stroke-dasharray="3 7" fill="none" opacity=".8"/>
  ${[[300, 250], [330, 215], [362, 192], [395, 184]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${3 + i}" fill="#ff5e8a" opacity="${.3 + i * .15}"/>`).join('')}
  <g stroke="url(#rb)" stroke-linecap="round" fill="none">
    <path d="M540 380 C 600 390, 640 350, 650 300" stroke-width="22"/>
    <path d="M440 310 L405 250 L420 195" stroke-width="26"/>
    <path d="M520 310 L570 340 L610 320" stroke-width="26"/>
    <path d="M455 400 L445 460" stroke-width="30"/><path d="M505 400 L520 460" stroke-width="30"/>
  </g>
  <g fill="url(#rb)" stroke="url(#rb)" stroke-width="8" stroke-linejoin="round">
    <path d="M430 175 L412 100 L470 150Z"/><path d="M540 175 L566 102 L500 150Z"/>
    <ellipse cx="482" cy="215" rx="78" ry="66"/>
    <ellipse cx="480" cy="345" rx="62" ry="72"/>
  </g>
  <ellipse cx="480" cy="360" rx="38" ry="44" fill="#fff" opacity=".45"/>
  <ellipse cx="458" cy="210" rx="11" ry="16" fill="#2B1F4F"/><ellipse cx="510" cy="210" rx="11" ry="16" fill="#2B1F4F"/>
  <circle cx="462" cy="203" r="4.5" fill="#fff"/><circle cx="514" cy="203" r="4.5" fill="#fff"/>
  <ellipse cx="436" cy="236" rx="11" ry="6" fill="#FF4F7B" opacity=".45"/><ellipse cx="532" cy="236" rx="11" ry="6" fill="#FF4F7B" opacity=".45"/>
  <ellipse cx="485" cy="244" rx="10" ry="12" fill="#5A1F3A"/><ellipse cx="485" cy="250" rx="6" ry="4" fill="#ff7f95"/>
  <path d="M420 195 L424 160" stroke="#FFD36B" stroke-width="9" stroke-linecap="round"/>
  <g>
    ${bone(480, 400, 480, 300, '#8A6CFF')}
    ${bone(480, 300, 482, 175, '#FF5E8A', 11, true)}
    ${bone(470, 160, 432, 110, '#5EC8FF', 6)}${bone(496, 160, 548, 112, '#5EC8FF', 6)}
    ${bone(470, 300, 440, 310, '#8A6CFF', 5)}${bone(440, 310, 405, 250, '#FFC56B', 8)}${bone(405, 250, 420, 195, '#FFC56B', 7)}
    ${bone(490, 300, 520, 310, '#8A6CFF', 5)}${bone(520, 310, 570, 340, '#FFC56B', 8)}${bone(570, 340, 610, 320, '#FFC56B', 7)}
    ${bone(470, 400, 455, 400, '#8A6CFF', 4)}${bone(455, 400, 445, 460, '#4ade80', 8)}
    ${bone(490, 400, 505, 400, '#8A6CFF', 4)}${bone(505, 400, 520, 460, '#4ade80', 8)}
  </g>
  <g fill="none" stroke="#fff" stroke-width="2"><circle cx="610" cy="320" r="12"/><path d="M596 320 h28 M610 306 v28"/></g>
  <text x="628" y="316" font-family="Inter" font-weight="700" font-size="11" fill="#3a2f63">IK</text>
  <g stroke="#FF5E8A" stroke-width="2" fill="none"><path d="M540 380 C 600 390, 640 350, 650 300"/><path d="M600 385 L 625 395 M 638 340 L 660 330" stroke-dasharray="3 4"/></g>
  ${[[540, 380], [600, 385], [650, 300]].map(([x, y]) => `<rect x="${x - 5}" y="${y - 5}" width="10" height="10" rx="2" fill="#fff" stroke="#FF5E8A" stroke-width="2"/>`).join('')}
  <text x="662" y="298" font-family="Inter" font-weight="700" font-size="11" fill="#FF5E8A">Curver · tail</text>
  <g transform="translate(600 150)">
    <circle r="30" fill="rgba(20,18,32,.8)" stroke="#FF5E8A" stroke-width="2"/>
    <path d="M0 0 L 20 -22" stroke="#FF5E8A" stroke-width="3" stroke-linecap="round"/>
    <path d="M-22 -20 A 30 30 0 0 1 22 -20" stroke="#fff" stroke-width="2" fill="none" opacity=".5"/>
    <text x="40" y="-6" font-family="Inter" font-weight="700" font-size="12" fill="#3a2f63">Smart bone</text>
    <text x="40" y="10" font-family="Inter" font-size="11" fill="#3a2f63">Head turn · 35°</text>
  </g>
  <g stroke="#5EC8FF" stroke-width="2" fill="none" stroke-linecap="round" opacity=".9"><path d="M392 92 q-10 -8 -2 -18 M384 108 q-14 -4 -12 -16"/><path d="M580 96 q10 -8 2 -18"/></g>
  <g fill="#FFD36B">${[[330, 120, 8], [700, 200, 6], [680, 420, 7], [260, 360, 5]].map(([x, y, r]) => `<path d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z"/>`).join('')}</g>
  <rect x="24" y="24" width="912" height="492" fill="none" stroke="#3a2f63" stroke-width="1.5" stroke-dasharray="8 6" opacity=".35"/>
  <text x="34" y="44" font-family="Inter" font-weight="600" font-size="11" fill="#3a2f63" opacity=".6">Camera · 1920×1080 · title safe</text>
</svg>`;

const mouth = (k) => ({
  AI: '<ellipse cx="15" cy="10" rx="9" ry="7" fill="#5A1F3A"/>',
  E: '<ellipse cx="15" cy="10" rx="10" ry="4" fill="#5A1F3A"/>',
  O: '<ellipse cx="15" cy="10" rx="6" ry="7" fill="#5A1F3A"/>',
  U: '<ellipse cx="15" cy="10" rx="4" ry="5" fill="#5A1F3A"/>',
  MBP: '<path d="M6 10 h18" stroke="#5A1F3A" stroke-width="2.5" stroke-linecap="round"/>',
  FV: '<path d="M7 9 q8 6 16 0" stroke="#5A1F3A" stroke-width="2.5" fill="#fff"/>',
  L: '<ellipse cx="15" cy="10" rx="8" ry="6" fill="#5A1F3A"/><ellipse cx="15" cy="7" rx="4" ry="2" fill="#ff7f95"/>',
  WQ: '<circle cx="15" cy="10" r="4" fill="#5A1F3A"/>',
  etc: '<ellipse cx="15" cy="10" rx="7" ry="3.5" fill="#5A1F3A"/>',
  rest: '<path d="M8 8 q7 6 14 0" stroke="#5A1F3A" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
}[k]);

const W = 870; // graph width
const body = `
${menuBar('Rig & Motion')}
<div class="opts">
  <div class="f" style="gap:8px">${ic('pen', 14)} Transform Bone ${ic('chev', 12)}</div>
  <div class="vsep"></div>
  <div class="o"><span class="tg on">IK</span><span class="tg">FK</span></div>
  <div class="o">Bone strength <div class="f">1.00</div></div>
  <div class="o">Constraints <span class="tg on">Angle</span><span class="tg">Squash</span><span class="tg on">Delayed 2f</span></div>
  <div class="vsep"></div>
  <div class="o">Dynamics <span class="tg on">On</span></div>
  <div class="o">Interpolation <div class="f">Bezier · ease ${ic('chev', 12)}</div></div>
  <div class="vsep"></div>
  <div class="o">${ic('eye', 15)} Show <span class="tg on">Bones</span><span class="tg on">Paths</span><span class="tg">Mesh</span></div>
  <div class="o" style="margin-left:auto">Capture <span class="tg on">${'Face tracking'}</span></div>
</div>

<div class="dockL">
  <div class="ph"><div class="t"><span class="on">Actions</span><span>Rig templates</span></div>${ic('plus', 15)}</div>
  <div class="acts">
    ${[
      ['Idle · breathe', 'Loop · 48 f', '#8A6CFF', 'wind', 'LOOP'], ['Walk cycle', 'Loop · 12 f', '#4ade80', 'loop', 'LOOP'],
      ['Run', 'Loop · 8 f', '#4ade80', 'loop', 'LOOP'], ['Head turn L ↔ R', 'Smart bone dial', '#FF5E8A', 'rotate', 'SMART', true],
      ['Blink', 'Switch · 3 f', '#5EC8FF', 'eye', 'SWITCH'], ['Talk (lip-sync)', 'From voice take 3', '#FFC56B', 'mic', 'AUTO'],
      ['Happy bounce', 'Physics · 16 f', '#FF9EBB', 'sparkle', 'PHYS'],
    ].map(([n, s, c, i, t, on]) => `<div class="act ${on ? 'on' : ''}"><div class="ai" style="background:${c}22;color:${c}">${ic(i, 17)}</div><div><b>${n}</b><small>${s}</small></div><em>${t}</em></div>`).join('')}
  </div>
  <div class="ph" style="border-top:1px solid var(--line)"><div class="t"><span class="on">Switch · Mouth</span><span>Eyes</span><span>Hands</span></div></div>
  <div class="mouths">${['AI', 'E', 'O', 'U', 'MBP', 'FV', 'L', 'WQ', 'etc', 'rest'].map(k => `<span class="${k === 'O' ? 'on' : ''}"><svg width="30" height="20" viewBox="0 0 30 20">${mouth(k)}</svg>${k}</span>`).join('')}</div>
</div>

<div class="dockT">
  <div class="ph"><div class="t"><span class="on">Rig tools</span></div>${ic('plus', 15)}</div>
  <div class="tools">${[
    ['Add bone', '#8A6CFF'], ['Select bone', '#8A6CFF'], ['Transform bone', '#FF5E8A', 1], ['Bone strength', '#8A6CFF'],
    ['Reparent', '#8A6CFF'], ['Smart bone', '#FF5E8A'], ['IK lock', '#FFC56B'], ['Vitruvian', '#FFC56B'],
    ['Curver', '#FF5E8A'], ['Mesh warp', '#5EC8FF'], ['Pin', '#5EC8FF'], ['Offset', '#5EC8FF'],
    ['Dynamics', '#4ade80'], ['Particles', '#4ade80'], ['Liquid shape', '#4ade80'], ['Line boil', '#4ade80'],
    ['Camera', '#d9d6e6'], ['Orbit 3D', '#d9d6e6'], ['Draw vector', '#d9d6e6'], ['Freehand style', '#d9d6e6'],
  ].map(([n, c, on]) => `<div class="tl ${on ? 'on' : ''}"><i style="background:${c}"></i>${n}</div>`).join('')}</div>
  <div class="ph" style="border-top:1px solid var(--line)"><div class="t"><span class="on">Physics</span></div></div>
  <div class="props">${[['Gravity', 60], ['Wind', 25], ['Follow-thru', 70], ['Wiggle', 45], ['Damping', 55], ['Particles', 30]].map(([n, v]) => `<div class="pr wet"><span class="n">${n}</span><div class="tr"><i style="width:${v}%"></i><em>${v}</em></div></div>`).join('')}</div>
</div>

<div class="stage">
  <div class="rul h"></div><div class="rul v"></div>
  <div class="tabsC"><span class="on">Mochi — rig.luma ${ic('x', 12)}</span><span>Episode 1 — scene 3.luma ${ic('x', 12)}</span></div>
  <div class="cv">${scene}</div>
</div>

<div class="tlr">
  <div class="tbar">
    <div class="tb">${ic('back', 13)}</div><div class="tplay">${ic('play', 14, 1.7, true)}</div><div class="tb">${ic('fwd', 13)}</div>
    <span class="mono" style="font-size:13px;padding:0 6px">frame 24 <span style="color:var(--muted)">/ 96 · 24 fps</span></span>
    <div class="vsep"></div>
    <div class="tb on">Graph</div><div class="tb">Dope sheet</div><div class="tb">X-sheet</div>
    <div class="vsep"></div>
    <div class="tb">Freeze keys</div><div class="tb">Reset pose</div><div class="tb">Push frames</div>
    <div class="tb" style="margin-left:auto">${ic('onion', 13)} Onion</div><div class="tb">${ic('mic', 13)} Voice</div>
  </div>
  <div class="tbody">
    <div class="chn">
      ${[['Head turn', '#FF5E8A', 'smart'], ['Arm R · IK', '#FFC56B', 'bone'], ['Tail', '#FF9EBB', 'curver'], ['Ears', '#5EC8FF', 'dyn'], ['Camera zoom', '#d9d6e6', 'cam'], ['Mouth', '#4ade80', 'switch']].map(([n, c, s]) => `<div class="ch"><i style="background:${c}"></i>${n}<small>${s}</small></div>`).join('')}
    </div>
    <div class="graph">
      <svg width="${W}" height="240" style="position:absolute;top:0;left:0">
        <path d="M0 150 C 90 150, 120 40, 220 40 S 360 170, 470 160 S 640 60, ${W} 70" stroke="#FF5E8A" stroke-width="2.5" fill="none"/>
        <path d="M0 110 C 70 60, 150 190, 260 170 S 420 70, 560 90 S 760 190, ${W} 150" stroke="#FFC56B" stroke-width="2.5" fill="none"/>
        <path d="M0 190 C 50 120, 110 210, 170 150 S 260 210, 330 150 S 430 200, 500 160 S 620 200, ${W} 170" stroke="#FF9EBB" stroke-width="2" fill="none" opacity=".9"/>
        <path d="M0 80 L${W} 60" stroke="#d9d6e6" stroke-width="1.5" fill="none" stroke-dasharray="5 4" opacity=".7"/>
        ${[[220, 40, '#FF5E8A'], [470, 160, '#FF5E8A'], [260, 170, '#FFC56B'], [560, 90, '#FFC56B'], [0, 150, '#FF5E8A'], [0, 110, '#FFC56B']].map(([x, y, c]) => `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" transform="rotate(45 ${x} ${y})" fill="${c}" stroke="#121118" stroke-width="2"/>`).join('')}
        <g stroke="#fff" stroke-width="1.5" opacity=".8"><line x1="170" y1="40" x2="270" y2="40"/><circle cx="170" cy="40" r="4" fill="#121118"/><circle cx="270" cy="40" r="4" fill="#121118"/></g>
      </svg>
      <div style="position:absolute;left:0;right:0;top:200px;height:40px;display:flex;gap:2px;padding:6px 0">
        ${[['rest', 60], ['MBP', 30], ['AI', 70], ['O', 60], ['E', 50], ['L', 40], ['O', 80], ['WQ', 40], ['rest', 90], ['AI', 60], ['E', 70], ['rest', 150]].map(([k, w]) => `<span style="width:${w}px;border-radius:6px;background:rgba(74,222,128,.18);color:#8ff0b0;font:700 10px Inter;display:flex;align-items:center;padding-left:6px;flex:none">${k}</span>`).join('')}
      </div>
      <div style="position:absolute;left:258px;top:0;bottom:0;width:2px;background:var(--a2);box-shadow:0 0 10px var(--a2)"></div>
    </div>
  </div>
</div>

<div class="dockR">
  <div class="ph"><div class="t"><span class="on">Bones</span><span>Layers</span><span>Switch</span></div>${ic('more', 16, 3)}</div>
  ${[
    ['Root · hips', 0, '#8A6CFF'], ['Spine', 1, '#8A6CFF'], ['Head', 2, '#FF5E8A', 'SMART', 1], ['Ear L', 3, '#5EC8FF', 'DYN'], ['Ear R', 3, '#5EC8FF', 'DYN'],
    ['Arm L', 2, '#FFC56B'], ['Arm R', 2, '#FFC56B', 'IK'], ['Leg L', 1, '#4ade80'], ['Leg R', 1, '#4ade80'], ['Tail', 1, '#FF9EBB', 'CURVER'],
  ].map(([n, d, c, t, on]) => `<div class="bn ${on ? 'on' : ''}" style="padding-left:${10 + d * 14}px"><i style="background:${c}"></i>${n}${t ? `<em style="background:${c}22;color:${c}">${t}</em>` : ''}</div>`).join('')}
  <div class="ph" style="border-top:1px solid var(--line)"><div class="t"><span class="on">Smart bone · Head turn</span></div></div>
  <div class="pb">
    <div class="dialw">
      <svg width="70" height="70" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30" fill="#1c1b24" stroke="#2a2935" stroke-width="2"/><path d="M11 22 A 28 28 0 0 1 59 22" stroke="var(--a2)" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M35 35 L52 16" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="35" cy="35" r="4" fill="#fff"/></svg>
      <div class="poseth">${['−45°', '0°', '+35°'].map((l, i) => `<span class="${i === 2 ? 'on' : ''}"><svg width="30" height="26" viewBox="0 0 30 26"><ellipse cx="15" cy="15" rx="12" ry="10" fill="#FFB3C7"/><ellipse cx="${10 + i * 3}" cy="14" rx="2" ry="3" fill="#2B1F4F"/><ellipse cx="${18 + i * 3}" cy="14" rx="2" ry="3" fill="#2B1F4F"/></svg>${l}</span>`).join('')}</div>
    </div>
    <div class="sl"><span style="width:70px">Corrective</span><div class="tr"><i style="width:80%"></i><b style="left:80%"></b></div><span class="v">3 poses</span></div>
  </div>
  <div class="ph" style="border-top:1px solid var(--line)"><div class="t"><span class="on">Vitruvian sets</span></div></div>
  <div class="pb" style="display:flex;gap:6px"><span class="tg on">Front</span><span class="tg">¾ view</span><span class="tg">Side</span><span class="tg">Back</span></div>
</div>

<div class="status">
  <span><span class="dot"></span><b>Logitech Brio</b> · face tracking → Head turn, Blink, Mouth</span>
  <span>Rig: 14 bones · 2 smart · 1 curver</span><span>Physics: ears, tail</span>
  <span style="margin-left:auto">Export: MP4 · MOV α · Lottie · glTF / FBX</span><span>Autosaved 5 s ago</span>
</div>
`;

export const rig = () => base('Lumastoke — Rig & Motion', css, body);
