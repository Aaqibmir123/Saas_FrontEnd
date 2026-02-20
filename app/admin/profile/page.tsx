"use client";

import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  message,
  Row,
  Col,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "@/app/lib/user/profileApi";
import { useAuth } from "@/context/AuthContext";

const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") + "/uploads/";

  
export default function ProfilePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>();
  const [role, setRole] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { refreshUser } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        const user = res;
        console.log("Fetched user profile:", user);

        setRole(user.role);

        form.setFieldsValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          businessName: user.businessName,
        });

        if (user.profileImage) {
          setImagePreview(`${IMAGE_BASE_URL}${user.profileImage}`);
        }
      } catch (err) {
        message.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone || "");
      formData.append("address", values.address || "");

      if (role === "business_admin") {
        formData.append("businessName", values.businessName || "");
      }

      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      await updateUserProfile(formData);
      await refreshUser();

      message.success("Profile updated successfully");
    } catch (err) {
      message.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Row justify="center">
        <Col xs={24} sm={22} md={18} lg={14}>
          <Card
            style={{
              borderRadius: 16,
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
          >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
              {/* Avatar Section */}
              <div style={{ textAlign: "center", marginBottom: 30 }}>
                <Avatar
                  size={110}
                  src={imagePreview}
                  icon={<UserOutlined />}
                  style={{
                    marginBottom: 12,
                    border: "3px solid #1677ff",
                  }}
                />

                <Upload
                  beforeUpload={(file) => {
                    setSelectedFile(file);
                    setImagePreview(URL.createObjectURL(file));
                    return false; // prevent auto upload
                  }}
                  maxCount={1}
                  showUploadList={false}
                >
                  <Button size="small" icon={<UploadOutlined />}>
                    Change Picture
                  </Button>
                </Upload>
              </div>

              {/* 2 Column Layout */}
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: "Name is required" }]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Email" name="email">
                    <Input size="large" disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Phone Number" name="phone">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Address" name="address">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                {role === "business_admin" && (
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Store Name"
                      name="businessName"
                      rules={[
                        {
                          required: true,
                          message: "Store name is required",
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>
                  </Col>
                )}
              </Row>

              <Row justify="end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  style={{
                    borderRadius: 8,
                    padding: "0 32px",
                  }}
                >
                  Update Profile
                </Button>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
