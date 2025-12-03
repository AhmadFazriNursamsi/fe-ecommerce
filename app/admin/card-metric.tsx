export default function CardMetric({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="border bg-white p-6 rounded-xl shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
