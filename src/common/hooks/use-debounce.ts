import { useEffect, useState } from 'react';

/**
 * Debounce hook - delays the execution of a value update
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
