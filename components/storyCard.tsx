import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // assuming the correct path
import { Badge } from "./ui/badge"; // assuming the correct path
import { Button } from "./ui/button"; // assuming the correct path
import { Progress } from "./ui/progress"; // assuming the correct import
import { Pause, PlayIcon } from "lucide-react";

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
  isPlaying: boolean; // Assuming you need this prop
  progress: number; // Assuming you need this prop
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
    <div
      className={cn(
        "flex-1 items-start justify-start min-w-full hidden md:flex flex-col md:min-w-[100px] h-fit w-full duration-500 ease-in-out hover:-translate-y-3",
        isActive ? "min-w-full md:min-w-[500px] flex hover:-translate-y-0" : ""
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
          <div
            className={cn(
              "w-full h-full z-20 items-start justify-end flex gap-y-1 md:gap-y-5 flex-col bg-transparent backdrop-blur-[3px] duration-500 ease-in-out p-3",
              isActive &&
                "backdrop-blur-none bg-gradient-to-t from-black/30 via-transparent to-transparent"
            )}
          >
            <div className="w-full h-fit items-center justify-between flex transition-all">
              <span className="flex flex-wrap gap-[2px]">
                <Badge
                  variant="default"
                  className="bg-primary/50 flex-1 min-w-fit max-w-fit font-medium flex gap-x-2 items-center"
                >
                  {card.year} <p>{card.BCE ? "B.C.E" : "A.C.E"}</p>
                </Badge>
              </span>
              <span className="w-fit items-center justify-center flex transition-all">
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
            </div>
            {isActive && <Progress value={progress} />}
          </div>
          <Image
            src={card.image.publicUrl}
            alt="Image"
            fill
            className="object-cover transition-all"
          />
        </div>
      </div>
      <div
        className={cn(
          "w-full h-fit items-start justify-start hidden flex-col gap-y-3 md:gap-y-7 p-0 md:p-7 px-0 md:px-0 duration-500 ease-in-out pt-10",
          isActive ? "opacity-100 flex" : ""
        )}
      >
        <h1 className="text-3xl md:text-3xl xl:text-3xl antialiased tracking-wide font-bold">
          {card.title}
        </h1>
      </div>
    </div>
  );
};

export default StoryCard;
