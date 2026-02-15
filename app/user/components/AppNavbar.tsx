"use client";

import { Layout, Row, Col, Button, Space } from "antd";
import Link from "next/link";

export default function AppNavbar() {
  return (
    <Layout.Header
      style={{
        background: "#ffffff",
        height: 70,
        lineHeight: "70px",
        padding: "0 40px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Row align="middle" justify="space-between">
        
        {/* Left Logo */}
        <Col>
          <Link
            href="/user"
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#111",
              textDecoration: "none",
              letterSpacing: 0.5,
            }}
          >
            YourStore
          </Link>
        </Col>

        {/* Right Auth Buttons */}
        <Col>
          <Space size="middle">
            <Link href="/login">
              <Button
                type="text"
                style={{
                  fontWeight: 500,
                  fontSize: 15,
                }}
              >
                Login
              </Button>
            </Link>

            <Link href="/register/business">
              <Button
                type="primary"
                size="middle"
                style={{
                  borderRadius: 6,
                  padding: "0 20px",
                  fontWeight: 500,
                }}
              >
                Register
              </Button>
            </Link>
          </Space>
        </Col>

      </Row>
    </Layout.Header>
  );
}
