"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAdminProducts, deleteAdminProduct } from "../../lib/api";
import { Product } from "../../lib/types";
import { useRouter } from "next/navigation";

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    async function load() {
      setLoading(true);
      const data = await getAdminProducts();
      setProducts(data);
      setLoading(false);
    }

    load();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>

      <Link
        href="/admin/products/new"
        className="px-4 py-2 bg-slate-900 text-white rounded"
      >
        + New Product
      </Link>

      <table className="w-full text-sm mt-4 bg-white shadow rounded">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t hover:bg-slate-50">
              <td className="p-3 font-medium">{p.name}</td>
              <td className="p-3">Rp {p.price.toLocaleString()}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3 space-x-4">
                <Link href={`/admin/products/${p.id}`} className="text-blue-600">
                  Edit
                </Link>

                <button
                  className="text-red-600"
                  onClick={async () => {
                    if (confirm("Delete this product?")) {
                      await deleteAdminProduct(p.id);
                      setProducts(products.filter((x) => x.id !== p.id));
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <p className="py-8 text-center text-slate-500">No products yet.</p>
      )}
    </div>
  );
}
