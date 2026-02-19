const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/**
 * ADD TO CART
 */
export const addToCart = async (productId: string, quantity = 1) => {
  console.log("Adding to cart:", { productId, quantity });
  const response = await fetch(`${API_URL}/user/cart`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    throw new Error("Failed to add to cart");
  }

  return response.json();
};

/**
 * GET CART
 */
export const getCartItems = async () => {
  const response = await fetch(`${API_URL}/user/cart`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
};

/**
 * REMOVE FROM CART
 */
export const removeFromCart = async (productId: string) => {
  const response = await fetch(
    `${API_URL}/user/cart/${productId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to remove item");
  }

  return response.json();
};
export const updateCartQuantity = async (
  productId: string,
  quantity: number
) => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/cart/${productId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update quantity");
  }

  return res.json();
};
