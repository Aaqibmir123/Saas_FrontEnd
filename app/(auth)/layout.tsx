import "../styles/auth.css";
import { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <div className="auth-brand">
          <Image
            src="/brain.png"
            alt="AI SaaS Logo"
            width={120}
            height={120}
            priority
            className="auth-logo"
          />
          <h2>AI SaaS</h2>
          <p>Smart Admin Dashboard</p>
        </div>
      </div>

      <div className="auth-right">{children}</div>
    </div>
  );
}
