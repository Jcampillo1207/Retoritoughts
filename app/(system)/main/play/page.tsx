import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PlayPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth");
  }

  return (
    <main className="w-full h-fit min-h-[calc(100dvh_-_56px)] lg:h-[calc(100dvh_-_56px)] items-center justify-center"></main>
  );
}
