"use client";

import { cn } from "@/lib/utils";

/**
 * Compact segmented control for filtering lists (notifications, tasks, etc).
 * options: [{ value, label, count? }]
 */
export default function FilterTabs({ options, value, onChange, className }) {
  return (
    <div
      className={cn(
        "flex rounded-lg border border-slate-200/80 bg-slate-100/60 p-0.5 dark:border-slate-800 dark:bg-slate-900/60",
        className
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-md px-2.5 py-1 text-[10px] font-bold capitalize transition-all",
            value === opt.value
              ? "bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-white"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          )}
        >
          {opt.label}
          {typeof opt.count === "number" && <span className="ml-1 opacity-60">{opt.count}</span>}
        </button>
      ))}
    </div>
  );
}
