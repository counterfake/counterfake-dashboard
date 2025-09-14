/**
 * Creates a JSON storage utility for managing data in localStorage.
 * @param key The key under which the data will be stored in localStorage
 * @param initialValue The default value to use when no data exists in storage
 * @returns An object with methods to get, set, and remove data from storage
 */
export function createJSONStorage<T extends Record<string, any>>(
  key: string,
  initialValue: T
) {
  const storage = typeof window !== "undefined" ? localStorage : null;

  const getItem = (): T | null => {
    const item = storage?.getItem(key);

    if (!item) return initialValue;

    return JSON.parse(item) as T;
  };
  const setItem = (value: T) => storage?.setItem(key, JSON.stringify(value));
  const removeItem = () => storage?.removeItem(key);

  setItem(initialValue);

  return {
    getItem,
    setItem,
    removeItem,
  };
}
