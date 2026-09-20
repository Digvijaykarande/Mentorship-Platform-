"use client";

import { Building2 } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";

const FIELDS = [
  { label: "Intern ID", name: "internId" },
  { label: "Company", name: "company" },
  { label: "Duration", name: "internshipDuration" },
];

export default function InternshipCard({ formData }) {
  return (
    <SectionCard
      icon={Building2}
      title="Internship"
      description="Current program"
      iconClassName="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
      contentClassName="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {FIELDS.map(({ label, name }) => (
        <div key={name} className="space-y-1">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</span>
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{formData[name]}</p>
        </div>
      ))}
      <div className="space-y-1">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Status</span>
        <Badge className="rounded-full border border-emerald-200/60 bg-emerald-50/60 px-2.5 py-0.5 text-xs text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-400">
          {formData.internshipStatus}
        </Badge>
      </div>
    </SectionCard>
  );
}
