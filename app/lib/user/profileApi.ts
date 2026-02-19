import { fetchWithAuth } from "../fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ================= GET PROFILE ================= */

export const getUserProfile = async () => {
  const res = await fetchWithAuth(`${API_URL}/user/profile`);

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  const data = await res.json();

  // Agar backend { success, user } return karta hai
  return data.user || data;
};

/* ================= UPDATE PROFILE ================= */

export const updateUserProfile = async (formData: FormData) => {
  const res = await fetchWithAuth(`${API_URL}/user/profile`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Profile update failed");
  }

  return res.json();
};
