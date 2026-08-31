import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Motion";
import { HeartHandshake, Lock, Wallet } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/auth";
import { contributeWelfare } from "@/lib/actions";
import { ServerActionForm } from "@/components/ServerActionForm";

const presets = [100, 200, 500, 1000, 2000];

export default async function WelfarePage() {
  const user = await getCurrentUser();
  const canContribute = user?.member && user.member.status === "APPROVED";

  return (
    <>
      <PageHero
        tag="ESA Welfare"
        title="We Stand With Our Own."
        subtitle="Support ESA members during difficult situations — death of a parent, a sibling, an emergency, or other approved welfare cases."
        scene="heart"
        bgImage="/images/bg/innovation.jpg"
      />
      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="glass h-full rounded-3xl p-8">
                <span className="inline-flex rounded-xl bg-[#f0a500]/15 p-3 text-[#d99a00]">
                  <HeartHandshake size={28} />
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-[#0f2a4a]">
                  How Welfare Works
                </h2>
                <p className="mt-3 leading-relaxed text-[#4d6a92]">
                  Members contribute to a welfare pool that supports fellow
                  engineers in difficult situations. Contributions are
                  voluntary, with a minimum of{" "}
                  <strong className="text-[#0f2a4a]">
                    KSh {siteConfig.welfareMin}
                  </strong>
                  . Eligible situations include the loss of a parent, a sibling,
                  or an ESA student, serious emergencies, and other approved
                  cases handled confidentially by the committee.
                </p>
                <div className="mt-6 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff]/60 p-5">
                  <p className="text-sm text-[#4d6a92]">Payment details</p>
                  <p className="mt-2 flex items-center gap-2">
                    <Wallet size={18} className="text-[#d99a00]" />
                    <span className="font-display text-lg text-[#0f2a4a]">
                      Paybill {siteConfig.paybill}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-[#4d6a92]">
                    Account: <strong className="text-[#0f2a4a]">{siteConfig.account}</strong>
                  </p>
                  <p className="mt-3 text-xs text-[#6b84a8]">
                    After paying, submit your M-PESA reference below. A
                    committee member verifies each contribution manually.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass h-full rounded-3xl p-8">
                {canContribute ? (
                  <>
                    <h2 className="font-display text-xl font-bold text-[#0f2a4a]">
                      Contribute to Welfare
                    </h2>
                    <ServerActionForm
                      action={contributeWelfare}
                      submitLabel="Submit Contribution"
                      className="mt-5"
                    >
                      <label className="mb-1 block text-sm text-[#4d6a92]">
                        Amount (KSh)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {presets.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={(e) => {
                              const input =
                                e.currentTarget.parentElement?.parentElement?.querySelector(
                                  'input[name="amount"]'
                                ) as HTMLInputElement;
                              if (input) input.value = String(p);
                            }}
                            className="rounded-full border border-[#cadcf8] bg-[#eaf2ff] px-4 py-1.5 text-sm font-medium text-[#3d5c87] transition hover:border-[#f0a500]/50"
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                      <input
                        name="amount"
                        type="number"
                        min={siteConfig.welfareMin}
                        required
                        placeholder={`Minimum KSh ${siteConfig.welfareMin}`}
                        className="mt-3 w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] focus:border-[#3aa0ff] outline-none"
                      />
                      <label className="mb-1 mt-4 block text-sm text-[#4d6a92]">
                        M-PESA reference
                      </label>
                      <input
                        name="reference"
                        required
                        placeholder="e.g. QKX2Y7ABCD"
                        className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] focus:border-[#3aa0ff] outline-none"
                      />
                    </ServerActionForm>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <Lock size={40} className="mb-4 text-[#93a7c4]" />
                    <h2 className="font-display text-xl font-bold text-[#0f2a4a]">
                      Members can contribute
                    </h2>
                    <p className="mt-2 text-sm text-[#5b7394]">
                      Log in as an approved ESA member to make a welfare
                      contribution and view your history.
                    </p>
                    <Link
                      href="/member"
                      className="mt-6 rounded-full bg-[#0047ab] px-6 py-2.5 font-semibold text-[#0f2a4a] transition hover:bg-[#1a6fd4]"
                    >
                      Member Portal
                    </Link>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
