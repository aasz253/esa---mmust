import { PageHero } from "@/components/PageHero";
import { StoreGrid } from "@/components/store/StoreGrid";
import { getProducts } from "@/lib/data";

export default async function StorePage() {
  const products = await getProducts();
  return (
    <>
      <PageHero
        tag="ESA Store"
        title="Merchandise &amp; Accessories"
        subtitle="Wear your engineering pride — t-shirts, lab coats, notebooks and more."
        scene="store"
        bgImage="/images/bg/bg-2.jpg"
      />
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6">
          <StoreGrid
            products={products.map((p) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              category: p.category,
              price: p.price,
              image: p.image,
              stock: p.stock,
              description: p.description,
              sizes: p.sizes,
              featured: p.featured,
            }))}
          />
        </div>
      </section>
    </>
  );
}
