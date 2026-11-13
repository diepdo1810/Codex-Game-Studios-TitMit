# Asset Specs — Entity: Garden Background

> **Source**: `design/assets/entity-inventory.md`, `design/game-brief.md`
> **Art Bible**: `design/art/art-bible.md`
> **Master Reference**: `design/art/references/master-scene-v1.png` (approved visual reference; not a runtime export)
> **Generated**: 2026-11-13
> **Status**: 1 spec approved / 1 static PNG approved by owner / 0 integrated
> **Review mode**: Solo — art-director and technical-artist not consulted; technical constraints not independently validated.

## ASSET-001 — Garden Background

| Field | Value |
|-------|-------|
| Category | Environment |
| Dimensions | 180×320 px logical canvas; one full-scene background layer |
| Format | PNG RGBA lossless, alpha 255 across the full canvas |
| Naming | `env_garden_background_base_scene.png` |
| Polycount | Not applicable — 2D |
| Texture Res | 180×320 logical pixels; project texture/memory ceiling is NOT ASSESSED |
| Anchor | Top-left, scene coordinate (0,0) |
| Layer | Base layer behind clouds and all foreground scene elements |
| Animation | Static; no parallax |

**Visual Description:**

A master-matched blue sky fills the canvas. Keep the HUD safe area x=10–170, y=0–64 completely clear; add only low-contrast garden foliage at the lower side edges, approximately y=188–263. Do not draw clouds or foreground objects into this layer.

**Art Bible Anchors:**
- §1 Visual Identity: preserve the plant as the focal point by keeping the background quiet.
- §2 Mood: peaceful garden, low background contrast.
- §3 Shape Language: simple stepped foliage shapes with few strong edges.
- §4 Color System: use master sky `#68C3DE`, foliage `#417441`/`#76A750`, and palette ramps; legacy core colors remain available for accents.
- §6 Environment: one 180×320 scene, low-detail distant garden, no added props.
- §8 Asset Standards: integer pixel grid, PNG RGBA, one separate asset, no atlas yet.

**Master Reference Alignment:**

The approved source image is 941×1672, not a pixel-perfect 180×320 export. Bounds are measured in scene space using sx=180/941 and sy=320/1672, rounded to integer pixels. Sky fills the background; distant foliage silhouettes occupy the lower sides at approximately y=188–263. Keep x=10–170, y=0–64 empty for HUD readability. Reduce sampled source colors to the controlled master ramps in Art Bible §4 rather than keeping every antialiased transition.

Foreground bounds, anchors, and layer order now follow Art Bible §6 and the inventory. Their values are approximate visual measurements (about ±1–2 logical pixels), not a direct resampling claim.

**Generation Prompt:**

> Create a static opaque background layer for a cozy 16-bit pixel-art mobile game, exact logical canvas 180×320 pixels, portrait 9:16. Use master sky #68C3DE. Keep x=10–170, y=0–64 as uninterrupted sky for the HUD. Add low-contrast garden foliage only along lower left/right edges, approximately y=188–263, using garden shadow #417441 and midtone #76A750. Keep the center quiet for the plant/pot and do not draw clouds or foreground objects. Reduce colors to controlled master palette ramps; crisp integer-grid pixel clusters, stepped silhouettes, flat sky, opaque full canvas, static.
>
> Avoid clouds, tabletop, plant, flower pot, soil, hand, watering can, water stream, splash, extra props, buildings, text, any artwork in the HUD safe area, gradients, anti-aliasing, blur, parallax, high-frequency noise, or colors outside Art Bible §4.

**Status:** Approved — runtime static PNG at `assets/images/pixel-watering/env_garden_background_base_scene.png` (180×320 RGBA, alpha 255, SHA-256 `d6e3a42c14be10ddc9ded41c00a7f16c069d6c427ae6b54e00687f54cd1aa7a2`). Production notes record normalization from the owner-approved RGB source SHA-256 `f192633e313be9aae3a45a8793bb49a9cf34b9dd7457f44b08d853047051af49` with decoded RGB unchanged. Source file is absent from this checkout, so independent comparison cannot be reproduced here. Static Phaser integration and runtime captures are recorded in Story 006 evidence.
