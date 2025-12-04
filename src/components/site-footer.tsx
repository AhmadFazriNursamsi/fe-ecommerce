export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
        <p className="font-medium text-slate-700">Personal Store</p>
        <p>Modern commerce experience built with Next.js 14.</p>
        <p className="text-xs">Crafted for the API at http://localhost:8181/api</p>
      </div>
    </footer>
  );
}
