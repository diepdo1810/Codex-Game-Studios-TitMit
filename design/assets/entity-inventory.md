# Visual Entity & Screen Inventory — Pixel Watering Game

> Generated: 2026-11-13
> Sources: `design/game-brief.md`, `design/art/art-bible.md`
> Status: Inventory and master-scene direction approved; all deliverable assets remain Needed.
> Scope: Static master-scene proposal only. No image, sprite, Phaser, gameplay, or UI implementation.

## Entities

| # | Name | Type | Description | Source | Status |
|---|------|------|-------------|--------|--------|
| 1 | Garden background | Environment | Opaque 180×320 base with calm blue sky and restrained, low-contrast distant garden. No extra props. Keep the upper 0–45% open for sky and growth-bar clearance. | Brief; Art Bible §§1, 2, 6, 8 | Needed |
| 2 | Clouds | Environment | Cream clouds with irregular stepped curves; low contrast and placed clear of the plant focal silhouette. | Brief; Art Bible §§3, 4, 6 | Needed |
| 3 | Wooden table | Environment | Warm wood tabletop spans the width, beginning near y=239–240; proposed thickness 24 px (7.5% canvas height). Use a few broad pixel-grain bands. | Brief; Art Bible §§4, 6 | Needed |
| 4 | Flower pot | Prop | Centered, symmetric tapered terracotta pot; proposed bounds x=62–118, y=208–240. Keep rim and front lip readable. | Brief; Art Bible §§3, 4, 6 | Needed |
| 5 | Plant | Environment | Primary focal silhouette centered near x=90; proposed bounds x=66–114, y=144–218. Canopy mainly y=144–208, stem overlaps pot opening. Leaves form distinct organic stepped clusters. | Brief; Art Bible §§1, 3, 6 | Needed |
| 6 | Hand | Character | Simplified hand enters at lower right; proposed bounds x=145–179, y=213–260. Fingers visibly wrap the handle. No face or added character features. | Brief; Art Bible §§3, 6 | Needed |
| 7 | Watering can | Prop | Compact can at the right edge; proposed bounds x=130–179, y=205–252, near the brief's x≈144 anchor. Short diagonal spout aims into pot; nozzle sits above stream origin. | Brief; Art Bible §§3, 6 | Needed |
| 8 | Water stream | VFX | Short diagonal stream from nozzle into pot opening. Keep narrow so it does not cover the plant silhouette; bright pixels contrast locally against foliage and pot. | Brief; Art Bible §§1–3, 6 | Needed |
| 9 | Splash | VFX | Tiny contained droplets/ripple inside the pot opening, readable at native resolution; no screen-filling burst. | Brief; Art Bible §§1–3, 6 | Needed |

### Proposed per-asset layout spec

All bounds and anchors below are **scene-space proposals on the shared 180×320 logical canvas**, not final trimmed PNG canvas sizes. Origin is the scene's top-left; x increases right and y increases down. Alpha means pixels outside the visible shape in the future separated sprite. Exact frame counts and timing remain open because Art Bible §8 does not set them.

| Asset | Proposed visible bounds (x, y, w, h) | Layer | Anchor / placement | Transparency | Animation requirement |
|---|---:|---|---|---|---|
| Garden background | 0, 0, 180, 320 | 1, far back | Top-left (0,0), fills scene | Opaque for master; sky/base layer may be opaque | Static |
| Clouds | 10, 30, 160, 95 (group envelope) | 2 | Group placed at (10,30); individual clouds keep fixed integer positions | RGBA transparent around cloud shapes | Static in master; optional subtle drift is not specified or approved |
| Wooden table | 0, 239, 180, 24 | 3 | Top-left (0,0), placed at scene (0,239); tabletop top edge at y≈239 | RGBA transparent outside table silhouette | Static |
| Plant | 66, 144, 48, 74 | 4 | Bottom-center (24,74), placed at scene (90,218) | RGBA transparent outside leaves/stem | Idle and brief watering response; same canvas and anchor |
| Flower pot | 62, 208, 56, 32 | 5–6 (rear/body, then front lip) | Bottom-center (28,32), placed at scene (90,240) | RGBA transparent outside pot; rear rim/body and front lip may be separate draw pieces | Static in master |
| Water stream | 99, 205, 31, 16 | 7 | Nozzle/top-right origin near local (31,0); ends down-left inside pot opening | RGBA transparent outside water pixels | Absent and pouring states; frame canvas/anchor aligned |
| Splash | 88, 212, 18, 8 | 7 | Center-bottom (9,8), placed near scene (97,220) inside opening | RGBA transparent outside droplets/ripple | Absent and small impact states; frame canvas/anchor aligned |
| Hand | 145, 213, 35, 47 | 8 | Grip point near local (15,14), scene (160,227) | RGBA transparent outside hand | Idle and pouring grip pose; align to can handle |
| Watering can | 130, 205, 50, 47 | 8 | Tilt pivot near local (12,25), scene (142,230) | RGBA transparent outside can | Upright and tilted/pouring states; same canvas and pivot |

The table's proposed 24 px thickness is 7.5% of scene height, within the Art Bible's 5–8% range. Water VFX overlap the pot opening; the hand/can render above them and the nozzle covers the stream origin. Bounds are adjustable together during master-scene review to preserve that overlap and avoid collisions.

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

- Sky and quiet distant garden: y=0–144 (0–45%); preserve about 32–64 px at the top as breathing room for the growth bar.
- Plant canopy centered near x=90, mainly y=144–208. Pot centered near x=90, y=208–240.
- Table begins around y=239–240 and spans x=0–179; proposed thickness 24 px (7.5% of scene height).
- Hand and can enter from the right in x=130–179, y=205–262; keep handle, fingers, spout, and nozzle distinct at native size.
- Stream travels diagonally down-left from nozzle into pot opening; splash remains within the opening.
- These are composition bounds, not final trimmed sprite canvases. Per-asset anchors, trim bounds, and animation canvases belong in later sprite specs.

### Layer order (back to front)

1. Opaque sky and quiet distant garden.
2. Clouds.
3. Table top and visible front edge.
4. Plant canopy, leaves, and stem.
5. Pot rear rim, pot body, and soil.
6. Pot front lip.
7. Water stream and small splash inside the pot.
8. Hand and watering can. Fingers overlap the handle; nozzle overlaps the stream origin slightly.

Plant, pot, and water receive the strongest local contrast. Background, clouds, and table stay simpler. Warm light comes from upper-left; compact pixel shadows fall lower-right. Use only the seven Art Bible colors: `#82C6D3`, `#F4E8C8`, `#315A45`, `#6F9A57`, `#9A6344`, `#C87558`, `#F2C76E`. Keep the palette closed; create value separation through controlled pixel placement.

### Animation scope recorded for later specs

The approved master is static. Future asset specs may define aligned states for:
- Plant: idle and brief gentle watering response.
- Watering can/hand: idle and tilted/pouring pose.
- Stream: absent and pouring frames.
- Splash: absent and small contained impact frames.

Art Bible §8 requires consistent animation canvas and anchor but does not define frame counts, timing, or texture/performance ceilings. These remain unspecified.

### Master-scene generation prompt

> Create one static cozy 16-bit pixel-art garden scene for a mobile portrait game, exact canvas 180×320 pixels, 9:16. A calm blue sky and a few cream stepped clouds sit above a quiet low-contrast garden. Leave the top 10–20% visually open for later growth UI. In the center, show one lively green potted plant on a warm wooden table, with a clear terracotta tapered pot and readable rim. At lower right, a simplified hand holds a compact watering can whose short diagonal spout points toward the pot. Show a narrow bright stream entering the pot and a tiny contained splash. Composition anchors: plant and pot centered around x=90; canopy roughly y=144–208; pot y=208–240; tabletop begins near y=239–240; hand/can occupy the right edge around x=130–179 and y=205–262. Use only this palette: sky `#82C6D3`, cloud/light `#F4E8C8`, deep outline/shadow `#315A45`, foliage `#6F9A57`, wood `#9A6344`, terracotta `#C87558`, warm highlight `#F2C76E`. Warm natural light from upper-left; compact pixel shadows fall lower-right. Crisp integer-grid pixels, stepped organic leaf and cloud silhouettes, broad simple wood-grain bands, strong readability at native size. Keep plant, pot, and water as the focal group; background remains quiet. Static unified preview with opaque full-canvas background.
>
> Avoid extra props, extra pots or plants, text, logos, HUD graphics, borders, gradient lighting, anti-aliasing, blur, glossy 3D rendering, noisy texture, oversized splash, cropped nozzle, hidden pot rim, water covering the plant silhouette, colors outside the seven-color palette, or imitation of any specific film/studio character or composition.

## Review Boundary

This approval records the inventory and static master-scene direction. It does not approve image generation, sprite slicing, asset implementation, or changes to gameplay, Phaser logic, or existing UI. Individual sprite sizes, trimmed bounds, final anchors, file names, and animation frame/timing specs remain to be finalized before sprite production.
