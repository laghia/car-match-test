const STORAGE_KEY = 'racv-car-match-access';
const ACCESS_TOKEN = 'granted';

async function hashValue(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function isSiteAccessConfigured(): boolean {
  return Boolean(import.meta.env.VITE_SITE_ACCESS_HASH);
}

export function hasSiteAccess(): boolean {
  if (!isSiteAccessConfigured()) return true;
  return sessionStorage.getItem(STORAGE_KEY) === ACCESS_TOKEN;
}

export function grantSiteAccess(): void {
  sessionStorage.setItem(STORAGE_KEY, ACCESS_TOKEN);
}

export async function verifySitePassword(password: string): Promise<boolean> {
  const expectedHash = import.meta.env.VITE_SITE_ACCESS_HASH as string | undefined;
  if (!expectedHash) return true;

  const hash = await hashValue(password.trim());
  return hash === expectedHash;
}
