"use client";

import { Layout, Drawer } from "antd";
import type { ReactNode } from "react";
import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

const { Sider, Content } = Layout;

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* ===== Desktop Sidebar ===== */}
      <Sider
        width={250}
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null} // 👈 ADD THIS
        style={{ background: "#001529" }}
        className="desktopOnly"
      >
        <AdminSidebar />
      </Sider>

      {/* ===== Main Section ===== */}
      <Layout>
        <AdminHeader onMenuClick={() => setOpen(true)} />

        <Content
          style={{
            padding: 24,
            background: "#f5f7fa",
            minHeight: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>

      {/* ===== Mobile Drawer ===== */}
      <Drawer
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
        styles={{ body: { padding: 0 } }}
        style={{ padding: 0 }}
        size="default"
        rootStyle={{ maxWidth: "100vw" }}
      >
        <div style={{ width: "100vw" }}>
          <AdminSidebar onMenuClick={() => setOpen(false)} />
        </div>
      </Drawer>

      <style jsx>{`
        @media (max-width: 992px) {
          .desktopOnly {
            display: none;
          }
        }

        @media (min-width: 993px) {
          .ant-drawer {
            display: none !important;
          }
        }
      `}</style>
    </Layout>
  );
}
