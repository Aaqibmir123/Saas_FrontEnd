"use client";

import { Form, Input, Button, Card, Typography, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginPayload } from "../../types/auth.types";
import { loginUser } from "../../lib/authApi";
import { useAuth } from "../../../context/AuthContext";

const { Title, Text } = Typography;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const onFinish = async (values: LoginPayload) => {
    try {
      setLoading(true);

      const data = await loginUser(values);
      console.log("Login response:", data);

      login(data.user, data.accessToken);

      message.success("Login successful 🎉");

      if (data.user.role === "business_admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user");
      }
    } catch (error: any) {
      message.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <Card>
        <Title level={2}>Welcome Back</Title>;
        <Text type="secondary">Sign in to manage your store</Text>
        <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 20 }}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Enter your email" }]}
          >
            <Input size="large" placeholder="Email address" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Enter your password" }]}
          >
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            style={{ borderRadius: 8 }}
          >
            Sign In
          </Button>
        </Form>
        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link href="/register/customer">Start as Customer</Link>

          <Link href="/register/business">Create Your Store</Link>
        </div>
      </Card>
    </div>
  );
}
