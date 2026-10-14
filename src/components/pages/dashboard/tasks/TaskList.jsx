"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STATUS_STYLES, progressOf } from "./taskData";

function ProgressRing({ percent, done }) {
  const r = 17;
  const c = 2 * Math.PI * r;
  const value = Math.max(0, Math.min(100, Math.round(percent || 0)));
  const isComplete = value === 100;
  return (
    <div className="relative h-11 w-11 shrink-0">
      <svg viewBox="0 0 44 44" className="h-11 w-11 -rotate-90" aria-hidden>
        <circle cx="22" cy="22" r={r} fill="none" strokeWidth="3.5" className="stroke-muted" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          className={done || isComplete ? "stroke-emerald-500" : "stroke-primary"}
          style={{ transition: "stroke-dashoffset 500ms ease" }}
        />
      </svg>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center text-[10px] font-semibold tabular-nums",
          done ? "text-emerald-600" : "text-foreground",
        )}
      >
        {isComplete ? (
          <Check
            className="h-5 w-5 text-emerald-500"
            strokeWidth={3}
            aria-label="Completed"
          />
        ) : (
          `${value}%`
        )}
      </span>
    </div>
  );
}

export default function TaskList({
  tasks = [],
  selectedTaskId,
  onSelect = () => {},
}) {
  if (!tasks.length) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed text-sm text-muted-foreground">
        No projects found
      </div>
    );
  }

  return (
    <ul className="divide-y overflow-hidden rounded-2xl border bg-card">
      {tasks.map((task) => {
        const isDone = task.status === "Done";
        const isSelected = task.id === selectedTaskId;
        const { done, total, percent, current, review } = progressOf(task);
        return (
          <li key={task.id}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => onSelect(task.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(task.id);
                }
              }}
              className={cn(
                "flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors outline-none focus-visible:bg-muted",
                isSelected ? "bg-muted/70" : "hover:bg-muted/40",
              )}
            >
              <ProgressRing percent={percent} done={isDone} />

              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "truncate text-sm font-medium",
                    isDone && "text-muted-foreground",
                  )}
                >
                  {task.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {task.project}
                  <span className="mx-1.5">·</span>
                  {task.mentee}
                  <span className="mx-1.5">·</span>
                  <span className={cn(task.overdue && !isDone && "font-medium text-rose-600")}>
                    {task.due}
                  </span>
                </p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {isDone
                    ? "All steps complete"
                    : review
                      ? `Waiting for mentor: ${review.text}`
                      : current
                        ? `Now: ${current.text}`
                        : "No steps yet"}
                  {total > 0 && !isDone && (
                    <span className="ml-1.5 tabular-nums">
                      ({done}/{total})
                    </span>
                  )}
                </p>
              </div>

              <span
                className={cn(
                  "hidden shrink-0 rounded-full px-2.5 py-1 text-xs font-medium sm:inline-block",
                  STATUS_STYLES[task.status],
                )}
              >
                {task.status}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}