import * as Phaser from 'phaser';
import config from '../data/config.json';
import { FIELD, STEP, makeRng, newState, update, roll, type Tuning, type Reward } from './game/rules';
import { audioContext, clock, install, manual, params, seedFrom } from './hook';
import { readSave, writeSave, type StoragePort } from './game/save';
import { createSoundscape, type Soundscape } from './game/audio';

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
  private art!: Phaser.GameObjects.Graphics;
  private plant!: Phaser.GameObjects.Container;
  private can!: Phaser.GameObjects.Container;
  private stream!: Phaser.GameObjects.Graphics;
  private paused!: Phaser.GameObjects.Text;
  private acc = 0;
  /** Creates one garden presentation scene. */
  constructor() { super('garden'); }

  /** Builds stable game objects once, then installs deterministic test controls. */
  create(): void {
    this.art = this.add.graphics();
    this.drawBackground();
    this.plant = this.add.container(90, 209);
    this.drawPlant();
    this.can = this.add.container(144, 216);
    this.drawCan();
    this.stream = this.add.graphics();
    this.paused = this.add.text(90, 154, 'TẠM DỪNG', {
      fontFamily: 'monospace', fontSize: '13px', color: '#fff4cb', backgroundColor: '#29443b',
      padding: { x: 8, y: 6 },
    }).setOrigin(0.5).setDepth(10);
    this.draw();
    if (manual) this.game.loop.sleep();
    install(hook);
  }

  private drawBackground(): void {
    const g = this.art;
    g.fillStyle(0xb5e1e6).fillRect(0, 0, FIELD.w, FIELD.h);
    g.fillStyle(0xbce5e7).fillRect(0, 0, 180, 90);
    g.fillStyle(0xc9e6dc).fillRect(0, 188, 180, 44);
    g.fillStyle(0xf5e6ae).fillRect(143, 89, 18, 18).fillRect(147, 85, 10, 26);
    g.fillStyle(0xa3ced1).fillRect(10, 109, 44, 3).fillRect(120, 127, 48, 3);
    g.fillStyle(0xeaf2db).fillRect(12, 102, 40, 8).fillRect(20, 96, 24, 8);
    g.fillRect(122, 120, 44, 8).fillRect(130, 114, 24, 8);
    g.fillStyle(0xf7f5df).fillRect(23, 97, 18, 3).fillRect(134, 115, 17, 3);
    g.fillStyle(0x9abb80).fillRect(0, 225, 28, 14).fillRect(21, 217, 21, 22).fillRect(148, 219, 32, 20);
    g.fillStyle(0x73956b).fillRect(0, 232, 180, 88);
    g.fillStyle(0x37564b).fillRect(0, 258, 180, 62);
    g.fillStyle(0x79563e).fillRect(0, 240, 180, 17);
    g.fillStyle(0xb18057).fillRect(0, 239, 180, 5);
    g.fillStyle(0x513f34).fillRect(0, 255, 180, 3);
    g.fillStyle(0x8e6345).fillRect(8, 246, 30, 2).fillRect(118, 250, 42, 2);
    g.fillStyle(0xcc9b6c).fillRect(3, 240, 51, 1).fillRect(115, 240, 61, 1);
    g.fillStyle(0x694b37).fillRect(44, 244, 2, 11).fillRect(135, 244, 2, 11);
    g.fillStyle(0x304e42).fillRect(60, 237, 60, 4);
    g.fillStyle(0x684735).fillRect(70, 212, 40, 25).fillRect(66, 206, 48, 10);
    g.fillStyle(0x9c5d44).fillRect(72, 213, 36, 24);
    g.fillStyle(0xcc8560).fillRect(68, 207, 44, 8).fillRect(76, 215, 7, 17);
    g.fillStyle(0x4a4235).fillRect(72, 207, 36, 4);
    g.fillStyle(0xe2a16e).fillRect(71, 211, 36, 2).fillRect(78, 217, 3, 12);
    g.fillStyle(0x794e3c).fillRect(99, 216, 7, 17);
    g.fillStyle(0xe6bd84).fillRect(85, 222, 10, 6);
  }

  private drawPlant(): void {
    const g = this.add.graphics();
    g.fillStyle(0x426a42).fillRect(-2, -47, 4, 47);
    g.fillStyle(0x5d9651).fillRect(-20, -36, 18, 9).fillRect(-16, -40, 12, 5);
    g.fillStyle(0x86b35d).fillRect(-17, -36, 12, 3);
    g.fillStyle(0x74a957).fillRect(2, -48, 19, 10).fillRect(5, -53, 12, 6);
    g.fillStyle(0xa8c96b).fillRect(5, -48, 12, 3);
    g.fillStyle(0x6a9b50).fillRect(-12, -62, 13, 10).fillRect(-9, -66, 7, 5);
    g.fillStyle(0xb5cd76).fillRect(-8, -63, 4, 4).fillRect(9, -50, 5, 3);
    g.fillStyle(0x3d7147).fillRect(-17, -29, 11, 3).fillRect(5, -40, 11, 3);
    this.plant.add(g);
  }

  private drawCan(): void {
    const g = this.add.graphics();
    g.fillStyle(0x416b67).fillRect(-8, -17, 27, 24).fillRect(-16, -20, 14, 7);
    g.fillStyle(0x78a7a0).fillRect(-7, -17, 23, 18).fillRect(-20, -27, 8, 10);
    g.fillStyle(0xa8c7b2).fillRect(-4, -14, 17, 4);
    g.lineStyle(4, 0x416b67).strokeRect(18, -18, 11, 16);
    g.fillStyle(0xd6ac7b).fillRect(19, 0, 17, 8).fillRect(27, 5, 9, 16);
    g.fillStyle(0xeac591).fillRect(18, -2, 10, 6);
    g.fillStyle(0xd6ac7b).fillRect(28, 20, 9, 10);
    g.fillStyle(0x304f46).fillRect(26, 29, 14, 10);
    g.fillStyle(0x78a7a0).fillRect(27, 29, 12, 3);
    this.can.add(g);
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
    this.stream.clear();
    if (active) {
      this.stream.fillStyle(0x62b8db);
      const angle = this.can.rotation;
      const spoutX = this.can.x - 20 * Math.cos(angle) + 27 * Math.sin(angle);
      const spoutY = this.can.y - 20 * Math.sin(angle) - 27 * Math.cos(angle);
      for (let i = 0; i < 7; i++) {
        const p = ((state.t * 1.6 + i / 7) % 1);
        this.stream.fillRect(Math.round(spoutX + p * (94 - spoutX)), Math.round(spoutY + p * (209 - spoutY)), 2, 4);
      }
    }
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
