/** Gameplay tuning loaded from data/config.json. */
export interface Tuning {
  growthPerWater: number;
  wateringDuration: number;
  cycleReward: number;
}

/** Observable garden state; presentation reads without owning game rules. */
export interface State {
  t: number;
  growth: number;
  watering: number;
  response: number;
  tokens: number;
  cycles: number;
  unlocked: string[];
}

/** Portrait logical pixel field. */
export const FIELD = { w: 180, h: 320 } as const;
/** Fixed simulation step in seconds. */
export const STEP = 1 / 60;

/** Seeded gameplay random source, retained for deterministic rewards. */
export function makeRng(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), s | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Creates a garden without timers that punish the player for stopping. */
export function newState(): State {
  return { t: 0, growth: 0, watering: 0, response: 0, tokens: 0, cycles: 0, unlocked: [] };
}

/** One discrete watering action, independent of pointer or keyboard source. */
export interface Action { water: boolean; }

/** Advances animation timers and accepts a watering action when can is ready. */
export function update(state: State, action: Action, tuning: Tuning, dt: number): void {
  state.t += dt;
  state.watering = Math.max(0, state.watering - dt);
  state.response = Math.max(0, state.response - dt);
  if (!action.water || state.watering > 0) return;
  state.growth = Math.min(100, state.growth + tuning.growthPerWater);
  if (state.growth >= 100) {
    state.growth = 0;
    state.tokens += tuning.cycleReward;
    state.cycles++;
  }
  state.watering = tuning.wateringDuration;
  state.response = tuning.wateringDuration;
}

/** Data-defined reward identity remains stable across collection and save features. */
export interface Reward { id: string; name: string; kind: 'plant' | 'item'; }
/** In-game token cost and uniform reward pool. */
export interface GachaTuning { gachaCost: number; rewards: readonly Reward[]; }

/** Spends earned tokens once and returns a reward; refusal leaves all state untouched. */
export function roll(state: State, tuning: GachaTuning, random: () => number): Reward | null {
  if (state.tokens < tuning.gachaCost || tuning.rewards.length === 0) return null;
  const reward = tuning.rewards[Math.floor(random() * tuning.rewards.length)];
  if (!reward) return null;
  state.tokens -= tuning.gachaCost;
  if (!state.unlocked.includes(reward.id)) state.unlocked.push(reward.id);
  return reward;
}
