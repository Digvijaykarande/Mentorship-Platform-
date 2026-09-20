"use client";

import { BookOpen, CheckCircle2, Clock3, Zap } from "lucide-react";

import MetricBar from "@/components/common/MetricBar";
import SectionCard from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LEARNING_ITEMS, SKILLS, getSkillLevel } from "./progressData";

const LEVEL_STYLES = {
  Advanced: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Intermediate: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  Beginner: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
};

const LEVEL_TONE = {
  Advanced: "emerald",
  Intermediate: "indigo",
  Beginner: "amber",
};

export default function SkillsDevelopment() {
  const skills = [...SKILLS].sort((a, b) => b.progress - a.progress);

  return (
    <SectionCard
      icon={Zap}
      iconClassName="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
      title="Skills development"
      description="Competency level for each skill you're practising"
      className="h-full"
      contentClassName="flex flex-col gap-5"
      action={
        <Badge variant="secondary" className="font-normal">
          {skills.length} skills
        </Badge>
      }
    >
      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {skills.map((skill) => {
          const level = getSkillLevel(skill.progress);

          return (
            <MetricBar
              key={skill.id}
              label={skill.name}
              hint={skill.category}
              value={skill.progress}
              tone={LEVEL_TONE[level]}
              badge={
                <Badge
                  variant="secondary"
                  className={cn("h-5 px-1.5 text-[10px] font-medium", LEVEL_STYLES[level])}
                >
                  {level}
                </Badge>
              }
            />
          );
        })}
      </div>

      <Separator />

      <div>
        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
          <BookOpen className="size-4 text-muted-foreground" />
          Recent learning
        </div>

        <ul className="grid gap-2 sm:grid-cols-3">
          {LEARNING_ITEMS.map((item) => {
            const done = item.status === "Completed";
            const Icon = done ? CheckCircle2 : Clock3;

            return (
              <li
                key={item.id}
                className="flex items-start gap-2.5 rounded-lg border bg-muted/30 p-3"
              >
                <Icon
                  className={cn(
                    "mt-0.5 size-4 shrink-0",
                    done ? "text-emerald-500" : "text-amber-500"
                  )}
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{item.title}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {item.type} · {item.status}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionCard>
  );
}
