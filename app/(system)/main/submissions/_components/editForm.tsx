"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updateEvent } from "@/lib/supabase/events";
import { createClient } from "@/lib/supabase/supaclient";
import { ArrowLeft, Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const EditForm = ({
  data,
  admin = false,
  children,
}: {
  data: any;
  admin: boolean;
  children: React.ReactNode;
}) => {
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState(data.image);
  const [imageSrc, setImageSrc] = useState(data.imageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [fantasy, setFantasy] = useState(data.fantasy);
  const [era, setEra] = useState(data.BCE);
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<any>();
  const [open, setOpen] = useState(false);
  const [verified, setVerified] = useState(
    (admin && data.is_verified) || false
  );

  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error);
        } else {
          setUserEmail(data?.user.email);
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

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateEvent(
      formData,
      data.id,
      era,
      imageName,
      imageFile,
      fantasy,
      verified
    );
    setOpen(false);
    location.reload();
  }

  console.log(verified)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex items-start justify-start w-full flex-col space-y-0 overflow-scroll p-0">
        <div className="w-full py-6 items-center justify-start flex sticky top-0 bg-background z-20 border-b px-6">
          <SheetClose asChild>
            <Button
              variant={"outline"}
              size={"sm"}
              className="flex items-center gap-x-1"
              onClick={() => setOpen(true)}
            >
              <ArrowLeft className="size-4" />
              Return
            </Button>
          </SheetClose>
        </div>
        <div className="w-full max-h-full items-start justify-start">
          <form
            onSubmit={handleUpdate}
            className="flex flex-col min-h-[calc(100vh_-_80px)] h-auto gap-y-7 items-start justify-start w-full pb-28 px-6 relative"
          >
            {admin && (
              <div className="w-full h-fit items-start justify-start flex flex-col gap-y-5">
                <Label className="w-full h-fit">Verified:</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={verified}
                    onClick={() => setVerified(!verified)}
                  />
                </div>
              </div>
            )}
            <div className="w-full h-fit items-start justify-start flex flex-col gap-y-5">
              <Label>Title:</Label>
              <Textarea
                placeholder={data.title}
                name="title"
                required
                defaultValue={data.title}
              />
            </div>
            <div className="w-full h-fit items-start justify-start flex flex-col gap-y-5">
              <Label>Description:</Label>
              <Textarea
                rows={5}
                defaultValue={data.decription}
                placeholder={
                  (data.decription && data.decription) || "Enter description"
                }
                name="description"
              />
            </div>
            <div className="w-full h-fit items-start justify-start flex flex-col gap-y-5">
              <Label className="w-full h-fit">Image:</Label>
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
            <div className="w-full h-fit items-start justify-start flex flex-col gap-y-5">
              <Label className="w-full h-fit">Year:</Label>
              <Input
                max={Number.MAX_SAFE_INTEGER}
                defaultValue={data.year}
                required
                name="year"
                type="number"
                placeholder={data.year}
                className="w-full"
              />
            </div>
            <div className="w-full h-fit items-start justify-start flex flex-col gap-y-5">
              <Label className="w-full h-fit">Month:</Label>
              <Input
                name="month"
                defaultValue={data.month}
                type="number"
                max={12}
                min={1}
                placeholder={data.month}
                className="w-full"
              />
            </div>
            <div className="w-full h-fit items-start justify-start flex flex-col gap-y-5">
              <Label className="w-full h-fit">Day:</Label>
              <Input
                name="day"
                defaultValue={data.day}
                type="number"
                max={31}
                min={1}
                placeholder={data.day}
                className="w-full"
              />
            </div>
            <div className="w-full h-fit items-start justify-start flex flex-col gap-y-5">
              <Label className="w-full h-fit">Era:</Label>
              <div className="flex items-center space-x-2">
                <Label>B.C.E</Label>
                <Switch checked={!era} onClick={() => setEra(!era)} />
                <Label>A.C.E</Label>
              </div>
            </div>
            <div className="w-full h-fit items-start justify-start flex flex-col gap-y-5">
              <Label className="w-full h-fit">Type:</Label>
              <div className="flex items-center space-x-2">
                <Label>Real</Label>
                <Switch
                  checked={!fantasy}
                  onClick={() => setFantasy(!fantasy)}
                />
                <Label>Fiction</Label>
              </div>
            </div>
            <div className="w-full border-l border-t h-fit items-center gap-x-2 flex fixed bg-background bottom-0 right-0 max-w-lg px-6 py-6">
              <SheetClose asChild>
                <Button variant={"outline"} size={"sm"} className="w-full">
                  Cancel
                </Button>
              </SheetClose>
              <Button variant={"default"} size={"sm"} className="w-full">
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
