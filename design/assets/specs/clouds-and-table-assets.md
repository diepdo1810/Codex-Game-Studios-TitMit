# Asset Specs — Garden Master Scene: Clouds and Wooden Table

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
- Warm light comes from upper-left; compact pixel shadows fall lower-right. These details stay lower contrast than plant, pot, and water.
- Texture/memory ceilings, frame budget, and device performance are NOT ASSESSED where the Art Bible does not set them.

## ASSET-002 — Clouds

| Field | Value |
|-------|-------|
| Category | Environment |
| Dimensions | Master-measured group envelope x=2, y=67, w=174, h=29 px on the shared scene |
| Format | PNG RGBA lossless; transparent outside cloud silhouettes |
| Naming | `env_clouds_cream_base_wide.png` |
| Anchor | Group top-left at scene (2,67); individual cloud bounds remain inside the envelope |
| Layer | 2, over sky/distant garden and behind foreground objects |
| Animation | Static in the approved master; drift is not specified or approved |

**Visual Description:**

Sparse cream clouds with irregular stepped curves sit below the clear HUD band. The full group spans approximately x=2–176, y=67–96. Keep contrast gentle and stay clear of the plant silhouette.

**Art Bible Anchors:**
- §1–2: preserve a calm open sky and keep the plant focal.
- §3: clouds use irregular stepped curves, not smooth vector edges.
- §4: sampled cloud `#F9E5CA` against master sky `#68C3DE`; reduce highlights to the approved ramps.
- §6 and §8: separate transparent layer on the shared 180×320 integer grid.

**Generation Prompt:**

> Create a separate transparent cloud layer for a cozy 16-bit pixel-art mobile garden scene. On a 180×320 portrait scene, fit all cloud silhouettes inside x=2–176, y=67–96. Leave the HUD safe area y=0–64 entirely clear. Use sparse irregular stepped curves and crisp integer-grid clusters; sampled cloud #F9E5CA against sky #68C3DE, with gentle contrast. Keep clear of the plant silhouette and follow the master palette ramps in Art Bible §4.
>
> Avoid opaque sky fill, sun, stars, birds, text, UI elements, artwork in the HUD safe area, blur, gradients, anti-aliasing, dense cloud texture, smooth vector edges, or colors outside the approved palette.

**Status:** In Progress — static sprite generated in `assets/images/pixel-watering/`; automated PNG/palette/composite QA PASS; owner visual sign-off and animation/Phaser integration PENDING.

## ASSET-003 — Wooden Table

| Field | Value |
|-------|-------|
| Category | Environment |
| Dimensions | Visible bounds x=0, y=263, w=180, h=57 px on the shared scene |
| Format | PNG RGBA lossless; transparent outside tabletop/front-edge silhouette |
| Naming | `env_table_wood_base_wide.png` |
| Anchor | Scene-aligned top-left (0,263); table begins near y=263 |
| Layer | 3, in front of background/clouds and behind focal objects |
| Animation | Static |

**Visual Description:**

A warm wooden tabletop spans the width from y≈263 to the bottom, with a front fascia near the lower edge. The centered pot rests in front of this table plane. Use broad horizontal grain bands and keep contrast below the plant and pot.

**Art Bible Anchors:**
- §2: warm, restful material.
- §3: clean stepped edges with softly clipped corners.
- §4: sampled wood shadow/base/highlight `#51442F`, `#CF7341`, `#F59949`.
- §6: table begins at the master-measured y≈263; §8: separate transparent runtime sprite.

**Generation Prompt:**

> Create a separate transparent wooden table layer for a cozy 16-bit pixel-art mobile garden scene, aligned to a 180×320 portrait canvas. Span x=0–180 from y=263 to the bottom edge; include warm tabletop and front fascia, supporting the pot in front. Add only a few broad horizontal grain bands. Use sampled wood shadow #51442F, base #CF7341, and upper-left highlight #F59949 from Art Bible §4. Crisp integer-grid pixels, modest contrast, transparent outside the table.
>
> Avoid table legs or extra props, dense wood noise, background fill, text, UI, gradients, blur, anti-aliasing, or colors outside the palette.

**Status:** In Progress — static sprite generated in `assets/images/pixel-watering/`; automated PNG/palette/composite QA PASS; owner visual sign-off and animation/Phaser integration PENDING.

## Review Boundary

The approved master image is a visual reference, not a pixel-perfect runtime export. Recheck the measured bounds together during sprite extraction. No image generation, sprite export, gameplay, Phaser, or UI implementation is included.
