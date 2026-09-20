"use client";

import { Calendar, CheckCircle2, Lightbulb, Sparkles, Star, Tag, ThumbsUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeedbackStatusBadge from "./FeedbackStatusBadge";

function MetaItem({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        <Icon className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
        {label}
      </div>
      <p className="mt-0.5 truncate text-xs font-bold text-slate-800 dark:text-slate-200">{value}</p>
    </div>
  );
}

export default function FeedbackDetailContent({ item, onStatusChange }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">#{item.id}</span>
            <FeedbackStatusBadge status={item.status} />
          </div>
          <h3 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">{item.title}</h3>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900/50">
          <span className="text-base font-black text-slate-900 dark:text-white">{item.rating}</span>
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <MetaItem icon={Tag} label="Category" value={item.category} />
        <MetaItem icon={User} label="Mentor" value={item.mentor} />
        <MetaItem icon={Calendar} label="Date" value={item.date} />
        <MetaItem icon={Sparkles} label="Project" value={item.project} />
      </div>

      <div className="rounded-xl border border-slate-200/70 bg-slate-50/50 p-4 dark:border-slate-800/70 dark:bg-slate-900/40">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          <ThumbsUp className="h-3.5 w-3.5 text-indigo-500" />
          Summary
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">{item.summary}</p>
      </div>

      {item.strengths?.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Strengths
          </div>
          <ul className="mt-2 space-y-1.5">
            {item.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.improvements?.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Lightbulb className="h-3.5 w-3.5" />
            Suggested Improvements
          </div>
          <ul className="mt-2 space-y-1.5">
            {item.improvements.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3.5 dark:border-slate-800">
        <span className="text-[10.5px] text-slate-400 dark:text-slate-500">Update status</span>
        <div className="flex items-center gap-1.5">
          <Button type="button" size="sm" variant="outline" onClick={() => onStatusChange(item.id, "Resolved")} className="h-7 gap-1 text-[11px] text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" />
            Mark Resolved
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => onStatusChange(item.id, "Action Required")} className="h-7 text-[11px] text-rose-700 hover:bg-rose-50 dark:text-rose-400">
            Request Action
          </Button>
        </div>
      </div>
    </div>
  );
}
