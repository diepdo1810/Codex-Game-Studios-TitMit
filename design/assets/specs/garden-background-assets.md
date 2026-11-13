# Asset Specs — Entity: Garden Background

> **Source**: `design/assets/entity-inventory.md`, `design/game-brief.md`
> **Art Bible**: `design/art/art-bible.md`
> **Master Reference**: `design/art/references/master-scene-v1.png` (approved visual reference; not a runtime export)
> **Generated**: 2026-11-13
> **Status**: 1 asset specced / 1 spec approved / 0 in production / 0 done
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

A calm blue sky fills the canvas, leaving the top 20% visually open and the central area quiet for the plant silhouette. Use simple, low-contrast green garden foliage along the lower side edges, matching the approved master composition; keep the scene center open and do not draw clouds or foreground objects into this layer.

**Art Bible Anchors:**
- §1 Visual Identity: preserve the plant as the focal point by keeping the background quiet.
- §2 Mood: peaceful garden, low background contrast.
- §3 Shape Language: simple stepped foliage shapes with few strong edges.
- §4 Color System: use only approved palette colors — primarily sky `#82C6D3`, foliage `#6F9A57`, deep garden shadow `#315A45`, and sparse warm light `#F2C76E`.
- §6 Environment: one 180×320 scene, low-detail distant garden, no added props.
- §8 Asset Standards: integer pixel grid, PNG RGBA, one separate asset, no atlas yet.

**Master Reference Alignment:**

The approved source image is 941×1672 and is explicitly not a pixel-perfect 180×320 export (`design/art/references/README.md`). Recreate the background on the logical grid; do not directly scale and retain all source-image color transitions. The source contains extra foliage shades beyond the seven-color palette, so reduce them to the approved palette. Recommended background content bounds are the full canvas; keep the top 0–20% clear and limit distant foliage primarily to the lower side edges, approximately y=185–263 on the 320 px logical canvas. These are visual estimates from the approved reference.

The current Art Bible §6 and inventory still describe older foreground proportions than the approved master. This background spec follows the approved image only for sky and distant-garden treatment; it does not resolve or redefine plant, pot, table, or hand/can bounds.

**Generation Prompt:**

> Create a static opaque background layer for a cozy 16-bit pixel-art mobile game, exact logical canvas 180×320 pixels, portrait 9:16. Fill the canvas with calm blue sky and a quiet distant garden. Keep the top 20% open sky for future UI and leave most of the center uncluttered for a large plant silhouette. Add only low-contrast green foliage along the lower left and right edges, roughly y=185–263; keep it softer and less detailed than foreground assets. Use only these Art Bible colors: sky `#82C6D3`, foliage `#6F9A57`, deep garden shadow `#315A45`, with very sparse warm highlight `#F2C76E`. Use crisp integer-grid pixel clusters, stepped natural silhouettes, flat sky, and compact shadow shapes. The full background is opaque and static.
>
> Avoid clouds, tabletop, plant, flower pot, soil, hand, watering can, water stream, splash, extra props, buildings, text, UI, gradients, anti-aliasing, blur, parallax, high-frequency noise, and colors outside the approved seven-color palette.

**Status:** Needed — specification approved; image asset not generated.
