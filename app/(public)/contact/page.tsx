import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Motion";
import {
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Music2,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const socials = [
  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Twitter, href: siteConfig.social.x, label: "X / Twitter" },
  { icon: Music2, href: siteConfig.social.tiktok, label: "TikTok" },
  { icon: MessageCircle, href: siteConfig.social.whatsappChannel, label: "WhatsApp Channel" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        tag="Contact"
        title="Get in Touch with ESA"
        subtitle="Reach out to the Engineering Students Association for any inquiry, registration or support."
        scene="globe"
        bgImage="/images/bg/contact.jpg"
      />
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="glass h-full rounded-3xl p-8">
                <h2 className="font-display text-2xl font-bold text-[#0f2a4a]">
                  Contact Details
                </h2>
                <ul className="mt-6 space-y-5 text-[#3d5c87]">
                  <li className="flex items-start gap-4">
                    <span className="rounded-xl bg-[#0047ab]/20 p-3 text-[#0a55c7]">
                      <MapPin size={20} />
                    </span>
                    <div>
                      <p className="font-semibold text-[#0f2a4a]">Location</p>
                      <p className="text-sm">
                        Masinde Muliro University of Science &amp; Technology,
                        Kakamega, Kenya
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="rounded-xl bg-[#0047ab]/20 p-3 text-[#0a55c7]">
                      <Mail size={20} />
                    </span>
                    <div>
                      <p className="font-semibold text-[#0f2a4a]">Email</p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-sm text-[#0a55c7] hover:underline"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="rounded-xl bg-[#0047ab]/20 p-3 text-[#0a55c7]">
                      <MessageCircle size={20} />
                    </span>
                    <div>
                      <p className="font-semibold text-[#0f2a4a]">WhatsApp Channel</p>
                      <a
                        href={siteConfig.social.whatsappChannel}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#0a55c7] hover:underline"
                      >
                        Join our updates
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="rounded-xl bg-[#0047ab]/20 p-3 text-[#0a55c7]">
                      <Clock size={20} />
                    </span>
                    <div>
                      <p className="font-semibold text-[#0f2a4a]">Hours</p>
                      <p className="text-sm">
                        Academic Hours · Mon–Fri, 8:00 AM – 5:00 PM
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass h-full rounded-3xl p-8">
                <h2 className="font-display text-2xl font-bold text-[#0f2a4a]">
                  Connect with ESA
                </h2>
                <p className="mt-3 text-sm text-[#4d6a92]">
                  Follow official ESA social media channels — all opened in a
                  new tab.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff] p-4 transition hover:border-[#3aa0ff]/30 hover:bg-[#e2edff]"
                    >
                      <s.icon size={22} className="text-[#0a55c7]" />
                      <span className="text-sm font-medium text-[#0f2a4a]">
                        {s.label}
                      </span>
                    </a>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff]/60 p-5">
                  <p className="text-sm text-[#4d6a92]">
                    For membership, welfare or event inquiries, email us or
                    reach out on WhatsApp.
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0047ab] px-6 py-2.5 text-sm font-semibold text-[#0f2a4a] transition hover:bg-[#1a6fd4]"
                  >
                    <Mail size={16} /> Email ESA
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
