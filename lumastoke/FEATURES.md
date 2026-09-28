# Lumastoke — Feature Specification (v0.1)

> **Lumastoke** — *Your art, alive.*
> A beautifully designed 2D painting, comic and animation studio for young artists who love anime-style art.

This spec combines the feature sets of four programs into one app:

| Tag | Program | Why it's in the mix |
|-----|---------|---------------------|
| **R** | Rebelle 8 (Escape Motions) | Realistic wet/dry paint physics, pigment mixing, paper, tilt, blow and drying |
| **S** | PaintTool SAI Ver.2 (SYSTEMAX) | Lightweight, precise brush engine; stabilizer; Blending/Dilution/Persistence; linework (vector) layers; perspective rulers |
| **C** | Clip Studio Paint EX 5 (Celsys) | Comics and manga (pages, panels, balloons, tones), 3D poses, vector lines, frame animation with timeline, exposure sheet and camera |
| **M** | Moho Pro 14 (Lost Marble) | Rigged 2D animation: bones, Smart Bones, Vitruvian Bones, switch layers, lip-sync, physics, meshes, curvers and liquid shapes |
| **★** | Lumastoke original | Features that connect the pieces |

Each feature below lists **where it lives** in Lumastoke and whether it shows up in **Normal** mode (●), in simplified form (◐), or only in **Advanced** mode (○).

> **Note on originality.** Lumastoke implements these *capabilities* with its own engine, code, UI and assets. We don't copy anyone's code, brush files, artwork, names or trademarks. Importing proprietary formats (.sai, .clip, .moho, .rebelle) is listed as a *goal*. Each one needs its own legal and technical check before we commit to it. Open formats (PSD, ORA, SVG, PNG, etc.) are safe to support.

---

## 1. How the app is organized

### 1.1 Two modes, one document
- **Normal mode:** a Procreate-style studio. The canvas fills the screen, with five tools on the right, Size/Opacity sliders on the left, and a Quick Dock at the bottom. You can learn every control in one sitting.
- **Advanced mode:** a SAI/CSP-style docked workspace, with every panel, menu and option.
- The toggle sits **in the top center on every screen**. Switching modes never changes the document. It only changes how much of the UI you see.
- Anything you set in Advanced mode (brush tweaks, paper, rig) keeps working in Normal mode.

### 1.2 Workspaces (Advanced mode tab strip)
Workspaces are saved panel layouts, each built for one job. They all share the same file.

| Workspace | Built for | Main panels |
|-----------|-----------|-------------|
| **Paint** | Illustration and realistic media | Brush, Color + Mixer, Layers, Paint Physics, Navigator |
| **Ink & Comic** | Line art, manga, webtoon | Pages, Panels & Balloons, Tones, Vector, 3D Pose, Rulers |
| **Animate** | Frame-by-frame animation | Timeline / X-Sheet, Onion Skin, Light Table, Camera, Audio |
| **Rig & Motion** | Bone-rigged (cut-out) animation | Bones, Smart Bones, Switch, Graph Editor, Physics, Actions |
| **Capture** | Reference and recording | Camera, Voice, Screen, Scan, Face tracking |
| **Share** | Export and print | Formats, Print prep, Time-lapse, Render queue |

Every workspace can be edited, and users can create their own and trade them.

### 1.3 Menus (Advanced mode)
`File · Edit · Canvas · Layer · Select · Paint · Filter · Comic · Animate · Rig · Capture · View · Window · Help`

---

## 2. Brushes and the brush engine

| Feature | From | Where | Mode |
|---|---|---|---|
| **Brush families:** Pen, Pencil, Marker, Airbrush, Brush, Watercolor, Oil, Acrylic, Gouache, Ink, Pastel, Charcoal, Crayon, Blur, Smudge, Blend, Eraser | S R C | Tool grid / Brush Library | ● |
| **Blending / Dilution / Persistence** color-pickup model | S | Brush panel → Mixing | ◐ ("Blend" slider) |
| **Stabilizer** S-1…S-15 plus *Speed-based* stabilization and post-correction | S C | Options bar | ◐ ("Smooth" slider) |
| Brush size presets as a **dot grid** | S | Brush panel | ○ |
| Min size, Density, Hardness, Spacing, Scatter, Jitter | S C | Brush → Shape | ○ |
| **Pressure / tilt / rotation / velocity** curves for any parameter | S C R | Brush → Dynamics (curve editor) | ○ |
| **Tilt-sensitive** width and angle | R C | Dynamics | ● (automatic) |
| Brush tip shapes: round, flat, filbert, fan, rigger, custom image tip | R C | Brush → Tip | ○ |
| **Bristle brushes** that simulate each hair (particle brush) | R | Oil/Acrylic brushes | ● |
| **Texture** (paper grain) per brush, with strength and scale | S R C | Brush → Texture | ○ |
| **Dual brush** and stamp brushes (sprays, foliage, sparkles, hair, lace) | C | Brush Library → Texture & FX | ● |
| **Anti-aliasing** levels, "Keep opacity" | S | Brush → Quality | ○ |
| **Large brushes** (up to 3,000 px) with a fast/rough preview mode | R C | Preferences → Performance | ○ |
| **Smart Shape:** hold at the end of a stroke to snap it to a clean line, curve or ellipse | C | Everywhere | ● |
| Recent brushes and favorites | R | Quick Dock | ● |
| Brush import: .abr, .brushset, .sut, .kpp *(each format needs a check first)* | ★ | Brush Library → Import | ● |
| **Brush Studio:** build brushes live on a test pad with side-by-side A/B comparison | ★ | Double-tap a brush | ◐ |

## 3. Realistic paint and physics (the Rebelle layer)

| Feature | From | Where | Mode |
|---|---|---|---|
| **Wet paint simulation:** watercolor diffusion, bleeding, backruns, blooms, granulation, edge darkening | R | Watercolor brushes | ● |
| **Wet-on-wet / wet-on-dry** | R | Automatic | ● |
| **Dry All / Wet All / Dry layer / Fast-dry** | R | Physics panel · Quick Dock "Dry" | ● |
| **Drying speed** and "paint stays wet" timer | R | Physics panel | ◐ |
| **Canvas tilt** (drips and runs follow gravity), with a dial and a device-tilt option | R | Physics panel | ◐ |
| **Blow tool** (push wet paint around) | R | Tool grid | ● |
| **Pigment color mixing** (real subtractive mixing: blue + yellow makes green) | R | Mixing palette · brushes | ● |
| **Impasto / paint thickness** with lighting (*RealShader*), soft shadows and custom light direction | R | Physics → Relief & Light | ◐ |
| **Paper / canvas** library: cold press, hot press, rough, canvas, kraft, toned; custom paper import; reflectivity textures | R | Canvas → Paper | ● (paper picker) |
| **Masking fluid** layer (resists paint, peel off later) | R | Layer type | ◐ |
| **Stencils and tape** (hold-down masks you can move) | R | Paint → Stencils | ○ |
| **Show wet areas** overlay | R | Physics panel | ○ |
| **Physics per layer** (each layer is wet or dry) | R | Layer badge "WET" | ● |
| **Watercolor-edge** brushes for fast flat painting (anime backgrounds) | C | Brush library | ● |
| **Paint on animation frames** (wet paint works on every frame, and onion skins show dry) | ★ | Animate workspace | ● |

## 4. Layers

| Feature | From | Where | Mode |
|---|---|---|---|
| Raster, **Vector / Linework**, Paper, Masking-fluid, Tone, Gradient, Fill, Text, Balloon, Frame (panel), 3D, Audio, Video, Camera, Reference layers | S C R M | Layers panel "+" menu | ◐ |
| Folders, **Clipping**, lock alpha (Protect α), lock, reference layer, draft layer | S C | Layers panel | ● |
| Layer **masks** and vector masks | C | Layers panel | ◐ |
| 28 blend modes plus *Add (Glow)*, *Luminosity*, *Binary* | S C | Layers panel | ◐ |
| **Correction / filter layers** (Levels, Curves, HSL, Gradient Map, Color Balance, Posterize, etc.), non-destructive | C R | Layers → New correction | ○ |
| **Layer colors** and property effects: border (outline), watercolor edge, tone | C | Layer properties | ○ |
| **Color-code line art** (layer color) for animation clean-up | C | Layer properties | ○ |
| Layer search, filter by type, auto-naming | C ★ | Layers panel | ○ |

## 5. Line art, vector and inking

| Feature | From | Where | Mode |
|---|---|---|---|
| **Linework layer:** strokes stay editable as paths (move control points, change pressure after drawing) | S | Linework layer | ◐ |
| **Vector layer:** vector eraser that erases to intersections, **width correction**, **line smoothing**, **pinch ends** | C | Vector layer | ○ |
| **Curve / polyline / shape** tools, stroke with the current brush | S C | Figure tools | ● (Smart Shape) |
| **Line art extraction** from photos and sketches | C | Filter → Extract line art | ◐ |
| **Fill:** Refer-other-layers, close-gap, fill with lasso, **lasso fill**, color margin | S C | Fill tool | ● |
| **Colorize** guide colors (flat colors filled automatically from hint strokes) | C | Paint → Colorize | ◐ |
| **Sketch clean-up:** thicken or thin lines, auto-close gaps | C ★ | Filter → Line | ○ |

## 6. Color

| Feature | From | Where | Mode |
|---|---|---|---|
| Color **disc**, HSV wheel with square or triangle, RGB/HSL/CMYK sliders, hex | S C | Color panel | ● (disc) |
| **Mixing palette** with real pigment (pick up mixed color) | R | Color → Mixer | ● |
| **Scratch pad** | S | Color → Scratch pad | ○ |
| Swatches, palettes, **import from image**, .ase/.aco/.swatches | C ★ | Color → Palettes | ● |
| Color **harmony** (complementary, triad, etc.) | C | Color → Harmony | ◐ |
| **Approximate-color** and intermediate-color picker | C | Color panel | ○ |
| Color history | S C | Color panel · Quick Dock | ● |
| **Color management** (sRGB / Display P3 / CMYK preview, soft-proof) | S C | View → Color proof | ○ |
| **Greyscale / values check** toggle | S | View | ● |
| **Gradient maps**, gradient tool with editable sets | R C | Filter · Gradient tool | ◐ |

## 7. Selection, transform and deform

| Feature | From | Where | Mode |
|---|---|---|---|
| Lasso, rectangle, ellipse, polyline, magic wand (refer to layers), **selection pen and eraser**, quick mask | S C | Select tools | ● |
| **Selection launcher bar** (floating actions under the selection) | C | Canvas | ● |
| Free transform, scale, rotate, flip, distort, perspective, mesh transform | S C | Transform | ● |
| **Puppet warp** (pin points and bend) | C | Transform → Puppet | ◐ |
| **Liquify** | C | Tool grid | ◐ |
| **Smooth scaling** (high-quality resampling) | R | Transform options | ○ |

## 8. Drawing assists

| Feature | From | Where | Mode |
|---|---|---|---|
| **Perspective rulers** with 1-, 2- and 3-point vanishing points (as layer objects) | S C | Rulers | ◐ |
| **Symmetry** (line, radial, kaleidoscope) | R C | Rulers · Quick toggle | ● |
| Concentric / parallel / curve rulers, **speed lines** and **focus lines** | C | Rulers · Comic | ◐ |
| Grid, guides, snapping | C | View | ◐ |
| **3D posable models** (figure, hand, head with body-shape sliders); pose from photo; 3D objects and backgrounds; camera | C | 3D panel | ◐ |
| **3D → line art** conversion (LT conversion) | C | 3D → Convert | ○ |
| **Reference window** (image, video, 3D) pinned to the canvas | ★ | Capture | ● |

## 9. Comics, manga and webtoon (Ink & Comic workspace)

| Feature | From | Where | Mode |
|---|---|---|---|
| **Multi-page documents** with a page manager, spreads, and page reordering | C | Pages panel | ◐ |
| **Story editor** (script text flows into balloons) | C | Comic → Story | ○ |
| **Frame border / panel tools:** cut panels, divide by gutter, panel templates | C | Comic → Panels | ◐ |
| **Balloons and tails**, flash balloons, text on paths, **sound-effect lettering** | C | Comic → Balloons | ● |
| **Screen tones** (halftone dots, lines, noise), tone layer, gradient tones | C | Tones | ◐ |
| Bleed, trim and safe area; print presets (B4 manga, US comic, A4) | C | Canvas → Print | ○ |
| **Webtoon** vertical canvas, split export | C | New canvas → Webtoon | ● |
| **Team/Collab:** assign pages, review comments | C ★ | Share → Collaborate | ○ |
| Export: PDF, EPUB, print-ready CMYK TIFF | C | Share | ◐ |

## 10. Frame-by-frame animation (Animate workspace)

| Feature | From | Where | Mode |
|---|---|---|---|
| **Timeline** with animation folders (cels), unlimited frames | C | Timeline | ● |
| **Exposure sheet (X-sheet)**, including pro-studio layouts | C | Timeline → X-Sheet view | ○ |
| **Onion skin**: before/after counts, colors, opacity | C M | Timeline bar | ● |
| **Light table** (any frame as a tracing reference) | C | Light Table panel | ◐ |
| **In-betweening helpers:** auto-inbetween for vector lines, timing charts | ★ | Timeline | ○ |
| **Smart line boil** (a hand-drawn wobble effect) | M | Layer effect | ◐ |
| Holds, loops, ping-pong, frame rate (12/24/30/60), timing tweaks (push frames) | C M | Timeline | ● |
| **Camera:** 2D camera moves, zoom, pan, rotate, camera shake, **multiplane depth** | C M | Camera layer | ◐ |
| **Rotoscoping** from imported video | C | Timeline → Video layer | ◐ |
| **Audio layers:** import, record, scrub | C M | Timeline | ● |
| **Lip-sync from voice**: phoneme detection drives mouth drawings | M ★ | Timeline → Voice | ● |
| Transform keyframes on layers (position, scale, rotation, opacity) | C | Timeline | ◐ |
| Subtitles and captions | C | Timeline | ◐ |

## 11. Rigged animation (Rig & Motion workspace)

| Feature | From | Where | Mode |
|---|---|---|---|
| **Bones:** FK and IK, bone strength and regions, **bone constraints**, **delayed constraints** | M | Bones panel | ○ |
| **Smart Bones** (a dial bone drives corrective poses, e.g. head turns and hand shapes) | M | Smart Bones panel | ○ |
| **Vitruvian Bones** (swap entire body setups on the fly) | M | Bones panel | ○ |
| **Switch layers** (swap drawings: mouths, hands, eyes) | M | Layer type | ◐ |
| **Actions library** (reusable walk, blink and talk cycles) | M | Actions panel | ◐ |
| **Meshes and image warping**, **Curvers** (bend tails, hair and snakes) | M | Deform | ○ |
| **Liquid shapes** (fire, smoke, water) | M | Effects | ○ |
| **Dynamics:** follow-through and overlapping action, wiggle, physics (gravity, wind, collisions), **particles** | M | Physics panel | ◐ |
| **Graph editor** with bezier, ease and elastic interpolation | M | Graph panel | ○ |
| **Freeze keys, reset pose, consolidate channels, push frames** | M | Timeline actions | ○ |
| **3D camera / depth**, layer z-depth, orbit | M | Camera | ○ |
| **Vector drawing with freehand styles** and brushes on vectors | M | Draw tools | ◐ |
| Rig templates for anime chibi, full body and bust | ★ | New → From rig template | ● |
| **Face tracking puppet:** drive a rigged face from your webcam | ★ | Capture → Face tracking | ● |
| Scripting (Lua-style API) and plug-ins | M | Window → Scripts | ○ |
| Game export (FBX / glTF) for rigged characters | M | Share → Game engine | ○ |

## 12. Capture devices

| Feature | Where | Mode |
|---|---|---|
| **Pen tablets and pen displays** (Wacom, XP-Pen, Huion, Apple Pencil via Sidecar, Surface Pen), with pressure, tilt, rotation, barrel buttons and per-device curves | Devices panel · status bar | ● |
| **Touch gestures** (two-finger undo, three-finger redo, pinch zoom/rotate, eyedropper hold) | Preferences → Gestures | ● |
| **Microphone:** voice notes, voice takes for lip-sync, sound effects | Capture · Quick Dock | ● |
| **Camera:** reference clips, pose reference, **scan a paper sketch** (auto-cleanup to line art) | Capture | ● |
| **Face and body tracking** (for rigs and pose reference) | Capture | ◐ |
| MIDI and dial controllers (TourBox and others), and **WebSocket control input** for live performance | R ★ | Devices | ○ |

## 13. Files: import and export

| Direction | Formats |
|---|---|
| **Open / Import** | .LUMA (native), PSD/PSB, ORA, TIFF, PNG, JPEG, WebP, HEIC, BMP, GIF, SVG, PDF, KRA, MP4/MOV/WebM, WAV/MP3/AAC, brushes (.abr, .sut, .brushset). *Needs a check first:* .procreate, .sai/.sai2, .clip, .moho, .rebelle |
| **Export image** | PNG, JPEG, WebP, TIFF (16-bit, CMYK), PSD (layered), PDF, SVG (vector layers) |
| **Export animation** | MP4 (H.264/H.265), MOV (ProRes 4444 with alpha), WebM, GIF, APNG, PNG/TGA sequence, sprite sheet |
| **Export comic** | Multi-page PDF, EPUB, CBZ, webtoon strips |
| **Export rig** | FBX / glTF for game engines, Lottie (web) |
| **Time-lapse** | Recording of the whole process, exported as MP4 |

## 14. Everything else

- **Undo history panel** with snapshots; **auto-save** and version history.
- **Customization:** keyboard shortcuts, **command bar**, custom workspaces, UI scale, left-hand mode, dark / light (Paper) themes.
- **Performance:** GPU brush engine, 100,000 px canvases (S), fast preview mode for big brushes (C).
- **Learning:** *Mochi* guide tips (Normal mode), interactive lessons, "What's this?" hover cards in Advanced mode.
- **Accessibility:** screen reader labels, high-contrast theme, adjustable cursor, color-blind-safe UI.

---

## 15. How features are split between the modes

- **Normal mode shows:** paint, erase, smudge, the realistic brush library, the color disc and mixer, basic layers, paper, Wet/Dry, symmetry, Smart Shape, simple frame animation with voice lip-sync, capture, and one-tap export.
- **Advanced mode adds:** every brush parameter, vector editing, rulers and 3D, the comics toolset, the X-sheet, rigging and physics, the graph editor, color management and scripting.
- **Rule:** if a beginner has to *understand* a feature before using it, it belongs in Advanced mode, and Normal mode gets a one-tap preset version of it.
