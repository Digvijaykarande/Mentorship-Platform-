"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_STYLES = {
  "In Progress": { badge: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400", dot: "bg-indigo-500" },
  "Under Review": { badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400", dot: "bg-emerald-500" },
  Planning: { badge: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400", dot: "bg-amber-500" },
  Completed: { badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400", dot: "bg-emerald-500" },
  Blocked: { badge: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400", dot: "bg-red-500" },
};
const DEFAULT_STYLE = { badge: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300", dot: "bg-slate-400" };

export function getStatusStyle(status) {
  return STATUS_STYLES[status] || DEFAULT_STYLE;
}

export default function ProjectStatusBadge({ status, pulse = false, className }) {
  const style = getStatusStyle(status);
  return (
    <Badge className={cn("gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold hover:bg-inherit", style.badge, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", style.dot, pulse && "animate-pulse")} />
      {status}
    </Badge>
  );
}
