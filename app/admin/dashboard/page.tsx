"use client";

import { useEffect, useState } from "react";
import { Row, Col, Card, Spin, Typography, Tag } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const { Title } = Typography;

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const COLORS = ["#1890ff", "#52c41a", "#faad14", "#f5222d"];

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  console.log("Dashboard data:", data);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(`${API_URL}/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (result.success) {
        setData(result.data);
      }
    } catch (err) {
      console.error("Dashboard fetch error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading || !data) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  // Frontend calculated AOV
  const averageOrderValue =
    data.deliveredOrders > 0
      ? (data.totalRevenue / data.deliveredOrders).toFixed(2)
      : 0;

  return (
    <div style={{ padding: 24, background: "#f5f7fa", minHeight: "100vh" }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Admin Dashboard
      </Title>

      {/* ================= STAT CARDS ================= */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card
            variant="borderless"
            style={{
              borderRadius: 16,
              background: "linear-gradient(135deg, #1677ff, #69b1ff)",
              color: "#fff",
            }}
          >
            <Title level={5} style={{ color: "#fff" }}>
              Total Orders
            </Title>
            <Title level={2} style={{ color: "#fff", margin: 0 }}>
              {data.totalOrders}
            </Title>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            variant="borderless"
            style={{
              borderRadius: 16,
              background: "linear-gradient(135deg, #13c2c2, #36cfc9)",
              color: "#fff",
            }}
          >
            <Title level={5} style={{ color: "#fff" }}>
              Delivered
            </Title>
            <Title level={2} style={{ color: "#fff", margin: 0 }}>
              {data.deliveredOrders}
            </Title>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            variant="borderless"
            style={{
              borderRadius: 16,
              background: "linear-gradient(135deg, #722ed1, #b37feb)",
              color: "#fff",
            }}
          >
            <Title level={5} style={{ color: "#fff" }}>
              Total Revenue
            </Title>
            <Title level={2} style={{ color: "#fff", margin: 0 }}>
              ₹{Number(data.totalRevenue).toLocaleString()}
            </Title>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            variant="borderless"
            style={{
              borderRadius: 16,
              background: "linear-gradient(135deg, #fa8c16, #ffc069)",
              color: "#fff",
            }}
          >
            <Title level={5} style={{ color: "#fff" }}>
              Avg Order Value
            </Title>
            <Title level={2} style={{ color: "#fff", margin: 0 }}>
              ₹{Number(averageOrderValue).toLocaleString()}
            </Title>
          </Card>
        </Col>
      </Row>

      {/* ================= LOW STOCK ALERT ================= */}
      {data.lowStockProducts && data.lowStockProducts.length > 0 && (
        <Row style={{ marginBottom: 24 }}>
          <Col span={24}>
            <Card
              style={{
                borderRadius: 12,
                background: "#fff2f0",
                border: "1px solid #ffccc7",
              }}
            >
              <Title level={5} style={{ color: "#cf1322" }}>
                ⚠ {data.lowStockProducts.length} Products Running Low
              </Title>

              {data.lowStockProducts.map((product: any) => (
                <Tag
                  key={product._id}
                  color={product.stock === 0 ? "red" : "orange"}
                  style={{ marginBottom: 8 }}
                >
                  {product.name} —{" "}
                  {product.stock === 0
                    ? "Out of Stock"
                    : `Stock: ${product.stock}`}
                </Tag>
              ))}
            </Card>
          </Col>
        </Row>
      )}

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Last 7 Days Revenue" style={{ borderRadius: 12 }}>
            {data.weeklyRevenue?.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.weeklyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="total"
                    fill="#722ed1"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ padding: 40, textAlign: "center" }}>
                No revenue data available
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Order Status" style={{ borderRadius: 12 }}>
            {data.statusStats?.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data.statusStats}
                      dataKey="value"
                      nameKey="_id"
                      outerRadius={80}
                      label
                    >
                      {data.statusStats.map((_: any, index: number) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div style={{ marginTop: 20 }}>
                  {data.statusStats.map((item: any, index: number) => (
                    <Tag
                      key={index}
                      color={COLORS[index % COLORS.length]}
                      style={{ marginBottom: 8 }}
                    >
                      {item._id} : {item.value}
                    </Tag>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ padding: 40, textAlign: "center" }}>
                No order status data
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
