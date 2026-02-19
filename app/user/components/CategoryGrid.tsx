"use client";

import { Row, Col, Card, Typography } from "antd";
import Link from "next/link";

const { Title } = Typography;

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3c7e05c7",
  },
  {
    name: "Fashion",
    slug: "fashion",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  },
  {
    name: "Grocery",
    slug: "grocery",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2c9c",
  },
  {
    name: "Beauty",
    slug: "beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
  },
  {
    name: "Hardware",
    slug: "hardware",
    image: "https://images.unsplash.com/photo-1581092588429-5c1f29f3e7b7",
  },
  {
    name: "Optical",
    slug: "optical",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969",
  },
];

export default function CategoryGrid() {
  return (
    <div
      style={{
        padding: "60px 0",
        background: "#f9fafb",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <Title level={2} style={{ fontWeight: 700 }}>
          Shop by Categories
        </Title>
      </div>

      <Row gutter={[24, 24]}>
        {categories.map((cat) => (
          <Col xs={24} sm={12} md={8} lg={6} key={cat.slug}>
            <Link href={`/user/category/${cat.slug}`}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                cover={
                  <div style={{ height: 160, overflow: "hidden" }}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                }
              >
                {cat.name}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
