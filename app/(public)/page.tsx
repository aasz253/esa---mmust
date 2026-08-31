import Link from "next/link";
import {
  GraduationCap,
  Award,
  Lightbulb,
  Users,
  Handshake,
  HeartHandshake,
  Factory,
  Cpu,
  Bus,
  MonitorCog,
  Shirt,
  CalendarDays,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";
import { Hero3D } from "@/components/hero/Hero3D";
import { QuickActions } from "@/components/home/QuickActions";
import { EngineeringTimeline } from "@/components/home/EngineeringTimeline";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { Text3D } from "@/components/Text3D";
import { Image3DCard } from "@/components/Image3DCard";
import { EngineeringMarquee } from "@/components/EngineeringMarquee";
import { TiltCard } from "@/components/TiltCard";
import { ProductCard } from "@/components/ProductCard";
import { EventCard } from "@/components/EventCard";
import {
  getUpcomingEvents,
  getTrainings,
  getTrips,
  getProducts,
  getLeaders,
  getAnnouncements,
  getGallery,
  getStats,
  getEvents,
} from "@/lib/data";
import { siteConfig } from "@/config/site";

const objectives = [
  { icon: GraduationCap, title: "Academic Excellence", desc: "Supporting engineering students to thrive academically." },
  { icon: Award, title: "Professional Development", desc: "Workshops, talks and mentorship to build professional skills." },
  { icon: Lightbulb, title: "Innovation", desc: "Encouraging creative projects, design and engineering solutions." },
  { icon: Users, title: "Leadership", desc: "Developing the next generation of engineering leaders." },
  { icon: Handshake, title: "Networking", desc: "Connecting students with peers, alumni and industry." },
  { icon: HeartHandshake, title: "Community Service", desc: "Giving back to the community through outreach." },
  { icon: Cpu, title: "Student Welfare", desc: "Standing with our members in times of need (We Stand With Our Own)." },
  { icon: Factory, title: "Industrial Exposure", desc: "Academic trips and site visits to engineering organisations." },
];

const why = [
  { title: "One Engineering Community", desc: "All engineering programmes at MMUST under one roof." },
  { title: "Active Calendar", desc: "Events, training, trips and debates all year round." },
  { title: "Student Welfare", desc: "A supportive association that stands with its members." },
  { title: "Industry Connections", desc: "Visits and talks that open doors to careers." },
];

export default async function HomePage() {
  const [upcoming, trainings, trips, products, leaders, announcements, gallery, stats, allEvents] =
    await Promise.all([
      getUpcomingEvents(6),
      getTrainings(),
      getTrips(),
      getProducts(true),
      getLeaders(),
      getAnnouncements(),
      getGallery(),
      getStats(),
      getEvents(),
    ]);

  const featuredLeaders = leaders.slice(0, 4);
  const featuredProducts = products.slice(0, 8);

  return (
    <>
      <Hero3D />
      <QuickActions />

      {/* Continuous scrolling engineering showcase */}
      <section className="relative py-10">
        <div className="mb-6 text-center">
          <Text3D as="h2" className="font-display text-2xl font-bold sm:text-3xl">
            Engineering in Motion
          </Text3D>
        </div>
        <EngineeringMarquee speed={45} />
      </section>

      {/* About ESA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="mb-3 inline-block rounded-full border border-[#3aa0ff]/30 bg-[#0a55c7]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#0a55c7]">
                About ESA
              </span>
              <Text3D as="h2" className="font-display text-3xl font-bold sm:text-4xl">
                Engineering students building the future.
              </Text3D>
              <p className="mt-5 text-base leading-relaxed text-[#4d6a92]">
                {siteConfig.fullName} provides a platform for engineering
                students at MMUST to connect, learn, collaborate, participate in
                professional activities, support each other and develop
                leadership skills.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { k: stats.members, l: "Active Members" },
                  { k: stats.events, l: "Events & Activities" },
                  { k: "100%", l: "Engineering-focused" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="glass rounded-2xl p-4 text-center"
                  >
                    <p className="font-display text-3xl font-bold text-gradient">
                      {typeof s.k === "number" ? s.k.toLocaleString() : s.k}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-[#5b7394]">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 font-medium text-[#0a55c7] hover:underline"
              >
                Learn more about ESA <ArrowRight size={16} />
              </Link>
            </Reveal>
            <Reveal delay={0.15}>
              <TiltCard intensity={6} className="overflow-hidden rounded-3xl border border-[#d4e2fa] shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/all-members.jpg"
                  alt="ESA MMUST members"
                  className="h-full w-full object-cover"
                />
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="relative py-24">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(26,93,255,0.12), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading
            tag="Our Purpose"
            title="What We Stand For"
            subtitle="Eight pillars guide everything we do for engineering students at MMUST."
          />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {objectives.map((o) => (
              <StaggerItem key={o.title}>
                <div className="group glass h-full rounded-2xl p-6 transition hover:-translate-y-1 hover:border-[#3aa0ff]/30">
                  <span className="inline-flex rounded-xl bg-[#0047ab]/20 p-3 text-[#0a55c7] transition group-hover:bg-[#0047ab] group-hover:text-[#0f2a4a]">
                    <o.icon size={24} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-[#0f2a4a]">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5b7394]">
                    {o.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            tag="What's happening"
            title="Upcoming Engineering Events"
            subtitle="The nearest events, automatically sorted from our live calendar."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full border border-[#c0d6f6] bg-[#eaf2ff] px-7 py-3 font-semibold text-[#0f2a4a] transition hover:bg-[#e2edff]"
            >
              View Full Calendar <CalendarDays size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Engineering Calendar timeline */}
      <section className="relative py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading
            tag="Engineering Calendar"
            title="The Year at a Glance"
            subtitle="From admission to elections — an academic year of engineering activities."
          />
          <div className="mt-16">
            <EngineeringTimeline events={allEvents} />
          </div>
        </div>
      </section>

      {/* Training / Skills lab */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            tag="Engineering Skills Lab"
            title="Software Installation & Training"
            subtitle="Hands-on training in CAD, simulation, programming and engineering design."
          />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trainings.slice(0, 4).map((t) => (
              <StaggerItem key={t.id}>
                <Link
                  href={`/training/${t.slug}`}
                  className="group glass flex h-full flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:border-[#3aa0ff]/30"
                >
                  <span className="inline-flex w-fit rounded-xl bg-[#0047ab]/20 p-3 text-[#0a55c7]">
                    <MonitorCog size={22} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-[#0f2a4a]">
                    {t.software}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#0a55c7]">
                    {t.category}
                  </p>
                  <p className="mt-2 flex-1 text-sm text-[#5b7394]">
                    {t.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm text-[#4d6a92]">
                    <span>{t.trainer || "ESA"}</span>
                    <ArrowRight size={16} className="text-[#0a55c7]" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Academic trips */}
      <section className="relative py-24">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 80% 30%, rgba(55,215,255,0.1), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              align="left"
              tag="Industrial Exposure"
              title="Engineering Academic Trips"
              subtitle="Site visits that bring engineering theory to life."
            />
            <Reveal className="hidden sm:block">
              <Link
                href="/trips"
                className="inline-flex items-center gap-2 rounded-full border border-[#c0d6f6] bg-[#eaf2ff] px-6 py-3 font-semibold text-[#0f2a4a] transition hover:bg-[#e2edff]"
              >
                All Trips <Bus size={18} />
              </Link>
            </Reveal>
          </div>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {trips.slice(0, 3).map((t) => (
              <StaggerItem key={t.id}>
                <div className="group glass flex h-full flex-col overflow-hidden rounded-2xl">
                  <div className="relative h-36 overflow-hidden">
                    {t.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.coverImage}
                        alt={t.title}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#e2edff]">
                        <Bus size={40} className="text-[#93a7c4]" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-[#0f2a4a]">
                      {t.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#0a55c7]">
                      {t.destination}
                    </p>
                    <p className="mt-2 text-sm text-[#5b7394]">{t.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Welfare */}
      <section className="relative py-24">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,179,58,0.08), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="glass grid gap-8 rounded-3xl p-8 md:grid-cols-2 md:p-12">
            <Reveal>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#f0a500]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#d99a00]">
                <HeartHandshake size={14} /> ESA Welfare
              </span>
              <h2 className="font-display text-3xl font-bold text-[#0f2a4a] sm:text-4xl">
                We Stand With Our Own.
              </h2>
              <p className="mt-4 text-[#4d6a92]">
                Support ESA members during difficult situations — from the loss
                of a parent to serious emergencies. Contribute a minimum of{" "}
                <strong className="text-[#0f2a4a]">KSh {siteConfig.welfareMin}</strong>{" "}
                and help stand with a fellow engineer.
              </p>
              <div className="mt-6 rounded-2xl border border-[#d4e2fa] bg-[#eaf2ff]/60 p-4">
                <p className="text-sm text-[#4d6a92]">
                  Paybill <strong className="text-[#0f2a4a]">{siteConfig.paybill}</strong> ·
                  Account <strong className="text-[#0f2a4a]">{siteConfig.account}</strong>
                </p>
              </div>
              <Link
                href="/welfare"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#f0a500] px-7 py-3 font-semibold text-[#0f2a4a] transition hover:brightness-110"
              >
                Contribute to Welfare <ArrowRight size={18} />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-6 text-center">
                  <p className="font-display text-4xl font-bold text-[#d99a00]">
                    {stats.welfareTotal.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#5b7394]">
                    KSh Contributed
                  </p>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <p className="font-display text-4xl font-bold text-[#0f2a4a]">
                    {stats.members}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#5b7394]">
                    Members supported
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Store */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              align="left"
              tag="ESA Store"
              title="Featured Merchandise"
              subtitle="Wear your engineering pride."
            />
            <Reveal className="hidden sm:block">
              <Link
                href="/store"
                className="inline-flex items-center gap-2 rounded-full border border-[#c0d6f6] bg-[#eaf2ff] px-6 py-3 font-semibold text-[#0f2a4a] transition hover:bg-[#e2edff]"
              >
                <Shirt size={18} /> View Store
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Why ESA + Leadership preview */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            tag="Why ESA"
            title="One Engineering Community"
          />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <StaggerItem key={w.title}>
                <div className="bg-animated h-full rounded-2xl p-6">
                  <Sparkles size={20} className="text-[#ffd54f]" />
                  <h3 className="mt-3 font-display text-lg font-semibold text-white">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/85">{w.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {featuredLeaders.length > 0 && (
            <div className="mt-20">
              <SectionHeading
                tag="Leadership"
                title="Meet the ESA Committee"
              />
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {featuredLeaders.map((l) => (
                  <TiltCard
                    key={l.id}
                    intensity={7}
                    className="glass overflow-hidden rounded-2xl"
                  >
                    <div className="relative h-64 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={l.photo || "/images/all-members.jpg"}
                        alt={l.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/40 to-transparent p-4">
                        <h3 className="font-display text-base font-semibold text-[#0f2a4a] drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                          {l.name}
                        </h3>
                        <p className="text-sm font-medium text-[#0a55c7]">{l.position}</p>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
              <Reveal className="mt-8 text-center">
                <Link
                  href="/leadership"
                  className="inline-flex items-center gap-2 font-medium text-[#0a55c7] hover:underline"
                >
                  View Full Leadership <ArrowRight size={16} />
                </Link>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* Announcements */}
      {announcements.length > 0 && (
        <section className="relative py-24">
          <div className="mx-auto max-w-5xl px-6">
            <SectionHeading
              tag="Bulletin"
              title="Latest Announcements"
            />
            <Stagger className="mt-12 space-y-4">
              {announcements.slice(0, 3).map((a) => (
                <StaggerItem key={a.id}>
                  <div className="glass flex items-start gap-4 rounded-2xl p-5">
                    <span className="mt-1 rounded-xl bg-[#f0a500]/15 p-2.5 text-[#d99a00]">
                      <Star size={18} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-[#0f2a4a]">
                        {a.title}
                      </h3>
                      <p className="mt-1 text-sm text-[#4d6a92]">{a.content}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Gallery preview */}
      {gallery.length > 0 && (
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading tag="Memories" title="Event Gallery" />
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery[0].media.map((m, i) => (
                <Reveal key={m.id} delay={i * 0.05}>
                  <a
                    href="/events"
                    className="group block overflow-hidden rounded-2xl"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.url}
                      alt={m.title || "ESA gallery"}
                      className="h-40 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social + Join CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="bg-animated overflow-hidden rounded-3xl p-8 text-center md:p-14">
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white">
              Connect with ESA
            </span>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Be part of the engineering community.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/90">
              Follow ESA on social media and join the association to access
              events, training, welfare and the full engineering experience at
              MMUST.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-[#0047ab] transition hover:bg-[#ffe082] sm:w-auto"
              >
                <GraduationCap size={18} /> Join ESA Now
              </Link>
              <Link
                href="/member"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/15 px-8 py-3.5 font-semibold text-white transition hover:bg-white/25 sm:w-auto"
              >
                Member Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
