import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, StaggerItem } from "@/components/Motion";
import { MonitorCog, CalendarDays, User, Award, ArrowRight } from "lucide-react";
import { getTrainings } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function TrainingPage() {
  const trainings = await getTrainings();
  return (
    <>
      <PageHero
        tag="Engineering Skills Lab"
        title="Software Installation & Training"
        subtitle="A futuristic skills lab — CAD, simulation, programming and engineering design."
        scene="monitor"
        bgImage="/images/bg/bg-5.jpg"
      />
      <section className="relative py-16">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading
            tag="Available now"
            title="Upcoming Training"
            subtitle="Register for practical, hands-on engineering training."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trainings.map((t) => (
              <StaggerItem key={t.id}>
                <Link
                  href={`/training/${t.slug}`}
                  className="group glass flex h-full flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:border-[#3aa0ff]/30 hover:shadow-glow"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-xl bg-[#0047ab]/20 p-3 text-[#0a55c7]">
                      <MonitorCog size={26} />
                    </span>
                    <span className="rounded-full bg-[#e2edff] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#5b7394]">
                      {t.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-[#0f2a4a]">
                    {t.software}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[#0a55c7]">
                    {t.category}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5b7394]">
                    {t.description}
                  </p>
                  <div className="mt-5 space-y-1.5 text-sm text-[#4d6a92]">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={14} className="text-[#0a55c7]" />
                      {formatDate(t.date)}
                      {t.duration ? ` · ${t.duration}` : ""}
                    </p>
                    {t.trainer && (
                      <p className="flex items-center gap-2">
                        <User size={14} className="text-[#0a55c7]" />
                        {t.trainer}
                      </p>
                    )}
                    {t.certificate && (
                      <p className="flex items-center gap-2 text-[#d99a00]">
                        <Award size={14} /> Certificate awarded
                      </p>
                    )}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 font-medium text-[#0a55c7]">
                    View & register <ArrowRight size={16} />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
