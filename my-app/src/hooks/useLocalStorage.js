import { useEffect, useState } from "react";

/**
 * Persist a piece of React state in `localStorage` with live synchronization.
 *
 * Behavior:
 * - Reads initial state from `localStorage` (falls back to `initValue`).
 * - Persists updates with `JSON.stringify`.
 * - Reacts to external storage changes (DevTools/manual clear, other tabs, focus return).
 *
 * Notes:
 * - Values are serialized/deserialized with `JSON.stringify` / `JSON.parse`.
 * - Browser-only hook (not SSR-safe without guards).
 *
 * @template T
 * @param {string} key The `localStorage` key to read/write.
 * @param {T} initValue Fallback value when the key does not exist.
 * @param {boolean} dep If `true`, persist whenever state changes. If `false`, skip persistence effect.
 * @returns {[T, import("react").Dispatch<import("react").SetStateAction<T>>]}
 * A tuple of `[state, setState]`, matching `useState`.
 */
export function useLocalStorage(key, initValue) {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
