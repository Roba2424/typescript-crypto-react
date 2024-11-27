import { useEffect } from "react";
import { requestUrls } from "../../utils/constants/requestUrls";
import { useFetch } from "../../hooks/useFetches";
import { Table } from "antd";
import type { TableProps } from "antd";
import { CurrencyResponseModel } from "../../ts/type/CurrencyResponseModel";

const CryptoList = () => {
  const { data, loading, error } = useFetch<CurrencyResponseModel[]>({
    url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
  });

  //TODO MOVE Detail
  const columns: TableProps<CurrencyResponseModel>["columns"] = [
    {
      title: "#ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (value) => {
        return <img src={value} width={40} height={50} />;
      },
    },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Price Change 24",
      dataIndex: "price_change_24h",
      key: "price_changeg_24h",
    },
    { title: "Price", dataIndex: "current_price", key: "current_price" },
  ];

  const handleNavigateDetailPage = (row: CurrencyResponseModel) => {
    console.log('click')
    console.log(row.id);
  };

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      loading={loading}
      onRow={() => {
        return { onClick: () => handleNavigateDetailPage };
      }}
    />
  );
};

export default CryptoList;
