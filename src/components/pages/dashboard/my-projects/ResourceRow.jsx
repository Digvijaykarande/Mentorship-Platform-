"use client";

import { PenLine, FileText, Database, Terminal, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ICON_MAP = { draw: PenLine, picture_as_pdf: FileText, database: Database, terminal: Terminal };
const ICON_STYLES = {
  "primary-fixed": "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
  "error-container": "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  neutral: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  "secondary-container": "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
};

export default function ResourceRow({ resource, onDownload }) {
  const Icon = ICON_MAP[resource.icon] ?? FileText;

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 transition-colors hover:bg-slate-100 dark:bg-slate-900/40 dark:hover:bg-slate-800/60">
      <div className="flex min-w-0 items-center gap-3">
        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", ICON_STYLES[resource.tone] ?? ICON_STYLES.neutral)}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">{resource.name}</span>
          <span className="text-[10.5px] text-slate-400 dark:text-slate-500">{resource.meta}</span>
        </div>
      </div>

      {resource.action === "link" ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          render={
            <a href={resource.url || "#"} target="_blank" rel="noreferrer" title="Open external spec" />
          }
          className="shrink-0 text-slate-400 hover:text-indigo-600"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      ) : (
        <Button type="button" variant="ghost" size="icon-sm" onClick={() => onDownload(resource.name)} title="Download File" className="shrink-0 text-slate-400 hover:text-indigo-600">
          <Download className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}
