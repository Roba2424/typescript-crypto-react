import { useCallback, useEffect, useState } from "react";

type FetchConfig = {
  method?: "POST" | "DELETE" | "PUT" | "GET" | "PATCH";
  url: string;
  header?: object;
  body?: object;
};

type FetchState<T> = {
  error: string | null;
  loading: boolean;
  data: T | null;
};

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
      const response = await fetch(url);
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
