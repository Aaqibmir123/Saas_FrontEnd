"use client";

import { Form, Input, Button, Card, Typography, message, Row, Col } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterBusinessPayload } from "../../types/auth.types";
import { registerUser, RegisterPayload } from "../../lib/authApi";
import "../../(auth)/auth.css";

const { Title, Text } = Typography;

export default function RegisterBusinessForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: RegisterBusinessPayload) => {
    try {
      setLoading(true);

      const payload: RegisterPayload = {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        role: "business_admin",
        businessName: values.businessName.trim(),
      };

      await registerUser(payload);
      message.success("Store created successfully 🎉");
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
        Create Your Store
      </Title>

      <Text className="auth-subtitle">
        Start selling today
      </Text>

      <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 30 }}>
        
        {/* ROW 1 */}
        <Row gutter={20}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: "Full name is required" },
                { min: 3, message: "Minimum 3 characters required" },
              ]}
            >
              <Input size="large" placeholder="Owner name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Business Name"
              name="businessName"
              rules={[
                { required: true, message: "Business name is required" },
                { min: 3, message: "Minimum 3 characters required" },
              ]}
            >
              <Input size="large" placeholder="Your Store Name" />
            </Form.Item>
          </Col>
        </Row>

        {/* ROW 2 */}
        <Row gutter={20}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter valid email" },
              ]}
            >
              <Input size="large" placeholder="business@email.com" />
            </Form.Item>
          </Col>

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
        </Row>

        {/* ROW 3 */}
        <Row gutter={20}>
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
              <Input.Password size="large" />
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
          Create Store
        </Button>
      </Form>

      <div className="auth-links">
        <Link href="/login">Already have account? Login</Link>
      </div>
    </Card>
  );
}
