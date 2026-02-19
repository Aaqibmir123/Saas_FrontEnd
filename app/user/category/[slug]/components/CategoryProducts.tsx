"use client";

import { useEffect, useState, useCallback } from "react";
import { Row, Col, Card, Spin, Image, Button } from "antd";
import { useRouter } from "next/navigation";
import { getProductsByCategory } from "../../../../lib/user/catagory";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export default function CategoryProducts({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);

  const { addToCart, cart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory(slug);
        setProducts(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  /* ================= ADD TO CART ================= */
  const handleAddToCart = useCallback(
    async (product: Product) => {
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        setAddingId(product._id);
        await addToCart({ ...product, quantity: 1 });
      } finally {
        setAddingId(null);
      }
    },
    [user, addToCart, router],
  );

  if (loading) {
    return (
      <Row justify="center" style={{ padding: 80 }}>
        <Spin size="large" />
      </Row>
    );
  }

  return (
    <div >
      <Row gutter={[28, 36]}>
        {products.map((product) => {
          const imageUrl = product.image
            ? `${IMAGE_BASE_URL}${product.image}`
            : "/placeholder.jpg";

          const inCart = cart.find((item) => item._id === product._id);

          return (
            <Col
              key={product._id}
              xs={12} // 📱 Mobile 2 per row
              sm={12}
              md={8} // Tablet 3 per row
              lg={6} // Desktop 4 per row
            >
              <Card
                hoverable
                variant="borderless"
                style={{
                  borderRadius: 22,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
                  overflow: "hidden",
                  height: "100%",
                }}
                styles={{
                  body: {
                    padding: 22,
                  },
                }}
                cover={
                  <div
                    style={{
                      height: 260, // better balanced height
                      overflow: "hidden",
                      background: "#f2f2f2",
                      display: "block", // 🔥 IMPORTANT
                      lineHeight: 0, // 🔥 remove inline gap
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block", // 🔥 VERY IMPORTANT
                      }}

                    />
                  </div>
                }
              >
                {/* PRODUCT NAME */}
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    marginBottom: 8,
                  }}
                >
                  {product.name}
                </div>

                {/* DESCRIPTION */}
                <div
                  style={{
                    fontSize: 13,
                    color: "#777",
                    marginBottom: 18,
                    minHeight: 40,
                    lineHeight: "18px",
                  }}
                >
                  {product.description?.length > 60
                    ? product.description.slice(0, 60) + "..."
                    : product.description}
                </div>

                {/* PRICE + BUTTON */}
                <Row justify="space-between" align="middle">
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#111",
                    }}
                  >
                    ₹{product.price}
                  </div>

                  <Button
                    type="default"
                    shape="round"
                    disabled={!!inCart || product.stock === 0}
                    loading={addingId === product._id}
                    style={{
                      borderColor: "#111",
                      color: "#111",
                      padding: "0 26px",
                      height: 36,
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    {product.stock === 0
                      ? "Sold Out"
                      : inCart
                        ? "Added"
                        : "Add"}
                  </Button>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
