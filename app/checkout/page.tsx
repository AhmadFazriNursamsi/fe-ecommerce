"use client";

import { FormEvent, useState } from "react";
import { submitCheckout } from "../../src/lib/api";
import { useCartStore } from "../../src/lib/cart-store";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Add items to your cart before checking out.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        items: items.map((item) => ({
          product_id: item.id,
          qty: item.qty
        }))
      };
      const data = await submitCheckout(payload);
      clear();
      window.location.href = data.payment_url;
    } catch (err: any) {
      setError(err?.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Checkout
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Secure payment</h1>
          <p className="text-slate-600">
            Enter your details and you’ll be redirected to payment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <label className="space-y-1 text-sm font-medium text-slate-700">
              Full name
              <input
                required
                value={form.customer_name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customer_name: e.target.value }))
                }
                placeholder="John Doe"
              />
            </label>
            <label className="space-y-1 text-sm font-medium text-slate-700">
              Email
              <input
                required
                type="email"
                value={form.customer_email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customer_email: e.target.value }))
                }
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="space-y-1 text-sm font-medium text-slate-700">
            Phone number
            <input
              required
              value={form.customer_phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, customer_phone: e.target.value }))
              }
              placeholder="+62..."
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-700">
            Shipping address
            <textarea
              required
              rows={4}
              value={form.customer_address}
              onChange={(e) =>
                setForm((f) => ({ ...f, customer_address: e.target.value }))
              }
              placeholder="Street, city, country"
            />
          </label>
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full justify-center rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Processing..." : "Pay now"}
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-floating space-y-4 h-fit">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Items</p>
          <p className="text-sm font-semibold text-slate-900">{items.length}</p>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{item.name}</p>
                <p className="text-slate-500">
                  {item.qty} × Rp {item.price.toLocaleString()}
                </p>
              </div>
              <p className="font-semibold text-slate-900">
                Rp {(item.price * item.qty).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
          <p className="font-semibold text-slate-700">Total</p>
          <p className="text-xl font-bold text-slate-900">
            Rp {total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
