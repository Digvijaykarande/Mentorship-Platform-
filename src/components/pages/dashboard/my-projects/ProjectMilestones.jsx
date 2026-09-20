"use client";

import { Map } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";
import MilestoneStep from "./MilestoneStep";
import { milestones } from "./projectsData";

export default function ProjectMilestones() {
  return (
    <SectionCard
      icon={Map}
      title="Learning & Task Roadmap"
      description="Cohort timeline"
      iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
      action={
        <Badge variant="outline" className="rounded-full text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {milestones.length} Phases
        </Badge>
      }
    >
      <div className="max-h-80 overflow-y-auto pr-1">
        <div className="relative flex flex-col gap-6 border-l-2 border-slate-100 pl-7 dark:border-slate-800">
          {milestones.map((milestone) => (
            <MilestoneStep key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
