"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About ESA" },
  { href: "/events", label: "Events" },
  { href: "/trips", label: "Academic Trips" },
  { href: "/training", label: "Training" },
  { href: "/welfare", label: "Welfare" },
  { href: "/store", label: "Store" },
  { href: "/leadership", label: "Leadership" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[800] transition-all duration-300",
        scrolled ? "px-3 py-2 sm:px-6" : "p-4 sm:px-8"
      )}
    >
      <nav
        className={cn(
          "glass flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
          scrolled ? "bg-[#eaf2ff]/80 shadow-glass" : "bg-transparent"
        )}
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/esa-logo.jpg"
            alt=""
            className="h-9 w-9 rounded-lg object-cover"
          />
          <span className="font-display text-lg font-bold tracking-wide text-[#0f2a4a]">
            ESA <span className="text-[#0a55c7]">MMUST</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-[#3d5c87] transition hover:text-[#0f2a4a]",
                pathname === l.href && "bg-[#e2edff] text-[#0f2a4a]"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            className="relative rounded-xl bg-[#eaf2ff] p-2.5 text-[#2f4f7c] transition hover:bg-[#e2edff]"
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingBag size={19} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0a55c7] text-[11px] font-bold text-[#0f2a4a]">
                {count}
              </span>
            )}
          </button>
          <Link
            href="/register"
            className="hidden rounded-full bg-[#0047ab] px-5 py-2.5 text-sm font-semibold text-[#0f2a4a] transition hover:bg-[#1a6fd4] sm:inline-block"
          >
            Join ESA
          </Link>
          <button
            className="rounded-xl bg-[#eaf2ff] p-2.5 text-[#2f4f7c] transition hover:bg-[#e2edff] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="glass-strong mx-3 mt-2 rounded-2xl p-3 lg:hidden"
          >
            <div className="grid gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium text-[#2f4f7c] transition hover:bg-[#e2edff]",
                    pathname === l.href && "bg-[#e2edff] text-[#0f2a4a]"
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/register"
                className="mt-2 rounded-xl bg-[#0047ab] px-4 py-3 text-center text-sm font-semibold text-[#0f2a4a]"
              >
                Join ESA
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
