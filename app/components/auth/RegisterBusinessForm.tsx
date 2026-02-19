"use client";

import { Form, Input, Button, Card, Typography, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { RegisterBusinessPayload } from "../../types/auth.types";
import { registerUser, RegisterPayload } from "../../lib/authApi";

const { Title } = Typography;

export default function RegisterBusinessForm() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: RegisterBusinessPayload) => {
    try {
      setLoading(true);

      // 👇 IMPORTANT: Explicitly type payload
      const payload: RegisterPayload = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "business_admin",
        businessName: values.businessName,
      };

      const response = await registerUser(payload);

      message.success("Store created successfully 🎉");


      // Optional redirect
      // window.location.href = "/auth/login";
    } catch (error: any) {
      message.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <Card style={{ borderRadius: 12 }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Create Your Store
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            label="Business Name"
            name="businessName"
            rules={[{ required: true, message: "Please enter business name" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            size="large"
            style={{ borderRadius: 8 }}
          >
            Create Store
          </Button>
        </Form>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Link href="/login">Already have account? Login</Link>
        </div>
      </Card>
    </div>
  );
}
