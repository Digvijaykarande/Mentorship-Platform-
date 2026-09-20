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
    { icon: FolderKanban, label: "Total Projects", value: totalProjects, tone: "blue" },
    { icon: Clock3, label: "Active", value: activeProjects, tone: "indigo" },
    { icon: CircleCheckBig, label: "Completed", value: completedProjects, tone: "emerald" },
    { icon: ListTodo, label: "Pending Tasks", value: pendingTasks, tone: "amber" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((card) => (
        <MiniStatCard key={card.label} {...card} />
      ))}
    </div>
  );
}
