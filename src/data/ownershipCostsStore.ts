import type { RunningCostsData } from './content';

const STORAGE_KEY = 'car-match-ownership-costs-v1';

type OwnershipCostsMap = Record<string, RunningCostsData>;

function readAll(): OwnershipCostsMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as OwnershipCostsMap;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeAll(map: OwnershipCostsMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function ownershipCostsKey(makeSlug: string, modelSlug: string): string {
  return `${makeSlug}/${modelSlug}`.toLowerCase();
}

export function getStoredOwnershipCosts(key: string): RunningCostsData | null {
  return readAll()[key] ?? null;
}

export function setStoredOwnershipCosts(key: string, data: RunningCostsData) {
  const next = readAll();
  next[key] = data;
  writeAll(next);
}

export function clearStoredOwnershipCosts(key: string) {
  const next = readAll();
  if (!(key in next)) return;
  delete next[key];
  writeAll(next);
}
