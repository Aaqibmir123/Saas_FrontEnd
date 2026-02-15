"use client";

import { Layout, Row, Col } from "antd";

const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer style={{ background: "#111", color: "#fff" }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <h3 style={{ color: "#fff" }}>YourStore</h3>
          <p>All your daily essentials in one place.</p>
        </Col>

        <Col xs={24} md={8}>
          <h4>Categories</h4>
          <p>Electronics</p>
          <p>Fashion</p>
          <p>Optical</p>
        </Col>

        <Col xs={24} md={8}>
          <h4>Contact</h4>
          <p>Email: support@store.com</p>
          <p>Phone: +91 9876543210</p>
        </Col>
      </Row>

      <div style={{ marginTop: 20, textAlign: "center" }}>
        © {new Date().getFullYear()} YourStore
      </div>
    </Footer>
  );
}
