import { prisma } from "@/lib/prisma";
import { formatKsh, formatDate } from "@/lib/utils";

export default async function AdminWelfarePage() {
  const contributions = await prisma.welfareContribution.findMany({
    orderBy: { createdAt: "desc" },
    include: { member: { select: { fullName: true, memberId: true } } },
  });
  const total = await prisma.welfareContribution.aggregate({
    _sum: { amount: true },
  });

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[#0f2a4a]">Welfare</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-5">
          <p className="text-sm text-[#6b84a8]">Total collected</p>
          <p className="mt-1 font-display text-2xl font-bold text-[#d99a00]">
            {formatKsh(total._sum.amount || 0)}
          </p>
        </div>
        <div className="rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-5">
          <p className="text-sm text-[#6b84a8]">Contributions</p>
          <p className="mt-1 font-display text-2xl font-bold text-[#0f2a4a]">
            {contributions.length}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-6">
        <h3 className="font-display text-lg font-bold text-[#0f2a4a]">
          Contribution Records
        </h3>
        {contributions.length > 0 ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#d4e2fa] text-xs uppercase tracking-wider text-[#6b84a8]">
                  <th className="px-3 py-2">Member</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Term</th>
                  <th className="px-3 py-2">Reference</th>
                  <th className="px-3 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((c) => (
                  <tr key={c.id} className="border-b border-[#e3ecff] last:0 hover:bg-[#eaf2ff]">
                    <td className="px-3 py-2">
                      <p className="text-[#0f2a4a]">{c.member.fullName}</p>
                      <p className="text-xs text-[#6b84a8]">{c.member.memberId}</p>
                    </td>
                    <td className="px-3 py-2 font-medium text-[#d99a00]">
                      {formatKsh(c.amount)}
                    </td>
                    <td className="px-3 py-2 text-[#4d6a92]">
                      {c.academicYear} {c.semester}
                    </td>
                    <td className="px-3 py-2 text-[#4d6a92]">{c.reference || "—"}</td>
                    <td className="px-3 py-2 text-[#6b84a8]">
                      {formatDate(c.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-[#6b84a8]">No contributions yet.</p>
        )}
      </div>
    </div>
  );
}
