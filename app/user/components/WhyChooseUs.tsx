"use client";

import { Row, Col, Card, Typography } from "antd";

const { Title, Text } = Typography;

export default function WhyChooseUs() {
  return (
    <div
      style={{
        padding: "80px 16px",
        background: "#f9fafc",
      }}
    >
      {/* Section Heading */}
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <Title
          level={2}
          style={{
            marginBottom: 12,
            fontWeight: 700,
            background: "linear-gradient(90deg, #1677ff, #6a5cff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Why Choose Us
        </Title>

        <Text type="secondary" style={{ fontSize: 16 }}>
          We provide the best service experience for our customers
        </Text>
      </div>

      {/* Cards */}
      <Row gutter={[24, 24]} justify="center">
        {[
          {
            icon: "🚚",
            title: "Fast Delivery",
            desc: "Quick and reliable delivery at your doorstep.",
          },
          {
            icon: "🔒",
            title: "Secure Payment",
            desc: "Your transactions are safe and encrypted.",
          },
          {
            icon: "⭐",
            title: "Quality Products",
            desc: "We ensure top quality products every time.",
          },
        ].map((item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              hoverable
              style={{
                borderRadius: 18,
                textAlign: "center",
                padding: "20px 10px",
                height: "100%",
                boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
              }}
              styles={{
                body: {
                  padding: 30,
                },
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 15 }}>
                {item.icon}
              </div>

              <Title level={4} style={{ marginBottom: 10 }}>
                {item.title}
              </Title>

              <Text type="secondary">{item.desc}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}