import type { ReactNode } from "react";
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";
import CartDrawer from "./components/CartDrawer";

export default function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", display: "flex", flexDirection: "column" }}>
      
      <AppNavbar />

      <main style={{ flex: 1, padding: "20px 24px" }}>
        {children}
        <CartDrawer />
      </main>

      <AppFooter />
      
    </div>
  );
}
