"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart } from "lucide-react";

const menu = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/admin/products", label: "Products", icon: <Package size={18} /> },
  { href: "/admin/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-64 bg-white border-r p-5 hidden md:block">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg 
              ${
                path === item.href || path.startsWith(`${item.href}/`)
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-gray-200"
              }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
