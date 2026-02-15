"use client";

import { Layout, Input, Avatar, Space } from "antd";
import {
  BellOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

export default function AdminHeader() {
  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search..."
        style={{ width: 300 }}
      />

      <Space size="large">
        <BellOutlined style={{ fontSize: 18 }} />
        <Avatar icon={<UserOutlined />} />
      </Space>
    </Header>
  );
}
