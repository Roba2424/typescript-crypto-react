import { useCallback, useEffect, useState } from "react";
import { FetchConfig } from "../ts/type/FetchConfig";
import { FetchState } from "../ts/type/FetchState";

export function useFetch<T>({
  method,
  url,
  header,
  body,
}: FetchConfig): FetchState<T> {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...header },
        body: method !== "GET" && body ? JSON.stringify(body) : undefined,
      });
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
}

type CurrencyTypes = {
  id: string;
  current_price: number;
  symbol: string;
};
