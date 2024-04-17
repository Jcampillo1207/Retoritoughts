import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NavBarMain } from "../_components/navbarMain";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth");
  }

  return (
    <main className="w-full h-fit items-center justify-center relative">
      <NavBarMain />
      {children}
    </main>
  );
}
