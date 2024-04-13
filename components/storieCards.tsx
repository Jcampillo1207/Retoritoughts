"use client";

import StoryCard from "./storyCard";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, RefreshCcw } from "lucide-react";
import { getEventImages, getFrontEvents } from "@/lib/supabase/events";

export const StorieCards = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const timerInterval = 10000;
  const [isVisible, setIsVisible] = useState(false);
  const [main, setMain] = useState<any>();
  const [recharge, setRecharge] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted && !isLoading) {
        setIsLoading(true);
        const events = await getFrontEvents();
        const data = await Promise.all(
          events.map(async (event) => {
            if (event.error === null && event.data.image) {
              const imageUrl = await getEventImages(event.data.image);
              return {
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
        if (isMounted) {
          setMain(data);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
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
          main.map((item: any, index: any) => (
            <StoryCard
              key={index}
              card={item.data}
              isActive={index === activeCardIndex}
              onActivate={() => setActiveCardIndex(index)}
              onTogglePlay={handlePlayPauseClick}
              isPlaying={isPlaying}
              progress={progress}
            />
          ))}
      </div>
    </div>
  );
};
