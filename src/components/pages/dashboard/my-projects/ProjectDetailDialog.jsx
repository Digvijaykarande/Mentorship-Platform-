"use client";

import { BookOpen, GraduationCap, Award, Clock, UserCheck, FileCheck2, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import ProjectStatusBadge, { getStatusStyle } from "./ProjectStatusBadge";

const ICON_MAP = { learning: BookOpen, capstone: GraduationCap, certificate: Award };

export default function ProjectDetailDialog({ project, open, onOpenChange }) {
  if (!project) return null;

  const Icon = ICON_MAP[project.icon] ?? BookOpen;
  const status = getStatusStyle(project.statusLabel);
  const percent = parseInt(project.progressLabel, 10) || 0;
  const isFeatured = Boolean(project.featured);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${status.badge}`}>
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-sm font-bold">{project.name}</DialogTitle>
              <DialogDescription className="text-[11px]">
                {isFeatured ? `Mentor: ${project.mentorName || "Assigned Mentor"}` : `Track: ${project.trackName || "Internship Project"}`}
              </DialogDescription>
            </div>
            <ProjectStatusBadge status={project.statusLabel} pulse={isFeatured} className="ml-auto" />
          </div>
        </DialogHeader>

        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {(project.tags || []).map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-md text-[11px] font-medium">
              {tag}
            </Badge>
          ))}
          {project.extraTagCount ? (
            <Badge variant="outline" className="rounded-md text-[11px] font-medium text-slate-400">
              +{project.extraTagCount} more
            </Badge>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span>{project.phaseLabel || "Progress"}</span>
            <span>{percent}%</span>
          </div>
          <Progress value={percent}>
            <ProgressTrack className="h-2">
              <ProgressIndicator className={status.dot} />
            </ProgressTrack>
          </Progress>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
          {project.dueLabel && (
            <span className="flex items-center gap-1.5 font-medium text-amber-600 dark:text-amber-400">
              <Clock className="h-3.5 w-3.5" />
              Due: {project.dueLabel}
            </span>
          )}
          {project.tasksTotal && (
            <span className="flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400">
              <FileCheck2 className="h-3.5 w-3.5" />
              {project.tasksCompleted || 0}/{project.tasksTotal} Tasks
            </span>
          )}
          {(project.approvalText || project.footerText) && (
            <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
              <UserCheck className="h-3.5 w-3.5" />
              {project.approvalText || project.footerText}
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
