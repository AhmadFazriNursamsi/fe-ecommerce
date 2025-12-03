import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="max-w-xl mx-auto text-center space-y-6">
      <div className="h-16 w-16 mx-auto rounded-full bg-green-100 text-green-700 flex items-center justify-center text-2xl font-bold">
        ✓
      </div>
      <h1 className="text-3xl font-bold text-slate-900">Payment initiated</h1>
      <p className="text-slate-600">
        Thanks for your purchase. If you closed the payment window, you can
        resume it from the confirmation email sent to you.
      </p>
      <div className="flex justify-center gap-3">
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800"
        >
          Continue shopping
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-900 hover:border-slate-900"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
