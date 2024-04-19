"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { getLeaderboard, getUserCount } from "@/lib/supabase/score";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy } from "lucide-react";
import { Label } from "@/components/ui/label";

export const TableComponent = () => {
  const [data, setData] = useState<any>();
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [maxCount, setMaxCount] = useState<number>();
  const [value, setValue] = useState<string>("max_score");
  const [range, setRange] = useState<number>(10);

  useEffect(() => {
    setIsLoading(true);
    async function fetchLeaderboard() {
      setMaxCount((await getUserCount()) || 0);
      setData(await getLeaderboard(page, range, value));
      setIsLoading(false);
    }

    fetchLeaderboard();
  }, [page, value, range]);

  return (
    <>
      <div className="w-full h-fit items-center justify-between flex gap-x-5">
        <div className="flex flex-col gap-y-4 items-start justify-start">
          <Label className="text-muted-foreground">Game mode</Label>
          <Select
            onValueChange={setValue}
            value={value}
            defaultValue="max_score"
          >
            <SelectTrigger className="w-[200px]" defaultValue={range}>
              <SelectValue placeholder="Clásico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="max_score">Classic</SelectItem>
              <SelectItem value="rmax_score">Realistic</SelectItem>
              <SelectItem value="fmax_score">Frenzy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-y-4 items-start justify-start">
          <Label className="text-muted-foreground">Range</Label>
          <Select
            defaultValue={range.toString()}
            value={range.toString()}
            onValueChange={(value) => setRange(parseInt(value, 10))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Clásico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="w-full">
        <TableHeader className="sticky top-0 bg-[#F5F5F4] dark:bg-[#100D0C] z-20">
          <TableRow>
          <TableHead className="">Position</TableHead>
            <TableHead className="min-w-[150px]">
              {value == "max_score"
                ? "Classic Mode"
                : value == "rmax_score"
                ? "Realistic Mode"
                : "Frenzy mode"}
            </TableHead>
            <TableHead className="w-full">Username</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(isLoading && (
            <>
              {Array.from({ length: range }, (_, index) => (
                <TableRow key={index} className="">
                  <TableCell className="p-0">
                    <Skeleton className="w-auto flex-1 h-[30px] aspect-video" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-auto flex-1 h-[30px] max-w-[50px]" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          )) ||
            (data &&
              data.map((item: any, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {value == "max_score"
                        ? item.max_score
                        : value == "rmax_score"
                        ? item.rmax_score
                        : item.fmax_score}
                    </TableCell>
                    <TableCell className="flex gap-x-2 items-center relative">
                      {item.username}
                      {page == 0 ? (
                        <Trophy
                          className={cn(
                            "size-4 hidden absolute right-4",
                            index == 0
                              ? "text-amber-400 flex"
                              : index == 1
                              ? "text-zinc-500 flex"
                              : index == 2
                              ? "text-orange-800 flex"
                              : "hidden"
                          )}
                        />
                      ) : (
                        <></>
                      )}
                    </TableCell>
                  </TableRow>
                );
              }))}
        </TableBody>
      </Table>
      <div className="w-full">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={cn(
                  page - 1 < 0 ? "hidden" : "flex",
                  "cursor-pointer"
                )}
                onClick={() => setPage(page - 1 < 0 ? page : page - 1)}
              />
            </PaginationItem>
            <PaginationItem className="flex">
              <PaginationLink
                className={cn(page - 1 < 0 ? "hidden" : "flex", "cursor-pointer")}
                onClick={() => setPage(page - 1)}
              >
                {page}
              </PaginationLink>
              <PaginationLink className="bg-muted dark:bg-muted/10">
                {page + 1}
              </PaginationLink>
              <PaginationLink
                className={cn(page + 1 > maxCount! / range ? "hidden" : "flex", "cursor-pointer")}
                onClick={() =>
                  setPage(page + 1 > maxCount! / range ? page : page + 1)
                }
              >
                {page + 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={cn(
                  page + 1 > maxCount! / range ? "hidden" : "flex",
                  "cursor-pointer"
                )}
                onClick={() =>
                  setPage(page + 1 > maxCount! / range ? page : page + 1)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
