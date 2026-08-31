"use client";
import { useMemo, useState } from "react";
import { updateMemberStatus } from "@/lib/actions";

type M = {
  id: string;
  memberId: string;
  fullName: string;
  registrationNo: string;
  programme: string;
  year: string;
  status: string;
  academicYear: string;
};

const statusColors: Record<string, string> = {
  APPROVED: "bg-[#25D366]/15 text-[#19b95b]",
  PENDING: "bg-[#f0a500]/15 text-[#d99a00]",
  EXPIRED: "bg-[#e2edff] text-[#5b7394]",
  REJECTED: "bg-red-500/15 text-red-400",
};

export function MemberTable({ members }: { members: M[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchQ =
        !query ||
        m.fullName.toLowerCase().includes(query.toLowerCase()) ||
        m.memberId.toLowerCase().includes(query.toLowerCase()) ||
        m.registrationNo.toLowerCase().includes(query.toLowerCase()) ||
        m.programme.toLowerCase().includes(query.toLowerCase());
      const matchS = status === "All" || m.status === status;
      return matchQ && matchS;
    });
  }, [members, query, status]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, member ID, reg no, programme..."
          className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-2.5 text-sm text-[#0f2a4a] outline-none focus:border-[#3aa0ff] sm:max-w-sm"
          aria-label="Search members"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-2.5 text-sm text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
          aria-label="Filter by status"
        >
          {["All", "APPROVED", "PENDING", "EXPIRED", "REJECTED"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-[#6b84a8]">No members found.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#d4e2fa]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#d4e2fa] bg-[#eaf2ff] text-xs uppercase tracking-wider text-[#6b84a8]">
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Reg No</th>
                <th className="px-4 py-3">Programme</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Update</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-[#e3ecff] last:border-0 hover:bg-[#eaf2ff]"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#0f2a4a]">{m.fullName}</p>
                    <p className="text-xs text-[#6b84a8]">{m.memberId}</p>
                  </td>
                  <td className="px-4 py-3 text-[#4d6a92]">{m.registrationNo}</td>
                  <td className="px-4 py-3 text-[#4d6a92]">{m.programme}</td>
                  <td className="px-4 py-3 text-[#4d6a92]">{m.year}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        statusColors[m.status] || "bg-[#e2edff] text-[#5b7394]"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <form action={updateMemberStatus} className="flex items-center gap-2">
                      <input type="hidden" name="memberId" value={m.id} />
                      <select
                        name="status"
                        defaultValue={m.status}
                        className="rounded-lg border border-[#d4e2fa] bg-[#eaf2ff] px-2 py-1.5 text-xs text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
                      >
                        {["APPROVED", "PENDING", "EXPIRED", "REJECTED"].map(
                          (s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          )
                        )}
                      </select>
                      <button className="rounded-lg bg-[#0047ab] px-3 py-1.5 text-xs font-semibold text-[#0f2a4a] hover:bg-[#1a6fd4]">
                        Save
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
