"use client";

import StoryCard from "./storyCard";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, RefreshCcw } from "lucide-react";
import { getEventImages, getFrontEvents } from "@/lib/supabase/events";
import { Skeleton } from "./ui/skeleton";

export const StorieCards = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const timerInterval = 10000;
  const [isVisible, setIsVisible] = useState(false);
  const [main, setMain] = useState<any>();
  const [recharge, setRecharge] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const skeletonCount = 4

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await getFrontEvents(skeletonCount); // Asuming getFrontEvents uses Supabase

        if (response.data && Array.isArray(response.data)) {
          const eventsWithImages = await Promise.all(
            response.data.map(async (event: any) => {
              if (event.image) {
                const data = await getEventImages(event.image);

                return { ...event, imageUrl: data.publicUrl };
              } else {
                return { ...event, imageUrl: null };
              }
            })
          );

          setMain(eventsWithImages);
        } else {
          throw new Error("Failed to fetch events: Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }

      setIsLoading(false);
    }

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

  console.log(main);

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
          Refresh
          <RefreshCcw className="size-4" />
        </Button>
      </div>
      <div
        className="w-full h-fit items-start justify-start flex gap-x-1 overflow-hidden"
        id="reference"
      >
        {main && main.length > 0
          ? main.map((item: any, index: number) => (
              <StoryCard
                key={index}
                card={item}
                isActive={index === activeCardIndex}
                onActivate={() => setActiveCardIndex(index)}
                onTogglePlay={handlePlayPauseClick}
                isPlaying={isPlaying}
                progress={progress}
              />
            ))
          : Array.from({ length: skeletonCount }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-auto md:h-[600px] bg-muted rounded-2xl border relative overflow-hidden aspect-square min-w-full md:min-w-0 flex-1"
              />
            ))}
      </div>
    </div>
  );
};
