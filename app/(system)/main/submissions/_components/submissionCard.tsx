import { Badge } from "@/components/ui/badge";
import { EditIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { EditForm } from "./editForm";

export const SubmissionCard = ({ data }: { data: any }) => {
  return (
    <div className="rounded-2xl h-fit p-2 border flex-1 lg:max-w-md flex gap-y-5 flex-col min-w-[300px] min-h-[350px] group relative">
      <div className="w-full h-auto aspect-video items-center justify-center flex relative rounded-xl overflow-hidden">
        <Image src={data.imageUrl} fill alt="image" className="object-cover" />
        <div className="w-full h-full absolute z-20 items-end justify-between p-2 bg-gradient-to-t from-black/60 to-transparent flex">
          {(data.is_verified && (
            <Badge
              variant={"default"}
              className="bg-green-600 hover:bg-green-600 right-2 text-white"
            >
              Verified
            </Badge>
          )) || (
            <Badge
              variant={"default"}
              className="bg-amber-600 hover:bg-amber-600 right-2 flex items-center gap-x-1 text-white"
            >
              <Loader2 className="size-3 animate-spin" />
              Waiting for verification
            </Badge>
          )}
          <Badge variant={"default"}>
            {data.day +
              "/" +
              data.month +
              "/" +
              data.year +
              " " +
              ((data.BCE && "B.C.E") || "A.C.E")}
          </Badge>
        </div>
      </div>
      <div className="w-full h-fit items-start justify-start flex flex-col gap-y-3 px-2">
        <h2 className="text-lg antialiased font-bold text-pretty line-clamp-2 tracking-wide">
          {data.title}
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {data.decription}
        </p>
      </div>
      <EditForm data={data}>
        <Badge className="flex gap-x-1 absolute top-4 h-fit lg:bottom-4 right-4 lg:hidden group-hover:flex bg-foreground text-background z-30 cursor-pointer hover:bg-foreground/80 rounded-sm shadow-md">
          Edit <EditIcon className="size-3" />
        </Badge>
      </EditForm>
    </div>
  );
};
