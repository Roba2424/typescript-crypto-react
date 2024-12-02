import { useFetch } from "../../hooks/useFetches";
import { Table, Select } from "antd";
import type { TableProps } from "antd";
import { CurrencyResponseModel } from "../../ts/type/CurrencyResponseModel";
import { useNavigate } from "react-router";
import { ROUTE_PATH_NAMES } from "../../utils/constants/routes";
import { CurrencyListResponseModel } from "../../ts/type/CurrencyListResponseModel";
import { useQueryParam } from "../../hooks/useQueryParams";
import { useMemo, useCallback } from "react";
import { DEFAULT_PAGINATION } from "../../utils/constants/pagination";

const { Option } = Select;

const CryptoList = () => {
  const navigate = useNavigate();
  const { getQueryParam, setQueryParam, getCurrency, setCurrency } = useQueryParam();
  const pageSize = getQueryParam("pageSize") || DEFAULT_PAGINATION.pageSize;
  const page = getQueryParam("page") || DEFAULT_PAGINATION.page;
  const currency = getCurrency() || "usd";

  const { data, loading, error } = useFetch<CurrencyResponseModel[]>({
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=${pageSize}&page=${page}`,
    header: { "x-cg-demo-api-key": "CG-91Na3gF37jLkMimFB9B4FtwP" },
  });

  const columns: TableProps<CurrencyListResponseModel>["columns"] =
    useMemo(() => {
      return [
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
          key: "price_change_24h",
        },
        { title: "Price", dataIndex: "current_price", key: "current_price" },
      ];
    }, []);

  const handleNavigateDetailPage = (rowData: CurrencyListResponseModel) => {
    navigate(`${ROUTE_PATH_NAMES.CRYPTODETAIL}/${rowData.id}`);
  };

  const handleCurrencyChange = useCallback(
    (value: string) => {
      setCurrency(value);
    },
    [setCurrency]
  );

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Select
          defaultValue={currency}
          style={{ width: 200 }}
          onChange={handleCurrencyChange}
        >
          <Option value="usd">USD</Option>
          <Option value="rub">RUB</Option>
          <Option value="eur">EUR</Option>
          <Option value="cny">CNY</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={data || []}
        loading={loading}
        pagination={{
          total: 100,
          current: +page,
          pageSize: +pageSize,
          onChange(page, pageSize) {
            setQueryParam({ page, pageSize });
          },
        }}
        onRow={(row) => {
          return { onClick: () => handleNavigateDetailPage(row) };
        }}
      />
    </div>
  );
};

export default CryptoList;