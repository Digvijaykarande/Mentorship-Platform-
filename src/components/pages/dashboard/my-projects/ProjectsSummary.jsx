"use client";

import { FolderKanban, Clock3, CircleCheckBig, ListTodo } from "lucide-react";
import MiniStatCard from "@/components/common/MiniStatCard";

export default function ProjectsSummary({
  totalProjects = 0,
  activeProjects = 0,
  completedProjects = 0,
  pendingTasks = 0,
}) {
  const cards = [
    {
      icon: FolderKanban,
      label: "Total Projects",
      value: totalProjects,
      tone: "blue",
      trendLabel: "Portfolio total",
    },
    {
      icon: Clock3,
      label: "Active Sprints",
      value: activeProjects,
      tone: "indigo",
      trendLabel: "In progress now",
    },
    {
      icon: CircleCheckBig,
      label: "Completed",
      value: completedProjects,
      tone: "emerald",
      trendLabel: "Verified milestones",
    },
    {
      icon: ListTodo,
      label: "Pending Deliverables",
      value: pendingTasks,
      tone: "amber",
      trendLabel: "Needs your attention",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <MiniStatCard key={card.label} {...card} />
      ))}
    </div>
  );
}
