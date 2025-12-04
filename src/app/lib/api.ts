import axios from "axios";
import { Order, Product } from "./types";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8181/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (
    typeof window !== "undefined" &&
    config.url &&
    config.url.startsWith("/admin")
  ) {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/products");
  return data;
}
export async function getAdminProducts() {
  const { data } = await api.get("/admin/products");
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${slug}`);
  return data;
}

export async function submitCheckout(payload: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  items: { product_id: number; qty: number }[];
}): Promise<{
  order: Order;
  payment_url: string;
  snap_token: string;
}> {
  const { data } = await api.post("/checkout", payload);
  return data;
}

// export async function adminLogin(payload: {
//   email: string;
//   password: string;
// }): Promise<{ token: string }> {
//   const { data } = await api.post("/admin/login", payload);
//   return data;
// }
export const adminLogin = async (form: { email: string; password: string }) => {
  const res = await api.post("/admin/login", {
    email: form.email,
    password: form.password,
  });
  return res.data;
};

export async function getAdminOrders(): Promise<Order[]> {
  const { data } = await api.get<Order[]>("/admin/orders");
  return data;
}

export async function createAdminProduct(payload: Partial<Product>) {
  const { data } = await api.post("/admin/products", payload);
  return data;
}

export async function updateAdminProduct(
  id: number,
  payload: Partial<Product>
) {
  const { data } = await api.put(`/admin/products/${id}`, payload);
  return data;
}

export async function deleteAdminProduct(id: number) {
  const { data } = await api.delete(`/admin/products/${id}`);
  return data;
}
