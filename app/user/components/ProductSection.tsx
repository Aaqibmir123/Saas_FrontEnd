"use client";

import { Row, Col, Card, Button, Typography } from "antd";
import Image from "next/image";

const { Title, Text } = Typography;

interface Props {
  title: string;
}

const dummyProducts = [
  {
    name: "Wireless Headphones",
    price: 120,
    image: "https://images.unsplash.com/photo-1518441902111-a9b4d8f3d4b2",
  },
  {
    name: "Smart Watch",
    price: 89,
    image: "https://images.unsplash.com/photo-1511732351661-79d4f9f1b4b2",
  },
  {
    name: "Running Shoes",
    price: 65,
    image: "https://images.unsplash.com/photo-1528701800489-20be3c6a6c1e",
  },
  {
    name: "Organic Grocery Pack",
    price: 40,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },
  {
    name: "Kitchen Blender",
    price: 75,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    name: "Sunglasses",
    price: 55,
    image: "https://images.unsplash.com/photo-1511497584788-876760111969",
  },
];

export default function ProductSection({ title }: Props) {
  return (
    <div style={{ padding: "60px 0" }}>
      <Title level={2} style={{ marginBottom: 40, fontWeight: 700 }}>
        {title}
      </Title>

      <Row gutter={[24, 24]}>
        {dummyProducts.map((product, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              style={{
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
              }}
              cover={
                <div
                  style={{
                    position: "relative",
                    height: 220,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.08)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
              }
            >
              <Text
                strong
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontSize: 16,
                }}
              >
                {product.name}
              </Text>

              <Title level={4} style={{ margin: 0 }}>
                ${product.price}
              </Title>

              <Button
                type="primary"
                block
                style={{
                  marginTop: 16,
                  borderRadius: 6,
                  fontWeight: 500,
                }}
              >
                Add to Cart
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
