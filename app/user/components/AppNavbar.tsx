"use client";

import { Layout, Row, Col, Button, Space, Badge, Dropdown, Avatar,Image } from "antd";
import {
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const { cartCount, openDrawer } = useCart();
  console.log("User in Navbar:", user);

  const profileMenu = {
    items: [
      {
        key: "profile",
        label: <Link href="/user/profile">My Profile</Link>,
      },
      {
        key: "orders",
        label: <Link href="/user/orders">My Orders</Link>,
      },
      {
        key: "logout",
        label: <span onClick={logout}>Logout</span>,
      },
    ],
  };

  return (
    <Layout.Header
      style={{
        background: "#ffffff",
        height: 70,
        lineHeight: "70px",
        padding: "0 24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Row align="middle" justify="space-between">
        {/* Logo */}
        <Col>
          <Link
            href="/user"
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#111",
              textDecoration: "none",
            }}
          >
            YourStore
          </Link>
        </Col>

        {/* Right Side */}
        <Col>
          {!user ? (
            <Space size="middle">
              <Link href="/login">
                <Button type="text">Login</Button>
              </Link>

              <Link href="/register/business">
                <Button type="primary">Register</Button>
              </Link>
            </Space>
          ) : (
            <Space size="large">
              {/* Cart */}
              <Badge count={cartCount} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: 20, cursor: "pointer" }}
                  onClick={openDrawer}
                />
              </Badge>

              {/* Notifications */}
              <Badge count={0} size="small">
                <BellOutlined style={{ fontSize: 20 }} />
              </Badge>

              {/* Profile Avatar */}
              <Dropdown menu={profileMenu} placement="bottomRight">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: "2px solid #f0f0f0",
                  }}
                >
                  {user?.profileImage ? (
                    <Image
                      src={`${IMAGE_BASE_URL}${user.profileImage}`}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Avatar size={40} icon={<UserOutlined />} />
                  )}
                </div>
              </Dropdown>
            </Space>
          )}
        </Col>
      </Row>
    </Layout.Header>
  );
}
