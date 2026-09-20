"use client";

import { useMemo, useState } from "react";
import { BarChart3, Code2, Palette, ShieldCheck, TestTube2, Layers } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const ICONS = { "Code Quality": Code2, "System Design": BarChart3, Testing: TestTube2, "UI / UX": Palette, Security: ShieldCheck };
const TONES = {
  "Code Quality": { bar: "bg-indigo-500", icon: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" },
  "System Design": { bar: "bg-purple-500", icon: "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400" },
  Testing: { bar: "bg-emerald-500", icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" },
  "UI / UX": { bar: "bg-amber-500", icon: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" },
  Security: { bar: "bg-rose-500", icon: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400" },
};

export default function FeedbackCategories({ feedback = [] }) {
  const categories = useMemo(() => {
    const counts = {};
    feedback.forEach((item) => { counts[item.category] = (counts[item.category] || 0) + 1; });
    const total = feedback.length || 1;
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count, percentage: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count);
  }, [feedback]);

  if (categories.length === 0) return null;

  return (
    <SectionCard
      icon={Layers}
      title="Feedback Categories"
      description="Breakdown of mentor reviews by topic"
      iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
      contentClassName="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {categories.map((cat) => {
        const Icon = ICONS[cat.name] || Code2;
        const tone = TONES[cat.name] || TONES["Code Quality"];
        return (
          <div key={cat.name} className="rounded-xl border border-slate-200/60 bg-slate-50/40 p-3.5 dark:border-slate-800/60 dark:bg-slate-900/40">
            <div className="flex items-center justify-between">
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", tone.icon)}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{cat.percentage}%</span>
            </div>
            <p className="mt-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200">{cat.name}</p>
            <p className="text-[10.5px] text-slate-400 dark:text-slate-500">{cat.count} {cat.count === 1 ? "item" : "items"}</p>
            <Progress value={cat.percentage} className="mt-2.5">
              <ProgressTrack className="h-1.5">
                <ProgressIndicator className={tone.bar} />
              </ProgressTrack>
            </Progress>
          </div>
        );
      })}
    </SectionCard>
  );
}
