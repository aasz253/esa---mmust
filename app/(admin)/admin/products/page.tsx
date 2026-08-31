import { prisma } from "@/lib/prisma";
import { createProduct, deleteProduct } from "@/lib/actions";
import { ServerActionForm } from "@/components/ServerActionForm";
import { formatKsh } from "@/lib/utils";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[#0f2a4a]">Merchandise</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-6">
          <h3 className="font-display text-lg font-bold text-[#0f2a4a]">Add Product</h3>
          <ServerActionForm
            action={createProduct}
            submitLabel="Add Product"
            className="mt-4 space-y-3"
          >
            <Input label="Name" name="name" required />
            <Input label="Category" name="category" placeholder="Apparel / Stationery" />
            <Input label="Price (KSh)" name="price" type="number" />
            <Input label="Stock" name="stock" type="number" />
            <Input label="Sizes (comma separated)" name="sizes" placeholder="S,M,L,XL" />
            <Input label="Colors (comma separated)" name="colors" placeholder="Navy, White" />
            <Input label="Image URL" name="image" placeholder="/images/esa-logo.jpg" />
            <label className="block">
              <span className="mb-1 block text-sm text-[#4d6a92]">Description</span>
              <textarea
                name="description"
                rows={3}
                className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-[#4d6a92]">
              <input type="checkbox" name="featured" className="accent-[#3aa0ff]" />
              Featured
            </label>
          </ServerActionForm>
        </div>

        <div className="rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-6">
          <h3 className="font-display text-lg font-bold text-[#0f2a4a]">
            {products.length} Products
          </h3>
          {products.length > 0 ? (
            <ul className="mt-3 max-h-[560px] space-y-2 overflow-y-auto">
              {products.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[#0f2a4a]">
                      {p.featured && (
                        <span className="mr-2 rounded bg-[#f0a500]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#d99a00]">
                          FEATURED
                        </span>
                      )}
                      {p.name}
                    </p>
                    <p className="text-xs text-[#6b84a8]">
                      {p.category} · {formatKsh(p.price)} · stock {p.stock}
                    </p>
                  </div>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={p.id} />
                    <button className="rounded-lg bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/25">
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-[#6b84a8]">No products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({
  name,
  label,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-[#4d6a92]">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
      />
    </label>
  );
}
