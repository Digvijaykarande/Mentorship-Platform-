"use client";

import { UserRound, LayoutGrid, Settings } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABS = [
  { id: "overview", label: "Overview", icon: UserRound },
  { id: "details", label: "Details", icon: LayoutGrid },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function ProfileTabs() {
  return (
    <div className="-mx-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <TabsList variant="line" className="h-auto min-w-max justify-start gap-1 border-b border-slate-200/80 dark:border-slate-800/60">
        {TABS.map(({ id, label, icon: Icon }) => (
          <TabsTrigger
            key={id}
            value={id}
            className="min-h-10 gap-2 whitespace-nowrap px-3 text-xs font-semibold text-slate-500 data-[state=active]:text-slate-950 dark:text-slate-400 dark:data-[state=active]:text-white sm:px-4"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span>{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
