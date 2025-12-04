"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/cart-store";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const add = useCartStore((state) => state.add);

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-floating transition overflow-hidden flex flex-col">
      <Link href={`/products/${product.slug}`} className="relative">
        <div className="h-56 w-full overflow-hidden bg-slate-100">
          <img
            src={product.image_url || "https://via.placeholder.com/600x400?text=Product"}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2">
            {product.description}
          </p>
          <p className="text-xl font-bold text-slate-900">
            Rp {product.price.toLocaleString()}
          </p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button
          onClick={() => add(product, 1)}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white py-3 font-medium hover:bg-slate-800 transition"
        >
          <ShoppingCart size={18} />
          Add to cart
        </button>
      </div>
    </div>
  );
}
