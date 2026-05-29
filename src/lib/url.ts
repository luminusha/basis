const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

export function u(path: string): string {
  if (!path) return BASE || '/';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//') || path.startsWith('#')) {
    return path;
  }
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${p}`;
}
