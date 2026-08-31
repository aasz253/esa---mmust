import { prisma } from "@/lib/prisma";
import { MemberTable } from "@/components/admin/MemberTable";

export default async function AdminMembersPage() {
  const members = await prisma.member.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      memberId: true,
      fullName: true,
      registrationNo: true,
      programme: true,
      year: true,
      status: true,
      academicYear: true,
    },
  });

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[#0f2a4a]">Members</h2>
      <p className="mt-1 text-sm text-[#5b7394]">
        Search, filter and update member membership status.
      </p>
      <div className="mt-6">
        <MemberTable members={members} />
      </div>
    </div>
  );
}
