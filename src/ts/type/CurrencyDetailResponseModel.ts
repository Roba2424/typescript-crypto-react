export type CurrencyDetailResponseModel = {
  id: string;
  symbol: string;
  name: string;
  image: {
    small: string;
    medium: string;
    large: string;
  };
  total_supply: number;
};
