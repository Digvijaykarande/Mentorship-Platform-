"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FEEDBACK_CATEGORIES, FEEDBACK_STATUSES } from "./feedbackData";

// Rendered as the toolbar at the top of the Latest Feedback card.
export default function FeedbackFilters({ filters, onChange, onReset }) {
  const hasActiveFilters = filters.search || filters.category !== "All Categories" || filters.status !== "All Statuses";

  return (
    <div className="flex flex-col gap-2 border-b border-slate-100 p-3 dark:border-slate-800 sm:p-4 lg:flex-row lg:items-center">
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <Input
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
          placeholder="Search by project, mentor, category or ID"
          aria-label="Search feedback"
          className="h-9 pl-9 text-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 lg:flex">
        <Select value={filters.category} onValueChange={(val) => onChange("category", val)}>
          <SelectTrigger aria-label="Filter by category" className="h-9 w-full text-xs lg:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Categories">All Categories</SelectItem>
            {FEEDBACK_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.status} onValueChange={(val) => onChange("status", val)}>
          <SelectTrigger aria-label="Filter by status" className="h-9 w-full text-xs lg:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Statuses">All Statuses</SelectItem>
            {FEEDBACK_STATUSES.map((st) => (
              <SelectItem key={st} value={st}>{st}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button type="button" variant="ghost" size="sm" onClick={onReset} className="h-9 gap-1.5 self-start text-slate-500 dark:text-slate-400 lg:self-auto">
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </Button>
      )}
    </div>
  );
}
