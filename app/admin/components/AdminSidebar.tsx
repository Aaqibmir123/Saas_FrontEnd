"use client";

import { Menu } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  UserOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  onMenuClick?: () => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export default function AdminSidebar({
  onMenuClick,
  onClose,
  isMobile = false,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { key: "/admin/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/admin/products", icon: <ShoppingOutlined />, label: "Products" },
    { key: "/admin/orders", icon: <ShoppingCartOutlined />, label: "Orders" },
   
  ];

  const handleClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      localStorage.removeItem("accessToken");
      router.replace("/login");
      return;
    }

    router.push(key);

    if (isMobile && onMenuClick) {
      onMenuClick();
    }
  };

  return (
    <div
      style={{
        width: isMobile ? "100%" : 250,
        height: "100vh",
        background: "#001529",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOP */}
      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: isMobile ? "space-between" : "center",
          alignItems: "center",
          color: "#fff",
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        SaaSPlatform

        {isMobile && (
          <CloseOutlined
            style={{ fontSize: 20, cursor: "pointer" }}
            onClick={onClose}
          />
        )}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={handleClick}
        style={{ flex: 1 }}
      />

      <Menu
        theme="dark"
        mode="inline"
        selectable={false}
        items={[
          {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Logout",
          },
        ]}
        onClick={handleClick}
      />
    </div>
  );
}