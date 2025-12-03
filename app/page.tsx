import Link from "next/link";
// import ProductCard from "./product-card";
// import { getProducts } from "../src/lib/api";
// import ProductCard from "./components/product-card";
import ProductCard from "./components/product-card";
import { getProducts } from "./lib/api";
export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="space-y-12">
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
            Fresh drops • Secure checkout
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            Elevate your everyday with thoughtfully curated products.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Discover essentials and statement pieces selected for quality,
            durability, and design. Built on a fast, modern Next.js 14 stack.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-6 py-3 font-semibold hover:bg-slate-800"
            >
              Browse products
            </Link>
            <Link
              href="/cart"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-900 hover:border-slate-900"
            >
              View cart
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-accent/20 blur-3xl rounded-full" />
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-100 shadow-floating">
            <img
              src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=900&q=80"
              alt="Store hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">
              Featured
            </p>
            <h2 className="text-2xl font-bold text-slate-900">
              Latest arrivals
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
