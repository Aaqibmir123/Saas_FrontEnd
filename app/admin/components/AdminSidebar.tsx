"use client";

import { Menu } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  onMenuClick?: () => void;
}

export default function AdminSidebar({ onMenuClick }: Props) {
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
    } else {
      router.push(key);
    }

    if (onMenuClick) {
      onMenuClick(); // close drawer on mobile
    }
  };

  return (
    <div
      style={{
        width: 250,
        height: "100vh",
        background: "#001529",
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
          color: "#fff",
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

      {/* Logout */}
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
    </div>
  );
}
