# Visual Entity & Screen Inventory — Pixel Watering Game

> Generated: 2026-11-13
> Sources: `design/game-brief.md`, `design/art/art-bible.md`
> Status: Inventory and master-scene direction approved; all deliverable assets remain Needed.
> Scope: Static master-scene proposal only. No image, sprite, Phaser, gameplay, or UI implementation.

## Entities

| # | Name | Type | Description | Source | Status |
|---|------|------|-------------|--------|--------|
| 1 | Garden background | Environment | Opaque 180×320 base; master-sampled blue sky and low-contrast side foliage y≈188–263. Keep HUD safe area y=0–64 clear. | Brief; Art Bible §§1, 2, 4, 6, 8 | Needed |
| 2 | Clouds | Environment | Sparse stepped cream clouds, measured group envelope x=2–176, y=67–96; HUD safe area remains clear. | Brief; Art Bible §§3, 4, 6 | Needed |
| 3 | Wooden table | Environment | Full-width warm table begins near y=263 and fills to the bottom edge, with broad grain and visible front fascia. | Brief; Art Bible §§4, 6 | Needed |
| 4 | Flower pot | Prop | Centered tapered terracotta pot, bounds x=51–128, y=218–289; split into aligned pot_back and pot_front draw layers. | Brief; Art Bible §§3, 4, 6, 8 | Needed |
| 5 | Plant | Environment | Central plant bounds x=34–144, y=105–228; canopy ends above pot mouth and stem enters the opening. | Brief; Art Bible §§1, 3, 6 | Needed |
| 6 | Hand | Character | Enters from right, bounds x=152–180, y=154–194; grip near (164,178), fingers wrap the can handle. | Brief; Art Bible §§3, 6 | Needed |
| 7 | Watering can | Prop | Copper can and diagonal spout, bounds x=113–174, y=167–218; pivot near handle (157,183), nozzle near (113,215). | Brief; Art Bible §§3, 6 | Needed |
| 8 | Water stream | VFX | Short down-left stream from nozzle (113,215) into pot opening; bounds x=96–116, y=207–234. | Brief; Art Bible §§1–3, 6 | Needed |
| 9 | Splash | VFX | Tiny droplets/ripple in pot opening; bounds x=90–101, y=222–234, behind pot_front. | Brief; Art Bible §§1–3, 6 | Needed |

### Proposed per-asset layout spec

All bounds and anchors below are **master-measured scene-space estimates on the shared 180×320 canvas**, not final trimmed PNG sizes. They were read from the approved 941×1672 reference using sx=180/941 and sy=320/1672, then rounded to integer pixels (approximately ±1–2 px). Origin is top-left; x increases right and y increases down. Alpha means transparent pixels outside the visible sprite. Exact animation timing remains open because Art Bible §8 does not set it.

| Asset | Proposed visible bounds (x, y, w, h) | Layer | Anchor / placement | Transparency | Animation requirement |
|---|---:|---|---|---|---|
| Garden background | 0, 0, 180, 320 | 1 | Top-left (0,0), fills scene | Opaque | Static |
| Clouds | 2, 67, 174, 29 (group envelope) | 2 | Group top-left (2,67) | RGBA transparent around cloud shapes | Static in master |
| Wooden table | 0, 263, 180, 57 | 3 | Top-left (0,263) | RGBA transparent outside table silhouette | Static |
| Plant | 34, 105, 110, 123 | 5 | Bottom-center anchor (89,228) | RGBA transparent outside leaves/stem | Idle and gentle watering response; aligned canvas/anchor |
| Flower pot | 51, 218, 77, 71 (shared envelope) | 4 pot_back; 8 pot_front | Both parts share bottom-center anchor (89,289) | RGBA transparent; aperture stays open; rear/front pixels separated | Static in master |
| Water stream | 96, 207, 20, 27 | 6 | Nozzle origin (113,215); falls down-left | RGBA transparent outside water pixels | Absent and pouring; aligned canvas/anchor |
| Splash | 90, 222, 11, 12 | 7 | Center-bottom anchor (95,233) inside opening | RGBA transparent outside droplets/ripple | Absent and small impact; aligned canvas/anchor |
| Hand | 152, 154, 28, 40 | 10 | Grip anchor near (164,178) | RGBA transparent outside hand | Idle and pouring grip; aligned to can |
| Watering can | 113, 167, 61, 51 | 9 | Tilt pivot near handle (157,183) | RGBA transparent outside can | Upright and tilted; same canvas and pivot |

These master-derived bounds replace the earlier estimates: table begins near y=263, plant/pot are larger, and hand/can sit higher. Layer order is background → clouds → table → pot_back → plant → stream → splash → pot_front → can → hand. The front lip masks the lower stem and VFX edge while leaving the center aperture visible.

## UI Screens

| # | Screen Name | Description | Source | Status |
|---|-------------|-------------|--------|--------|
| 1 | Garden gameplay scene | Single portrait garden composition. Growth-bar clearance is reserved above the plant; UI appearance/layout remains outside this art approval and Art Bible §7 is unfinished. | Brief; Art Bible §6 | Needed |

## HUD Elements

| # | Element | Description | Source | Status |
|---|---------|-------------|--------|--------|
| 1 | Growth-bar clearance | Keep roughly 10–20% of the upper canvas visually open. Placement constraint only; does not spec or change existing UI. | Brief; Art Bible §6 | Needed |

## Audio

No audio assets included in this visual inventory.

## Master Scene Proposal

### Canvas and deliverable

- Logical canvas: **180×320 px**, portrait 9:16.
- First approval artifact: **one static, opaque scene preview** on the full canvas; no separated sprite exports or animation sheets.
- Crisp integer-grid pixels; no anti-aliasing, soft gradients, or fractional pixel placement.
- Later runtime layers use PNG RGBA transparency as Art Bible §8 specifies. The static scene preview itself is opaque.

### Composition and anchors

- HUD safe area: x=10–170, y=0–64; preserve uninterrupted sky without cloud or foreground silhouettes.
- Clouds: x=2–176, y=67–96. Plant: x=34–144, y=105–228. Pot: x=51–128, y=218–289.
- Table begins near y=263 and fills the lower edge. Hand/can occupy the right around x=113–180, y=154–218.
- Stream descends down-left from nozzle (113,215); splash stays around x=90–101, y=222–234 inside the opening.
- These are composition bounds, not final trimmed sprite canvases. Per-asset anchors, trim bounds, and animation canvases belong in later sprite specs.

### Layer order (back to front)

1. Opaque sky and quiet distant garden.
2. Clouds.
3. Table top and visible front edge.
4. Pot_back: rear rim, back body, and rear soil plane.
5. Plant canopy, leaves, and stem.
6. Water stream, beginning beneath the nozzle.
7. Splash inside the opening.
8. Pot_front: front rim/lip and front body, with a transparent opening; mask lower stem and VFX edge.
9. Watering can.
10. Hand; fingers overlap the handle.

Plant, pot, and water receive the strongest local contrast. Background, clouds, and table stay simpler. Warm light comes from upper-left; compact pixel shadows fall lower-right. Use the seven base Art Bible colors plus the master-derived ramps in §4, with palette membership kept controlled.

### Animation scope recorded for later specs

The approved master is static. Future asset specs may define aligned states for:
- Plant: idle and brief gentle watering response.
- Watering can/hand: idle and tilted/pouring pose.
- Stream: absent and pouring frames.
- Splash: absent and small contained impact frames.

Art Bible §8 requires consistent animation canvas and anchor but does not define frame counts, timing, or texture/performance ceilings. These remain unspecified.

### Master-scene generation prompt

> Create one static cozy 16-bit pixel-art garden scene for a mobile portrait game, exact canvas 180×320 pixels, 9:16. Preserve a clear sky HUD safe area x=10–170, y=0–64; clouds begin below it. Center the large leafy plant and terracotta pot on a wooden table that begins near y=263. Plant bounds are x=34–144, y=105–228; pot bounds x=51–128, y=218–289; hand/can sit at the right around x=113–180, y=154–218. A narrow stream runs from nozzle (113,215) into the opening and a tiny splash stays behind the front rim. Use the master-sampled palette additions in Art Bible §4, including sky #68C3DE, foliage #76A750/#7EAB3E, terracotta #E96D37, wood #CF7341, and water #FFF8E9. Warm light comes from upper-left, shadows fall lower-right; crisp controlled pixel clusters. Static unified preview with opaque full-canvas background.
>
> Avoid extra props, extra pots or plants, text, logos, artwork inside the HUD safe area, borders, gradients, anti-aliasing, blur, glossy 3D rendering, noisy texture, oversized splash, cropped nozzle, hidden pot opening, water covering the plant silhouette, colors outside the Art Bible palette, or imitation of any specific film/studio character or composition.

## Review Boundary

This approval records the inventory and static master-scene direction. It does not approve image generation, sprite slicing, asset implementation, or changes to gameplay, Phaser logic, or existing UI. Individual sprite sizes, trimmed bounds, final anchors, file names, and animation frame/timing specs remain to be finalized before sprite production.
