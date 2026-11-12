# Story 001: Tưới cây và tăng trưởng

> **Epic**: Pixel Watering Game
> **Status**: Complete
> **Layer**: Feature
> **Type**: Visual/Feel
> **Estimate**: M
> **Manifest Version**: N/A (minimal — no control manifest)
> **Last Updated**: 2026-11-12

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

- [x] A touch on the watering control tilts the watering can and starts a visible stream into the pot.
- [x] Watering causes the plant to play a visible response animation.
- [x] Watering advances the growth bar.
- [x] The player can stop after any watering action without entering a fail state.
- [x] The watering interaction works in the portrait mobile game view.

---

## Implementation Notes

Use the existing Phaser game entry point and game rules as the starting point. Keep the touch action, watering animation, plant response and growth feedback connected as one player-visible interaction.

## Out of Scope

- Story 002: token rewards and restarting a completed growth cycle.
- Story 005: final garden-scene art and water/reward audio.

## Files

- index.html
- data/config.json
- playwright.config.ts (HTTP test server; managed Chromium blocks file URLs)
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

**Status**: Verified — 6 unit tests, 4 Playwright tests; retained screenshots inspected.

## Dependencies

- Depends on: None
- Unlocks: production/epics/pixel-watering-game/story-002-cycle-token-reward.md

## Completion Notes

**Completed**: 2026-11-12
**Criteria**: 5/5 PASS. Touch and Space start watering, connected stream enters pot, plant responds, growth increases, idle preserves growth, portrait 9:16 verified.
**Test Evidence**: `npm run build` PASS; `PAGE_SHOT_BROWSER=/usr/bin/chromium npm test` PASS (6 unit, 4 browser). Screenshots retained locally under `production/qa/evidence/story-001-watering-growth/` and opened by Codex. Sign-off: `production/qa/evidence/watering-growth-evidence.md`.
**Reviewed by**: separate engine reviewer; disconnected stream finding fixed and verified visually. Native role loading and human playtest not claimed.
**Run result**: OBSERVED — mobile and desktop watering at 20%, visible plant response and water from spout into pot; no page/console errors after fix.
**Deviations**: `index.html` supplies accessible controls and portrait frame; `playwright.config.ts` serves the real build over HTTP. No gameplay scope added.
