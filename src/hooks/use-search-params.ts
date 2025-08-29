import {
  useRouter,
  useSearchParams as useNextSearchParams,
} from "next/navigation";
import { useCallback, useMemo } from "react";

type SearchParamsValue = string | string[] | undefined | null;

/**
 * Update URL search parameters and return a set of methods to manage them
 */
export function useSearchParams() {
  const router = useRouter();
  const searchParams = useNextSearchParams();

  // update URL helper
  const updateUrl = useCallback(
    (newParams: URLSearchParams) => {
      const url = new URL(window.location.href);
      url.search = newParams.toString();
      router.replace(url.pathname + url.search, { scroll: false });
    },
    [router]
  );

  // convert current params to URLSearchParams
  const getCurrentParams = useCallback(() => {
    return new URLSearchParams(searchParams.toString());
  }, [searchParams]);

  // get methods
  const get = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const getAll = useCallback(
    (key: string) => {
      return searchParams.getAll(key);
    },
    [searchParams]
  );

  const has = useCallback(
    (key: string) => {
      return searchParams.has(key);
    },
    [searchParams]
  );

  const toString = useCallback(() => {
    return searchParams.toString();
  }, [searchParams]);

  const entries = useCallback(() => {
    return searchParams.entries();
  }, [searchParams]);

  // set methods
  const set = useCallback(
    (key: string, value: SearchParamsValue) => {
      const params = getCurrentParams();

      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.delete(key);
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }

      updateUrl(params);
    },
    [getCurrentParams, updateUrl]
  );

  const setMultiple = useCallback(
    (paramsObj: Record<string, SearchParamsValue>) => {
      const params = getCurrentParams();

      Object.entries(paramsObj).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          params.delete(key);
        } else if (Array.isArray(value)) {
          params.delete(key);
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value);
        }
      });

      updateUrl(params);
    },
    [getCurrentParams, updateUrl]
  );

  const append = useCallback(
    (key: string, value: string) => {
      const params = getCurrentParams();
      params.append(key, value);
      updateUrl(params);
    },
    [getCurrentParams, updateUrl]
  );

  const deleteParam = useCallback(
    (key: string) => {
      const params = getCurrentParams();
      params.delete(key);
      updateUrl(params);
    },
    [getCurrentParams, updateUrl]
  );

  const deleteMultiple = useCallback(
    (keys: string[]) => {
      const params = getCurrentParams();
      keys.forEach((key) => params.delete(key));
      updateUrl(params);
    },
    [getCurrentParams, updateUrl]
  );

  const clear = useCallback(() => {
    updateUrl(new URLSearchParams());
  }, [updateUrl]);

  // utility methods
  const getObject = useCallback(<T = Record<string, string>>(): T => {
    const obj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      obj[key] = value;
    });
    return obj as T;
  }, [searchParams]);

  const setFromObject = useCallback(
    (obj: Record<string, SearchParamsValue>) => {
      setMultiple(obj);
    },
    [setMultiple]
  );

  const toggle = useCallback(
    (key: string, value: string) => {
      const currentValue = get(key);
      if (currentValue === value) {
        deleteParam(key);
      } else {
        set(key, value);
      }
    },
    [get, set, deleteParam]
  );

  return useMemo(
    () => ({
      // Get methods
      get,
      getAll,
      has,
      toString,
      entries,

      // Set methods
      set,
      setMultiple,
      append,
      delete: deleteParam,
      deleteMultiple,
      clear,

      // Utility methods
      getObject,
      setFromObject,
      toggle,
    }),
    [
      get,
      getAll,
      has,
      toString,
      entries,
      set,
      setMultiple,
      append,
      deleteParam,
      deleteMultiple,
      clear,
      getObject,
      setFromObject,
      toggle,
    ]
  );
}
