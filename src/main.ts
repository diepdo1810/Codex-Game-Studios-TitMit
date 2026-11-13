import * as Phaser from 'phaser';
import config from '../data/config.json';
import placements from '../design/assets/production/pixel-watering-placements.json';
import backgroundUrl from '../assets/images/pixel-watering/env_garden_background_base_scene.png?url';
import cloudsUrl from '../assets/images/pixel-watering/env_clouds_cream_base_wide.png?url';
import tableUrl from '../assets/images/pixel-watering/env_table_wood_base_wide.png?url';
import plantUrl from '../assets/images/pixel-watering/plant_leafy_green_base_medium.png?url';
import potBackUrl from '../assets/images/pixel-watering/prop_pot_terracotta_back_base_medium.png?url';
import potFrontUrl from '../assets/images/pixel-watering/prop_pot_terracotta_front_base_medium.png?url';
import wateringCanUrl from '../assets/images/pixel-watering/prop_watering_can_tilt_base_medium.png?url';
import handUrl from '../assets/images/pixel-watering/char_hand_grip_base_small.png?url';
import waterStreamUrl from '../assets/images/pixel-watering/vfx_water_stream_pour_small.png?url';
import waterSplashUrl from '../assets/images/pixel-watering/vfx_water_splash_impact_small.png?url';
import { FIELD, STEP, makeRng, newState, update, roll, type Tuning, type Reward } from './game/rules';
import { audioContext, clock, install, manual, params, seedFrom } from './hook';
import { readSave, writeSave, type StoragePort } from './game/save';
import { createSoundscape, type Soundscape } from './game/audio';

const spriteUrls = {
  'env_garden_background_base_scene.png': backgroundUrl,
  'env_clouds_cream_base_wide.png': cloudsUrl,
  'env_table_wood_base_wide.png': tableUrl,
  'plant_leafy_green_base_medium.png': plantUrl,
  'prop_pot_terracotta_back_base_medium.png': potBackUrl,
  'prop_pot_terracotta_front_base_medium.png': potFrontUrl,
  'prop_watering_can_tilt_base_medium.png': wateringCanUrl,
  'char_hand_grip_base_small.png': handUrl,
  'vfx_water_stream_pour_small.png': waterStreamUrl,
  'vfx_water_splash_impact_small.png': waterSplashUrl,
} as const;

type SpriteFile = keyof typeof spriteUrls;
const approvedLayerOrder: readonly SpriteFile[] = [
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

function spriteFile(file: string): SpriteFile {
  if (!(file in spriteUrls)) throw new Error(`No URL registered for approved sprite: ${file}`);
  return file as SpriteFile;
}

function textureKey(file: SpriteFile): string {
  return `pixel-watering:${file}`;
}

const tuning: Tuning = {
  growthPerWater: config.growthPerWater.value,
  wateringDuration: config.wateringDuration.value,
  cycleReward: config.cycleReward.value,
};
const growth = document.querySelector<HTMLProgressElement>('#growth')!;
const growthValue = document.querySelector<HTMLElement>('#growth-value')!;
const waterButton = document.querySelector<HTMLButtonElement>('#water')!;
const gachaButton = document.querySelector<HTMLButtonElement>('#gacha')!;
const rewardDialog = document.querySelector<HTMLDialogElement>('#reward')!;
const gachaStatus = document.querySelector<HTMLElement>('#gacha-status')!;
const rewardName = document.querySelector<HTMLElement>('#reward-name')!;
const rewardKind = document.querySelector<HTMLElement>('#reward-kind')!;
const collectionButton = document.querySelector<HTMLButtonElement>('#collection-open')!;
const collectionDialog = document.querySelector<HTMLDialogElement>('#collection')!;
const collectionList = document.querySelector<HTMLElement>('#collection-list')!;
const saveStatus = document.querySelector<HTMLElement>('#save-status')!;
const gacha = { gachaCost: config.gachaCost.value, rewards: config.rewards as Reward[] };
const random = makeRng(seedFrom(crypto.getRandomValues(new Uint32Array(1))[0]));
gachaButton.textContent = `Gacha · ${gacha.gachaCost} token`;
const tokens = document.createElement('p');
tokens.id = 'tokens';
tokens.style.cssText = 'font-size:12px;margin:8px 0 3px';
const cycleReward = document.createElement('small');
cycleReward.id = 'cycle-reward';
cycleReward.style.fontSize = '10px';
document.querySelector('.hud')!.append(tokens, cycleReward);
const hit = new Set<string>(), down = new Set<string>();
let state = newState(), scene = params.get('scene') === 'pause' ? 'pause' : 'play';
const storage = localStoragePort();
const loaded = readSave(storage, gacha.rewards.map(reward => reward.id));
if (loaded.data) Object.assign(state, loaded.data);
saveStatus.textContent = loaded.warning ?? 'Lưu trên thiết bị này · Không cần tài khoản';
let waterRequested = false;
let audio: { ac: AudioContext; sounds: Soundscape } | null = null;
let muted = false;

function localStoragePort(): StoragePort | null {
  try { return window.localStorage; } catch { return null; }
}

function persist(): void {
  saveStatus.textContent = writeSave(storage, state) ?? 'Đã lưu trên thiết bị này';
}

function modalOpen(): boolean { return rewardDialog.open || collectionDialog.open; }

function showCollection(): void {
  if (scene !== 'play' || modalOpen()) return;
  collectionList.replaceChildren();
  for (const reward of gacha.rewards.filter(entry => state.unlocked.includes(entry.id))) {
    const item = document.createElement('li');
    item.textContent = `${reward.name} · ${reward.kind === 'plant' ? 'Cây' : 'Vật phẩm'}`;
    collectionList.append(item);
  }
  if (state.unlocked.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'Chưa có món nào. Tưới cây rồi quay gacha nhé.';
    collectionList.append(empty);
  }
  collectionDialog.showModal();
  waterRequested = false;
  hit.clear();
}

/** Unlocks browser audio only from a player gesture. */
function startAudio(): void {
  if (!audio) {
    const ac = audioContext();
    const sounds = createSoundscape(ac, { ...config.audio, volume: config.volume.value });
    sounds.mute(muted);
    audio = { ac, sounds };
  }
  // OfflineAudioContext is a supported injected context and must not resume before rendering.
  if (audio.ac.state === 'suspended' && !('startRendering' in audio.ac)) void audio.ac.resume().catch(() => {});
}

waterButton.addEventListener('click', () => { if (!modalOpen()) { startAudio(); waterRequested = true; } });
collectionButton.addEventListener('click', showCollection);
document.querySelector('#close-collection')!.addEventListener('click', () => collectionDialog.close());
gachaButton.addEventListener('click', () => {
  if (scene !== 'play' || modalOpen()) return;
  startAudio();
  const reward = roll(state, gacha, random);
  if (!reward) { gachaStatus.textContent = `Chưa đủ token. Cần ${gacha.gachaCost} token.`; return; }
  persist();
  if (!muted) audio?.sounds.reward();
  gachaStatus.textContent = '';
  rewardName.textContent = reward.name;
  rewardKind.textContent = reward.kind === 'plant' ? 'Cây mới trong bộ sưu tập' : 'Vật phẩm trong bộ sưu tập';
  rewardDialog.showModal();
  waterRequested = false;
  hit.clear();
});
document.querySelector('#close-reward')!.addEventListener('click', () => rewardDialog.close());
addEventListener('keydown', e => {
  if (modalOpen() || (e.code === 'Space' && e.target instanceof HTMLButtonElement)) return;
  if (e.code === 'Space') e.preventDefault();
  if (e.repeat) return;
  startAudio();
  hit.add(e.code);
  down.add(e.code);
});
addEventListener('keyup', e => down.delete(e.code));
addEventListener('blur', () => { down.clear(); hit.clear(); waterRequested = false; });

function step(): void {
  if (hit.has('KeyM')) {
    muted = !muted;
    audio?.sounds.mute(muted);
  }
  if (hit.has('KeyP') || hit.has('Escape')) scene = scene === 'play' ? 'pause' : 'play';
  const previousTokens = state.tokens;
  const previousTime = state.watering;
  if (scene === 'play') update(state, { water: !modalOpen() && (waterRequested || hit.has('Space')) }, tuning, STEP);
  if (!muted && state.watering > previousTime) audio?.sounds.water();
  if (state.tokens !== previousTokens) {
    persist();
    if (!muted) audio?.sounds.reward();
  }
  waterRequested = false;
  hit.clear();
}

/** Phaser presentation; all growth decisions remain in plain game rules. */
class Garden extends Phaser.Scene {
  private readonly sprites = new Map<SpriteFile, Phaser.GameObjects.Image>();
  private plant!: Phaser.GameObjects.Image;
  private can!: Phaser.GameObjects.Image;
  private stream!: Phaser.GameObjects.Image;
  private splash!: Phaser.GameObjects.Image;
  private paused!: Phaser.GameObjects.Text;
  private acc = 0;
  /** Creates one garden presentation scene. */
  constructor() { super('garden'); }

  /** Queues the approved static scene layers before Phaser creates the garden. */
  preload(): void {
    for (const asset of placements.assets) {
      const file = spriteFile(asset.file);
      this.load.image(textureKey(file), spriteUrls[file]);
    }
  }

  /** Builds stable game objects once, then installs deterministic test controls. */
  create(): void {
    garden = this;
    const manifestLayerOrder = [
      spriteFile('env_garden_background_base_scene.png'),
      ...placements.layers.map(spriteFile),
    ];
    if (
      manifestLayerOrder.length !== approvedLayerOrder.length
      || manifestLayerOrder.some((file, index) => file !== approvedLayerOrder[index])
    ) {
      throw new Error('Approved placement layer order does not match the static scene contract');
    }

    for (const [layer, file] of approvedLayerOrder.entries()) {
      const asset = placements.assets.find(entry => entry.file === file);
      if (!asset) throw new Error(`Approved placement missing for: ${file}`);
      const key = textureKey(file);
      if (!this.textures.exists(key)) throw new Error(`Approved texture did not load: ${file}`);
      this.sprites.set(
        file,
        this.add.image(asset.scene_x, asset.scene_y, key).setOrigin(0).setDepth(layer),
      );
    }

    // These pivots preserve the approved idle bounds while keeping the existing
    // watering response attached to the plant base and the watering-can handle.
    this.plant = this.sprite('plant_leafy_green_base_medium.png')
      .setOrigin(56 / 111, 1)
      .setPosition(89, 228);
    this.can = this.sprite('prop_watering_can_tilt_base_medium.png')
      .setOrigin(44 / 59, 16 / 51)
      .setPosition(157, 183);
    this.stream = this.sprite('vfx_water_stream_pour_small.png').setVisible(false);
    this.splash = this.sprite('vfx_water_splash_impact_small.png').setVisible(false);
    this.paused = this.add.text(90, 154, 'TẠM DỪNG', {
      fontFamily: 'monospace', fontSize: '13px', color: '#fff4cb', backgroundColor: '#29443b',
      padding: { x: 8, y: 6 },
    }).setOrigin(0.5).setDepth(20);
    this.draw();
    if (manual) this.game.loop.sleep();
    install(hook);
  }

  private sprite(file: SpriteFile): Phaser.GameObjects.Image {
    const image = this.sprites.get(file);
    if (!image) throw new Error(`Approved image missing from scene: ${file}`);
    return image;
  }

  /** Returns immutable scene-layer facts through the existing test hook only. */
  runtimeVisuals(): ReadonlyArray<{
    file: SpriteFile;
    textureLoaded: boolean;
    depth: number;
    visible: boolean;
    x: number;
    y: number;
    originX: number;
    originY: number;
    bounds: { x: number; y: number; width: number; height: number };
  }> {
    return approvedLayerOrder.map(file => {
      const image = this.sprite(file);
      const bounds = image.getBounds();
      return {
        file,
        textureLoaded: this.textures.exists(textureKey(file)),
        depth: image.depth,
        visible: image.visible,
        x: image.x,
        y: image.y,
        originX: image.originX,
        originY: image.originY,
        bounds: { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height },
      };
    });
  }

  /** Advances fixed simulation steps with no elapsed-time catch-up after a stall. */
  update(_time: number, delta: number): void {
    lastFrame = clock.now();
    if (manual) { if (stepping) step(); }
    else {
      this.acc += Math.min(delta / 1000, 0.25);
      while (this.acc >= STEP) { step(); this.acc -= STEP; }
    }
    this.draw();
  }

  private draw(): void {
    const active = state.watering > 0;
    this.can.setRotation(active ? -0.4 : 0);
    this.plant.setRotation(state.response > 0 ? Math.sin(state.t * 22) * 0.07 : 0);
    this.plant.setScale(1 + (state.response > 0 ? Math.sin(state.t * 18) * 0.035 : 0));
    this.stream.setVisible(active);
    this.splash.setVisible(active);
    growth.value = state.growth;
    growthValue.textContent = `${state.growth}%`;
    tokens.textContent = `Token: ${state.tokens}`;
    cycleReward.textContent = state.cycles ? `${state.cycles} chu kỳ · +${tuning.cycleReward} token` : 'Tưới đủ một chu kỳ để nhận token';
    waterButton.disabled = scene === 'pause';
    gachaButton.disabled = scene === 'pause';
    collectionButton.disabled = scene === 'pause';
    this.paused.setVisible(scene === 'pause');
  }
}

function hasWebGL(): boolean {
  const canvas = document.createElement('canvas');
  return !!(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
}

let phaserTime = 0, lastFrame = clock.now(), stepping = false;
let garden: Garden | undefined;
const game = new Phaser.Game({
  type: hasWebGL() ? Phaser.WEBGL : Phaser.CANVAS,
  canvas: document.querySelector<HTMLCanvasElement>('#game')!,
  parent: 'garden', width: FIELD.w, height: FIELD.h, backgroundColor: '#b5e1e6',
  pixelArt: true,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  input: { keyboard: false }, audio: { noAudio: true }, banner: false, scene: [Garden],
});

const hook = {
  get scene() { return scene; },
  get state() { return state; },
  get visuals() { return garden?.runtimeVisuals() ?? []; },
  press(code: string) { hit.add(code); },
  hold(code: string, on: boolean) { if (on) down.add(code); else down.delete(code); },
  step(n = 1) {
    stepping = true;
    try {
      for (let i = 0; i < n; i++) {
        phaserTime += STEP * 1000;
        game.step(phaserTime, STEP * 1000);
      }
    } finally { stepping = false; }
  },
};

if (!manual) setInterval(() => {
  const now = clock.now();
  if (game.isBooted && document.visibilityState === 'visible' && now - lastFrame > 0.1) {
    game.step(now * 1000, Math.min(now - lastFrame, 0.25) * 1000);
  }
}, 50);
