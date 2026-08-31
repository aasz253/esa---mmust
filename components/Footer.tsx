import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Mail,
  Youtube,
  Music2,
  MapPin,
  Clock,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const socials = [
  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Twitter, href: siteConfig.social.x, label: "X / Twitter" },
  { icon: Music2, href: siteConfig.social.tiktok, label: "TikTok" },
  { icon: MessageCircle, href: siteConfig.social.whatsappChannel, label: "WhatsApp Channel" },
];

const nav = [
  { href: "/about", label: "About ESA" },
  { href: "/events", label: "Events" },
  { href: "/trips", label: "Academic Trips" },
  { href: "/training", label: "Training" },
  { href: "/welfare", label: "Welfare" },
  { href: "/members", label: "Members" },
  { href: "/store", label: "Store" },
  { href: "/leadership", label: "Leadership" },
  { href: "/contact", label: "Contact" },
  { href: "/register", label: "Join ESA" },
  { href: "/member", label: "Member Portal" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[#d4e2fa] bg-[#dbe7fa]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/esa-logo.jpg"
                alt="ESA logo"
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="font-display text-xl font-bold text-[#0f2a4a]">
                ESA <span className="text-[#0a55c7]">MMUST</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#5b7394]">
              The digital home of engineering students at MMUST. Connecting
              students through academics, innovation, leadership and welfare.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-lg bg-[#eaf2ff] p-2.5 text-[#4d6a92] transition hover:bg-[#0047ab] hover:text-[#0f2a4a]"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#6b84a8]">
              Navigation
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {nav.map((n) => (
                <li key={n.href + n.label}>
                  <Link
                    href={n.href}
                    className="text-[#4d6a92] transition hover:text-[#0a55c7]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#6b84a8]">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#4d6a92]">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-[#0a55c7]" />
                Masinde Muliro University of Science &amp; Technology, Kakamega,
                Kenya
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#0a55c7]" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-[#0a55c7]"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-[#0a55c7]" />
                Academic Hours · Mon–Fri, 8:00 AM – 5:00 PM
              </li>
            </ul>
            <div className="mt-6 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-4">
              <p className="text-xs uppercase tracking-wider text-[#6b84a8]">
                ESA WhatsApp Channel
              </p>
              <a
                href={siteConfig.social.whatsappChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#0a55c7] hover:underline"
              >
                <MessageCircle size={16} /> Join our updates
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#d4e2fa] pt-6 text-xs text-[#6b84a8] sm:flex-row">
          <p>
            © {new Date().getFullYear()} ESA — Engineering Students Association,
            MMUST. All rights reserved.
          </p>
          <p>{siteConfig.university}</p>
        </div>
      </div>
    </footer>
  );
}
