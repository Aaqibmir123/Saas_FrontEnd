"use client";

import { Card, Row, Col, Typography } from "antd";

const { Title } = Typography;

export default function DashboardPage() {
  return (
    <>
      <Title level={3}>Dashboard</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card>
            <h4>Total Revenue</h4>
            <h2>$12,450</h2>
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card>
            <h4>New Orders</h4>
            <h2>87</h2>
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card>
            <h4>Active Users</h4>
            <h2>764</h2>
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card>
            <h4>Low Stock</h4>
            <h2>5 Items</h2>
          </Card>
        </Col>
      </Row>
    </>
  );
}
