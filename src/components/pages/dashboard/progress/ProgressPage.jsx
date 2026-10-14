"use client";

import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ProgressOverTime from "./ProgressOverTime";
import OverallProgress from "./OverallProgress";
import ProgressSummary from "./ProgressSummary";
import Achievements from "./Achievements";
import ProjectProgress from "./ProjectProgress";
import {
  FEEDBACK,
  INTERNSHIP,
  OVERALL_PROGRESS,
  RECENT_ACTIVITY,
  EXPECTED_PROGRESS,
} from "./progressData";

const ACTIVITY_ICONS = {
  task: CheckCircle2,
  project: TrendingUp,
  achievement: Award,
  feedback: MessageCircle,
  submission: Target,
};

const ACTIVITY_TONES = {
  task: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  project:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  achievement:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  feedback: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  submission:
    "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
};

export default function ProgressPage() {
  const onTrack = OVERALL_PROGRESS >= EXPECTED_PROGRESS;

  return (
    <main className="min-h-full bg-[#f6f8fc] dark:bg-slate-950">
      <div className="mx-auto max-w-[1500px] space-y-5 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <section className="relative overflow-hidden rounded-xl bg-slate-950 px-6 py-7 text-white shadow-xl shadow-indigo-950/10 sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-indigo-100 backdrop-blur">
                <Sparkles className="size-3.5 text-cyan-300" />
                Week {INTERNSHIP.currentWeek} of {INTERNSHIP.totalWeeks}
              </div>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Your progress, at a glance.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Keep your momentum visible, celebrate the wins, and know exactly
                where to focus next.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="size-3.5" />
                  {INTERNSHIP.totalWeeks - INTERNSHIP.currentWeek} weeks
                  remaining
                </span>
                <span className="size-1 rounded-full bg-slate-600" />
                <span>Internship ends {INTERNSHIP.endDate}, 2026</span>
              </div>
            </div>
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Current momentum
                  </p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight">
                    {OVERALL_PROGRESS}%
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                  <TrendingUp className="size-3" />
                  {onTrack ? "On track" : "Needs focus"}
                </span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-indigo-400"
                  style={{ width: `${OVERALL_PROGRESS}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-slate-400">
                Target pace: {EXPECTED_PROGRESS}% by now
              </p>
            </div>
          </div>
        </section>

        <ProgressSummary />

        <section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(330px,0.8fr)]">
          <ProgressOverTime />
          <OverallProgress />
        </section>

        <section className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(330px,0.8fr)]">
          <div className="flex min-w-0 flex-col gap-5">
            <ProjectProgress />
            <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Recent activity
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Your latest movement across the programme
                  </p>
                </div>
                <ArrowUpRight className="size-4 text-slate-400" />
              </div>
              <div className="mt-5 space-y-4">
                {RECENT_ACTIVITY.slice(0, 4).map((item, index) => {
                  const Icon = ACTIVITY_ICONS[item.type] ?? CheckCircle2;
                  return (
                    <div key={item.id} className="relative flex gap-3">
                      {index < 3 && (
                        <span className="absolute left-[15px] top-8 h-7 w-px bg-slate-200 dark:bg-slate-800" />
                      )}
                      <span
                        className={cn(
                          "relative flex size-8 shrink-0 items-center justify-center rounded-xl",
                          ACTIVITY_TONES[item.type],
                        )}
                      >
                        <Icon className="size-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold leading-5 text-slate-800 dark:text-slate-200">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
                          {item.time} · {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
                      <MessageCircle className="size-4" />
                    </span>
                    Mentor feedback
                  </div>
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                    Latest review · {FEEDBACK.date}
                  </p>
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {FEEDBACK.trend}
                </Badge>
              </div>
              <blockquote className="mt-5 border-l-2 border-indigo-300 pl-4 text-sm leading-6 text-slate-600 dark:border-indigo-500/50 dark:text-slate-300">
                “{FEEDBACK.quote}”
              </blockquote>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {FEEDBACK.mentor}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {FEEDBACK.mentorRole}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {FEEDBACK.ratings[0].value}/5
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    average rating
                  </p>
                </div>
              </div>
            </section>
            <Achievements />
          </div>
        </section>
      </div>
    </main>
  );
}
