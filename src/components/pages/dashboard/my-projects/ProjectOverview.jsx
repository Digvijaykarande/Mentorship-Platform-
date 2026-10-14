"use client";

import { GraduationCap, CheckCircle2, FileText, GitFork } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";
import ProjectProgress from "./ProjectProgress";

const STATUS_STYLES = {
  Completed:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-500/10 dark:text-emerald-300",
  "Under Review":
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-500/10 dark:text-amber-300",
  Planning:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-500/10 dark:text-amber-300",
  "In Progress":
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-500/10 dark:text-blue-300",
  Blocked:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-500/10 dark:text-rose-300",
};

export default function ProjectOverview({ project }) {
  const status = project.statusLabel || "In Progress";
  const progress = project.progressPercent ?? project.progress ?? 0;
  const statusClass =
    STATUS_STYLES[status] ||
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300";

  return (
    <SectionCard
      icon={FileText}
      title={project.name}
      description={project.eyebrow || "Internship Module Brief"}
      iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
      action={
        <Badge
          className={`mr-6 gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusClass}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {status} · {progress}%
        </Badge>
      }
      contentClassName="space-y-2 p-2 sm:p-2"
    >
      <div className="flex flex-col gap-3">
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-[13px]">
          {project.description}
        </p>
        {(project.branch || project.tags?.length > 0) && (
          <div className="flex flex-wrap items-center gap-1.5">
            {project.branch && (
              <span className="mr-1 inline-flex items-center gap-1.5 rounded-md border border-slate-200/70 bg-slate-50 px-2 py-1 font-mono text-[10.5px] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <GitFork className="h-3 w-3 text-indigo-500" />
                {project.branch}
              </span>
            )}
            {(project.tags || []).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-md border border-slate-200/60 bg-slate-100/80 px-2 py-0.5 text-[10.5px] font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <ProjectProgress gauges={project.gauges} />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
        <span className="flex items-center gap-1.5 font-mono text-slate-600 dark:text-slate-400">
          <GraduationCap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          Batch:{" "}
          <strong className="text-slate-800 dark:text-slate-200">
            {project.cohort || "Cohort 2026-Q3"}
          </strong>
        </span>
        <span className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          {project.reviewStatus || "Approved by Mentor"}
        </span>
      </div>
    </SectionCard>
  );
}
