"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Google from "@/components/vectors/googleVector";
import { LogoApp } from "@/components/vectors/logo";
import { signup } from "@/lib/supabase/actions";
import { Eye, EyeOff, Github, Loader2, LogIn } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const RegisterForm = () => {
  const [psw, setPsw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const visibility = (psw && "text") || "password";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    toast("Creating your account", {
      icon: <Loader2 className="size-4 animate-spin" />,
    });
    const formData = new FormData(event.currentTarget);
    try {
      let error = await signup(
        formData
      );
      (error && toast.success("Failed to create account")) ||
        toast.success("Account created, welcome");
    } catch (error) {
      toast.error("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-fit items-start flex justify-start bg-muted/80 border p-5 md:p-7 flex-col rounded-2xl">
      <div className="w-full h-fit items-center justify-start flex gap-x-3 pb-10">
        <LogoApp className="size-8" />
        <h1 className="text-xl md:text-2xl lg:text-3xl antialiased font-bold">
          Register
        </h1>
      </div>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full h-fit items-start justify-start gap-y-7 flex flex-col pb-5"
      >
        {/* Input Username */}
        <div className="w-full h-fit items-start justify-start gap-y-4 flex flex-col">
          <Label>
            Username: <span className="text-destructive">*</span>
          </Label>
          <Input
            required
            type="text"
            name="username"
            placeholder="XXSuperMasterMinecraftXX"
          />
        </div>
        {/* Input Mail */}
        <div className="w-full h-fit items-start justify-start gap-y-4 flex flex-col">
          <Label>
            Email: <span className="text-destructive">*</span>
          </Label>
          <Input
            required
            type="email"
            name="email"
            placeholder="mail@mail.com"
          />
        </div>
        {/* Input Password */}
        <div className="w-full h-fit items-start justify-start gap-y-4 flex flex-col">
          <Label>
            Password: <span className="text-destructive">*</span>
          </Label>
          <span className="w-full h-fit items-center justify-start flex gap-x-2">
            <Input
              required
              type={visibility}
              name="password"
              placeholder="****"
            />
            <Button
              type="button"
              variant={"outline"}
              size={"icon"}
              onClick={(e) => setPsw(!psw)}
              className="size-10 aspect-square"
            >
              {(psw && <Eye className="size-4" />) || (
                <EyeOff className="size-4" />
              )}
            </Button>
          </span>
        </div>
        {/* Button Form */}
        <Button
          variant={"default"}
          size={"default"}
          className="w-full items-center justify-center flex gap-x-2 mt-3"
          type="submit"
          disabled={isLoading && true}
        >
          Register
          <LogIn className="size-4" />
        </Button>
      </form>
      <Separator className="w-full" orientation="horizontal" />
      <div className="w-full h-fit items-start justify-start flex flex-col gap-y-5 pt-5">
        {/* Button Github */}
        <Button
          variant={"outline"}
          size={"default"}
          className="w-full items-center justify-center flex gap-x-2"
          onClick={() => {}}
        >
          Register with Github
          <Github className="size-4" />
        </Button>
        {/* Button Google */}
        <Button
          variant={"outline"}
          size={"default"}
          className="w-full items-center justify-center flex gap-x-2"
          onClick={() => {}}
        >
          Register with Google
          <Google className="size-4" />
        </Button>
      </div>
    </div>
  );
};
