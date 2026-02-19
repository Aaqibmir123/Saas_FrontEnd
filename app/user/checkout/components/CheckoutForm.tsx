"use client";

import { Form, Input, Button, Row, Col } from "antd";

export default function CheckoutForm({
  onNext,
  initialValues,
}: any) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onNext(values);   // ✅ Send to parent
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Required" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Pincode"
            name="pincode"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        block
        style={{ marginTop: 12 }}
      >
        Save Address
      </Button>
    </Form>
  );
}
