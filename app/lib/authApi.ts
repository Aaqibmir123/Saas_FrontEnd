import { UserRole } from "../types/auth.types"; // apne types ka correct path laga dena

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

/* ================================
   Types
================================ */

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  businessName?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

/* ================================
   Response Handler
================================ */

const handleResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

/* ================================
   Auth APIs
================================ */

export const registerUser = async (payload: RegisterPayload) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return await handleResponse(response);
  } catch (error: any) {
    throw new Error(error.message || "Registration failed");
  }
};

export const loginUser = async (payload: LoginPayload) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return await handleResponse(response);
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};
