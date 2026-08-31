"use client";
import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { Cursor } from "@/components/Cursor";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartDrawer } from "@/components/CartDrawer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Cursor />
      <WhatsAppButton />
      <CartDrawer />
    </CartProvider>
  );
}
