"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

/**
 * Shared page header: icon + title/description on the left, optional search + filter on the right.
 * Used by My Projects and any other list page needing search/filter controls.
 */
export default function Header({
  title,
  description,
  icon: Icon,
  iconBg = "bg-blue-50 dark:bg-blue-500/10",
  iconColor = "text-blue-600 dark:text-blue-400",
  searchQuery = "",
  setSearchQuery,
  searchPlaceholder = "Search...",
  filterValue = "All",
  setFilterValue,
  filterOptions = [],
  filterPlaceholder = "All Categories",
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", iconBg, iconColor)}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <div className="leading-tight">
          <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-xl">{title}</h1>
          {description && <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{description}</p>}
        </div>
      </div>

      {(setSearchQuery || setFilterValue) && (
        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:items-center">
          {setSearchQuery && (
            <div className="relative w-full sm:w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-8 text-xs"
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          )}

          {setFilterValue && filterOptions.length > 0 && (
            <Select value={filterValue} onValueChange={setFilterValue}>
              <SelectTrigger className="w-full text-xs sm:w-[170px]">
                <SelectValue placeholder={filterPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}
    </div>
  );
}
