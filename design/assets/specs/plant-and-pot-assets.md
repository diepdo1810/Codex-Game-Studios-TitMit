# Asset Specs — Garden Master Scene: Plant and Flower Pot

> **Source**: `design/assets/entity-inventory.md`, `design/game-brief.md`
> **Art Bible**: `design/art/art-bible.md`
> **Master Reference**: `design/art/references/master-scene-v1.png` (approved visual reference; not a runtime export)
> **Generated**: 2026-11-13
> **Status**: 2 specs approved / 2 static sprite concepts generated / animation & Phaser integration pending
> **Review mode**: Solo — art-director and technical-artist not consulted; technical constraints not independently validated.

## Shared Scene Rules

- Logical scene: 180×320 px, portrait 9:16. Bounds are measured from the approved 941×1672 image with sx=180/941 and sy=320/1672, rounded to pixels (about ±1–2 px); they are not trimmed PNG dimensions.
- Separate runtime layers: lossless PNG RGBA, transparent outside visible pixels, crisp integer pixel grid, no anti-aliasing.
- Use the master-sampled scene ramps in Art Bible §4; the original seven colors remain available for compatibility and accents.
- Warm light comes from upper-left; compact shadows fall lower-right. Plant, pot, and water form the strongest local contrast group.
- Animation timing, texture ceiling, and device performance are NOT ASSESSED where the Art Bible does not set them.

## ASSET-004 — Plant

| Field | Value |
|-------|-------|
| Category | Environment |
| Dimensions | Master-measured visible bounds x=34, y=105, w=110, h=123 px, including stem to pot mouth |
| Format | PNG RGBA lossless; transparent outside leaves and stem |
| Naming | `plant_leafy_green_base_medium.png` |
| Anchor | Bottom-center at scene (89,228); align all future states here |
| Layer | 5, after pot_back and before water VFX/pot_front |
| Animation | Idle and brief gentle watering response; frame count/timing NOT ASSESSED |

**Visual Description:**

One large lively plant is centered near x=89. The canopy occupies approximately y=105–205; the stem continues to y≈228 into the pot opening. Distinct stepped leaf clusters retain a readable silhouette at native size.

**Art Bible Anchors:**
- §1–2: the plant is the living focal point; watering response stays gentle.
- §3: tall organic silhouette with separated stepped leaf clusters.
- §4: sampled leaf shadow/base/highlight `#475028`, `#7EAB3E`, `#D9D86C`; garden midtone `#76A750`.
- §6 and §8: bounds and anchor match the master scene; transparent sprite; common canvas/anchor across future frames.

**Generation Prompt:**

> Create a separate transparent plant sprite for a cozy 16-bit pixel-art mobile garden scene. Fit the master-measured bounds x=34–144, y=105–228 on a 180×320 portrait scene, centered near x=89. Use a large upright organic silhouette with distinct stepped leaf clusters and a readable stem extending to the pot mouth. Use sampled leaf shadow #475028, base #7EAB3E, highlight #D9D86C, and garden midtone #76A750 as appropriate, from Art Bible §4. Crisp integer-grid clusters and compact lower-right shadows. Reserve bottom-center anchor (89,228) for aligned future idle and watering-response frames.
>
> Avoid extra plants, flowers, fruit, pot, background fill, thin details, gradients, blur, anti-aliasing, text, UI, or colors outside the palette. Do not invent animation timing or frame count.

**Status:** In Progress — static sprite generated in `assets/images/pixel-watering/`; automated PNG/palette/composite QA PASS; owner visual sign-off and animation/Phaser integration PENDING.

## ASSET-005 — Flower Pot

| Field | Value |
|-------|-------|
| Category | Prop |
| Dimensions | Shared pot envelope x=51, y=218, w=77, h=71 px; two aligned transparent layer files |
| Format | Two PNG RGBA lossless layers: pot_back and pot_front |
| Naming | `prop_pot_terracotta_back_base_medium.png` / `prop_pot_terracotta_front_base_medium.png` |
| Anchor | Shared bottom-center pivot at scene (89,289) |
| Layer | pot_back at 4; pot_front at 8, after stream/splash and before can/hand |
| Animation | Static in the approved master |

**Visual Description:**

A centered, symmetric tapered terracotta pot. pot_back contains the rear rim, back body, and rear soil plane. pot_front contains the front rim/lip and front-facing body pixels; leave the opening aperture transparent so the stream/splash remain visible, while the lip masks the lower stem and lower VFX edge.

**Art Bible Anchors:**
- §1: frame and support the plant focal point.
- §3: compact tapered silhouette, distinct rim, stepped edges.
- §4: sampled pot shadow/shade/base/highlight `#4C3F2B`, `#C4592E`, `#E96D37`, `#FFE493`.
- §6 and §8: preserve rear/front overlap, transparent aperture, common anchor, and shared scene grid.

**Generation Prompt:**

> Create two separate transparent aligned pot layers for a cozy 16-bit pixel-art mobile garden scene, shared envelope x=51–128, y=218–289 on the 180×320 portrait canvas and common bottom-center anchor (89,289). pot_back holds rear rim, back body, and rear soil plane behind the plant. pot_front holds the front lip and front-facing body; keep the center aperture transparent so water remains visible, and let the lip cover the lower stem/splash edge. Use sampled pot shadow #4C3F2B, shade #C4592E, base #E96D37, and highlight #FFE493 from Art Bible §4. Crisp stepped pixels and compact lower-right shadows.
>
> Avoid handles, painted decoration, extra props, background fill, hidden opening, overly thin rim, gradients, blur, anti-aliasing, text, UI, or colors outside the palette.

**Status:** In Progress — static sprite generated in `assets/images/pixel-watering/`; automated PNG/palette/composite QA PASS; owner visual sign-off and animation/Phaser integration PENDING.

## Review Boundary

The measured bounds now match Art Bible §6 and the synchronized inventory. Recheck pixel silhouettes during sprite extraction. No image generation, sprite export, gameplay, Phaser, or UI implementation is included.
