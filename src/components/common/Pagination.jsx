"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Compact prev/next pagination with page-number buttons.
 * Used for any paged list (tasks, notifications, resources, etc).
 */
export default function Pagination({ page, totalPages, onPageChange, className }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="text-slate-400 disabled:opacity-30"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </Button>

      {pages.map((p) => (
        <Button
          key={p}
          type="button"
          variant={p === page ? "default" : "ghost"}
          size="icon-sm"
          onClick={() => onPageChange(p)}
          className={cn(
            "text-[11px] font-semibold",
            p === page ? "bg-indigo-600 text-white hover:bg-indigo-700" : "text-slate-500 dark:text-slate-400"
          )}
        >
          {p}
        </Button>
      ))}

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="text-slate-400 disabled:opacity-30"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
