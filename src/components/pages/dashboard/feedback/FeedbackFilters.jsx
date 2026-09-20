"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FEEDBACK_CATEGORIES, FEEDBACK_STATUSES } from "./feedbackData";

export default function FeedbackFilters({ filters, onChange, onReset }) {
  const hasActiveFilters = filters.search || filters.category !== "All Categories" || filters.status !== "All Statuses";

  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-slate-200/70 bg-white p-3 shadow-xs dark:border-slate-800/70 dark:bg-slate-900/60 lg:flex-row">
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
          placeholder="Search by project, mentor, category or feedback ID..."
          className="pl-9 text-xs"
        />
      </div>

      <Select value={filters.category} onValueChange={(val) => onChange("category", val)}>
        <SelectTrigger className="w-full text-xs lg:w-48">
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
        <SelectTrigger className="w-full text-xs lg:w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Statuses">All Statuses</SelectItem>
          {FEEDBACK_STATUSES.map((st) => (
            <SelectItem key={st} value={st}>{st}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button type="button" variant="ghost" size="sm" onClick={onReset} className="gap-1.5 text-slate-500 dark:text-slate-400">
          <X className="h-3.5 w-3.5" />
          Reset
        </Button>
      )}
    </div>
  );
}
