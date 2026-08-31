"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image3DCard from "@/components/Image3DCard";

export const engineeringSamples = [
  { src: "/images/engineering/robotics.jpg", label: "Robotics" },
  { src: "/images/engineering/cad.jpg", label: "CAD & Design" },
  { src: "/images/engineering/construction.jpg", label: "Construction" },
  { src: "/images/engineering/mechanical.jpg", label: "Mechanical" },
  { src: "/images/engineering/electrical.jpg", label: "Electrical" },
  { src: "/images/engineering/bridge.jpg", label: "Structural" },
  { src: "/images/engineering/circuit.jpg", label: "Electronics" },
  { src: "/images/engineering/solar.jpg", label: "Renewable Energy" },
  { src: "/images/engineering/architecture.jpg", label: "Architecture" },
  { src: "/images/engineering/factory.jpg", label: "Industry" },
  { src: "/images/engineering/drone.jpg", label: "Aero & Drones" },
  { src: "/images/engineering/turbine.jpg", label: "Energy" },
];

export function EngineeringMarquee({
  reverse = false,
  speed = 40,
  labeled = true,
}: {
  reverse?: boolean;
  speed?: number;
  labeled?: boolean;
}) {
  const reduced = useReducedMotion();
  const items = [...engineeringSamples, ...engineeringSamples];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden py-4"
    >
      <div
        className="flex w-max gap-5"
        style={{
          animation: reduced
            ? "none"
            : `marquee ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {items.map((s, i) => (
          <div
            key={i}
            className="h-40 w-64 shrink-0 sm:h-52 sm:w-80"
          >
            <Image3DCard
              src={s.src}
              alt={s.label}
              caption={labeled ? s.label : undefined}
              className="h-full w-full"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default EngineeringMarquee;
