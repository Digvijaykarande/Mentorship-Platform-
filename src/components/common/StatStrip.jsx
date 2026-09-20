"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TONES = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
};

const DELTA_TONES = {
  positive: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  negative: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  neutral: "bg-muted text-muted-foreground",
};

/**
 * Compact row of headline metrics inside a single card.
 * A lighter alternative to SummaryCards when a page needs 3-4 numbers at a glance.
 *
 * items: [{ key, label, value, suffix?, icon, tone?, delta?: { text, tone }, hint? }]
 * columns: Tailwind grid class applied from `lg` up (default 4 columns).
 * On small screens the strip is always 2 columns, so prefer an even item count.
 */
export default function StatStrip({
  items = [],
  columns = "lg:grid-cols-4",
  className,
}) {
  return (
    <Card className={cn("gap-0 overflow-hidden py-0 shadow-xs", className)}>
      <div className={cn("grid grid-cols-2 gap-px bg-border", columns)}>
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.key ?? item.label} className="flex items-start gap-3 bg-card p-4">
              {Icon && (
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                    TONES[item.tone] ?? TONES.blue
                  )}
                >
                  <Icon className="size-4" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-muted-foreground">{item.label}</p>

                <p className="mt-0.5 flex items-baseline gap-1">
                  <span className="text-2xl font-semibold leading-none tracking-tight tabular-nums">
                    {item.value}
                  </span>
                  {item.suffix && (
                    <span className="text-sm font-medium text-muted-foreground">
                      {item.suffix}
                    </span>
                  )}
                </p>

                {(item.delta || item.hint) && (
                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                    {item.delta && (
                      <Badge
                        variant="secondary"
                        className={cn(
                          "h-5 px-1.5 text-[11px] font-medium",
                          DELTA_TONES[item.delta.tone] ?? DELTA_TONES.neutral
                        )}
                      >
                        {item.delta.text}
                      </Badge>
                    )}
                    {item.hint && (
                      <span className="text-[11px] text-muted-foreground">{item.hint}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
