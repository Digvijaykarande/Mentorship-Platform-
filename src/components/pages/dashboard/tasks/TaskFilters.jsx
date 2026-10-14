"use client";

import { Database, FolderKanban, Globe2, ServerCog, ShieldCheck } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TABS } from "./taskData";

export default function TaskFilters({
  status,
  setStatus,
  project,
  setProject,
  counts = {},
}) {
  const projectOptions = [
    { value: "all", label: "All", icon: FolderKanban },
    { value: "Auth Service", label: "Auth", icon: ShieldCheck },
    { value: "Customer Portal", label: "Portal", icon: Globe2 },
    { value: "Data Platform", label: "Data", icon: Database },
    { value: "DevOps", label: "DevOps", icon: ServerCog },
  ];

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <Tabs value={status} onValueChange={setStatus}>
          <TabsList>
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-1.5 px-3 text-[13px] font-medium">
                {tab.label}
                <span className="text-[11px] text-muted-foreground tabular-nums">
                  {counts[tab.value] ?? 0}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-1.5 overflow-x-auto rounded-xl border bg-card p-1" role="radiogroup" aria-label="Filter by project">
          {projectOptions.map(({ value, label, icon: Icon }) => {
            const selected = project === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setProject(value)}
                className={cn(
                  "flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-semibold transition-colors",
                  selected ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}