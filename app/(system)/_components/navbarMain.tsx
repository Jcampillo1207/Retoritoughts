"use client";

import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/universal/userDropdown";
import { Logo, LogoApp } from "@/components/vectors/logo";
import { updateScore } from "@/lib/supabase/events";
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

  // prueba

  function handlescore() {
    updateScore(10, userData.email);
  }

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
      <UserDropdown username={userData} />
      <Button variant="default" onClick={handlescore}>
        maxScore
      </Button>
    </header>
  );
};
