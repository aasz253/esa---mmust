"use server";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  setSession,
  clearSession,
  getCurrentUser,
  requireAdmin,
} from "@/lib/auth";
import { siteConfig } from "@/config/site";
import { revalidatePath } from "next/cache";

const regSchema = z.object({
  fullName: z.string().min(3, "Enter your full name"),
  registrationNo: z.string().min(3, "Enter your registration number"),
  programme: z.string().min(2, "Enter your programme"),
  year: z.string().min(1, "Select your year"),
  phone: z.string().min(9, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  gender: z.string().optional(),
  department: z.string().min(2, "Enter your department"),
  school: z.string().optional(),
  reference: z.string().optional(),
});

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").toLowerCase();
  const password = String(formData.get("password") || "");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "Invalid email or password." };
  }
  await setSession(user.id);
  redirect(user.role === "MEMBER" ? "/member" : "/admin");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}

export async function registerMember(formData: FormData) {
  const parsed = regSchema.safeParse({
    fullName: formData.get("fullName"),
    registrationNo: formData.get("registrationNo"),
    programme: formData.get("programme"),
    year: formData.get("year"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    gender: formData.get("gender") || undefined,
    department: formData.get("department"),
    school: formData.get("school") || undefined,
    reference: formData.get("reference") || undefined,
  });
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message || "Please check the form.",
    };
  }
  const d = parsed.data;
  const existing = await prisma.user.findUnique({
    where: { email: d.email.toLowerCase() },
  });
  if (existing) return { error: "An account with this email already exists." };

  const count = await prisma.member.count();
  const memberId = `ESA-${new Date().getFullYear()}${String(count + 1).padStart(3, "0")}`;
  const password = await bcrypt.hash("member123", 10);

  const user = await prisma.user.create({
    data: {
      email: d.email.toLowerCase(),
      password,
      name: d.fullName,
      role: "MEMBER",
      member: {
        create: {
          memberId,
          fullName: d.fullName,
          registrationNo: d.registrationNo.toUpperCase(),
          programme: d.programme,
          year: d.year,
          phone: d.phone,
          email: d.email.toLowerCase(),
          gender: d.gender || "",
          department: d.department,
          school: d.school || "School of Engineering",
          academicYear: siteConfig.academicYear,
          status: "PENDING",
        },
      },
    },
  });
  await setSession(user.id);
  redirect("/member?registered=1");
}

export async function renewMember(formData: FormData) {
  const user = await getCurrentUser();
  if (!user?.member) return { error: "Please log in as a member first." };
  const reference = String(formData.get("reference") || "").trim();
  if (!reference) return { error: "Enter your M-PESA reference." };

  await prisma.membershipRenewal.create({
    data: {
      memberId: user.member.id,
      amount: siteConfig.renewalFee,
      semester: "Semester 1",
      academicYear: siteConfig.academicYear,
      reference,
    },
  });
  revalidatePath("/member");
  return { success: true };
}

export async function contributeWelfare(formData: FormData) {
  const user = await getCurrentUser();
  if (!user?.member) return { error: "Please log in as a member first." };
  const amount = Number(formData.get("amount"));
  const reference = String(formData.get("reference") || "").trim();
  if (!amount || amount < siteConfig.welfareMin)
    return { error: `Minimum contribution is KSh ${siteConfig.welfareMin}.` };
  if (!reference) return { error: "Enter your M-PESA reference." };

  await prisma.welfareContribution.create({
    data: {
      memberId: user.member.id,
      amount,
      semester: "Semester 1",
      academicYear: siteConfig.academicYear,
      reference,
    },
  });
  await prisma.payment.create({
    data: {
      reference,
      memberId: user.member.id,
      userId: user.id,
      amount,
      purpose: "Welfare Contribution",
      semester: "Semester 1",
      academicYear: siteConfig.academicYear,
    },
  });
  revalidatePath("/member");
  return { success: true };
}

export async function registerTraining(formData: FormData) {
  const user = await getCurrentUser();
  if (!user?.member) return { error: "Please log in as a member first." };
  const trainingId = String(formData.get("trainingId") || "");
  const exists = await prisma.trainingRegistration.findFirst({
    where: { trainingId, memberId: user.member.id },
  });
  if (exists) return { error: "You are already registered for this training." };
  await prisma.trainingRegistration.create({
    data: { trainingId, memberId: user.member.id },
  });
  revalidatePath("/training");
  return { success: true };
}

export async function registerEvent(formData: FormData) {
  const user = await getCurrentUser();
  if (!user?.member) return { error: "Please log in as a member first." };
  const eventId = String(formData.get("eventId") || "");
  const exists = await prisma.eventRegistration.findFirst({
    where: { eventId, memberId: user.member.id },
  });
  if (exists) return { error: "You are already registered for this event." };
  await prisma.eventRegistration.create({
    data: { eventId, memberId: user.member.id },
  });
  revalidatePath("/events");
  return { success: true };
}

export async function updateMemberStatus(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const memberId = String(formData.get("memberId") || "");
  const status = String(formData.get("status") || "");
  await prisma.member.update({
    where: { id: memberId },
    data: { status },
  });
  revalidatePath("/admin/members");
}

export async function createEvent(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const raw = Object.fromEntries(formData.entries());
  const date = new Date(String(raw.date));
  const res = await prisma.event.create({
    data: {
      title: String(raw.title),
      slug: String(raw.title).toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString(36),
      description: String(raw.description || "No description yet."),
      date,
      startTime: String(raw.startTime || "10:00 AM"),
      endTime: String(raw.endTime || "4:00 PM"),
      venue: String(raw.venue || "MMUST Main Campus"),
      category: String(raw.category || "General"),
      coverImage: String(raw.coverImage || "") || null,
      status: date >= new Date() ? "UPCOMING" : "COMPLETED",
      featured: raw.featured === "on",
      organizer: String(raw.organizer || "ESA MMUST"),
    },
  });
  revalidatePath("/events");
  revalidatePath("/admin/events");
  return { success: true, id: res.id };
}

export async function deleteEvent(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const id = String(formData.get("id") || "");
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export async function createAnnouncement(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  await prisma.announcement.create({
    data: {
      title: String(formData.get("title") || ""),
      content: String(formData.get("content") || ""),
      category: String(formData.get("category") || "General"),
      featured: formData.get("featured") === "on",
    },
  });
  revalidatePath("/admin/announcements");
  revalidatePath("/");
}

export async function deleteAnnouncement(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const id = String(formData.get("id") || "");
  await prisma.announcement.delete({ where: { id } });
  revalidatePath("/admin/announcements");
  revalidatePath("/");
}

export async function createTraining(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  await prisma.training.create({
    data: {
      title: String(formData.get("title") || ""),
      slug: String(formData.get("title") || "").toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString(36),
      software: String(formData.get("software") || ""),
      category: String(formData.get("category") || "CAD"),
      purpose: String(formData.get("purpose") || ""),
      description: String(formData.get("description") || ""),
      date: new Date(String(formData.get("date") || Date.now())),
      trainer: String(formData.get("trainer") || "") || null,
      duration: String(formData.get("duration") || "") || null,
      seats: Number(formData.get("seats") || 0) || null,
      certificate: formData.get("certificate") === "on",
      status: "UPCOMING",
    },
  });
  revalidatePath("/admin/training");
  revalidatePath("/training");
}

export async function deleteTraining(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const id = String(formData.get("id") || "");
  await prisma.training.delete({ where: { id } });
  revalidatePath("/admin/training");
  revalidatePath("/training");
}

export async function createProduct(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const name = String(formData.get("name") || "");
  await prisma.product.create({
    data: {
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString(36),
      category: String(formData.get("category") || "Apparel"),
      description: String(formData.get("description") || ""),
      price: Number(formData.get("price") || 0) || null,
      stock: Number(formData.get("stock") || 0) || 0,
      sizes: String(formData.get("sizes") || ""),
      colors: String(formData.get("colors") || ""),
      image: String(formData.get("image") || "") || null,
      featured: formData.get("featured") === "on",
      active: true,
    },
  });
  revalidatePath("/admin/products");
  revalidatePath("/store");
}

export async function deleteProduct(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const id = String(formData.get("id") || "");
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/store");
}

export async function createLeader(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const count = await prisma.leader.count();
  await prisma.leader.create({
    data: {
      name: String(formData.get("name") || ""),
      position: String(formData.get("position") || ""),
      programme: String(formData.get("programme") || "") || null,
      year: String(formData.get("year") || "") || null,
      bio: String(formData.get("bio") || "") || null,
      photo: String(formData.get("photo") || "") || null,
      order: count + 1,
    },
  });
  revalidatePath("/admin/leadership");
  revalidatePath("/leadership");
}

export async function deleteLeader(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;
  const id = String(formData.get("id") || "");
  await prisma.leader.delete({ where: { id } });
  revalidatePath("/admin/leadership");
  revalidatePath("/leadership");
}
