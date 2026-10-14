"use client";

import { useMemo } from "react";
import { BadgeCheck, Clock3, FileText, RefreshCcw } from "lucide-react";
import MiniStatCard from "@/components/common/MiniStatCard";
import { cn } from "@/lib/utils";
import { statusKey } from "./Status";

// Overrides applied from outside MiniStatCard.
// "p.font-bold" = the big number, "span.font-bold" = the trend text (e.g. "1 pending").
const YELLOW_TREND =
  "[&_span.font-bold]:text-amber-600 dark:[&_span.font-bold]:text-amber-400";
const BLUE_NUMBERS =
  "[&_p.font-bold]:text-blue-600 dark:[&_p.font-bold]:text-blue-400 [&_span.font-bold]:text-blue-600 dark:[&_span.font-bold]:text-blue-400";

export default function SubmissionSummary({
  submissions = [],
  onCardClick = null,
  className = "",
}) {
  const cards = useMemo(() => {
    const total = submissions.length;

    const countOf = (key) =>
      submissions.filter((submission) => statusKey(submission.status) === key)
        .length;
    const pending = countOf("pending");
    const revisions = countOf("changes");
    const approved = countOf("approved");

    const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;

    return [
      {
        key: "total-submissions",
        label: "Total Submissions",
        value: total,
        icon: FileText,
        tone: "blue",
        trend: total > 0 ? `${total} total` : undefined,
        wrapperClass: BLUE_NUMBERS,
        onClick: onCardClick
          ? () => onCardClick({ key: "total-submissions" })
          : undefined,
      },
      {
        key: "submitted-work",
        label: "Pending Review",
        value: pending,
        icon: Clock3,
        tone: "amber",
        trend: pending > 0 ? `${pending} pending` : undefined,
        wrapperClass: YELLOW_TREND,
        onClick: onCardClick
          ? () => onCardClick({ key: "submitted-work" })
          : undefined,
      },
      {
        key: "under-review",
        label: "Revisions",
        value: revisions,
        icon: RefreshCcw,
        tone: "rose",
        trend: revisions > 0 ? `${revisions} req` : undefined,
        trendDirection: "down",
        onClick: onCardClick
          ? () => onCardClick({ key: "under-review" })
          : undefined,
      },
      {
        key: "approved-work",
        label: "Approved Work",
        value: approved,
        icon: BadgeCheck,
        tone: "emerald",
        trend: approved > 0 ? `${approvalRate}% rate` : undefined,
        trendDirection: "up",
        onClick: onCardClick
          ? () => onCardClick({ key: "approved-work" })
          : undefined,
      },
    ];
  }, [submissions, onCardClick]);

  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {cards.map(({ onClick, key, wrapperClass, ...card }) => (
        <button
          key={key || card.label}
          type="button"
          onClick={onClick}
          disabled={!onClick}
          className={cn("text-left disabled:cursor-default", wrapperClass)}
        >
          <MiniStatCard {...card} />
        </button>
      ))}
    </div>
  );
}