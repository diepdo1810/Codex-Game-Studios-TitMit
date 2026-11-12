// Playwright runs tests/integration/ against dist-single through local HTTP.
// Managed Chromium blocks file URLs; npm run test:e2e builds before preview starts.
import { defineConfig } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

// The browser every check uses is the one .agents/scripts/page-shot.sh finds:
// PAGE_SHOT_BROWSER, then Chrome, Edge or Chromium, then a headless shell.
// Without the script, PAGE_SHOT_BROWSER as it is; with neither, Playwright's
// own browser (npx playwright install chromium-headless-shell).
function checkBrowser(): string | undefined {
  const script = '.agents/scripts/page-shot.sh';
  if (!existsSync(script)) return process.env.PAGE_SHOT_BROWSER || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
  const r = spawnSync(bash(), [script, '--which'], { encoding: 'utf8' });
  return r.status === 0 && r.stdout.trim() ? r.stdout.trim() : undefined;
}

// Git's bash on Windows: the first bash on the PATH there can be WSL's.
function bash(): string {
  if (process.platform !== 'win32') return 'bash';
  const found = [
    process.env.CGS_BASH,
    join(process.env.ProgramFiles ?? 'C:\\Program Files', 'Git', 'bin', 'bash.exe'),
    join(process.env['ProgramFiles(x86)'] ?? 'C:\\Program Files (x86)', 'Git', 'bin', 'bash.exe'),
    join(process.env.LOCALAPPDATA ?? '', 'Programs', 'Git', 'bin', 'bash.exe'),
  ].find(p => p && existsSync(p));
  return found ?? 'bash';
}

export default defineConfig({
  webServer: {
    command: 'npm exec vite -- preview --outDir dist-single --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
  },
  testDir: 'tests/integration',
  forbidOnly: !!process.env.CI,
  use: {
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      executablePath: checkBrowser(),
      // WebGL in software (SwiftShader), the same flags page-shot.sh --software
      // passes, so a check draws the same with a GPU or none. For checks only.
      args: ['--use-gl=angle', '--use-angle=swiftshader-webgl', '--enable-unsafe-swiftshader'],
    },
  },
});
