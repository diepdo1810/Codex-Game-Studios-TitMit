# Web engine source and provenance

The Web scaffold and engine reference docs were adapted from [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios), MIT licensed. The repository's MIT license and author credits apply.

The upstream scaffold shell scripts have been translated to the .agents layout. Upstream-only one-shot helpers (such as vendor-three.sh and one-shot-grow.sh) were **not** ported; their presence in source reference docs does not mean they are available in this Codex fork. Codex workflow authorization and validation are controlled by the native repository; do not assume Claude hooks execute automatically.

To generate a browser game, invoke `bash .agents/scripts/web-scaffold.sh --dry-run --starter phaser` and review the proposed files before a write. The helper refuses to overwrite an existing `package.json`.
