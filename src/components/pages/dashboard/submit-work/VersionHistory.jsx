"use client";

import {
  GitCommit,
  History,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge, resolveStatus, statusKey } from "./Status";
import { VERSION_KINDS } from "./submissionLogic";

export default function VersionHistory({ versions = [], submission }) {
  if (!versions.length) return null;

  return (
    <Card className="overflow-hidden rounded-xl border-slate-200/80 bg-white shadow-[0_12px_40px_-26px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900">
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-white to-indigo-50/40 px-4 py-3.5 sm:px-5 dark:border-slate-800 dark:from-slate-900 dark:to-indigo-500/10">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <History className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <CardTitle className="text-sm font-bold tracking-tight text-slate-950 dark:text-white">
              Version history
            </CardTitle>
            <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
              Review cycle for {submission?.title || "this submission"}
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <GitCommit className="h-3 w-3" />
          {versions.length}
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[390px] overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
          <div className="relative space-y-2.5">
            <div className="absolute bottom-5 left-[13px] top-5 w-px bg-gradient-to-b from-indigo-300 via-slate-200 to-transparent dark:from-indigo-500/30 dark:via-slate-700" />
            {versions.map((version, index) => (
              <VersionRow
                key={`${version.version}-${index}`}
                version={version}
                isLatest={index === 0}
                index={index}
                total={versions.length}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 bg-slate-50/60 px-4 py-2.5 text-[10px] text-slate-500 sm:px-5 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400">
          <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">
            vMAJOR.MINOR.PATCH
          </span>
          <span>Major: revision after feedback</span>
          <span>Minor: files or link updated</span>
          <span>Patch: small text edit</span>
        </div>
      </CardContent>
    </Card>
  );
}

function VersionRow({ version, isLatest, index, total }) {
  const status = version.status || "Pending";
  const config = resolveStatus(status);
  const Icon = isLatest ? Sparkles : config.icon;
  const key = statusKey(status);
  const isApproved = key === "approved";
  const isRevision = key === "changes";
  const isWithdrawn = key === "withdrawn";
  const kindLabel = VERSION_KINDS[version.kind]?.label;
  const nodeTone = isLatest
    ? "bg-indigo-600 text-white ring-indigo-100 dark:ring-indigo-500/25"
    : isApproved
      ? "bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/25"
      : isRevision
        ? "bg-rose-50 text-rose-600 ring-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/25"
        : isWithdrawn
          ? "bg-slate-100 text-slate-500 ring-slate-100 dark:bg-slate-500/10 dark:text-slate-400 dark:ring-slate-500/25"
          : "bg-amber-50 text-amber-600 ring-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/25";

  return (
    <article className="relative pl-9">
      <div
        className={`absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full ring-4 ${nodeTone}`}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div
        className={`rounded-xl border px-3.5 py-3 transition-all hover:shadow-sm ${
          isLatest
            ? "border-indigo-200 bg-indigo-50/55 dark:border-indigo-500/25 dark:bg-indigo-500/10"
            : "border-slate-200/80 bg-white hover:border-indigo-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/25"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="font-mono text-[13px] font-bold text-slate-900 dark:text-white">
              {version.version}
            </span>
            {kindLabel && (
              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {kindLabel}
              </span>
            )}
            {isLatest && (
              <span className="rounded-full bg-indigo-600 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
                Current
              </span>
            )}
          </div>
          <span className="shrink-0 text-[10px] font-medium text-slate-400">
            {version.date}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
          {version.changes || version.description || "No change summary provided."}
        </p>
        <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 dark:border-slate-800">
          <StatusBadge status={status} />
          <span className="text-[10px] font-medium text-slate-400">
            Entry #{total - index}
          </span>
        </div>
      </div>
    </article>
  );
}
