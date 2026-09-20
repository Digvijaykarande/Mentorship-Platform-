import React from "react";

const STATUS_STYLES = {
  "Active Focus": "bg-indigo-50 text-indigo-600 border border-indigo-100",
  "Under Review": "bg-amber-50 text-amber-700 border border-amber-100",
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Blocked: "bg-red-50 text-red-600 border border-red-100",
  Upcoming: "bg-gray-100 text-gray-500 border border-gray-200",
};

export default function ProjectStatus({ status, onClick, className = "" }) {
  const style = STATUS_STYLES[status] ?? "bg-gray-100 text-gray-500 border border-gray-200";
  const isClickable = Boolean(onClick);

  return (
    <span
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold tracking-wide w-fit transition-all ${style} ${
        isClickable ? "cursor-pointer hover:opacity-80 active:scale-95" : ""
      } ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "Active Focus"
            ? "bg-indigo-500 animate-pulse"
            : status === "Under Review"
            ? "bg-amber-500"
            : status === "Completed"
            ? "bg-emerald-500"
            : status === "Blocked"
            ? "bg-red-500"
            : "bg-gray-400"
        }`}
      />
      {status}
    </span>
  );
}