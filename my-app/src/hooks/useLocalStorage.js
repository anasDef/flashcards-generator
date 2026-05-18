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
export function useLocalStorage(key, initValue, dep = true) {
  // Single source reader so every sync path uses identical parsing/fallback logic.
  const readStoredValue = () => {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : initValue;
  };

  const [state, setState] = useState(readStoredValue);

  useEffect(
    () => {
      // Persist the latest React state to localStorage.
      localStorage.setItem(key, JSON.stringify(state));
    },
    dep ? [state] : [],
  );

  useEffect(() => {
    // Pull latest value from localStorage into React state when storage changes externally.
    const syncFromStorage = () => {
      setState((currentState) => {
        const nextState = readStoredValue();
        // Avoid unnecessary re-renders when the value is effectively unchanged.
        return JSON.stringify(currentState) === JSON.stringify(nextState)
          ? currentState
          : nextState;
      });
    };

    // Some localStorage edits (same tab DevTools) do not fire `storage`,
    // so we also resync on tab focus/visibility return.
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncFromStorage();
      }
    };

    // Keep UI in sync across tabs and when user returns to this tab.
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener("focus", syncFromStorage);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Cleanup listeners to prevent leaks and duplicate subscriptions.
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener("focus", syncFromStorage);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [key, initValue]);

  return [state, setState];
}
