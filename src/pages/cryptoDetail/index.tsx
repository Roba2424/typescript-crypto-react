import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetches";
import { CurrencyDetailResponseModel } from "../../ts/type/CurrencyDetailResponseModel";
import { Card, Spin, Typography, Row, Col, Divider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./style.css"; 

const { Title, Text } = Typography;

const CryptoDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useFetch<CurrencyDetailResponseModel>({
    url: `https://api.coingecko.com/api/v3/coins/${id}`,
    header: { "x-cg-demo-api-key": "CG-91Na3gF37jLkMimFB9B4FtwP" },
  });

  if (loading) {
    return (
      <div className="crypto-detail-loading">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="crypto-detail-error">
        <Text type="danger">Failed to fetch cryptocurrency details.</Text>
      </div>
    );
  }

  return (
    <div className="crypto-detail-container">
      <Card
        hoverable
        className="crypto-detail-card"
        cover={
          <div className="crypto-detail-image-wrapper">
            <img
              src={data?.image.large}
              alt={data?.name}
              className="crypto-detail-image"
            />
          </div>
        }
      >
        <Row justify="center">
          <Col span={24} className="crypto-detail-header">
            <Title level={3}>{data?.name}</Title>
            <Text type="secondary">Symbol: {data?.symbol.toUpperCase()}</Text>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>Current Price:</Text>
            <Text> ${data?.market_data.current_price.usd}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Market Cap:</Text>
            <Text> ${data?.market_data.market_cap.usd}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          <Col span={12}>
            <Text strong>24h High:</Text>
            <Text> ${data?.market_data.high_24h.usd}</Text>
          </Col>
          <Col span={12}>
            <Text strong>24h Low:</Text>
            <Text> ${data?.market_data.low_24h.usd}</Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CryptoDetail;