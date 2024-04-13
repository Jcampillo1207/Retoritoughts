import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ChevronRight, Github, Menu } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { ModeToggle } from "../helpers/themeToggle";

export const NavMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="flex lg:hidden">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"bottom"}>
        <div className="w-full h-fit items-start justify-between flex flex-col gap-y-5 pb-5">
          <div className="w-full h-fit items-start justify-start flex flex-col gap-y-5 pb-5">
            <div className="w-full h-fit items-start justify-start flex flex-col gap-y-3 pb-5">
              <p className="text-xl font-bold pb-3">Navigation</p>
              <SheetClose asChild>
                <Button
                  variant={"outline"}
                  size={"lg"}
                  asChild
                  className="w-full flex items-center justify-between px-4 text-muted-foreground"
                >
                  <Link href={"/submit"}>
                    Submit an event <ChevronRight className="size-4" />
                  </Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  variant={"outline"}
                  size={"lg"}
                  asChild
                  className="w-full flex items-center justify-between px-4 text-muted-foreground"
                >
                  <Link href={"/submit"}>
                    Leaderboard <ChevronRight className="size-4" />
                  </Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  variant={"default"}
                  size={"lg"}
                  asChild
                  className="w-full flex items-center justify-between px-4"
                >
                  <Link href={"/auth"}>
                    Log in <ChevronRight className="size-4" />
                  </Link>
                </Button>
              </SheetClose>
            </div>
            <Separator orientation="horizontal" />
            <div className="w-full h-fit items-start justify-start flex flex-col gap-y-3">
              <p className="text-xl font-bold pb-3">Preferences</p>
              <div className="w-full h-fit items-center justify-between pl-4 pr-1 flex">
                <p>Theme</p>
                <ModeToggle className="size-11"/>
              </div>
            </div>
          </div>
          <div className="w-full h-fit items-start justify-start gap-y-5 flex flex-col">
            <Separator orientation="horizontal" />
            <div className="w-full h-fit items-center justify-start pt-5">
              <Button
                variant={"outline"}
                size={"lg"}
                asChild
                className="w-full flex items-center justify-between px-4 text-muted-foreground"
              >
                <Link href={"/"} target="_blank">
                  Give us a star
                  <Github className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
