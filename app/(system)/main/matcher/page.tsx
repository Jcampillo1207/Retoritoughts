"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { getMatchedImages } from "@/lib/supabase/events";
import { ArrowLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MatcherPage() {
  const [data, setData] = useState<any>(undefined);
  const [year, setYear] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(year);

  async function handleMatch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    if (year !== undefined) {
      setData(await getMatchedImages(year));
      setIsLoading(false);
    }
  }

  console.log(data);

  return (
    <main className="w-full h-full min-h-[calc(100dvh_-_56px)] lg:h-[calc(100dvh_-_56px)] items-start justify-start flex flex-col lg:flex-row relative">
      <section className="w-full h-fit items-start lg:items-start justify-between flex-row lg:flex-col gap-y-10 px-5 md:px-7 py-5 lg:py-10 border-b lg:border-b-0 border-r-0 lg:max-w-[250px] lg:border-r flex lg:min-h-[calc(100dvh_-_56px)]">
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
      </section>
      <section className="flex items-start justify-start py-5 lg:py-10 bg-muted dark:bg-muted/10 flex-1 w-full h-full max-h-full flex-col overflow-hidden">
        <div className="w-full h-fit border-b pb-5 lg:pb-10 px-5 md:px-7">
          <div className="w-full h-fit items-start justify-start gap-y-7 flex flex-col">
            <span className="w-full h-fit items-start justify-start flex flex-col gap-y-3">
              <h1 className="text-xl md:text-2xl lg:text-3xl antialiased font-bold tracking-wide max-w-sm flex text-pretty">
                Year Matcher
              </h1>
              <p className="text-sm lg:text-base antialiased text-muted-foreground max-w-md">
                Discover what historical events happened at the same year.
              </p>
            </span>
            <form
              onSubmit={handleMatch}
              className="w-full h-fit items-start justify-start flex flex-col gap-y-3 max-w-lg"
            >
              <Label htmlFor="year">Please enter a year to match:</Label>
              <div className="w-full h-fit items-center justify-start gap-x-2 flex">
                <Input
                  name="year"
                  id="year"
                  required
                  type="number"
                  placeholder="YYYY..."
                  max={Number.MAX_SAFE_INTEGER}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setYear(!isNaN(value) ? value : undefined);
                  }}
                />
                <Button
                  variant={"default"}
                  size={"default"}
                  disabled={false}
                  type="submit"
                  className="shrink-0 flex gap-x-2 items-center"
                >
                  Match
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full h-full items-start px-5 md:px-7 flex justify-start flex-col gap-y-5 md:gap-y-7 overflow-scroll relative">
          <span className="w-full h-fit bg-muted dark:bg-[#100D0C] sticky top-0 z-30 pt-5 lg:pt-10">
            <Label>Matched events</Label>
          </span>
          <div className="w-full h-full flex flex-wrap gap-5 min-h-fit items-start justify-start">
            {isLoading ? (
              <>
                <Skeleton className="w-full h-auto rounded-2xl overflow-hidden aspect-square flex-1 max-w-md min-w-[300px]" />
                <Skeleton className="w-full h-auto rounded-2xl overflow-hidden aspect-square flex-1 max-w-md min-w-[300px]" />
                <Skeleton className="w-full h-auto rounded-2xl overflow-hidden aspect-square flex-1 max-w-md min-w-[300px]" />
              </>
            ) : (
              data &&
              data.map(
                (
                  item: any,
                  index: number // Assuming ItemType is a defined type
                ) => (
                  <div
                    key={item.id}
                    className="rounded-2xl h-fit p-2 border flex-1 max-w-md flex gap-y-5 flex-col min-w-[300px]"
                  >
                    <div className="w-full h-auto aspect-video items-center justify-center flex relative rounded-xl overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        fill
                        alt="image"
                        className="object-cover"
                      />
                      <div className="w-full h-full absolute z-20 items-end justify-end p-2 bg-gradient-to-t from-black/60 to-transparent flex">
                        <Badge variant={"default"}>
                          {item.day +
                            "/" +
                            item.month +
                            "/" +
                            item.year +
                            " " +
                            ((item.BCE && "B.C.E") || "A.C.E")}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full h-fit items-start justify-start flex flex-col gap-y-3 px-2">
                      <h2 className="text-lg lg:text-xl antialiased font-bold text-pretty">
                        {item.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {item.decription}
                      </p>
                    </div>
                  </div>
                )
              )
            )}
            {data && (
              <Link
                href={"/main/submit"}
                className="rounded-2xl h-fit p-2 border flex-1 max-w-md flex gap-y-5 flex-col hover:border-primary group min-w-[300px]"
              >
                <div className="w-full h-auto aspect-video items-center justify-center flex relative rounded-xl overflow-hidden bg-muted">
                  <Plus className="size-6 group-hover:text-primary" />
                </div>
                <div className="w-full h-fit items-start justify-start flex flex-col gap-y-3 px-2">
                  <h2 className="text-lg lg:text-xl antialiased font-bold text-pretty">
                    Submit your own event
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Help us to make this platform more fun to play, submit
                    events to Retorithoughts
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
