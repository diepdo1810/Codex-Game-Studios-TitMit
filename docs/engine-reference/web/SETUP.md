# Web engine setup for Codex Game Studios

This is the Web-specific route for `$setup-engine web`. It replaces the native-editor setup instructions for Godot, Unity and Unreal. Read `AGENTS.md` and keep authorization, safety hooks, scopes and existing changes intact.

## 1. Select the project root

Use the nearest actual game root containing `project.yaml` or `package.json`; do not borrow a parent project in a monorepo. If in doubt, report the ambiguity before any write. Web is a toolchain, not a native engine executable.

## 2. Existing Web game

If `package.json` already exists, do not scaffold or overwrite it. First run the read-only probe:

```bash
bash .agents/scripts/web-detect.sh
```

For a workspace or monorepo, stop and ask to open the particular game's root. Detect the package manager from a single lockfile; with conflicting lockfiles request a choice. Record in `project.yaml` only the existing engine/toolchain details and executable scripts that the probe confirms; preserve language, dependencies, source paths, tests and bundler. Use `engine.name: "Web"` (capital W). For no recognized test script, report NOT ASSESSED instead of inventing a command. If game code is outside `src/`, record the explicitly verified relative path as `engine.code_root` in shared `project.yaml`; the resolver must never invent a root. A missing recorded root remains NOT ASSESSED. Do not install dependencies without approval. Missing package manager or installation is NOT ASSESSED for testing, not a pass.

Existing Web games may use Vite, Next.js, vanilla JS, Phaser 3 or a different bundler: do not force the template's versions. Use their actual `package.json` when consulting APIs. If there is no matching project-specific version reference, report that gap.

## 3. New Web game

Require Node `^22.12 || ^24 || >=26`; check `node --version`. Do not claim a working build on other versions. The pinned scaffold lives in `.agents/engines/web/scaffold/` and `docs/engine-reference/web/VERSION.md`.

Choose exactly one starter (respect a library already requested; otherwise ask):

- `none`: HTML Canvas 2D + Web Audio (smallest default)
- `phaser`: 2D game scenes, sprite animation and input
- `pixi`: 2D renderer, effects and custom gameplay systems
- `three`: WebGL/3D

The starter package, TypeScript, Vite, Vitest, Playwright and their exact lockfiles are pinned by this repository. Do not independently update versions during setup.

From the project root, show the dry run first:

```bash
bash .agents/scripts/web-scaffold.sh --dry-run --starter phaser --title "My Game"
```

After file-write approval, run the same command without `--dry-run` and with `--gitignore`. It refuses a project with `package.json` and does not overwrite existing files. The scaffold writes `src/main.ts`, `index.html`, `package.json`, a committed lockfile, tests and configs. For an existing web project use step 2 instead.

## 4. Record configuration

Write project-specific values to `project.yaml` (without replacing unrelated keys):

```yaml
engine:
  name: "Web"
  version: "8.3.4" # Vite version pinned in scaffold/package.json
  language: "TypeScript"
  rendering: "Phaser 4" # none: Canvas 2D; pixi: PixiJS 8; three: three.js (WebGL)
  physics: "none"
specialists:
  code: "lead-programmer"
  shader: "lead-programmer"
  ui: "ui-programmer"
  additional: []
commands:
  run: "npm run dev"
  build: "npm run build"
  test: "npm test"
  smoke: "npm run smoke"
```

Treat these as template examples, not values to write for an existing project. Version, renderer and commands must match what was actually selected. No `web-specialist` native agent is defined: the primary reviewer is `lead-programmer` and UI work uses `ui-programmer`. Code root `src/`, tests `tests/`; use the existing naming conventions of a project, or TypeScript defaults (PascalCase types, camelCase functions/variables, kebab-case files).

## 5. Build, test and verify

Request approval before the networked `npm ci` step (package installation may execute scripts), then:

```bash
npm ci
npm run build
bash .agents/scripts/test-run.sh web --root .
npm run smoke
```

`npm test` invokes Vitest and Playwright; `npm run smoke` exercises the browser `@boot` test. The browser tests need an installed Chromium/Chrome or explicitly approved `npx playwright install chromium-headless-shell`. If unavailable, record NOT ASSESSED, not PASS. Inspect a real screenshot and console output for any player-visible change. A green TypeScript/build check alone is not proof that the game is playable.

For existing games honor their package manager, scripts, and lockfile. `npm ci` is only valid with the npm scaffold's lockfile, and this guide does not authorize package installation automatically. The page's optional `window.game` debug/test hook supports deterministic scripted runs in the starter; libraries with their own loops require verification of the actual replay behavior.

## 6. Test-setup and scope

For a fresh Web scaffold, Vitest and Playwright configuration plus sample tests are already provided. `$test-setup` must inspect and preserve them rather than calling the native-only `test-scaffold.sh`. Existing Web games keep their test runners unless an authorized, reviewed migration is explicitly requested. Browser screenshot tooling and human playtest cannot be inferred from a successful build.

## 7. Summary / handoff

Report engine, language, starter, package versions, commands, exact created files, actual build/test exit codes, whether a browser screenshot was inspected, missing prerequisites and next step. For any unrun check write NOT ASSESSED explicitly. Never state that `$setup-engine web` ran successfully when it was only documented or scaffolded.
