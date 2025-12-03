"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { adminLogin } from "../../../src/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await adminLogin(form);
      localStorage.setItem("admin_token", data.token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl shadow-floating p-8 space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-wide text-slate-500">
          Admin access
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Sign in</h1>
        <p className="text-slate-600">Use your admin credentials to continue.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="space-y-1 text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="admin@example.com"
          />
        </label>
        <label className="space-y-1 text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            placeholder="********"
          />
        </label>
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex justify-center rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
