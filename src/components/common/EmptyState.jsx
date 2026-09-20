"use client";

import { cn } from "@/lib/utils";

/**
 * Generic "nothing here" placeholder for empty lists (notifications, tasks, search results).
 */
export default function EmptyState({ icon: Icon, title, description, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200/80 bg-slate-50/50 py-10 text-center dark:border-slate-800 dark:bg-slate-900/30",
        className
      )}
    >
      {Icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <p className="mt-3 text-xs font-semibold text-slate-700 dark:text-slate-300">{title}</p>
      {description && (
        <p className="mt-0.5 max-w-xs text-[10px] text-slate-400 dark:text-slate-500">{description}</p>
      )}
    </div>
  );
}
