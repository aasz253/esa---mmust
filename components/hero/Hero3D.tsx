"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroScene = dynamic(() => import("@/components/hero/HeroScene"), {
  ssr: false,
  loading: () => null,
});

export function Hero3D() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    // Tall scroll container: the sticky canvas stays pinned while GSAP
    // ScrollTrigger glides the 3D text and warps the background images.
    <section
      id="esa-hero-scroll"
      className="relative h-[220vh] w-full"
      aria-label="ESA MMUST hero"
    >
      {/* Sticky, full-viewport canvas */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(43,123,255,0.15), transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* 3D scene */}
        <div className="absolute inset-0">
          <HeroScene mobile={mobile} />
        </div>

        {/* Top brand bar */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-center gap-3 p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/esa-logo.jpg"
            alt=""
            className="pointer-events-none h-12 w-12 rounded-xl object-cover shadow-[0_0_50px_-10px_rgba(55,215,255,0.5)]"
          />
          <span className="font-display text-lg font-bold tracking-wide text-[#0f2a4a]">
            ESA <span className="text-[#0a55c7]">MMUST</span>
          </span>
        </div>

        {/* Bottom call-to-actions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-4 px-6 pb-14"
        >
          <p className="text-center font-display text-lg font-bold tracking-wide text-[#0a55c7] sm:text-2xl">
            United to Engineer, Empowered to Lead.
          </p>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-[#3d5c87]">
            Masinde Muliro University of Science &amp; Technology
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0047ab] px-8 py-3.5 font-semibold text-[#0f2a4a] transition hover:bg-[#1a6fd4] sm:w-auto"
            >
              Join ESA
            </Link>
            <Link
              href="/events"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#c0d6f6] bg-[#eaf2ff] px-8 py-3.5 font-semibold text-[#0f2a4a] backdrop-blur-md transition hover:bg-[#e2edff] sm:w-auto"
            >
              Explore Events
            </Link>
            <Link
              href="/member"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#3aa0ff]/30 bg-[#0a55c7]/10 px-8 py-3.5 font-semibold text-[#0a55c7] backdrop-blur-md transition hover:bg-[#0a55c7]/20 sm:w-auto"
            >
              Member Portal
            </Link>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-5 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-hidden="true"
        >
          <div className="h-10 w-6 rounded-full border border-[#b5cdf3] p-1">
            <div className="mx-auto h-2 w-1 rounded-full bg-[#0a55c7]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
