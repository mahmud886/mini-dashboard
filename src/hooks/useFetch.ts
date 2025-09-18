'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type FetchConfig = RequestInit & { skip?: boolean };

export type UseFetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export type UseFetchResult<T> = UseFetchState<T> & {
  refetch: (overrideUrl?: string, overrideInit?: RequestInit) => Promise<void>;
  setData: (updater: (current: T | null) => T | null) => void;
};

export function useFetch<T = unknown>(url: string, init?: FetchConfig): UseFetchResult<T> {
  const [state, setState] = useState<UseFetchState<T>>({ data: null, loading: true, error: null });
  const controllerRef = useRef<AbortController | null>(null);
  const initRef = useRef<FetchConfig | undefined>(init);
  const urlRef = useRef<string>(url);

  const doFetch = useCallback(async (targetUrl?: string, targetInit?: RequestInit) => {
    const finalUrl = targetUrl ?? urlRef.current;
    const finalInit: RequestInit = { ...initRef.current, ...targetInit };

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await fetch(finalUrl, { ...finalInit, signal: controller.signal });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = (await res.json()) as T;
      setState({ data: json, loading: false, error: null });
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
      setState({ data: null, loading: false, error: err as Error });
    }
  }, []);

  const refetch = useCallback(
    async (overrideUrl?: string, overrideInit?: RequestInit) => {
      await doFetch(overrideUrl, overrideInit);
    },
    [doFetch]
  );

  const setData = useCallback((updater: (current: T | null) => T | null) => {
    setState((s) => ({ ...s, data: updater(s.data) }));
  }, []);

  useEffect(() => {
    urlRef.current = url;
    initRef.current = init;
  }, [url, init]);

  useEffect(() => {
    if (init?.skip) return;
    doFetch();
    return () => controllerRef.current?.abort();
  }, [doFetch, init?.skip]);

  return useMemo(() => ({ ...state, refetch, setData }), [state, refetch, setData]);
}
