"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import { updateAdminProduct } from "@/lib/api";

export default function EditProductPage({ params }: any) {
  console.log("PARAMS:", params);
  console.log("ID:", params.id);

  const router = useRouter();
  const id = Number(params.id);

  const [form, setForm] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  async function load() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      }
    );
    const json = await res.json();
    setForm(json);
    setLoading(false);
  }
  load();
}, [id]);


  const update = async () => {
    await updateAdminProduct(id, form);
    alert("Updated!");
    router.push("/admin/products");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-4 max-w-lg">
      <h1 className="text-xl font-bold">Edit Product</h1>

      <input
        className="border p-2 w-full"
        placeholder="Name"
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={form.description || ""}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="number"
        className="border p-2 w-full"
        placeholder="Price"
        value={form.price || ""}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
      />

      <input
        type="number"
        className="border p-2 w-full"
        placeholder="Stock"
        value={form.stock || ""}
        onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
      />

      <input
        className="border p-2 w-full"
        placeholder="Image URL"
        value={form.image_url || ""}
        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
      />

      <button
        onClick={update}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
