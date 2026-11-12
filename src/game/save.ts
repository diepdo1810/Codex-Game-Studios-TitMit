/** Minimal storage surface, injected so rules work without a browser. */
export interface StoragePort {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}
/** Durable player progress. Growth and animation intentionally remain session-only. */
export interface SavedData { tokens: number; unlocked: string[]; }
/** Result distinguishes no save from inaccessible or invalid progress. */
export interface LoadResult { data: SavedData | null; warning: string | null; }
/** Versioned local key, scoped by browser origin. */
export const SAVE_KEY = 'pixel-watering-game:v1';

/** Reads and validates local progress against current reward identities. */
export function readSave(storage: StoragePort | null, knownIds: readonly string[]): LoadResult {
  if (!storage) return { data: null, warning: 'Không thể đọc dữ liệu lưu trên thiết bị.' };
  try {
    const raw = storage.getItem(SAVE_KEY);
    if (raw === null) return { data: null, warning: null };
    let value: unknown;
    try { value = JSON.parse(raw); }
    catch { return { data: null, warning: 'Dữ liệu lưu không hợp lệ. Đang chơi phiên mới.' }; }
    if (!valid(value, knownIds)) return { data: null, warning: 'Dữ liệu lưu không hợp lệ. Đang chơi phiên mới.' };
    return { data: { tokens: value.tokens, unlocked: [...value.unlocked] }, warning: null };
  } catch { return { data: null, warning: 'Không thể đọc dữ liệu lưu trên thiết bị.' }; }
}

/** Saves durable progress; returns a warning when local persistence fails. */
export function writeSave(storage: StoragePort | null, data: SavedData): string | null {
  if (!storage) return 'Không thể lưu trên thiết bị. Tiến trình chỉ còn trong phiên này.';
  try {
    storage.setItem(SAVE_KEY, JSON.stringify({ version: 1, tokens: data.tokens, unlocked: data.unlocked }));
    return null;
  } catch { return 'Không thể lưu trên thiết bị. Tiến trình chỉ còn trong phiên này.'; }
}

function valid(value: unknown, knownIds: readonly string[]): value is SavedData & { version: 1 } {
  if (!value || typeof value !== 'object') return false;
  const save = value as Record<string, unknown>;
  if (save.version !== 1 || !Number.isSafeInteger(save.tokens) || (save.tokens as number) < 0) return false;
  if (!Array.isArray(save.unlocked)) return false;
  return save.unlocked.every(id => typeof id === 'string' && knownIds.includes(id))
    && new Set(save.unlocked).size === save.unlocked.length;
}
