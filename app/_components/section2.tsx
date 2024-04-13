import { SectionLanding } from "@/components/layout/sections";
import { StorieCards } from "@/components/storieCards";

export const Section2 = () => {
  return (
    <SectionLanding className="flex-col gap-y-14 pt-0 md:pt-0 lg:pt-0 xl:pt-0">
      <div className="w-full h-fit items-start justify-start">
        <h2 className="text-3xl md:text-2xl text-center md:text-start lg:text-3xl xl:text-4xl antialiased font-medium max-w-2xl text-pretty">
          Guess which historical events happened before others.
        </h2>
      </div>
      <StorieCards />
    </SectionLanding>
  );
};
