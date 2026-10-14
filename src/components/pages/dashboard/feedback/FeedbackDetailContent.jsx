"use client";

import { Calendar, CheckCircle2, Lightbulb, Plus, Sparkles, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeedbackStatusBadge from "./FeedbackStatusBadge";

const initials = (name = "") =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

function Fact({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <Icon className="h-3 w-3" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-0.5 truncate text-xs font-semibold text-slate-800 dark:text-slate-200">{value}</p>
    </div>
  );
}

function PointList({ icon: Icon, title, items, tone, onAddSuggestion, addedSuggestionIds = [] }) {
  if (!items?.length) return null;
  const styles =
    tone === "emerald"
      ? { box: "border-emerald-200/60 bg-emerald-50/50 dark:border-emerald-500/20 dark:bg-emerald-500/5", head: "text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" }
      : { box: "border-amber-200/60 bg-amber-50/50 dark:border-amber-500/20 dark:bg-amber-500/5", head: "text-amber-700 dark:text-amber-300", dot: "bg-amber-500" };

  return (
    <div className={`rounded-xl border p-4 ${styles.box}`}>
      <div className={`flex items-center gap-1.5 text-xs font-semibold ${styles.head}`}>
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {title}
      </div>
      <ul className="mt-2.5 space-y-2">
        {items.map((text, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${styles.dot}`} aria-hidden="true" />
            <span className="min-w-0 flex-1">{text}</span>
            {onAddSuggestion && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={addedSuggestionIds.includes(i)}
                onClick={() => onAddSuggestion(i)}
                className="h-7 shrink-0 gap-1 px-2 text-[10px] text-amber-700 hover:bg-amber-50 dark:text-amber-300"
              >
                <Plus className="h-3 w-3" aria-hidden="true" />
                {addedSuggestionIds.includes(i) ? "Added" : "Add to task"}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FeedbackDetailContent({ item, onStatusChange, onAddSuggestion }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">#{item.id}</span>
            <FeedbackStatusBadge status={item.status} />
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">{item.title}</h3>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/50">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
          <span className="text-[11px] font-semibold tabular-nums text-slate-900 dark:text-white">{item.rating}</span>
          <span className="text-[11px] text-slate-400">/ 5</span>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 p-3 dark:border-slate-800">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300" aria-hidden="true">
          {initials(item.mentor)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{item.mentor}</p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
        </div>
        <div className="ml-auto hidden sm:block">
          <Fact icon={Calendar} label="Reviewed" value={item.date} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Fact icon={Tag} label="Category" value={item.category} />
        <Fact icon={Sparkles} label="Project" value={item.project} />
        <div className="sm:hidden">
          <Fact icon={Calendar} label="Reviewed" value={item.date} />
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">Summary</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.summary}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <PointList icon={CheckCircle2} title="What went well" items={item.strengths} tone="emerald" />
        <PointList
          icon={Lightbulb}
          title="Suggested improvements"
          items={item.improvements}
          tone="amber"
          onAddSuggestion={item.taskId ? (index) => onAddSuggestion?.(item.id, index) : undefined}
          addedSuggestionIds={item.addedSuggestionIds}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="text-xs text-slate-400 dark:text-slate-500">Update status</span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={item.status === "Resolved"}
            onClick={() => onStatusChange(item.id, "Resolved")}
            className="h-8 gap-1.5 text-xs text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400"
          >
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            Mark resolved
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={item.status === "Action Required"}
            onClick={() => onStatusChange(item.id, "Action Required")}
            className="h-8 text-xs text-rose-700 hover:bg-rose-50 dark:text-rose-400"
          >
            Request action
          </Button>
        </div>
      </div>
    </div>
  );
}
