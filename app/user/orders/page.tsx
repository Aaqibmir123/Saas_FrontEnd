"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Spin,
  Tag,
  Image,
  Button,
  message,
} from "antd";
import { getUserOrders } from "@/app/lib/user/orderApi";
import { useCart } from "@/context/CartContext";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "";

const IMAGE_BASE_URL = `${API_BASE}/uploads/`;

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ================= REORDER ================= */
  const handleReorder = async (order: any) => {
    try {
      setReorderingId(order._id);

      for (const item of order.items) {
        await addToCart({
          _id: item.product,        // product id
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        });
      }

    } catch (error) {
      console.error(error);
      message.error("Reorder failed");
    } finally {
      setReorderingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "30px 20px" }}>
      <Row gutter={[24, 24]}>
        {orders.map((order) => {
          const item = order.items[0];

          return (
            <Col key={order._id} xs={24} sm={12} md={8} lg={8}>
              <Card
                hoverable
                style={{
                  borderRadius: 14,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                }}
                cover={
                  <Image
                    src={
                      item?.image
                        ? `${IMAGE_BASE_URL}${item.image}`
                        : "/placeholder.jpg"
                    }
                    alt={item?.name}
                    preview={false}
                    height={220}
                    style={{ objectFit: "cover" }}
                  />
                }
              >
                <div style={{ fontWeight: 600, fontSize: 16 }}>
                  {item?.name}
                </div>

                <div style={{ marginTop: 6 }}>
                  Total: ₹ {order.totalAmount}
                </div>

                <div style={{ marginTop: 6, fontSize: 13, color: "#666" }}>
                  {new Date(order.createdAt).toLocaleString()}
                </div>

                <div style={{ marginTop: 8 }}>
                  <Tag color="blue">{order.status}</Tag>
                </div>

                <Row
                  justify="space-between"
                  align="middle"
                  style={{ marginTop: 16 }}
                >
                  <Col style={{ fontSize: 12, color: "#888" }}>
                    Order ID: {order._id.slice(-6)}
                  </Col>

                  <Col>
                    <Button
                      type="primary"
                      size="small"
                      loading={reorderingId === order._id}
                      onClick={() => handleReorder(order)}
                    >
                      Reorder
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}