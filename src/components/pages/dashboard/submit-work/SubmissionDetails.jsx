"use client";

import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileText,
  GitBranch,
  Link2,
  MessageCircle,
  Paperclip,
  Pencil,
  RefreshCcw,
  RotateCcw,
  StickyNote,
  Trash2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StatusBadge, statusKey } from "./Status";
import { getTypeMeta } from "./constants";
import { getPermissions } from "./submissionLogic";

export default function SubmissionDetails({
  submission,
  onEdit = () => {},
  onWithdraw = () => {},
  onRestore = () => {},
  onDelete = () => {},
  onSubmitRevision = () => {},
}) {
  if (!submission) {
    return (
      <Card className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:ring-indigo-500/20">
          <FileText className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
          No submission selected
        </h3>
        <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500 dark:text-slate-400">
          Pick a submission from your history to see its details.
        </p>
      </Card>
    );
  }

  const files = Array.isArray(submission.files) ? submission.files : [];
  const key = statusKey(submission.status);
  const perms = getPermissions(submission);
  const openLabel = getTypeMeta(submission.type).openLabel;
  const showFeedback =
    Boolean(submission.feedback) && (key === "approved" || key === "changes");
  const feedbackTone =
    key === "approved"
      ? {
          box: "border-emerald-200 bg-emerald-50 dark:border-emerald-500/25 dark:bg-emerald-500/10",
          text: "text-emerald-700 dark:text-emerald-300",
        }
      : {
          box: "border-rose-200 bg-rose-50 dark:border-rose-500/25 dark:bg-rose-500/10",
          text: "text-rose-700 dark:text-rose-300",
        };

  const metadata = [
    { label: "Milestone", value: submission.milestone || "—" },
    {
      label: "Updated",
      value: submission.submittedAt || submission.date || "—",
      icon: CalendarDays,
    },
    { label: "Version", value: submission.version || "v1", icon: GitBranch, mono: true },
    {
      label: "Attachments",
      value: `${files.length} ${files.length === 1 ? "file" : "files"}`,
      icon: Paperclip,
    },
  ];

  return (
    <div id="submission-details" className="scroll-mt-6">
      <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <CardHeader className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-white px-5 py-5 sm:px-6 dark:border-slate-800 dark:from-indigo-500/10 dark:via-slate-900 dark:to-slate-900">
          <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-indigo-200/40 blur-2xl dark:bg-indigo-400/10" />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-indigo-200 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide text-indigo-700 dark:border-indigo-500/30 dark:bg-slate-900 dark:text-indigo-300">
                  {submission.id}
                </span>
                <StatusBadge status={submission.status} />
                {submission.scope && (
                  <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {submission.scope}
                  </span>
                )}
                {submission.taskId != null && (
                  <Link
                    href={`/dashboard/tasks?task=${submission.taskId}`}
                    className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300"
                  >
                    View task →
                  </Link>
                )}
              </div>
              <CardTitle className="max-w-2xl text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                {submission.title}
              </CardTitle>
              {submission.description && (
                <p className="mt-2.5 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {submission.description}
                </p>
              )}
            </div>
            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100 sm:flex dark:bg-slate-800 dark:text-indigo-400 dark:ring-indigo-500/25">
              <FileText className="h-5 w-5" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-5 sm:p-6">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metadata.map(({ label, value, icon: Icon, mono }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 transition-colors hover:border-indigo-200 hover:bg-indigo-50/60 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/10"
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  {Icon && (
                    <Icon className="h-3 w-3 text-indigo-500 dark:text-indigo-400" />
                  )}
                  {label}
                </div>
                <p
                  className={cn(
                    "mt-1.5 truncate text-[13px] font-semibold text-slate-900 dark:text-slate-100",
                    mono && "font-mono",
                  )}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Project links */}
          {(submission.github || submission.live || submission.link) && (
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                  <Link2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Project links
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                    Open the submitted work in a new tab.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {submission.github && (
                  <a
                    href={submission.github}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "gap-1.5 border-slate-300 bg-white font-medium text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
                    )}
                  >
                    <FaGithub className="h-3.5 w-3.5" /> Repository
                  </a>
                )}
                {submission.link && (
                  <a
                    href={submission.link}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "gap-1.5 border-slate-300 bg-white font-medium text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
                    )}
                  >
                    <Link2 className="h-3.5 w-3.5" /> {openLabel}
                  </a>
                )}
                {submission.live && (
                  <a
                    href={submission.live}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "gap-1.5 border-0 bg-indigo-600 font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400",
                    )}
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live preview
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {submission.notes && (
            <div className="flex gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3.5 dark:border-indigo-500/25 dark:bg-indigo-500/10">
              <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-300" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-700 dark:text-indigo-300">
                  Submission note
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">
                  {submission.notes}
                </p>
              </div>
            </div>
          )}
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6 dark:border-slate-800 dark:bg-slate-800/40">
          {perms.isLocked ? (
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/15">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              Approved by mentor · locked
            </span>
          ) : (
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {perms.canRestore
                ? "This submission is withdrawn. Restore it to send it for review again."
                : perms.canRevise
                  ? "Update the work and submit a new version."
                  : "Your mentor will review this submission. You can still edit it."}
            </span>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {perms.canRevise && (
              <Button
                size="sm"
                className="gap-1.5 rounded-lg bg-indigo-600 px-4 font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                onClick={() => onSubmitRevision(submission.id)}
              >
                <RefreshCcw className="h-3.5 w-3.5" /> Submit revision
              </Button>
            )}
            {perms.canRestore && (
              <Button
                size="sm"
                className="gap-1.5 rounded-lg bg-indigo-600 px-4 font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                onClick={() => onRestore(submission.id)}
              >
                <RotateCcw className="h-3.5 w-3.5" /> Restore
              </Button>
            )}
            {perms.canEdit && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-lg font-medium"
                onClick={() => onEdit(submission.id)}
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Button>
            )}
            {perms.canWithdraw && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-rose-200 bg-white font-medium text-rose-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-500/30 dark:bg-transparent dark:text-rose-400 dark:hover:bg-rose-500/10"
                onClick={() => onWithdraw(submission.id)}
              >
                Withdraw
              </Button>
            )}
            {perms.canDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 rounded-lg font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-500/10"
                onClick={() => onDelete(submission.id)}
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}