import { Reveal } from "@/components/Motion";

export function SectionHeading({
  tag,
  title,
  subtitle,
  align = "center",
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-2xl ${alignCls}`}>
      {tag && (
        <span className="mb-3 inline-block rounded-full border border-[#3aa0ff]/30 bg-[#0a55c7]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#0a55c7]">
          {tag}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight text-[#0f2a4a] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-[#4d6a92]">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
