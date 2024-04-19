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
import { insertUser } from "@/lib/supabase/actions";

export const Header = () => {
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const dbUser = {
    email: "",
    username: "",
  };

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
          if (data?.user.user_metadata.name) {
            dbUser.username = data?.user.user_metadata.name;
          } else if (data?.user.user_metadata.user_name) {
            dbUser.username = data?.user.user_metadata.user_name;
          }
          dbUser.email = data?.user.email as string;
          insertUser(dbUser);
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
        if (data) {
          const { error } = await supabase
            .from("User")
            .insert({ email: user.email, username: user.email });
          if (error) {
          }
        }
      }
    };

    if (user) {
      checkUser();
    }
  }, []);

  console.log(user);

  return (
    <header className="w-full h-14 px-5 md:px-7 lg:px-14 xl:px-36 py-3 items-center justify-between flex border-b fixed top-0 bg-background/50 backdrop-blur-sm z-[999]">
      <Link
        href={"/"}
        className="h-full w-auto flex items-center justify-start gap-x-2"
      >
        <Logo />
        <p className="text-foreground text-lg antialiased font-bold">
          Retorithoughts
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
        {(user && (
          <>
            <UserDropdown username={user} />
            <Button variant={"default"} size={"sm"} asChild>
              <Link href={"/main"}>Dashboard</Link>
            </Button>
          </>
        )) || (
          <>
            <Button variant={"outline"} size={"sm"} asChild>
              <Link href={"/main/submit"}>Login to submit events</Link>
            </Button>
            <Button variant={"outline"} size={"sm"} asChild>
              <Link href={"/main/leaderboard"}>Leaderboard</Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/auth">Log in</Link>
            </Button>
          </>
        )}
        <Separator orientation="vertical" className="rounded-full" />
        <ModeToggle />
      </div>
      <NavMobile user={user} />
    </header>
  );
};
