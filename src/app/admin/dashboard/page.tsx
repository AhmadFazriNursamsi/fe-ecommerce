import Link from "next/link";
import { ClipboardList, PackagePlus, Pencil } from "lucide-react";

export default function AdminDashboardPage() {
  const actions = [
    {
      title: "Manage Orders",
      href: "/admin/orders",
      icon: ClipboardList,
      description: "Lihat dan kelola pesanan pelanggan.",
    },
    {
      title: "Create Product",
      href: "/admin/products/new",
      icon: PackagePlus,
      description: "Tambahkan produk baru ke katalog.",
    },
    {
      title: "Edit Product",
      href: "/admin/products",
      icon: Pencil,
      description: "Perbarui informasi produk yang sudah ada.",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-500">Admin</p>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">
          Akses cepat untuk mengelola toko Anda.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-floating transition"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-slate-900 text-white p-3">
                <action.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">
                  {action.title}
                </h3>
                <p className="text-sm text-slate-600">{action.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900">
                  Buka
                  <span aria-hidden className="transition group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
