"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Loader2, LogOut, Trophy, UserCircle2Icon } from "lucide-react";
import { Label } from "../ui/label";
import { createClient } from "@/lib/supabase/supaclient";
import { getUserInfo } from "@/lib/supabase/events";

interface UserDropdownProps {
  username: string;
}

export const UserDropdown = ({ username }: UserDropdownProps) => {
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

  useEffect(() => {
    const checkAuthStatus = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      const userInfo = await getUserInfo(username);
      setUserData(userInfo);
      if (!user) {
        router.push("/auth");
      }
    };

    checkAuthStatus();
  }, [username]);

  if (userData === undefined) {
    return (
      <Button
        className="flex gap-x-2 items-center"
        variant={"secondary"}
        size={"sm"}
        disabled
      >
        Loading Information
        <Loader2 className="size-4 animate-spin" />
      </Button>
    );
  } else {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <div className="flex items-center justify-start gap-x-2">
              <UserCircle2Icon className="size-4" />
              <Label>{userData[0].username}</Label>
              <ChevronDown className="size-4" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] space-y-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
            <Button
              variant="ghost"
              size="sm"
              className="flex gap-x-2 w-full justify-between cursor-pointer"
              disabled={loading}
            >
              My score
              <Trophy className="size-4" />
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="flex gap-x-2 w-full justify-between cursor-pointer focus:bg-destructive/80 ring-0"
              disabled={loading}
            >
              Log out
              <LogOut className="size-4" />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};
