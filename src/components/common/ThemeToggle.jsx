"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Light/dark toggle button for the navbar. Mirrors the icon-button style
 * used by the sidebar trigger / search button so it sits in naturally.
 */
export default function ThemeToggle({ className }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid rendering theme-dependent UI until mounted (prevents hydration mismatch)
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
        className
      )}
    >
      <Sun className={cn("absolute h-4 w-4 transition-all", isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100")} />
      <Moon className={cn("absolute h-4 w-4 transition-all", isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0")} />
    </button>
  );
}
