"use client";

import { ChartNoAxesCombined, CheckCircle2, Flame, Target } from "lucide-react";

import MiniStatCard from "@/components/common/MiniStatCard";
import {
  AVERAGE_RATING,
  INTERNSHIP,
  ON_TIME_RATE,
  OVERALL_PROGRESS,
  TASKS,
  WEEKLY_PROGRESS,
} from "./progressData";

const cards = [
  {
    icon: ChartNoAxesCombined,
    label: "Overall completion",
    value: `${OVERALL_PROGRESS}%`,
    tone: "indigo",
    trend: "+8%",
    trendLabel: "this month",
    spark: WEEKLY_PROGRESS.map((w) => w.completion),
  },
  {
    icon: CheckCircle2,
    label: "Tasks completed",
    value: TASKS.completed,
    tone: "emerald",
    trendLabel: `${TASKS.total - TASKS.completed} still open`,
    spark: WEEKLY_PROGRESS.map((w) => w.tasks),
  },
  {
    icon: Flame,
    label: "On-time delivery",
    value: `${ON_TIME_RATE}%`,
    tone: "amber",
    trendLabel: "Consistency is key",
  },
  {
    icon: Target,
    label: "Mentor rating",
    value: `${AVERAGE_RATING}/5`,
    tone: "violet",
    trendLabel: `Week ${INTERNSHIP.currentWeek} review`,
  },
];

export default function ProgressSummary() {
  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => (
        <MiniStatCard key={card.label} {...card} />
      ))}
    </section>
  );
}