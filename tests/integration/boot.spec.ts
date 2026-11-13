import { expect, test, type Page, type Browser } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Same HTTP origin in managed Chromium and CI; webServer owns startup.
const build = (query: string): string => `http://127.0.0.1:4173/index.html?${query}`;
const placements = JSON.parse(readFileSync(new URL('../../design/assets/production/pixel-watering-placements.json', import.meta.url), 'utf8')) as {
  sprite_count: number;
  assets: Array<{ file: string; scene_x: number; scene_y: number; width: number; height: number }>;
};
const expectedSpriteOrder = [
  'env_garden_background_base_scene.png',
  'env_clouds_cream_base_wide.png',
  'env_table_wood_base_wide.png',
  'prop_pot_terracotta_back_base_medium.png',
  'plant_leafy_green_base_medium.png',
  'vfx_water_stream_pour_small.png',
  'vfx_water_splash_impact_small.png',
  'prop_pot_terracotta_front_base_medium.png',
  'prop_watering_can_tilt_base_medium.png',
  'char_hand_grip_base_small.png',
];

type RuntimeVisual = {
  file: string;
  textureLoaded: boolean;
  depth: number;
  x: number;
  y: number;
  bounds: { x: number; y: number; width: number; height: number };
};

/** Opens real Phaser build and retains all runtime/console errors for assertions. */
async function open(page: Page, query = 'manual=1'): Promise<string[]> {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(build(query));
  await expect.poll(() => page.evaluate(() => typeof window.game?.step)).toBe('function');
  return errors;
}

async function firstReward(browser: Browser, entropy: number, seed?: number): Promise<string> {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await page.addInitScript(value => {
      Object.defineProperty(crypto, 'getRandomValues', { value: (array: Uint32Array) => { array.fill(value); return array; } });
      localStorage.setItem('pixel-watering-game:v1', JSON.stringify({ version: 1, tokens: 3, unlocked: [] }));
    }, entropy);
    const errors = await open(page, `manual=1${seed === undefined ? '' : `&seed=${seed}`}`);
    await page.getByRole('button', { name: 'Gacha', exact: false }).click();
    const unlocked = await page.evaluate(() => (window.game!.state as { unlocked: string[] }).unlocked);
    expect(errors).toEqual([]);
    return unlocked[0];
  } finally { await context.close(); }
}

test('ordinary sessions use fresh startup entropy for first gacha reward', async ({ browser }) => {
  expect(await firstReward(browser, 1)).toBe('ribbon');
  expect(await firstReward(browser, 7)).toBe('fern');
});

for (const seed of [0, 7]) {
  test(`explicit seed ${seed} repeats rewards despite changed startup entropy`, async ({ browser }) => {
    const expected = seed === 0 ? 'daisy' : 'fern';
    expect(await firstReward(browser, 1, seed)).toBe(expected);
    expect(await firstReward(browser, 7, seed)).toBe(expected);
  });
}

test('boots a portrait garden without console errors @boot', async ({ page }) => {
  const errors = await open(page);
  expect(await page.evaluate(() => window.game!.scene)).toBe('play');
  const size = await page.locator('#game').boundingBox();
  expect(size!.width / size!.height).toBeCloseTo(9 / 16, 3);
  await expect(page.getByRole('button', { name: 'Tưới cây', exact: true })).toBeVisible();
  await expect(page.getByRole('progressbar')).toHaveAttribute('value', '0');
  expect(errors).toEqual([]);
});

test('loads every approved sprite in the specified order and placement bounds', async ({ page }) => {
  const errors = await open(page);
  const canvas = await page.locator('canvas').evaluate(node => ({ width: node.width, height: node.height }));
  const visuals = await page.evaluate(() => (window.game!.visuals ?? []) as RuntimeVisual[]);

  expect(canvas).toEqual({ width: 180, height: 320 });
  expect(placements.sprite_count).toBe(10);
  expect(visuals).toHaveLength(placements.sprite_count);
  expect(visuals.map(visual => visual.file)).toEqual(expectedSpriteOrder);

  for (const [depth, visual] of visuals.entries()) {
    const placement = placements.assets.find(asset => asset.file === visual.file);
    expect(placement).toBeDefined();
    expect(visual.textureLoaded).toBe(true);
    expect(visual.depth).toBe(depth);
    expect(Number.isInteger(visual.x)).toBe(true);
    expect(Number.isInteger(visual.y)).toBe(true);
    expect(visual.bounds.x).toBeCloseTo(placement!.scene_x, 10);
    expect(visual.bounds.y).toBe(placement!.scene_y);
    expect(visual.bounds.width).toBe(placement!.width);
    expect(visual.bounds.height).toBe(placement!.height);
  }
  expect(errors).toEqual([]);
});

test('watering button starts response, advances progress, and idle never loses growth', async ({ page }) => {
  const errors = await open(page);
  await page.getByRole('button', { name: 'Tưới cây', exact: true }).click();
  const active = await page.evaluate(() => {
    window.game!.step();
    return window.game!.state as { growth: number; watering: number; response: number };
  });
  expect(active.growth).toBe(20);
  expect(active.watering).toBeGreaterThan(0);
  expect(active.response).toBeGreaterThan(0);
  await expect(page.getByRole('progressbar')).toHaveAttribute('value', '20');
  await page.evaluate(() => window.game!.step(600));
  expect(await page.evaluate(() => window.game!.state)).toMatchObject({ growth: 20, watering: 0, response: 0 });
  expect(errors).toEqual([]);
});

test('Space waters, pause blocks watering, and resume keeps progress', async ({ page }) => {
  const errors = await open(page);
  await page.keyboard.press('Space');
  await page.evaluate(() => window.game!.step());
  await page.keyboard.press('KeyP');
  await page.evaluate(() => window.game!.step());
  await expect(page.getByRole('button', { name: 'Tưới cây', exact: true })).toBeDisabled();
  await page.keyboard.press('Space');
  await page.evaluate(() => window.game!.step(60));
  expect(await page.evaluate(() => window.game!.state)).toMatchObject({ growth: 20 });
  await page.keyboard.press('KeyP');
  await page.evaluate(() => window.game!.step());
  expect(await page.evaluate(() => window.game!.scene)).toBe('play');
  expect(errors).toEqual([]);
});

test('five watering actions grant tokens once and start a new cycle', async ({ page }) => {
  const errors = await open(page);
  for (let i = 0; i < 5; i++) {
    await page.getByRole('button', { name: 'Tưới cây', exact: true }).click();
    await page.evaluate(() => window.game!.step(60));
  }
  expect(await page.evaluate(() => window.game!.state)).toMatchObject({ growth: 0, tokens: 3, cycles: 1 });
  await expect(page.locator('#tokens')).toContainText('3');
  await expect(page.locator('#cycle-reward')).toContainText('+3 token');
  await page.evaluate(() => window.game!.step(600));
  expect(await page.evaluate(() => window.game!.state)).toMatchObject({ growth: 0, tokens: 3, cycles: 1 });
  expect(errors).toEqual([]);
});

test('gacha spends earned tokens, opens reward popup, and blocks hidden repeat rolls', async ({ page }) => {
  const errors = await open(page, 'manual=1&seed=7');
  await page.getByRole('button', { name: 'Gacha', exact: false }).click();
  expect(await page.evaluate(() => window.game!.state)).toMatchObject({ tokens: 0, unlocked: [] });
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('#gacha-status')).toContainText('Chưa đủ token');
  for (let i = 0; i < 10; i++) {
    await page.getByRole('button', { name: 'Tưới cây', exact: true }).click();
    await page.evaluate(() => window.game!.step(60));
  }
  await page.getByRole('button', { name: 'Gacha', exact: false }).focus();
  await page.keyboard.press('Space');
  await page.evaluate(() => window.game!.step());
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#reward-name')).not.toBeEmpty();
  const state = await page.evaluate(() => window.game!.state as { tokens: number; growth: number; unlocked: string[] });
  expect(state.tokens).toBe(3);
  expect(state.growth).toBe(0);
  expect(state.unlocked).toHaveLength(1);
  // Even a dispatched background click cannot spend remaining tokens while modal is open.
  await page.evaluate(() => document.querySelector<HTMLButtonElement>('#gacha')!.click());
  expect(await page.evaluate(() => window.game!.state)).toMatchObject({ tokens: 3, growth: 0, unlocked: state.unlocked });
  // Native Space activates focused Close button; it must never also water the garden.
  await page.keyboard.press('Space');
  await page.evaluate(() => window.game!.step(60));
  expect(await page.evaluate(() => window.game!.state)).toMatchObject({ tokens: 3, growth: 0, unlocked: state.unlocked });
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.getByRole('button', { name: 'Gacha', exact: false }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(await page.evaluate(() => (window.game!.state as { tokens: number }).tokens)).toBe(0);
  await page.getByRole('button', { name: 'Đóng', exact: true }).click();
  expect(errors).toEqual([]);
});

test('earned balance and reward collection restore after real page reload', async ({ page }) => {
  const errors = await open(page, 'manual=1&seed=7');
  for (let i = 0; i < 10; i++) {
    await page.getByRole('button', { name: 'Tưới cây', exact: true }).click();
    await page.evaluate(() => window.game!.step(60));
  }
  await page.getByRole('button', { name: 'Gacha', exact: false }).click();
  const name = await page.locator('#reward-name').textContent();
  await page.getByRole('button', { name: 'Đóng', exact: true }).click();
  await page.getByRole('button', { name: 'Bộ sưu tập', exact: true }).click();
  await expect(page.locator('#collection-list')).toContainText(name!);
  const before = await page.evaluate(() => window.game!.state as { tokens: number; unlocked: string[] });
  expect(before.tokens).toBe(3);
  await page.reload();
  await expect.poll(() => page.evaluate(() => typeof window.game?.step)).toBe('function');
  expect(await page.evaluate(() => window.game!.state)).toMatchObject({ tokens: before.tokens, unlocked: before.unlocked });
  await page.getByRole('button', { name: 'Bộ sưu tập', exact: true }).click();
  await expect(page.locator('#collection-list')).toContainText(name!);
  expect(errors).toEqual([]);
});

test('collection shows saved plant and item names without account or cloud', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('pixel-watering-game:v1', JSON.stringify({ version: 1, tokens: 6, unlocked: ['fern', 'ribbon'] })));
  const errors = await open(page);
  await page.getByRole('button', { name: 'Bộ sưu tập', exact: true }).click();
  await expect(page.locator('#collection-list')).toContainText('Dương xỉ');
  await expect(page.locator('#collection-list')).toContainText('Nơ nhỏ');
  await expect(page.locator('#collection-list')).toContainText('Cây');
  await expect(page.locator('#collection-list')).toContainText('Vật phẩm');
  expect(errors).toEqual([]);
});

test('corrupt save starts safe session and warns without console errors', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('pixel-watering-game:v1', '{broken'));
  const errors = await open(page);
  expect(await page.evaluate(() => window.game!.state)).toMatchObject({ tokens: 0, unlocked: [] });
  await expect(page.locator('#save-status')).toContainText('không hợp lệ');
  expect(errors).toEqual([]);
});

test('blocked storage reads keep watering playable with truthful warning', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('blocked', 'SecurityError'); } }));
  const errors = await open(page);
  await expect(page.locator('#save-status')).toContainText('Không thể');
  await page.getByRole('button', { name: 'Tưới cây', exact: true }).click();
  await page.evaluate(() => window.game!.step());
  expect(await page.evaluate(() => window.game!.state)).toMatchObject({ growth: 20 });
  expect(errors).toEqual([]);
});

test('blocked storage writes keep earned tokens in session and report unsaved progress', async ({ page }) => {
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException('quota', 'QuotaExceededError'); }; });
  const errors = await open(page);
  for (let i = 0; i < 5; i++) {
    await page.getByRole('button', { name: 'Tưới cây', exact: true }).click();
    await page.evaluate(() => window.game!.step(60));
  }
  expect(await page.evaluate(() => window.game!.state)).toMatchObject({ tokens: 3 });
  await expect(page.locator('#save-status')).toContainText('chỉ còn trong phiên');
  expect(errors).toEqual([]);
});

test.describe('phone touch', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });
  test('touch waters in 9:16 view without horizontal overflow', async ({ page }) => {
    const errors = await open(page);
    await page.getByRole('button', { name: 'Tưới cây', exact: true }).tap();
    await page.evaluate(() => window.game!.step());
    expect(await page.evaluate(() => window.game!.state)).toMatchObject({ growth: 20 });
    const size = await page.locator('#game').boundingBox();
    expect(size!.width / size!.height).toBeCloseTo(9 / 16, 3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });

  test('real mobile loop renders watering and keeps progress after touch', async ({ page }, testInfo) => {
    const errors = await open(page, 'seed=7');
    await page.getByRole('button', { name: 'Tưới cây', exact: true }).tap();
    await expect.poll(() => page.evaluate(() => (window.game!.state as { growth: number }).growth)).toBe(20);
    await page.screenshot({ path: testInfo.outputPath('mobile-watering.png') });
    await expect.poll(() => page.evaluate(() => (window.game!.state as { watering: number }).watering)).toBe(0);
    expect(await page.evaluate(() => window.game!.state)).toMatchObject({ growth: 20 });
    await page.screenshot({ path: testInfo.outputPath('mobile-garden.png') });
    expect(errors).toEqual([]);
  });
});

async function injectOfflineAudio(page: Page): Promise<void> {
  await page.addInitScript(() => { window.GAME_AUDIO = new OfflineAudioContext(1, 44100, 44100) as unknown as AudioContext; });
}

async function waveform(page: Page): Promise<{ rms: number; peak: number; tail: number; finite: boolean }> {
  return page.evaluate(async () => {
    const buffer = await (window.GAME_AUDIO as unknown as OfflineAudioContext).startRendering();
    const data = buffer.getChannelData(0);
    let energy = 0, peak = 0, tail = 0;
    for (let i = 0; i < data.length; i++) {
      energy += data[i] ** 2;
      peak = Math.max(peak, Math.abs(data[i]));
      if (i > 0.36 * buffer.sampleRate) tail += data[i] ** 2;
    }
    return { rms: Math.sqrt(energy / data.length), peak, tail, finite: data.every(Number.isFinite) };
  });
}

test('watering produces gentle real Web Audio waveform', async ({ page }) => {
  await injectOfflineAudio(page);
  const errors = await open(page);
  await page.getByRole('button', { name: 'Tưới cây', exact: true }).click();
  await page.evaluate(() => window.game!.step());
  const sound = await waveform(page);
  expect(sound.rms).toBeGreaterThan(0.001);
  expect(sound.peak).toBeLessThan(0.3);
  expect(sound.finite).toBe(true);
  expect(errors).toEqual([]);
});

test('cycle completion adds audible reward notes beyond water duration', async ({ page }) => {
  await injectOfflineAudio(page);
  const errors = await open(page);
  for (let i = 0; i < 5; i++) {
    await page.getByRole('button', { name: 'Tưới cây', exact: true }).click();
    await page.evaluate(() => window.game!.step(60));
  }
  // After water stops at 0.35s, only decaying reward notes remain; silence is zero.
  expect((await waveform(page)).tail).toBeGreaterThan(0.000001);
  expect(errors).toEqual([]);
});

test('gacha reward produces real sound without a watering action', async ({ page }) => {
  await injectOfflineAudio(page);
  await page.addInitScript(() => localStorage.setItem('pixel-watering-game:v1', JSON.stringify({ version: 1, tokens: 3, unlocked: [] })));
  const errors = await open(page);
  await page.getByRole('button', { name: 'Gacha', exact: false }).click();
  expect((await waveform(page)).rms).toBeGreaterThan(0.001);
  expect(errors).toEqual([]);
});

test('M mute keeps actual audio silent while watering stays playable', async ({ page }) => {
  await injectOfflineAudio(page);
  const errors = await open(page);
  await page.keyboard.press('KeyM');
  await page.evaluate(() => window.game!.step());
  await page.getByRole('button', { name: 'Tưới cây', exact: true }).click();
  await page.evaluate(() => window.game!.step());
  expect((await waveform(page)).rms).toBe(0);
  expect(await page.evaluate(() => window.game!.state)).toMatchObject({ growth: 20 });
  expect(errors).toEqual([]);
});

test('garden stays silent before first player gesture', async ({ page }) => {
  await injectOfflineAudio(page);
  const errors = await open(page);
  expect((await waveform(page)).rms).toBe(0);
  expect(errors).toEqual([]);
});

test('real desktop garden renders portrait composition with no console errors', async ({ page }, testInfo) => {
  const errors = await open(page, 'seed=7');
  await page.getByRole('button', { name: 'Tưới cây', exact: true }).click();
  await expect.poll(() => page.evaluate(() => (window.game!.state as { growth: number }).growth)).toBe(20);
  await page.screenshot({ path: testInfo.outputPath('desktop-garden.png') });
  const box = await page.locator('#game').boundingBox();
  expect(box!.width / box!.height).toBeCloseTo(9 / 16, 3);
  expect(errors).toEqual([]);
});
