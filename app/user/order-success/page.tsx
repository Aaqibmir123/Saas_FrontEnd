"use client";

import { Result, Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function OrderSuccess() {
  const router = useRouter();
  const { clearCartLocal, refreshCart } = useCart();

  useEffect(() => {
    const handleCartCleanup = async () => {
      // 🔥 instantly clear UI
      clearCartLocal();

      // 🔥 sync backend (safety)
      await refreshCart();
    };

    handleCartCleanup();

    const timer = setTimeout(() => {
      router.push("/user");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, clearCartLocal, refreshCart]);

  return (
    <div style={{ padding: "60px 20px" }}>
      <Result
        status="success"
        title="Order Placed Successfully 🎉"
        subTitle="You will be redirected to home shortly."
        extra={[
          <Button
            type="primary"
            key="home"
            onClick={() => router.push("/user")}
          >
            Go to Home
          </Button>,
        ]}
      />
    </div>
  );
}
