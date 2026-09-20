"use client";

import { useState } from "react";
import { BadgeCheck, CheckCircle2, Clock, BookOpen, ChevronRight, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ProjectProgress({ gauges }) {
  const [activeModal, setActiveModal] = useState(null);

  const completionPercent = gauges?.completionPercent ?? gauges?.testCoveragePercent ?? 75;
  const learningHours = gauges?.learningHours ?? gauges?.sprintVelocity ?? 18;
  const evaluationScore = gauges?.evaluationScore ?? gauges?.burndownChangePercent ?? 92;
  const dash = `${completionPercent}, 100`;

  return (
    <>
      <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
        <button
          type="button"
          onClick={() => setActiveModal("completion")}
          className="group flex flex-col items-center justify-center gap-1.5 rounded-lg p-2 text-center transition-all hover:bg-white/80 dark:hover:bg-slate-800/60"
        >
          <div className="relative flex h-14 w-14 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-200 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              <path className="text-emerald-500 transition-all duration-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={dash} strokeLinecap="round" strokeWidth="3" />
            </svg>
            <span className="absolute text-xs font-bold text-slate-900 dark:text-white">{completionPercent}%</span>
          </div>
          <span className="flex items-center gap-0.5 text-[11px] font-medium text-slate-500 group-hover:text-indigo-600 dark:text-slate-400">
            Modules Done <ChevronRight className="h-2.5 w-2.5" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveModal("hours")}
          className="group flex flex-col items-center justify-center gap-1.5 rounded-lg border-x border-slate-200 p-2 text-center transition-all hover:bg-white/80 dark:border-slate-800 dark:hover:bg-slate-800/60"
        >
          <div className="flex h-14 flex-col items-center justify-center">
            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{learningHours}h</span>
            <span className="font-mono text-[9px] uppercase text-slate-400">hrs / week</span>
          </div>
          <span className="flex items-center gap-0.5 text-[11px] font-medium text-slate-500 group-hover:text-indigo-600 dark:text-slate-400">
            Logged Hours <ChevronRight className="h-2.5 w-2.5" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveModal("evaluation")}
          className="group flex flex-col items-center justify-center gap-1.5 rounded-lg p-2 text-center transition-all hover:bg-white/80 dark:hover:bg-slate-800/60"
        >
          <div className="flex h-14 items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400">
            <BadgeCheck className="h-5 w-5" />
            <span className="text-base font-bold">+{evaluationScore}%</span>
          </div>
          <span className="flex items-center gap-0.5 text-[11px] font-medium text-slate-500 group-hover:text-indigo-600 dark:text-slate-400">
            Eval Score <ChevronRight className="h-2.5 w-2.5" />
          </span>
        </button>
      </div>

      <Dialog open={activeModal === "completion"} onOpenChange={(o) => !o && setActiveModal(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm font-bold">
              <BookOpen className="h-4.5 w-4.5 text-emerald-600" />
              Module Progress Breakdown
            </DialogTitle>
          </DialogHeader>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            You have finished <strong>{completionPercent}%</strong> of your assigned training modules and tasks.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-2.5 text-xs font-medium text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Core Curriculum</span>
              <span>Completed</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-indigo-50 p-2.5 text-xs font-medium text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-300">
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-indigo-600" /> Applied Project Phase</span>
              <span>In Progress</span>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => setActiveModal(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "hours"} onOpenChange={(o) => !o && setActiveModal(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm font-bold">
              <Clock className="h-4.5 w-4.5 text-indigo-600" />
              Internship Time Log
            </DialogTitle>
          </DialogHeader>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            You logged <strong>{learningHours} hours</strong> this week across development tasks, mentor syncs, and self-paced study.
          </p>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b border-slate-100 pb-1 text-slate-700 dark:border-slate-800 dark:text-slate-300">
              <span>Project Tasks & Code</span><span className="font-semibold text-slate-900 dark:text-white">12 hrs</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1 text-slate-700 dark:border-slate-800 dark:text-slate-300">
              <span>Mentor Sync & Code Review</span><span className="font-semibold text-slate-900 dark:text-white">3 hrs</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Module Learning</span><span className="font-semibold text-slate-900 dark:text-white">3 hrs</span>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => setActiveModal(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "evaluation"} onOpenChange={(o) => !o && setActiveModal(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm font-bold">
              <TrendingUp className="h-4.5 w-4.5 text-emerald-600" />
              Supervisor Evaluation Rating
            </DialogTitle>
          </DialogHeader>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Your current performance evaluation score stands at <strong className="text-emerald-600 dark:text-emerald-400">+{evaluationScore}%</strong> based on supervisor feedback and milestone adherence.
          </p>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">
            <BadgeCheck className="h-4.5 w-4.5 shrink-0" />
            <span>Exceeds requirements for current cohort sprint.</span>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => setActiveModal(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
