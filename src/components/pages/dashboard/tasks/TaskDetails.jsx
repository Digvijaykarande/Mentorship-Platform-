"use client";

import Link from "next/link";
import { Check, CheckCircle2, Clock3, Lock, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { STATUS_STYLES, initialsOf, progressOf } from "./taskData";

export default function TaskDetails({ task }) {
  if (!task) return null;

  const steps = task.subtasks || [];
  const { done, total, percent, states } = progressOf(task);
  const isDone = task.status === "Done";

  return (
    <section className="rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "inline-block rounded-full px-2.5 py-1 text-xs font-medium",
            STATUS_STYLES[task.status],
          )}
        >
          {task.status}
        </span>
        <span className="truncate text-xs text-muted-foreground">{task.project}</span>
      </div>

      <h2 className="mt-3 text-lg font-semibold leading-snug">{task.title}</h2>

      <div className="mt-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {initialsOf(task.mentee)}
        </div>
        <div className="text-sm">
          <p className="font-medium leading-none">{task.mentee}</p>
          <p
            className={cn(
              "mt-1 text-xs text-muted-foreground",
              task.overdue && !isDone && "font-medium text-rose-600",
            )}
          >
            {task.due}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Your path</span>
          <span className="tabular-nums">
            {done} of {total} complete
          </span>
        </div>
        <Progress value={percent} className="h-2" />
      </div>

      {isDone && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700 animate-in fade-in dark:bg-emerald-500/10 dark:text-emerald-300">
          <CheckCircle2 className="h-4 w-4" />
          Every step is complete.
        </div>
      )}

      <ol className="mt-5">
        {steps.map((s, i) => {
          const state = states[i];
          const isLast = i === steps.length - 1;
          // Work for a step is handed in on the Submit work page.
          const needsRevision = Boolean(s.changesRequested && s.submissionId);
          const submitHref = needsRevision
            ? `/dashboard/submit-work?submission=${s.submissionId}&action=revise`
            : `/dashboard/submit-work?task=${task.id}&step=${s.id}`;

          return (
            <li
              key={s.id}
              aria-current={state === "current" ? "step" : undefined}
              className="relative pb-2 pl-10 last:pb-0"
            >
              {!isLast && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[13px] top-8 bottom-0 w-0.5 rounded-full transition-colors duration-500",
                    state === "done" ? "bg-emerald-500" : "bg-border",
                  )}
                />
              )}

              <span
                className={cn(
                  "absolute left-0 top-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all duration-500",
                  state === "done" && "bg-emerald-500 text-white",
                  state === "review" && "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
                  state === "current" && "bg-primary text-primary-foreground ring-4 ring-primary/15",
                  state === "locked" && "border bg-muted text-muted-foreground",
                )}
              >
                {state === "done" ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                ) : state === "review" ? (
                  <Clock3 className="h-3.5 w-3.5" />
                ) : state === "locked" ? (
                  <Lock className="h-3 w-3" />
                ) : (
                  i + 1
                )}
              </span>

              {state === "current" ? (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-3.5 animate-in fade-in slide-in-from-top-1 duration-300">
                  <p className="text-xs font-medium text-primary">Current step</p>
                  <p className="mt-1 text-sm font-medium">{s.text}</p>
                  {s.changesRequested && (
                    <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                      Mentor requested changes{s.reviewNote ? `: ${s.reviewNote}` : "."}
                    </p>
                  )}
                  <Link href={submitHref} className="inline-block mt-3">
                    <Button
                      size="sm"
                      className="h-8 gap-1.5"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      {needsRevision ? "Revise & resubmit" : "Submit work"}
                    </Button>
                  </Link>
                </div>
              ) : state === "review" ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 animate-in fade-in dark:border-amber-500/20 dark:bg-amber-500/5">
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
                    Waiting for your mentor
                  </p>
                  <p className="mt-1 text-sm font-medium">{s.text}</p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    The next step unlocks once your mentor approves this one.
                  </p>
                  {s.submissionId && (
                    <Link
                      href={`/dashboard/submit-work?submission=${s.submissionId}`}
                      className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
                    >
                      View submission
                    </Link>
                  )}
                </div>
              ) : (
                <div
                  className="flex min-h-[44px] items-center py-2"
                  title={state === "locked" ? "Unlocks after your mentor approves the previous step" : undefined}
                >
                  <p
                    className={cn(
                      "text-sm",
                      state === "done" && "text-muted-foreground line-through",
                      state === "locked" && "text-muted-foreground/70",
                    )}
                  >
                    {s.text}
                  </p>
                </div>
              )}
            </li>
          );
        })}

        {!steps.length && (
          <li className="rounded-xl border border-dashed px-3 py-4 text-sm text-muted-foreground">
            Your mentor hasn't added steps yet.
          </li>
        )}
      </ol>
    </section>
  );
}
