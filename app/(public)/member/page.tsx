import Link from "next/link";
import { redirect } from "next/navigation";
import {
  IdCard,
  RefreshCcw,
  Wallet,
  HeartHandshake,
  ClipboardList,
  LogOut,
  Clock,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/config/site";
import { renewMember, logoutAction } from "@/lib/actions";
import { ServerActionForm } from "@/components/ServerActionForm";
import { LoginPanel } from "@/components/auth/LoginPanel";
import { formatDate, formatKsh } from "@/lib/utils";
import { PageScene3D } from "@/components/hero/PageScene3D";

export default async function MemberPage() {
  const user = await getCurrentUser();
  if (user && user.role !== "MEMBER") redirect("/admin");

  if (!user?.member) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
        <PageScene3D variant="member" className="opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/10 to-white" />
        <div className="relative z-10">
          <LoginPanel />
        </div>
      </section>
    );
  }

  const member = user.member;
  const [renewals, contributions, eventRegs, trainingRegs, payments] =
    await Promise.all([
      prisma.membershipRenewal.findMany({
        where: { memberId: member.id },
        orderBy: { createdAt: "desc" },
      }),
      prisma.welfareContribution.findMany({
        where: { memberId: member.id },
        orderBy: { createdAt: "desc" },
      }),
      prisma.eventRegistration.findMany({
        where: { memberId: member.id },
        include: { event: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.trainingRegistration.findMany({
        where: { memberId: member.id },
        include: { training: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.payment.findMany({
        where: { memberId: member.id },
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const totalWelfare = contributions.reduce((a, c) => a + c.amount, 0);
  const isApproved = member.status === "APPROVED";

  return (
    <div className="relative overflow-hidden pt-28 pb-20">
      <PageScene3D variant="member" className="h-80" />
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-white/70 via-white/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0047ab]/30 font-display text-xl font-bold text-[#0a55c7]">
              {member.fullName
                .split(" ")
                .map((x) => x[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-[#0f2a4a]">
                Welcome, {member.fullName.split(" ")[0]}
              </h1>
              <p className="text-sm text-[#5b7394]">
                {member.memberId} · {member.programme}
              </p>
            </div>
          </div>
          <form action={logoutAction}>
            <button className="flex items-center gap-2 rounded-full border border-[#cadcf8] bg-[#eaf2ff] px-4 py-2 text-sm text-[#3d5c87] transition hover:bg-[#e2edff]">
              <LogOut size={16} /> Log out
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="glass rounded-2xl p-5">
            <p className="flex items-center gap-2 text-sm text-[#6b84a8]">
              <IdCard size={16} /> Membership status
            </p>
            <span
              className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                isApproved
                  ? "bg-[#25D366]/15 text-[#19b95b]"
                  : "bg-[#f0a500]/15 text-[#d99a00]"
              }`}
            >
              {member.status}
            </span>
            <p className="mt-3 text-xs text-[#6b84a8]">
              {siteConfig.academicYear} academic year
            </p>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="flex items-center gap-2 text-sm text-[#6b84a8]">
              <HeartHandshake size={16} /> Welfare contributed
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-[#d99a00]">
              {formatKsh(totalWelfare)}
            </p>
            <p className="mt-1 text-xs text-[#6b84a8]">
              {contributions.length} contribution(s)
            </p>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="flex items-center gap-2 text-sm text-[#6b84a8]">
              <ClipboardList size={16} /> Registrations
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-[#0f2a4a]">
              {eventRegs.length + trainingRegs.length}
            </p>
            <p className="mt-1 text-xs text-[#6b84a8]">events & training</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[#0f2a4a]">
              <RefreshCcw size={18} className="text-[#0a55c7]" /> Renew Membership
            </h2>
            <p className="mt-2 text-sm text-[#5b7394]">
              Renew for the {siteConfig.academicYear} academic year —{" "}
              {formatKsh(siteConfig.renewalFee)}. Paybill{" "}
              {siteConfig.paybill}, Account {siteConfig.account}.
            </p>
            <ServerActionForm
              action={renewMember}
              submitLabel="Submit Renewal Reference"
              className="mt-4"
            >
              <label className="mb-1 block text-sm text-[#4d6a92]">
                M-PESA reference
              </label>
              <input
                name="reference"
                required
                placeholder="e.g. QKX2Y7ABCD"
                className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
              />
            </ServerActionForm>
          </div>

          <div className="glass rounded-3xl p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[#0f2a4a]">
              <Wallet size={18} className="text-[#0a55c7]" /> Contribution
              History
            </h2>
            {contributions.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {contributions.slice(0, 5).map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] p-3 text-sm"
                  >
                    <span className="text-[#3d5c87]">
                      {formatKsh(c.amount)} · {c.academicYear} {c.semester}
                    </span>
                    <span className="rounded-full bg-[#25D366]/15 px-2 py-0.5 text-xs text-[#19b95b]">
                      {c.reference ? "Recorded" : "Pending"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-[#6b84a8]">
                No welfare contributions yet.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[#0f2a4a]">
              <ClipboardList size={18} className="text-[#0a55c7]" /> Event
              Registrations
            </h2>
            {eventRegs.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {eventRegs.map((r) => (
                  <li
                    key={r.id}
                    className="rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] p-3 text-sm"
                  >
                    <p className="font-medium text-[#0f2a4a]">{r.event.title}</p>
                    <p className="text-xs text-[#6b84a8]">
                      {formatDate(r.event.date)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-[#6b84a8]">
                No event registrations yet.{" "}
                <Link href="/events" className="text-[#0a55c7] underline">
                  Browse events
                </Link>
              </p>
            )}
          </div>

          <div className="glass rounded-3xl p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[#0f2a4a]">
              <Clock size={18} className="text-[#0a55c7]" /> Training
              Registrations
            </h2>
            {trainingRegs.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {trainingRegs.map((r) => (
                  <li
                    key={r.id}
                    className="rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] p-3 text-sm"
                  >
                    <p className="font-medium text-[#0f2a4a]">
                      {r.training.title}
                    </p>
                    <p className="text-xs text-[#6b84a8]">
                      {formatDate(r.training.date)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-[#6b84a8]">
                No training registrations yet.{" "}
                <Link href="/training" className="text-[#0a55c7] underline">
                  View training
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
