"use client";

import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotificationRow({ notification, onToggleRead, onDelete }) {
  const { id, icon: Icon, title, description, time, unread } = notification;

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3.5 rounded-xl border p-3.5 transition-all duration-200",
        unread
          ? "border-blue-500/20 bg-blue-50/30 dark:border-blue-500/15 dark:bg-blue-950/20"
          : "border-transparent bg-slate-50/40 hover:border-slate-200/80 hover:bg-slate-100/50 dark:bg-slate-900/40 dark:hover:border-slate-800 dark:hover:bg-slate-800/40"
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
          unread
            ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20 dark:bg-blue-500"
            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p className={cn("text-xs font-semibold", unread ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300")}>
            {title}
          </p>
          {unread && <span className="flex h-2 w-2 rounded-full bg-blue-600 ring-2 ring-blue-600/20 dark:bg-blue-500" />}
        </div>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
        <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{time}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1 opacity-90 transition-opacity group-hover:opacity-100">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onToggleRead(id)}
          title={unread ? "Mark as read" : "Mark as unread"}
          className={cn(
            unread
              ? "text-blue-600 hover:bg-blue-100/70 dark:text-blue-400 dark:hover:bg-blue-900/40"
              : "text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          )}
        >
          <Check className="h-3.5 w-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onDelete(notification)}
          title="Delete"
          className="text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
