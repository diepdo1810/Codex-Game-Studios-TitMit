# Web engine source and provenance

The Web scaffold and engine reference docs were adapted from [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios), MIT licensed. The repository's MIT license and author credits apply.

The upstream scaffold shell scripts have been translated to the .agents layout. Codex workflow authorization and validation are controlled by the native repository; do not assume Claude hooks execute automatically.

To generate a browser game, invoke `bash .agents/scripts/web-scaffold.sh --dry-run --starter phaser` and review the proposed files before a write. The helper refuses to overwrite an existing `package.json`.
