const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

export function u(path: string): string {
  if (!path) return `${BASE}/`;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//') || path.startsWith('#')) {
    return path;
  }
  const p = path.startsWith('/') ? path : `/${path}`;
  const hasExt = /\.[a-zA-Z0-9]{1,5}$/.test(p);
  const withSlash = hasExt || p.endsWith('/') ? p : `${p}/`;
  return `${BASE}${withSlash}`;
}
