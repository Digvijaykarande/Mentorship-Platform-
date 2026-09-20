"use client";

import { UserRound, LayoutGrid, Settings, Share2 } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABS = [
  { id: "overview", label: "Overview", icon: UserRound },
  { id: "details", label: "Details", icon: LayoutGrid },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "share", label: "Share", icon: Share2 },
];

/**
 * Tab-bar only — must be rendered inside a parent <Tabs> from @/components/ui/tabs.
 */
export default function ProfileTabs() {
  return (
    <TabsList variant="line" className="w-full justify-start border-b border-slate-200/80 dark:border-slate-800/60">
      {TABS.map(({ id, label, icon: Icon }) => (
        <TabsTrigger
          key={id}
          value={id}
          className="gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 data-active:text-slate-900 dark:text-slate-400 dark:data-active:text-white"
        >
          <Icon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

