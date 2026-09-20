"use client";

import Link from "next/link";
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FolderKanban,
  MessageSquareText,
  Send,
} from "lucide-react";

import SectionCard from "@/components/common/SectionCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RECENT_ACTIVITY } from "./progressData";

const TYPES = {
  task: { icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" },
  project: { icon: FolderKanban, tone: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" },
  achievement: { icon: Award, tone: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" },
  feedback: { icon: MessageSquareText, tone: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400" },
  submission: { icon: Send, tone: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" },
};

// Short timeline. The old version had its own filter dropdown and a second copy
// of the overall-progress bar; both were removed. Full history lives in Notifications.
export default function RecentActivity() {
  return (
    <SectionCard
      icon={Clock3}
      iconClassName="bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400"
      title="Recent activity"
      description="Your latest updates"
      className="h-full md:col-span-2 xl:col-span-1"
      contentClassName="flex flex-col gap-5"
    >
      <ol className="space-y-5">
        {RECENT_ACTIVITY.map((item, index) => {
          const type = TYPES[item.type] ?? TYPES.task;
          const Icon = type.icon;
          const isLast = index === RECENT_ACTIVITY.length - 1;

          return (
            <li key={item.id} className="relative flex gap-3">
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-9 -bottom-5 w-px -translate-x-1/2 bg-border"
                />
              )}

              <div
                className={cn(
                  "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full",
                  type.tone
                )}
              >
                <Icon className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium leading-snug">{item.title}</p>
                  <span className="shrink-0 pt-0.5 text-[11px] text-muted-foreground">
                    {item.time}
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <Link
        href="/dashboard/notification"
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-auto w-full")}
      >
        View all notifications
        <ChevronRight />
      </Link>
    </SectionCard>
  );
}
