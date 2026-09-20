"use client";

import { Award, BookOpenCheck, CheckCircle2, Code2, Star, Trophy } from "lucide-react";

import MetricBar from "@/components/common/MetricBar";
import SectionCard from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ACHIEVEMENTS, NEXT_ACHIEVEMENT, formatShortDate } from "./progressData";

const ICONS = {
  check: CheckCircle2,
  star: Star,
  book: BookOpenCheck,
  trophy: Trophy,
  code: Code2,
};

const TONES = {
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
};

export default function Achievements() {
  // Newest first, regardless of the order in the data file.
  const badges = [...ACHIEVEMENTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <SectionCard
      icon={Award}
      iconClassName="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
      title="Badges"
      description="Milestones you've earned so far"
      className="h-full"
      contentClassName="flex flex-col gap-5"
      action={
        <Badge variant="secondary" className="font-normal">
          {badges.length} earned
        </Badge>
      }
    >
      <ul className="grid grid-cols-2 gap-3">
        {badges.map((badge, index) => {
          const Icon = ICONS[badge.icon] ?? Award;
          const isLatest = index === 0;

          return (
            <li
              key={badge.id}
              className={cn(
                "flex flex-col gap-2 rounded-xl border p-3",
                isLatest ? "col-span-2 flex-row items-center gap-3 bg-muted/40" : "bg-card"
              )}
            >
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                  TONES[badge.tone] ?? TONES.blue
                )}
              >
                <Icon className="size-4" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <p className="text-sm font-medium leading-tight">{badge.title}</p>
                  {isLatest && (
                    <Badge className="h-4 bg-indigo-600 px-1.5 text-[10px] text-white">New</Badge>
                  )}
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                  {badge.description}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground/80">
                  {formatShortDate(badge.date)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="rounded-xl border border-dashed p-3">
        <MetricBar
          label={`Next badge: ${NEXT_ACHIEVEMENT.title}`}
          value={NEXT_ACHIEVEMENT.current}
          max={NEXT_ACHIEVEMENT.target}
          display={`${NEXT_ACHIEVEMENT.current}/${NEXT_ACHIEVEMENT.target}`}
          tone="amber"
          size="sm"
        />
      </div>
    </SectionCard>
  );
}
