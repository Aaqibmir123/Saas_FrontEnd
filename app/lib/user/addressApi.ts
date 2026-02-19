const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ================= GET ADDRESS ================= */
export const getUserAddress = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API_URL}/user/address`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch address");
    }

    const data = await response.json();
    return data; // ✅ IMPORTANT
  } catch (error) {
    console.error("Get address error:", error);
    throw error;
  }
};

/* ================= SAVE / UPDATE ADDRESS ================= */
export const saveUserAddress = async (data: {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API_URL}/user/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    

    if (!response.ok) {
      throw new Error("Failed to save address");
    }

    return await response.json();
  } catch (error) {
    console.error("Save address error:", error);
    throw error;
  }
};
