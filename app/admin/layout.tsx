"use client";

import { Layout } from "antd";
import type { ReactNode } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

const { Content } = Layout;

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar />

      <Layout
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <AdminHeader />

        <Content
          style={{
            padding: 24,
            background: "#f5f7fa",
            minHeight: "100vh",
            width: "100%", // 🔥 IMPORTANT
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
