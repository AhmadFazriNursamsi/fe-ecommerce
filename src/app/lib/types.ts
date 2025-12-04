export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  image_url?: string;
  stock?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name?: string;
  name?: string;
  product?: Product;
  qty: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: number;
  order_code: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  status: OrderStatus | string;
  total_amount: number;
  created_at: string;
  updated_at?: string;
  items?: OrderItem[];
  payment_url?: string;
  snap_token?: string;
}
