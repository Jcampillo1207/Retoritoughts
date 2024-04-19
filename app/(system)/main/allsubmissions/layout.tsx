import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    redirect("/auth");
  } else {
    const user: any = await supabase
      .from("User")
      .select("*")
      .eq("email", data?.user.email);
    if (user.data[0].role == false) {
        redirect("/main")
    }
  }

  return (
    <main className="w-full h-fit items-center justify-center relative">
      {children}
    </main>
  );
}
