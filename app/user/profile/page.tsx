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

const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

export default function ProfilePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile();
      console.log("Profile data:", data);

      form.setFieldsValue({
        name: data.name,
        email: data.email,
      });

      if (data.profileImage) {
        setImagePreview(`${IMAGE_BASE_URL}${data.profileImage}`);
      }
    };

    fetchProfile();
  }, []);

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", values.name);

      if (values.profileImage?.file) {
        formData.append("profileImage", values.profileImage.file);
      }

      await updateUserProfile(formData);

      message.success("Profile updated");
    } catch (err) {
      message.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" style={{ marginTop: 40 }}>
      <Col xs={24} sm={20} md={14} lg={10}>
        <Card style={{ borderRadius: 12 }}>
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            {/* Avatar */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <Avatar size={100} src={imagePreview} icon={<UserOutlined />} />
            </div>

            <Form.Item
              name="profileImage"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) return e;
                return e?.fileList;
              }}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                listType="picture"
                onChange={(info) => {
                  const file = info.file.originFileObj;
                  if (file) {
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Change Profile Image</Button>
              </Upload>
            </Form.Item>
            <p></p>

            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>

            <Button type="primary" block loading={loading} htmlType="submit">
              Update Profile
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
