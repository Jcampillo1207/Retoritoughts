"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/supaclient";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogoApp } from "@/components/vectors/logo";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"mail" | "recover">("mail");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://retoritoughts.vercel.app/auth/reset-password",
      });
      if (error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.info("Check your email for reset instructions", {
          icon: <Loader2 className="size-4 animate-spin" />,
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to send reset password email");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        setState("recover");
        const newPassword = prompt(
          "What would you like your new password to be?"
        ) as string;
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
  }, []);

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.success("Password updated successfully!");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col gap-y-10 md:gap-y-14 lg:gap-y-20 items-center justify-center bg-dot-black/15 dark:bg-dot-white/5">
      <div className="flex items-center justify-center gap-x-3">
        <LogoApp className="size-14" />
        <h1 className="text-2xl md:text-3xl font-bold antialiased">
          Retoritoughts
        </h1>
      </div>
      <Card className="w-full max-w-2xl p-5 md:p-7 lg:p-10 rounded-2xl">
        <CardHeader>
          <div className="mt-0">
            <CardTitle className="mt-0">Password recovery</CardTitle>
            <CardDescription className="mt-5">
              {state === "mail"
                ? "Enter your email to receive a reset password link"
                : "Enter your new password below"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={state === "mail" ? handleReset : handleResetPassword}
            className="mt-10 space-y-5"
          >
            {state === "mail" ? (
              <div className="w-full flex flex-col gap-y-3">
                <Label htmlFor="email">Email:</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full max-w-3xl"
                />
              </div>
            ) : (
              <div className="w-full flex flex-col gap-y-3">
                <Label htmlFor="password">Password:</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  required
                  className="w-full max-w-3xl"
                />
              </div>
            )}
            <Separator />
            <div className="w-full flex items-center justify-between mt-10">
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="flex gap-x-1 items-center justify-start w-fit"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="size-4" />
                Return to home
              </Button>
              <Button
                type="submit"
                variant={"default"}
                size={"sm"}
                disabled={isLoading}
                className=""
              >
                {isLoading
                  ? "Processing..."
                  : state === "mail"
                  ? "Send email link"
                  : "Confirm password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Reset;
