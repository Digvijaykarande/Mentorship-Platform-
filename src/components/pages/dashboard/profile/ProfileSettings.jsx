"use client";

import { Eye, Bell, Palette, KeyRound, ChevronRight } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

function Row({ label, description, control }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</p>
        {description && <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

export default function ProfileSettings() {
  const [visibility, setVisibility] = useState("public");
  const [notifyReview, setNotifyReview] = useState(true);
  const [notifyFeedback, setNotifyFeedback] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [defaultTab, setDefaultTab] = useState("overview");

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <SectionCard
        icon={Eye}
        title="Visibility"
        description="Who can see your profile"
        iconClassName="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
        contentClassName="divide-y divide-slate-100 px-5 dark:divide-slate-800"
      >
        <Row
          label="Profile visibility"
          description="Control who can view your full profile"
          control={
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger className="h-8 w-32 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="cohort">Cohort only</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          }
        />
        <Row
          label="Show email on profile"
          description="Visible to mentors and cohort members"
          control={<Switch checked={showEmail} onCheckedChange={setShowEmail} />}
        />
        <Row
          label="Default landing tab"
          description="Tab shown first when you open your profile"
          control={
            <Select value={defaultTab} onValueChange={setDefaultTab}>
              <SelectTrigger className="h-8 w-32 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="details">Details</SelectItem>
              </SelectContent>
            </Select>
          }
        />
      </SectionCard>

      <SectionCard
        icon={Bell}
        title="Notifications"
        description="Profile-related alerts"
        iconClassName="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
        contentClassName="divide-y divide-slate-100 px-5 dark:divide-slate-800"
      >
        <Row
          label="Task review updates"
          description="When a mentor reviews your submission"
          control={<Switch checked={notifyReview} onCheckedChange={setNotifyReview} />}
        />
        <Row
          label="Profile feedback"
          description="Comments or endorsements on your profile"
          control={<Switch checked={notifyFeedback} onCheckedChange={setNotifyFeedback} />}
        />
      </SectionCard>

      <SectionCard
        icon={Palette}
        title="Appearance"
        description="Personalize your view"
        iconClassName="bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
        contentClassName="px-5"
      >
        <Row
          label="Theme"
          description="Switch between light and dark mode"
          control={
            <Select defaultValue="system">
              <SelectTrigger className="h-8 w-32 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          }
        />
      </SectionCard>

      <SectionCard
        icon={KeyRound}
        title="Account"
        description="Security & access"
        iconClassName="bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
        contentClassName="p-5"
      >
        <Button type="button" variant="outline" className="w-full justify-between text-sm font-medium">
          Change password
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </Button>
      </SectionCard>
    </div>
  );
}
