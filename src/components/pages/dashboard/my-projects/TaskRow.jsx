"use client";

import { MoreVertical, CheckCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const BADGE_TONE = {
  error: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  "primary-fixed": "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
  neutral: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
  secondary: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
};

const AVATAR_TONE = {
  primary: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
  tertiary: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
  neutral: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export default function TaskRow({ task, isChecked, onToggle, onDelete }) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 rounded-xl p-3.5 transition-all sm:items-center",
        isChecked ? "bg-slate-50/70 opacity-60 dark:bg-slate-900/40" : "bg-slate-50 hover:bg-slate-100/80 dark:bg-slate-900/40 dark:hover:bg-slate-800/60"
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onToggle(task.id)}
          className={cn("mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded sm:mt-0", isChecked ? "accent-emerald-500" : "accent-indigo-600")}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
          <span className={cn("truncate text-xs", isChecked ? "text-slate-400 line-through dark:text-slate-500" : "font-medium text-slate-800 dark:text-slate-200")}>
            {task.title}
          </span>
          <Badge className={cn("w-fit rounded-md text-[11px] font-semibold hover:bg-inherit", BADGE_TONE[task.badgeTone] ?? BADGE_TONE.neutral)}>
            {task.badgeLabel}
          </Badge>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {isChecked ? (
          <>
            <span className="text-[10.5px] font-medium text-emerald-600 dark:text-emerald-400">{task.completedLabel || "Verified"}</span>
            <CheckCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </>
        ) : (
          <>
            <span className={cn("hidden font-mono text-[10.5px] sm:inline", task.dueTone === "error" ? "font-semibold text-red-500" : "text-slate-400 dark:text-slate-500")}>
              {task.dueLabel}
            </span>
            <Avatar className="h-7 w-7" title="Assigned intern">
              <AvatarFallback className={cn("text-[10.5px] font-bold", AVATAR_TONE[task.assignee?.tone] ?? AVATAR_TONE.neutral)}>
                {task.assignee?.initials || "IN"}
              </AvatarFallback>
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button type="button" variant="ghost" size="icon-sm" className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                    <MoreVertical className="h-3.5 w-3.5" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem onClick={() => onToggle(task.id)} className="cursor-pointer text-xs">
                  Mark Complete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(task.id)} className="cursor-pointer text-xs text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30">
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
}
