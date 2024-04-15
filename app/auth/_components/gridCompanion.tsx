"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getEventImages, getFrontEvents } from "@/lib/supabase/events";
import Image from "next/image";
import { useEffect, useState } from "react";

export const GridCompanion = () => {
  const [images, setImages] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(false);
  const skeletonCount = 9;

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

          setImages(eventsWithImages);
        } else {
          throw new Error("Failed to fetch events: Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }

      setIsLoading(false);
    }

    fetchData();
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
