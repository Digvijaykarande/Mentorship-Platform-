"use client";

import { cn } from "@/lib/utils";

/**
 * Small pill with an icon + text — used for header tags (company, location, join date)
 * and other compact metadata across Profile / Settings pages.
 */
export default function InfoChip({ icon: Icon, children, className, iconClassName }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-1 text-xs font-medium text-slate-400",
        className
      )}
    >
      {Icon && <Icon className={cn("h-3.5 w-3.5", iconClassName)} />}
      {children}
    </span>
  );
}
