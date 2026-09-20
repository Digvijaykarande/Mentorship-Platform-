"use client";

import { Database, Download, ShieldCheck } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";

export default function DataPrivacyCard({ onExport, className }) {
  return (
    <SectionCard
      icon={Database}
      title="Data & Privacy"
      description="Export and data policies"
      className={className}
      contentClassName="space-y-3.5 p-5"
    >
      <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
        <p className="text-xs font-semibold text-slate-900 dark:text-white">Export Settings</p>
        <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">Download configuration file as JSON</p>
        <Button type="button" variant="outline" size="sm" onClick={onExport} className="mt-3.5 gap-1.5">
          <Download className="h-3.5 w-3.5 text-slate-400" />
          Export JSON
        </Button>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-50/40 p-3.5 dark:bg-emerald-500/5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Privacy Protection Active</p>
          <p className="text-[10px] text-emerald-600/90 dark:text-emerald-400/80">Your data is strictly encrypted and protected.</p>
        </div>
      </div>
    </SectionCard>
  );
}
