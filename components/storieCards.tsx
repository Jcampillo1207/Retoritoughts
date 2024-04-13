"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, Pause, PlayIcon, RefreshCcw } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { getEventImages, getFrontEvents } from "@/lib/supabase/events";

export const StorieCards = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const timerInterval = 10000;
  const [isVisible, setIsVisible] = useState(false);
  const referenceRef = useRef(null);
  const [main, setMain] = useState<any>();
  const [recharge, setRecharge] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (referenceRef.current) {
      observer.observe(referenceRef.current);
    }

    return () => {
      if (referenceRef.current) {
        observer.unobserve(referenceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const events = await getFrontEvents();
      const data = await Promise.all(
        events.map(async (event) => {
          if (event.error === null && event.data.image) {
            const imageUrl = await getEventImages(event.data.image);
            return {
              ...event,
              data: {
                ...event.data,
                image: imageUrl,
              },
            };
          } else {
            return event;
          }
        })
      );
      setMain(data);
    };

    fetchData();
  }, [recharge]);

  useEffect(() => {
    if (isVisible) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + (50 / timerInterval) * 100;
          return newProgress <= 100 ? newProgress : 100;
        });
      }, 50);

      timerRef.current = interval;

      return () => clearInterval(interval);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    setIsPlaying(true);
    setProgress(0);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeCardIndex]);

  useEffect(() => {
    setIsPlaying(true);
    setProgress(0);
    startTimeRef.current = Date.now();

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTimeRef.current;
      const newProgress = (elapsedTime / timerInterval) * 100;
      setProgress(newProgress <= 100 ? newProgress : 100);
    }, 50);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [activeCardIndex]);

  useEffect(() => {
    if (progress >= 100) {
      setActiveCardIndex((prevIndex) => (prevIndex + 1) % main.length);
      setProgress(0);
      startTimeRef.current = Date.now();
    }
  }, [progress]);

  const handleRightArrowClick = () => {
    setActiveCardIndex((prevIndex) => (prevIndex + 1) % main.length);
  };

  const handleLeftArrowClick = () => {
    setActiveCardIndex(
      (prevIndex) => (prevIndex - 1 + main.length) % main.length
    );
  };

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full h-fit items-start justify-start flex flex-col gap-y-5">
      <div className="w-full justify-between gap-x-2 items-center flex">
        <span className="w-full h-fit items-center justify-start md:justify-start gap-x-1 flex">
          <Button
            variant={"outline"}
            size={"icon"}
            className="text-muted-foreground md:size-8 rounded-sm"
            onClick={handleLeftArrowClick}
          >
            <ArrowLeft className="size-4 md:size-3" />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            className="text-muted-foreground md:size-8 rounded-sm"
            onClick={handleRightArrowClick}
          >
            <ArrowRight className="size-4 md:size-3" />
          </Button>
        </span>
        <Button
          variant={"default"}
          size={"default"}
          onClick={() => setRecharge(!recharge)}
          className="flex gap-x-2 items-center justify-center"
        >
          Recharge
          <RefreshCcw className="size-4" />
        </Button>
      </div>
      <div
        className="w-full h-fit items-start justify-start flex gap-x-1"
        id="reference"
      >
        {main &&
          main.map((item: any, index: number) => {
            const isActive = index === activeCardIndex;
            const card = item.data;
            return (
              <div
                key={index}
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
                  onClick={() => setActiveCardIndex(index)}
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
                            key={index}
                            variant="default"
                            className="bg-primary/50 flex-1 min-w-fit max-w-fit font-medium flex gap-x-2 items-center"
                          >
                            {card.year}
                            <p>{(card.BCE && "B.C.E") || "A.C.E"}</p>
                          </Badge>
                        </span>
                        <span className="w-fit items-center justify-center flex transition-all">
                          {isActive && (
                            <Button
                              variant={"outline"}
                              size={"icon"}
                              className="text-white bg-transparent border-0 hover:bg-transparent hover:border-0 md:size-8 rounded-sm"
                              onClick={handlePlayPauseClick}
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
                      {isActive && (
                        <div className="w-full h-fit items-center justify-center">
                          <Progress value={progress} />
                        </div>
                      )}
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
                  <h1
                    className={cn(
                      "text-3xl md:text-3xl xl:text-3xl antialiased tracking-wide font-bold"
                    )}
                  >
                    {card.title}
                  </h1>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
