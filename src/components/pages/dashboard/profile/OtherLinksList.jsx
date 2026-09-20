"use client";

import { Link as LinkIcon, ExternalLink, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formatUrl = (url) => (url?.startsWith("http") ? url : `https://${url}`);

export default function OtherLinksList({
  links = [],
  isEditing,
  newLink,
  onLinkFieldChange,
  onAddLink,
  onRemoveLink,
}) {
  return (
    <div className="rounded-xl border border-slate-200/50 bg-slate-50/20 p-3 dark:border-slate-700/40 dark:bg-slate-900/20">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Other Profiles</span>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">Additional links</p>
        </div>
        {isEditing && (
          <span className="rounded-full bg-blue-50/80 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            Editing
          </span>
        )}
      </div>

      <div className="mt-2 space-y-1.5">
        {links.length > 0 ? (
          links.map((link, index) => (
            <div
              key={`${link.name}-${index}`}
              className="flex items-center justify-between gap-2 rounded-lg border border-slate-200/60 bg-white/80 px-2.5 py-1.5 dark:border-slate-700/60 dark:bg-slate-900/60"
            >
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <LinkIcon className="h-3 w-3" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">{link.name}</p>
                  <p className="truncate text-[10px] text-slate-400 dark:text-slate-500">{link.url}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-0.5">
                <a href={formatUrl(link.url)} target="_blank" rel="noopener noreferrer" className="p-1 text-slate-400 hover:text-blue-600">
                  <ExternalLink className="h-3 w-3" />
                </a>
                {isEditing && (
                  <button type="button" onClick={() => onRemoveLink(index)} className="p-1 text-slate-400 hover:text-rose-500">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200/60 bg-white/40 p-2.5 text-center dark:border-slate-700/60 dark:bg-slate-900/30">
            <p className="text-xs font-medium text-slate-400">No additional links added.</p>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="mt-2 flex gap-1.5">
          <Input
            placeholder="Platform name"
            value={newLink.name}
            onChange={(e) => onLinkFieldChange("name", e.target.value)}
            className="h-8 flex-1 text-xs"
          />
          <Input
            placeholder="https://..."
            value={newLink.url}
            onChange={(e) => onLinkFieldChange("url", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), onAddLink())}
            className="h-8 flex-1 text-xs"
          />
          <Button
            type="button"
            size="sm"
            onClick={onAddLink}
            disabled={!newLink.name.trim() || !newLink.url.trim()}
            className="shrink-0 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      )}
    </div>
  );
}
