"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { getAdminOrders } from "../../../src/lib/api";
import { Order } from "../../../src/lib/types";
import Link from "next/link";

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    const load = async () => {
      try {
        const data = await getAdminOrders();
        setOrders(data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  function statusBadge(status: string) {
    const colors: any = {
      PAID: "bg-green-100 text-green-700",
      PENDING: "bg-yellow-100 text-yellow-700",
      CANCEL: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          colors[status] || "bg-slate-100 text-slate-700"
        }`}
      >
        {status}
      </span>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-500">
          Admin
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
        <p className="text-slate-600">Monitor order status in real time.</p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-600">Loading orders...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-600 uppercase tracking-wide text-xs">
              <tr>
                <th className="px-4 py-3">Order Code</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {order.order_code}
                  </td>

                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">
                      {order.customer_name}
                    </p>
                    <p className="text-slate-500">{order.customer_email}</p>
                  </td>

                  <td className="px-4 py-3">{statusBadge(order.status)}</td>

                  <td className="px-4 py-3 font-semibold text-slate-900">
                    Rp {order.total_amount.toLocaleString()}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {order.created_at
                      ? dayjs(order.created_at).format("DD MMM YYYY, HH:mm")
                      : "-"}
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-blue-600 underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <p className="text-center text-slate-600 py-6">No orders yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
