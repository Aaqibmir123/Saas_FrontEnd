"use client";

import { Layout, Avatar, Space, Dropdown, Typography, Button } from "antd";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/app/lib/user/profileApi";

const { Header } = Layout;
const { Text } = Typography;

interface Props {
  onMenuClick?: () => void;
}

export default function AdminHeader({ onMenuClick }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.user);
      } catch {
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
        padding: "0 20px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        
        {/* Burger Icon (Mobile Only) */}
        <div className="mobileMenuBtn">
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 18 }} />}
            onClick={onMenuClick}
          />
        </div>

        <div style={{ fontSize: 16, fontWeight: 600 }}>
          {user?.businessName || user?.name || "Dashboard"}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <Space size="large">
        <BellOutlined style={{ fontSize: 18, cursor: "pointer" }} />

        <Dropdown menu={{ items }} placement="bottomRight">
          <Space style={{ cursor: "pointer" }}>
            <Avatar
              src={
                user?.profileImage
                  ? `${process.env.NEXT_PUBLIC_API_URL?.replace(
                      "/api",
                      ""
                    )}/uploads/${user.profileImage}`
                  : undefined
              }
              icon={<UserOutlined />}
            />
            <Text strong className="desktopName">
              {user?.name}
            </Text>
          </Space>
        </Dropdown>
      </Space>

      {/* Responsive CSS */}
      <style jsx>{`
        .mobileMenuBtn {
          display: none;
        }

        @media (max-width: 992px) {
          .mobileMenuBtn {
            display: block;
          }

          .desktopName {
            display: none;
          }
        }
      `}</style>
    </Header>
  );
}
