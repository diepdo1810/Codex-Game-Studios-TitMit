# Story 003: Gacha cây và vật phẩm

> **Epic**: Pixel Watering Game
> **Status**: Ready
> **Layer**: Feature
> **Type**: Integration
> **Estimate**: M
> **Manifest Version**: N/A (minimal — no control manifest)
> **Last Updated**: N/A — implementation has not started

## Context

**GDD**: design/game-brief.md
**Requirement**: Brief MVP feature 4

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

*From design/game-brief.md and the approved decision that tokens are earned in game only:*

- [ ] The player can start a gacha roll by spending the required in-game token balance.
- [ ] A valid roll selects a random plant or item reward.
- [ ] A popup shows the reward after the roll.
- [ ] The roll deducts its token cost; an unaffordable roll does not deduct tokens or grant a reward.
- [ ] The roll uses no paid tokens or advertisements.

The brief does not set a numeric roll cost; its balance value remains to be chosen during implementation.

---

## Implementation Notes

Connect the token balance from Story 002 to the random reward flow. Make the resulting plant or item available for the collection in Story 004.

## Out of Scope

- Story 004: collection display and persistence.
- Story 005: final reward audio and scene polish.

## Files

- src/game/rules.ts
- src/main.ts
- data/config.json (only if the chosen gacha cost is stored as game tuning)
- tests/unit/rules.test.ts (advisory at qa.level minimal)
- tests/integration/boot.spec.ts (advisory at qa.level minimal)

## QA Test Cases

N/A — no qa-lead specs at this tier; implement against the Acceptance Criteria above.

## Test Evidence

**Story Type**: Integration
**Required evidence**:
- Automated tests are waived (advisory) at qa.level minimal.

**Status**: [ ] Not yet created

## Dependencies

- Depends on: production/epics/pixel-watering-game/story-002-cycle-token-reward.md
- Unlocks: production/epics/pixel-watering-game/story-004-collection-local-save.md
