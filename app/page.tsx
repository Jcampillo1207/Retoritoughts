import { SectionLanding } from "@/components/layout/sections";
import Brain from "@/components/renders/brain";
import { StorieCards } from "@/components/storieCards";
import { Button } from "@/components/ui/button";
import { Car, LogIn, Upload } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Section2 } from "./_components/section2";
import { HeroSection } from "./_components/heroSection";

export const metadata: Metadata = {
  title: "Retoritoughts",
  description:
    "Retoritoughts is a trivia game where players must guess whether a historical or fictional event happened before or after another. Test your knowledge in this time and sequence challenge.",
  icons: [
    {
      url: "/logoret.svg",
      href: "/logoret.svg",
      sizes: "32x32",
    },
  ],
  openGraph: {
    type: "website",
    url: "retoritoughts.com",
    title: "Retoritoughts",
    description:
      "Retoritoughts is a trivia game where players must guess whether a historical or fictional event happened before or after another. Test your knowledge in this time and sequence challenge.",
    siteName: "Retoritoughts",
    images: [
      {
        url: `https://uysatyjrbmttzkzisucw.supabase.co/storage/v1/object/public/banner/image.png?t=2024-04-13T06%3A59%3A27.822Z`,
        height: 600,
        width: 800,
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-dot-black/15 dark:bg-dot-white/5">
      <HeroSection />
      <Section2 />
    </main>
  );
}
