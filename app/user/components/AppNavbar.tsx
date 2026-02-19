"use client";

import { Layout, Row, Col, Button, Space, Badge, Dropdown, Avatar } from "antd";
import {
  ShoppingCartOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import styles from "./AppNavbar.module.css";

const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") + "/uploads/";

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const { cartCount, openDrawer } = useCart();

  const profileMenu = {
    items: [
      { key: "profile", label: <Link href="/user/profile">My Profile</Link> },
      { key: "orders", label: <Link href="/user/orders">My Orders</Link> },
      { key: "logout", label: <span onClick={logout}>Logout</span> },
    ],
  };

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.container}>
        <Row align="middle" justify="space-between">
          {/* Logo */}
          <Col>
            <Link href="/user" className={styles.logo}>
              YourStore
            </Link>
          </Col>

          {/* Right Side */}
          <Col>
            {!user ? (
              <Space size="middle">
                <Link href="/login" className={styles.navLink}>
                  Login
                </Link>

                <Link href="/register/business">
                  <Button className={styles.registerBtn}>
                    Register
                  </Button>
                </Link>
              </Space>
            ) : (
              <Space size="large">
                <Badge count={cartCount} size="small">
                  <ShoppingCartOutlined
                    className={styles.icon}
                    onClick={openDrawer}
                  />
                </Badge>

                <Badge count={0} size="small">
                  <BellOutlined className={styles.icon} />
                </Badge>

                <Dropdown menu={profileMenu} placement="bottomRight">
                  <div className={styles.avatarWrapper}>
                    {user?.profileImage ? (
                      <img
                        src={`${IMAGE_BASE_URL}${user.profileImage}`}
                        alt="profile"
                        className={styles.avatarImg}
                      />
                    ) : (
                      <Avatar size={38} icon={<UserOutlined />} />
                    )}
                  </div>
                </Dropdown>
              </Space>
            )}
          </Col>
        </Row>
      </div>
    </Layout.Header>
  );
}
