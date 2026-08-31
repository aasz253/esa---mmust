import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  Clock,
  User,
  Users,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { getEvent, getUpcomingEvents } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { EventCard } from "@/components/EventCard";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Motion";
import { PageScene3D } from "@/components/hero/PageScene3D";

export default async function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEvent(params.slug);
  if (!event) notFound();

  const related = (await getUpcomingEvents(20))
    .filter((e) => e.id !== event.id)
    .slice(0, 3);

  const isUpcoming = new Date(event.date).getTime() >= Date.now();
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://esa.mmust.ke/events/${event.slug}`;

  return (
    <div className="relative overflow-hidden pt-32 pb-20">
      <PageScene3D variant="event" className="h-80" />
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-white/70 via-white/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#4d6a92] hover:text-[#0f2a4a]"
        >
          <ArrowLeft size={16} /> Back to events
        </Link>

        <div className="glass-strong overflow-hidden rounded-3xl">
          <div className="relative h-72 sm:h-96">
            {event.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={event.coverImage}
                alt={event.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[#e2edff]">
                <span className="font-display text-5xl font-bold text-[#a9bad3]">
                  ESA
                </span>
              </div>
            )}
            <div className="absolute bottom-0 h-40 w-full bg-gradient-to-t from-white via-white/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="rounded-full bg-[#0a55c7] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                {event.category}
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold text-[#0f2a4a] sm:text-4xl drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                {event.title}
              </h1>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-display text-xl font-semibold text-[#0f2a4a]">
                About this event
              </h2>
              <p className="mt-3 leading-relaxed text-[#3d5c87]">
                {event.description}
              </p>

              <div className="mt-8 space-y-3 text-[#3d5c87]">
                <p className="flex items-center gap-3">
                  <CalendarDays size={18} className="text-[#0a55c7]" />
                  {formatDate(event.date)}
                </p>
                <p className="flex items-center gap-3">
                  <Clock size={18} className="text-[#0a55c7]" />
                  {event.startTime}
                  {event.endTime ? ` – ${event.endTime}` : ""}
                </p>
                <p className="flex items-center gap-3">
                  <MapPin size={18} className="text-[#0a55c7]" />
                  {event.venue}
                </p>
                {event.organizer && (
                  <p className="flex items-center gap-3">
                    <User size={18} className="text-[#0a55c7]" />
                    {event.organizer}
                  </p>
                )}
                {event.registrations.length > 0 && (
                  <p className="flex items-center gap-3">
                    <Users size={18} className="text-[#0a55c7]" />
                    {event.registrations.length} registered
                  </p>
                )}
              </div>

              <a
                href={shareUrl}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#cadcf8] bg-[#eaf2ff] px-5 py-2.5 text-sm font-medium text-[#3d5c87] transition hover:bg-[#e2edff]"
              >
                <Share2 size={16} /> Copy link
              </a>
            </div>

            <Reveal>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#5b7394]">
                  Starts in
                </h3>
                <div className="mt-3">
                  <Countdown target={event.date} />
                </div>
                <Link
                  href={isUpcoming ? "/register" : "/events"}
                  className={`mt-6 flex w-full items-center justify-center rounded-full py-3 font-semibold transition ${
                    isUpcoming
                      ? "bg-[#0047ab] text-[#0f2a4a] hover:bg-[#1a6fd4]"
                      : "bg-[#e2edff] text-[#5b7394]"
                  }`}
                >
                  {isUpcoming ? "Register for Event" : "Event Completed"}
                </Link>
                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex w-full items-center justify-center rounded-full border border-[#cadcf8] bg-[#eaf2ff] py-3 text-sm font-medium text-[#3d5c87] transition hover:bg-[#e2edff]"
                  >
                    External registration
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-[#0f2a4a]">
              Related events
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
