import axios from "axios";
import { Order, Product } from "./types";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8181/api";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined" && config.url?.startsWith("/admin")) {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const publicApi = {
  async listProducts(): Promise<Product[]> {
    const { data } = await api.get<Product[]>("/products");
    return data;
  },
  async getProduct(slug: string): Promise<Product> {
    const { data } = await api.get<Product>(`/products/${slug}`);
    return data;
  },
  async checkout(payload: {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    items: { product_id: number; qty: number }[];
  }): Promise<{ order: Order; payment_url: string; snap_token: string }> {
    const { data } = await api.post("/checkout", payload);
    return data;
  },
};

export const adminApi = {
  async login(form: { email: string; password: string }) {
    const { data } = await api.post("/admin/login", form);
    return data as { token: string; admin: unknown };
  },
  async listOrders(): Promise<Order[]> {
    const { data } = await api.get<Order[]>("/admin/orders");
    return data;
  },
  async createProduct(payload: Partial<Product>) {
    
    const { data } = await api.post("/admin/products", payload);
    return data;
  },
  async updateProduct(id: number, payload: Partial<Product>) {
    const { data } = await api.put(`/admin/products/${id}`, payload);
    return data;
  },
  async deleteProduct(id: number) {
    const { data } = await api.delete(`/admin/products/${id}`);
    return data;
  },
};
