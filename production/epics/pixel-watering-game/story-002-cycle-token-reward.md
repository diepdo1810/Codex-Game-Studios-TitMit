# Story 002: Nhận token sau chu kỳ

> **Epic**: Pixel Watering Game
> **Status**: Complete
> **Layer**: Feature
> **Type**: Logic
> **Estimate**: S
> **Manifest Version**: N/A (minimal — no control manifest)
> **Last Updated**: 2026-11-12

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

- [x] Reaching full growth completes the current growth cycle.
- [x] Completing a cycle grants a positive token reward earned in game.
- [x] After the reward, growth begins a new cycle.
- [x] The earned token balance is available to the gacha during the current play session.
- [x] Completing or pausing a cycle never creates a fail state.

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

**Status**: Verified — 8 unit tests, 5 Playwright tests.

## Dependencies

- Depends on: production/epics/pixel-watering-game/story-001-watering-growth.md
- Unlocks: production/epics/pixel-watering-game/story-003-token-gacha.md, production/epics/pixel-watering-game/story-004-collection-local-save.md

## Completion Notes

**Completed**: 2026-11-12
**Criteria**: 5/5 PASS. Five watering actions complete a cycle, grant 3 in-game tokens once and reset growth to 0; idle/pause preserve state. Token balance remains available in session.
**Test Evidence**: `npm run build` and bare `npm test` PASS (8 unit, 5 browser). Mobile screenshot `production/qa/evidence/story-002-cycle-token-reward/01-cycle-token-mobile.png` opened: Token3, cycle1, growth0. Console/page errors: none.
**Reviewed by**: separate engine reviewer, source review PASS; browser verification by Codex. No human playtest claimed.
**Run result**: OBSERVED — mobile cycle reward and new growth cycle.
**Deviations**: cycleReward3 selected as allowed by brief; intended gachaCost3. Playwright config detects system Chromium for bare `npm test`.
