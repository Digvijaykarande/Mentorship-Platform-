"use client";

import { cn } from "@/lib/utils";

/**
 * Labeled on/off switch used in Settings (notifications, 2FA, compact sidebar, etc).
 */
export default function ToggleField({ checked, onChange, label, description, className }) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {label && (
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{label}</p>
          {description && (
            <p className="text-[11px] text-slate-400 dark:text-slate-500">{description}</p>
          )}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30",
          checked
            ? "bg-blue-600 shadow-xs shadow-blue-500/30 dark:bg-blue-500"
            : "bg-slate-200 dark:bg-slate-800"
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-xs transition-transform duration-200",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}
