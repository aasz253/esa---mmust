"use client";
import { useMemo, useState } from "react";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";

type Props = {
  products: (ProductCardData & { featured: boolean })[];
};

export function StoreGrid({ products }: Props) {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) => category === "All" || p.category === category
    );
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "price-desc":
        list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.featured) - Number(a.featured)
        );
    }
    return list;
  }, [products, category, sort, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === c
                  ? "bg-[#0047ab] text-[#0f2a4a]"
                  : "border border-[#cadcf8] bg-[#eaf2ff] text-[#3d5c87] hover:bg-[#e2edff]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-48 rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-2 text-sm text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
            aria-label="Search products"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-3 py-2 text-sm text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-[#d4e2fa] bg-[#eaf2ff] py-16 text-center">
          <p className="font-display text-xl text-[#0f2a4a]">
            No products found.
          </p>
          <p className="mt-2 text-[#5b7394]">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
