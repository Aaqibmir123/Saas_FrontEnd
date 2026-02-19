"use client";

import {
  Card,
  Row,
  Col,
  Radio,
  Button,
  message,
  Tag,
  Typography,
  Space,
} from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/lib/user/orderApi";
import { useCheckout } from "@/context/CheckoutContext";

const { Title, Text } = Typography;

export default function PaymentPage() {
  const [method, setMethod] = useState<"COD" | "ONLINE">("COD");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { shippingAddress } = useCheckout();

  const handlePlaceOrder = async () => {
    try {
      if (!shippingAddress) {
        message.error("Shipping address missing");
        return;
      }

      setLoading(true);

      await createOrder({
        paymentMethod: method,
        shippingAddress,
      });

      message.success("Order placed successfully");
      router.push("/user/order-success");
    } catch (error: any) {
      message.error(error.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px 16px",
        minHeight: "100vh",
        background: "#f5f7fa",
      }}
    >
      <Row justify="center">
        <Col xs={24} sm={22} md={18} lg={12} xl={10}>
          <Card
            style={{
              borderRadius: 16,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <Title level={4} style={{ marginBottom: 24 }}>
              Select Payment Method
            </Title>

            <Radio.Group
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              style={{ width: "100%" }}
            >
              <Space direction="vertical" style={{ width: "100%" }} size={16}>
                
                {/* COD OPTION */}
                <Card
                  style={{
                    borderRadius: 12,
                    border:
                      method === "COD"
                        ? "2px solid #1677ff"
                        : "1px solid #eee",
                    cursor: "pointer",
                  }}
                  onClick={() => setMethod("COD")}
                >
                  <Radio value="COD">
                    <Space direction="vertical" size={0}>
                      <Text strong>Cash on Delivery</Text>
                      <Text type="secondary">
                        Pay when you receive the order
                      </Text>
                    </Space>
                  </Radio>
                </Card>

                {/* PHONEPE */}
                <Card
                  style={{
                    borderRadius: 12,
                    background: "#fafafa",
                    opacity: 0.7,
                  }}
                >
                  <Space justify="space-between" style={{ width: "100%" }}>
                    <Space direction="vertical" size={0}>
                      <Text strong>PhonePe</Text>
                      <Text type="secondary">
                        UPI / Wallet / Card
                      </Text>
                    </Space>
                    <Tag color="purple">Coming Soon</Tag>
                  </Space>
                </Card>

                {/* PAYTM */}
                <Card
                  style={{
                    borderRadius: 12,
                    background: "#fafafa",
                    opacity: 0.7,
                  }}
                >
                  <Space justify="space-between" style={{ width: "100%" }}>
                    <Space direction="vertical" size={0}>
                      <Text strong>Paytm</Text>
                      <Text type="secondary">
                        UPI / Wallet / Card
                      </Text>
                    </Space>
                    <Tag color="blue">Coming Soon</Tag>
                  </Space>
                </Card>

                {/* CREDIT CARD */}
                <Card
                  style={{
                    borderRadius: 12,
                    background: "#fafafa",
                    opacity: 0.7,
                  }}
                >
                  <Space justify="space-between" style={{ width: "100%" }}>
                    <Space direction="vertical" size={0}>
                      <Text strong>Credit / Debit Card</Text>
                      <Text type="secondary">
                        Visa / Mastercard / RuPay
                      </Text>
                    </Space>
                    <Tag color="orange">Coming Soon</Tag>
                  </Space>
                </Card>
              </Space>
            </Radio.Group>

            {/* PLACE ORDER BUTTON */}
            <Button
              type="primary"
              block
              size="large"
              style={{
                marginTop: 32,
                height: 50,
                borderRadius: 12,
                fontSize: 16,
              }}
              loading={loading}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
