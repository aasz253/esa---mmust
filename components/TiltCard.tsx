"use client";
import { useRef, useState, ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

export function TiltCard({
  children,
  className,
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [hover, setHover] = useState(false);

  function handleMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateY(${px * intensity}deg) rotateX(${
        -py * intensity
      }deg)`,
    });
  }

  function reset() {
    setStyle({ transform: "perspective(900px) rotateY(0deg) rotateX(0deg)" });
    setHover(false);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      style={style}
      className={`transition-transform duration-300 ease-out ${
        hover ? "" : ""
      } ${className || ""}`}
    >
      {children}
    </div>
  );
}
