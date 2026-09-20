"use client";

import Link from "next/link";
import { ChevronRight, MessageSquareText, Star } from "lucide-react";

import MetricBar from "@/components/common/MetricBar";
import SectionCard from "@/components/common/SectionCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AVERAGE_RATING, FEEDBACK } from "./progressData";

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// A short snapshot. The full mentor feedback lives on the Feedback page,
// so this card links there instead of repeating it.
export default function FeedbackSnapshot() {
  return (
    <SectionCard
      icon={MessageSquareText}
      iconClassName="bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
      title="Mentor feedback"
      description={`${FEEDBACK.totalReviews} reviews · ${FEEDBACK.trend.toLowerCase()}`}
      className="h-full"
      contentClassName="flex flex-col gap-5"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold leading-none tracking-tight tabular-nums">
              {AVERAGE_RATING.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">/ 5</span>
          </p>
          <div className="mt-1.5 flex gap-0.5" aria-label={`${AVERAGE_RATING} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-3.5",
                  i < Math.round(AVERAGE_RATING)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/40"
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <p className="text-xs font-medium">{FEEDBACK.mentor}</p>
            <p className="text-[11px] text-muted-foreground">{FEEDBACK.date}</p>
          </div>
          <Avatar>
            <AvatarFallback className="bg-violet-100 text-xs font-semibold text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
              {initials(FEEDBACK.mentor)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <blockquote className="border-l-2 border-indigo-500 pl-3 text-sm leading-relaxed text-muted-foreground">
        {FEEDBACK.quote}
      </blockquote>

      <div className="space-y-3">
        {FEEDBACK.ratings.map((rating) => (
          <MetricBar
            key={rating.label}
            label={rating.label}
            value={rating.value}
            max={5}
            display={rating.value.toFixed(1)}
            tone="violet"
            size="sm"
          />
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[11px] text-muted-foreground">Strengths</span>
          {FEEDBACK.strengths.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="bg-emerald-50 font-normal text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
            >
              {item}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[11px] text-muted-foreground">Focus next</span>
          {FEEDBACK.focusAreas.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="bg-amber-50 font-normal text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>

      <Link
        href="/dashboard/feedback"
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-auto w-full")}
      >
        View all feedback
        <ChevronRight />
      </Link>
    </SectionCard>
  );
}
