"use client";

import { ModeToggle } from "@/components/helpers/themeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NavMobile } from "@/components/universal/navMobile";
import { UserDropdown } from "@/components/universal/userDropdown";
import { Logo, LogoApp } from "@/components/vectors/logo";
import { createClient } from "@/lib/supabase/supaclient";
import Link from "next/link";
import { useEffect, useState } from "react";

export const NavBarMain = () => {
  const [userData, setUserData] = useState<any>();
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
          setUserData(data?.user);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <header className="w-full h-14 px-5 md:px-7 py-3 items-center justify-between flex border-b bg-background/50 backdrop-blur-sm z-[999] sticky top-0">
      <Link
        href={"/"}
        className="h-full w-auto flex items-center justify-start gap-x-2"
      >
        <Logo />
        <p className="text-foreground text-lg antialiased font-bold">
          Retorithoughts
        </p>
      </Link>
      <div className="h-full items-center justify-end gap-x-2 hidden lg:flex">
        <UserDropdown username={userData} />
        <Separator orientation="vertical" />
        <ModeToggle />
      </div>
      <NavMobile user={userData} />
      {/* <Button variant="default" onClick={handlescore}>
        maxScore
      </Button> */}
    </header>
  );
};

