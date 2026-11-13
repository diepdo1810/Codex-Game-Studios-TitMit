# Asset Specs — Garden Master Scene: Hand and Watering Can

> **Source**: `design/assets/entity-inventory.md`, `design/game-brief.md`
> **Art Bible**: `design/art/art-bible.md`
> **Master Reference**: `design/art/references/master-scene-v1.png` (approved visual reference; not a runtime export)
> **Generated**: 2026-11-13
> **Status**: 2 assets specced / 2 specs approved / 0 in production / 0 done
> **Review mode**: Solo — art-director and technical-artist not consulted; technical constraints not independently validated.

## Shared Scene Rules

- Logical scene: 180×320 px, portrait 9:16. Bounds are measured from the approved 941×1672 image with sx=180/941 and sy=320/1672, rounded to pixels (about ±1–2 px); they are not trimmed PNG dimensions.
- Separate runtime layers: lossless PNG RGBA, transparent outside visible pixels, crisp integer pixel grid, no anti-aliasing.
- Use the master-sampled scene ramps in Art Bible §4; the original seven colors remain available for compatibility and accents.
- Warm light comes from upper-left; compact shadows fall lower-right. Hand and can guide attention without obscuring the plant.
- Animation timing, texture ceiling, and device performance are NOT ASSESSED where the Art Bible does not set them.

## ASSET-006 — Hand

| Field | Value |
|-------|-------|
| Category | Character |
| Dimensions | Master-measured bounds x=152, y=154, w=28, h=40 px on the shared scene; clipped at right edge |
| Format | PNG RGBA lossless; transparent outside the hand silhouette |
| Naming | `char_hand_grip_base_small.png` |
| Anchor | Grip point in scene space near (164,178); keep stable across poses |
| Layer | 10, after can; fingers overlap its handle |
| Animation | Idle grip and pouring grip pose; common canvas/anchor; timing NOT ASSESSED |

**Visual Description:**

A simplified hand enters from the right at y≈154 and visibly wraps around the can handle near (164,178). The measured silhouette is partly cropped by the scene edge. Use a compact readable finger shape without a face or added character features.

**Art Bible Anchors:**
- §2: calm, gentle interaction.
- §3: simplified fingers remain recognizable at small size.
- §4: sampled hand tone `#FDCB99` with shared outline `#363728`; retain approved palette limits.
- §6 and §8: position on the right; use transparency and align future poses to one anchor.

**Generation Prompt:**

> Create a separate transparent simplified hand sprite for a cozy 16-bit pixel-art mobile garden scene. Fit master-measured bounds x=152–180, y=154–194 on the 180×320 portrait scene, cropped at the right edge. Wrap fingers around the can handle at grip point (164,178). Use sampled hand tone #FDCB99 and shared outline #363728 from Art Bible §4, with compact crisp pixel clusters. Preserve the same canvas and grip anchor for idle and pouring poses; warm light comes from upper-left.
>
> Avoid realistic skin texture, extra limbs, jewelry, background fill, thin unreadable fingers, gradients, blur, anti-aliasing, text, UI, or colors outside the palette. Do not invent timing.

**Status:** Needed — specification approved; image asset not generated.

## ASSET-007 — Watering Can

| Field | Value |
|-------|-------|
| Category | Prop |
| Dimensions | Master-measured bounds x=113, y=167, w=61, h=51 px, including spout |
| Format | PNG RGBA lossless; transparent outside can silhouette |
| Naming | `prop_watering_can_tilt_base_medium.png` |
| Anchor | Tilt pivot near handle at scene (157,183); nozzle near (113,215) |
| Layer | 9, in front of stream and pot_front; hand renders above handle |
| Animation | Upright/idle and tilted/pouring states on same canvas/pivot; timing NOT ASSESSED |

**Visual Description:**

A copper-toned watering can occupies the right side, with a distinct body, handle and long down-left spout. The nozzle sits near (113,215), above the pot opening and stream. The can overlaps the stream origin; hand fingers render above its handle.

**Art Bible Anchors:**
- §1–2: guide the eye into a gentle watering action.
- §3: compact body and recognizable diagonal spout.
- §4: sampled copper `#B77B2F`, warm wood/can highlight and shared outline `#363728`.
- §6 and §8: right-side placement, transparent sprite, stable pivot across future poses.

**Generation Prompt:**

> Create a separate transparent watering-can sprite for a cozy 16-bit pixel-art mobile garden scene. Fit the master-measured bounds x=113–174, y=167–218 on the 180×320 portrait composition, including the long diagonal spout. Keep the handle visible near the hand grip (164,178), the tilt pivot near (157,183), and the nozzle at (113,215) aimed into the pot. Use sampled copper #B77B2F, wood/can highlight #F59949 and shared outline #363728 from Art Bible §4. Crisp stepped pixels and compact lower-right shadows; preserve the pivot across upright and tilted states.
>
> Avoid decorations, background fill, cropped nozzle, hidden handle, long hose, glossy 3D material, gradients, blur, anti-aliasing, text, UI, or colors outside the palette. Do not invent timing.

**Status:** Needed — specification approved; image asset not generated.

## Review Boundary

Bounds, grip and pivot are rounded visual measurements and should be checked again during sprite extraction. Asset states specify future art deliverables only; no gameplay animation or Phaser logic changes are included. No image generation or sprite export is included.
