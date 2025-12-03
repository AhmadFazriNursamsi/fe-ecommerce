"use client";

import Link from "next/link";
import CartItemRow from "../../src/components/cart-item";
import { useCartStore } from "../../src/lib/cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Your bag
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Shopping cart</h1>
          <p className="text-slate-600">Review items before checkout.</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Clear cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-800">
            Your cart is empty
          </p>
          <p className="text-slate-500">Discover products to add them here.</p>
          <div className="mt-4">
            <Link
              href="/products"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800"
            >
              Browse products
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-floating h-fit space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Subtotal</p>
              <p className="text-lg font-semibold">
                Rp {subtotal.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-slate-500">
              Taxes and shipping calculated at checkout.
            </p>
            <Link
              href="/checkout"
              className="inline-flex w-full justify-center rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
