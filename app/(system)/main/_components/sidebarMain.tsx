"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/supaclient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchUser, getUserAuth } from "@/lib/supabase/actions";

export const SideBarMain = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [userData, setUserData] = useState<any>();

  const handleLogout = async () => {
    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error during logout");
      return error;
    }
    router.push("/auth");
    setIsLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    async function getRole() {
      try {
        setIsLoading(true);
        const user = await getUserAuth();
        const data = await fetchUser(user.user);
        if (data && isMounted) {
          setUserData(data.user![0]);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    getRole();
    return () => {
      isMounted = false;
    };
  }, []);

  console.log(userData);

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
        <Button
          variant={"ghost"}
          size={"sm"}
          asChild
          className="flex items-center gap-x-2 w-full justify-between px-4 hover:text-primary"
        >
          <Link href={"/main/submissions"}>
            My submissions
            <ChevronRight className="size-4" />
          </Link>
        </Button>
        <Separator className="my-3" />
        {userData && userData.role && (
          <Button
            variant={"ghost"}
            size={"sm"}
            asChild
            className="flex items-center gap-x-2 w-full justify-between px-4 hover:text-primary"
          >
            <Link href={"/main/allsubmissions"}>
              All submissions
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        )}
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
