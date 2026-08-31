import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard } from "@/components/EventCard";
import { EngineeringTimeline } from "@/components/home/EngineeringTimeline";
import { Reveal } from "@/components/Motion";
import { getUpcomingEvents, getPastEvents } from "@/lib/data";

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents(50),
    getPastEvents(),
  ]);

  return (
    <>
      <PageHero
        tag="Engineering Calendar"
        title="Events & Activities"
        subtitle="From admission to elections — explore everything happening across the ESA academic year."
        scene="circuit"
        bgImage="/images/bg/bg-4.jpg"
      />
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            align="left"
            tag="The Year"
            title="Annual Engineering Timeline"
          />
          <div className="mt-12">
            <EngineeringTimeline events={upcoming} />
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading align="left" title="Upcoming Events" />
          {upcoming.length > 0 ? (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <Reveal className="mt-12 text-center text-[#5b7394]">
              No upcoming events scheduled yet — check back soon.
            </Reveal>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="relative py-16">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading align="left" title="Events We Have Hosted" />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
