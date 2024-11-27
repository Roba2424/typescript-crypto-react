import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetches";
import { CurrencyDetailResponseModel } from "../../ts/type/CurrencyDetailResponseModel";
import { Card } from "antd";

const CryptoDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useFetch<CurrencyDetailResponseModel>({
    url: `https://api.coingecko.com/api/v3/coins/${id}`,
    header: { "x-cg-demo-api-key": "CG-91Na3gF37jLkMimFB9B4FtwP" },
  });
  console.log(data?.image);
  return (
    <div>
      <Card cover={<img src={data?.image.small} style={{width:'50px'}}/>}></Card>
    </div>
  );
};

export default CryptoDetail;
