"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, publicApi } from "@/lib/api";
import { Product } from "@/lib/types";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = Number(params.id);

  const [form, setForm] = useState<Partial<Product>>({});
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
        const products = await publicApi.listProducts();
        const current = products.find((p) => p.id === id);
        if (!current) {
          setError("Product not found");
          return;
        }
        setForm(current);
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await adminApi.updateProduct(id, form);
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-500">Admin</p>
        <h1 className="text-3xl font-bold text-slate-900">Edit Product</h1>
        <p className="text-slate-600">Perbarui detail produk.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="space-y-1 text-sm font-medium text-slate-700">
            Name
            <input
              className="border p-2 w-full"
              required
              value={form.name || ""}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </label>

          <label className="space-y-1 text-sm font-medium text-slate-700">
            Slug
            <input
              className="border p-2 w-full"
              required
              value={form.slug || ""}
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
            value={form.price ?? 0}
            onChange={(e) =>
              setForm((f) => ({ ...f, price: Number(e.target.value) }))
            }
          />
        </label>

        <label className="space-y-1 text-sm font-medium text-slate-700">
          Image URL
          <input
            className="border p-2 w-full"
            value={form.image_url || ""}
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
            value={form.description || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />
        </label>

        <label className="space-y-1 text-sm font-medium text-slate-700">
          Stock
          <input
            type="number"
            className="border p-2 w-full"
            value={form.stock ?? 0}
            onChange={(e) =>
              setForm((f) => ({ ...f, stock: Number(e.target.value) }))
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
          {loading ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
