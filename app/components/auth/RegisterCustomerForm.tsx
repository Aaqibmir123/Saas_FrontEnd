"use client";

import { Form, Input, Button, Card, Typography, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { RegisterCustomerPayload } from "../../types/auth.types";
import { registerUser } from "../../lib/authApi";

const { Title } = Typography;

export default function RegisterCustomerForm() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: RegisterCustomerPayload) => {
    try {
      setLoading(true);

      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "customer",
      };

      const response = await registerUser(payload);

      message.success("Account created successfully 🎉");

      console.log("Registration Response:", response);

      // optional redirect
      // window.location.href = "/login";

    } catch (error: any) {
      message.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <Card>
        <Title level={3} className="auth-title">
          Create Customer Account
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            Register
          </Button>
        </Form>

        <div className="auth-footer">
          <Link href="/login">Already have account? Login</Link>
        </div>
      </Card>
    </div>
  );
}
