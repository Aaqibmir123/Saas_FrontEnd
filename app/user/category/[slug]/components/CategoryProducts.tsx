"use client";

import { useEffect, useState, useCallback } from "react";
import { Row, Col, Card, Spin, Button } from "antd";
import { useRouter } from "next/navigation";
import { getProductsByCategory } from "../../../../lib/user/catagory";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Product } from "../../../../types/product";
import styles from "./CategoryProducts.module.css";

const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") + "/uploads/";

export default function CategoryProducts({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);

  const { addToCart, cart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory(slug);
        setProducts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

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
    [user, addToCart, router]
  );

  if (loading) {
    return (
      <Row justify="center" className={styles.loader}>
        <Spin size="large" />
      </Row>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Row gutter={[24, 28]}>
        {products.map((product) => {
          const imageUrl = product.image
            ? `${IMAGE_BASE_URL}${product.image}`
            : "/placeholder.jpg";

          const inCart = cart.find((item) => item._id === product._id);

          return (
            <Col key={product._id} xs={12} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className={styles.card}
                cover={
                  <div className={styles.imageWrapper}>
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className={styles.image}
                    />
                  </div>
                }
              >
                <div className={styles.name}>{product.name}</div>

                <div className={styles.description}>
                  {product.description}
                </div>

                <div className={styles.bottomRow}>
                  <div className={styles.price}>₹{product.price}</div>

                  <Button
                    shape="round"
                    disabled={!!inCart || product.stock === 0}
                    loading={addingId === product._id}
                    className={styles.cartBtn}
                    onClick={() => handleAddToCart(product)}
                  >
                    {product.stock === 0
                      ? "Sold Out"
                      : inCart
                      ? "Added"
                      : "Add"}
                  </Button>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
