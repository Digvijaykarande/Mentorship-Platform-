"use client";

import { ChevronRight, Star, Tag, User } from "lucide-react";
import FeedbackStatusBadge from "./FeedbackStatusBadge";
import { cn } from "@/lib/utils";

export default function FeedbackListItem({ item, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl border p-3 text-left transition-all duration-200",
        selected
          ? "border-indigo-500 bg-white shadow-sm ring-2 ring-indigo-500/10 dark:bg-slate-900"
          : "border-slate-200/60 bg-white/70 hover:border-slate-300 hover:bg-white dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:border-slate-700 dark:hover:bg-slate-900"
      )}
    >
      {selected && <div className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-indigo-600" />}

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            #{item.id}
          </span>
          <FeedbackStatusBadge status={item.status} />
        </div>
        <div className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-slate-50 px-2 py-0.5 dark:border-slate-700 dark:bg-slate-800/60">
          <span className="font-mono text-[11px] font-bold text-slate-900 dark:text-white">{item.rating}</span>
          <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
        </div>
      </div>

      <h3 className="mt-2 line-clamp-1 text-xs font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
        {item.title}
      </h3>

      <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-100 pt-2 text-[10px] font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <div className="flex min-w-0 items-center gap-1.5 truncate">
          <Tag className="h-2.5 w-2.5 shrink-0 text-indigo-500" />
          <span className="truncate">{item.category}</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <User className="h-2.5 w-2.5 shrink-0 text-slate-400" />
          <span className="truncate">{item.mentor}</span>
        </div>
        <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 transition-transform", selected ? "translate-x-0.5 text-indigo-600" : "text-slate-300 group-hover:text-slate-500")} />
      </div>
    </button>
  );
}
