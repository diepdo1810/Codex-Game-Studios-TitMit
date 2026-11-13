# Asset Specs — Garden Master Scene: Plant and Flower Pot

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
- Warm light comes from upper-left; compact shadows fall lower-right. Plant, pot, and water form the strongest local contrast group.
- Animation timing, texture ceiling, and device performance are NOT ASSESSED where the Art Bible does not set them.

## ASSET-004 — Plant

| Field | Value |
|-------|-------|
| Category | Environment |
| Dimensions | Visible bounds x=66, y=144, w=48, h=74 px on the shared scene |
| Format | PNG RGBA lossless; transparent outside leaves and stem |
| Naming | `plant_leafy_green_base_medium.png` |
| Anchor | Bottom-center local (24,74), placed at scene (90,218); align all future states here |
| Layer | 4, canopy/stem behind the pot front lip; stem enters the opening |
| Animation | Idle and brief gentle watering response; frame count/timing NOT ASSESSED |

**Visual Description:**

One lively green plant is centered near x=90. Distinct organic leaf clusters make a compact silhouette above a readable stem that overlaps into the pot opening. Keep the canopy mainly around y=144–208 and avoid fine texture that disappears at native size.

**Art Bible Anchors:**
- §1–2: the plant is the living focal point; watering response stays gentle.
- §3: tall organic silhouette with separated stepped leaf clusters.
- §4: foliage `#6F9A57`, deep shadow `#315A45`, sparse warm highlight `#F2C76E`; closed palette.
- §6 and §8: center on the shared scene; transparent sprite; common canvas/anchor across future frames.

**Generation Prompt:**

> Create a separate transparent plant sprite for a cozy 16-bit pixel-art mobile garden scene. Fit one leafy green plant inside estimated bounds x=66–114, y=144–218 on a 180×320 portrait scene, centered at x=90. Give it a tall organic silhouette with distinct stepped leaf clusters and a readable stem reaching into the flower-pot opening. Use foliage #6F9A57, deep shadow #315A45, and sparse upper-left warm highlight #F2C76E only, within the seven-color palette. Keep crisp integer-grid clusters and compact lower-right shadows. Reserve bottom-center anchor local (24,74) for aligned future idle and watering-response frames.
>
> Avoid extra plants, flowers, fruit, pot, background fill, thin details, gradients, blur, anti-aliasing, text, UI, or colors outside the palette. Do not invent animation timing or frame count.

**Status:** Needed — specification approved; image asset not generated.

## ASSET-005 — Flower Pot

| Field | Value |
|-------|-------|
| Category | Prop |
| Dimensions | Visible bounds x=62, y=208, w=56, h=32 px on the shared scene |
| Format | PNG RGBA lossless; transparent outside pot; rear rim/body and front lip may be separated for overlap |
| Naming | `prop_pot_terracotta_base_medium.png` |
| Anchor | Bottom-center local (28,32), placed at scene (90,240) |
| Layer | 5–6: rear rim/body/soil, then front lip above plant stem and lower water impact |
| Animation | Static in the approved master |

**Visual Description:**

A centered, symmetric tapered terracotta pot with a clearly readable opening, rim, soil, and front lip. Keep the body grounded on the tabletop and visually distinct from the green plant.

**Art Bible Anchors:**
- §1: frame and support the plant focal point.
- §3: compact tapered silhouette, distinct rim, stepped edges.
- §4: terracotta `#C87558`, deep shadow `#315A45`, warm highlight `#F2C76E`.
- §6 and §8: preserve rear/front overlap, transparency, and shared scene grid.

**Generation Prompt:**

> Create a separate transparent flower-pot sprite for a cozy 16-bit pixel-art mobile garden scene. Fit a symmetric tapered pot inside estimated bounds x=62–118, y=208–240 on a 180×320 portrait composition, centered at x=90 and resting on a tabletop near y=239. Make the opening, rear rim, soil, body, and front lip readable at native size; the front lip must be independently drawable over the plant stem. Use terracotta #C87558, deep shadow #315A45, and sparse upper-left warm highlight #F2C76E only. Crisp stepped pixel edges and compact lower-right shadows.
>
> Avoid handles, painted decoration, extra props, background fill, hidden opening, overly thin rim, gradients, blur, anti-aliasing, text, UI, or colors outside the palette.

**Status:** Needed — specification approved; image asset not generated.

## Review Boundary

Bounds follow the approved inventory and are estimates relative to the approved master image. Art Bible §6 and the inventory have older proportions than the selected master; these specs do not silently rewrite either source. No image generation, sprite export, gameplay, Phaser, or UI implementation is included.
