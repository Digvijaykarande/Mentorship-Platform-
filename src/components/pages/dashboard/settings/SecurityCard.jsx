"use client";

import { useState } from "react";
import { ShieldCheck, Eye, EyeOff, LogIn } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import FormField from "@/components/common/FormField";
import ToggleField from "@/components/common/ToggleField";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SecurityCard({ form, update, className }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <SectionCard
      icon={ShieldCheck}
      title="Security"
      description="Password & authentication"
      className={className}
      contentClassName="space-y-4 p-5"
    >
      <div className="space-y-1.5">
        <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Current Password</Label>
        <div className="relative">
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Enter current password"
            value={form.currentPass}
            onChange={(e) => update("currentPass", e.target.value)}
            className="pr-9 text-xs"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
          >
            {showPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      <FormField
        label="New Password"
        name="newPass"
        type="password"
        placeholder="New password"
        value={form.newPass}
        onChange={(e) => update("newPass", e.target.value)}
      />
      <FormField
        label="Confirm Password"
        name="confirmPass"
        type="password"
        placeholder="Confirm password"
        value={form.confirmPass}
        onChange={(e) => update("confirmPass", e.target.value)}
      />

      <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-3.5 dark:border-slate-800/80 dark:bg-slate-900/40">
        <ToggleField
          checked={form.twoFactor}
          onChange={(val) => update("twoFactor", val)}
          label="Two-Factor Auth"
          description="Enhanced security layer"
        />
      </div>

      <Button type="button" variant="outline" size="sm" className="w-full gap-1.5 sm:w-auto">
        <LogIn className="h-3.5 w-3.5 text-slate-400" />
        Active Sessions
      </Button>
    </SectionCard>
  );
}
