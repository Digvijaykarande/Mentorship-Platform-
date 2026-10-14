"use client";

import {
  PenLine,
  FileText,
  Database,
  Terminal,
  ExternalLink,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  draw: PenLine,
  picture_as_pdf: FileText,
  database: Database,
  terminal: Terminal,
};

const ICON_STYLES = {
  "primary-fixed":
    "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
  "error-container":
    "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  neutral: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  "secondary-container":
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
};

export default function ResourceRow({ resource, onDownload }) {
  const Icon = ICON_MAP[resource.icon] ?? FileText;

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/70 bg-white p-3 transition-colors hover:border-slate-300 hover:bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-800/60">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            ICON_STYLES[resource.tone] ?? ICON_STYLES.neutral,
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
            {resource.name}
          </span>
          <span className="text-[10.5px] text-slate-400 dark:text-slate-500">
            {resource.meta}
          </span>
        </div>
      </div>

      {resource.action === "link" ? (
        <a
          href={resource.url || "#"}
          target="_blank"
          rel="noreferrer"
          title="Open external spec"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : (
        <button
          type="button"
          onClick={() => onDownload(resource.name)}
          title="Download File"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
        >
          <Download className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
