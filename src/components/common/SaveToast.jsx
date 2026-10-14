"use client";

import { AlertCircle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Fixed top-right toast (profile saved, settings saved, validation errors, etc).
 */
export default function SaveToast({ show, title, description, onClose, variant = "success" }) {
  if (!show) return null;

  const isError = variant === "error";

  return (
    <div
      role="status"
      className={cn(
        "fixed right-4 top-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-xl border p-3.5 shadow-xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-top-2",
        isError
          ? "border-rose-500/30 bg-white/95 text-rose-900 dark:bg-slate-900/95 dark:text-rose-100"
          : "border-emerald-500/20 bg-white/95 dark:bg-slate-900/95"
      )}
    >
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
          isError
            ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
            : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        )}
      >
        {isError ? <AlertCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-slate-900 dark:text-white">{title}</p>
        {description && (
          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{description}</p>
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
