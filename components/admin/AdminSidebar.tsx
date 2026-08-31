"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Megaphone,
  MonitorCog,
  Shirt,
  HeartHandshake,
  UserRound,
  Bus,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/actions";

const nav = [
  { group: "Overview", items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }] },
  {
    group: "Management",
    items: [
      { href: "/admin/members", label: "Members", icon: Users },
      { href: "/admin/events", label: "Events", icon: CalendarDays },
      { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
      { href: "/admin/training", label: "Training", icon: MonitorCog },
      { href: "/admin/trips", label: "Trips", icon: Bus },
      { href: "/admin/products", label: "Merchandise", icon: Shirt },
      { href: "/admin/welfare", label: "Welfare", icon: HeartHandshake },
      { href: "/admin/leadership", label: "Leadership", icon: UserRound },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-[#d4e2fa] bg-[#dbe7fa] lg:flex">
      <div className="p-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-lg font-bold text-[#0f2a4a]">
            ESA <span className="text-[#0a55c7]">Admin</span>
          </span>
        </Link>
        <a
          href="/"
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#6b84a8] hover:text-[#0f2a4a]"
        >
          <ArrowLeft size={14} /> View public site
        </a>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
        {nav.map((g) => (
          <div key={g.group}>
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7d93b5]">
              {g.group}
            </p>
            <div className="space-y-1">
              {g.items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#4d6a92] transition hover:bg-[#eaf2ff] hover:text-[#0f2a4a]",
                    pathname === it.href && "bg-[#0047ab] text-[#0f2a4a]"
                  )}
                >
                  <it.icon size={18} /> {it.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <form action={logoutAction} className="p-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#4d6a92] hover:bg-[#eaf2ff] hover:text-[#0f2a4a]">
          <LogOut size={18} /> Log out
        </button>
      </form>
    </aside>
  );
}
