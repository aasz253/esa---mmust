import Link from "next/link";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export type EventType = {
  id: string;
  title: string;
  slug: string;
  date: Date | string;
  venue: string;
  category: string;
  description: string;
  startTime?: string;
  coverImage?: string | null;
  featured: boolean;
  status: string;
};

export function EventCard({ event }: { event: EventType }) {
  const isUpcoming = new Date(event.date).getTime() >= Date.now();
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#d4e2fa] bg-gradient-to-b from-white/70 to-transparent transition-all duration-300 hover:-translate-y-1.5 hover:border-[#3aa0ff]/30 hover:shadow-glow"
    >
      <div className="relative h-40 overflow-hidden">
        {event.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.coverImage}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#e2edff]">
            <span className="font-display text-4xl font-bold text-[#a9bad3]">
              ESA
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-[#eaf2ff]/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur">
          {event.category}
        </span>
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            isUpcoming
              ? "bg-[#25D366]/20 text-[#19b95b]"
              : "bg-[#e2edff] text-[#5b7394]"
          }`}
        >
          {isUpcoming ? "Upcoming" : "Past"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-[#0f2a4a]">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-[#5b7394]">
          {event.description}
        </p>
        <div className="mt-4 space-y-1.5 text-sm text-[#4d6a92]">
          <p className="flex items-center gap-2">
            <CalendarDays size={14} className="text-[#0a55c7]" />
            {formatDate(event.date)}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={14} className="text-[#0a55c7]" />
            {event.venue}
          </p>
          {event.startTime && (
            <p className="flex items-center gap-2">
              <Clock size={14} className="text-[#0a55c7]" />
              {event.startTime}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
