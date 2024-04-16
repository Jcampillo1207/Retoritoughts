import { cn } from "@/lib/utils";
import { SideBarMain } from "./_components/sidebarMain";
import Link from "next/link";
const modes: { title: string; value: string; disabled: boolean }[] = [
  {
    title: "Classic",
    value: "/play",
    disabled: false,
  },
  {
    title: "Frenzy",
    value: "/frenzy",
    disabled: true,
  },
  {
    title: "MoneyLine",
    value: "/moneyline",
    disabled: true,
  },
  {
    title: "MoneyLine",
    value: "/moneyline",
    disabled: true,
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
                  "w-auto flex-1 h-auto aspect-video items-center p-5 lg:p-7 min-w-[200px] md:min-w-[300px] max-w-[500px] rounded-2xl bg-background hover:outline outline-offset-4 outline-primary relative overflow-hidden",
                  (mode.disabled &&
                    "bg-background cursor-not-allowed text-muted-foreground/50 outline-none outline-transparent") ||
                    "cursor-pointer border"
                )}
              >
                <div className="z-0">{mode.title}</div>
                <div
                  className={cn(
                    "w-full h-full items-center justify-center tracking-wide bg-muted/5 backdrop-blur-[1px] absolute top-0 left-0 z-20 text-foreground/50 text-xl md:text-2xl antialiased font-bold",
                    (mode.disabled && "flex") || "hidden"
                  )}
                >
                  Coming Soon
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
