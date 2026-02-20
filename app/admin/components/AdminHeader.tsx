"use client";

import { Layout, Avatar, Space, Dropdown, Typography } from "antd";
import { BellOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const { Header } = Layout;
const { Text } = Typography;

export default function AdminHeader({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const displayName = user?.name
    ? user.name.length > 6
      ? user.name.slice(0, 6) + "..."
      : user.name
    : "";

  const items = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "My Profile",
      onClick: () => router.push("/admin/profile"),
    },
    {
      key: "logout",
      label: "Logout",
      onClick: () => {
        logout();
        router.push("/login");
      },
    },
  ];

  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 16px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      {/* LEFT SIDE */}
      <Space align="center">
        <div className="mobileBurger">
          <MenuOutlined
            style={{ fontSize: 20, cursor: "pointer" }}
            onClick={onMenuClick}
          />
        </div>

        <div style={{ fontSize: 16, fontWeight: 600 }}>
          {user?.businessName || user?.name || "Dashboard"}
        </div>
      </Space>

      {/* RIGHT SIDE */}
      <Space size="large">
        <BellOutlined style={{ fontSize: 18, cursor: "pointer" }} />

        <Dropdown menu={{ items }} placement="bottomRight">
          <Space style={{ cursor: "pointer" }}>
            <Avatar
              src={
                user?.profileImage
                  ? `http://localhost:5000/uploads/${user.profileImage}?v=${user.profileImage}`
                  : undefined
              }
              icon={<UserOutlined />}
            />
            <Text strong>{displayName}</Text>{" "}
          </Space>
        </Dropdown>
      </Space>

      <style jsx>{`
        @media (min-width: 992px) {
          .mobileBurger {
            display: none;
          }
        }
      `}</style>
    </Header>
  );
}
