import { cn } from "@/lib/utils";

interface UniversalSectionProps {
  className?: string;
  children: React.ReactNode;
}

export const SectionLanding = ({
  className,
  children,
}: UniversalSectionProps) => {
  return (
    <section
      className={cn(
        "w-full h-fit items-center justify-center px-5 md:px-7 lg:px-14 xl:px-36 py-10 md:py-14 lg:py-20 xl:py-28 flex flex-col",
        className
      )}
    >
      {children}
    </section>
  );
};
