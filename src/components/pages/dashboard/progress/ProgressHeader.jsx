"use client";

import { ChartNoAxesCombined } from "lucide-react";

import Header from "@/components/common/Header";
import { INTERNSHIP } from "./progressData";

// The old header rendered a search box that was never wired to anything.
// The shared Header only shows search/filter controls when handlers are passed,
// so here it renders just the title block.
export default function ProgressHeader() {
  return (
    <Header
      title="My progress"
      description={`Week ${INTERNSHIP.currentWeek} of ${INTERNSHIP.totalWeeks} · your growth, work output and milestones`}
      icon={ChartNoAxesCombined}
      iconBg="bg-indigo-50 dark:bg-indigo-500/10"
      iconColor="text-indigo-600 dark:text-indigo-400"
    />
  );
}
