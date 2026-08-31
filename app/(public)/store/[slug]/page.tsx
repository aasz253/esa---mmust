import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Shirt, CheckCircle2 } from "lucide-react";
import { getProduct } from "@/lib/data";
import { getProducts } from "@/lib/data";
import { formatKsh } from "@/lib/utils";
import { BuyPanel } from "@/components/store/BuyPanel";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";
import { PageScene3D } from "@/components/hero/PageScene3D";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const related = (await getProducts()).filter((p) => p.id !== product.id).slice(0, 4);

  const cardData: ProductCardData = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category,
    price: product.price,
    image: product.image,
    stock: product.stock,
    description: product.description,
    sizes: product.sizes,
  };

  return (
    <div className="relative overflow-hidden pt-32 pb-20">
      <PageScene3D variant="product" className="h-80" />
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-white/70 via-white/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Link
          href="/store"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#4d6a92] hover:text-[#0f2a4a]"
        >
          <ArrowLeft size={16} /> Back to store
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="glass-strong overflow-hidden rounded-3xl p-6">
            <div className="flex h-96 items-center justify-center overflow-hidden rounded-2xl bg-[#e2edff]">
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Shirt size={80} className="text-[#9db0cd]" />
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0a55c7]">
              {product.category}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-[#0f2a4a] sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 leading-relaxed text-[#4d6a92]">
              {product.description}
            </p>

            <div className="mt-8 rounded-3xl border border-[#d4e2fa] bg-[#eaf2ff] p-6">
              <BuyPanel
                id={product.id}
                name={product.name}
                price={product.price ?? 0}
                image={product.image}
                sizes={product.sizes || ""}
                colors={product.colors || ""}
                inStock={product.stock > 0}
              />
            </div>

            <div className="mt-6 space-y-2 text-sm text-[#4d6a92]">
              <p className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#0a55c7]" />
                Official ESA merchandise
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#0a55c7]" />
                Order and collection arranged via ESA
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold text-[#0f2a4a]">
              You might also like
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={{
                    id: p.id,
                    name: p.name,
                    slug: p.slug,
                    category: p.category,
                    price: p.price,
                    image: p.image,
                    stock: p.stock,
                    description: p.description,
                    sizes: p.sizes,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
