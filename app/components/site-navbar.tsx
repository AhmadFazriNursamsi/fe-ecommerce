"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingBag, ShoppingCart, X } from "lucide-react";
import { useCartStore } from "../lib/cart-store";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" }
];

export default function SiteNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const count = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-floating">
            <ShoppingBag size={20} />
          </div>
          <span className="tracking-tight">Personal Store</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "hover:text-slate-900 transition-colors",
                pathname === link.href
                  ? "text-slate-900"
                  : "text-slate-500"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin/dashboard"
            className={clsx(
              "rounded-full border px-3 py-1.5 hover:border-slate-900",
              pathname?.startsWith("/admin") ? "border-slate-900 text-slate-900" : "border-slate-200 text-slate-500"
            )}
          >
            Admin
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1.5 shadow-floating"
          >
            <ShoppingCart size={18} />
            <span>Cart</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 h-6 min-w-[24px] rounded-full bg-accent text-slate-900 text-xs font-bold flex items-center justify-center px-1">
                {count}
              </span>
            )}
          </Link>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-slate-200"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-slate-700"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin/dashboard"
            className="block text-slate-700"
            onClick={() => setOpen(false)}
          >
            Admin
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-2 text-slate-700"
            onClick={() => setOpen(false)}
          >
            <ShoppingCart size={18} />
            <span>Cart ({count})</span>
          </Link>
        </div>
      )}
    </header>
  );
}
