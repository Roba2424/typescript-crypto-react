export type CurrencyDetailResponseModel = {
  id: string;
  symbol: string;
  name: string;
  image: {
    small: string;
    medium: string;
    large: string;
  };
  market_data: {
    current_price: {
      [currency: string]: number;
    };
    market_cap: {
      [currency: string]: number;
    };
    total_volume: {
      [currency: string]: number;
    };
    high_24h: {
      [currency: string]: number;
    };
    low_24h: {
      [currency: string]: number;
    };
    price_change_percentage_24h: number;
  };
  total_supply: number;
  circulating_supply: number;
  max_supply: number | null;
  description: {
    en: string;
    [language: string]: string;
  };
  genesis_date: string | null;
  last_updated: string;
  links: {
    homepage: string[];
    blockchain_site: string[];
    subreddit_url: string;
    repos_url: {
      github: string[];
    };
  };
};
