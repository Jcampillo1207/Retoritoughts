"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { makeEvent } from "@/lib/supabase/events";
import { createClient } from "@/lib/supabase/supaclient";
import { Loader2, Upload } from "lucide-react";
import { revalidatePath } from "next/cache";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const FormSubmitEvents = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [era, setEra] = useState(true);
  const router = useRouter();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error);
        } else {
          setUserData(data?.user);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchUser();
  }, [isLoading]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsLoading(true);
    const error = await makeEvent(formData, imageFile, era, userData);
    if (error) {
      console.log("error");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      router.refresh;
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-fit items-start justify-start flex flex-col gap-y-10 lg:gap-y-14 px-3 lg:px-5"
    >
      <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-3 gap-x-14 gap-y-3">
        <Label className="w-full h-fit">
          Title:<span className="text-destructive">*</span>
        </Label>
        <Textarea
          required
          rows={4}
          disabled={(isLoading && true) || false}
          name="title"
          className="w-full col-span-1 lg:col-span-2"
          placeholder="Enter your event title"
        />
      </div>
      <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-3 gap-x-14 gap-y-3">
        <Label className="w-full h-fit">Description:</Label>
        <Textarea
          rows={8}
          name="description"
          disabled={(isLoading && true) || false}
          className="w-full col-span-1 lg:col-span-2"
          placeholder="What is your event about?"
        />
      </div>
      <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-3 gap-x-14 gap-y-3">
        <Label className="w-full h-fit">
          Image:<span className="text-destructive">*</span>
        </Label>
        <div className="w-full col-span-1 lg:col-span-2 flex flex-col gap-3 overflow-hidden max-w-full">
          <div
            className="w-full aspect-video border bg-background rounded-2xl"
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <input
            disabled={(isLoading && true) || false}
            required
            type="file"
            name="image"
            className="w-fit file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:text-sm file:bg-background file:text-muted-foreground file:ring-1 file:ring-border p-2 cursor-pointer"
            placeholder="What is your event about?"
            accept=".jpeg, .jpg, .png, .webp"
            multiple={false}
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-3 gap-x-14 gap-y-3">
        <Label className="w-full h-fit">
          Year:<span className="text-destructive">*</span>
        </Label>
        <Input
          disabled={(isLoading && true) || false}
          max={Number.MAX_SAFE_INTEGER}
          required
          name="year"
          type="number"
          placeholder="YYYY..."
          className="w-full lg:max-w-xs col-span-1 lg:col-span-2"
        />
      </div>
      <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-3 gap-x-14 gap-y-3">
        <Label className="w-full h-fit">Month:</Label>
        <Input
          disabled={(isLoading && true) || false}
          name="month"
          type="number"
          max={12}
          min={1}
          placeholder="MM"
          className="w-full lg:max-w-xs col-span-1 lg:col-span-2"
        />
      </div>
      <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-3 gap-x-14 gap-y-3">
        <Label className="w-full h-fit">Day:</Label>
        <Input
          disabled={(isLoading && true) || false}
          name="day"
          type="number"
          max={31}
          min={1}
          placeholder="DD"
          className="w-full lg:max-w-xs col-span-1 lg:col-span-2"
        />
      </div>
      <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-3 gap-x-14 gap-y-3">
        <Label className="w-full h-fit">Era:</Label>
        <div className="flex items-center space-x-2">
          <Label>B.C.E</Label>
          <Switch
            disabled={(isLoading && true) || false}
            id="airplane-mode"
            onClick={() => setEra(!era)}
          />
          <Label>A.C.E</Label>
        </div>
      </div>
      <div className="w-full h-fit mt-7 flex items-center justify-end border-t py-10 lg:py-14">
        {(isLoading && (
          <Button
            variant={"secondary"}
            size={"lg"}
            disabled
            type="submit"
            className="w-full lg:w-fit flex gap-x-2 items-center"
          >
            Uploading
            <Loader2 className="size-4 animate-spin" />
          </Button>
        )) || (
          <Button
            variant={"default"}
            size={"lg"}
            type="submit"
            className="w-full lg:w-fit flex gap-x-2 items-center"
          >
            Submit information
            <Upload className="size-4" />
          </Button>
        )}
      </div>
    </form>
  );
};
