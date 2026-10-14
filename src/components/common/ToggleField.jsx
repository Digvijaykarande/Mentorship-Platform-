"use client";

import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

/**
 * Labeled on/off switch used in Settings (notifications, 2FA, compact sidebar, etc).
 * Uses the shadcn Switch component.
 */
export default function ToggleField({ checked, onChange, label, description, className, disabled = false }) {
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
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        aria-label={label}
      />
    </div>
  );
}
