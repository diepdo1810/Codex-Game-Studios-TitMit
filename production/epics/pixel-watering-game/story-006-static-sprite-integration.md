# Story 006: Integrate Approved Static Pixel Art Assets

> **Epic**: Pixel Watering Game
> **Status**: In Progress
> **Layer**: Presentation
> **Type**: Integration
> **Estimate**: M
> **Manifest Version**: N/A (minimal — no control manifest)
> **Last Updated**: 2026-11-13

## Context

**GDD**: `design/game-brief.md`
**Requirement**: Brief MVP feature 1 — portrait garden scene

**ADR Governing Implementation**: N/A (minimal — no ADRs)
**ADR Decision Summary**: N/A (minimal — no ADRs)
**ADR Version**: N/A (minimal — no ADRs)

**Engine**: Web 8.3.4 (Vite; Phaser 4.2.1) | **Risk**: HIGH
**Engine Notes**: Phaser 4 is a post-cutoff major version. Use standard Phaser 4 image/game-object APIs and the checked-in Phaser 4 reference. The project enables `pixelArt`; preserve integer scene coordinates and verify the actual renderer at mobile and desktop sizes.

**Control Manifest Rules (this layer)**:
- Required: N/A (minimal — no control manifest)
- Forbidden: N/A (minimal — no control manifest)
- Guardrail: N/A (minimal — no control manifest)

---

## Acceptance Criteria

*From `design/game-brief.md` MVP feature 1 — “Cảnh dọc 9:16: trời xanh, mây, bàn gỗ, một chậu cây ở giữa và tay cầm bình tưới ở góc phải dưới.”*

- [ ] The approved 180×320 background and all nine foreground PNGs load from `assets/images/pixel-watering/` using `design/assets/production/pixel-watering-placements.json`; all 10 textures exist at runtime.
- [ ] The background is RGBA with alpha 255 at every pixel; its decoded RGB pixel values are unchanged. Update the SHA-256 list and provenance to identify the normalized file.
- [ ] The scene draws the layers in this exact order: background → clouds → table → pot_back → plant → water → splash → pot_front → watering can → hand.
- [ ] Each layer's runtime bounds match its placement JSON width, height, x, and y exactly at the 180×320 logical canvas; image origins use the placement anchors, all object positions are integer pixels, and Phaser nearest-neighbor pixel art rendering remains enabled.
- [ ] The plant and pot remain centered; the water stream and splash land inside the pot opening; the watering can nozzle and hand retain their alignment.
- [ ] No scene artwork overlaps the HUD-safe area y=0–64; no scene layer clips in retained Phaser captures at mobile 390×844 and desktop 1280×720.
- [ ] Runtime loading produces no missing-texture warnings, console errors, or uncaught page errors.
- [ ] Existing watering input, can tilt, water response, plant response, growth, token rewards, gacha, collection, localStorage persistence, and audio continue to pass the existing unit and Playwright suites. No gameplay or save behavior changes.
- [ ] Do not add animation frames or new animation behavior. Preserve only the existing interaction response, using static sprites for scene artwork.
- [ ] Remove the old Phaser Graphics scene artwork only after the new sprite scene has been verified at runtime.
- [ ] Retain actual Phaser mobile and desktop screenshots under `production/qa/evidence/story-006-static-sprite-integration/`. Include a comparison table for every scene layer with runtime and placement JSON bounds; each x, y, width, and height delta is 0 logical pixels. Compare the idle 180×320 render to `design/art/references/master-scene-v1.png` and record any visual difference; master-derived bounds remain within the Art Bible's ±1–2 logical-pixel measurement tolerance.
- [ ] The captures show unblurred pixel edges: the 180×320 Phaser render has pixel art/nearest-neighbor filtering enabled, uses integer-pixel object positions and native sprite dimensions, and the retained mobile and desktop images show no linear-filter interpolation on sprite edges.
- [ ] No performance impact is expected: these are small static 2D textures loaded once; project texture-memory and frame budgets remain unconfigured and are not asserted.

---

## Implementation Notes

Read `design/art/art-bible.md`, `design/assets/asset-manifest.md`, `design/assets/production/README.md`, `design/assets/production/pixel-watering-placements.json`, all 10 PNGs, and `design/art/references/master-scene-v1.png`. Keep `src/game/rules.ts`, `src/game/save.ts`, gacha configuration, UI and audio behavior unchanged. Load the static assets first, confirm their runtime rendering and bounds, then remove the legacy scene Graphics. Use the approved layer order and placement data; do not invent pivots or animation frames.

Required verification: `npm run build`, `npm run test:unit`, and `npm run test:e2e` (Playwright). Capture and inspect real Phaser screenshots at mobile and desktop viewports and record any console/page errors. Run `$asset-audit` and `$code-review` after integration. Do not mark this story Complete if any acceptance criterion or required QA gate is unresolved.

---

## Out of Scope

- Changes to watering rules, growth values, cycle rewards, token economy, gacha odds, collection contents, localStorage schema/behavior, UI flows, or audio.
- New plant, can, water, splash, or environmental animation frames or behaviors.
- New assets or changes to the approved artwork's decoded pixel colors.
- Merging this branch into `main`.

---

## Files

- `src/main.ts`
- `assets/images/pixel-watering/env_garden_background_base_scene.png`
- `assets/images/pixel-watering/env_clouds_cream_base_wide.png`
- `assets/images/pixel-watering/env_table_wood_base_wide.png`
- `assets/images/pixel-watering/plant_leafy_green_base_medium.png`
- `assets/images/pixel-watering/prop_pot_terracotta_back_base_medium.png`
- `assets/images/pixel-watering/prop_pot_terracotta_front_base_medium.png`
- `assets/images/pixel-watering/prop_watering_can_tilt_base_medium.png`
- `assets/images/pixel-watering/char_hand_grip_base_small.png`
- `assets/images/pixel-watering/vfx_water_stream_pour_small.png`
- `assets/images/pixel-watering/vfx_water_splash_impact_small.png`
- `assets/provenance.yaml`
- `design/assets/production/pixel-watering-SHA256SUMS.txt`
- `design/assets/production/README.md`
- `design/assets/specs/garden-background-assets.md`
- `production/qa/evidence/story-006-static-sprite-integration/`

---

## QA Test Cases

N/A — no qa-lead specs at this tier; implement against the Acceptance Criteria above. The user-required build, unit, Playwright, runtime screenshot, asset-audit, and code-review checks are listed in Implementation Notes.

---

## Test Evidence

**Story Type**: Integration
**Required evidence**:
- Automated test evidence is waived by `qa.level: minimal`; this task explicitly requires running `npm run build`, `npm run test:unit`, and `npm run test:e2e`.
- Retain and inspect mobile and desktop runtime screenshots under `production/qa/evidence/story-006-static-sprite-integration/`, with a comparison note against Master Scene V1 and a file hash stamp.

**Status**: [ ] Not yet created

---

## Dependencies

- Depends on: `production/epics/pixel-watering-game/story-001-watering-growth.md`, `production/epics/pixel-watering-game/story-002-cycle-token-reward.md`, `production/epics/pixel-watering-game/story-003-token-gacha.md`, `production/epics/pixel-watering-game/story-004-collection-local-save.md`, `production/epics/pixel-watering-game/story-005-garden-scene-audio.md`
- Unlocks: None
