"use client";

import { ChevronRight, Star } from "lucide-react";
import FeedbackStatusBadge from "./FeedbackStatusBadge";
import { cn } from "@/lib/utils";

export default function FeedbackListItem({ item, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={selected ? "true" : undefined}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl border p-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
        selected
          ? "border-indigo-500/60 bg-white shadow-sm dark:bg-slate-900"
          : "border-slate-200/70 bg-white/70 hover:border-slate-300 hover:bg-white dark:border-slate-800/70 dark:bg-slate-900/40 dark:hover:border-slate-700 dark:hover:bg-slate-900",
      )}
    >
      {selected && <span className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-indigo-600" aria-hidden="true" />}

      <div className="flex items-center justify-between gap-2">
        <FeedbackStatusBadge status={item.status} />
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold tabular-nums text-slate-700 dark:text-slate-200">
          {item.rating}
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
        </span>
      </div>

      <h3 className="mt-2.5 line-clamp-1 text-[13px] font-semibold text-slate-900 dark:text-white">{item.title}</h3>
      <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-500 dark:text-slate-400">
        {item.category} from {item.mentor}
      </p>

      <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
        <span>{item.date}</span>
        <ChevronRight
          className={cn("h-3.5 w-3.5 transition-transform", selected ? "translate-x-0.5 text-indigo-600" : "text-slate-300 group-hover:text-slate-500")}
          aria-hidden="true"
        />
      </div>
    </button>
  );
}
