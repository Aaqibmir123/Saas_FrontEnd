const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ================= CREATE ORDER ================= */

export const createOrder = async (data: {
  paymentMethod: "COD" | "ONLINE";
  address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
}) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API_URL}/user/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Order failed");
    }

    return result;
  } catch (error) {
    console.error("Create order error:", error);
    throw error;
  }
};

/* ================= GET USER ORDERS ================= */

export const getUserOrders = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API_URL}/user/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch orders");
    }

    return result;
  } catch (error) {
    console.error("Get orders error:", error);
    throw error;
  }
};

