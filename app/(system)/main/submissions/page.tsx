"use client";

import { Button } from "@/components/ui/button";
import {
  getUserSubmissions,
  getUserSubmissionsImages,
} from "@/lib/supabase/events";
import { createClient } from "@/lib/supabase/supaclient";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmissionCard } from "./_components/submissionCard";
import { Skeleton } from "@/components/ui/skeleton";

const SubmissionsPage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          setError("Error fetching user: " + error.message);
          setIsLoading(false);
          return;
        }
        setUserData(data.user);
      } catch (err) {
        setError("Unexpected error: ");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    setIsLoading(true)
    const fetchSubmissions = async () => {
      if (userData) {
        try {
          const submissionsData = await getUserSubmissionsImages(
            userData.email
          );
          setSubmissions(submissionsData);
        } catch (err) {
          setError("Error fetching submissions: ");
        }
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [userData]);

  return (
    <main className="w-full h-fit min-h-[calc(100dvh_-_56px)] lg:h-[calc(100dvh_-_56px)] lg:max-h-[100dvh] items-start justify-start flex flex-col lg:flex-row sticky top-0 overflow-hidden">
      <aside className="w-full h-fit lg:h-full border-b lg:border-b-0 lg:border-r col-span-1 lg:col-span-2 px-5 md:px-7 py-10 lg:max-w-[250px]">
        <Button
          variant={"ghost"}
          size={"sm"}
          asChild
          className="flex items-center justify-between gap-x-2 text-muted-foreground w-fit lg:w-full"
        >
          <Link href={"/main"}>
            <ArrowLeft className="size-4" />
            Return to dashboard
          </Link>
        </Button>
      </aside>
      <div className="w-full flex-1 flex flex-wrap h-fit overflow-scroll px-5 md:px-7 py-10 bg-muted dark:bg-muted/10 items-start justify-start min-h-[calc(100dvh_-_56px)]  max-h-[calc(100dvh_-_56px)]">
        <div className="w-full h-full flex flex-wrap gap-5 min-h-fit items-start justify-start">
          {(submissions &&
            submissions.map((item: any, index: number) => {
              return <SubmissionCard key={index} data={item} admin={false}/>;
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
