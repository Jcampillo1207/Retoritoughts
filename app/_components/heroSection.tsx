"use client";

import { SectionLanding } from "@/components/layout/sections";
import Brain from "@/components/renders/brain";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/supaclient";
import { Upload, LogIn, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const HeroSection = () => {
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
  return (
    <SectionLanding className="py-28 md:py-36 lg:py-36 xl:py-44">
      <div className="w-full h-fit items-center justify-center flex flex-col gap-y-10">
        <h1 className="text-4xl md:text-3xl lg:text-4xl xl:text-5xl antialiased max-w-3xl text-center font-bold tracking-wide text-pretty">
          Prepare to be mind blown about these historical facts
        </h1>
        <div className="w-full h-fit items-center justify-center gap-x-2 gap-y-4 flex flex-col md:flex-row">
          <Button
            variant={"outline"}
            size={"lg"}
            asChild
            className="flex items-center gap-x-2 w-full md:w-fit max-w-sm"
          >
            <Link href={"/submit"}>
              Submit an event <Upload className="size-4" />
            </Link>
          </Button>
          {(isLoading && (
            <Button
              variant={"secondary"}
              size={"lg"}
              disabled
              className="flex gap-x-2"
            >
              Loading
              <Loader2 className="size-4 animate-spin" />
            </Button>
          )) ||
            (user && (
              <Button variant={"default"} size={"lg"}>
                Play Now
              </Button>
            )) || (
              <Button
                asChild
                variant={"default"}
                size={"lg"}
                className="flex items-center gap-x-2 w-full md:w-fit max-w-sm"
              >
                <Link href={"/auth"}>
                  Log in <LogIn className="size-4" />
                </Link>
              </Button>
            )}
        </div>
      </div>
      <div className="w-full aspect-square relative">
        <Brain />
      </div>
    </SectionLanding>
  );
};
