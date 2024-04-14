import { Metadata } from "next";
import { AuthComponent } from "./_components/authComponent";
import { GridCompanion } from "./_components/gridCompanion";
import { Header } from "@/components/universal/header";

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

const AuthPage = () => {
  return (
    <>
    <Header />
    <main className="w-full min-h-[10dvh] h-screen max-h-[100dvh] grid grid-cols-1 lg:grid-cols-2 bg-dot-black/15 dark:bg-dot-white/5 overflow-hidden">
      <AuthComponent />
      <GridCompanion />
    </main>
    </>
  );
};

export default AuthPage;
