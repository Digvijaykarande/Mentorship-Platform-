"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TONES = {
  blue: {
    wash: "from-blue-50 dark:from-blue-500/10",
    ring: "ring-blue-600/10 dark:ring-blue-400/10",
    icon: "bg-blue-600 text-white dark:bg-blue-500",
    stroke: "#2563eb",
  },
  indigo: {
    wash: "from-indigo-50 dark:from-indigo-500/10",
    ring: "ring-indigo-600/10 dark:ring-indigo-400/10",
    icon: "bg-indigo-600 text-white dark:bg-indigo-500",
    stroke: "#4f46e5",
  },
  emerald: {
    wash: "from-emerald-50 dark:from-emerald-500/10",
    ring: "ring-emerald-600/10 dark:ring-emerald-400/10",
    icon: "bg-emerald-600 text-white dark:bg-emerald-500",
    stroke: "#059669",
  },
  amber: {
    wash: "from-amber-50 dark:from-amber-500/10",
    ring: "ring-amber-600/10 dark:ring-amber-400/10",
    icon: "bg-amber-600 text-white dark:bg-amber-500",
    stroke: "#d97706",
  },
  violet: {
    wash: "from-violet-50 dark:from-violet-500/10",
    ring: "ring-violet-600/10 dark:ring-violet-400/10",
    icon: "bg-violet-600 text-white dark:bg-violet-500",
    stroke: "#7c3aed",
  },
  rose: {
    wash: "from-rose-50 dark:from-rose-500/10",
    ring: "ring-rose-600/10 dark:ring-rose-400/10",
    icon: "bg-rose-600 text-white dark:bg-rose-500",
    stroke: "#e11d48",
  },
};

// Deterministic wobble so cards without explicit `spark` data still carry a believable backdrop line.
function fallbackSpark(seed = 6) {
  let value = 50;
  return Array.from({ length: 14 }, (_, i) => {
    value += ((((seed + i) * 47) % 23) - 11);
    value = Math.max(15, Math.min(85, value));
    return value;
  });
}

function Backdrop({ points, stroke, gradientId }) {
  const width = 240;
  const height = 64;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / range) * (height - 6) - 3;
    return [x, y];
  });

  const linePath = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full opacity-70"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
      <path d={linePath} fill="none" stroke={stroke} strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Metric tile with a full-tint color wash, a backdrop sparkline sitting quietly
 * behind the headline number, and the trend delta inline next to the value.
 */
export default function MiniStatCard({
  icon: Icon,
  label,
  value,
  tone = "blue",
  trend,
  trendDirection,
  trendLabel,
  spark,
  showSpark = true,
  className,
}) {
  const palette = TONES[tone] ?? TONES.blue;
  const points = spark?.length > 1 ? spark : fallbackSpark(label?.length ?? 6);
  const direction = trendDirection || (typeof trend === "string" && trend.trim().startsWith("-") ? "down" : "up");
  const isUp = direction === "up";
  const gradientId = `miniStatBackdrop-${tone}-${(label ?? "stat").replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gradient-to-b to-white p-4 ring-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:to-slate-900",
        palette.wash,
        palette.ring,
        className
      )}
    >
      {showSpark && <Backdrop points={points} stroke={palette.stroke} gradientId={gradientId} />}

      <div className="relative flex items-center justify-between gap-2">
        <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
        {Icon && (
          <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full shadow-sm transition-transform duration-200 group-hover:scale-105", palette.icon)}>
            <Icon className="h-3.5 w-3.5" />
          </div>
        )}
      </div>

      <div className="relative mt-3 flex items-end justify-between gap-2">
        <p className="text-[1.75rem] font-bold leading-none tracking-tight text-slate-900 dark:text-white">{value}</p>

        {trend && (
          <span
            className={cn(
              "mb-0.5 flex items-center gap-0.5 text-xs font-bold",
              isUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            )}
          >
            {isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {trend}
          </span>
        )}
      </div>

      {trendLabel && <p className="relative mt-1 text-[10.5px] text-slate-400 dark:text-slate-500">{trendLabel}</p>}
    </div>
  );
}
