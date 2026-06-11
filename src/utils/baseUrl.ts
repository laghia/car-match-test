export function getBasename(): string | undefined {
  const base = import.meta.env.BASE_URL;
  return base === '/' ? undefined : base.replace(/\/$/, '');
}

export function assetUrl(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}
