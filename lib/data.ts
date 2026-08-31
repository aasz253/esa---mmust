import "server-only";
import { prisma } from "@/lib/prisma";

export async function getEvents() {
  return prisma.event.findMany({
    orderBy: [{ featured: "desc" }, { date: "asc" }],
  });
}

export async function getEvent(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: { media: true, registrations: true },
  });
}

export async function getUpcomingEvents(limit = 6) {
  const now = new Date();
  return prisma.event.findMany({
    where: { date: { gte: now } },
    orderBy: [{ featured: "desc" }, { date: "asc" }],
    take: limit,
  });
}

export async function getPastEvents() {
  const now = new Date();
  return prisma.event.findMany({
    where: { date: { lt: now } },
    orderBy: { date: "desc" },
  });
}

export async function getAnnouncements() {
  return prisma.announcement.findMany({
    orderBy: [{ featured: "desc" }, { priority: "desc" }, { createdAt: "desc" }],
  });
}

export async function getTrips() {
  return prisma.trip.findMany({ orderBy: { date: "desc" } });
}

export async function getTrainings() {
  return prisma.training.findMany({ orderBy: { date: "asc" } });
}

export async function getTraining(slug: string) {
  return prisma.training.findUnique({
    where: { slug },
    include: { registrations: true },
  });
}

export async function getProducts(featuredOnly = false) {
  return prisma.product.findMany({
    where: featuredOnly ? { active: true, featured: true } : { active: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProduct(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}

export async function getLeaders() {
  return prisma.leader.findMany({ orderBy: { order: "asc" } });
}

export async function getMembers() {
  return prisma.member.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
  });
}

export async function getGallery() {
  return prisma.galleryAlbum.findMany({
    include: { media: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getStats() {
  const [members, events, trainings, contributions] = await Promise.all([
    prisma.member.count({ where: { status: "APPROVED" } }),
    prisma.event.count(),
    prisma.training.count(),
    prisma.welfareContribution.aggregate({ _sum: { amount: true } }),
  ]);
  return {
    members,
    events,
    trainings,
    welfareTotal: contributions._sum.amount || 0,
  };
}
