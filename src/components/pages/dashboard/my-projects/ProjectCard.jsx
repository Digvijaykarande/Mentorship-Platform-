"use client";

import { useState } from "react";
import { BookOpen, GraduationCap, Award, ChevronRight, Users, CheckCircle2 } from "lucide-react";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import ProjectStatusBadge, { getStatusStyle } from "./ProjectStatusBadge";
import ProjectDetailDialog from "./ProjectDetailDialog";

const ICON_MAP = { learning: BookOpen, capstone: GraduationCap, certificate: Award };

export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  const Icon = ICON_MAP[project.icon] ?? BookOpen;
  const status = getStatusStyle(project.statusLabel);
  const percent = parseInt(project.progressLabel, 10) || 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-3.5 rounded-xl border border-transparent p-3.5 text-left transition-colors hover:border-slate-200/80 hover:bg-slate-50/70 dark:hover:border-slate-800 dark:hover:bg-slate-800/40"
      >
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${status.badge}`}>
          <Icon className="h-4.5 w-4.5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">{project.name}</h3>
            <ProjectStatusBadge status={project.statusLabel} pulse={project.featured} />
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <Progress value={percent} className="w-24">
              <ProgressTrack className="h-1.5">
                <ProgressIndicator className={status.dot} />
              </ProgressTrack>
            </Progress>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{percent}%</span>
            {project.tasksTotal && (
              <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                <CheckCircle2 className="h-3 w-3" />
                {project.tasksCompleted || 0}/{project.tasksTotal}
              </span>
            )}
          </div>
        </div>

        <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 dark:text-slate-600" />
      </button>

      <ProjectDetailDialog project={project} open={open} onOpenChange={setOpen} />
    </>
  );
}
