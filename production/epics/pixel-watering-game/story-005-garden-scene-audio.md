# Story 005: Hoàn thiện cảnh vườn và âm thanh

> **Epic**: Pixel Watering Game
> **Status**: Ready
> **Layer**: Presentation
> **Type**: Visual/Feel
> **Estimate**: M
> **Manifest Version**: N/A (minimal — no control manifest)
> **Last Updated**: N/A — implementation has not started

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

- [ ] The garden game view is portrait 9:16.
- [ ] The scene shows a blue sky, clouds and a wooden table.
- [ ] One potted plant is centered in the scene.
- [ ] The hand holding the watering can appears at the lower-right corner.
- [ ] The scene uses a cozy 16-bit pixel-art style that reads clearly on a phone.
- [ ] Watering and reward events have gentle water and reward sounds.

---

## Implementation Notes

Finish the garden presentation around the watering and reward interactions from Stories 001–004. Keep the scene aligned with the portrait mobile composition in the brief.

## Out of Scope

- New gameplay systems beyond the watering, cycle, gacha and collection stories.
- Multiple pots, withering, deadlines, fail states, accounts and cloud synchronization.

## Files

- src/main.ts
- data/config.json
- tests/integration/boot.spec.ts (advisory at qa.level minimal)

## QA Test Cases

N/A — no qa-lead specs at this tier; implement against the Acceptance Criteria above.

## Test Evidence

**Story Type**: Visual/Feel
**Required evidence**:
- Retained screenshot in production/qa/evidence/ and sign-off in production/qa/evidence/garden-scene-evidence.md
- Automated tests are waived (advisory) at qa.level minimal.

**Status**: [ ] Not yet created

## Dependencies

- Depends on: production/epics/pixel-watering-game/story-001-watering-growth.md, production/epics/pixel-watering-game/story-002-cycle-token-reward.md, production/epics/pixel-watering-game/story-003-token-gacha.md, production/epics/pixel-watering-game/story-004-collection-local-save.md
- Unlocks: None
