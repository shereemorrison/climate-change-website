"use client";

import { useEffect, useState } from "react";
import type { ClimateApiResponse } from "@/lib/climate-api/types";

type FetchState<T> = {
  data: T | null;
  source: string | null;
  loading: boolean;
  error: boolean;
};

export function useClimateData<T>(endpoint: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    source: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/climate/${endpoint}`);
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as ClimateApiResponse<T>;
        if (!cancelled) {
          setState({
            data: json.data,
            source: json.source,
            loading: false,
            error: false,
          });
        }
      } catch {
        if (!cancelled) {
          setState({ data: null, source: null, loading: false, error: true });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  return state;
}
