"use client";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  intensity?: number;
  delay?: number;
};

export function Image3DCard({
  src,
  alt,
  caption,
  className = "",
  imgClassName = "",
  intensity = 14,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, s: 1, g: 0 });

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * intensity, ry: px * intensity, s: 1.04, g: 55 });
  }
  function onLeave() {
    setTilt({ rx: 0, ry: 0, s: 1, g: 0 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1100 }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.s})`,
          transformStyle: "preserve-3d",
        }}
        className={`group relative overflow-hidden rounded-2xl border border-[#dce7fa] bg-white shadow-[0_20px_50px_-25px_rgba(0,71,171,0.4)] transition-transform duration-300 ease-out ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${imgClassName}`}
        />
        {/* dynamic sheen follows the pointer */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: tilt.g ? 1 : 0,
            background: `radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.35), transparent 60%)`,
          }}
        />
        {caption && (
          <div className="absolute inset-x-0 bottom-0 translate-z-0 bg-gradient-to-t from-white via-white/50 to-transparent p-4">
            <p className="font-display text-sm font-semibold text-[#0f2a4a]">
              {caption}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Image3DCard;
