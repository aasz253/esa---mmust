"use client";
import dynamic from "next/dynamic";

// Half the page hero's height: a compact 3D scene sitting behind the heading.
// Each page passes a different `variant` for a distinct look.
const HeroScene3D = dynamic(
  () => import("@/components/hero/PageSceneInner"),
  { ssr: false, loading: () => null }
);

export type PageSceneVariant =
  | "gears"
  | "circuit"
  | "globe"
  | "heart"
  | "store"
  | "monitor"
  | "trips"
  | "leadership"
  | "members"
  | "register"
  | "member"
  | "cart"
  | "event"
  | "product"
  | "training";

export function PageScene3D({
  variant,
  className = "",
}: {
  variant: PageSceneVariant;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      <HeroScene3D variant={variant} />
    </div>
  );
}

export default PageScene3D;
