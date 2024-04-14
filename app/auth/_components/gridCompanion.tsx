"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const GridCompanion = () => {
  const [images, setImages] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   let isMounted = true;

  //   const fetchData = async () => {
  //     if (isMounted && !isLoading) {
  //       setIsLoading(true);
  //       const events = await getFrontEvents(9);
  //       const data = await Promise.all(
  //         events.map(async (event) => {
  //           if (event.error === null && event.data.image) {
  //             const imageUrl = await getEventImages(event.data.image);
  //             return {
  //               data: {
  //                 image: imageUrl,
  //               },
  //             };
  //           } else {
  //             return event;
  //           }
  //         })
  //       );
  //       if (isMounted) {
  //         setImages(data);
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <section className="w-full h-full overflow-hidden flex items-center justify-center lg:border-l absolute lg:relative">
      <div className="w-[160%] aspect-square h-full grid grid-cols-3 gap-5 items-start justify-start -skew-x-12 absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
        {images &&
          images.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full h-[400px] bg-muted rounded-2xl border relative overflow-hidden aspect-square"
              >
                <div className="z-10 w-full h-full absolute top-0 left-0 transition-all opacity-100 hover:opacity-0 bg-background/5 backdrop-blur-sm" />
                <Image
                  src={item.data.image.publicUrl}
                  fill
                  className="object-cover"
                  alt="Image"
                />
              </div>
            );
          })}
      </div>
    </section>
  );
};
