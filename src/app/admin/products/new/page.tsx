"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/api";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    description: "",
    image_url: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) router.replace("/admin/login");
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
const payload = {
  ...form,
  price: Number(form.price),   // convert di sini
};

    try {
  const payload = {
    ...form,
    price: Number(form.price),
  };

  await adminApi.createProduct(payload);
  router.push("/admin/products");

} catch (err: any) {
  setError(err?.response?.data?.message || "Failed to create product");
} finally {
  setLoading(false);
}

  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-500">Admin</p>
        <h1 className="text-3xl font-bold text-slate-900">New Product</h1>
        <p className="text-slate-600">Add a product to the catalog.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="space-y-1 text-sm font-medium text-slate-700">
            Name
            <input
              className="border p-2 w-full"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </label>

          <label className="space-y-1 text-sm font-medium text-slate-700">
            Slug
            <input
              className="border p-2 w-full"
              required
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            />
          </label>
        </div>

        <label className="space-y-1 text-sm font-medium text-slate-700">
          Price
          <input
            type="number"
            className="border p-2 w-full"
            required
            value={form.price}
            onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
            }
          />
        </label>

        <label className="space-y-1 text-sm font-medium text-slate-700">
          Image URL
          <input
            className="border p-2 w-full"
            value={form.image_url}
            onChange={(e) =>
              setForm((f) => ({ ...f, image_url: e.target.value }))
            }
            placeholder="https://..."
          />
        </label>

        <label className="space-y-1 text-sm font-medium text-slate-700">
          Description
          <textarea
            rows={4}
            className="border p-2 w-full"
            required
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
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
          className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Create product"}
        </button>
      </form>
    </div>
  );
}
