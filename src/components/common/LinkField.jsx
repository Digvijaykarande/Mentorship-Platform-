"use client";

import { ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const formatUrl = (url) => (url?.startsWith("http") ? url : `https://${url}`);

/**
 * A single labeled social/professional link — editable input or clickable link display.
 * Used in Profile "Connections" and can be reused anywhere a URL field is needed.
 */
export default function LinkField({ label, name, value, onChange, isEditing, icon: Icon, iconClassName }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-slate-50/30 p-2.5 dark:border-slate-700/60 dark:bg-slate-900/30">
      <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg", iconClassName)}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</span>
        {isEditing ? (
          <Input
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder="URL"
            className="h-6 border-0 bg-transparent p-0 text-xs shadow-none focus-visible:ring-0"
          />
        ) : value ? (
          <a
            href={formatUrl(value)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            <span className="truncate">{value}</span>
            <ExternalLink className="h-3 w-3 shrink-0 text-slate-400" />
          </a>
        ) : (
          <p className="text-xs italic text-slate-400 dark:text-slate-600">Not linked</p>
        )}
      </div>
    </div>
  );
}
