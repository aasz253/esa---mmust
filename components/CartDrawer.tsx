"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatKsh } from "@/lib/utils";
import { whatsappLink } from "@/config/site";

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQty, total, clear } =
    useCart();

  const orderMessage = () => {
    const lines = items.map(
      (i) =>
        `${i.quantity} x ${i.name}${i.size ? ` (${i.size})` : ""}${
          i.color ? ` ${i.color}` : ""
        } — ${formatKsh(i.price * i.quantity)}`
    );
    const msg = [
      "Hello ESA MMUST, I would like to place an order:",
      ...lines,
      `Total: ${formatKsh(total)}`,
      "My name and delivery details: ",
    ].join("\n");
    return msg;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[950] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[960] flex h-full w-full max-w-md flex-col glass-strong"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-[#d4e2fa] p-5">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <ShoppingBag size={18} className="text-[#0a55c7]" /> Your Cart
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="rounded-lg p-2 hover:bg-[#e2edff]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag size={48} className="mb-4 text-[#93a7c4]" />
                  <p className="font-display text-lg">Your cart is empty.</p>
                  <p className="mt-2 text-sm text-[#5b7394]">
                    Discover ESA merchandise worth taking home.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-6 rounded-full bg-[#0047ab] px-6 py-2.5 text-sm font-medium hover:bg-[#1a6fd4]"
                  >
                    Browse the Store
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((i) => (
                    <li
                      key={`${i.id}|${i.size}|${i.color}`}
                      className="flex gap-3 rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] p-3"
                    >
                      {i.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={i.image}
                          alt={i.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#d6e4ff] text-[#0a55c7]">
                          <ShoppingBag size={24} />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-snug">
                            {i.name}
                          </p>
                          <button
                            onClick={() => removeItem(i.id, i.size, i.color)}
                            aria-label={`Remove ${i.name}`}
                            className="text-[#6b84a8] hover:text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-[#5b7394]">
                          {i.size && `Size: ${i.size}  `}
                          {i.color && `Color: ${i.color}`}
                        </p>
                        <div className="mt-1 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQty(i.id, i.quantity - 1, i.size, i.color)
                              }
                              className="rounded-md bg-[#e2edff] p-1 hover:bg-[#d5e3ff]"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm">
                              {i.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQty(i.id, i.quantity + 1, i.size, i.color)
                              }
                              className="rounded-md bg-[#e2edff] p-1 hover:bg-[#d5e3ff]"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold">
                            {formatKsh(i.price * i.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[#d4e2fa] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-[#4d6a92]">Subtotal</span>
                  <span className="font-display text-xl font-semibold">
                    {formatKsh(total)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    window.open(whatsappLink(orderMessage()), "_blank");
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-medium text-[#0f2a4a] transition hover:brightness-110"
                >
                  Order via WhatsApp <ArrowRight size={18} />
                </button>
                <button
                  onClick={clear}
                  className="mt-2 w-full py-2 text-center text-xs text-[#6b84a8] hover:text-[#3d5c87]"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
