import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Motion";
import { TiltCard } from "@/components/TiltCard";
import { getLeaders } from "@/lib/data";

export default async function LeadershipPage() {
  const leaders = await getLeaders();
  return (
    <>
      <PageHero
        tag="Leadership"
        title="ESA Leadership"
        subtitle="The elected committee guiding the Engineering Students Association through the academic year."
        scene="leadership"
        bgImage="/images/bg/leadership.jpg"
      />
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((l, i) => (
              <Reveal key={l.id} delay={i * 0.05}>
                <TiltCard
                  intensity={6}
                  className="glass overflow-hidden rounded-3xl"
                >
                  <div className="relative h-80 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={l.photo || "/images/all-members.jpg"}
                      alt={l.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/40 to-transparent p-5">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#0a55c7]">
                        {l.position}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-[#0f2a4a] drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                        {l.name}
                      </h3>
                    </div>
                  </div>
                  {l.bio && (
                    <p className="p-5 text-sm leading-relaxed text-[#4d6a92]">
                      {l.bio}
                    </p>
                  )}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
