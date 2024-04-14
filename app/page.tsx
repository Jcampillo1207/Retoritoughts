import { Section2 } from "./_components/section2";
import { HeroSection } from "./_components/heroSection";
import { Header } from "@/components/universal/header";

export default function Home() {
  return (
    <>
    <Header />
    <main className="w-full min-h-screen bg-dot-black/15 dark:bg-dot-white/5">
      <HeroSection />
      <Section2 />
    </main>
    </>
  );
}
