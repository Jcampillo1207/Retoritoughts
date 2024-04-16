"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { checkAnswer, compareEventTimes } from "@/lib/compareTimes/compares";
import {
  fetchData,
  getEventImages,
  getFrontEvents,
} from "@/lib/supabase/events";
import { getHighScore, updateScore } from "@/lib/supabase/score";
import { createClient } from "@/lib/supabase/supaclient";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { AlertDialogComponent } from "./_components/alertDialog";

export default function PlayPage() {
  const [userData, setUserData] = useState<any>();
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<any[]>();
  const [highscore, setHighscore] = useState<number>();
  const skeletonCount = 2;
  const [event, setEvent] = useState<number>();
  const [info, setInfo] = useState<any>();
  const [next, setNext] = useState(false);
  const [lose, setLose] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error);
        } else {
          setUserData(data?.user);
          console.log(userData);
          if (userData) {
            setHighscore(await getHighScore(userData.email));
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchUser();
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
    async function fetch() {
      const data = await fetchData(skeletonCount);
      setInfo(data);
      setImages(data);
      setIsLoading(false);
      setEvent(undefined);
    }
    fetch();
  }, [next]);

  async function checkAnswerSelected() {
    // Restarted Game
    setLose(false);
    let result;

    if (event === undefined) {
      toast.warning("Please select an Event");
    } else {
      result = checkAnswer(info, event);
      if (result) {
        // Win
        setScore(score + 1);
        setNext(!next);
      } else {
        const newHighScore = await updateScore(score, userData.email);
        setScore(0);
        setLose(true);
        // Loss
      }
    }
  }

  function handleContinue() {
    setLose(!lose);
    setNext(!next);
    setImages(undefined);
    setEvent(undefined);
  }

  return (
    <main className="w-full h-full min-h-[calc(100dvh_-_56px)] lg:h-[calc(100dvh_-_56px)] items-start justify-start flex flex-col lg:flex-row relative">
      <section className="w-full h-fit items-start lg:items-start justify-between flex-row lg:flex-col gap-y-10 px-5 md:px-7 py-5 lg:py-10 border-b lg:border-b-0 border-r-0 lg:max-w-[250px] lg:border-r flex lg:min-h-[calc(100dvh_-_56px)]">
        {score > 0 ? (
          <AlertDialogComponent />
        ) : (
          <>
            <Button
              variant={"ghost"}
              size={"sm"}
              asChild
              className="items-center justify-center gap-x-2 text-muted-foreground w-fit lg:w-full hidden lg:flex"
            >
              <Link href={"/main"}>
                <ArrowLeft className="size-4" />
                Return to dashboard
              </Link>
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              asChild
              className="items-center justify-center gap-x-2 text-muted-foreground flex lg:hidden"
            >
              <Link href={"/main"}>
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
          </>
        )}
        <div className="w-fit h-fit items-start justify-start flex flex-col gap-y-1">
          <div className="w-fit lg:w-full h-fit border rounded-lg lg:rounded-2xl px-5 py-2 lg:py-5 text-sm flex flex-row lg:flex-col gap-2 lg:gap-7 items-center lg:items-start justify-start">
            <p className="text-muted-foreground lg:text-lg">Current Score:</p>
            <div className="lg:w-full h-full max-w-[70px] lg:max-w-[calc(250px_-_20px)] items-center justify-center flex">
              <p className="lg:text-5xl antialiased font-bold truncate text-ellipsis">
                {score}
              </p>
            </div>
          </div>
          <div className="w-full h-fit px-2 pt-3 mt-3 border-t items-center justify-between gap-x-2 hidden lg:flex">
            <p className="text-muted-foreground antialiased">Highest Score</p>
            <p className="text-foreground font-bold antialiased">{highscore}</p>
          </div>
        </div>
      </section>
      <section className="flex items-start justify-start px-5 md:px-7 py-5 lg:py-10 bg-muted dark:bg-muted/10 flex-1 w-full h-full max-h-full flex-col gap-y-5 lg:gap-y-10 overflow-y-scroll">
        <div className="w-full h-fit items-center justify-between gap-x-5 flex">
          <h1 className="text-xl md:text-2xl lg:text-3xl antialiased font-bold tracking-wide max-w-sm flex text-pretty">
            Which historical event happened first?
          </h1>
          <Button
            variant={(isLoading && "secondary") || "default"}
            size={"default"}
            disabled={(isLoading && true) || false}
            className="shrink-0"
            onClick={checkAnswerSelected}
          >
            Confirm
          </Button>
        </div>
        <div className="w-full h-full flex-1 items-center justify-center gap-3 lg:gap-10 flex-col lg:flex-row flex">
          {(images &&
            images.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <p className="text-lg h-fit w-fit text-center">or</p>
                )}
                <span
                  onClick={() => setEvent(index)}
                  className={cn(
                    "flex-1 active:scale-90 h-full w-full bg-background rounded-2xl overflow-hidden border outline-none outline-offset-8 cursor-pointer duration-300 ease-in-out relative",
                    event === index ? "outline-primary" : ""
                  )}
                >
                  <Image
                    src={item.imageUrl}
                    fill
                    className="object-cover z-0"
                    alt={item.image}
                  />
                  <div className="w-full h-full absolute z-20 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between gap-x-2 p-3 md:p-5 lg:p-5">
                    <p className="text-xl md:text-2xl xl:text-2xl antialiased tracking-wide font-semibold text-white">
                      {item.title}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "size-6 bg-primary items-center flex justify-center text-white absolute top-5 right-5 rounded-full ease-in-out transition-all",
                      event === index ? "visible" : "invisible"
                    )}
                  >
                    <Check className="size-4" />
                  </div>
                </span>
              </React.Fragment>
            ))) ||
            Array.from({ length: skeletonCount }).map((_, index) => (
              <Skeleton
                key={index}
                className="flex-1 h-full w-full bg-background rounded-2xl"
              />
            ))}
        </div>
      </section>
      {lose && (
        <div className="w-full h-full z-[9999] bg-muted/50 backdrop-blur-md flex items-center justify-center fixed top-0 left-0 px-5 md:px-7 lg:px-14">
          <div className="w-full max-w-4xl bg-background border p-5 md:p-7 rounded-2xl h-fit flex flex-col gap-y-7 lg:gap-y-7">
            <h1 className="text-lg font-bold md:text-xl lg:text-2xl max-w-sm text-pretty mb-5 lg:mb-7">
              Oops, loks like you need to study more &quot;history&quot;
            </h1>
            <div className="w-full h-fit items flex flex-col lg:flex-row gap-5">
              {images &&
                images.map((item, index) => {
                  return (
                    <div
                      className={cn(
                        "w-full flex-1 items-start justify-between flex flex-col gap-y-3 p-3 md:p-5 border rounded-xl",
                        event == index
                          ? "border-destructive"
                          : "border-green-600"
                      )}
                      key={index}
                    >
                      <h1 className="text-lg md:text-xl text-pretty">
                        {item.title}
                      </h1>
                      <Badge
                        variant={"default"}
                        className={cn(
                          event == index
                            ? "bg-destructive text-foreground hover:bg-destructive"
                            : "bg-green-600 text-foreground hover:bg-green-600"
                        )}
                      >
                        {item.day +
                          "/" +
                          item.month +
                          "/" +
                          item.year +
                          " " +
                          ((item.BCE && "B.C.E") || "A.C.E")}
                      </Badge>
                      {item.decription && (
                        <>
                          <Separator />
                          <p className="tracking-wide text-muted-foreground text-xs line-clamp-6">
                            {item.decription}
                          </p>
                        </>
                      )}
                    </div>
                  );
                })}
            </div>
            <Separator />
            <div className="w-full h-fit items-center justify-end flex gap-2 flex-col md:flex-row">
              <Button
                variant={"outline"}
                size={"default"}
                className="w-full md:w-fit"
                asChild
              >
                <Link href={"/main"}>Return to dashboard</Link>
              </Button>
              <Button
                variant={"default"}
                size={"default"}
                onClick={handleContinue}
                className="w-full md:w-fit"
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
