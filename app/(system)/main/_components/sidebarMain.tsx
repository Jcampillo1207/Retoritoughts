"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Loader2, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/supaclient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getLeaderboard, updateScore } from "@/lib/supabase/score";

export const SideBarMain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error during logout");
      return error;
    }
    updateScore(1, "")
    router.push("/auth");
    setIsLoading(false);
    
  };

  return (
    <>
      <div className="w-full h-full items-start justify-start flex flex-col gap-y-1">
        <h2 className="text-lg md:text-xl mb-3">Dashboard</h2>
        <Button
          variant={"ghost"}
          size={"sm"}
          asChild
          className="flex items-center gap-x-2 w-full justify-between px-4 hover:text-primary"
        >
          <Link href={"/main/leaderboard"}>
            Leaderboard
            <ChevronRight className="size-4" />
          </Link>
        </Button>
        <Button
          variant={"ghost"}
          size={"sm"}
          asChild
          className="flex items-center gap-x-2 w-full justify-between px-4 hover:text-primary"
        >
          <Link href={"/main/submit"}>
            Submit event
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="w-full h-fit min-h-fit items-start justify-start gap-y-10 flex flex-col">
        <Separator />
        <Button
          className="w-full border-destructive text-destructive hover:text-destructive flex gap-x-2 justify-between items-center"
          variant={"outline"}
          size={"sm"}
          disabled={(isLoading && true) || false}
          onClick={handleLogout}
        >
          Log out
          <LogOut className="size-4" />
        </Button>
      </div>
    </>
  );
};
