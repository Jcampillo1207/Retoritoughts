import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  Award,
  ChevronRight,
  Gamepad2,
  Github,
  LayoutDashboard,
  LogOut,
  Menu,
  Trophy,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { ModeToggle } from "../helpers/themeToggle";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/supaclient";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const NavMobile = ({ user }: { user: any }) => {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>();

  const handleLogout = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error during logout:", error);
      } else {
        router.push("/auth");
      }
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="flex lg:hidden">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="max-h-[80%] overflow-scroll pt-0"
      >
        <div className="w-full h-fit items-start justify-between flex flex-col gap-y-5 pb-5">
          <div className="w-full h-fit items-start justify-start flex flex-col gap-y-5 pb-5">
            <div className="w-full h-fit items-start justify-start flex flex-col gap-y-3 pb-5 relative">
              <p className="text-xl font-bold pb-3 w-full h-fit bg-background sticky top-0 z-50 border-b pt-10">
                Navigation
              </p>
              {user && (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="w-fit flex items-center justify-center gap-x-2 text-muted-foreground text-sm">
                        <Avatar className="size-4">
                          <AvatarImage
                            src={
                              user.user_metadata.avatar_url ||
                              user.user_metadata.picture ||
                              "/logoret.svg"
                            }
                          />
                          <AvatarFallback asChild>
                            <div className="bg-primary size-4 rounded-full"></div>
                          </AvatarFallback>
                        </Avatar>
                        {user.user_metadata.user_name ||
                          user.user_metadata.full_name ||
                          user.email}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="w-full h-fit items-start justify-start flex flex-col gap-y-4">
                        <Separator />
                        <SheetClose asChild>
                          <Button
                            variant={"outline"}
                            size={"lg"}
                            asChild
                            className="w-full items-center justify-between text-muted-foreground"
                          >
                            <Link href={"/main"}>
                              Dashboard
                              <LayoutDashboard className="size-4" />
                            </Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            variant={"outline"}
                            size={"lg"}
                            asChild
                            className="w-full items-center justify-between text-muted-foreground"
                          >
                            <Link href={"/main/submit"}>
                              Submit event
                              <Upload className="size-4" />
                            </Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            variant={"outline"}
                            size={"lg"}
                            asChild
                            className="w-full items-center justify-between text-muted-foreground"
                          >
                            <Link href={"/main/leaderboard"}>
                              Leaderboard
                              <Award className="size-4" />
                            </Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            variant={"default"}
                            size={"lg"}
                            asChild
                            className="w-full items-center justify-between"
                          >
                            <Link href={"/main/play"}>
                              Play
                              <Gamepad2 className="size-4" />
                            </Link>
                          </Button>
                        </SheetClose>
                        <Separator />
                        <SheetClose asChild>
                          <Button
                            variant={"outline"}
                            size={"lg"}
                            asChild
                            className="w-full items-center justify-between text-muted-foreground"
                          >
                            <Link href={"/main/score"}>
                              My Score
                              <Trophy className="size-4" />
                            </Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            variant={"destructive"}
                            size={"lg"}
                            asChild
                            onClick={handleLogout}
                            className="w-full items-center justify-between cursor-pointer border text-destructive border-destructive hover:bg-destructive/40 bg-transparent"
                          >
                            <div>
                              Logout
                              <LogOut className="size-4" />
                            </div>
                          </Button>
                        </SheetClose>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
              {(user && <></>) || (
                <>
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
                </>
              )}
            </div>
            <Separator orientation="horizontal" />
            <div className="w-full h-fit items-start justify-start flex flex-col gap-y-3">
              <p className="text-xl font-bold pb-3">Preferences</p>
              <div className="w-full h-fit items-center justify-between pl-4 pr-1 flex">
                <p>Theme</p>
                <ModeToggle className="size-11" />
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
                <Link
                  href={"https://github.com/Jcampillo1207/Retoritoughts"}
                  target="_blank"
                >
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
