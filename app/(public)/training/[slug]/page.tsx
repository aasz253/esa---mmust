import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MonitorCog,
  CalendarDays,
  User,
  Award,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { getTraining } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import { registerTraining } from "@/lib/actions";
import { ServerActionForm } from "@/components/ServerActionForm";
import { PageScene3D } from "@/components/hero/PageScene3D";

export default async function TrainingDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const training = await getTraining(params.slug);
  if (!training) notFound();
  const user = await getCurrentUser();
  const canRegister = user?.member && user.member.status === "APPROVED";

  return (
    <div className="relative overflow-hidden pt-32 pb-20">
      <PageScene3D variant="training" className="h-80" />
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-white/70 via-white/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <Link
          href="/training"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#4d6a92] hover:text-[#0f2a4a]"
        >
          <ArrowLeft size={16} /> Back to training
        </Link>

        <div className="glass-strong rounded-3xl p-8">
          <div className="flex items-center gap-4">
            <span className="rounded-2xl bg-[#0047ab]/20 p-4 text-[#0a55c7]">
              <MonitorCog size={34} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0a55c7]">
                {training.category}
              </p>
              <h1 className="font-display text-3xl font-bold text-[#0f2a4a]">
                {training.title}
              </h1>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-4">
              <CalendarDays size={20} className="text-[#0a55c7]" />
              <div>
                <p className="text-xs text-[#6b84a8]">Date</p>
                <p className="text-sm text-[#0f2a4a]">{formatDate(training.date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-4">
              <User size={20} className="text-[#0a55c7]" />
              <div>
                <p className="text-xs text-[#6b84a8]">Trainer</p>
                <p className="text-sm text-[#0f2a4a]">
                  {training.trainer || "ESA Facilitators"}
                </p>
              </div>
            </div>
            {training.duration && (
              <div className="flex items-center gap-3 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-4">
                <MonitorCog size={20} className="text-[#0a55c7]" />
                <div>
                  <p className="text-xs text-[#6b84a8]">Duration</p>
                  <p className="text-sm text-[#0f2a4a]">{training.duration}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-4">
              <Award size={20} className="text-[#d99a00]" />
              <div>
                <p className="text-xs text-[#6b84a8]">Certificate</p>
                <p className="text-sm text-[#0f2a4a]">
                  {training.certificate ? "Awarded" : "Not offered"}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 leading-relaxed text-[#3d5c87]">
            {training.description}
          </p>

          <div className="mt-8 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff]/60 p-5">
            {canRegister ? (
              <>
                <h2 className="font-display text-lg font-semibold text-[#0f2a4a]">
                  Register for this training
                </h2>
                <ServerActionForm
                  action={registerTraining}
                  submitLabel="Confirm Registration"
                  className="mt-4"
                >
                  <input type="hidden" name="trainingId" value={training.id} />
                </ServerActionForm>
              </>
            ) : (
              <div className="flex items-center gap-3 text-[#4d6a92]">
                <Lock size={18} />
                <p>
                  {user?.member
                    ? "Your membership is still being reviewed."
                    : "Log in as an approved member to register for training."}
                </p>
                <Link
                  href="/member"
                  className="ml-auto rounded-full bg-[#0047ab] px-5 py-2 text-sm font-semibold text-[#0f2a4a] hover:bg-[#1a6fd4]"
                >
                  Member Portal
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
