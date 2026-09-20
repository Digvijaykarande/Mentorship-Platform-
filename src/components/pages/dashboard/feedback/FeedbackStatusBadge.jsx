"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CONFIG = {
  Resolved: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  "Action Required": "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  "In Review": "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
};
const DOT = {
  Resolved: "bg-emerald-500",
  "Action Required": "bg-rose-500",
  "In Review": "bg-indigo-500",
};

export default function FeedbackStatusBadge({ status, className }) {
  return (
    <Badge className={cn("gap-1.5 rounded-full text-[10px] font-bold hover:bg-inherit", CONFIG[status] || CONFIG["In Review"], className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", DOT[status] || DOT["In Review"])} />
      {status}
    </Badge>
  );
}
