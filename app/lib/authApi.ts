const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("API URL is not defined");
}

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: "customer" | "business_admin";
};

type LoginPayload = {
  email: string;
  password: string;
};

const handleResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const registerUser = async (payload: RegisterPayload) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // important for cookies
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
