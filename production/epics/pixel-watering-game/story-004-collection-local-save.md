# Story 004: Bộ sưu tập và lưu cục bộ

> **Epic**: Pixel Watering Game
> **Status**: Complete
> **Layer**: Feature
> **Type**: Integration
> **Estimate**: M
> **Manifest Version**: N/A (minimal — no control manifest)
> **Last Updated**: 2026-11-12

## Context

**GDD**: design/game-brief.md
**Requirement**: Brief MVP feature 5

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

*From design/game-brief.md and the approved decision to save locally on device:*

- [x] The collection displays plants and items the player has unlocked.
- [x] A gacha reward from Story 003 appears in the collection.
- [x] The player's token balance is saved locally on the device.
- [x] The collection is saved locally on the device.
- [x] Reloading the game restores the saved token balance and collection.
- [x] Saving does not require an account or cloud synchronization.

---

## Implementation Notes

Persist the player data locally in the web game and restore it when the game starts. Preserve the collection and token values produced by the earlier stories.

## Out of Scope

- Story 003: gacha roll and reward selection.
- Cloud saves, accounts, paid tokens and advertisements.

## Files

- index.html (collection dialog and local-save status)
- tests/unit/save.test.ts (storage boundary tests)
- src/game/save.ts
- src/game/rules.ts
- src/main.ts
- tests/integration/boot.spec.ts (advisory at qa.level minimal)

## QA Test Cases

N/A — no qa-lead specs at this tier; implement against the Acceptance Criteria above.

## Test Evidence

**Story Type**: Integration
**Required evidence**:
- Automated tests are waived (advisory) at qa.level minimal.

**Status**: Verified — 25 unit tests, 11 Playwright tests.

## Dependencies

- Depends on: production/epics/pixel-watering-game/story-002-cycle-token-reward.md, production/epics/pixel-watering-game/story-003-token-gacha.md
- Unlocks: production/epics/pixel-watering-game/story-005-garden-scene-audio.md

## Completion Notes

**Completed**: 2026-11-12
**Criteria**: 6/6 PASS. Collection displays unlocked plant/item names; gacha adds rewards. Local device save restores token balance and collection on reload, without account/cloud sync.
**Test Evidence**: build and bare `npm test` PASS (25 unit, 11 browser). Malformed/version-invalid saves and blocked storage tested without game crash. Screenshots `production/qa/evidence/story-004-collection-local-save/01-unlocked-mobile.png` and `02-restored-mobile.png` retained and opened. Actual before/after reload both tokens3/unlockedfern; console/page errors none.
**Reviewed by**: separate engine reviewer, source review PASS; browser verification by Codex.
**Run result**: OBSERVED — saved Dương xỉ collection and balance3 restored after actual reload.
**Deviations**: index.html supplies accessible collection dialog; dedicated save unit test added as user requires tests despite minimal QA. Growth/animations remain session-only as scope specifies durable tokens/collection.
