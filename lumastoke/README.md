# Lumastoke — UI mockups

The logo is **Mochi Splash** (concept 06). The full feature list is in [`FEATURES.md`](FEATURES.md).

Lumastoke is a digital painting and animation app. It pairs **Procreate's simplicity**
with **Rebelle-style realistic paint** and **PaintTool SAI's depth of tools**. It has two
modes: **Normal** (calm, easy to learn) and **Advanced** (every tool, docked panels).

All mockups are 1920×1200 PNGs in [`mockups/`](mockups/).

| # | Screen | What it shows |
|---|--------|---------------|
| 01 | Normal studio (dark) | The canvas fills the screen. Procreate-style top bar (Gallery / Actions / Adjust / Select / Transform on the left, Brush / Smudge / Eraser / Layers / Color on the right), a size and opacity side bar, and a Quick Dock with recent brushes, color history, a **Wet ↔ Dry** paint meter, and one-tap mic and camera capture. |
| 02 | Normal: brushes and color | A brush library with *realistic* stroke previews on paper (WET, BLEEDS and BRISTLE tags). A color popover with a Procreate disc and a Rebelle-style **real-pigment mixing palette**. |
| 03 | Advanced workspace | SAI-style docks: Navigator, HSV wheel and sliders, scratch pad, a tool grid, size-preset dots, Blending / Dilution / Persistence plus Wetness / Paint load / Granulation / Edge darken. A layer stack with WET badges, clipping and folders. A Paint Physics panel (Wet all, Dry all, Blow, canvas tilt, drying speed). A pressure-curve overlay, document tabs, and a device status bar. |
| 04 | Animation and capture | Frame-by-frame animation with onion skins. A timeline with a voice track, auto lip-sync phoneme tags, a held background, and a camera-reference track. A live reference-capture window with face tracking. |
| 05 | Gallery, import and export | A home gallery with Start / Animate / Capture / Open cards and a connected-devices strip (tablets, mic, camera). An export sheet covering image, animation, project, print and time-lapse formats, plus the list of importable files. |
| 06 | Normal studio (Paper light theme) | Screen 01 in a warm light theme. |
| 07 | Advanced: Ink & Comic | Clip Studio-style manga page tools. A page manager and story editor on the left. Vector G-pen, panel cut, balloons, SFX lettering, screen tones, speed and focus lines, perspective rulers, and a 3D pose mannequin. Bleed and trim guides, plus a floating action bar under the selection. |
| 08 | Advanced: Rig & Motion | Moho-style rigging on Mochi. FK/IK bones, a Smart Bone dial with corrective poses, a curver on the tail, and dynamics on the ears. An actions library, switch-layer mouth shapes, a graph editor with a lip-sync track, and face tracking from the webcam. |
| 09 | Feature map | Every feature from Rebelle, SAI, Clip Studio EX and Moho Pro, sorted into the six workspaces, tagged by source, and marked Normal or Advanced. |

## Design language
- **Canvas first.** The chrome is small, floating "glass" panels over a deep ink background. The artwork is the brightest thing on screen.
- **One accent.** A "luma" gradient (amber → rose → violet) marks the active state and the mode toggle. Blue is kept for wet paint only.
- **The mode toggle is always in the top center.** Normal ⇄ Advanced swaps the layout without changing the document. The Normal tools live on in Advanced, just with more around them.
- **Physical-paint vocabulary.** Wet/Dry, paper, pigment and tilt appear in Normal as friendly hints. Advanced exposes the full physics.

## Regenerating
```
NODE_PATH=$(npm root -g) node lumastoke/mockups/src/build.mjs
```
This needs Playwright and Chromium. The HTML sources are in `mockups/src/`.

# Logo and slogan concepts (round 1)

There are six directions in [`branding/`](branding/). `00-logo-concepts-overview.png` shows them all side by side:

| # | Concept | Slogan |
|---|---------|--------|
| 01 | Spark Drop: a paint drop with an anime "kira" sparkle | Paint the light. Bring it to life. |
| 02 | Neko Brush: a happy paint-cat face with a brush-stroke tail | Draw it. Paint it. Make it move. |
| 03 | Star Stroke: a brush stroke that becomes a smiling shooting star | Every frame, a spark. |
| 04 | Kira Eye: a sparkling anime eye with a gradient iris | See it. Draw it. Watch it move. |
| 05 | Film Ribbon: an "L" drawn as animation film | Where sketches come alive. |
| 06 | Mochi Splash: a kawaii mascot popping out of a paint splash | Your art, alive. |

To regenerate the images: `NODE_PATH=$(npm root -g) node lumastoke/branding/src/build.mjs`
