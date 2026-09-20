"use client";

import { cn } from "@/lib/utils";

/**
 * Compact, colorful metric tile — small footprint, single accent color, optional trend.
 * Used where SummaryCards/StatCard feel too large or too plain (e.g. My Projects overview).
 */
export default function MiniStatCard({ icon: Icon, label, value, tone = "blue", trend, className }) {
  const TONES = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white px-3.5 py-3 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60",
        className
      )}
    >
      <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", TONES[tone])}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0" style={{display: 'flex',gap:"5px"}}>
        <div className="flex items-baseline gap-1.5">
          <p className="text-lg font-bold leading-none tracking-tight text-slate-900 dark:text-white">{value}</p>
          {trend && <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">{trend}</span>}
        </div>
        <p className="mt-0.5 truncate text-[11px] font-medium text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
}
