import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, LogOut, UserCircle2Icon } from "lucide-react";
import { Label } from "../ui/label";
import supabase from "@/lib/supabase/supaclient";
import { useRouter } from "next/router";

interface UserDropdownProps {
  username: string;
}
export const UserDropdown = ({ username }: UserDropdownProps) => {
  const router = useRouter();
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error);
    } else {
      router.push("/");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"} size={"sm"}>
          <div className="flex items-center justify-start gap-x-4">
            <span className="flex items-center justify-start gap-x-1">
              <UserCircle2Icon className="size-4" />
              <Label>{username}</Label>
            </span>
            <ChevronDown className="size-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] space-y-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>My score</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant={"destructive"}
            size={"sm"}
            onClick={handleLogout}
            className="flex gap-x-2 w-full justify-between"
          >
            Logout
            <LogOut className="size-4" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
