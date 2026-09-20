"use client";

import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Full class names so Tailwind can see them at build time.
const TONES = {
  blue: { bar: "bg-blue-500", dot: "bg-blue-500" },
  indigo: { bar: "bg-indigo-500", dot: "bg-indigo-500" },
  violet: { bar: "bg-violet-500", dot: "bg-violet-500" },
  emerald: { bar: "bg-emerald-500", dot: "bg-emerald-500" },
  amber: { bar: "bg-amber-500", dot: "bg-amber-500" },
  rose: { bar: "bg-rose-500", dot: "bg-rose-500" },
  sky: { bar: "bg-sky-500", dot: "bg-sky-500" },
};

/**
 * Label + value row above a coloured shadcn Progress bar.
 * Replaces the hand-made <div style={{ width }}> bars used across the progress page.
 *
 * value/max drive the bar. `display` overrides the right-hand text (default `${value}%`).
 * `hint` is a small line under the label, `badge` is any node shown next to the value.
 */
export default function MetricBar({
  label,
  value,
  max = 100,
  display,
  hint,
  badge,
  tone = "indigo",
  showDot = false,
  size = "md",
  className,
}) {
  const style = TONES[tone] ?? TONES.indigo;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {showDot && <span className={cn("size-2 shrink-0 rounded-full", style.dot)} />}
          <div className="min-w-0">
            <p className="truncate text-xs font-medium sm:text-[13px]">{label}</p>
            {hint && <p className="truncate text-[11px] text-muted-foreground">{hint}</p>}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {badge}
          <span className="text-xs font-semibold tabular-nums sm:text-[13px]">
            {display ?? `${value}%`}
          </span>
        </div>
      </div>

      <Progress value={value} max={max} aria-label={label} className="gap-0">
        <ProgressTrack className={size === "sm" ? "h-1.5" : "h-2"}>
          <ProgressIndicator className={cn("rounded-full", style.bar)} />
        </ProgressTrack>
      </Progress>
    </div>
  );
}
