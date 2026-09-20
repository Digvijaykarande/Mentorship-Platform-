"use client";

import { Target } from "lucide-react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import MetricBar from "@/components/common/MetricBar";
import SectionCard from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";
import { ChartContainer } from "@/components/ui/chart";
import {
  BREAKDOWN,
  EXPECTED_PROGRESS,
  INTERNSHIP,
  OVERALL_PROGRESS,
} from "./progressData";

const chartConfig = {
  overall: { label: "Overall", color: "#6366f1" },
};

export default function OverallProgress() {
  const onTrack = OVERALL_PROGRESS >= EXPECTED_PROGRESS;
  const weeksLeft = INTERNSHIP.totalWeeks - INTERNSHIP.currentWeek;

  return (
    <SectionCard
      icon={Target}
      iconClassName="bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
      title="Overall progress"
      description={`${weeksLeft} weeks left · ends ${INTERNSHIP.endDate}`}
      className="h-full"
      contentClassName="flex flex-col gap-6"
      action={
        <Badge
          variant="secondary"
          className={
            onTrack
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
          }
        >
          {onTrack ? "On track" : "Behind pace"}
        </Badge>
      }
    >
      <div className="relative mx-auto h-44 w-44">
        <ChartContainer config={chartConfig} className="aspect-square h-full w-full">
          <RadialBarChart
            data={[{ name: "overall", value: OVERALL_PROGRESS }]}
            startAngle={90}
            endAngle={-270}
            innerRadius="76%"
            outerRadius="100%"
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              dataKey="value"
              fill="var(--color-overall)"
              cornerRadius={12}
              background={{ fill: "var(--muted)" }}
            />
          </RadialBarChart>
        </ChartContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-semibold tracking-tight tabular-nums">
            {OVERALL_PROGRESS}%
          </span>
          <span className="text-xs text-muted-foreground">
            pace target {EXPECTED_PROGRESS}%
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {BREAKDOWN.map((item) => (
          <MetricBar
            key={item.key}
            label={item.label}
            value={item.value}
            tone={item.tone}
            showDot
          />
        ))}
      </div>
    </SectionCard>
  );
}
