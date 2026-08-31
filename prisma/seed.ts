import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Wipe (dev convenience)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.trainingRegistration.deleteMany();
  await prisma.eventMedia.deleteMany();
  await prisma.event.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.training.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.leader.deleteMany();
  await prisma.galleryMedia.deleteMany();
  await prisma.galleryAlbum.deleteMany();
  await prisma.welfareContribution.deleteMany();
  await prisma.welfareCase.deleteMany();
  await prisma.membershipRenewal.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.member.deleteMany();
  await prisma.user.deleteMany();

  // ---- Admin user ----
  const adminPass = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      email: "admin@esa.mmust.ke",
      password: adminPass,
      name: "ESA Administrator",
      role: "ADMIN",
    },
  });

  // ---- Members ----
  const memberPass = await bcrypt.hash("member123", 10);
  const m1 = await prisma.user.create({
    data: {
      email: "student@mmust.ac.ke",
      password: memberPass,
      name: "Jane Wanjiru",
      role: "MEMBER",
      member: {
        create: {
          memberId: "ESA-2026001",
          fullName: "Jane Wanjiru",
          registrationNo: "CIT/2025/001",
          programme: "BSc. Electrical & Electronic Engineering",
          year: "Year 2",
          phone: "0712345678",
          email: "student@mmust.ac.ke",
          gender: "Female",
          department: "Electrical Engineering",
          school: "School of Engineering",
          academicYear: "2026/2027",
          status: "APPROVED",
        },
      },
    },
    include: { member: true },
  });

  // ---- Leaders (real photos) ----
  const leaders = [
    { name: "Onyango Finlay Gengere", position: "Chairperson ESA", programme: "BSc. Electrical & Electronic Engineering", year: "Year 4", bio: "Leading ESA with a vision of a connected, engaged and empowered engineering community at MMUST.", photo: "/images/leader-chairperson.jpg", order: 1 },
    { name: "Celestine Beldine", position: "Vice Chairperson", programme: "BSc. Civil Engineering", year: "Year 3", bio: "Supporting the chairperson and coordinating leadership activities across the association.", photo: "/images/leader-vice-chairperson.jpg", order: 2 },
    { name: "Vincent Ojieng", position: "Treasurer", programme: "BSc. Mechanical Engineering", year: "Year 3", bio: "Managing ESA finances, welfare collections and membership records with transparency.", photo: "/images/leader-treasurer.jpg", order: 3 },
    { name: "Zerubabel Alphonce", position: "Coordinator", programme: "BSc. Electrical & Electronic Engineering", year: "Year 4", bio: "Coordinating events, academic trips and training programmes across all departments.", photo: "/images/leader-coordinator.jpg", order: 4 },
    { name: "Magret Waburi Kamau", position: "Organising Secretary", programme: "BSc. Civil Engineering", year: "Year 3", bio: "Planning and organising ESA functions, retreats and community activities.", photo: "/images/leader-organising-secretary.jpg", order: 5 },
    { name: "David Otieno", position: "Editor General", programme: "BSc. Mechanical Engineering", year: "Year 3", bio: "Editing ESA communications, announcements and the engineering calendar.", photo: "/images/leader-editor-general.jpg", order: 6 },
    { name: "Emmanuel Ojwang Sebe", position: "Male Representative", programme: "BSc. Mechatronic Engineering", year: "Year 3", bio: "Representing the interests of male students and supporting welfare initiatives.", photo: "/images/leader-male-rep.jpg", order: 7 },
    { name: "Onsongo Weavin", position: "Female Representative", programme: "BSc. Electrical & Electronic Engineering", year: "Year 3", bio: "Representing female students and championing inclusion within ESA.", photo: "/images/leader-female-rep.jpg", order: 8 },
    { name: "Wilson Okwaro", position: "Nominated Member", programme: "BSc. Civil Engineering", year: "Year 3", bio: "Contributing to ESA projects and representing the wider membership.", photo: "/images/leader-wilson.jpg", order: 9 },
    { name: "Basile Onyango", position: "Nominated Member", programme: "BSc. Mechanical Engineering", year: "Year 2", bio: "Active committee member supporting events and member engagement.", photo: "/images/leader-basile.jpg", order: 10 },
    { name: "Joy Ogieng", position: "Nominated Member", programme: "BSc. Electrical & Electronic Engineering", year: "Year 2", bio: "Committee member contributing fresh ideas to ESA programming.", photo: "/images/leader-joy.jpg", order: 11 },
  ];
  for (const l of leaders) {
    await prisma.leader.create({ data: l });
  }

  // ---- Events / Engineering calendar ----
  const now = new Date();
  const upcoming = [
    { title: "ESA Freshers Admission & Welcome", slug: "freshers-admission", category: "Admission", venue: "School of Engineering Auditorium", days: 7, desc: "Welcome first-year engineering students into the ESA family. Registration, ice-breakers and an introduction to the academic year ahead.", image: "/images/events/freshers.jpg" },
    { title: "Engineering Retreat", slug: "engineering-retreat", category: "Retreat", venue: "Kakamega Forest Retreat Centre", days: 21, desc: "A reflective and team-building retreat for ESA members — leadership workshops, games and fellowship.", image: "/images/events/retreat.jpg" },
    { title: "Charity Event: Engineering for Humanity", slug: "engineering-for-humanity", category: "Charity", venue: "MMUST Main Campus", days: 45, desc: "Our flagship community outreach — donating and volunteering to support those in need in the region.", image: "/images/events/charity.jpg" },
    { title: "Engineering Weekend", slug: "engineering-weekend", category: "Engineering Weekend", venue: "MMUST Main Campus", days: 60, desc: "A weekend of exhibitions, project demos, guest speakers and engineering showcases.", image: "/images/events/weekend.jpg" },
    { title: "Engineering Gumzo", slug: "engineering-gumzo", category: "Gumzo", venue: "ESA Resource Centre", days: 75, desc: "An interactive talk with engineers and industry experts sharing their journeys and insights.", image: "/images/events/gumzo.jpg" },
    { title: "Engineering Debate", slug: "engineering-debate", category: "Debate", venue: "School of Engineering Auditorium", days: 90, desc: "Engineering students debate topical engineering and technology issues.", image: "/images/events/debate.jpg" },
    { title: "ESA Elections", slug: "esa-elections", category: "Elections", venue: "Online & Main Campus", days: 120, desc: "Annual ESA leadership elections. Positions and timeline announced ahead of voting day.", image: "/images/events/gumzo.jpg" },
  ];
  for (const e of upcoming) {
    const d = new Date(now);
    d.setDate(d.getDate() + e.days);
    await prisma.event.create({
      data: {
        title: e.title,
        slug: e.slug,
        category: e.category,
        venue: e.venue,
        date: d,
        startTime: "10:00 AM",
        endTime: "4:00 PM",
        description: e.desc,
        status: "UPCOMING",
        featured: e.title === "Engineering Weekend",
        organizer: "ESA MMUST",
        coverImage: e.image,
      },
    });
  }

  const past = [
    { title: "ESA 2025 Elections", slug: "esa-elections-2025", category: "Elections", venue: "MMUST Main Campus", days: -40, desc: "Results of the 2025 ESA leadership elections that brought in the current committee.", image: "/images/events/gumzo.jpg" },
    { title: "Engineering Weekend 2025", slug: "engineering-weekend-2025", category: "Engineering Weekend", venue: "MMUST Main Campus", days: -90, desc: "Highlights from last year's engineering exhibition and showcases.", image: "/images/events/weekend.jpg" },
    { title: "Glass & Engineering Debate Finals", slug: "debate-2025", category: "Debate", venue: "School of Engineering", days: -130, desc: "The 2025 inter-department engineering debate finals.", image: "/images/events/debate.jpg" },
    { title: "2025 Charity Outreach", slug: "charity-2025", category: "Charity", venue: "Kakamega County", days: -160, desc: "Our 2025 charitable outreach programme in the local community.", image: "/images/events/charity.jpg" },
  ];
  for (const e of past) {
    const d = new Date(now);
    d.setDate(d.getDate() + e.days);
    await prisma.event.create({
      data: {
        title: e.title,
        slug: e.slug,
        category: e.category,
        venue: e.venue,
        date: d,
        startTime: "10:00 AM",
        endTime: "4:00 PM",
        description: e.desc,
        status: "COMPLETED",
        coverImage: e.image,
      },
    });
  }

  // ---- Trips ----
  await prisma.trip.create({
    data: {
      title: "Industrial Visit — Kenya Power & Lighting",
      destination: "KPLC Nairobi",
      organization: "Kenya Power",
      location: "Nairobi",
      date: new Date(now.getTime() + 40 * 24 * 3600 * 1000),
      description: "A technical industrial visit to Kenya Power to understand power generation, transmission and distribution engineering.",
      lessons: "Understanding of the national grid, substation operations and electrical safety standards.",
      coverImage: "/images/all-members.jpg",
    },
  });
  await prisma.trip.create({
    data: {
      title: "Geothermal Field Trip — Olkaria",
      destination: "Olkaria, Naivasha",
      organization: "KenGen",
      location: "Nakuru County",
      date: new Date(now.getTime() + 95 * 24 * 3600 * 1000),
      description: "Visit Olkaria Geothermal plants to learn about renewable energy and geothermal power engineering.",
      lessons: "Geothermal drilling, turbine operations and sustainable energy systems.",
    },
  });

  // ---- Training ----
  const trainings = [
    { title: "AutoCAD Civil 3D Essentials", slug: "autocad-civil3d", software: "AutoCAD Civil 3D", category: "CAD", purpose: "CAD & Civil design", date: now.getTime() + 12 * 24 * 3600 * 1000, trainer: "Eng. K. Mwangi", duration: "3 days", seats: 40, desc: "Hands-on training in computer-aided design and civil infrastructure modelling." },
    { title: "MATLAB for Engineering", slug: "matlab-engineering", software: "MATLAB", category: "Simulation", purpose: "Engineering simulation & analysis", date: now.getTime() + 30 * 24 * 3600 * 1000, trainer: "Dr. A. Ochieng", duration: "2 days", seats: 50, desc: "Numerical computing and simulation for electrical, mechanical and civil engineering." },
    { title: "Python for Engineers", slug: "python-engineers", software: "Python", category: "Programming", purpose: "Programming & data analysis", date: now.getTime() + 55 * 24 * 3600 * 1000, trainer: "Microsoft Learn Student Ambassadors", duration: "1 week", seats: 60, desc: "An introduction to Python covering automation, data analysis and engineering applications." },
    { title: "SolidWorks Mechanical Design", slug: "solidworks-design", software: "SolidWorks", category: "Engineering Design", purpose: "3D mechanical design", date: now.getTime() + 80 * 24 * 3600 * 1000, trainer: "Eng. J. Kiprop", duration: "4 days", seats: 35, desc: "Parametric 3D modelling and mechanical assembly design in SolidWorks." },
  ];
  for (const t of trainings) {
    await prisma.training.create({
      data: {
        title: t.title,
        slug: t.slug,
        software: t.software,
        category: t.category,
        purpose: t.purpose,
        description: t.desc,
        date: new Date(t.date),
        trainer: t.trainer,
        duration: t.duration,
        seats: t.seats,
        certificate: true,
        status: "UPCOMING",
      },
    });
  }

  // ---- Products (ESA Store) ----
  const products = [
    { name: "ESA T-Shirt", category: "Apparel", price: 800, stock: 100, sizes: "S,M,L,XL", colors: "Navy, White", desc: "Comfortable ESA branded T-shirt for everyday wear.", featured: true, image: "/images/products/tshirt.jpg" },
    { name: "ESA Round Collar (Polo Shirt)", category: "Apparel", price: 1200, stock: 80, sizes: "S,M,L,XL", colors: "Navy", desc: "Premium round-collar polo shirt with the ESA crest.", featured: true, image: "/images/products/polo.jpg" },
    { name: "ESA Cap", category: "Apparel", price: 500, stock: 120, sizes: "One size", colors: "Navy", desc: "Adjustable embroidered cap with the ESA logo.", image: "/images/products/cap.jpg" },
    { name: "ESA Dustcoat", category: "Lab Apparel", price: 1500, stock: 60, sizes: "M,L,XL", colors: "White", desc: "Protective laboratory dustcoat for engineering practicals.", featured: true, image: "/images/products/labcoat.jpg" },
    { name: "ESA Overalls", category: "Lab Apparel", price: 2000, stock: 50, sizes: "M,L,XL", colors: "Navy", desc: "Heavy-duty overalls for workshops and field work.", image: "/images/products/overalls.jpg" },
    { name: "ESA Notebook", category: "Stationery", price: 250, stock: 200, sizes: "A5", colors: "Navy", desc: "Branded notebook for lectures and engineering notes.", image: "/images/products/notebook.jpg" },
    { name: "ESA Diary", category: "Stationery", price: 400, stock: 150, sizes: "A5", colors: "Navy", desc: "Academic planner and diary with ESA branding.", image: "/images/products/diary.jpg" },
  ];
  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: p.category,
        price: p.price,
        stock: p.stock,
        sizes: p.sizes,
        colors: p.colors,
        description: p.desc,
        featured: p.featured,
        active: true,
        image: p.image,
      },
    });
  }

  // ---- Announcements ----
  await prisma.announcement.create({
    data: {
      title: "Welcome to the 2026/2027 Academic Year",
      content: "ESA MMUST warmly welcomes all engineering students, especially our new first-years. Registration and freshers admission are now open.",
      category: "General",
      featured: true,
      priority: 1,
    },
  });
  await prisma.announcement.create({
    data: {
      title: "Engineering Weekend Registration Open",
      content: "Registration for the upcoming Engineering Weekend is now open to all ESA members. Secure your spot and showcase your projects.",
      category: "Events",
      featured: true,
      priority: 2,
    },
  });

  // ---- Gallery ----
  const album = await prisma.galleryAlbum.create({
    data: {
      title: "ESA 2025/2026 Highlights",
      description: "Moments from our events, trips and community activities.",
      coverImage: "/images/all-members.jpg",
    },
  });
  for (let i = 0; i < 8; i++) {
    await prisma.galleryMedia.create({
      data: {
        albumId: album.id,
        url: "/images/all-members.jpg",
        title: `Gallery image ${i + 1}`,
        type: "image",
      },
    });
  }

  console.log("Seed complete.");
  console.log("Admin login: admin@esa.mmust.ke / admin123");
  console.log("Member login: student@mmust.ac.ke / member123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
