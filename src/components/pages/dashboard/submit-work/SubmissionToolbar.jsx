"use client";

import { ListFilter, RotateCcw, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUBMISSION_TYPES } from "./constants";

// Status values are canonical keys (see statusKey in Status.jsx).
const STATUS_OPTIONS = [
  { value: "All", label: "All statuses" },
  { value: "pending", label: "Pending review" },
  { value: "changes", label: "Changes requested" },
  { value: "approved", label: "Approved" },
  { value: "withdrawn", label: "Withdrawn" },
];
const TYPE_OPTIONS = [
  { value: "All", label: "All types" },
  ...SUBMISSION_TYPES.map((t) => ({ value: t.value, label: t.label })),
];
const labelOf = (options, value) =>
  options.find((o) => o.value === value)?.label ?? value;

export default function SubmissionToolbar({
  search = "",
  setSearch = () => {},
  statusFilter = "All",
  setStatusFilter = () => {},
  typeFilter = "All",
  setTypeFilter = () => {},
  onReset = () => {},
}) {
  const hasActiveFilters =
    Boolean(search) || statusFilter !== "All" || typeFilter !== "All";
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search submissions by title, ID, type, or milestone..."
            className="h-10 border-slate-200 bg-slate-50/70 pl-9 pr-9 text-sm focus-visible:bg-white dark:border-slate-800 dark:bg-slate-800/50 dark:focus-visible:bg-slate-900"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="mr-1 hidden items-center gap-1.5 text-xs font-semibold text-slate-500 sm:flex dark:text-slate-400">
            <ListFilter className="h-3.5 w-3.5" /> Filter
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-10 w-[156px] border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-10 w-[146px] border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TYPE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            disabled={!hasActiveFilters}
            className="h-10 gap-1.5 px-3 text-slate-500 dark:text-slate-400"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>
      </div>
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
          <span className="text-[11px] font-medium text-slate-400">
            Active filters
          </span>
          {search && (
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full pl-2.5 pr-1.5 font-normal"
            >
              {search}
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {statusFilter !== "All" && (
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full pl-2.5 pr-1.5 font-normal"
            >
              {labelOf(STATUS_OPTIONS, statusFilter)}
              <button
                type="button"
                onClick={() => setStatusFilter("All")}
                aria-label="Clear status filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {typeFilter !== "All" && (
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full pl-2.5 pr-1.5 font-normal"
            >
              {labelOf(TYPE_OPTIONS, typeFilter)}
              <button
                type="button"
                onClick={() => setTypeFilter("All")}
                aria-label="Clear type filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </section>
  );
}
