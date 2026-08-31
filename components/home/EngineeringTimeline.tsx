"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

type Ev = {
  id: string;
  title: string;
  slug: string;
  date: Date | string;
  venue: string;
  category: string;
  featured: boolean;
  status: string;
};

export function EngineeringTimeline({ events }: { events: Ev[] }) {
  const ordered = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  if (ordered.length === 0) return null;

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[#0a55c7]/40 via-[#2f6bff]/30 to-transparent sm:left-1/2" />
      <div className="space-y-8">
        {ordered.map((ev, i) => {
          const left = i % 2 === 0;
          return (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, x: left ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex items-start gap-4 pl-12 sm:w-1/2 sm:pl-0 ${
                left
                  ? "sm:mr-auto sm:pr-12 sm:text-right"
                  : "sm:ml-auto sm:pl-12"
              }`}
            >
              <span
                className={`absolute left-4 top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-[#0a55c7] shadow-glow sm:left-auto ${
                  left ? "sm:right-0 sm:translate-x-1/2" : "sm:left-0 sm:-translate-x-1/2"
                }`}
                aria-hidden="true"
              />
              <Link
                href={`/events/${ev.slug}`}
                className={`glass group w-full rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-glow ${
                  left ? "sm:items-end" : ""
                }`}
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0047ab]/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#0a55c7]">
                  <CalendarDays size={12} /> {ev.category}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#0f2a4a]">
                  {ev.title}
                </h3>
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-[#5b7394]">
                  {formatDate(ev.date)} · {ev.venue}
                </p>
                <p className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#0a55c7] opacity-0 transition group-hover:opacity-100">
                  View details <ArrowRight size={14} />
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
