"use client";

import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Info,
} from "lucide-react";
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getStatusStyle } from "./ProjectStatusBadge";

const ICON_MAP = {
  learning: BookOpen,
  capstone: GraduationCap,
  certificate: Award,
};

export default function ProjectCard({
  project,
  compact = false,
  selected = false,
  onSelect,
}) {
  const Icon = ICON_MAP[project.icon] ?? BookOpen;
  const status = getStatusStyle(project.statusLabel);
  const percent = project.progressPercent ?? 0;
  const taskStats = project.tasks?.length
    ? {
        completed: project.tasks.filter((t) => t.completed).length,
        total: project.tasks.length,
      }
    : null;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group relative flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        selected
          ? "border-indigo-300 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-200 dark:border-indigo-700 dark:bg-indigo-950/40 dark:ring-indigo-800"
          : "border-slate-200/80 bg-white hover:border-indigo-200 hover:bg-indigo-50/20 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-indigo-800",
        compact && "gap-3 rounded-xl p-3",
      )}
    >
      <span className="group/status relative shrink-0">
        <span
          tabIndex={0}
          aria-label={`${project.name} status: ${project.statusLabel}`}
          className={cn(
            "flex items-center justify-center rounded-xl outline-none transition-transform duration-200 group-hover:scale-105 group-focus-visible/status:ring-2 group-focus-visible/status:ring-indigo-400 group-focus-visible/status:ring-offset-2",
            compact ? "h-9 w-9" : "h-11 w-11",
            status.icon,
          )}
        >
          <Icon className={compact ? "h-4 w-4" : "h-5 w-5"} />
        </span>
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 w-max max-w-[190px] -translate-x-1/2 translate-y-1 rounded-lg bg-slate-950 px-2.5 py-1.5 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-all duration-150 group-hover/status:translate-y-0 group-hover/status:opacity-100 group-focus-within/status:translate-y-0 group-focus-within/status:opacity-100 dark:bg-white dark:text-slate-900"
        >
          <span className="flex items-center gap-1.5">
            <Info className="h-3 w-3 shrink-0 opacity-70" />
            {project.statusLabel}
          </span>
          <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-950 dark:bg-white" />
        </span>
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-1.5">
          <h3
            className={cn(
              "truncate font-semibold text-slate-900 dark:text-white",
              compact ? "text-xs" : "text-sm",
              selected && "font-bold text-indigo-950 dark:text-indigo-200",
            )}
          >
            {project.name}
          </h3>
        </div>
        {!compact && (
          <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
            {project.repoPath}
          </p>
        )}
        <div className="mt-2.5 flex items-center gap-2">
          <Progress
            value={percent}
            className={compact ? "w-20 sm:w-24" : "w-32"}
          >
            <ProgressTrack className="h-1.5 bg-slate-100 dark:bg-slate-800">
              <ProgressIndicator className={status.dot} />
            </ProgressTrack>
          </Progress>
          <span className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300">
            {percent}%
          </span>
          {taskStats && !compact && (
            <span className="ml-auto flex items-center gap-1 text-[10.5px] font-medium text-slate-400">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              {taskStats.completed}/{taskStats.total} Tasks
            </span>
          )}
        </div>
      </div>
      {!compact && (
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5",
            selected && "text-indigo-600 dark:text-indigo-400",
          )}
        />
      )}
    </button>
  );
}
