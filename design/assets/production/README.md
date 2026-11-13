# Pixel Watering — Static Sprite Production V1

**Date:** 2026-11-13  
**Branch:** `codex/pixel-watering-art-bible`  
**Source master:** `design/art/references/master-scene-v1.png` (941×1672 px; SHA-256 `c2aadc1c07ec5604b8af16128c4d6209b52113ef6a5c1d97156066f630ebf40b`).

## Deliverables

- **9 logical assets**, `ASSET-001` to `ASSET-009`.
- **10 individual PNG files** under `assets/images/pixel-watering/`. The terracotta pot uses distinct transparent `pot_back` and `pot_front` layers.
- Exact user-approved ASSET-001 background source retained (SHA-256 `f192633e313be9aae3a45a8793bb49a9cf34b9dd7457f44b08d853047051af49`).
- `pixel-watering-placements.json`: scene-space crop offsets, dimensions, draw order, alpha and colors.
- `pixel-watering-SHA256SUMS.txt`: checksums for 10 PNGs, placement JSON, and two QA visual composites.
- Offline composites under `production/qa/evidence/pixel-watering-assets/`, at 180×320 and crisp nearest-neighbor 4× zoom.

## Asset production method

Approved original reference downsampled onto integer 180×320 game grid using nearest-neighbor pixel sampling. Leaf, cloud, can and hand silhouettes isolated with bounded color/polygon masks, indexed to the Art Bible's master-derived color ramps. Wooden table and pot front/back were redrawn on the same grid where source image layers overlap irrecoverably. All sprites use whole-pixel coordinates. Binary RGBA alpha (0/255) for transparent sprites; background is opaque.

**QA performed:** 10 distinct nonempty PNGs, crop bounds within 180×320, 6-color user-approved background unchanged, binary transparency, source package hash, 14 checksum manifest entries, manual inspection of offline composite. GitHub one-time import job independently verified PNG headers, dimensions, placement bounds and checksums.

## Static draw order

1. Garden background (opaque)
2. Clouds
3. Wooden table
4. pot_back (rear rim, soil)
5. Plant
6. Water stream
7. Splash
8. pot_front (front body/lip)
9. Watering can
10. Hand

See `pixel-watering-placements.json` for offsets. PNGs are **cropped sprites**, not full 180×320 textures except ASSET-001.

## Gate status

| Category | Result |
|---|---|
| ASSET-001 approved background | **APPROVED by owner** |
| ASSET-002–009 static base images | **CREATED + technical QA PASS** |
| Owner/independent visual sign-off on new sprites | **PENDING** |
| Idle/tilt/growth animation frame sets | **PENDING** |
| Phaser scene integration and actual in-game screenshot | **PENDING** |
| Device/performance tests | **NOT ASSESSED** |

The composite images are **offline previews**, not screenshots of the running Phaser game. Do not mark gameplay or Visual/Feel story DONE until integrated and retained runtime evidence exists.
