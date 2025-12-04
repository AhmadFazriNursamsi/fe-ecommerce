"use client";

import { create } from "zustand";
import { CartItem, Product } from "./types";

type CartState = {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  updateQty: (productId: number, qty: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
  getTotalItems: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  add: (product, qty = 1) => {
    const existing = get().items.find((item) => item.id === product.id);
    if (existing) {
      set({
        items: get().items.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        ),
      });
      return;
    }
    set({ items: [...get().items, { ...product, qty }] });
  },
  updateQty: (productId, qty) => {
    const nextQty = Math.max(1, qty);
    set({
      items: get().items.map((item) =>
        item.id === productId ? { ...item, qty: nextQty } : item
      ),
    });
  },
  remove: (productId) => {
    set({ items: get().items.filter((item) => item.id !== productId) });
  },
  clear: () => set({ items: [] }),
  getTotalItems: () =>
    get().items.reduce((total, item) => total + item.qty, 0),
}));
