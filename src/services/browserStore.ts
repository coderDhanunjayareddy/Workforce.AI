export function readBrowserStore<T>(key: string, fallback: T): T {
  const saved = localStorage.getItem(key);
  if (!saved) return structuredClone(fallback);
  try {
    return JSON.parse(saved) as T;
  } catch {
    throw new Error("Saved workspace data could not be read. Restore your browser data before making changes.");
  }
}

export function writeBrowserStore<T>(key: string, value: T): T {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  } catch {
    throw new Error("Your browser could not save this change. Free storage space and try again.");
  }
}
