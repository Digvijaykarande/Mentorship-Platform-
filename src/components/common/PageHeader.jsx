"use client";

/**
 * Shared page-level header: title + subtitle on the left, action buttons on the right.
 * Used by Profile Management, Settings, and future dashboard sub-pages.
 */
export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{subtitle}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
