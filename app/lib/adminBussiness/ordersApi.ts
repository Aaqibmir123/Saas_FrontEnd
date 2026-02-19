const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ✅ GET ALL ORDERS
export const getAdminOrders = async (
  page: number = 1,
  limit: number = 10,
  status?: string
) => {
  let url = `${API_URL}/admin/orders?page=${page}&limit=${limit}`;

  if (status) {
    url += `&status=${status}`;
  }

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin orders");
  }

  return response.json();
};

// ✅ UPDATE STATUS
export const updateOrderStatus = async (
  id: string,
  status: string
) => {
  const response = await fetch(
    `${API_URL}/admin/orders/${id}/status`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update order status");
  }

  return response.json();
};
