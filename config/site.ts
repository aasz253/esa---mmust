export const siteConfig = {
  name: "ESA MMUST",
  fullName: "Engineering Students Association",
  university: "Masinde Muliro University of Science and Technology",
  tagline: "Engineering students. Innovation. Leadership. Community.",
  description:
    "Engineering Students Association at MMUST — connecting engineering students through academic activities, professional development, innovation, leadership, events and welfare.",

  // Contact & payments (all configurable in one place)
  email: "esa@student.mmust.ke",
  // Leave empty to use the WhatsApp channel link below instead of a direct number
  whatsappNumber: "",
  whatsappChannel:
    "https://whatsapp.com/channel/0029Vb76gPn2UPBFYUaPm00o",
  paybill: "400200",
  account: "40007019",
  renewalFee: 50,
  welfareMin: 100,

  // Social media (official)
  social: {
    tiktok: "https://vm.tiktok.com/ZS9B9htXHaHeq-oEEj3/",
    whatsappChannel: "https://whatsapp.com/channel/0029Vb76gPn2UPBFYUaPm00o",
    facebook: "https://www.facebook.com/profile.php?id=61590446937866",
    x: "https://x.com/ESAMMUST_",
    instagram: "https://www.instagram.com/esa_mmust/",
  },

  academicYear: "2026/2027",
} as const;

export function whatsappLink(message?: string): string {
  const number = String(siteConfig.whatsappNumber || "").trim();
  if (number) {
    const num = number.replace(/\D/g, "");
    return `https://wa.me/${num}?text=${encodeURIComponent(
      message || "Hello ESA MMUST, I would like to make an inquiry."
    )}`;
  }
  return siteConfig.whatsappChannel;
}

export const seo = {
  home: {
    title: "ESA MMUST | Engineering Students Association",
    description: siteConfig.description,
  },
};
