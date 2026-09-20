"use client";

import ProgressHeader from "./ProgressHeader";
import ProgressSummary from "./ProgressSummary";
import ProgressOverTime from "./ProgressOverTime";
import OverallProgress from "./OverallProgress";
import SkillsDevelopment from "./SkillsDevelopment";
import Achievements from "./Achievements";
import WorkMetrics from "./WorkMetrics";
import FeedbackSnapshot from "./FeedbackSnapshot";
import RecentActivity from "./RecentActivity";

// Layout: KPI strip, trend + overall, skills + badges, then a three-up row
// (work output, feedback, activity). Stacks to one column below `xl`.
export default function ProgressPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <ProgressHeader />
      <ProgressSummary />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="min-w-0 xl:col-span-8">
          <ProgressOverTime />
        </div>
        <div className="min-w-0 xl:col-span-4">
          <OverallProgress />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="min-w-0 xl:col-span-7">
          <SkillsDevelopment />
        </div>
        <div className="min-w-0 xl:col-span-5">
          <Achievements />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <WorkMetrics />
        <FeedbackSnapshot />
        <RecentActivity />
      </section>
    </div>
  );
}
