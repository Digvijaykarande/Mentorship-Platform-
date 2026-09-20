"use client";

import { BookMarked, ExternalLink, GraduationCap, CheckCircle2, FileText } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { activeProjectDetail } from "./projectsData";
import ProjectProgress from "./ProjectProgress";

export default function ProjectDetails() {
  const detail = activeProjectDetail;

  return (
    <SectionCard
      icon={FileText}
      title={detail.name}
      description={detail.eyebrow || "Internship Module Brief"}
      iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
      action={
        <div className="flex items-center gap-2">
          <Button type="button" variant="secondary" size="sm" className="gap-1.5">
            <BookMarked className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Brief</span>
          </Button>
          <Button type="button" size="sm" className="gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700">
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Submit</span>
          </Button>
        </div>
      }
      contentClassName="space-y-5 p-5"
    >
      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{detail.description}</p>

      <ProjectProgress gauges={detail.gauges} />

      <div className="flex flex-wrap items-center justify-between gap-1 border-t border-slate-100 pt-3 text-[10.5px] dark:border-slate-800">
        <span className="flex items-center gap-1 font-mono text-slate-600 dark:text-slate-400">
          <GraduationCap className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          Batch: <strong className="text-slate-800 dark:text-slate-200">{detail.cohort || "Cohort 2026-Q3"}</strong>
        </span>
        <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {detail.reviewStatus || "Approved by Mentor"}
        </span>
      </div>
    </SectionCard>
  );
}
