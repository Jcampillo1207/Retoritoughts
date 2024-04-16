"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { fetchData, getEventImages, getFrontEvents } from "@/lib/supabase/events";
import Image from "next/image";
import { useEffect, useState } from "react";

export const GridCompanion = () => {
  const [images, setImages] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(false);
  const skeletonCount = 9;

  useEffect(() => {
    setIsLoading(true);
    async function fetch() {
      const data = await fetchData(skeletonCount);
      setImages(data);
    }
    setIsLoading(false);
    fetch();
  }, []);

  return (
    <section className="w-full h-full overflow-hidden flex items-center justify-center lg:border-l absolute lg:relative">
      <div className="w-[160%] aspect-square h-screen grid grid-cols-3 gap-5 items-start justify-start -skew-x-12 absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
        {images && images.length > 0
          ? images.map((item, index) => (
              <div
                key={index}
                className="w-full h-[400px] bg-muted rounded-2xl border relative overflow-hidden aspect-square"
              >
                <div className="z-10 w-full h-full absolute top-0 left-0 transition-all opacity-100 hover:opacity-0 bg-background/5 backdrop-blur-sm" />
                <Image
                  src={(item.imageUrl && item.imageUrl) || "/logoret.svg"}
                  fill
                  className="object-cover"
                  alt="Image"
                />
              </div>
            ))
          : Array.from({ length: skeletonCount }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-[400px] bg-muted rounded-2xl border relative overflow-hidden aspect-square"
              />
            ))}
      </div>
    </section>
  );
};
