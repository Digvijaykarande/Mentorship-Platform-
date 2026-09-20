"use client";

import { cn } from "@/lib/utils";

/**
 * Compact metric card used in profile header / dashboard summaries.
 */
export default function StatCard({ icon: Icon, iconClassName, label, value, className }) {
  return (
    <div
      className={cn(
        "flex min-w-[110px] flex-1 flex-col items-center rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition-transform duration-200 hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {Icon && <Icon className={cn("h-3.5 w-3.5", iconClassName)} />}
        {label}
      </div>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  );
}
