"use client";

import {
  Drawer,
  Image,
  Button,
  Divider,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

export default function CartDrawer() {
  const {
    cart,
    drawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
  } = useCart();

  const { user } = useAuth();
  const router = useRouter();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    closeDrawer();
    router.push("/user/checkout");
  };

  return (
    <Drawer
      title="Your Cart"
      placement="right"
      open={drawerOpen}
      onClose={closeDrawer}
      size="default"
    >
      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          Cart is empty
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                padding: 14,
                marginBottom: 14,
                borderRadius: 12,
                background: "#fff",
                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
              }}
            >
              <Row gutter={12} align="middle">
                <Col xs={8} sm={6}>
                  <Image
                    src={`${IMAGE_BASE_URL}${item.image}`}
                    width="100%"
                    height={80}
                    style={{
                      objectFit: "cover",
                      borderRadius: 10,
                    }}
                    preview={false}
                    fallback="/placeholder.jpg"
                  />
                </Col>

                <Col xs={16} sm={18}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      marginBottom: 6,
                    }}
                  >
                    {item.name}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    {item.quantity === 1 ? (
                      <Button
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => removeItem(item._id)}
                      />
                    ) : (
                      <Button
                        size="small"
                        icon={<MinusOutlined />}
                        onClick={() =>
                          updateQuantity(item._id, "dec")
                        }
                      />
                    )}

                    <span style={{ fontWeight: 600 }}>
                      {item.quantity}
                    </span>

                    <Button
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={() =>
                        updateQuantity(item._id, "inc")
                      }
                    />
                  </div>

                  <div style={{ fontWeight: 600 }}>
                    Total: ₹ {item.price * item.quantity}
                  </div>
                </Col>
              </Row>
            </div>
          ))}

          <Divider />

          <Row justify="space-between" style={{ marginBottom: 16 }}>
            <Col>
              <strong>Subtotal</strong>
            </Col>
            <Col>
              <strong>₹ {subtotal}</strong>
            </Col>
          </Row>

          <Button
            type="primary"
            block
            size="large"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Drawer>
  );
}
  