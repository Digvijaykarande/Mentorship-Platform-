"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Generic section wrapper used across Profile & Settings pages.
 * Keeps icon/title/description header consistent everywhere.
 */
export default function SectionCard({
  icon: Icon,
  iconClassName = "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:border-slate-800/70 dark:bg-slate-900/70",
        className,
      )}
    >
      <CardHeader className="flex-row items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/40 px-5 py-3.5 dark:border-slate-800/60 dark:bg-slate-900/30" style={{display: 'flex'}}>
        <div className="flex items-center gap-3">
          {Icon && (
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ring-black/[0.03] dark:ring-white/[0.04]",
                iconClassName,
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
          )}
          <div>
            <CardTitle className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              {title}
            </CardTitle>
            {description && (
              <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                {description}
              </p>
            )}
          </div>
        </div>

        <div>
          {action}
        </div>
      </CardHeader>

      <CardContent className={cn("p-5", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
