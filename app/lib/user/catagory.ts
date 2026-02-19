const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { Product } from "../../types/product";

export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
    console.log("Fetching products for category:", category);
  const response = await fetch(
    `${API_URL}/user/products?category=${encodeURIComponent(category)}`,
    { credentials: "include" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await response.json();
  return result.data;
};
