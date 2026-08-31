"use client";
import { useState } from "react";
import { ShoppingBag, Plus, Minus, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatKsh } from "@/lib/utils";
import { whatsappLink } from "@/config/site";

type Props = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  sizes: string;
  colors: string;
  inStock: boolean;
};

export function BuyPanel({
  id,
  name,
  price,
  image,
  sizes,
  colors,
  inStock,
}: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>();
  const sizeList = sizes.split(",").map((s) => s.trim()).filter(Boolean);
  const colorList = colors.split(",").map((c) => c.trim()).filter(Boolean);

  return (
    <div className="space-y-5">
      <p className="font-display text-3xl font-bold text-[#0f2a4a]">
        {formatKsh(price)}
      </p>
      <p
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          inStock ? "bg-[#25D366]/15 text-[#19b95b]" : "bg-red-500/15 text-red-400"
        }`}
      >
        {inStock ? "In stock" : "Out of stock"}
      </p>

      {sizeList.length > 0 && (
        <div>
          <p className="mb-2 text-sm text-[#4d6a92]">Size</p>
          <div className="flex flex-wrap gap-2">
            {sizeList.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-xl border px-4 py-2 text-sm transition ${
                  size === s
                    ? "border-[#3aa0ff] bg-[#0a55c7]/10 text-[#0f2a4a]"
                    : "border-[#cadcf8] bg-[#eaf2ff] text-[#3d5c87]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {colorList.length > 0 && (
        <div>
          <p className="mb-2 text-sm text-[#4d6a92]">Color</p>
          <div className="flex flex-wrap gap-2">
            {colorList.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`rounded-xl border px-4 py-2 text-sm transition ${
                  color === c
                    ? "border-[#3aa0ff] bg-[#0a55c7]/10 text-[#0f2a4a]"
                    : "border-[#cadcf8] bg-[#eaf2ff] text-[#3d5c87]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-sm text-[#4d6a92]">Quantity</p>
        <div className="flex w-fit items-center gap-3 rounded-xl border border-[#cadcf8] bg-[#eaf2ff] px-2 py-1.5">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            aria-label="Decrease quantity"
            className="rounded-lg p-1.5 hover:bg-[#e2edff]"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-semibold text-[#0f2a4a]">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            aria-label="Increase quantity"
            className="rounded-lg p-1.5 hover:bg-[#e2edff]"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <button
        disabled={!inStock}
        onClick={() =>
          addItem({
            id,
            name,
            price,
            image,
            size,
            color,
            quantity: qty,
          })
        }
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0047ab] py-3.5 font-semibold text-[#0f2a4a] transition hover:bg-[#1a6fd4] disabled:opacity-40"
      >
        <ShoppingBag size={18} /> Add to Cart
      </button>

      <a
        href={whatsappLink(
          `Hello ESA MMUST, I would like to order ${qty} x ${name}${
            size ? ` (${size})` : ""
          }${color ? ` ${color}` : ""} — ${formatKsh(price * qty)}.`
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-semibold text-[#0f2a4a] transition hover:brightness-110"
      >
        <MessageCircle size={18} /> Order via WhatsApp
      </a>
    </div>
  );
}
