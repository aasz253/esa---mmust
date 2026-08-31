import Link from "next/link";
import { Reveal } from "@/components/Motion";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-20">
      <Reveal className="text-center">
        <p className="font-display text-7xl font-bold text-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-[#0f2a4a]">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[#5b7394]">
          The page you are looking for doesn't exist or has been moved. Let&apos;s
          get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-[#0047ab] px-7 py-3 font-semibold text-[#0f2a4a] transition hover:bg-[#1a6fd4]"
          >
            Back to Home
          </Link>
          <Link
            href="/events"
            className="rounded-full border border-[#c0d6f6] bg-[#eaf2ff] px-7 py-3 font-semibold text-[#0f2a4a] transition hover:bg-[#e2edff]"
          >
            Explore Events
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
