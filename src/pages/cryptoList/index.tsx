import { useEffect } from "react";
import { requestUrls } from "../../utils/constants/requestUrls";
import { useFetch } from "../../hooks/useFetches";

type CryptoCurrency = {
  id: string;
  name:string;
};

const CryptoList = () => {
  const { data, loading, error } = useFetch<CryptoCurrency[]>({
    url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
  });

  console.log(data, "......");
  return (
    <div>
      <h2>Hello world</h2>
    </div>
  );
};

export default CryptoList;
