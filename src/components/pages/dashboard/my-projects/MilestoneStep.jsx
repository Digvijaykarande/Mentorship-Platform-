"use client";

import { Check, Clock, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MilestoneStep({ milestone }) {
  const {
    status,
    title,
    dateLabel,
    description,
    linkedTaskCount = 0,
    completedTaskCount = 0,
  } = milestone;

  if (status === "done") {
    return (
      <div className="relative flex flex-col gap-1.5">
        <div className="absolute -left-[41px] sm:-left-[45px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm ring-4 ring-white dark:ring-slate-900">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              {title}
            </h4>
            <Badge className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400">
              Verified
            </Badge>
          </div>
          <span className="font-mono text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            {dateLabel}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    );
  }

  if (status === "current") {
    return (
      <div className="relative flex flex-col gap-1.5">
        <div className="absolute -left-[41px] sm:-left-[45px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm ring-4 ring-indigo-100 dark:ring-indigo-950">
          <span className="h-2 w-2 animate-ping rounded-full bg-white" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {title}
            </h4>
            <Badge className="gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 hover:bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Clock className="h-3 w-3" />
              Active Sprint
            </Badge>
          </div>
          <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
            {dateLabel}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          {description}
        </p>
        {linkedTaskCount > 0 && (
          <span className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            {completedTaskCount} of {linkedTaskCount} linked deliverables completed
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-1.5 opacity-60">
      <div className="absolute -left-[41px] sm:-left-[45px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-slate-400 ring-4 ring-white dark:border-slate-700 dark:bg-slate-900 dark:ring-slate-900">
        <Lock className="h-3 w-3" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <h4 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-300">
          {title}
        </h4>
        <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
          {dateLabel}
        </span>
      </div>
      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}
