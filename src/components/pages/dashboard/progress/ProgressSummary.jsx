"use client";

import { CheckCircle2, ListChecks, Star, Timer } from "lucide-react";

import StatStrip from "@/components/common/StatStrip";
import {
  AVERAGE_RATING,
  FEEDBACK,
  ON_TIME_RATE,
  OVERALL_PROGRESS,
  TASKS,
  WEEKLY_PROGRESS,
} from "./progressData";

export default function ProgressSummary() {
  const last = WEEKLY_PROGRESS[WEEKLY_PROGRESS.length - 1];
  const previous = WEEKLY_PROGRESS[WEEKLY_PROGRESS.length - 2];
  const weeklyGain = previous ? last.completion - previous.completion : 0;

  const items = [
    {
      key: "completion",
      label: "Overall completion",
      value: OVERALL_PROGRESS,
      suffix: "%",
      icon: CheckCircle2,
      tone: "indigo",
      delta: {
        text: `${weeklyGain >= 0 ? "+" : ""}${weeklyGain} pts`,
        tone: weeklyGain >= 0 ? "positive" : "negative",
      },
      hint: "this week",
    },
    {
      key: "tasks",
      label: "Tasks done",
      value: TASKS.completed,
      suffix: `/ ${TASKS.total}`,
      icon: ListChecks,
      tone: "blue",
      delta:
        TASKS.overdue > 0
          ? { text: `${TASKS.overdue} overdue`, tone: "negative" }
          : { text: "None overdue", tone: "positive" },
    },
    {
      key: "on-time",
      label: "On-time delivery",
      value: ON_TIME_RATE,
      suffix: "%",
      icon: Timer,
      tone: "emerald",
      hint: `${TASKS.completedOnTime} of ${TASKS.completed} tasks`,
    },
    {
      key: "feedback",
      label: "Average feedback",
      value: AVERAGE_RATING.toFixed(1),
      suffix: "/ 5",
      icon: Star,
      tone: "amber",
      hint: `${FEEDBACK.totalReviews} reviews · ${FEEDBACK.trend.toLowerCase()}`,
    },
  ];

  return <StatStrip items={items} />;
}
