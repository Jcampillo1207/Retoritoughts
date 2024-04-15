import { Button } from "@/components/ui/button";
import Link from "next/link";

const ConfirmPage = () => {
  return (
    <main className="w-ful h-screen min-h-screen flex flex-col gap-y-10 items-center justify-center">
      <h2 className="text-xl font-bold antialiased text-center">
        Please confirm your email
      </h2>
      <Button variant={"default"} size={"lg"} asChild>
        <Link href={"/auth"}>Return to login</Link>
      </Button>
    </main>
  );
};

export default ConfirmPage;
