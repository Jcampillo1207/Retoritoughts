import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Pause, PlayIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

type CardData = {
  year: number;
  BCE: boolean;
  title: string;
  image: {
    publicUrl: string;
  };
};

interface StoryCardProps {
  card: CardData;
  isActive: boolean;
  isPlaying: boolean;
  progress: number;
  onActivate: () => void;
  onTogglePlay: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  card,
  isActive,
  isPlaying,
  progress,
  onActivate,
  onTogglePlay,
}) => {
  return (
    <>
      {card !== undefined && card !== null ? (
        <div
          className={cn(
            "flex-1 items-start justify-start min-w-full hidden md:flex flex-col md:min-w-[100px] h-fit w-full duration-500 ease-in-out hover:-translate-y-3",
            isActive
              ? "min-w-full md:min-w-[500px] flex hover:-translate-y-0"
              : ""
          )}
        >
          <div
            className={cn(
              "w-full aspect-square md:aspect-auto md:h-[600px] p-1 border rounded-2xl cursor-pointer",
              isActive ? "cursor-default" : ""
            )}
            onClick={onActivate}
          >
            <div className="w-full h-full relative bg-muted rounded-xl overflow-hidden items-center justify-center flex">
              <div
                className={cn(
                  "w-full h-full absolute z-10 bg-transparent backdrop-grayscale duration-500 ease-in-out",
                  isActive ? "hidden" : "flex"
                )}
              />
              <span className="w-fit items-center justify-center flex transition-all absolute top-3 right-3 z-50">
                {isActive && (
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    className="text-white bg-transparent border-0 hover:bg-transparent hover:border-0 md:size-8 rounded-sm"
                    onClick={onTogglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="size-5 fill-white text-white" />
                    ) : (
                      <PlayIcon className="size-5 fill-white text-white" />
                    )}
                  </Button>
                )}
              </span>
              <div
                className={cn(
                  "w-full h-full z-30 items-start justify-end flex gap-y-1 md:gap-y-5 flex-col bg-transparent backdrop-blur-[3px] duration-500 ease-in-out p-3",
                  isActive &&
                    "backdrop-blur-none bg-gradient-to-t from-black/80 to-transparent"
                )}
              >
                <div className="w-full h-fit items-center justify-between flex flex-col gap-y-2 transition-all">
                  <div className="w-full h-fit items-center justify-between flex gap-x-2">
                    <span className="flex flex-wrap gap-[2px]">
                      <Badge
                        variant="default"
                        className="bg-primary/50 flex-1 min-w-fit max-w-fit font-medium flex gap-x-2 items-center"
                      >
                        {card.year} <p>{card.BCE ? "B.C.E" : "A.C.E"}</p>
                      </Badge>
                    </span>
                  </div>
                  <div className="w-full h-fit items-start justify-start flex">
                    <h1
                      className={cn(
                        "text-xl md:text-2xl xl:text-2xl antialiased tracking-wide font-semibold hidden text-pretty max-w-[90%]  normal-case",
                        isActive && "flex"
                      )}
                    >
                      {card.title}
                    </h1>
                  </div>
                </div>
                {isActive && <Progress value={progress} />}
              </div>
              <Image
                src={card.image && card.image.publicUrl || "/logoret.svg"}
                alt="Image"
                fill
                className="object-cover transition-all"
              />
            </div>
          </div>
        </div>
      ) : (
        <Skeleton className="flex-1 items-start justify-start min-w-full hidden md:flex flex-col md:min-w-[100px] h-fit w-full duration-500 ease-in-out hover:-translate-y-3" />
      )}
    </>
  );
};

export default StoryCard;
