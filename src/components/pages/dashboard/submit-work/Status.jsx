"use client";

import { CheckCircle2, Clock3, RefreshCcw, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Single source of truth for submission status. Every status string that
 * appears anywhere in the flow (submission status, version status) maps
 * to one of these four canonical keys.
 */
const STATUS_ALIASES = {
  Pending: "pending",
  Submitted: "pending",
  "Under Review": "pending",
  "Changes Requested": "changes",
  "Needs Revision": "changes",
  "Revision Requested": "changes",
  Approved: "approved",
  Withdrawn: "withdrawn",
};

export const STATUS_CONFIG = {
  pending: {
    label: "Pending review",
    icon: Clock3,
    badge:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
    solid: "bg-amber-500",
    icon_tint:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  },
  changes: {
    label: "Changes requested",
    icon: RefreshCcw,
    badge:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
    solid: "bg-rose-500",
    icon_tint:
      "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    solid: "bg-emerald-500",
    icon_tint:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
  withdrawn: {
    label: "Withdrawn",
    icon: XCircle,
    badge:
      "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20",
    solid: "bg-slate-400",
    icon_tint:
      "bg-slate-100 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400",
  },
};

/** Canonical status strings used when the app sets a status itself. */
export const STATUS = {
  PENDING: "Pending",
  CHANGES: "Changes Requested",
  APPROVED: "Approved",
  WITHDRAWN: "Withdrawn",
};

/** Any status string -> "pending" | "changes" | "approved" | "withdrawn". */
export function statusKey(status) {
  return STATUS_ALIASES[status] || "pending";
}

export function resolveStatus(status) {
  const key = STATUS_ALIASES[status] || "pending";
  return STATUS_CONFIG[key];
}

export function isRevisionStatus(status) {
  return STATUS_ALIASES[status] === "changes";
}

export function StatusBadge({ status, className }) {
  const config = resolveStatus(status);
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        config.badge,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

export function StatusIcon({ status, className }) {
  const config = resolveStatus(status);
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        config.icon_tint,
        className,
      )}
    >
      <Icon className="h-4.5 w-4.5" />
    </div>
  );
}
