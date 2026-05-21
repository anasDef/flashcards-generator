import { useEffect, useState } from "react";

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
