"use client";

import { Layout, Row, Col, Typography, Divider } from "antd";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

export default function AppFooter() {
  return (
    <Footer
      style={{
        background: "#0f172a",
        color: "#fff",
        padding: "60px 16px 30px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Row gutter={[40, 32]}>
          {/* Brand Section */}
          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: "#fff", marginBottom: 16 }}>
              YourStore
            </Title>

            <Text style={{ color: "#cbd5e1", lineHeight: "24px" }}>
              All your daily essentials in one place. Quality products,
              fast delivery and secure payment.
            </Text>
          </Col>

          {/* Categories */}
          <Col xs={24} sm={12} md={8}>
            <Title level={5} style={{ color: "#fff", marginBottom: 16 }}>
              Categories
            </Title>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link href="#" style={{ color: "#cbd5e1" }}>
                Electronics
              </Link>
              <Link href="#" style={{ color: "#cbd5e1" }}>
                Fashion
              </Link>
              <Link href="#" style={{ color: "#cbd5e1" }}>
                Optical
              </Link>
               <Link href="#" style={{ color: "#cbd5e1" }}>
                More
              </Link>
            </div>
          </Col>

          {/* Contact */}
          <Col xs={24} sm={12} md={8}>
            <Title level={5} style={{ color: "#fff", marginBottom: 16 }}>
              Contact
            </Title>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Text style={{ color: "#cbd5e1" }}>
                Email: miraaqib514@gmail.com
              </Text>
              <Text style={{ color: "#cbd5e1" }}>
                Phone: +91 9596523404
              </Text>
            </div>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#1e293b", margin: "40px 0 20px" }} />

        <div style={{ textAlign: "center" }}>
          <Text style={{ color: "#94a3b8" }}>
            © {new Date().getFullYear()} YourStore. All rights reserved.
          </Text>
        </div>
      </div>
    </Footer>
  );
}