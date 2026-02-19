"use client";

import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Row,
  Col,
  Button,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";

interface ProductFormValues {
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  status: "active" | "inactive";
  image?: UploadFile[];
}

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: ProductFormValues) => void;
  isEditing?: boolean;
  initialValues?: {
    name?: string;
    price?: number;
    stock?: number;
    category?: string;
    description?: string;
    status?: "active" | "inactive";
    image?: string;
  };
}

const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

export default function ProductModal({
  open,
  onCancel,
  onSubmit,
  isEditing = false,
  initialValues,
}: Props) {
  const [form] = Form.useForm<ProductFormValues>();

  useEffect(() => {
    if (initialValues && open) {
      form.setFieldsValue({
        ...initialValues,
        image: initialValues.image
          ? [
              {
                uid: "-1",
                name: initialValues.image,
                status: "done",
                url: `${IMAGE_BASE_URL}${initialValues.image}`,
              },
            ]
          : [],
      });
    }
  }, [initialValues, open, form]);

  const handleOk = async () => {
    const values = await form.validateFields();
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={isEditing ? "Edit Product" : "Add Product"}
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      okText="Save"
      destroyOnHidden
      width={900}
    >
      <Form layout="vertical" form={form}>
        <Row gutter={[12, 12]}>
          {/* NAME - FULL WIDTH */}
          <Col xs={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* PRICE */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Price is required" }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>

          {/* STOCK */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              name="stock"
              label="Stock"
              extra="If stock becomes 0, product will be inactive"
              rules={[{ required: true, message: "Stock is required" }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>

          {/* CATEGORY */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Category is required" }]}
            >
              <Select
                options={[
                  { label: "Electronics", value: "electronics" },
                  { label: "Fashion", value: "fashion" },
                  { label: "Home", value: "home" },
                ]}
              />
            </Form.Item>
          </Col>

          {/* STATUS */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
              initialValue="active"
            >
              <Select
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
              />
            </Form.Item>
          </Col>

          {/* DESCRIPTION - FULL WIDTH */}
          <Col xs={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>

          {/* IMAGE */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name="image"
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                listType="picture"
              >
                <Button icon={<PlusOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
