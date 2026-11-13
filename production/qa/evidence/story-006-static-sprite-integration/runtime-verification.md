# Story 006 — Static Sprite Runtime Verification

**Date:** 2026-11-13  
**Runtime:** Vite development server at `http://127.0.0.1:5176/index.html?manual=1`; Chromium with SwiftShader WebGL.  
**Reference:** `design/art/references/master-scene-v1.png` and `design/assets/production/pixel-watering-placements.json`.

## Final captures

- `03-mobile-runtime-idle.png` — 390×844 touch viewport, one deterministic Phaser frame rendered.
- `04-mobile-runtime-watering.png` — 390×844 touch viewport, one press and frame; existing can tilt, plant response, stream and splash are visible.
- `05-desktop-runtime-idle.png` — 1280×720 viewport, one deterministic Phaser frame rendered.

`?manual=1` intentionally sleeps Phaser's normal loop for deterministic tests. The first screenshot attempt before a manual `window.game.step()` was blank because the scene had not presented a frame; the files above were recaptured after that frame and are the retained evidence.

## Runtime layer snapshot

The existing read-only `window.game.visuals` test hook read each Phaser Image after the final removal of the legacy Graphics renderer. All 10 textures reported `textureLoaded: true`; idle `visible` is false only for the intentionally inactive stream and splash. Each numeric runtime idle bound below exactly matched the placement contract (Δ = 0 logical pixels; the plant's JavaScript x value is `33.00000000000001`, a floating-point representation of 33).

| Layer / depth | Placement bounds x,y,w,h | Runtime idle bounds x,y,w,h | Δ |
| --- | --- | --- | --- |
| background / 0 | 0, 0, 180, 320 | 0, 0, 180, 320 | 0,0,0,0 |
| clouds / 1 | 2, 67, 174, 29 | 2, 67, 174, 29 | 0,0,0,0 |
| table / 2 | 0, 263, 180, 57 | 0, 263, 180, 57 | 0,0,0,0 |
| pot_back / 3 | 52, 218, 76, 16 | 52, 218, 76, 16 | 0,0,0,0 |
| plant / 4 | 33, 103, 111, 125 | 33, 103, 111, 125 | 0,0,0,0 |
| water stream / 5 | 97, 200, 18, 30 | 97, 200, 18, 30 | 0,0,0,0 |
| splash / 6 | 93, 221, 10, 9 | 93, 221, 10, 9 | 0,0,0,0 |
| pot_front / 7 | 51, 226, 78, 64 | 51, 226, 78, 64 | 0,0,0,0 |
| watering can / 8 | 113, 167, 59, 51 | 113, 167, 59, 51 | 0,0,0,0 |
| hand / 9 | 151, 153, 29, 33 | 151, 153, 29, 33 | 0,0,0,0 |

The planting and can pivots preserve those idle bounds: plant `(89,228)` at origin `(56/111,1)` and can `(157,183)` at origin `(44/59,16/51)`. While watering, stream and splash become visible behind `pot_front`; the can rotates and plant responds, so their animated bounding boxes are expected to expand from their approved idle placement bounds.

## Visual assessment

- The final Phaser capture matches Master Scene V1's intended order and composition: sky/clear top field, clouds, distant foliage, central leafy plant over the two-part terracotta pot, wooden table, and hand-held watering can at the right.
- The art HUD-safe scene area y=0–64 remains sky-only; all art positions are whole logical pixels and use native sprite dimensions. `pixelArt: true` plus CSS `image-rendering: pixelated` produced crisp nearest-neighbor pixel edges in both retained viewport captures; no scene clipping was observed.
- The existing HTML `Bộ sưu tập` button sits over the plant's upper leaves. It is outside Story 006's approved no-UI-change boundary, not a scene asset or Master Scene mismatch, and was not modified.
- No console error or uncaught page error occurred in the three final captures. The final source contains no legacy Phaser Graphics artwork.

## Automated checks

- `npm run build` — PASS. Vite emitted its existing advisory for a minified JavaScript chunk over 500 kB.
- `npm run test:unit` — PASS, 25/25 tests.
- `npm run test:e2e` — PASS, 21/21 Playwright tests.
- `sha256sum -c design/assets/production/pixel-watering-SHA256SUMS.txt` — recorded separately after final artifact verification.

