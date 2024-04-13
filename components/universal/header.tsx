"use client";

import Link from "next/link";
import { ModeToggle } from "../helpers/themeToggle";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import { Logo } from "../vectors/logo";
import { Separator } from "../ui/separator";
import { NavMobile } from "./navMobile";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/supabase/usermanagement";
import supabase from "@/lib/supabase/supaclient";
import { UserDropdown } from "./userDropdown";

export const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     setIsLoading(true);
  //     try {
  //       const session = supabase.auth.getSession(); // Get the current session
  //       console.log("Session:", session); // Debug: Check the session object

  //       if (!session) {
  //         console.log("No active session found, user must re-login.");
  //         redir
  //       } else {
  //         const email = session.user?.email; // Access user's email from session
  //         if (email) {
  //           const { data, error } = await supabase
  //             .from("User")
  //             .select("*")
  //             .eq("email", email)
  //             .limit(1);

  //           if (error) {
  //             console.error("Error fetching user:", error);
  //           } else if (data && data.length > 0) {
  //             setUser(data[0]);
  //           } else {
  //             console.log("No user found with that email");
  //           }
  //         } else {
  //           console.log("No email found in session");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error in fetchUser:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return (
    <header className="w-full h-14 px-5 md:px-7 lg:px-14 xl:px-36 py-3 items-center justify-between flex border-b fixed top-0 bg-background/50 backdrop-blur-sm z-[999]">
      <Link
        href={"/"}
        className="h-full w-auto flex items-center justify-start gap-x-2"
      >
        <Logo />
        <p className="text-foreground text-lg antialiased font-bold">
          Retoritoughts
        </p>
      </Link>
      <div className="w-fit h-full items-center justify-end gap-x-2 hidden lg:flex">
        <Button variant={"outline"} size={"icon"} asChild>
          <Link
            href={"https://github.com/Jcampillo1207/Retoritoughts"}
            target="_blank"
          >
            <Github className="size-4" />
          </Link>
        </Button>
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href={"/submit"}>Submit events</Link>
        </Button>
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href={"/leaderboard"}>Leaderboard</Link>
        </Button>
        {user !== null ? (
          <UserDropdown username={user[0].username} />
        ) : (
          <Button variant="default" size="sm" asChild>
            <Link href="/auth">Log in</Link>
          </Button>
        )}
        <Separator orientation="vertical" className="rounded-full" />
        <ModeToggle />
      </div>
      <NavMobile />
    </header>
  );
};
