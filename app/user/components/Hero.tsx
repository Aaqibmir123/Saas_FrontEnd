"use client";

import { Row, Col, Typography, Button, Image } from "antd";

const { Title, Paragraph } = Typography;

export default function Hero() {
  return (
    <div style={{ padding: "60px 0" }}>
      <Row align="middle" gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <Title>
            Everything You Need <br /> In One Store
          </Title>
          <Paragraph>
            Shop electronics, fashion, grocery, optical and more.
          </Paragraph>
          <Button type="primary" size="large">
            Shop Now
          </Button>
        </Col>

        <Col xs={24} md={12}>
          {/* <Image
            src="/banner.jpg"
            alt="banner"
            style={{ width: "100%", borderRadius: 12 }}
          /> */}
        </Col>
      </Row>
    </div>
  );
}
