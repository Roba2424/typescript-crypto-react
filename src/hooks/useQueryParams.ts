import { useSearchParams } from "react-router";

export const useQueryParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  const setQueryParam = (params: Record<string, string | number | null>) => {
    const newParam = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParam.delete(key);
      } else {
        newParam.set(key, value.toString());
      }
    });

    setSearchParams(newParam);
  };

  const deleteQuery = (key: string) => {
    const newParam = new URLSearchParams(searchParams.toString());
    newParam.delete(key);
    setSearchParams(newParam);
  };

  const getCurrency = (): string | null => getQueryParam("currency");
  const setCurrency = (currency: string) => setQueryParam({ currency });
  const deleteCurrency = () => deleteQuery("currency");

  return {
    getQueryParam,
    setQueryParam,
    deleteQuery,
    getCurrency,
    setCurrency,
    deleteCurrency,
  };
};
