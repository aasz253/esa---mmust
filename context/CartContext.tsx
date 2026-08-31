"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  size?: string;
  color?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string, size?: string, color?: string) => void;
  updateQty: (id: string, qty: number, size?: string, color?: string) => void;
  clear: () => void;
  count: number;
  total: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

const KEY = "esa-cart-v1";

function keyOf(i: { id: string; size?: string; color?: string }) {
  return `${i.id}|${i.size || ""}|${i.color || ""}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem(KEY, JSON.stringify(items));
      } catch {}
    }
  }, [items, hydrated]);

  function addItem(item: Omit<CartItem, "quantity"> & { quantity?: number }) {
    const qty = item.quantity || 1;
    setItems((prev) => {
      const k = keyOf(item);
      const existing = prev.find(
        (i) => keyOf(i) === k && i.name === item.name
      );
      if (existing) {
        return prev.map((i) =>
          keyOf(i) === k && i.name === item.name
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setOpen(true);
  }

  function removeItem(id: string, size?: string, color?: string) {
    const k = `${id}|${size || ""}|${color || ""}`;
    setItems((prev) => prev.filter((i) => keyOf(i) !== k));
  }

  function updateQty(id: string, qty: number, size?: string, color?: string) {
    const k = `${id}|${size || ""}|${color || ""}`;
    setItems((prev) =>
      prev
        .map((i) => (keyOf(i) === k ? { ...i, quantity: Math.max(1, qty) } : i))
    );
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((a, i) => a + i.quantity, 0);
  const total = items.reduce((a, i) => a + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clear,
        count,
        total,
        isOpen,
        setOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
