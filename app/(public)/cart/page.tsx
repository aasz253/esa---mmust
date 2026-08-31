"use client";
import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatKsh } from "@/lib/utils";
import { whatsappLink } from "@/config/site";
import { PageScene3D } from "@/components/hero/PageScene3D";

export default function CartPage() {
  const { items, removeItem, updateQty, total, setOpen } = useCart();

  const orderMessage = () => {
    const lines = items.map(
      (i) =>
        `${i.quantity} x ${i.name}${i.size ? ` (${i.size})` : ""} — ${formatKsh(
          i.price * i.quantity
        )}`
    );
    return [
      "Hello ESA MMUST, I would like to place an order:",
      ...lines,
      `Total: ${formatKsh(total)}`,
      "My name and delivery details: ",
    ].join("\n");
  };

  if (items.length === 0) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
        <PageScene3D variant="cart" className="opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/10 to-white" />
        <div className="relative z-10 text-center">
          <ShoppingBag size={48} className="mx-auto text-[#93a7c4]" />
          <h1 className="mt-4 font-display text-2xl font-bold text-[#0f2a4a]">
            Your cart is empty.
          </h1>
          <p className="mt-2 text-[#5b7394]">
            Discover something worth taking home.
          </p>
          <Link
            href="/store"
            className="mt-6 inline-block rounded-full bg-[#0047ab] px-7 py-3 font-semibold text-[#0f2a4a] hover:bg-[#1a6fd4]"
          >
            Explore the Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden pt-28 pb-20">
      <PageScene3D variant="cart" className="h-72" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white/70 via-white/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-[#0f2a4a]">
          <ShoppingBag size={26} className="text-[#0a55c7]" /> Your Cart
        </h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((i) => (
              <div
                key={`${i.id}|${i.size}|${i.color}`}
                className="glass flex items-center gap-4 rounded-2xl p-4"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e2edff]">
                  {i.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                  ) : (
                    <ShoppingBag size={28} className="text-[#0a55c7]" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#0f2a4a]">{i.name}</p>
                  {i.size && (
                    <p className="text-xs text-[#6b84a8]">Size: {i.size}</p>
                  )}
                  <p className="text-sm text-[#4d6a92]">
                    {formatKsh(i.price)} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(i.id, i.quantity - 1, i.size, i.color)}
                    className="rounded-lg bg-[#e2edff] p-1.5 hover:bg-[#d5e3ff]"
                    aria-label="Decrease"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-sm text-[#0f2a4a]">
                    {i.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(i.id, i.quantity + 1, i.size, i.color)}
                    className="rounded-lg bg-[#e2edff] p-1.5 hover:bg-[#d5e3ff]"
                    aria-label="Increase"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="w-20 text-right">
                  <p className="font-semibold text-[#0f2a4a]">
                    {formatKsh(i.price * i.quantity)}
                  </p>
                  <button
                    onClick={() => removeItem(i.id, i.size, i.color)}
                    className="mt-1 text-[#6b84a8] hover:text-red-400"
                    aria-label="Remove"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-strong h-fit rounded-2xl p-6">
            <h2 className="font-display text-lg font-bold text-[#0f2a4a]">Summary</h2>
            <div className="mt-4 flex justify-between text-sm text-[#4d6a92]">
              <span>Items</span>
              <span>{items.length}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-[#d4e2fa] pt-3">
              <span className="text-[#0f2a4a]">Subtotal</span>
              <span className="font-display text-xl font-bold text-[#0f2a4a]">
                {formatKsh(total)}
              </span>
            </div>
            <a
              href={whatsappLink(orderMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center rounded-full bg-[#25D366] py-3 font-semibold text-[#0f2a4a] transition hover:brightness-110"
            >
              Order via WhatsApp
            </a>
            <button
              onClick={() => setOpen(true)}
              className="mt-2 w-full rounded-full border border-[#cadcf8] bg-[#eaf2ff] py-3 text-sm font-medium text-[#3d5c87] transition hover:bg-[#e2edff]"
            >
              View Cart Drawer
            </button>
            <Link
              href="/store"
              className="mt-2 block text-center text-sm text-[#0a55c7] hover:underline"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
