"use client";

import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Lightweight placeholder for profile tabs not yet built out (Details, Settings, Share).
 * Swap this out per-tab as those flows get designed.
 */
export default function ProfileComingSoon({ label }) {
  return (
    <Card className="rounded-2xl border border-dashed border-slate-200/80 bg-white/60 dark:border-slate-800/60 dark:bg-slate-900/40">
      <CardContent className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          <Sparkles className="h-5 w-5" />
        </div>
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{label} — coming soon</p>
        <p className="max-w-xs text-xs text-slate-400 dark:text-slate-500">
          This section is under construction and will be available shortly.
        </p>
      </CardContent>
    </Card>
  );
}
