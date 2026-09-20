"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Fixed top-right success toast (profile saved, settings saved, etc).
 */
export default function SaveToast({ show, title, description, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed right-4 top-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-xl border border-emerald-500/20 bg-white/95 p-3.5 shadow-xl backdrop-blur-md dark:bg-slate-900/95">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
        <Check className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-slate-900 dark:text-white">{title}</p>
        {description && (
          <p className="text-[10px] text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="h-6 w-6 shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
