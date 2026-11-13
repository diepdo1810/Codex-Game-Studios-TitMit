# Asset Specs — Garden Master Scene: Hand and Watering Can

> **Source**: `design/assets/entity-inventory.md`, `design/game-brief.md`
> **Art Bible**: `design/art/art-bible.md`
> **Master Reference**: `design/art/references/master-scene-v1.png` (approved visual reference; not a runtime export)
> **Generated**: 2026-11-13
> **Status**: 2 assets specced / 2 specs approved / 0 in production / 0 done
> **Review mode**: Solo — art-director and technical-artist not consulted; technical constraints not independently validated.

## Shared Scene Rules

- Logical scene: 180×320 px, portrait 9:16. Bounds below are estimated visible scene-space envelopes, not final trimmed PNG canvas dimensions.
- Separate runtime layers: lossless PNG RGBA, transparent outside visible pixels, crisp integer pixel grid, no anti-aliasing.
- Closed palette: sky `#82C6D3`, cream `#F4E8C8`, deep garden `#315A45`, foliage `#6F9A57`, wood `#9A6344`, terracotta `#C87558`, warm highlight `#F2C76E`.
- Warm light comes from upper-left; compact shadows fall lower-right. Hand and can guide attention without obscuring the plant.
- Animation timing, texture ceiling, and device performance are NOT ASSESSED where the Art Bible does not set them.

## ASSET-006 — Hand

| Field | Value |
|-------|-------|
| Category | Character |
| Dimensions | Visible bounds x=145, y=213, w=35, h=47 px on the shared scene |
| Format | PNG RGBA lossless; transparent outside the hand silhouette |
| Naming | `char_hand_grip_base_small.png` |
| Anchor | Grip point near local (15,14), scene (160,227); keep stable across poses |
| Layer | 8, fingers overlap the watering-can handle |
| Animation | Idle grip and pouring grip pose; common canvas/anchor; timing NOT ASSESSED |

**Visual Description:**

A simplified hand enters from the lower-right and visibly wraps around the watering-can handle. Use a compact, readable finger silhouette without a face or added character features.

**Art Bible Anchors:**
- §2: calm, gentle interaction.
- §3: simplified fingers remain recognizable at small size.
- §4: approved palette only; cream `#F4E8C8` for lit pixels and deep garden `#315A45` for restrained contour/shadow.
- §6 and §8: position on the right; use transparency and align future poses to one anchor.

**Generation Prompt:**

> Create a separate transparent simplified hand sprite for a cozy 16-bit pixel-art mobile garden scene. Enter from the lower-right and fit estimated bounds x=145–180, y=213–260 on a 180×320 portrait scene. Show a gentle grip visibly wrapped around a watering-can handle, with grip point near local (15,14). Use a compact silhouette and a few crisp finger pixel clusters, no face or extra character features. Use only the seven Art Bible colors, with cream #F4E8C8 for lit pixels and deep garden #315A45 for restrained contour/shadow. Preserve an identical canvas and grip anchor for idle and pouring poses; light comes from upper-left.
>
> Avoid realistic skin texture, extra limbs, jewelry, background fill, thin unreadable fingers, gradients, blur, anti-aliasing, text, UI, or colors outside the palette. Do not invent timing.

**Status:** Needed — specification approved; image asset not generated.

## ASSET-007 — Watering Can

| Field | Value |
|-------|-------|
| Category | Prop |
| Dimensions | Visible bounds x=130, y=205, w=50, h=47 px on the shared scene |
| Format | PNG RGBA lossless; transparent outside can silhouette |
| Naming | `prop_watering_can_tilt_base_medium.png` |
| Anchor | Tilt pivot near local (12,25), scene (142,230); preserve across poses |
| Layer | 8, in front of stream; hand fingers render above handle |
| Animation | Upright/idle and tilted/pouring states on same canvas/pivot; timing NOT ASSESSED |

**Visual Description:**

A compact copper-toned watering can at the right edge has a distinct body, handle, and short diagonal spout aimed into the pot opening. Keep the nozzle visible as the stream origin and maintain readability at native size.

**Art Bible Anchors:**
- §1–2: guide the eye into a gentle watering action.
- §3: compact body and recognizable diagonal spout.
- §4: wood `#9A6344`, warm highlight `#F2C76E`, deep shadow `#315A45` from the closed palette.
- §6 and §8: right-side placement, transparent sprite, stable pivot across future poses.

**Generation Prompt:**

> Create a separate transparent compact watering-can sprite for a cozy 16-bit pixel-art mobile garden scene. Fit estimated bounds x=130–180, y=205–252 on a 180×320 portrait composition. Give it a readable copper-toned body, visible handle, and short diagonal spout aimed down-left into the centered pot opening; keep the nozzle visible as the future water-stream origin. Use wood #9A6344, warm highlight #F2C76E, and deep shadow #315A45 only. Crisp integer-grid clusters, stepped edges, compact lower-right shadows. Preserve a common canvas and tilt pivot near local (12,25) for upright and tilted states.
>
> Avoid decorations, background fill, cropped nozzle, hidden handle, long hose, glossy 3D material, gradients, blur, anti-aliasing, text, UI, or colors outside the palette. Do not invent timing.

**Status:** Needed — specification approved; image asset not generated.

## Review Boundary

Bounds, grip and pivot are estimates from the approved inventory and require alignment with the selected master during sprite extraction. Asset states specify future art deliverables only; no gameplay animation or Phaser logic changes are included. No image generation or sprite export is included.
