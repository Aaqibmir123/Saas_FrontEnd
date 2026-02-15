"use client";

import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

const { Sider } = Layout;

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/products",
      icon: <ShoppingOutlined />,
      label: "Products",
    },
    {
      key: "/admin/orders",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
    },
    {
      key: "/admin/analytics",
      icon: <BarChartOutlined />,
      label: "Analytics",
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: "Users",
    },
  ];

  const logoutItem = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      localStorage.removeItem("accessToken");
      router.replace("/login");
      return;
    }

    router.push(key);
  };

  return (
    <Sider
      width={250}
      theme="dark"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px",
          fontSize: "20px",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        SaaSPlatform
      </div>

      {/* Main Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          flex: 1,
          borderRight: "none",
        }}
      />

      {/* Logout Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectable={false}
        items={logoutItem}
        onClick={handleMenuClick}
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      />
    </Sider>
  );
}
