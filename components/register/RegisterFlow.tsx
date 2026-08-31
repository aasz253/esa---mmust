"use client";
import { useState } from "react";
import Link from "next/link";
import { GraduationCap, RefreshCcw, ArrowRight } from "lucide-react";
import { registerMember } from "@/lib/actions";
import { ServerActionForm } from "@/components/ServerActionForm";
import { siteConfig } from "@/config/site";

export function RegisterFlow() {
  const [mode, setMode] = useState<"first" | "continuing">("first");

  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => setMode("first")}
          className={`flex items-center gap-3 rounded-2xl border p-5 text-left transition ${
            mode === "first"
              ? "border-[#3aa0ff] bg-[#0a55c7]/10"
              : "border-[#d4e2fa] bg-[#eaf2ff] hover:bg-[#e2edff]"
          }`}
        >
          <GraduationCap size={28} className="text-[#0a55c7]" />
          <div>
            <p className="font-display font-semibold text-[#0f2a4a]">
              First-Year Student
            </p>
            <p className="text-sm text-[#5b7394]">New membership</p>
          </div>
        </button>
        <button
          onClick={() => setMode("continuing")}
          className={`flex items-center gap-3 rounded-2xl border p-5 text-left transition ${
            mode === "continuing"
              ? "border-[#3aa0ff] bg-[#0a55c7]/10"
              : "border-[#d4e2fa] bg-[#eaf2ff] hover:bg-[#e2edff]"
          }`}
        >
          <RefreshCcw size={28} className="text-[#0a55c7]" />
          <div>
            <p className="font-display font-semibold text-[#0f2a4a]">
              Continuing Student
            </p>
            <p className="text-sm text-[#5b7394]">Membership renewal</p>
          </div>
        </button>
      </div>

      <div className="mt-8 rounded-3xl glass-strong p-6 sm:p-8">
        {mode === "first" ? (
          <>
            <h2 className="font-display text-2xl font-bold text-[#0f2a4a]">
              Register as a first-year member
            </h2>
            <p className="mt-2 text-sm text-[#5b7394]">
              Fill the form below. Your registration will be reviewed by the
              committee and you will be notified once approved.
            </p>
            <ServerActionForm
              action={registerMember}
              submitLabel="Submit Registration"
              className="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <Field label="Full name" name="fullName" placeholder="Jane Wanjiru" />
              <Field label="Registration number" name="registrationNo" placeholder="CIT/2026/001" />
              <Field label="Programme" name="programme" placeholder="BSc. Electrical Engineering" />
              <Field label="Year" name="year" placeholder="Year 1" />
              <Field label="Department" name="department" placeholder="Electrical Engineering" />
              <Field label="School / Faculty" name="school" placeholder="School of Engineering" />
              <Field label="Phone" name="phone" type="tel" placeholder="0712345678" />
              <Field label="Email" name="email" type="email" placeholder="you@mmust.ac.ke" />
              <label className="text-[#0f2a4a]">
                <span className="mb-1 block text-sm text-[#4d6a92]">Gender (optional)</span>
                <select
                  name="gender"
                  className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <Field
                label="M-PESA reference (optional)"
                name="reference"
                placeholder="e.g. QKX2Y7ABCD"
              />
              <p className="text-xs text-[#6b84a8] sm:col-span-2">
                By submitting, you agree to the ESA terms and consent to your
                limited information being shown in the member directory.
              </p>
            </ServerActionForm>
          </>
        ) : (
          <div className="text-center">
            <RefreshCcw size={40} className="mx-auto text-[#0a55c7]" />
            <h2 className="mt-4 font-display text-2xl font-bold text-[#0f2a4a]">
              Continuing student renewal
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-[#4d6a92]">
              Renew your membership for the{" "}
              <strong className="text-[#0f2a4a]">{siteConfig.academicYear}</strong>{" "}
              academic year at a fee of{" "}
              <strong className="text-[#0f2a4a]">KSh {siteConfig.renewalFee}</strong>
              . Log in to your member portal to renew and submit your M-PESA
              reference.
            </p>
            <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff]/60 p-4 text-left text-sm text-[#4d6a92]">
              <p>
                Paybill <strong className="text-[#0f2a4a]">{siteConfig.paybill}</strong>
              </p>
              <p>
                Account <strong className="text-[#0f2a4a]">{siteConfig.account}</strong>
              </p>
              <p className="mt-2 text-xs text-[#6b84a8]">
                Amount: KSh {siteConfig.renewalFee} · Reference: your M-PESA code
              </p>
            </div>
            <Link
              href="/member"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f0a500] px-7 py-3 font-semibold text-[#0f2a4a] transition hover:brightness-110"
            >
              Go to Member Portal <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="text-[#0f2a4a]">
      <span className="mb-1 block text-sm text-[#4d6a92]">{label}</span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
      />
    </label>
  );
}
