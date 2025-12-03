"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { deleteAdminProduct, getProducts } from "@/lib/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  async function load() {
    const data = await getProducts();
    setProducts(data);
  }

  async function remove(id: number) {
    if (!confirm("Yakin hapus produk ini?")) return;
    await deleteAdminProduct(id);
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <Link
          href="/admin/products/create"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Product
        </Link>
      </div>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">Rp {Number(p.price).toLocaleString()}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2 flex gap-3">
                <Link
                  href={`/admin/products/${p.id}`}
                  className="text-blue-600 underline"
                >
                  Edit
                </Link>
                <button
                  className="text-red-600 underline"
                  onClick={() => remove(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
