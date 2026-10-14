"use client";

import { AlertCircle, Calendar, Clock3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function TaskDeadline({ task, onRequestExtension = () => {} }) {
  if (!task) return null;
  const [done, total] = (task.subtasks || "0 / 0")
    .split("/")
    .map((n) => Number.parseInt(n, 10) || 0);
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const isOverdue = task.dueType === "error";
  const isWarning = task.dueType === "warning";
  return (
    <section
      className={`rounded-[18px] border p-5 shadow-sm ${isOverdue ? "border-rose-200 bg-rose-50/60" : isWarning ? "border-amber-200 bg-amber-50/50" : "border-slate-200/80 bg-white"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Delivery health
          </p>
          <h3 className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-950">
            <Calendar className="h-4 w-4 text-slate-500" />
            {task.due}
          </h3>
        </div>
        <Badge
          variant={isOverdue ? "destructive" : "outline"}
          className="rounded-full text-[11px] font-medium"
        >
          {done}/{total} subtasks
        </Badge>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Progress value={percent} className="h-2 flex-1" />
        <span className="text-xs font-semibold text-slate-600">{percent}%</span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span
          className={`flex items-center gap-1.5 text-xs ${isOverdue ? "font-semibold text-rose-600" : isWarning ? "font-medium text-amber-700" : "text-slate-500"}`}
        >
          {isOverdue ? (
            <AlertCircle className="h-3.5 w-3.5" />
          ) : (
            <Clock3 className="h-3.5 w-3.5" />
          )}
          {isOverdue
            ? "Overdue — needs attention"
            : isWarning
              ? "Due soon — check in"
              : "On track"}
        </span>
        <Button
          type="button"
          variant="link"
          size="sm"
          className="h-auto p-0 text-xs"
          onClick={onRequestExtension}
        >
          Request extension
        </Button>
      </div>
    </section>
  );
}
