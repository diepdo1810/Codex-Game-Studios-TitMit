# Story 001: Tưới cây và tăng trưởng

> **Epic**: Pixel Watering Game
> **Status**: Ready
> **Layer**: Feature
> **Type**: Visual/Feel
> **Estimate**: M
> **Manifest Version**: N/A (minimal — no control manifest)
> **Last Updated**: N/A — implementation has not started

## Context

**GDD**: design/game-brief.md
**Requirement**: Brief MVP feature 2

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

- [ ] A touch on the watering control tilts the watering can and starts a visible stream into the pot.
- [ ] Watering causes the plant to play a visible response animation.
- [ ] Watering advances the growth bar.
- [ ] The player can stop after any watering action without entering a fail state.
- [ ] The watering interaction works in the portrait mobile game view.

---

## Implementation Notes

Use the existing Phaser game entry point and game rules as the starting point. Keep the touch action, watering animation, plant response and growth feedback connected as one player-visible interaction.

## Out of Scope

- Story 002: token rewards and restarting a completed growth cycle.
- Story 005: final garden-scene art and water/reward audio.

## Files

- src/main.ts
- src/game/rules.ts
- tests/unit/rules.test.ts (advisory at qa.level minimal)
- tests/integration/boot.spec.ts (advisory at qa.level minimal)

## QA Test Cases

N/A — no qa-lead specs at this tier; implement against the Acceptance Criteria above.

## Test Evidence

**Story Type**: Visual/Feel
**Required evidence**:
- Retained screenshot in production/qa/evidence/ and sign-off in production/qa/evidence/watering-growth-evidence.md
- Automated tests are waived (advisory) at qa.level minimal.

**Status**: [ ] Not yet created

## Dependencies

- Depends on: None
- Unlocks: production/epics/pixel-watering-game/story-002-cycle-token-reward.md
