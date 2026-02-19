"use client";

import {
  Card,
  Radio,
  Button,
  Space,
  Typography,
  message,
} from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const { Title, Text } = Typography;

export default function OrderSummary() {
  const { cart } = useCart();
  const router = useRouter();

  const [method, setMethod] = useState<"COD" | "ONLINE">("COD");

  const handleContinue = () => {
    if (cart.length === 0) {
      message.warning("Your cart is empty");
      return;
    }

    if (method !== "COD") {
      message.info("Online payment coming soon");
      return;
    }

    router.push("/user/payment"); // or place order directly
  };

  return (
    <Card
      style={{
        borderRadius: 12,
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <Title level={4} style={{ marginBottom: 20 }}>
        Select Payment Method
      </Title>

      <Radio.Group
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        style={{ width: "100%" }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          
          {/* COD Option */}
          <Card
            size="small"
            hoverable
            style={{
              border:
                method === "COD"
                  ? "1px solid #1677ff"
                  : "1px solid #f0f0f0",
            }}
            onClick={() => setMethod("COD")}
          >
            <Radio value="COD">
              <Text strong>Cash on Delivery</Text>
            </Radio>
            <div style={{ fontSize: 12, color: "#666" }}>
              Pay when you receive your order
            </div>
          </Card>

          {/* Online Disabled */}
          <Card
            size="small"
            style={{
              opacity: 0.5,
              cursor: "not-allowed",
            }}
          >
            <Radio value="ONLINE" disabled>
              <Text strong>Card / UPI / Net Banking</Text>
            </Radio>
            <div style={{ fontSize: 12 }}>
              Coming Soon
            </div>
          </Card>

        </Space>
      </Radio.Group>

      <Button
        type="primary"
        size="large"
        block
        style={{ marginTop: 24 }}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </Card>
  );
}
