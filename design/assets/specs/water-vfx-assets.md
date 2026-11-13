# Asset Specs — Garden Master Scene: Water VFX

> **Source**: `design/assets/entity-inventory.md`, `design/game-brief.md`
> **Art Bible**: `design/art/art-bible.md`
> **Master Reference**: `design/art/references/master-scene-v1.png` (approved visual reference; not a runtime export)
> **Generated**: 2026-11-13
> **Status**: 2 specs approved / 2 static sprites generated and statically integrated / owner visual sign-off and animation pending
> **Review mode**: Solo — art-director and technical-artist not consulted; technical constraints not independently validated.

## Shared Scene Rules

- Logical scene: 180×320 px, portrait 9:16. Bounds are measured from the approved 941×1672 image with sx=180/941 and sy=320/1672, rounded to pixels (about ±1–2 px); they are not trimmed PNG dimensions.
- Separate runtime assets: lossless PNG RGBA, transparent outside water pixels, crisp integer pixel grid, no anti-aliasing.
- Use the master-sampled scene ramps in Art Bible §4; the original seven colors remain available for compatibility and accents.
- Water uses sampled off-white `#FFF8E9` for local contrast; do not add a new blue palette color.
- Frame count/timing, texture ceiling, and device performance are NOT ASSESSED where the Art Bible does not set them.

## ASSET-008 — Water Stream

| Field | Value |
|-------|-------|
| Category | VFX |
| Dimensions | Master-measured bounds x=96, y=207, w=20, h=27 px on the shared scene |
| Format | PNG RGBA lossless; transparent except for stream pixels |
| Naming | `vfx_water_stream_pour_small.png` |
| Anchor | Nozzle origin at scene (113,215); stream travels down-left into opening |
| Layer | 6, above plant/soil and below pot_front/can |
| Animation | Absent and pouring states; frames/cadence/timing NOT ASSESSED |

**Visual Description:**

A short narrow stream descends diagonally down-left from nozzle (113,215) into the pot opening. It remains clear of the plant silhouette and contrasts against soil and terracotta. The can covers the origin slightly; pot_front masks the lower edge.

**Art Bible Anchors:**
- §1–2: water leads the eye during a restrained, gentle watering action.
- §3: stepped diagonal silhouette, not a smooth antialiased line.
- §4: sampled water `#FFF8E9` with local contrast from soil/pot; palette remains controlled.
- §6 and §8: transparent layer at the measured nozzle/opening position; future frames share canvas/anchor.

**Generation Prompt:**

> Create a separate transparent water-stream sprite for a cozy 16-bit pixel-art mobile garden scene, bounds x=96–116, y=207–234 on the 180×320 portrait composition. Start beneath the watering-can nozzle at (113,215) and descend down-left into the flower-pot opening. Use sampled water #FFF8E9 from Art Bible §4 in compact crisp clusters. Keep the stream narrow and clear of the plant silhouette; the can covers its origin and pot_front can mask its lower edge. Provide aligned absent and pouring states on a shared canvas and anchor; frame count and timing remain unspecified.
>
> Avoid a broad beam, screen-filling spray, opaque background, droplets outside the pot, smooth vector lines, gradients, blur, anti-aliasing, text, UI, or colors outside the palette.

**Status:** In Progress — static sprite generated, automated PNG/palette/composite QA PASS, and Phaser static integration/runtime screenshots retained in Story 006 evidence. Owner visual sign-off and animation PENDING.

## ASSET-009 — Splash

| Field | Value |
|-------|-------|
| Category | VFX |
| Dimensions | Master-measured bounds x=90, y=222, w=11, h=12 px on the shared scene |
| Format | PNG RGBA lossless; transparent except tiny droplets/ripple pixels |
| Naming | `vfx_water_splash_impact_small.png` |
| Anchor | Center-bottom at scene (95,233), inside pot opening |
| Layer | 7, inside opening and before pot_front at layer 8 |
| Animation | Absent and small impact states; frames/cadence/timing NOT ASSESSED |

**Visual Description:**

A tiny contained impact uses a few bright stepped droplets/ripple near (95,233) inside the pot opening. It remains visible between the rear soil plane and front lip, with the lip masking only its lower edge.

**Art Bible Anchors:**
- §1–2: watering response is joyful but soft and brief.
- §3: distinct stepped droplet shapes.
- §4: sampled water `#FFF8E9` against soil/terracotta, using only the Art Bible ramps.
- §6 and §8: contained inside the pot, separate transparent layer, stable anchor at (95,233).

**Generation Prompt:**

> Create a separate transparent tiny water-splash sprite for a cozy 16-bit pixel-art mobile garden scene, bounds x=90–101, y=222–234 inside the centered pot opening on the 180×320 portrait scene. Show only a few bright stepped droplets and/or a very short ripple around center-bottom anchor (95,233), contained by the rim. Use sampled water #FFF8E9 from Art Bible §4 and crisp integer-grid clusters. Keep the effect small and gentle; pot_front may cover only the lower edge. Provide absent and aligned impact states on a common canvas; frame count/timing remain unspecified.
>
> Avoid large splash, overflow over the rim, screen-filling particles, opaque background, gradients, blur, anti-aliasing, text, UI, or colors outside the palette.

**Status:** In Progress — static sprite generated, automated PNG/palette/composite QA PASS, and Phaser static integration/runtime screenshots retained in Story 006 evidence. Owner visual sign-off and animation PENDING.

## Review Boundary

Bounds and nozzle/opening overlap are rounded measurements; recheck them during sprite extraction. Art Bible §8 requires consistent future animation canvas/anchor but does not define timing or frame counts. No image generation, sprite export, gameplay, Phaser, or UI implementation is included.
