"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/api";
import { Order } from "@/lib/types";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrderDetail({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    const load = async () => {
      try {
        const all = await adminApi.listOrders();
        const found = all.find((o) => o.id === Number(params.id)) || null;
        setOrder(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [params.id, router]);

  const renderStatus = (status: string) => {
    const key = status.toLowerCase();
    const classes = statusColors[key] || "bg-slate-100 text-slate-700";
    return (
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classes}`}
      >
        {status}
      </span>
    );
  };

  if (loading) return <p className="p-6">Loading detail...</p>;
  if (!order) return <p className="p-6">Order not found.</p>;

  return (
    <div className="space-y-6">
      <div className="text-sm text-slate-600">
        <Link href="/admin/orders" className="text-blue-600 underline">
          Orders
        </Link>{" "}
        / {order.order_code}
      </div>

      <div>
        <p className="text-sm uppercase tracking-wide text-slate-500">
          Order Detail
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          {order.order_code}
        </h1>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Status</p>
            {renderStatus(order.status)}
          </div>

          <div>
            <p className="text-slate-500">Total Amount</p>
            <p className="font-semibold text-slate-900">
              Rp {order.total_amount.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Created At</p>
            <p className="text-slate-700">
              {order.created_at
                ? format(new Date(order.created_at), "dd MMM yyyy, HH:mm")
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Payment URL</p>
            <p className="text-slate-700 break-all">
              {order.payment_url || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold">Customer Information</h2>

        <div className="grid md:grid-cols-2 text-sm gap-4">
          <div>
            <p className="text-slate-500">Name</p>
            <p className="font-medium">{order.customer_name}</p>
          </div>

          <div>
            <p className="text-slate-500">Email</p>
            <p>{order.customer_email}</p>
          </div>

          <div>
            <p className="text-slate-500">Phone</p>
            <p>{order.customer_phone || "-"}</p>
          </div>

          <div>
            <p className="text-slate-500">Address</p>
            <p>{order.customer_address || "-"}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold">Items</h2>

        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Subtotal</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {order.items?.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 font-medium">
                  {item.name || item.product?.name}
                </td>
                <td className="px-4 py-3">{item.qty}</td>
                <td className="px-4 py-3 font-semibold">
                  Rp {item.subtotal.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {order.items?.length === 0 && (
          <p className="text-slate-600 text-center py-4">
            No items in this order.
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => router.refresh()}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
