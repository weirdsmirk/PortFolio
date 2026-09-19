const canUseDOM = typeof window !== "undefined";

export function readSession(key: string): string | null {
  if (!canUseDOM) return null;

  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeSession(key: string, value: string) {
  if (!canUseDOM) return;

  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }
}

export function removeSession(key: string) {
  if (!canUseDOM) return;

  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }
}
