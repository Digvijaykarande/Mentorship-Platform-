"use client";

import {
  CalendarDays,
  CheckCircle2,
  FileText,
  GitBranch,
  Layers3,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge, statusKey } from "./Status";

export default function SubmissionReviewSnapshot({ submission }) {
  if (!submission) return null;

  const files = Array.isArray(submission.files) ? submission.files : [];
  const key = statusKey(submission.status);
  const isApproved = key === "approved";
  const isRevision = key === "changes";
  const isWithdrawn = key === "withdrawn";
  const hasFeedback = isApproved || isRevision;

  return (
    <Card className="h-fit rounded-xl border-slate-200/80 shadow-sm dark:border-slate-800">
      <CardHeader className="border-b border-slate-100 bg-slate-50/60 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/50">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Layers3 className="h-4 w-4 text-indigo-500" />
          Review snapshot
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          A quick view of what happens next.
        </p>
      </CardHeader>
      <CardContent className="space-y-4 p-5">
        <div className="rounded-2xl bg-indigo-50/70 p-4 dark:bg-indigo-500/10">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-500">
              Current status
            </span>
            <StatusBadge status={submission.status} />
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
            {isWithdrawn
              ? "This submission is withdrawn."
              : isApproved
                ? "This work is approved."
                : isRevision
                  ? "A revision is needed."
                  : "Waiting for mentor review."}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {isWithdrawn
              ? "Restore it to send it back for mentor review."
              : isApproved
                ? "You can continue with the next milestone."
                : isRevision
                  ? "Review the feedback, update your work, and submit the next version."
                  : "Your mentor will be notified when the review is completed."}
          </p>
        </div>

        <div className="space-y-3">
          <SnapshotRow
            icon={GitBranch}
            label="Current version"
            value={submission.version || "v1"}
            mono
          />
          <SnapshotRow
            icon={CalendarDays}
            label="Updated"
            value={submission.submittedAt || submission.date || "—"}
          />
          <SnapshotRow
            icon={FileText}
            label="Attachments"
            value={`${files.length} ${files.length === 1 ? "file" : "files"}`}
          />
          <SnapshotRow
            icon={MessageCircle}
            label="Mentor feedback"
            value={hasFeedback && submission.feedback ? "Available" : "Pending"}
          />
        </div>

        <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Submission flow
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Step active label="Submitted" />
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <Step active={isApproved || isRevision} label="Reviewed" />
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <Step active={isApproved} label="Approved" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SnapshotRow({ icon: Icon, label, value, mono = false }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex min-w-0 items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        {label}
      </span>
      <span
        className={`shrink-0 text-right text-xs font-semibold text-slate-700 dark:text-slate-200 ${mono ? "font-mono" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function Step({ active, label }) {
  return (
    <span
      className={`flex min-w-0 flex-col items-center gap-1 text-center text-[9px] font-medium ${active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full ${active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 dark:bg-slate-800"}`}
      >
        {active ? (
          <CheckCircle2 className="h-3 w-3" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
        )}
      </span>
      {label}
    </span>
  );
}
