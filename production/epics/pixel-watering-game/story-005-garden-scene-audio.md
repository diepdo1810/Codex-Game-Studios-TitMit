# Story 005: Hoàn thiện cảnh vườn và âm thanh

> **Epic**: Pixel Watering Game
> **Status**: Complete
> **Layer**: Presentation
> **Type**: Visual/Feel
> **Estimate**: M
> **Manifest Version**: N/A (minimal — no control manifest)
> **Last Updated**: 2026-11-12

## Context

**GDD**: design/game-brief.md
**Requirement**: Brief MVP feature 1

**ADR Governing Implementation**: N/A (minimal — no ADRs)
**ADR Decision Summary**: N/A (minimal — no ADRs)
**ADR Version**: N/A (minimal — no ADRs)

**Engine**: Web 8.3.4 (Vite; Phaser 4.2.1 from package.json) | **Risk**: HIGH
**Engine Notes**: none (no ADR engine-compatibility analysis at minimal)

**Control Manifest Rules (this layer)**:
- Required: N/A (minimal — no control manifest)
- Forbidden: N/A (minimal — no control manifest)
- Guardrail: N/A (minimal — no control manifest)

---

## Acceptance Criteria

*From design/game-brief.md, scoped to this story:*

- [x] The garden game view is portrait 9:16.
- [x] The scene shows a blue sky, clouds and a wooden table.
- [x] One potted plant is centered in the scene.
- [x] The hand holding the watering can appears at the lower-right corner.
- [x] The scene uses a cozy 16-bit pixel-art style that reads clearly on a phone.
- [x] Watering and reward events have gentle water and reward sounds.

---

## Implementation Notes

Finish the garden presentation around the watering and reward interactions from Stories 001–004. Keep the scene aligned with the portrait mobile composition in the brief.

## Out of Scope

- New gameplay systems beyond the watering, cycle, gacha and collection stories.
- Multiple pots, withering, deadlines, fail states, accounts and cloud synchronization.

## Files

- src/main.ts
- src/game/audio.ts
- src/game/save.ts
- src/hook.ts
- data/config.json
- index.html
- playwright.config.ts
- tests/unit/rules.test.ts
- tests/unit/save.test.ts
- tests/integration/boot.spec.ts (advisory at qa.level minimal)

## QA Test Cases

N/A — no qa-lead specs at this tier; implement against the Acceptance Criteria above.

## Test Evidence

**Story Type**: Visual/Feel
**Required evidence**:
- Retained screenshot in production/qa/evidence/ and sign-off in production/qa/evidence/garden-scene-evidence.md
- Automated tests are waived (advisory) at qa.level minimal.

**Status**: Verified — 25 unit tests, 21 Playwright tests; mobile and desktop screenshots inspected. Screenshot evidence retained locally under `production/qa/evidence/story-005-garden-scene-audio/`.

## Dependencies

- Depends on: production/epics/pixel-watering-game/story-001-watering-growth.md, production/epics/pixel-watering-game/story-002-cycle-token-reward.md, production/epics/pixel-watering-game/story-003-token-gacha.md, production/epics/pixel-watering-game/story-004-collection-local-save.md
- Unlocks: None

## Completion Notes

**Completed**: 2026-11-12
**Criteria**: 6/6 PASS. Portrait composition shows blue sky, clouds, wooden table, centered potted plant and watering can at lower right. Pixel-art palette and scene remain readable at 320×568 and 390×844. Watering and reward sounds use filtered generated audio with gesture unlock and mute control.
**Test Evidence**: `npm run build` PASS; `npm test` PASS (25 unit, 21 Playwright). Tests cover mobile touch, desktop rendering, console/page errors, actual audio waveforms, reward notes, mute, no autoplay, persistence, and fresh session RNG. Current dialog screenshots `mobile-reward.png` and `mobile-collection.png` opened; no tap highlight obscures content. No console/page errors.
**Reviewed by**: separate code reviewer approved RNG fix; separate UI reviewer approved current captures. No human playtest or listening test claimed.
**Run result**: OBSERVED — garden, watering, rewards, collection on mobile/desktop; mobile page stayed portrait without horizontal overflow.
**Deviations**: Generated Web Audio avoids external assets. `src/hook.ts` seeds ordinary sessions from fresh cryptographic entropy while preserving explicit `?seed=0` and `?seed=7` determinism. No gameplay added beyond Stories 001–004.
