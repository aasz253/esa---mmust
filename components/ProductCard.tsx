"use client";
import Link from "next/link";
import { useRef } from "react";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatKsh } from "@/lib/utils";

export type ProductCardData = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number | null;
  image: string | null;
  stock: number;
  description: string;
  sizes?: string | null;
};

export function ProductCard({ product }: { product: ProductCardData }) {
  const ref = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const inStock = product.stock > 0;

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${
      -py * 8
    }deg) translateY(-4px)`;
  }
  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  const size = product.sizes?.split(",")[0] || undefined;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="tilt-card group relative flex flex-col overflow-hidden rounded-2xl border border-[#d4e2fa] bg-gradient-to-b from-white/70 to-transparent"
    >
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <Link
        href={`/store/${product.slug}`}
        className="block p-5"
        aria-label={`View ${product.name}`}
      >
        <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-xl bg-[#e2edff]">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="font-display text-5xl font-bold text-[#a9bad3]">
              ESA
            </span>
          )}
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
              inStock
                ? "bg-[#25D366]/15 text-[#19b95b]"
                : "bg-red-500/15 text-red-400"
            }`}
          >
            {inStock ? "In stock" : "Out of stock"}
          </span>
        </div>
        <div className="mt-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#0a55c7]">
            {product.category}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-[#0f2a4a]">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-[#5b7394]">
            {product.description}
          </p>
          <p className="mt-3 font-display text-xl font-bold text-[#0f2a4a]">
            {formatKsh(product.price)}
          </p>
        </div>
      </Link>
      <div className="mt-auto flex gap-2 p-5 pt-0">
        <button
          disabled={!inStock}
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price ?? 0,
              image: product.image,
              size,
            })
          }
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0047ab] py-2.5 text-sm font-semibold text-[#0f2a4a] transition hover:bg-[#1a6fd4] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ShoppingBag size={16} /> Add to cart
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            `Hello ESA MMUST, I'd like to order: ${product.name} (${formatKsh(
              product.price
            )}).`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-xl border border-[#cadcf8] px-3 text-[#19b95b] transition hover:bg-[#eaf2ff]"
          aria-label={`Order ${product.name} on WhatsApp`}
        >
          <MessageCircle size={18} />
        </a>
      </div>
    </div>
  );
}
