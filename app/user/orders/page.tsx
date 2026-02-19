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
} from "antd";
import { getUserOrders } from "@/app/lib/user/orderApi";

const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
          const item = order.items[0]; // first item preview

          return (
            <Col
              key={order._id}
              xs={24}
              sm={12}
              md={8}   // 3 per row desktop
              lg={8}
            >
              <Card
                hoverable
                style={{
                  borderRadius: 14,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                }}
                cover={
                  <Image
                    src={`${IMAGE_BASE_URL}${item.image}`}
                    alt={item.name}
                    preview={false}
                    height={220}
                    style={{
                      objectFit: "cover",
                    }}
                    fallback="/placeholder.jpg"
                  />
                }
              >
                {/* Name */}
                <div style={{ fontWeight: 600, fontSize: 16 }}>
                  Name: {item.name}
                </div>

                {/* Price */}
                <div style={{ marginTop: 6 }}>
                  Price: ₹ {order.totalAmount}
                </div>

                {/* Date */}
                <div style={{ marginTop: 6, fontSize: 13, color: "#666" }}>
                  Date:{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </div>

                {/* Status */}
                <div style={{ marginTop: 8 }}>
                  <Tag color="blue">{order.status}</Tag>
                </div>

                {/* Bottom Row */}
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
