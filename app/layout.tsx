import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/themeProvider";
import { Toaster } from "@/components/ui/sonner";
import {
  AlertTriangleIcon,
  Ban,
  CheckCircle2,
  Info,
  Loader,
} from "lucide-react";

const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Retoritoughts",
  description:
    "Retoritoughts is a trivia game where players must guess whether a historical or fictional event happened before or after another. Test your knowledge in this time and sequence challenge.",
  icons: [
    {
      url: "/logoret.svg",
      href: "/logoret.svg",
      sizes: "32x32",
    },
  ],
  openGraph: {
    type: "website",
    url: "retoritoughts.com",
    title: "Retoritoughts",
    description:
      "Retoritoughts is a trivia game where players must guess whether a historical or fictional event happened before or after another. Test your knowledge in this time and sequence challenge.",
    siteName: "Retoritoughts",
    images: [
      {
        url: `https://uysatyjrbmttzkzisucw.supabase.co/storage/v1/object/public/banner/image.png?t=2024-04-13T06%3A59%3A27.822Z`,
        height: 600,
        width: 800,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            icons={{
              success: <CheckCircle2 className="size-4" />,
              info: <Info className="size-4" />,
              warning: <AlertTriangleIcon className="size-4" />,
              error: <Ban className="size-4" />,
              loading: <Loader className="size-4" />,
            }}
            toastOptions={{
              unstyled: false,
              classNames: {
                error: "border-destructive text-destructive",
                success: "border-green-400",
                warning: "border-yellow-400",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
