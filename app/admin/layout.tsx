"use client";

import { Layout, Drawer, Grid } from "antd";
import type { ReactNode } from "react";
import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

const { Content } = Layout;
const { useBreakpoint } = Grid;

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const screens = useBreakpoint();
  const isMobile = !screens.lg; // lg breakpoint below = mobile
  const [open, setOpen] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* ================= Desktop Sidebar ================= */}
      {!isMobile && (
        <Layout.Sider
          width={250}
          theme="dark"
          style={{
            height: "100vh",
            position: "sticky",
            left: 0,
            top: 0,
          }}
        >
          <AdminSidebar />
        </Layout.Sider>
      )}

      {/* ================= Mobile Drawer ================= */}
      {isMobile && (
        <Drawer
          placement="left"
          open={open}
          onClose={() => setOpen(false)}
          size="large"
          closable={false}
          styles={{ body: { padding: 0 } }}
        >
          <AdminSidebar
            isMobile
            onMenuClick={() => setOpen(false)}
            onClose={() => setOpen(false)}
          />
        </Drawer>
      )}

      {/* ================= Main Area ================= */}
      <Layout>
        <AdminHeader
          onMenuClick={() => {
            if (isMobile) setOpen(true);
          }}
        />

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
    </Layout>
  );
}