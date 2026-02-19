"use client";

import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Spin,
  Button,
  message,
  Divider,
  Typography,
  Image,
  Space,
} from "antd";
import { useRouter } from "next/navigation";
import CheckoutForm from "./CheckoutForm";
import { getUserAddress, saveUserAddress } from "../../../lib/user/addressApi";
import { useCheckout } from "../../../../context/CheckoutContext";
import { useCart } from "@/context/CartContext";

const { Text, Title } = Typography;
const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

export default function CheckoutLayout() {
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  const { shippingAddress, setShippingAddress } = useCheckout();
  const { cart } = useCart();

  /* ================= FETCH ADDRESS ================= */
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const saved = await getUserAddress();
        if (saved) setShippingAddress(saved);
      } catch {
        console.log("No saved address");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [setShippingAddress]);

  if (loading) {
    return (
      <Row justify="center" style={{ marginTop: 80 }}>
        <Spin size="large" />
      </Row>
    );
  }

  /* ================= SAFE CART ================= */
  const safeCart = Array.isArray(cart) ? cart : [];

  const subtotal = safeCart.reduce((acc: number, item: any) => {
    const product = item.product || item;
    return acc + product.price * item.quantity;
  }, 0);

  const total = subtotal;

  const handleContinue = () => {
    if (!shippingAddress) {
      message.warning("Please add address first");
      return;
    }

    if (!safeCart.length) {
      message.warning("Cart is empty");
      return;
    }

    router.push("/user/payment");
  };

  return (
    <div
      style={{
        padding: "40px 16px",
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <Row gutter={[24, 24]} justify="center">
        {/* ================= ORDER SUMMARY ================= */}
        <Col xs={{ span: 24, order: 1 }} lg={{ span: 10, order: 2 }}>
          <Card
            variant="borderless"
            style={{
              borderRadius: 16,
              position: "sticky",
              top: 20,
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Title level={4}>Order Summary</Title>

            {!safeCart.length ? (
              <Text type="secondary">No items in cart</Text>
            ) : (
              <>
                <Space
                  orientation="vertical"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  {safeCart.map((item: any) => {
                    const product = item.product || item;

                    return (
                      <Row key={item._id} align="middle" gutter={12}>
                        <Col>
                          <Image
                            src={`${IMAGE_BASE_URL}${product.image}`}
                            width={60}
                            height={60}
                            style={{ borderRadius: 8, objectFit: "cover" }}
                            preview={false}
                          />
                        </Col>

                        <Col flex="auto">
                          <Text strong>{product.name}</Text>
                          <br />
                          <Text type="secondary">Qty: {item.quantity}</Text>
                        </Col>

                        <Col>
                          <Text strong>₹{product.price * item.quantity}</Text>
                        </Col>
                      </Row>
                    );
                  })}
                </Space>

                <Divider />

                <Space direction="vertical" style={{ width: "100%" }}>
                  <Row justify="space-between">
                    <Text>Subtotal</Text>
                    <Text>₹{subtotal}</Text>
                  </Row>

                  <Row justify="space-between">
                    <Text>Convenience Fee</Text>
                    <Text style={{ color: "green" }}>Free</Text>
                  </Row>

                  <Row justify="space-between">
                    <Text>Platform Fee</Text>
                    <Text style={{ color: "green" }}>Free</Text>
                  </Row>

                  <Row justify="space-between">
                    <Text>GST</Text>
                    <Text>Included</Text>
                  </Row>
                </Space>

                <Divider />

                <Row justify="space-between">
                  <Title level={5}>Total</Title>
                  <Title level={5}>₹{total}</Title>
                </Row>

                <Text type="secondary" style={{ fontSize: 12 }}>
                  All taxes and charges included
                </Text>
              </>
            )}
          </Card>
        </Col>

        {/* ================= ADDRESS SECTION ================= */}
        <Col xs={{ span: 24, order: 2 }} lg={{ span: 14, order: 1 }}>
          <Card
            variant="borderless"
            style={{
              borderRadius: 16,
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Title level={4}>Delivery Information</Title>

            {!shippingAddress || editMode ? (
              <CheckoutForm
                initialValues={shippingAddress}
                onNext={async (data: any) => {
                  try {
                    const response = await saveUserAddress(data);

                    if (!response.success) {
                      message.error(response.message);
                      return;
                    }

                    setShippingAddress(response.address);
                    setEditMode(false);
                    message.success(response.message);
                  } catch {
                    message.error("Something went wrong");
                  }
                }}
              />
            ) : (
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <Text>
                  <strong>Name:</strong> {shippingAddress.name}
                </Text>
                <Text>
                  <strong>Phone:</strong> +91 {shippingAddress.phone}
                </Text>
                <Text>
                  <strong>Address:</strong> {shippingAddress.address}
                </Text>
                <Text>
                  <strong>City:</strong> {shippingAddress.city}
                </Text>
                <Text>
                  <strong>Pincode:</strong> {shippingAddress.pincode}
                </Text>

                <Row
                  justify="space-between"
                  align="middle"
                  style={{ marginTop: 16 }}
                >
                  <Button
                    type="default"
                    shape="round"
                    style={{ padding: "0 24px", fontWeight: 500 }}
                    onClick={() => setEditMode(true)}
                  >
                    Edit Address
                  </Button>

                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    onClick={handleContinue}
                  >
                    Continue to Payment
                  </Button>
                </Row>
              </Space>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
