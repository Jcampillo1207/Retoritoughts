import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <svg
      className={cn("h-[70%] w-auto aspect-square", className)}
      viewBox="0 0 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="39.375" y="22.5751" width="5.25" height="12.6" className="fill-black" />
      <rect
        x="59.7369"
        y="31.2374"
        width="5.25"
        height="12.6"
        transform="rotate(60 59.7369 31.2374)"
        className="fill-foreground"
      />
      <rect
        x="30.3369"
        y="44.625"
        width="5.25"
        height="12.6"
        transform="rotate(60 30.3369 44.625)"
        className="fill-foreground"
      />
      <rect
        x="32.9619"
        y="36.75"
        width="5.25"
        height="12.6"
        transform="rotate(120 32.9619 36.75)"
        className="fill-foreground"
      />
      <rect
        x="62.3619"
        y="49.6124"
        width="5.25"
        height="12.6"
        transform="rotate(120 62.3619 49.6124)"
        className="fill-foreground"
      />
      <rect x="39.375" y="51.4501" width="5.25" height="12.6" className="fill-primary" />
      <path
        d="M55.125 42C55.125 49.2487 49.2487 55.125 42 55.125C34.7513 55.125 28.875 49.2487 28.875 42C28.875 34.7513 34.7513 28.875 42 28.875C49.2487 28.875 55.125 34.7513 55.125 42ZM36.4048 42C36.4048 45.0901 38.9099 47.5952 42 47.5952C45.0901 47.5952 47.5952 45.0901 47.5952 42C47.5952 38.9099 45.0901 36.4048 42 36.4048C38.9099 36.4048 36.4048 38.9099 36.4048 42Z"
        className="fill-primary"
      />
      <circle cx="13.125" cy="28.875" r="13.125" className="fill-foreground" />
      <circle cx="70.875" cy="28.875" r="13.125" className="fill-foreground" />
      <circle cx="13.125" cy="57.75" r="13.125" className="fill-foreground" />
      <circle cx="70.875" cy="57.75" r="13.125" className="fill-foreground" />
      <path
        d="M55.125 70.875C55.125 78.1237 49.2487 84 42 84C34.7513 84 28.875 78.1237 28.875 70.875C28.875 63.6263 34.7513 57.75 42 57.75C49.2487 57.75 55.125 63.6263 55.125 70.875ZM36.4046 70.875C36.4046 73.9652 38.9098 76.4704 42 76.4704C45.0902 76.4704 47.5954 73.9652 47.5954 70.875C47.5954 67.7848 45.0902 65.2796 42 65.2796C38.9098 65.2796 36.4046 67.7848 36.4046 70.875Z"
        className="fill-primary"
      />
      <path
        d="M55.125 13.125C55.125 20.3737 49.2487 26.25 42 26.25C34.7513 26.25 28.875 20.3737 28.875 13.125C28.875 5.87626 34.7513 0 42 0C49.2487 0 55.125 5.87626 55.125 13.125ZM36.4046 13.125C36.4046 16.2152 38.9098 18.7204 42 18.7204C45.0902 18.7204 47.5954 16.2152 47.5954 13.125C47.5954 10.0348 45.0902 7.52961 42 7.52961C38.9098 7.52961 36.4046 10.0348 36.4046 13.125Z"
        className="fill-primary"
      />
    </svg>
  );
};

export const LogoApp = ({ className }: LogoProps) => {
  return (
    <svg
      className={cn("size-10", className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" rx="16" className="fill-primary" />
      <rect x="47.375" y="30.5751" width="5.25" height="12.6" className="fill-black" />
      <rect
        x="67.7369"
        y="39.2374"
        width="5.25"
        height="12.6"
        transform="rotate(60 67.7369 39.2374)"
        fill="#FDFDFD"
      />
      <rect
        x="38.3369"
        y="52.625"
        width="5.25"
        height="12.6"
        transform="rotate(60 38.3369 52.625)"
        fill="#FDFDFD"
      />
      <rect
        x="40.9619"
        y="44.75"
        width="5.25"
        height="12.6"
        transform="rotate(120 40.9619 44.75)"
        fill="#FDFDFD"
      />
      <rect
        x="70.3619"
        y="57.6124"
        width="5.25"
        height="12.6"
        transform="rotate(120 70.3619 57.6124)"
        fill="#FDFDFD"
      />
      <rect x="47.375" y="59.4501" width="5.25" height="12.6" className="fill-black" />
      <path
        d="M63.125 50C63.125 57.2487 57.2487 63.125 50 63.125C42.7513 63.125 36.875 57.2487 36.875 50C36.875 42.7513 42.7513 36.875 50 36.875C57.2487 36.875 63.125 42.7513 63.125 50ZM44.4048 50C44.4048 53.0901 46.9099 55.5952 50 55.5952C53.0901 55.5952 55.5952 53.0901 55.5952 50C55.5952 46.9099 53.0901 44.4048 50 44.4048C46.9099 44.4048 44.4048 46.9099 44.4048 50Z"
        className="fill-black"
      />
      <circle cx="21.125" cy="36.875" r="13.125" fill="#FDFDFD" />
      <circle cx="78.875" cy="36.875" r="13.125" fill="#FDFDFD" />
      <circle cx="21.125" cy="65.75" r="13.125" fill="#FDFDFD" />
      <circle cx="78.875" cy="65.75" r="13.125" fill="#FDFDFD" />
      <path
        d="M63.125 78.875C63.125 86.1237 57.2487 92 50 92C42.7513 92 36.875 86.1237 36.875 78.875C36.875 71.6263 42.7513 65.75 50 65.75C57.2487 65.75 63.125 71.6263 63.125 78.875ZM44.4046 78.875C44.4046 81.9652 46.9098 84.4704 50 84.4704C53.0902 84.4704 55.5954 81.9652 55.5954 78.875C55.5954 75.7848 53.0902 73.2796 50 73.2796C46.9098 73.2796 44.4046 75.7848 44.4046 78.875Z"
        className="fill-black"
      />
      <path
        d="M63.125 21.125C63.125 28.3737 57.2487 34.25 50 34.25C42.7513 34.25 36.875 28.3737 36.875 21.125C36.875 13.8763 42.7513 8 50 8C57.2487 8 63.125 13.8763 63.125 21.125ZM44.4046 21.125C44.4046 24.2152 46.9098 26.7204 50 26.7204C53.0902 26.7204 55.5954 24.2152 55.5954 21.125C55.5954 18.0348 53.0902 15.5296 50 15.5296C46.9098 15.5296 44.4046 18.0348 44.4046 21.125Z"
        className="fill-black"
      />
    </svg>
  );
};
