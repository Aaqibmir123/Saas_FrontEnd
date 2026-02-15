"use client";

import { Row, Col, Card } from "antd";

export default function WhyChooseUs() {
  return (
    <div style={{ padding: "60px 0" }}>
      <h2 style={{ marginBottom: 32 }}>Why Choose Us</h2>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card>🚚 Fast Delivery</Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>🔒 Secure Payment</Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>⭐ Quality Products</Card>
        </Col>
      </Row>
    </div>
  );
}
