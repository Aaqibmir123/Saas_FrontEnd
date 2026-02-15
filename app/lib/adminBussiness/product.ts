const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createProduct = async (formData: FormData) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create product");
  }

  return data;
};

export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
) => {
  const token = localStorage.getItem("accessToken");

  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
  });

  const response = await fetch(
    `${API_URL}/products?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }

  return data;
};

export const updateProduct = async (id: string, formData: FormData) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      // ⚠ DO NOT set Content-Type manually when using FormData
    },
    credentials: "include",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update product");
  }

  return data;
};


export const deleteProduct = async (id: string) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete product");
  }

  return data;
};
