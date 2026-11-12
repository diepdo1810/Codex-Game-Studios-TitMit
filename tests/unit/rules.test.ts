import { describe, expect, it } from 'vitest';
import { FIELD, STEP, makeRng, newState, update, roll } from '../../src/game/rules';

const tuning = { growthPerWater: 20, wateringDuration: 0.7, cycleReward: 3 };

describe('watering', () => {
  it('advances growth and starts plant response on one watering action', () => {
    const state = newState();
    update(state, { water: true }, tuning, STEP);
    expect(state.growth).toBe(20);
    expect(state.watering).toBeGreaterThan(0);
    expect(state.response).toBeGreaterThan(0);
  });

  it('keeps growth when player stops and ends response animation', () => {
    const state = newState();
    update(state, { water: true }, tuning, STEP);
    for (let i = 0; i < 600; i++) update(state, { water: false }, tuning, STEP);
    expect(state.growth).toBe(20);
    expect(state.watering).toBe(0);
    expect(state.response).toBe(0);
  });

  it('ignores overlapping actions until watering animation finishes', () => {
    const state = newState();
    update(state, { water: true }, tuning, STEP);
    update(state, { water: true }, tuning, STEP);
    expect(state.growth).toBe(20);
  });

  it('grants one reward per full cycle and restarts growth without a failure state', () => {
    const state = newState();
    for (let i = 0; i < 10; i++) {
      update(state, { water: true }, tuning, STEP);
      update(state, { water: false }, tuning, 1);
    }
    expect(state.growth).toBe(0);
    expect(state.tokens).toBe(6);
    expect(state.cycles).toBe(2);
    expect(state.watering).toBe(0);
  });

  it('does not grant tokens before completion or repeatedly while idle', () => {
    const state = newState();
    for (let i = 0; i < 4; i++) {
      update(state, { water: true }, tuning, STEP);
      update(state, { water: false }, tuning, 1);
    }
    expect(state).toMatchObject({ growth: 80, tokens: 0, cycles: 0 });
    update(state, { water: true }, tuning, STEP);
    expect(state).toMatchObject({ growth: 0, tokens: 3, cycles: 1 });
    update(state, { water: false }, tuning, 1000);
    expect(state).toMatchObject({ growth: 0, tokens: 3, cycles: 1 });
  });

  it('crossing full growth with non-divisible tuning resets a new cycle to zero', () => {
    const state = newState();
    for (let i = 0; i < 4; i++) {
      update(state, { water: true }, { ...tuning, growthPerWater: 30 }, STEP);
      update(state, { water: false }, tuning, 1);
    }
    expect(state).toMatchObject({ growth: 0, tokens: 3, cycles: 1 });
  });

  it('uses portrait 9:16 logical dimensions', () => {
    expect(FIELD.w / FIELD.h).toBe(9 / 16);
  });
});

describe('makeRng', () => {
  it('repeats bounded random numbers for the same seed', () => {
    const a = makeRng(7), b = makeRng(7);
    const first = [a(), a(), a()];
    expect([b(), b(), b()]).toEqual(first);
    expect(first.every(n => n >= 0 && n < 1)).toBe(true);
  });
});

describe('gacha', () => {
  const rewards = [
    { id: 'fern', name: 'Dương xỉ', kind: 'plant' as const },
    { id: 'ribbon', name: 'Nơ nhỏ', kind: 'item' as const },
  ];
  const gacha = { gachaCost: 3, rewards };

  it('deducts cost once and unlocks a random plant or item', () => {
    const state = newState();
    state.tokens = 6;
    expect(roll(state, gacha, () => 0)).toEqual(rewards[0]);
    expect(state.tokens).toBe(3);
    expect(roll(state, gacha, () => 0.99999)).toEqual(rewards[1]);
    expect(state.tokens).toBe(0);
    expect(state.unlocked).toEqual(['fern', 'ribbon']);
  });

  it('unaffordable roll never mutates state or samples random source', () => {
    const state = newState(), before = structuredClone(state);
    let samples = 0;
    expect(roll(state, gacha, () => { samples++; return 0; })).toBeNull();
    expect(state).toEqual(before);
    expect(samples).toBe(0);
  });

  it('duplicate rewards stay unlocked once and still cost tokens', () => {
    const state = newState();
    state.tokens = 6;
    roll(state, gacha, () => 0);
    roll(state, gacha, () => 0);
    expect(state.unlocked).toEqual(['fern']);
    expect(state.tokens).toBe(0);
  });

  it('empty catalog never spends tokens', () => {
    const state = newState();
    state.tokens = 3;
    expect(roll(state, { ...gacha, rewards: [] }, () => 0)).toBeNull();
    expect(state.tokens).toBe(3);
  });
});
