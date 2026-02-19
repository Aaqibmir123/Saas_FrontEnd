import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/auth.css";
import "antd/dist/reset.css";

import { AuthProvider } from "@/context/AuthContext"; // ✅ ADD THIS
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI SaaS Platform",
  description: "Multi-tenant AI SaaS eCommerce Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>   {/* ✅ WRAP HERE */}
          <CartProvider>   {/* ✅ NEST CART PROVIDER */}
              <CheckoutProvider> {/* ✅ NEST CHECKOUT PROVIDER */}
          {children}
              </CheckoutProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
