import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Motion";
import { Bus, MapPin, CalendarDays, Lightbulb } from "lucide-react";
import { getTrips } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function TripsPage() {
  const trips = await getTrips();
  return (
    <>
      <PageHero
        tag="Industrial Exposure"
        title="Engineering Academic Trips"
        subtitle="Site visits and industrial tours that bridge theory and real-world engineering."
        scene="trips"
        bgImage="/images/bg/trips.jpg"
      />
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-8">
            {trips.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.06}>
                <div className="glass grid gap-6 overflow-hidden rounded-3xl md:grid-cols-2">
                  <div className="relative h-56 md:h-auto">
                    {t.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.coverImage}
                        alt={t.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#e2edff]">
                        <Bus size={48} className="text-[#93a7c4]" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-8">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#0047ab]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0a55c7]">
                      <Bus size={13} /> Industrial Visit
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-bold text-[#0f2a4a]">
                      {t.title}
                    </h2>
                    <div className="mt-2 space-y-1.5 text-sm text-[#4d6a92]">
                      <p className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#0a55c7]" />
                        {t.destination}
                      </p>
                      <p className="flex items-center gap-2">
                        <CalendarDays size={14} className="text-[#0a55c7]" />
                        {formatDate(t.date)}
                      </p>
                    </div>
                    <p className="mt-4 leading-relaxed text-[#3d5c87]">
                      {t.description}
                    </p>
                    {t.lessons && (
                      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-4">
                        <Lightbulb size={18} className="mt-0.5 shrink-0 text-[#d99a00]" />
                        <p className="text-sm text-[#4d6a92]">
                          <strong className="text-[#0f2a4a]">Lessons:</strong>{" "}
                          {t.lessons}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
