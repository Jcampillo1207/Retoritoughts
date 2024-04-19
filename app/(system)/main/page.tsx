import { cn } from "@/lib/utils";
import { SideBarMain } from "./_components/sidebarMain";
import Link from "next/link";
import Icon from "@/components/helpers/icons";
import { ChevronRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const modes: {
  title: string;
  value: string;
  disabled: boolean;
  icon: string;
  info: string;
  video: string;
}[] = [
  {
    title: "Classic",
    value: "play",
    disabled: false,
    icon: "Shapes",
    info: "In Classic mode, players must quickly determine which of two events happened first, this mode includes real events as well as fictional events. You'll have a 10-second timer to answer each comparison.",
    video: "/classic.mov",
  },
  {
    title: "Year Matcher",
    value: "matcher",
    disabled: false,
    icon: "Shuffle",
    info: "In this mode you'll be able to enter a year and be able to see which events happened in that year",
    video: "/year.mov",
  },
  {
    title: "Realistic",
    value: "realistic",
    disabled: false,
    icon: "BookMarked",
    info: "In Realistic mode, players must quickly determine which of two events happened first, this mode only includes real events. You'll have a 10-second timer to answer each comparison.",
    video: "/realistic.mov",
  },
  {
    title: "Frenzy",
    value: "frenzy",
    disabled: false,
    icon: "Timer",
    info: "In Frenzy mode, players must quickly determine which of two events happened first, this mode include real events as well as fictional events. Each time you make a correct choice, the timer's duration will reduce.",
    video: "/frenzy.mov",
  },
  {
    title: "MoneyUp",
    value: "moneyup",
    disabled: true,
    icon: "Coins",
    info: "",
    video: "",
  },
  {
    title: "Arcade",
    value: "arcade",
    disabled: true,
    icon: "Joystick",
    info: "",
    video: "",
  },
];

export default function MainPage() {
  return (
    <main className="w-full h-full min-h-[calc(100dvh_-_56px)] lg:h-[calc(100dvh_-_56px)] items-start justify-start flex flex-wrap">
      <section className="w-full h-full items-start justify-start flex-col gap-y-10 px-5 md:px-7 py-10 lg:max-w-[250px] border-r hidden lg:flex min-h-[calc(100dvh_-_56px)]">
        <SideBarMain />
      </section>
      <section className="flex-1 items-start justify-startflex overflow-y-scroll max-h-full bg-muted dark:bg-muted/10 h-full min-h-[calc(100dvh_-_56px)]">
        <div className="w-full h-fit items-start justify-start flex flex-wrap gap-5 py-10 px-5 md:px-7">
          {modes.map((mode, index) => {
            return (
              <Link
                href={(mode.disabled && "#") || `main/${mode.value}`}
                key={index}
                className={cn(
                  "w-auto flex-1 h-auto group aspect-square md:aspect-video items-center p-5 transition-all min-w-[200px] md:min-w-[300px] max-w-[500px] rounded-2xl bg-background hover:outline outline-offset-4 outline-primary relative overflow-hidden",
                  (mode.disabled &&
                    "bg-background cursor-not-allowed text-muted dark:text-muted/50 outline-none outline-transparent") ||
                    "cursor-pointer border"
                )}
              >
                <div
                  className={cn(
                    "z-10 text-lg md:text-2xl font-semibold antialiased text-muted-foreground group-hover:text-primary w-full flex justify-between items-center",
                    mode.disabled && "group-hover:text-muted-foreground"
                  )}
                >
                  {mode.title}
                  <ChevronRight className="size-4" />
                </div>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"secondary"}
                        size={"icon"}
                        className={cn("absolute left-5 bottom-5 z-40", mode.disabled && "hidden")}
                      >
                        <Info className="size-4 text-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="max-w-sm w-full flex flex-col gap-y-5 p-5 items-start justify-start"
                    >
                      <video
                        src={mode.video}
                        autoPlay
                        muted
                        controls
                        loop
                        className="aspect-video w-full rounded-xl"
                      ></video>
                      <p className="antialiased text-muted-foreground tracking-wide">{mode.info}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="h-full absolute z-0 aspect-square botom-0 translate-y-5 md:translate-y-2 right-0">
                  <Icon
                    className={cn(
                      "size-full aspect-square text-muted-foreground group-hover:text-primary",
                      mode.disabled &&
                        "group-hover:text-muted dark:group-hover:text-muted text-muted"
                    )}
                    name={mode.icon}
                  />
                </div>
                <div
                  className={cn(
                    "w-full h-full items-center justify-center tracking-wide bg-muted/5 backdrop-blur-[3px] absolute top-0 left-0 z-20 text-foreground/50 text-xl md:text-2xl lg:text-3xl antialiased font-bold",
                    (mode.disabled && "flex") || "hidden"
                  )}
                >
                  <p className="-rotate-12 w-full h-fit py-1 flex items-center justify-center">
                    Coming Soon
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
