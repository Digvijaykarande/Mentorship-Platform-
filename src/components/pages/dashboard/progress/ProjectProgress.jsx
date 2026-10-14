"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronRight, CircleDot, FolderKanban, UserRound } from "lucide-react";
import { PROJECTS } from "./progressData";

const FILTERS = ["All", "In Progress", "Completed"];
const STATUS_STYLES = {
  "In Progress": "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300",
  "Under Review": "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  Planning: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  Completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
};
const BAR_STYLES = {
  Completed: "bg-emerald-500",
  "Under Review": "bg-amber-500",
  Planning: "bg-slate-400",
  "In Progress": "bg-indigo-500",
};

export default function ProjectProgress() {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => filter === "All" ? PROJECTS : PROJECTS.filter((project) => project.status === filter), [filter]);
  const average = Math.round(PROJECTS.reduce((sum, project) => sum + project.progress, 0) / PROJECTS.length);

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"><FolderKanban className="size-5" /></span>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Project command center</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">A focused view of everything on your plate</p>
          </div>
        </div>
        <button type="button" className="group inline-flex items-center gap-1 self-start text-xs font-semibold text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-300">View all <ChevronRight className="size-3.5 transition group-hover:translate-x-0.5" /></button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
        {FILTERS.map((item) => (
          <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${filter === item ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"}`}>{item}</button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {filtered.map((project) => (
          <article key={project.id} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-indigo-200 hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-indigo-500/40 dark:hover:bg-slate-950">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-500 shadow-sm dark:bg-slate-800"><CircleDot className="size-4" /></div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{project.name}</h3>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${STATUS_STYLES[project.status] || STATUS_STYLES.Planning}`}>{project.status}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-500 dark:text-slate-400">Completion</span><span className="font-semibold tabular-nums text-slate-800 dark:text-slate-200">{project.progress}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div className={`h-full rounded-full ${BAR_STYLES[project.status] || "bg-indigo-500"}`} style={{ width: `${project.progress}%` }} /></div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-emerald-500" />{project.progress === 100 ? "Complete" : "Active work"}</span>
                  <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-3.5" />Updated this week</span>
                  <span className="inline-flex items-center gap-1.5"><UserRound className="size-3.5" />Mentor review</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-indigo-50/70 px-4 py-3 dark:bg-indigo-500/10">
        <div><p className="text-xs font-semibold text-indigo-950 dark:text-indigo-100">Portfolio completion</p><p className="mt-0.5 text-[11px] text-indigo-700/70 dark:text-indigo-200/70">Average across {PROJECTS.length} projects</p></div>
        <span className="text-xl font-semibold tabular-nums text-indigo-700 dark:text-indigo-300">{average}%</span>
      </div>
    </section>
  );
}
