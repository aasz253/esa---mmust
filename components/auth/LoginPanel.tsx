"use client";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { loginAction } from "@/lib/actions";
import { UserRound } from "lucide-react";

type LoginResult = { error?: string } | void;

export function LoginPanel() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLFormElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = (await loginAction(fd)) as LoginResult;
      if (res && "error" in res && res.error) setError(res.error || null);
    });
  }

  return (
    <div className="glass-strong mx-auto max-w-md rounded-3xl p-8">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0047ab]/20 text-[#0a55c7]">
        <UserRound size={28} />
      </span>
      <h1 className="mt-4 text-center font-display text-2xl font-bold text-[#0f2a4a]">
        Member Portal
      </h1>
      <p className="mt-2 text-center text-sm text-[#5b7394]">
        Log in to renew membership, contribute to welfare and register for
        events and training.
      </p>
      <form ref={ref} onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm text-[#4d6a92]">Email</span>
          <input
            name="email"
            type="email"
            required
            placeholder="you@mmust.ac.ke"
            className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm text-[#4d6a92]">Password</span>
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-xl border border-[#d4e2fa] bg-[#eaf2ff] px-4 py-3 text-[#0f2a4a] outline-none focus:border-[#3aa0ff]"
          />
        </label>
        {error && (
          <p className="rounded-xl bg-red-500/15 p-3 text-center text-sm text-red-400">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-[#0047ab] py-3 font-semibold text-[#0f2a4a] transition hover:bg-[#1a6fd4] disabled:opacity-50"
        >
          {pending ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-[#5b7394]">
        Not a member?{" "}
        <Link href="/register" className="font-medium text-[#0a55c7] hover:underline">
          Join ESA
        </Link>
      </p>
    </div>
  );
}
