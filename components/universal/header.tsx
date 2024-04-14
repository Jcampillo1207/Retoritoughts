"use client";

import Link from "next/link";
import { ModeToggle } from "../helpers/themeToggle";
import { Button } from "../ui/button";
import { Github, Loader2 } from "lucide-react";
import { Logo } from "../vectors/logo";
import { Separator } from "../ui/separator";
import { NavMobile } from "./navMobile";
import { useEffect, useState } from "react";

import { UserDropdown } from "./userDropdown";
import { createClient } from "@/lib/supabase/supaclient";

export const Header = () => {
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error);
        } else {
          setUser(data?.user);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const checkUser = async () => {
      const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("email", user.email);
      if (error) {
        console.log(error);
      } else {
        if (user.email !== data[0].email) {
          const { error } = await supabase
            .from("User")
            .insert({ email: user.email, username: user.email });
          if (error) {
            console.log(error);
          }
        }
      }
    };

    if (user == null && user === undefined) {
    } else {
      checkUser();
    }
  });

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
          <Link href={"/submit"}>
            {user !== undefined && user !== null
              ? "Submit events"
              : "Login to submit events"}
          </Link>
        </Button>
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href={"/leaderboard"}>Leaderboard</Link>
        </Button>
        {(user && <UserDropdown username={user} />) || (
          <Button variant="default" size="sm" asChild>
            <Link href="/auth">Log in</Link>
          </Button>
        )}
        <Separator orientation="vertical" className="rounded-full" />
        <ModeToggle />
      </div>
      <NavMobile user={user} />
    </header>
  );
};
