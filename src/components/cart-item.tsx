"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/lib/types";
import { useCartStore } from "@/lib/cart-store";

type Props = {
  item: CartItem;
};

export default function CartItemRow({ item }: Props) {
  const updateQty = useCartStore((state) => state.updateQty);
  const remove = useCartStore((state) => state.remove);

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <img
        src={item.image_url || "https://via.placeholder.com/150"}
        alt={item.name}
        className="h-20 w-20 rounded-lg object-cover"
      />
      <div className="flex-1 w-full">
        <p className="text-base font-semibold text-slate-900">{item.name}</p>
        <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
        <p className="mt-2 text-lg font-bold text-slate-900">
          Rp {item.price.toLocaleString()}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 hover:border-slate-900"
        >
          <Minus size={16} />
        </button>
        <span className="min-w-[32px] text-center font-semibold">{item.qty}</span>
        <button
          onClick={() => updateQty(item.id, item.qty + 1)}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 hover:border-slate-900"
        >
          <Plus size={16} />
        </button>
      </div>
      <button
        onClick={() => remove(item.id)}
        className="inline-flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-red-700 hover:border-red-300"
      >
        <Trash2 size={16} />
        Remove
      </button>
    </div>
  );
}
