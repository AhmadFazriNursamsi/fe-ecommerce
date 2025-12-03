"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";

export default function AdminOrderDetail({ params }: any) {
  const router = useRouter();
  const id = params.id;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
            },
          }
        );

        const json = await res.json();
        setOrder(json);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, router]);

  function badge(status: string) {
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

  if (loading) return <p className="p-6">Loading detail...</p>;
  if (!order) return <p className="p-6">Order not found.</p>;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-slate-600">
        <Link href="/admin/orders" className="text-blue-600 underline">
          Orders
        </Link>{" "}
        / {order.order_code}
      </div>

      {/* Title */}
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-500">
          Order Detail
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          {order.order_code}
        </h1>
      </div>

      {/* Order Summary Card */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Status</p>
            {badge(order.status)}
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
              {dayjs(order.created_at).format("DD MMM YYYY, HH:mm")}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Payment Type</p>
            <p className="text-slate-700">{order.payment_type || "-"}</p>
          </div>
        </div>
      </div>

      {/* Customer Info */}
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

      {/* Order Items */}
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
            {order.items?.map((item: any) => (
              <tr key={item.id}>
                <td className="px-4 py-3 font-medium">{item.product_name}</td>
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

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => router.refresh()}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg"
        >
          Refresh
        </button>

        {order.status !== "PAID" && (
          <button
            onClick={() => alert("Mark PAID API belum dibuat")}
            className="px-4 py-2 bg-green-700 text-white rounded-lg"
          >
            Mark as PAID
          </button>
        )}

        {order.status !== "CANCEL" && (
          <button
            onClick={() => alert("Mark CANCEL API belum dibuat")}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Mark as CANCEL
          </button>
        )}
      </div>
    </div>
  );
}
