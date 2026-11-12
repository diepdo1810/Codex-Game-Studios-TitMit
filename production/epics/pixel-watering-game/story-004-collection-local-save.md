# Story 004: Bộ sưu tập và lưu cục bộ

> **Epic**: Pixel Watering Game
> **Status**: Ready
> **Layer**: Feature
> **Type**: Integration
> **Estimate**: M
> **Manifest Version**: N/A (minimal — no control manifest)
> **Last Updated**: N/A — implementation has not started

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

- [ ] The collection displays plants and items the player has unlocked.
- [ ] A gacha reward from Story 003 appears in the collection.
- [ ] The player's token balance is saved locally on the device.
- [ ] The collection is saved locally on the device.
- [ ] Reloading the game restores the saved token balance and collection.
- [ ] Saving does not require an account or cloud synchronization.

---

## Implementation Notes

Persist the player data locally in the web game and restore it when the game starts. Preserve the collection and token values produced by the earlier stories.

## Out of Scope

- Story 003: gacha roll and reward selection.
- Cloud saves, accounts, paid tokens and advertisements.

## Files

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

**Status**: [ ] Not yet created

## Dependencies

- Depends on: production/epics/pixel-watering-game/story-002-cycle-token-reward.md, production/epics/pixel-watering-game/story-003-token-gacha.md
- Unlocks: production/epics/pixel-watering-game/story-005-garden-scene-audio.md
