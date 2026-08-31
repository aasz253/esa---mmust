"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
};

const colorCycle = [
  "#0047ab",
  "#1a6fd4",
  "#3aa0ff",
  "#f0a500",
  "#1a6fd4",
  "#0047ab",
];

export function Text3D({
  children,
  className = "",
  as = "span",
  delay = 0,
}: Props) {
  const reduced = useReducedMotion();
  const Tag: any = as;

  const variants = {
    hidden: { opacity: 0, y: 30, rotateX: -35, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
    >
      <motion.div variants={variants} style={{ transformStyle: "preserve-3d" }}>
        <Tag
          className={`text-3d inline-block ${className}`}
          style={{
            backgroundImage: `linear-gradient(90deg, ${colorCycle.join(", ")})`,
            backgroundSize: "400% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            animation: reduced
              ? "none"
              : "textColorCycle 8s linear infinite, textFloat 5s ease-in-out infinite",
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </Tag>
      </motion.div>
    </motion.div>
  );
}

export default Text3D;
