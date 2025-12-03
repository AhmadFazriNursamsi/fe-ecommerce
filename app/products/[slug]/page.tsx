import AddToCart from "../../../src/components/add-to-cart";
import { getProductBySlug } from "../../../src/lib/api";

type Props = {
  params: { slug: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-floating">
        <img
          src={product.image_url || "https://via.placeholder.com/900x700"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Product detail
          </p>
          <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
        </div>
        <p className="text-slate-700 leading-relaxed">{product.description}</p>
        <p className="text-3xl font-bold text-slate-900">
          Rp {product.price.toLocaleString()}
        </p>
        <AddToCart product={product} />
      </div>
    </div>
  );
}
