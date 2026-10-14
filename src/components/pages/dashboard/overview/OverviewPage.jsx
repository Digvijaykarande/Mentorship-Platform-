"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Award,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  ListTodo,
  MessageSquare,
  Sparkles,
  Star,
  Upload,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MiniStatCard from "@/components/common/MiniStatCard";
import SectionCard from "@/components/common/SectionCard";
import MetricBar from "@/components/common/MetricBar";

import {
  INTERNSHIP,
  TASKS as STATIC_TASKS,
  RECENT_ACTIVITY,
  OVERALL_PROGRESS as STATIC_OVERALL_PROGRESS,
  AVERAGE_RATING as STATIC_AVERAGE_RATING,
} from "@/components/pages/dashboard/progress/progressData";
import { mentor as fallbackMentor } from "@/components/pages/dashboard/my-projects/projectsData";
import { getWorkspace, subscribeToWorkspace } from "@/components/pages/dashboard/workspaceStore";
import { INITIAL_TASKS } from "@/components/pages/dashboard/tasks/taskData";
import { INITIAL_FEEDBACK } from "@/components/pages/dashboard/feedback/feedbackData";
import { INITIAL_SUBMISSIONS } from "@/components/pages/dashboard/submit-work/submissionData";

const USER_NAME = "Digvijay";

const ACTIVITY_ICON = {
  task: {
    icon: CheckCircle2,
    tone: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10",
  },
  project: {
    icon: FolderKanban,
    tone: "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-500/10",
  },
  achievement: {
    icon: Award,
    tone: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10",
  },
  feedback: {
    icon: MessageSquare,
    tone: "text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-500/10",
  },
  submission: {
    icon: Upload,
    tone: "text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-500/10",
  },
};

const TONE_CLASSES = {
  indigo:
    "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
  emerald:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  violet:
    "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
};

export default function OverviewPage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);

  useEffect(() => {
    const ws = getWorkspace(INITIAL_TASKS, INITIAL_FEEDBACK, INITIAL_SUBMISSIONS);
    if (ws.tasks) setTasks(ws.tasks);
    if (ws.feedback) setFeedback(ws.feedback);
    if (ws.submissions) setSubmissions(ws.submissions);
  }, []);

  useEffect(() => {
    return subscribeToWorkspace((ws) => {
      if (ws.tasks) setTasks(ws.tasks);
      if (ws.feedback) setFeedback(ws.feedback);
      if (ws.submissions) setSubmissions(ws.submissions);
    });
  }, []);

  const weeksLeft = INTERNSHIP.totalWeeks - INTERNSHIP.currentWeek;

  // Real-time task metrics
  const totalTasks = tasks.length || 1;
  const completedTasks = tasks.filter((t) => t.status === "Done").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In progress").length;
  const pendingTasks = tasks.filter((t) => t.status === "To do").length;
  const activeTasks = inProgressTasks + pendingTasks;
  const overdueTasks = tasks.filter((t) => t.overdue && t.status !== "Done").length;

  // Real-time overall progress calculation
  const allSubtasks = tasks.flatMap((t) => t.subtasks || []);
  const allApproved = allSubtasks.filter((s) => s.done && s.approved).length;
  const overallProgress = allSubtasks.length
    ? Math.round((allApproved / allSubtasks.length) * 100)
    : STATIC_OVERALL_PROGRESS;

  // Real-time average rating
  const avgRating = feedback.length
    ? (feedback.reduce((sum, f) => sum + (Number(f.rating) || 5), 0) / feedback.length).toFixed(1)
    : STATIC_AVERAGE_RATING;

  // Latest feedback
  const latestFeedback = feedback[0];
  const mentorName = latestFeedback?.mentor || fallbackMentor.name;
  const mentorQuote = latestFeedback?.comment || latestFeedback?.notes || fallbackMentor.feedback.quote;
  const mentorTime = latestFeedback?.date || fallbackMentor.feedback.timeAgo;

  const quickLinks = [
    {
      title: "Submit new work",
      description: "Share files or a link with your mentor",
      href: "/dashboard/submit-work",
      icon: Upload,
      tone: "indigo",
    },
    {
      title: "View my tasks",
      description: `${activeTasks} tasks need attention`,
      href: "/dashboard/tasks",
      icon: ListTodo,
      tone: "emerald",
    },
    {
      title: "Check my projects",
      description: "Track sprints and milestones",
      href: "/dashboard/my-projects",
      icon: FolderKanban,
      tone: "violet",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f7f8fc] px-4 py-5 font-sans text-slate-800 antialiased sm:px-6 lg:px-8 lg:py-7 dark:bg-background dark:text-slate-200">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-6">
        {/* Greeting banner */}
        <div className="relative overflow-hidden rounded-xl bg-[#101426] px-6 py-7 text-white shadow-[0_18px_55px_-24px_rgba(15,23,42,0.55)] sm:px-8 sm:py-9 lg:px-10">
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-120px] right-[28%] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium text-indigo-100">
                <Sparkles className="h-3 w-3" /> Week {INTERNSHIP.currentWeek} of {INTERNSHIP.totalWeeks}
              </span>
              <h1 className="mt-4 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Welcome back, {USER_NAME}.
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-[15px]">
                You&apos;re {overallProgress}% through your internship —{" "}
                {weeksLeft > 0
                  ? `${weeksLeft} weeks left until ${INTERNSHIP.endDate}.`
                  : "final week, finish strong!"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Next milestone
                </p>
                <p className="mt-1 text-sm font-medium text-slate-100">
                  {weeksLeft > 0
                    ? `${weeksLeft} weeks remaining`
                    : "Finish strong"}
                </p>
              </div>
              <Link href="/dashboard/submit-work">
                <Button
                  size="lg"
                  className="h-11 gap-2 rounded-xl bg-white text-slate-950 hover:bg-slate-100"
                >
                  <Upload className="h-4 w-4 text-slate-900" />
                  Submit new work
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* KPI row */}
        <section className="space-y-3">
          <div className="flex items-end justify-between gap-4 px-1">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-500">
                Your momentum
              </p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                A quick view of your internship
              </h2>
            </div>
            <span className="hidden text-xs text-slate-400 sm:block">
              Updated from your latest activity
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MiniStatCard
              icon={Activity}
              label="Overall progress"
              value={`${overallProgress}%`}
              tone="indigo"
              trend="+6%"
              trendLabel="vs. last week"
            />
            <MiniStatCard
              icon={ListTodo}
              label="Active tasks"
              value={activeTasks}
              tone="blue"
              trendLabel={overdueTasks > 0 ? `${overdueTasks} overdue` : "all on track"}
              trendDirection={overdueTasks > 0 ? "down" : "up"}
              trend={overdueTasks > 0 ? `${overdueTasks}` : undefined}
            />
            <MiniStatCard
              icon={CheckCircle2}
              label="Tasks completed"
              value={`${completedTasks}/${totalTasks}`}
              tone="emerald"
              trendLabel="on time rate high"
            />
            <MiniStatCard
              icon={Star}
              label="Avg. mentor rating"
              value={`${avgRating} / 5`}
              tone="amber"
              trendLabel="across all feedback"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
          {/* Recent activity */}
          <div className="xl:col-span-2">
            <SectionCard
              icon={ClipboardList}
              title="Recent activity"
              description="What's happened across your internship lately"
              iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
              action={
                <Link href="/dashboard/progress">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-xs"
                  >
                    View all
                  </Button>
                </Link>
              }
            >
              <div className="space-y-1 px-1">
                {RECENT_ACTIVITY.slice(0, 5).map((item) => {
                  const meta = ACTIVITY_ICON[item.type] ?? ACTIVITY_ICON.task;
                  const Icon = meta.icon;
                  return (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 rounded-2xl border border-transparent px-3 py-3 transition hover:border-slate-100 hover:bg-slate-50/80 dark:hover:border-slate-800 dark:hover:bg-slate-800/60"
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${meta.tone}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                          {item.title}
                        </p>
                        <p className="truncate text-xs text-slate-400 dark:text-slate-500">
                          {item.description}
                        </p>
                      </div>
                      <span className="shrink-0 text-[11px] text-slate-400 dark:text-slate-500">
                        {item.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          </div>

          {/* Mentor feedback + task breakdown */}
          <div className="flex flex-col gap-6">
            <SectionCard
              icon={MessageSquare}
              title="Latest mentor feedback"
              iconClassName="bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="bg-indigo-600 text-xs font-semibold text-white">
                    {mentorName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {mentorName}
                    </p>
                    <Badge variant="outline" className="text-[10px]">
                      {mentorTime}
                    </Badge>
                  </div>
                  <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    &ldquo;{mentorQuote}&rdquo;
                  </p>
                </div>
              </div>
              <Link href="/dashboard/feedback" className="mt-2 inline-block">
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-xs"
                >
                  Read all feedback
                </Button>
              </Link>
            </SectionCard>

            <SectionCard
              icon={CalendarClock}
              title="Task breakdown"
              iconClassName="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            >
              <div className="space-y-4">
                <MetricBar
                  label="Completed"
                  value={Math.round((completedTasks / totalTasks) * 100)}
                  display={`${completedTasks}`}
                  tone="emerald"
                />
                <MetricBar
                  label="In progress"
                  value={Math.round((inProgressTasks / totalTasks) * 100)}
                  display={`${inProgressTasks}`}
                  tone="indigo"
                />
                <MetricBar
                  label="Pending"
                  value={Math.round((pendingTasks / totalTasks) * 100)}
                  display={`${pendingTasks}`}
                  tone="amber"
                />
                {overdueTasks > 0 && (
                  <MetricBar
                    label="Overdue"
                    value={Math.round((overdueTasks / totalTasks) * 100)}
                    display={`${overdueTasks}`}
                    tone="rose"
                  />
                )}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickLinks.map(({ title, description, href, icon: Icon, tone }) => (
            <Link
              key={title}
              href={href}
              className="group flex items-start gap-3.5 rounded-[18px] border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/25"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${TONE_CLASSES[tone]}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {title}
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500 dark:text-slate-600 dark:group-hover:text-slate-400" />
                </p>
                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
