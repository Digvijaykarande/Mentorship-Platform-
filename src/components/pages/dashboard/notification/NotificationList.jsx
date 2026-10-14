"use client";

import { Bell, CheckCheck, Inbox, Sparkles, Trash2 } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NotificationRow from "./NotificationRow";

function getGroup(notification) {
  if (notification.group) return notification.group;
  if (notification.isToday || notification.time?.toLowerCase?.().includes("min") || notification.time?.toLowerCase?.().includes("hour")) return "Today";
  return "Earlier";
}

export default function NotificationList({
  notifications = [],
  totalCount,
  unreadCount: totalUnread,
  filter = "all",
  onFilterChange,
  onToggleRead,
  onDelete,
  onMarkAllRead,
  onClearAll,
}) {
  // Use the overall counts when provided (the list only receives the current page).
  const unreadCount = totalUnread ?? notifications.filter((notification) => notification.unread).length;
  const allCount = totalCount ?? notifications.length;

  const groups = notifications.reduce((result, notification) => {
    const group = getGroup(notification);
    if (!result[group]) result[group] = [];
    result[group].push(notification);
    return result;
  }, {});
  const groupOrder = ["Today", "Yesterday", "Earlier"];
  const sortedGroups = Object.entries(groups).sort(([a], [b]) => {
    const aIndex = groupOrder.indexOf(a);
    const bIndex = groupOrder.indexOf(b);
    return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
  });

  const filterTabs = (
    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900/40 sm:px-7">
      <div className="flex items-center gap-1.5">
        {[
          { id: "all", label: "All", count: allCount },
          { id: "unread", label: "Unread", count: unreadCount },
          { id: "read", label: "Read", count: Math.max(0, allCount - unreadCount) },
        ].map((tab) => (
          <Button
            key={tab.id}
            type="button"
            variant={filter === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange?.(tab.id)}
            className={cn(
              "h-7 rounded-lg px-2.5 text-xs font-semibold transition",
              filter === tab.id
                ? "bg-indigo-600 text-white shadow-xs hover:bg-indigo-700 dark:bg-indigo-600"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            )}
          >
            {tab.label}
            <span
              className={cn(
                "ml-1.5 rounded-full px-1.5 py-0.2 text-[10px]",
                filter === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-slate-200/80 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              )}
            >
              {tab.count}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <section aria-label="Notifications" className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-none">
      <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-5 py-5 dark:border-slate-800 dark:from-indigo-950/40 dark:via-slate-950 dark:to-sky-950/30 sm:px-7 sm:py-6">
        <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-indigo-400/15 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 dark:bg-indigo-500"><Bell className="h-5 w-5" /></div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">Your notifications</h2>
                {unreadCount > 0 && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">{unreadCount} unread</span>}
              </div>
              <p className="mt-1 max-w-xl text-sm text-slate-500 dark:text-slate-400">Stay on top of mentor feedback, task reviews, and cohort activity.</p>
            </div>
          </div>
          {(onMarkAllRead || onClearAll) && (
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {onMarkAllRead && unreadCount > 0 && (
                <Button type="button" variant="outline" size="sm" onClick={onMarkAllRead} className="gap-2 bg-white/70 text-xs dark:bg-slate-900/70">
                  <CheckCheck className="h-3.5 w-3.5" />Mark all read
                </Button>
              )}
              {onClearAll && allCount > 0 && (
                <Button type="button" variant="outline" size="sm" onClick={onClearAll} className="gap-2 bg-white/70 text-xs text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:bg-slate-900/70 dark:text-rose-400 dark:hover:bg-rose-950/40">
                  <Trash2 className="h-3.5 w-3.5" />Delete all
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {filterTabs}

      {notifications.length === 0 ? (
        <div className="p-8">
          <EmptyState
            icon={Inbox}
            title={filter === "unread" ? "No unread notifications" : filter === "read" ? "No read notifications" : "You're all caught up"}
            description={
              filter === "unread"
                ? "There are no unread notifications waiting for you."
                : filter === "read"
                ? "You haven't read any notifications yet."
                : "New activity from your mentors and cohort will appear here."
            }
          />
        </div>
      ) : (
        <div className="px-3 py-4 sm:px-7 sm:py-6">
          {sortedGroups.map(([group, items]) => (
            <div key={group} className="not-last:mb-7">
              <div className="mb-3 flex items-center gap-3 px-1">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">{group}</h3>
                <span className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                <span className="text-[11px] font-medium text-slate-400">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map((notification) => (
                  <NotificationRow key={notification.id} notification={notification} onToggleRead={onToggleRead} onDelete={onDelete} />
                ))}
              </div>
            </div>
          ))}
          <div className="mt-7 flex items-center justify-center gap-2 border-t border-dashed border-slate-200 pt-5 text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
            <Sparkles className="h-3.5 w-3.5" />You’re up to date with everything shown here
          </div>
        </div>
      )}
    </section>
  );
}