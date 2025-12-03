"use client";

import { ShoppingCart } from "lucide-react";
import { Product } from "../lib/types";
import { useCartStore } from "../lib/cart-store";

type Props = {
  product: Product;
};

export default function AddToCart({ product }: Props) {
  const add = useCartStore((state) => state.add);

  return (
    <button
      onClick={() => add(product, 1)}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-5 py-3 font-semibold hover:bg-slate-800 shadow-floating"
    >
      <ShoppingCart size={18} />
      Add to cart
    </button>
  );
}
