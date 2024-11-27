export type FetchState<T> = {
  error: string | null;
  loading: boolean;
  data: T | null;
};
