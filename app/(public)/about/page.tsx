import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import {
  Target,
  Eye,
  ListChecks,
  Heart,
  GraduationCap,
} from "lucide-react";

const values = [
  "Integrity", "Innovation", "Community", "Excellence", "Welfare", "Leadership",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="About ESA"
        title="About the Engineering Students Association"
        subtitle="The Engineering Students Association provides a platform for engineering students at MMUST to connect, learn, collaborate, and develop leadership skills."
        scene="gears"
        bgImage="/images/bg/bg-3.jpg"
      />
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <Reveal>
              <div className="glass h-full rounded-3xl p-8">
                <span className="inline-flex rounded-xl bg-[#0047ab]/20 p-3 text-[#0a55c7]">
                  <Target size={26} />
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-[#0f2a4a]">
                  Our Mission
                </h2>
                <p className="mt-3 leading-relaxed text-[#4d6a92]">
                  To unite and empower engineering students at MMUST through
                  academic excellence, professional development, innovation and
                  a strong sense of community.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass h-full rounded-3xl p-8">
                <span className="inline-flex rounded-xl bg-[#f0a500]/15 p-3 text-[#d99a00]">
                  <Eye size={26} />
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-[#0f2a4a]">
                  Our Vision
                </h2>
                <p className="mt-3 leading-relaxed text-[#4d6a92]">
                  To be the leading student association producing well-rounded,
                  skilled and principled engineers who shape the future.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="glass h-full rounded-3xl p-8">
                <span className="inline-flex rounded-xl bg-[#0a55c7]/15 p-3 text-[#0a55c7]">
                  <ListChecks size={26} />
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-[#0f2a4a]">
                  Our Values
                </h2>
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {values.map((v) => (
                    <li
                      key={v}
                      className="rounded-lg bg-[#eaf2ff] px-3 py-2 text-sm text-[#4d6a92]"
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="mt-20">
            <SectionHeading
              tag="Aims"
              title="What We Do"
              subtitle="From hosting events and training to welfare and industry exposure."
            />
            <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Academic support and study groups",
                "Professional talks and mentorship",
                "Industrial and academic trips",
                "Software installation and training",
                "Community service and charity",
                "Welfare support for members",
                "Leadership and personal development",
                "Networking across engineering schools",
              ].map((d) => (
                <StaggerItem key={d}>
                  <div className="glass flex items-start gap-3 rounded-2xl p-5">
                    <GraduationCap size={20} className="mt-0.5 shrink-0 text-[#0a55c7]" />
                    <p className="text-sm text-[#3d5c87]">{d}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>
    </>
  );
}
