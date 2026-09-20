"use client";

import {
  Bug,
  CheckCircle2,
  Code2,
  GitPullRequest,
  MessageSquareText,
  Target,
  TrendingUp,
} from "lucide-react";

/**
 * Font: uses the project's default Tailwind sans stack — no custom
 * font-family import. Headings follow the shared convention:
 * text-base font-extrabold tracking-tight text-slate-900 dark:text-white
 */

const METRICS = [
  {
    label: "Tasks Completed",
    value: "42",
    detail: "of 48 assigned",
    icon: CheckCircle2,
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Code Submissions",
    value: "28",
    detail: "this internship",
    icon: Code2,
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Pull Requests",
    value: "19",
    detail: "15 merged",
    icon: GitPullRequest,
    iconBg: "bg-violet-50 dark:bg-violet-500/10",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    label: "Review Comments",
    value: "36",
    detail: "mentor feedback",
    icon: MessageSquareText,
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    label: "Bugs Resolved",
    value: "24",
    detail: "96% resolution rate",
    icon: Bug,
    iconBg: "bg-rose-50 dark:bg-rose-500/10",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    label: "Production Code",
    value: "4.8k",
    detail: "lines contributed",
    icon: Code2,
    iconBg: "bg-cyan-50 dark:bg-cyan-500/10",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
];

export default function TaskPerformance() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xs dark:bg-indigo-600 dark:text-white">
            <Target className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
              Code &amp; task metrics
            </h2>

            <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              Your internship work performance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />

          <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
            Strong
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {METRICS.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="group rounded-2xl border border-slate-100 bg-slate-50/40 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-slate-50/80 hover:shadow-xs dark:border-slate-800/80 dark:bg-slate-900/30 dark:hover:border-slate-700 dark:hover:bg-slate-900/60"
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${metric.iconBg} ${metric.iconColor}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <p className="mt-3 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                {metric.label}
              </p>

              <div className="mt-0.5 flex items-end gap-1.5">
                <span className="text-xl font-bold tracking-tight tabular-nums text-slate-900 dark:text-white">
                  {metric.value}
                </span>

                <span className="mb-0.5 text-[9px] font-medium text-slate-400 dark:text-slate-500">
                  {metric.detail}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quality Score */}
      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/40 p-4 dark:border-blue-950/40 dark:bg-blue-950/20">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                Work quality score
              </p>

              <span className="rounded-full bg-white px-2.5 py-0.5 text-[9px] font-bold text-blue-600 shadow-2xs dark:bg-slate-900 dark:text-blue-400">
                Excellent
              </span>
            </div>

            <p className="mt-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Based on code reviews, task quality, and mentor feedback.
            </p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold tabular-nums text-blue-700 dark:text-blue-400">
              92%
            </p>

            <p className="text-[9px] font-medium text-slate-400 dark:text-slate-500">
              quality score
            </p>
          </div>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-blue-100/80 dark:bg-blue-900/40">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700 dark:bg-blue-400"
            style={{ width: "92%" }}
          />
        </div>
      </div>

      {/* Check-in */}
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 dark:border-slate-800/80 dark:bg-slate-900/30">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <MessageSquareText className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-900 dark:text-white">
            Next mentor check-in
          </p>

          <p className="mt-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
            Scheduled for Friday · Review current sprint progress
          </p>
        </div>

        <div className="ml-auto shrink-0 rounded-full bg-violet-50 px-2.5 py-1 text-[9px] font-bold text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          Upcoming
        </div>
      </div>
    </div>
  );
}