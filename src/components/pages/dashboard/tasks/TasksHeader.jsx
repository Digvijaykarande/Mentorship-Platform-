"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function TasksHeader({
  inProgressCount = 0,
  searchQuery = "",
  setSearchQuery = () => {},
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.025em]">Tasks</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {inProgressCount > 0
            ? `${inProgressCount} ${inProgressCount === 1 ? "project" : "projects"} in progress`
            : "Nothing in progress"}
        </p>
      </div>
      <div className="relative sm:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects"
          className="h-10 pl-9"
        />
      </div>
    </header>
  );
}
