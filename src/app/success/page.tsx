import Link from "next/link";
import { Check } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="max-w-xl mx-auto text-center space-y-6">
      <div className="h-16 w-16 mx-auto rounded-full bg-green-100 text-green-700 flex items-center justify-center">
        <Check className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900">Pembayaran dimulai</h1>
      <p className="text-slate-600">
        Terima kasih atas pesanan Anda. Jika jendela pembayaran tertutup, buka
        kembali melalui tautan di email konfirmasi.
      </p>
      <div className="flex justify-center gap-3">
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800"
        >
          Lanjut belanja
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-900 hover:border-slate-900"
        >
          Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
