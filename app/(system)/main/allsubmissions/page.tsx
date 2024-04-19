"use client";

import { Button } from "@/components/ui/button";
import { getAllEventsImages } from "@/lib/supabase/events";
import { createClient } from "@/lib/supabase/supaclient";
import { ArrowDown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SubmissionCard } from "../submissions/_components/submissionCard";
import { fetchUser } from "@/lib/supabase/actions";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const SubmissionsPage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<any>();
  const [value, setValue] = useState<string>("*");
  const [asc, setAsc] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [allSubmissions, setAllSubmissions] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          setIsLoading(false);
          return;
        }
        setUserData(data.user);
        setUserRole(await fetchUser(data.user));
      } catch (err) {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!userData) return;
    setIsLoading(true);

    const fetchSubmissions = async () => {
      try {
        const submissionsData = await getAllEventsImages(value, asc);
        setAllSubmissions(submissionsData);
      } catch (err) {}
      setIsLoading(false);
    };

    fetchSubmissions();
  }, [userData, value, asc]);

  const filteredSubmissions =
    allSubmissions?.filter((submission: any) => {
      return submission.title.toLowerCase().includes(search.toLowerCase());
    }) || [];

  return (
    <main className="w-full min-h-[calc(100dvh_-_56px)] h-[calc(100dvh_-_56px)] lg:max-h-[calc(100dvh_-_56px)] items-start justify-start flex flex-col lg:flex-row sticky top-0 overflow-hidden">
      <aside className="w-full h-fit lg:h-full border-b lg:border-b-0 lg:border-r col-span-1 lg:col-span-2 px-5 md:px-7 py-5 lg:py-10 lg:max-w-[250px]">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-xl font-bold text-primary antialiased hidden lg:flex">
            All Submissions
          </h1>
          <Button
            variant={"ghost"}
            size={"sm"}
            asChild
            className="items-center justify-center gap-x-2 text-muted-foreground w-fit lg:w-full hidden lg:flex"
          >
            <Link href={"/main"}>
              <ArrowLeft className="size-4" />
              Return to dashboard
            </Link>
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
            asChild
            className="items-center justify-center gap-x-2 text-muted-foreground w-fit lg:w-full lg:hidden flex"
          >
            <Link href={"/main"}>
              <ArrowLeft className="size-4" />
              Frenzy Mode
            </Link>
          </Button>
        </div>
      </aside>
      <div className="w-full flex-1 flex flex-col px-5 md:px-7 gap-y-5 lg:gap-y-10 bg-muted dark:bg-muted/10  items-start justify-start h-fit max-h-[calc(100dvh_-_56px)] overflow-scroll relative">
        <div className="w-full h-fit items-center justify-between gap-x-5 flex sticky top-0 bg-muted dark:bg-[#100D0C] py-5 lg:py-10 z-50 border-b">
          <div className="flex flex-col gap-y-4 items-start justify-start">
            <Label className="text-muted-foreground">Order by:</Label>
            <div className="flex gap-x-2 items-center justify-start">
              <Select onValueChange={setValue} value={value}>
                <SelectTrigger
                  className="w-fit min-w-[100px]"
                  defaultValue={value}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="*">All</SelectItem>
                  <SelectItem value="is_verified">Verified</SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => setAsc(!asc)}
              >
                <ArrowDown
                  className={cn(
                    "size-4 duration-300 ease-in-out",
                    (asc && "rotate-180") || "rotate-0"
                  )}
                />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 items-start justify-start flex-1 max-w-md">
            <Label className="text-muted-foreground">Search:</Label>
            <Input
              type="search"
              className="w-full"
              placeholder="Search by title"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full h-fit flex flex-wrap gap-5 min-h-fit items-start justify-start lg:min-h-[calc(100dvh_-_56px)] ">
          {(filteredSubmissions &&
            filteredSubmissions.map((item: any, index: number) => {
              return <SubmissionCard key={index} data={item} admin />;
            })) || (
            <>
              <Skeleton className="w-full h-auto rounded-2xl overflow-hidden min-h-[300px] flex-1 lg:max-w-md min-w-[300px]" />
              <Skeleton className="w-full h-auto rounded-2xl overflow-hidden min-h-[300px] flex-1 lg:max-w-md min-w-[300px]" />
              <Skeleton className="w-full h-auto rounded-2xl overflow-hidden min-h-[300px] flex-1 lg:max-w-md min-w-[300px]" />
              <Skeleton className="w-full h-auto rounded-2xl overflow-hidden min-h-[300px] flex-1 lg:max-w-md min-w-[300px]" />
              <Skeleton className="w-full h-auto rounded-2xl overflow-hidden min-h-[300px] flex-1 lg:max-w-md min-w-[300px]" />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default SubmissionsPage;
