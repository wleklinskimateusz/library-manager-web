import { cn } from "@/lib/utils";
import Link from "next/link";

export function Pagination({
  total,
  page,
  pageSize,
}: {
  total: number;
  page: number;
  pageSize: number;
}) {
  const totalPages = Math.ceil(total / pageSize);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing {(page - 1) * pageSize + 1} to{" "}
        {Math.min(page * pageSize, total)} of {total} results
      </div>
      <div className="flex items-center space-x-2">
        {hasPreviousPage && (
          <Link
            href={{
              query: {
                page: Math.max(1, page - 1),
                pageSize,
              },
            }}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4",
              page <= 1 && "pointer-events-none opacity-50"
            )}
          >
            Previous
          </Link>
        )}
        {hasNextPage && (
          <Link
            href={{
              query: {
                page: page + 1,
                pageSize,
              },
            }}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4",
              page * pageSize >= total && "pointer-events-none opacity-50"
            )}
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
