# Asset Specs — Garden Master Scene: Clouds and Wooden Table

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
- Warm light comes from upper-left; compact pixel shadows fall lower-right. These details stay lower contrast than plant, pot, and water.
- Texture/memory ceilings, frame budget, and device performance are NOT ASSESSED where the Art Bible does not set them.

## ASSET-002 — Clouds

| Field | Value |
|-------|-------|
| Category | Environment |
| Dimensions | Visible group envelope x=10, y=30, w=160, h=95 px on the shared scene |
| Format | PNG RGBA lossless; transparent outside cloud silhouettes |
| Naming | `env_clouds_cream_base_wide.png` |
| Anchor | Group top-left at scene (10,30); individual clouds remain in the envelope |
| Layer | 2, over sky/distant garden and behind foreground objects |
| Animation | Static in the approved master; drift is not specified or approved |

**Visual Description:**

Sparse cream clouds with irregular stepped curves sit in the upper sky. Keep their contrast gentle, preserve the upper growth-bar breathing room, and avoid the plant silhouette.

**Art Bible Anchors:**
- §1–2: preserve a calm open sky and keep the plant focal.
- §3: clouds use irregular stepped curves, not smooth vector edges.
- §4: cream `#F4E8C8` against sky `#82C6D3`; use only the seven approved colors.
- §6 and §8: separate transparent layer on the shared 180×320 integer grid.

**Generation Prompt:**

> Create a separate transparent cloud layer for a cozy 16-bit pixel-art mobile garden scene. Place a sparse group of small cream clouds inside the estimated envelope x=10–170, y=30–125 of a 180×320 portrait scene. Use irregular stepped curves and crisp integer-grid clusters. Use cream #F4E8C8 and, only where needed, sky #82C6D3; keep contrast gentle. Preserve the top UI breathing room and leave the plant silhouette clear. Stay within the seven-color Art Bible palette.
>
> Avoid opaque sky fill, sun, stars, birds, text, UI, blur, gradients, anti-aliasing, dense cloud texture, smooth vector edges, or colors outside the approved palette.

**Status:** Needed — specification approved; image asset not generated.

## ASSET-003 — Wooden Table

| Field | Value |
|-------|-------|
| Category | Environment |
| Dimensions | Visible bounds x=0, y=239, w=180, h=24 px on the shared scene |
| Format | PNG RGBA lossless; transparent outside tabletop/front-edge silhouette |
| Naming | `env_table_wood_base_wide.png` |
| Anchor | Scene-aligned top-left (0,0); tabletop begins near y=239 |
| Layer | 3, in front of background/clouds and behind focal objects |
| Animation | Static |

**Visual Description:**

A warm wooden tabletop spans the width near the lower quarter, supporting the centered pot. Keep the proposed 24 px thickness (7.5% of scene height), with a simple front edge and a few broad horizontal grain bands. The table remains visually quiet.

**Art Bible Anchors:**
- §2: warm, restful material.
- §3: clean stepped edges with softly clipped corners.
- §4: wood `#9A6344`, controlled shadow/highlight from the closed palette.
- §6: thickness follows the 5–8% guidance; §8: separate transparent runtime sprite.

**Generation Prompt:**

> Create a separate transparent wooden table layer for a cozy 16-bit pixel-art mobile garden scene, aligned to a 180×320 portrait canvas. Span x=0–180 and y=239–263, with a warm brown top and simple visible front edge that supports a centered pot. Add only a few broad horizontal grain bands. Use wood #9A6344, restrained shadow #315A45, and sparse upper-left highlight #F2C76E from the seven-color palette. Crisp integer-grid pixels and modest contrast.
>
> Avoid table legs or extra props, dense wood noise, background fill, text, UI, gradients, blur, anti-aliasing, or colors outside the palette.

**Status:** Needed — specification approved; image asset not generated.

## Review Boundary

The approved master image is a visual reference, not a pixel-perfect runtime export. Bounds are estimates from the approved inventory/master and should be checked together during sprite extraction. No image generation, sprite export, gameplay, Phaser, or UI implementation is included.
