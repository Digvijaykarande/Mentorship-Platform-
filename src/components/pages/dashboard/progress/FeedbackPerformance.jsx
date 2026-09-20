"use client";

import {
  CheckCircle2,
  MessageSquareText,
  Star,
  Target,
  TrendingUp,
  UserRound,
} from "lucide-react";

/**
 * Font: uses the project's default Tailwind sans stack — no custom
 * font-family import. Headings follow the shared convention:
 * text-base font-extrabold tracking-tight text-slate-900 dark:text-white
 */

const STRENGTHS = [
  "Strong problem-solving ability",
  "Consistent task delivery",
  "Good code quality",
];

const FOCUS_AREAS = [
  "Improve backend architecture",
  "Write more automated tests",
];

const RATINGS = [
  ["Technical Skills", "4.9"],
  ["Code Quality", "4.8"],
  ["Communication", "4.7"],
  ["Ownership", "4.8"],
];

export default function FeedbackPerformance() {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
      {/* Header */}
      <div className="border-b border-slate-100 px-6 py-5 dark:border-slate-800/80">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white shadow-md shadow-violet-200 dark:shadow-none">
              <MessageSquareText className="h-5 w-5" />

              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950" />
              </span>
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                Mentor feedback
              </h2>

              <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                Latest feedback from your mentor
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 shadow-xs dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />

            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
              Excellent
            </span>
          </div>
        </div>
      </div>

      {/* Mentor Profile */}
      <div className="mx-5 mt-5 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900">
            <UserRound className="h-5 w-5" />

            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Rahul Patil
            </p>

            <p className="mt-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Senior Mentor · Full-Stack Engineering
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200/80 bg-white/90 px-3 py-2 text-right shadow-xs dark:border-amber-500/20 dark:bg-slate-950">
            <div className="flex items-center justify-end gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />

              <span className="text-lg font-extrabold tabular-nums text-slate-900 dark:text-white">
                4.8
              </span>

              <span className="text-[9px] font-medium text-slate-400">
                / 5
              </span>
            </div>

            <p className="text-[9px] font-medium text-slate-400 dark:text-slate-500">
              Sep 05, 2026
            </p>
          </div>
        </div>
      </div>

      {/* Feedback Quote */}
      <div className="mx-5 mt-4 overflow-hidden rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50/80 via-indigo-50/30 to-white shadow-xs dark:border-violet-500/20 dark:from-violet-500/10 dark:via-indigo-500/5 dark:to-slate-950">
        <div className="relative p-4">
          <div className="absolute right-4 top-2 select-none text-5xl font-extrabold leading-none text-violet-200/60 dark:text-violet-500/10">
            ”
          </div>

          <div className="relative flex gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
              <MessageSquareText className="h-3.5 w-3.5" />
            </div>

            <p className="pt-0.5 text-xs font-medium leading-5 text-slate-600 dark:text-slate-300">
              “You have shown strong consistency throughout the internship.
              Your ability to understand requirements and turn them into clean
              working solutions has improved significantly.”
            </p>
          </div>
        </div>
      </div>

      {/* Feedback Areas */}
      <div className="mx-5 mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Strengths */}
        <div className="group/card rounded-2xl border border-emerald-200/70 bg-emerald-50/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-emerald-500/20 dark:bg-emerald-500/5 dark:hover:border-emerald-500/30 dark:hover:shadow-none">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover/card:scale-110 dark:bg-emerald-500/20 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>

            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              Key strengths
            </p>
          </div>

          <div className="space-y-2">
            {STRENGTHS.map((strength) => (
              <div
                key={strength}
                className="flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 shadow-2xs dark:bg-slate-900/60"
              >
                <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />

                <p className="text-[10px] font-medium leading-4 text-slate-600 dark:text-slate-300">
                  {strength}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Focus Areas */}
        <div className="group/card rounded-2xl border border-blue-200/70 bg-blue-50/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 dark:border-blue-500/20 dark:bg-blue-500/5 dark:hover:border-blue-500/30 dark:hover:shadow-none">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 transition-transform duration-300 group-hover/card:scale-110 dark:bg-blue-500/20 dark:text-blue-400">
              <Target className="h-3.5 w-3.5" />
            </div>

            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              Next focus
            </p>
          </div>

          <div className="space-y-2">
            {FOCUS_AREAS.map((focus) => (
              <div
                key={focus}
                className="flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 shadow-2xs dark:bg-slate-900/60"
              >
                <Target className="h-3 w-3 shrink-0 text-blue-500" />

                <p className="text-[10px] font-medium leading-4 text-slate-600 dark:text-slate-300">
                  {focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="mx-5 mt-5 border-t border-slate-100 pt-5 dark:border-slate-800/80">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-900 dark:text-white">
            Evaluation breakdown
          </p>

          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[9px] font-medium text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
            Latest review
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {RATINGS.map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-3.5 transition-all duration-300 hover:border-slate-300 hover:bg-white hover:shadow-md hover:shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:shadow-none"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[9px] font-medium text-slate-400 dark:text-slate-500">
                  {label}
                </p>

                <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />
              </div>

              <div className="mt-1 flex items-end gap-1">
                <span className="text-base font-extrabold tabular-nums text-slate-900 dark:text-white">
                  {value}
                </span>

                <span className="mb-0.5 text-[9px] font-medium text-slate-400">
                  / 5
                </span>
              </div>

              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-amber-400 shadow-xs transition-all duration-700"
                  style={{
                    width: `${(Number(value) / 5) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Status */}
      <div className="mx-5 mb-5 mt-4 overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-transparent p-3.5 shadow-xs dark:border-emerald-500/20 dark:from-emerald-500/10 dark:via-teal-500/5 dark:to-transparent">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-xs">
            <CheckCircle2 className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              Positive internship trajectory
            </p>

            <p className="mt-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Your latest review shows steady improvement across technical and
              professional skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}