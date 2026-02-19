import { ReactNode } from "react";
import "./auth.css";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {children}
      </div>
    </div>
  );
}
