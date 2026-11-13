# Pixel Watering Game — retained QA evidence

Source: merged PR #2, commit `a67f40d24efc4450509bb3b848eef214f9742e0c` on `main`.
CI: https://github.com/diepdo1810/Codex-Game-Studios-TitMit/actions/runs/43253541332 — 7 jobs SUCCESS.
Original CI artifact: https://github.com/diepdo1810/Codex-Game-Studios-TitMit/actions/runs/43253541332/artifacts/13959732418 (expires 2027-02-10).
QA review date: 2026-11-13.

## Screenshots retained

- `story-001-watering-growth/01-mobile-watering.png`: mobile interaction, stream and 20% growth.
- `story-005-garden-scene-audio/01-mobile-garden.png`: mobile portrait game after watering.
- `story-005-garden-scene-audio/02-desktop-garden.png`: desktop game layout.
- `story-003-token-gacha/01-mobile-reward.png`: mobile gacha reward dialog after a funded roll.
- `story-004-collection-local-save/01-mobile-collection.png`: mobile unlocked-item collection.
- `SHA256SUMS.txt`: SHA-256 integrity manifest of retained PNGs.

First 3 PNGs copied unchanged from CI artifact 13959732418 (SHA-256 verified against source). Last 2 PNGs captured from merged game in Chromium. All 5 images visually inspected in-session on 2026-11-13: readable portrait composition, visible watering stream, centered gacha and collection dialogs, no obvious clipping. Independent QA-lead sign-off is still PENDING.

## Automated checks

`npm run build` PASS; Vitest 25/25 PASS; Playwright 21/21 PASS at the merged commit. Browser tests cover mobile input, desktop rendering, progress, gacha, storage reload/corruption handling, Web Audio waveform, mute and console/page errors.

## Remaining limits

- Automated Chromium screenshots do not prove subjective animation feel, real-device performance or physical speaker audio quality.
- Current technical review is in-session and not an independent QA-lead approval.
- Physical Android playtest and independent QA-lead sign-off remain PENDING.
- Repo PNGs are durable after the CI artifact expires.
