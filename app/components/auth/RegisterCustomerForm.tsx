"use client";

import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Row,
  Col,
} from "antd";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterCustomerPayload } from "../../types/auth.types";
import { RegisterPayload, registerUser } from "../../lib/authApi";
import "../../(auth)/auth.css";

const { Title, Text } = Typography;

export default function RegisterCustomerForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: RegisterCustomerPayload) => {
    try {
      setLoading(true);

      const payload: RegisterPayload = {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        role: "customer",
      };

      await registerUser(payload);

      message.success("Account created successfully 🎉");
      router.push("/login");
    } catch (error: any) {
      message.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="auth-card">
      <Title level={2} className="auth-title">
         Customer Account
      </Title>

      <Text className="auth-subtitle">
        Start shopping in seconds
      </Text>

      <Form layout="vertical" onFinish={onFinish}>
        {/* Row 1 */}
        <Row gutter={[32, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: "Full name is required" },
                { min: 3, message: "Minimum 3 characters required" },
              ]}
            >
              <Input size="large" placeholder="John Doe" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter valid email" },
              ]}
            >
              <Input size="large" placeholder="example@email.com" />
            </Form.Item>
          </Col>
        </Row>

        {/* Row 2 */}
        <Row gutter={[32, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Password is required" },
                { min: 6, message: "Minimum 6 characters required" },
              ]}
              hasFeedback
            >
              <Input.Password size="large" placeholder="Create password" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input.Password size="large" placeholder="Confirm password" />
            </Form.Item>
          </Col>
        </Row>

        <Button
          htmlType="submit"
          block
          size="large"
          loading={loading}
          className="auth-button"
          style={{ marginTop: 10 }}
        >
          Register
        </Button>
      </Form>

      <div className="auth-links">
        <Link href="/login">Already have account? Login</Link>
      </div>
    </Card>
  );
}
