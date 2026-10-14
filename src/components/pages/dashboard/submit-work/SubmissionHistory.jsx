"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Ban,
  Eye,
  FileText,
  MoreVertical,
  Pencil,
  RefreshCcw,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/common/EmptyState";
import { StatusBadge } from "./Status";
import { getPermissions } from "./submissionLogic";

const PAGE_SIZE = 3;

export default function SubmissionHistory({
  submissions = [],
  selectedSubmissionId,
  onSelect = () => {},
  onEdit = () => {},
  onWithdraw = () => {},
  onRestore = () => {},
  onDelete = () => {},
  onSubmitRevision = () => {},
}) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(submissions.length / PAGE_SIZE));
  const visibleSubmissions = submissions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  // Go back to page 1 only when the list itself changes (filters, add, delete),
  // not when a submission is edited in place.
  const idsKey = submissions.map((s) => s.id).join("|");
  useEffect(() => {
    setPage(1);
  }, [idsKey]);

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const handleViewDetails = (id) => {
    onSelect(id);
    setTimeout(
      () =>
        document
          .getElementById("submission-details")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50,
    );
  };

  return (
    <Card className="overflow-hidden rounded-xl border-slate-200/80 bg-white py-0 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.3)] dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-br from-white via-white to-indigo-50/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-500/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500 ring-4 ring-indigo-100 dark:ring-indigo-500/25" />
            <h2 className="text-sm font-bold tracking-tight text-slate-950 dark:text-white">
              Submission history
            </h2>
          </div>
          <p className="mt-1 pl-4 text-xs text-slate-500 dark:text-slate-400">
            Your latest deliverables and mentor review status
          </p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No submissions found"
          description="Try a different search term or clear your filters."
        />
      ) : (
        <>
          <div className="grid gap-2.5 p-3 sm:p-4">
            {visibleSubmissions.map((submission) => {
              const selected = submission.id === selectedSubmissionId;
              const perms = getPermissions(submission);

              return (
                <div
                  key={submission.id}
                  className={`group relative overflow-hidden rounded-2xl border transition-all ${
                    selected
                      ? "border-indigo-200 bg-indigo-50/55 shadow-sm ring-1 ring-indigo-100 dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:ring-indigo-500/25"
                      : "border-slate-200/80 bg-white hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/25"
                  }`}
                >
                  {selected && (
                    <div className="absolute inset-y-0 left-0 w-1 bg-indigo-500" />
                  )}
                  <div className="flex items-center gap-3 px-3.5 py-3">
                    <button
                      type="button"
                      onClick={() => onSelect(submission.id)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate text-[13px] font-bold text-slate-900 dark:text-white">
                            {submission.title}
                          </h3>
                          <span className="hidden shrink-0 font-mono text-[10px] text-slate-400 sm:inline">
                            {submission.id}
                          </span>
                        </div>
                        <div className="mt-1 flex min-w-0 items-center gap-2">
                          <StatusBadge status={submission.status} />
                          <span className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                            {submission.type}
                          </span>
                          <span className="shrink-0 text-[11px] text-slate-400">
                            {submission.version}
                          </span>
                        </div>
                      </div>
                      
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0 text-slate-400 hover:bg-white hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-300"
                            aria-label="Submission actions"
                          />
                        }
                      >
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(submission.id)}
                        >
                          <Eye className="h-3.5 w-3.5" /> View details
                        </DropdownMenuItem>
                        {perms.canEdit && (
                          <DropdownMenuItem
                            onClick={() => onEdit(submission.id)}
                          >
                            <Pencil className="h-3.5 w-3.5" /> Edit submission
                          </DropdownMenuItem>
                        )}
                        {perms.canRevise && (
                          <DropdownMenuItem
                            onClick={() => onSubmitRevision(submission.id)}
                          >
                            <RefreshCcw className="h-3.5 w-3.5" /> Submit
                            revision
                          </DropdownMenuItem>
                        )}
                        {perms.canRestore && (
                          <DropdownMenuItem
                            onClick={() => onRestore(submission.id)}
                          >
                            <RotateCcw className="h-3.5 w-3.5" /> Restore
                            submission
                          </DropdownMenuItem>
                        )}
                        {(perms.canWithdraw || perms.canDelete) && (
                          <DropdownMenuSeparator />
                        )}
                        {perms.canWithdraw && (
                          <DropdownMenuItem
                            onClick={() => onWithdraw(submission.id)}
                          >
                            <Ban className="h-3.5 w-3.5" /> Withdraw
                          </DropdownMenuItem>
                        )}
                        {perms.canDelete && (
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => onDelete(submission.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete submission
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelect(submission.id)}
                    className="flex w-full items-center justify-between border-t border-slate-100/80 px-3.5 py-2 text-left text-[11px] text-slate-500 transition-colors hover:bg-white/70 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900/70"
                  >
                    <span>{submission.submittedAt || submission.date}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400">
                      View details <ChevronRight className="h-3 w-3" />
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {pageCount > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Page{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-300">{page}</span> of{" "}
                {pageCount}
              </p>
              <div className="flex items-center gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-lg bg-white dark:bg-slate-900"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-lg bg-white dark:bg-slate-900"
                  onClick={() =>
                    setPage((current) => Math.min(pageCount, current + 1))
                  }
                  disabled={page === pageCount}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
}
