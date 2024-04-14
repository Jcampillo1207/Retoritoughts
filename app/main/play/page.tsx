import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PlayPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth");
  }

  return (
    <main className="w-full h-screen items-center justify-center">
      Lets Play
    </main>
  );
}
