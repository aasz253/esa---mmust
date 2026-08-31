"use client";
import Link from "next/link";
import {
  GraduationCap,
  CalendarDays,
  HeartHandshake,
  Bus,
  MonitorCog,
  Shirt,
  UserRound,
  ClipboardList,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/Motion";

const actions = [
  { icon: GraduationCap, title: "Join ESA", desc: "Become a member", href: "/register" },
  { icon: ClipboardList, title: "Register", desc: "First-year or renewal", href: "/register" },
  { icon: CalendarDays, title: "Upcoming Events", desc: "See the calendar", href: "/events" },
  { icon: HeartHandshake, title: "Welfare", desc: "We stand with our own", href: "/welfare" },
  { icon: Bus, title: "Academic Trips", desc: "Industrial visits", href: "/trips" },
  { icon: MonitorCog, title: "Training", desc: "Engineering skills lab", href: "/training" },
  { icon: Shirt, title: "Merchandise", desc: "Shop ESA gear", href: "/store" },
  { icon: UserRound, title: "Member Portal", desc: "Login & manage", href: "/member" },
];

export function QuickActions() {
  return (
    <section className="relative z-10 -mt-10 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {actions.map((a) => (
            <StaggerItem key={a.title}>
              <Link
                href={a.href}
                className="group glass flex flex-col items-start gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(55,215,255,0.4)]"
              >
                <span className="rounded-xl bg-[#0047ab]/20 p-3 text-[#0a55c7] transition group-hover:bg-[#0047ab] group-hover:text-[#0f2a4a]">
                  <a.icon size={22} />
                </span>
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#0f2a4a]">
                    {a.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#5b7394]">{a.desc}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
