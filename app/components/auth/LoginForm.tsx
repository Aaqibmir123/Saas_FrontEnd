"use client";

import { Form, Input, Button, Card, Typography, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginPayload } from "../../types/auth.types";
import { loginUser } from "../../lib/authApi";
import { useAuth } from "../../../context/AuthContext";
import "../../(auth)/auth.css";

const { Title, Text } = Typography;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const onFinish = async (values: LoginPayload) => {
    try {
      setLoading(true);

      const data = await loginUser(values);
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
    <Card className="auth-card">
      <Title level={2} className="auth-title">
        Welcome Back
      </Title>

      <Text type="secondary" className="auth-subtitle">
        Sign in to manage your store
      </Text>

      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: 30 }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Enter valid email" },
          ]}
        >
          <Input
            size="large"
            placeholder="example@email.com"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password is required" },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Enter your password"
          />
        </Form.Item>

        <Button
          htmlType="submit"
          size="large"
          block
          loading={loading}
          className="auth-button"
        >
          Sign In
        </Button>
      </Form>

      <div className="auth-links">
        <Link href="/register/customer">
          Start as Customer
        </Link>

        <Link href="/register/business">
          Create Your Store
        </Link>
      </div>
    </Card>
  );
}
