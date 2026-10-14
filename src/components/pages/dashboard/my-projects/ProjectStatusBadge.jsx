"use client";

const STATUS_STYLES = {
  "In Progress": {
    icon: "bg-blue-600 text-white dark:bg-blue-500",
    dot: "bg-blue-500",
  },
  "Under Review": {
    icon: "bg-amber-500 text-white dark:bg-amber-400",
    dot: "bg-amber-500",
  },
  Planning: {
    icon: "bg-amber-500 text-white dark:bg-amber-400",
    dot: "bg-amber-500",
  },
  Completed: {
    icon: "bg-emerald-600 text-white dark:bg-emerald-500",
    dot: "bg-emerald-500",
  },
  Blocked: {
    icon: "bg-red-600 text-white dark:bg-red-500",
    dot: "bg-red-500",
  },
};

const DEFAULT_STYLE = {
  icon: "bg-slate-500 text-white dark:bg-slate-400",
  dot: "bg-slate-400",
};

export function getStatusStyle(status) {
  return STATUS_STYLES[status] || DEFAULT_STYLE;
}

// Kept as a compatibility export for screens that still import this helper.
// Project cards now communicate status through the icon tooltip instead.
export default function ProjectStatusBadge() {
  return null;
}
