"use client";

import { Layout, Avatar, Space, Dropdown, Typography } from "antd";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/app/lib/user/profileApi";

const { Header } = Layout;
const { Text } = Typography;

export default function AdminHeader() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.user);
      } catch (err) {
        console.log("Header user fetch failed");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  const items = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "My Profile",
      onClick: () => router.push("/admin/profile"),
    },
    {
      key: "password",
      icon: <LockOutlined />,
      label: "Change Password",
      onClick: () => router.push("/admin/change-password"),
    },
    { type: "divider" as const },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ fontSize: 16, fontWeight: 600 }}>
        {user?.businessName || user?.name || "Dashboard"}
      </div>

      {/* RIGHT SIDE */}
      <Space size="large">
        <BellOutlined style={{ fontSize: 18, cursor: "pointer" }} />

        <Dropdown menu={{ items }} placement="bottomRight">
          <Space style={{ cursor: "pointer" }}>
            <Avatar
              src={
                user?.profileImage
                  ? `http://localhost:5000/uploads/${user.profileImage}`
                  : undefined
              }
              icon={<UserOutlined />}
            />
            <Text strong>{user?.name}</Text>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
}
