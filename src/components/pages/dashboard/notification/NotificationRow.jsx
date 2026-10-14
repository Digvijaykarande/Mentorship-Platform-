"use client";

import { Archive, Check, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACCENT_STYLES = {
  blue: { rail: "bg-blue-500", icon: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300" },
  violet: { rail: "bg-violet-500", icon: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300" },
  amber: { rail: "bg-amber-500", icon: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300" },
  emerald: { rail: "bg-emerald-500", icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" },
  rose: { rail: "bg-rose-500", icon: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300" },
};

export default function NotificationRow({ notification, onToggleRead, onDelete }) {
  const { id, icon: Icon, title, description, time, unread, accent = "blue", category, actionLabel } = notification;
  const styles = ACCENT_STYLES[accent] || ACCENT_STYLES.blue;

  return (
    <article className={cn("group relative overflow-hidden rounded-2xl border transition-all duration-200", unread ? "border-indigo-200/80 bg-indigo-50/45 shadow-sm shadow-indigo-100/50 dark:border-indigo-500/20 dark:bg-indigo-950/20 dark:shadow-none" : "border-slate-100 bg-slate-50/55 hover:border-slate-200 hover:bg-white dark:border-slate-800/80 dark:bg-slate-900/35 dark:hover:border-slate-700 dark:hover:bg-slate-900/70")}>
      <span className={cn("absolute inset-y-0 left-0 w-1", unread ? styles.rail : "bg-slate-200 dark:bg-slate-700")} aria-hidden="true" />
      <div className="flex items-start gap-3 p-3.5 pl-5 sm:gap-4 sm:p-4 sm:pl-6">
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", unread ? styles.icon : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400")}><Icon className="h-[18px] w-[18px]" aria-hidden="true" /></div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1"><p className={cn("text-sm leading-snug", unread ? "font-bold text-slate-950 dark:text-white" : "font-semibold text-slate-700 dark:text-slate-200")}>{title}</p>{unread && <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 ring-4 ring-indigo-600/10 dark:bg-indigo-400" aria-label="Unread" />}</div>
          <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2"><span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{time}</span>{category && <><span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" /><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">{category}</span></>}{actionLabel && <span className="hidden rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-300 sm:inline">{actionLabel}</span>}</div>
        </div>
        <div className="flex shrink-0 items-center gap-0.5 opacity-100 sm:opacity-70 sm:transition-opacity sm:group-hover:opacity-100">
          <Button type="button" variant="ghost" size="icon-sm" onClick={() => onToggleRead(id)} title={unread ? "Mark as read" : "Mark as unread"} aria-label={unread ? "Mark as read" : "Mark as unread"} className={cn("h-8 w-8", unread ? "text-indigo-600 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/50" : "text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200")}>{unread ? <Check className="h-4 w-4" /> : <Archive className="h-4 w-4" />}</Button>
          <Button type="button" variant="ghost" size="icon-sm" onClick={() => onDelete(notification)} title="Delete notification" aria-label="Delete notification" className="h-8 w-8 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"><Trash2 className="h-4 w-4" /></Button>
          <MoreHorizontal className="ml-1 hidden h-4 w-4 text-slate-300 dark:text-slate-700 sm:block" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
