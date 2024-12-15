import { Table, Select, Typography, Space, Card } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router";
import { useMemo, useCallback } from "react";
import { useFetch } from "../../hooks/useFetches";
import { useQueryParam } from "../../hooks/useQueryParams";
import { CurrencyResponseModel } from "../../ts/type/CurrencyResponseModel";
import { CurrencyListResponseModel } from "../../ts/type/CurrencyListResponseModel";
import { ROUTE_PATH_NAMES } from "../../utils/constants/routes";
import { DEFAULT_PAGINATION } from "../../utils/constants/pagination";
import "./style.css";

const { Option } = Select;
const { Title } = Typography;

const currencySymbols: Record<string, string> = {
  usd: "$",
  rub: "₽",
  eur: "€",
  cny: "¥",
};

const CryptoList = () => {
  const navigate = useNavigate();
  const { getQueryParam, setQueryParam, getCurrency, setCurrency } =
    useQueryParam();

  const pageSize = Number(getQueryParam("pageSize")) || DEFAULT_PAGINATION.pageSize;
  const page = Number(getQueryParam("page")) || DEFAULT_PAGINATION.page;
  const currency = getCurrency() || "usd";

  const { data, loading, error } = useFetch<CurrencyResponseModel[]>({
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=${pageSize}&page=${page}`,
    header: { "x-cg-demo-api-key": "CG-91Na3gF37jLkMimFB9B4FtwP" },
  });

  const columns: TableProps<CurrencyListResponseModel>["columns"] = useMemo(
    () => [
      {
        title: "#",
        dataIndex: "id",
        key: "id",
        render: (_: any, __: CurrencyListResponseModel, index: number) => (
          <strong>{(page - 1) * pageSize + index + 1}</strong>
        ),
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (value: string) => (
          <img src={value} alt="crypto" className="crypto-image" />
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Price Change (24h)",
        dataIndex: "price_change_percentage_24h",
        key: "price_change_percentage_24h",
        render: (value: number) => (
          <span style={{ color: value > 0 ? "green" : "red" }}>
            {value.toFixed(2)}%
          </span>
        ),
      },
      {
        title: `Price (${currency.toUpperCase()})`,
        dataIndex: "current_price",
        key: "current_price",
        render: (value: number) => (
          <span>
            {currencySymbols[currency] || ""}{value.toFixed(2)}
          </span>
        ),
      },
    ],
    [page, pageSize, currency]
  );

  const handleCurrencyChange = useCallback(
    (value: string) => {
      setCurrency(value);
    },
    [setCurrency]
  );

  const handleNavigateDetailPage = (rowData: CurrencyListResponseModel) => {
    navigate(`${ROUTE_PATH_NAMES.CRYPTODETAIL}/${rowData.id}`);
  };

  if (error) {
    return (
      <div className="crypto-list-container">
        <Card className="crypto-list-card">
          <Typography.Text type="danger">
            Failed to load data. Please try again later.
          </Typography.Text>
        </Card>
      </div>
    );
  }

  return (
    <div className="crypto-list-container">
      <Card className="crypto-list-card">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={3}>Cryptocurrency Prices</Title>
          <Space
            style={{
              marginBottom: 16,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Select
              defaultValue={currency}
              style={{ width: 200 }}
              onChange={handleCurrencyChange}
              size="large"
            >
              <Option value="usd">USD</Option>
              <Option value="rub">RUB</Option>
              <Option value="eur">EUR</Option>
              <Option value="cny">CNY</Option>
            </Select>
          </Space>
          <Table
            columns={columns}
            dataSource={data?.map((item) => ({ ...item, key: item.id })) || []}
            loading={loading}
            pagination={{
              total: 100,
              current: page,
              pageSize: pageSize,
              showSizeChanger: true,
              onChange(page, pageSize) {
                setQueryParam({ page, pageSize });
              },
            }}
            rowClassName="crypto-row"
            onRow={(row) => ({
              onClick: () => handleNavigateDetailPage(row),
              style: { cursor: "pointer" },
            })}
            bordered
          />
        </Space>
      </Card>
    </div>
  );
};

export default CryptoList;