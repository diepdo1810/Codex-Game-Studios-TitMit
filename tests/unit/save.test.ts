import { describe, expect, it } from 'vitest';
import { readSave, writeSave, SAVE_KEY, type StoragePort } from '../../src/game/save';

const known = ['fern', 'ribbon'];
function memory(raw: string | null = null): StoragePort {
  let value = raw;
  return { getItem: () => value, setItem: (_key, next) => { value = next; } };
}

describe('local save', () => {
  it('round trips earned tokens and unlocked rewards with versioned payload', () => {
    const storage = memory();
    expect(writeSave(storage, { tokens: 9, unlocked: ['fern', 'ribbon'] })).toBeNull();
    expect(JSON.parse(storage.getItem(SAVE_KEY)!)).toEqual({ version: 1, tokens: 9, unlocked: ['fern', 'ribbon'] });
    expect(readSave(storage, known)).toEqual({ data: { tokens: 9, unlocked: ['fern', 'ribbon'] }, warning: null });
  });

  it('starts clean without treating absent save as a failure', () => {
    expect(readSave(memory(), known)).toEqual({ data: null, warning: null });
  });

  it.each([
    '{broken',
    JSON.stringify({ version: 2, tokens: 3, unlocked: [] }),
    JSON.stringify({ version: 1, tokens: -1, unlocked: [] }),
    JSON.stringify({ version: 1, tokens: 0.5, unlocked: [] }),
    JSON.stringify({ version: 1, tokens: 1e30, unlocked: [] }),
    JSON.stringify({ version: 1, tokens: null, unlocked: [] }),
    JSON.stringify({ version: 1, tokens: 3, unlocked: ['unknown'] }),
    JSON.stringify({ version: 1, tokens: 3, unlocked: ['fern', 'fern'] }),
    JSON.stringify({ version: 1, tokens: 3, unlocked: 'fern' }),
    'null',
  ])('rejects malformed or unsupported payload %s without throwing', raw => {
    const result = readSave(memory(raw), known);
    expect(result.data).toBeNull();
    expect(result.warning).toBeTruthy();
  });

  it('reports blocked reads and writes without crashing gameplay', () => {
    const blocked: StoragePort = {
      getItem: () => { throw new Error('blocked'); },
      setItem: () => { throw new Error('quota'); },
    };
    expect(readSave(blocked, known).warning).toBeTruthy();
    expect(writeSave(blocked, { tokens: 3, unlocked: [] })).toBeTruthy();
    expect(readSave(null, known).warning).toBeTruthy();
    expect(writeSave(null, { tokens: 3, unlocked: [] })).toBeTruthy();
  });
});
