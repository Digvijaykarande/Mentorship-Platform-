"use client";

import { useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import SectionCard from "@/components/common/SectionCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WEEKLY_PROGRESS } from "./progressData";

// Select values are the visible labels on purpose: the trigger then always shows the label.
const RANGES = {
  "Last 4 weeks": 4,
  "Last 8 weeks": 8,
  "All weeks": WEEKLY_PROGRESS.length,
};

const METRICS = {
  completion: { label: "Completion", unit: "%", color: "#6366f1" },
  tasks: { label: "Tasks done", unit: " tasks", color: "#10b981" },
};

const chartConfig = {
  completion: { label: METRICS.completion.label, color: METRICS.completion.color },
  tasks: { label: METRICS.tasks.label, color: METRICS.tasks.color },
};

export default function ProgressOverTime() {
  const [range, setRange] = useState("All weeks");
  const [metric, setMetric] = useState("completion");

  const weeks = RANGES[range] ?? WEEKLY_PROGRESS.length;

  const { data, summary } = useMemo(() => {
    const startIndex = Math.max(WEEKLY_PROGRESS.length - weeks, 0);
    const visible = WEEKLY_PROGRESS.slice(startIndex);
    const last = visible[visible.length - 1];

    // Gain is measured from the week BEFORE the range starts, so a 4-week range shows 4 weeks of growth.
    const baseline = startIndex > 0 ? WEEKLY_PROGRESS[startIndex - 1].completion : 0;
    const gain = last.completion - baseline;
    const tasksDone = visible.reduce((sum, w) => sum + w.tasks, 0);
    const period = visible.length === WEEKLY_PROGRESS.length ? "since you started" : `in the last ${visible.length} weeks`;

    return {
      data: visible,
      summary:
        metric === "completion"
          ? `Completion is up ${gain} points ${period}.`
          : `${tasksDone} tasks completed ${period}.`,
    };
  }, [weeks, metric]);

  const active = METRICS[metric];

  const tooltip = (
    <ChartTooltipContent
      indicator="line"
      labelFormatter={(_, payload) =>
        payload?.[0] ? `Week of ${payload[0].payload.start}` : ""
      }
      formatter={(value) => (
        <div className="flex w-full items-center justify-between gap-6">
          <span className="text-muted-foreground">{active.label}</span>
          <span className="font-mono font-medium tabular-nums text-foreground">
            {value}
            {active.unit}
          </span>
        </div>
      )}
    />
  );

  return (
    <SectionCard
      icon={TrendingUp}
      iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
      title="Progress over time"
      description="Week-by-week completion and task output"
      className="h-full"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={metric} onValueChange={setMetric}>
          <TabsList>
            <TabsTrigger value="completion" className="px-3 text-xs">
              Completion
            </TabsTrigger>
            <TabsTrigger value="tasks" className="px-3 text-xs">
              Tasks
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={range} onValueChange={setRange}>
          <SelectTrigger size="sm" className="w-[140px] text-xs" aria-label="Select time range">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(RANGES).map((label) => (
              <SelectItem key={label} value={label}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{summary}</p>

      <ChartContainer config={chartConfig} className="mt-3 aspect-auto h-64 w-full">
        {metric === "completion" ? (
          <AreaChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="progress-fill-completion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-completion)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-completion)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              width={40}
              tickFormatter={(v) => `${v}%`}
            />
            <ChartTooltip cursor={false} content={tooltip} />
            <Area
              dataKey="completion"
              type="monotone"
              stroke="var(--color-completion)"
              strokeWidth={2}
              fill="url(#progress-fill-completion)"
              dot={{ r: 3, fill: "var(--color-completion)", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        ) : (
          <BarChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              width={32}
            />
            <ChartTooltip cursor={{ fill: "var(--muted)", opacity: 0.5 }} content={tooltip} />
            <Bar dataKey="tasks" fill="var(--color-tasks)" radius={[6, 6, 0, 0]} maxBarSize={36} />
          </BarChart>
        )}
      </ChartContainer>
    </SectionCard>
  );
}
