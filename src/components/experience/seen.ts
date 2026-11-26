/** Session cookie read by the "/" rewrite in next.config.ts: once set, "/" is the normal home page. */
export function markExperienceSeen() {
  try {
    document.cookie = 'sr_seen=1; path=/; SameSite=Lax';
  } catch {}
}
