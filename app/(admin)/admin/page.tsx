import Link from "next/link";
import {
  Users,
  CalendarDays,
  HeartHandshake,
  Shirt,
  MonitorCog,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatKsh, formatDate } from "@/lib/utils";

export default async function AdminDashboard() {
  const [members, pendingMembers, events, welfareAgg, products, rens, announcements] =
    await Promise.all([
      prisma.member.count(),
      prisma.member.count({ where: { status: "PENDING" } }),
      prisma.event.count({ where: { date: { gte: new Date() } } }),
      prisma.welfareContribution.aggregate({ _sum: { amount: true } }),
      prisma.product.count(),
      prisma.membershipRenewal.count(),
      prisma.announcement.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
    ]);

  const stats = [
    { label: "Total Members", value: members, icon: Users, href: "/admin/members", color: "text-[#0a55c7]" },
    { label: "Pending Approvals", value: pendingMembers, icon: Users, href: "/admin/members", color: "text-[#d99a00]" },
    { label: "Upcoming Events", value: events, icon: CalendarDays, href: "/admin/events", color: "text-[#0a55c7]" },
    { label: "Welfare Collected", value: formatKsh(welfareAgg._sum.amount || 0), icon: HeartHandshake, href: "/admin/welfare", color: "text-[#d99a00]" },
    { label: "Merchandise", value: products, icon: Shirt, href: "/admin/products", color: "text-[#0a55c7]" },
    { label: "Renewals", value: rens, icon: MonitorCog, href: "/admin/members", color: "text-[#0a55c7]" },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[#0f2a4a]">Overview</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-5 transition hover:border-[#3aa0ff]/30"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-[#0047ab]/20 p-3">
                <s.icon size={22} className={s.color} />
              </span>
              <ArrowRight size={18} className="text-[#93a7c4] group-hover:text-[#0a55c7]" />
            </div>
            <p className="mt-4 font-display text-2xl font-bold text-[#0f2a4a]">
              {s.value}
            </p>
            <p className="text-sm text-[#5b7394]">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-6">
        <h3 className="font-display text-lg font-bold text-[#0f2a4a]">
          Recent Announcements
        </h3>
        {announcements.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {announcements.map((a) => (
              <li
                key={a.id}
                className="rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[#0f2a4a]">{a.title}</p>
                  <span className="text-xs text-[#6b84a8]">
                    {formatDate(a.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#5b7394]">{a.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-[#6b84a8]">No announcements yet.</p>
        )}
      </div>
    </div>
  );
}
