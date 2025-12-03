"use client";

// import CardMetric from "@/components/admin/card-metric";
import CardMetric from "./card-metric";
import { useEffect, useState } from "react";
import { getProducts, getAdminOrders } from "../lib/api";

export default function AdminDashboard() {
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [sales, setSales] = useState(0);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const p = await getProducts();
    setProducts(p.length);

    const o = await getAdminOrders();
    setOrders(o.length);

    const total = o
      .filter((x) => x.status === "PAID")
      .reduce((sum, x) => sum + x.total_amount, 0);

    setSales(total);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <CardMetric title="Products" value={products} />
        <CardMetric title="Orders" value={orders} />
        <CardMetric title="Total Sales" value={`Rp ${sales.toLocaleString()}`} />
      </div>
    </div>
  );
}
