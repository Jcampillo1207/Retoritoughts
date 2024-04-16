"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Google from "@/components/vectors/googleVector";
import { LogoApp } from "@/components/vectors/logo";
import {
  githubHandler,
  googleHandler,
  loginUser,
} from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/supaclient";

import { Eye, EyeOff, Github, Loader2, LogIn } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const LoginForm = () => {
  const [psw, setPsw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const visibility = (psw && "text") || "password";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    toast("Creating your account", {
      icon: <Loader2 className="size-4 animate-spin" />,
    });
    const formData = new FormData(event.currentTarget);
    const error = await loginUser(formData);
    if (error) {
    } else {
      router.push("/main");
    }

    setIsLoading(false);
  }

  return (
    <div className="w-full h-fit items-start flex justify-start bg-accent/70 backdrop-blur-sm border p-5 md:p-7 flex-col rounded-2xl">
      <div className="w-full h-fit items-center justify-start flex gap-x-3 pb-5 md:pb-10">
        <LogoApp className="size-8" />
        <h1 className="text-xl md:text-2xl lg:text-3xl antialiased font-bold">
          Log in
        </h1>
      </div>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full h-fit items-start justify-start gap-y-3 md:gap-y-7 flex flex-col pb-3 md:pb-5"
      >
        {/* Input Mail */}
        <div className="w-full h-fit items-start justify-start gap-y-4 flex flex-col">
          <Label>
            Email: <span className="text-destructive">*</span>
          </Label>
          <Input type="email" name="email" placeholder="mail@mail.com" />
        </div>
        {/* Input Password */}
        <div className="w-full h-fit items-start justify-start gap-y-4 flex flex-col">
          <Label>
            Password: <span className="text-destructive">*</span>
          </Label>
          <span className="w-full h-fit items-center justify-start flex gap-x-2">
            <Input type={visibility} name="password" placeholder="****" />
            <Button
              type="button"
              variant={"outline"}
              size={"icon"}
              onClick={() => setPsw(!psw)}
              className="size-10 aspect-square"
            >
              {(psw && <Eye className="size-4" />) || (
                <EyeOff className="size-4" />
              )}
            </Button>
          </span>
          <Label
            className="text-muted-foreground hover:underline hover:text-primary transition-all text-sm cursor-pointer"
            onClick={() => router.push("/auth/reset-password")}
          >
            Forgot your password?
          </Label>
        </div>
        <div className="w-full h-fit items-center justify-center flex gap-x-2 mt-3">
          {/* Button Form */}
          <Button
            variant={"default"}
            size={"default"}
            disabled={(isLoading && true) || false}
            className="w-full items-center justify-center flex gap-x-2"
            type="submit"
          >
            Log in
            <LogIn className="size-4" />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            type="button"
            className="items-center justify-center flex md:hidden aspect-square size-10"
            onClick={githubHandler}
          >
            <Github className="size-4" />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            type="button"
            className="items-center justify-center flex md:hidden aspect-square size-10"
            onClick={googleHandler}
          >
            <Google className="size-4" />
          </Button>
        </div>
      </form>
      <Separator className="w-full hidden md:flex" orientation="horizontal" />
      <div className="w-full h-fit items-center justify-center flex flex-row md:flex-col gap-x-2 gap-y-3 md:gap-y-5 pt-3 md:pt-5">
        {/* Button Github */}
        <Button
          variant={"outline"}
          size={"default"}
          className="w-full items-center justify-center gap-x-2 hidden md:flex"
          onClick={githubHandler}
        >
          Log in with Github
          <Github className="size-4" />
        </Button>
        {/* Button Google */}
        <Button
          variant={"outline"}
          size={"default"}
          className="w-full items-center justify-center gap-x-2 hidden md:flex"
          onClick={googleHandler}
        >
          Log in with Google
          <Google className="size-4" />
        </Button>
      </div>
    </div>
  );
};
