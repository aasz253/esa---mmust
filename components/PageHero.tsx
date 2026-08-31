import { Reveal } from "@/components/Motion";
import { PageScene3D, type PageSceneVariant } from "@/components/hero/PageScene3D";

export function PageHero({
  tag,
  title,
  subtitle,
  scene,
  bgImage,
}: {
  tag: string;
  title: string;
  subtitle?: string;
  scene?: PageSceneVariant;
  bgImage?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      {/* Background band — image fully visible, no blur, no white wash */}
      <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden">
        {bgImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bgImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-grid" aria-hidden="true" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 55% at 50% 38%, rgba(43,123,255,0.14), transparent 72%)",
              }}
              aria-hidden="true"
            />
          </>
        )}
        {/* 3D animation floats on top of the clear image */}
        {scene && <PageScene3D variant={scene} />}
      </div>

      {/* Heading placed BELOW the animation — nothing overlaps */}
      <Reveal className="relative mx-auto max-w-3xl px-6 py-12 text-center">
        <span className="mb-4 inline-block rounded-full border border-[#3aa0ff]/30 bg-[#eaf2ff]/80 px-4 py-1 text-xs font-medium uppercase tracking-widest text-[#0a55c7] backdrop-blur">
          {tag}
        </span>
        <h1 className="font-display text-4xl font-bold text-[#0f2a4a] sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl text-[#4d6a92]">{subtitle}</p>
        )}
      </Reveal>
    </section>
  );
}
