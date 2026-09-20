"use client";

import { Check, Clock, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function MilestoneStep({ milestone }) {
  const { status, title, dateLabel, description } = milestone;

  if (status === "done") {
    return (
      <div className="relative flex flex-col gap-1">
        <div className="absolute -left-7 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
          <Check className="h-3 w-3" strokeWidth={3} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white">{title}</h4>
            <Badge className="rounded-md bg-emerald-50 text-[10px] font-medium text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400">
              Verified
            </Badge>
          </div>
          <span className="font-mono text-[10.5px] text-emerald-600 dark:text-emerald-400">{dateLabel}</span>
        </div>
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    );
  }

  if (status === "current") {
    return (
      <div className="relative flex flex-col gap-1">
        <div className="absolute -left-7 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 shadow-xs ring-4 ring-indigo-100 dark:ring-indigo-500/20">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{title}</h4>
            <Badge className="gap-1 rounded-md bg-indigo-50 text-[10px] font-semibold text-indigo-600 hover:bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Clock className="h-2.5 w-2.5" />
              In Progress
            </Badge>
          </div>
          <span className="text-[10.5px] font-semibold text-indigo-600 dark:text-indigo-400">{dateLabel}</span>
        </div>
        <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">{description}</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-1 opacity-60">
      <div className="absolute -left-7 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900">
        <Lock className="h-2.5 w-2.5" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-1">
        <h4 className="text-xs font-semibold text-slate-900 dark:text-white">{title}</h4>
        <span className="font-mono text-[10.5px] text-slate-400 dark:text-slate-500">{dateLabel}</span>
      </div>
      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
