"use client";

import { ListTodo, Clock3, CircleCheckBig, CircleAlert } from "lucide-react";

import MiniStatCard from "@/components/common/MiniStatCard";

export default function TasksSummary({
  totalTasks = 0,
  activeTasks = 0,
  completedTasks = 0,
  overdueTasks = 0,
  columns = "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  className = "",
}) {
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const TASK_CARDS = [
    {
      key: "total",
      icon: ListTodo,
      label: "Total Tasks",
      value: totalTasks,
      tone: "blue",
      trend: totalTasks > 0 ? `${completionRate}%` : null,
      trendDirection: "up",
      trendLabel: "All tasks in workspace",
    },
    {
      key: "active",
      icon: Clock3,
      label: "Active Tasks",
      value: activeTasks,
      tone: "amber",
      trend: activeTasks > 0 ? `${activeTasks}` : null,
      trendDirection: activeTasks > 3 ? "down" : "up",
      trendLabel: "Currently in progress",
    },
    {
      key: "completed",
      icon: CircleCheckBig,
      label: "Completed",
      value: completedTasks,
      tone: "emerald",
      trend: completionRate > 0 ? `${completionRate}%` : null,
      trendDirection: completionRate >= 50 ? "up" : "down",
      trendLabel: `of ${totalTasks} tasks`,
    },
    {
      key: "overdue",
      icon: CircleAlert,
      label: "Overdue",
      value: overdueTasks,
      tone: "rose",
      trend: overdueTasks > 0 ? `${overdueTasks}` : null,
      trendDirection: overdueTasks > 0 ? "down" : "up",
      trendLabel: overdueTasks > 0 ? "Needs attention" : "All on track",
    },
  ];

  return (
    <div className={`grid gap-4 ${columns} ${className}`}>
      {TASK_CARDS.map((card) => (
        <MiniStatCard
          key={card.key}
          icon={card.icon}
          label={card.label}
          value={card.value}
          tone={card.tone}
          trend={card.trend}
          trendDirection={card.trendDirection}
          trendLabel={card.trendLabel}
        />
      ))}
    </div>
  );
}