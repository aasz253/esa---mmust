import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Motion";
import { getMembers } from "@/lib/data";
import { ShieldCheck } from "lucide-react";

export default async function MembersPage() {
  const members = await getMembers();
  return (
    <>
      <PageHero
        tag="Members"
        title="ESA Membership"
        subtitle="Approved members of the Engineering Students Association. Only limited information is shown publicly to protect privacy."
        scene="members"
      />
      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-4">
            <ShieldCheck size={20} className="text-[#0a55c7]" />
            <p className="text-sm text-[#4d6a92]">
              For privacy, phone numbers, emails and payment details are never
              shown publicly.
            </p>
          </div>
          {members.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((m) => (
                <Reveal key={m.id}>
                  <div className="glass flex items-center gap-4 rounded-2xl p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0047ab]/30 font-display font-bold text-[#0a55c7]">
                      {m.fullName
                        .split(" ")
                        .map((x) => x[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0f2a4a]">{m.fullName}</p>
                      <p className="text-sm text-[#5b7394]">
                        {m.programme} · {m.year}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#d4e2fa] bg-[#eaf2ff] py-16 text-center">
              <p className="text-[#4d6a92]">No approved members yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
