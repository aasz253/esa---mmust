"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/config/site";

export function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink("Hello ESA MMUST, I would like to make an inquiry.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ESA on WhatsApp"
      className="fixed bottom-5 right-5 z-[900] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#0f2a4a] shadow-glow transition-transform hover:scale-110"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={26} />
      <span className="absolute -inset-1 -z-10 animate-ping rounded-full bg-[#25D366]/30" />
    </motion.a>
  );
}
