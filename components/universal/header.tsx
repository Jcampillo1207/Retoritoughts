import Link from "next/link";
import { ModeToggle } from "../helpers/themeToggle";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import { Logo } from "../vectors/logo";
import { Separator } from "../ui/separator";
import { NavMobile } from "./navMobile";

export const Header = () => {
  return (
    <header className="w-full h-14 px-5 md:px-7 lg:px-14 xl:px-36 py-3 items-center justify-between flex border-b fixed top-0 bg-background/50 backdrop-blur-sm z-50">
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
          <Link href={"https://github.com/Jcampillo1207/Retoritoughts"} target="_blank">
            <Github className="size-4" />
          </Link>
        </Button>
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href={"/submit"}>Submit events</Link>
        </Button>
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href={"/leaderboard"}>Leaderboard</Link>
        </Button>
        <Button variant={"default"} size={"sm"} asChild>
          <Link href={"/auth"}>Log in</Link>
        </Button>
        <Separator orientation="vertical" className="rounded-full" />
        <ModeToggle />
      </div>
      <NavMobile />
    </header>
  );
};
