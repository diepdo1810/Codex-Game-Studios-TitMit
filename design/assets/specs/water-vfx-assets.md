# Asset Specs — Garden Master Scene: Water VFX

> **Source**: `design/assets/entity-inventory.md`, `design/game-brief.md`
> **Art Bible**: `design/art/art-bible.md`
> **Master Reference**: `design/art/references/master-scene-v1.png` (approved visual reference; not a runtime export)
> **Generated**: 2026-11-13
> **Status**: 2 assets specced / 2 specs approved / 0 in production / 0 done
> **Review mode**: Solo — art-director and technical-artist not consulted; technical constraints not independently validated.

## Shared Scene Rules

- Logical scene: 180×320 px, portrait 9:16. Bounds below are estimated visible scene-space envelopes, not final trimmed PNG canvas dimensions.
- Separate runtime assets: lossless PNG RGBA, transparent outside water pixels, crisp integer pixel grid, no anti-aliasing.
- Closed palette: sky `#82C6D3`, cream `#F4E8C8`, deep garden `#315A45`, foliage `#6F9A57`, wood `#9A6344`, terracotta `#C87558`, warm highlight `#F2C76E`.
- Water uses cream `#F4E8C8` for local contrast; do not add a new blue palette color.
- Frame count/timing, texture ceiling, and device performance are NOT ASSESSED where the Art Bible does not set them.

## ASSET-008 — Water Stream

| Field | Value |
|-------|-------|
| Category | VFX |
| Dimensions | Visible bounds x=99, y=205, w=31, h=16 px on the shared scene |
| Format | PNG RGBA lossless; transparent except for stream pixels |
| Naming | `vfx_water_stream_pour_small.png` |
| Anchor | Nozzle origin near local (31,0); stream travels down-left into pot opening |
| Layer | 7, below hand/can; origin tucks under nozzle slightly |
| Animation | Absent and pouring states; frames/cadence/timing NOT ASSESSED |

**Visual Description:**

A short, narrow diagonal stream runs from the nozzle into the pot opening. Keep it continuous but compact so it does not cover the plant. Bright stepped clusters contrast locally against leaves and terracotta.

**Art Bible Anchors:**
- §1–2: water leads the eye during a restrained, gentle watering action.
- §3: stepped diagonal silhouette, not a smooth antialiased line.
- §4: cream `#F4E8C8` from the seven-color palette; contrast comes from placement.
- §6 and §8: separate transparent layer, correct nozzle-to-opening placement, aligned future frames.

**Generation Prompt:**

> Create a separate transparent water-stream sprite for a cozy 16-bit pixel-art mobile garden scene. Fit estimated bounds x=99–130, y=205–221 on the 180×320 portrait composition. A narrow bright stepped stream starts near the watering-can nozzle at the upper-right of this envelope and travels diagonally down-left into the flower-pot opening. Use cream #F4E8C8 water pixels from the approved seven-color palette, in compact crisp clusters. Keep the stream short and clear of the plant silhouette. Provide aligned absent and pouring states on a shared canvas and anchor; frame count and timing are unspecified.
>
> Avoid a broad beam, screen-filling spray, opaque background, droplets outside the pot, smooth vector lines, gradients, blur, anti-aliasing, text, UI, or colors outside the palette.

**Status:** Needed — specification approved; image asset not generated.

## ASSET-009 — Splash

| Field | Value |
|-------|-------|
| Category | VFX |
| Dimensions | Visible bounds x=88, y=212, w=18, h=8 px on the shared scene |
| Format | PNG RGBA lossless; transparent except tiny droplets/ripple pixels |
| Naming | `vfx_water_splash_impact_small.png` |
| Anchor | Center-bottom local (9,8), placed near scene (97,220), inside pot opening |
| Layer | 7, contained in opening; pot front lip may overlap its lower edge |
| Animation | Absent and small impact states; frames/cadence/timing NOT ASSESSED |

**Visual Description:**

A tiny contained impact uses a few bright stepped droplets or a short ripple inside the pot opening. It should read at native size without escaping the rim or becoming a large burst.

**Art Bible Anchors:**
- §1–2: watering response is joyful but soft and brief.
- §3: distinct stepped droplet shapes.
- §4: cream `#F4E8C8` against the dark opening, using only the approved palette.
- §6 and §8: contained inside the pot, separate transparent layer, stable future frame anchor.

**Generation Prompt:**

> Create a separate transparent tiny water-splash sprite for a cozy 16-bit pixel-art mobile garden scene. Fit estimated bounds x=88–106, y=212–220 inside the centered pot opening on the 180×320 portrait scene. Show only a few bright stepped droplets and/or a very short ripple, contained by the rim and readable at native size. Use cream #F4E8C8 from the approved seven-color palette and crisp integer-grid clusters. Keep the effect small and gentle. Provide absent and aligned impact states on a common canvas and center-bottom anchor; frame count and timing are unspecified.
>
> Avoid large splash, overflow over the rim, screen-filling particles, opaque background, gradients, blur, anti-aliasing, text, UI, or colors outside the palette.

**Status:** Needed — specification approved; image asset not generated.

## Review Boundary

Bounds and nozzle/opening overlap are scene-space estimates from the approved inventory. Art Bible §8 requires consistent future animation canvas/anchor but does not define timing or frame counts. No image generation, sprite export, gameplay, Phaser, or UI implementation is included.
