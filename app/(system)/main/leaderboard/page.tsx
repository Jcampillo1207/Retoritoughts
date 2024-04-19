import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { TableComponent } from "./_components/tableLeaderBoard";

export default function LeaderboardPage() {
  return (
    <main className="w-full h-fit min-h-[calc(100dvh_-_56px)] lg:h-[calc(100dvh_-_56px)] lg:max-h-[100dvh] items-start justify-start flex flex-col lg:flex-row sticky top-0 overflow-hidden">
      <aside className="w-full h-fit lg:h-full border-b lg:border-b-0 lg:border-r col-span-1 lg:col-span-2 px-5 md:px-7 py-5 lg:py-10 lg:max-w-[250px]">
        <Button
          variant={"ghost"}
          size={"sm"}
          asChild
          className="flex items-center justify-between gap-x-2 text-muted-foreground w-fit lg:w-full"
        >
          <Link href={"/main"}>
            <ArrowLeft className="size-4" />
            Return to dashboard
          </Link>
        </Button>
      </aside>
      <div className="w-full flex-1 flex flex-col gap-y-5 h-full overflow-scroll px-5 md:px-7 py-10 bg-muted dark:bg-muted/10 items-start justify-start lg:min-h-[calc(100dvh_-_56px)]">
        <div className="flex flex-col gap-y-3 pb-5">
          <h1 className="text-3xl md:text-2xl lg:text-3xl antialiased font-bold tracking-wide">
            Our Top Players
          </h1>
          <p className="text-sm lg:text-base antialiased text-muted-foreground max-w-sm text-pretty">
            Get to know our best players in the Retoritoughts community
          </p>
        </div>
        <Separator className="mn-5" />
        <TableComponent />
      </div>
    </main>
  );
}