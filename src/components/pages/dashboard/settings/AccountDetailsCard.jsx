"use client";

import { UserRound } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import FormField from "@/components/common/FormField";
import { Label } from "@/components/ui/label";

export default function AccountDetailsCard({ form, update }) {
  return (
    <SectionCard
      icon={UserRound}
      title="Account Details"
      description="Basic profile attributes"
      contentClassName="grid gap-4 p-5 sm:grid-cols-2"
    >
      <FormField label="Account Name" name="name" value={form.name} onChange={(e) => update("name", e.target.value)} />
      <FormField label="Email Address" name="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
      <FormField label="Account ID" name="accountId" value={form.accountId} disabled />

      <div className="space-y-1.5">
        <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Account Type</Label>
        <div className="flex h-9 items-center justify-between rounded-lg border border-slate-200/80 bg-slate-50/60 px-3 dark:border-slate-800 dark:bg-slate-900/40">
          <span className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
            {form.accountType}
          </span>
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600 ring-1 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
            Active
          </span>
        </div>
      </div>
    </SectionCard>
  );
}
