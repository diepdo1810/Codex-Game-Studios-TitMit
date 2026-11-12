# Story 002: Nhận token sau chu kỳ

> **Epic**: Pixel Watering Game
> **Status**: Ready
> **Layer**: Feature
> **Type**: Logic
> **Estimate**: S
> **Manifest Version**: N/A (minimal — no control manifest)
> **Last Updated**: N/A — implementation has not started

## Context

**GDD**: design/game-brief.md
**Requirement**: Brief MVP feature 3

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

- [ ] Reaching full growth completes the current growth cycle.
- [ ] Completing a cycle grants a positive token reward earned in game.
- [ ] After the reward, growth begins a new cycle.
- [ ] The earned token balance is available to the gacha during the current play session.
- [ ] Completing or pausing a cycle never creates a fail state.

The brief does not set a numeric cycle reward; its balance value remains to be chosen during implementation.

---

## Implementation Notes

Connect cycle completion to the growth rules from Story 001. Keep the cycle reward in-game; do not add paid tokens or ads.

## Out of Scope

- Story 003: spending tokens and rolling for a random reward.
- Story 004: persisting the token balance across reloads.

## Files

- src/game/rules.ts
- src/main.ts
- data/config.json (only if the chosen cycle reward is stored as game tuning)
- tests/unit/rules.test.ts (advisory at qa.level minimal)

## QA Test Cases

N/A — no qa-lead specs at this tier; implement against the Acceptance Criteria above.

## Test Evidence

**Story Type**: Logic
**Required evidence**:
- Automated tests are waived (advisory) at qa.level minimal.

**Status**: [ ] Not yet created

## Dependencies

- Depends on: production/epics/pixel-watering-game/story-001-watering-growth.md
- Unlocks: production/epics/pixel-watering-game/story-003-token-gacha.md, production/epics/pixel-watering-game/story-004-collection-local-save.md
