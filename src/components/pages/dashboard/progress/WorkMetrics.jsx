"use client";

import { Code2 } from "lucide-react";

import MetricBar from "@/components/common/MetricBar";
import SectionCard from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CODE_STATS, TASKS } from "./progressData";

const TASK_ROWS = [
  { label: "Completed", count: TASKS.completed, tone: "emerald" },
  { label: "In progress", count: TASKS.inProgress, tone: "blue" },
  { label: "Pending", count: TASKS.pending, tone: "amber" },
  { label: "Overdue", count: TASKS.overdue, tone: "rose" },
];

const CODE_TILES = [
  { label: "Code submissions", value: CODE_STATS.submissions },
  {
    label: "Pull requests",
    value: CODE_STATS.pullRequests,
    hint: `${CODE_STATS.pullRequestsMerged} merged`,
  },
  {
    label: "Bugs resolved",
    value: CODE_STATS.bugsResolved,
    hint: `of ${CODE_STATS.bugsReported} reported`,
  },
  { label: "Lines contributed", value: CODE_STATS.linesContributed },
];

// Replaces the old "Code & task metrics" card. Tasks completed and mentor
// review comments were dropped because the KPI strip and feedback card already show them.
export default function WorkMetrics() {
  return (
    <SectionCard
      icon={Code2}
      iconClassName="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
      title="Work output"
      description="How your tasks and code are landing"
      className="h-full"
      contentClassName="flex flex-col gap-5"
      action={
        <Badge
          variant="secondary"
          className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
        >
          Strong
        </Badge>
      }
    >
      <div>
        <p className="mb-3 text-sm font-medium">
          Task status <span className="font-normal text-muted-foreground">· {TASKS.total} assigned</span>
        </p>
        <div className="space-y-3">
          {TASK_ROWS.map((row) => (
            <MetricBar
              key={row.label}
              label={row.label}
              value={row.count}
              max={TASKS.total}
              display={String(row.count)}
              tone={row.tone}
              showDot
              size="sm"
            />
          ))}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-3">
        {CODE_TILES.map((tile) => (
          <div key={tile.label} className="rounded-lg border bg-muted/30 p-3">
            <p className="text-[11px] text-muted-foreground">{tile.label}</p>
            <p className="mt-1 text-xl font-semibold leading-none tabular-nums">{tile.value}</p>
            {tile.hint && <p className="mt-1 text-[11px] text-muted-foreground">{tile.hint}</p>}
          </div>
        ))}
      </div>

      <MetricBar
        label="Work quality score"
        hint="Code reviews, task quality and mentor feedback"
        value={CODE_STATS.qualityScore}
        tone="indigo"
      />
    </SectionCard>
  );
}
