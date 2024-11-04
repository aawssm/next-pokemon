"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

export function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage <= 1}
      >
        <Link href={createPageURL(1)}>
          <ChevronsLeftIcon className="h-4 w-4" />
        </Link>
      </Button>
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage <= 1}
      >
        <Link href={createPageURL(currentPage - 1)}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Link>
      </Button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage >= totalPages}
      >
        <Link href={createPageURL(currentPage + 1)}>
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      </Button>
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage >= totalPages}
      >
        <Link href={createPageURL(totalPages)}>
          <ChevronsRightIcon className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
