"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  FolderKanban,
  MoreHorizontal,
  UserRound,
} from "lucide-react";

/**
 * Font: uses the project's default Tailwind sans stack — no custom
 * font-family import. Headings follow the shared convention:
 * text-base font-extrabold tracking-tight text-slate-900 dark:text-white
 */

const PROJECTS = [
  {
    id: "proj-1",
    name: "Internship Dashboard",
    description: "Build and improve the intern learning dashboard",
    progress: 86,
    status: "In Progress",
    statusClass:
      "bg-blue-50/80 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20",
    iconClass:
      "bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-200 dark:shadow-none",
    dueDate: "Sep 12, 2026",
    tasks: "18 / 21 tasks",
    mentor: "Rahul Patil",
  },
  {
    id: "proj-2",
    name: "Task Management Module",
    description: "Develop task tracking, filtering and details",
    progress: 75,
    status: "In Progress",
    statusClass:
      "bg-violet-50/80 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400 border border-violet-200/60 dark:border-violet-500/20",
    iconClass:
      "bg-gradient-to-tr from-violet-600 to-indigo-500 text-white shadow-md shadow-violet-200 dark:shadow-none",
    dueDate: "Sep 08, 2026",
    tasks: "15 / 20 tasks",
    mentor: "Ananya Sharma",
  },
  {
    id: "proj-3",
    name: "Authentication Module",
    description: "Implement secure login and registration screens",
    progress: 100,
    status: "Completed",
    statusClass:
      "bg-emerald-50/80 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20",
    iconClass:
      "bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-200 dark:shadow-none",
    dueDate: "Sep 02, 2026",
    tasks: "12 / 12 tasks",
    mentor: "Rahul Patil",
  },
];

export default function ProjectProgress() {
  const [activeFilter, setActiveFilter] = useState("All");

  const totalProjects = PROJECTS.length;
  const inProgressProjects = useMemo(
    () => PROJECTS.filter((p) => p.status === "In Progress").length,
    []
  );
  const completedProjects = useMemo(
    () => PROJECTS.filter((p) => p.status === "Completed").length,
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "In Progress")
      return PROJECTS.filter((p) => p.status === "In Progress");
    if (activeFilter === "Completed")
      return PROJECTS.filter((p) => p.status === "Completed");
    return PROJECTS;
  }, [activeFilter]);

  const averageProgress = useMemo(
    () =>
      Math.round(
        PROJECTS.reduce((acc, curr) => acc + curr.progress, 0) / totalProjects
      ),
    [totalProjects]
  );

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-200 dark:shadow-none">
            <FolderKanban className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
              Project Progress
            </h2>
            <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              Track your internship projects and assigned work
            </p>
          </div>
        </div>

        <button
          type="button"
          className="group flex w-fit items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          View all
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="space-y-5 p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setActiveFilter("All")}
            className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
              activeFilter === "All"
                ? "border-slate-300 bg-slate-100/90 shadow-xs dark:border-slate-700 dark:bg-slate-800/60"
                : "border-slate-200/70 bg-slate-50/60 hover:border-slate-300 hover:bg-white hover:shadow-xs dark:border-slate-800 dark:bg-slate-900/40 dark:hover:bg-slate-900"
            }`}
          >
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Total
            </p>
            <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white">
              {totalProjects}
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("In Progress")}
            className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
              activeFilter === "In Progress"
                ? "border-blue-300 bg-blue-50/90 shadow-xs dark:border-blue-500/40 dark:bg-blue-500/10"
                : "border-slate-200/70 bg-slate-50/60 hover:border-slate-300 hover:bg-white hover:shadow-xs dark:border-slate-800 dark:bg-slate-900/40 dark:hover:bg-slate-900"
            }`}
          >
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              In progress
            </p>
            <p className="mt-1 text-2xl font-extrabold tabular-nums text-blue-600 dark:text-blue-400">
              {inProgressProjects}
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("Completed")}
            className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
              activeFilter === "Completed"
                ? "border-emerald-300 bg-emerald-50/90 shadow-xs dark:border-emerald-500/40 dark:bg-emerald-500/10"
                : "border-slate-200/70 bg-slate-50/60 hover:border-slate-300 hover:bg-white hover:shadow-xs dark:border-slate-800 dark:bg-slate-900/40 dark:hover:bg-slate-900"
            }`}
          >
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Completed
            </p>
            <p className="mt-1 text-2xl font-extrabold tabular-nums text-emerald-600 dark:text-emerald-400">
              {completedProjects}
            </p>
          </button>
        </div>

        {/* Project List */}
        <div className="space-y-3">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200/80 py-10 text-center dark:border-slate-800">
              <Filter className="h-6 w-6 text-slate-300 dark:text-slate-600" />
              <p className="mt-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
                No projects match the selected filter.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-200/80 p-4 dark:border-slate-800/80">
          <div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              Overall completion rate
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Average across all active modules
            </p>
          </div>

          <span className="text-lg font-extrabold tabular-nums text-blue-600 dark:text-blue-400">
            {averageProgress}%
          </span>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="group rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:shadow-none">
      <div className="flex items-start gap-3.5">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${project.iconClass}`}
        >
          <FolderKanban className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {project.name}
                </h3>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${project.statusClass}`}
                >
                  {project.status}
                </span>
              </div>

              <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                {project.description}
              </p>
            </div>

            <button
              type="button"
              aria-label="More options"
              className="shrink-0 rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Progress
              </span>
              <span className="font-extrabold tabular-nums text-slate-900 dark:text-white">
                {project.progress}%
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  project.progress === 100 ? "bg-emerald-500" : "bg-blue-500"
                }`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-200/60 pt-3 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5">
              {project.progress === 100 ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Clock3 className="h-3.5 w-3.5 text-slate-400" />
              )}
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {project.tasks}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Due {project.dueDate}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <UserRound className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {project.mentor}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}