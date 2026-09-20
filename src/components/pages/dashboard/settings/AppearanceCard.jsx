"use client";

import { Palette, Monitor, Sun, Moon, Globe } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import ToggleField from "@/components/common/ToggleField";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  ["light", Sun, "Light"],
  ["dark", Moon, "Dark"],
];

const LANGUAGES = ["English", "Marathi", "Hindi"];

export default function AppearanceCard({ theme, setTheme, mounted, form, update, className }) {
  return (
    <SectionCard
      icon={Palette}
      title="Appearance"
      description="Theme & UI preferences"
      className={className}
      contentClassName="space-y-4 p-5"
    >
      <div>
        <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          <span>Theme</span>
          <Monitor className="h-3.5 w-3.5 text-slate-400" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {THEME_OPTIONS.map(([key, Icon, label]) => {
            const isActive = mounted && theme === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTheme(key)}
                className={cn(
                  "flex h-9 items-center justify-center gap-2 rounded-lg border text-xs font-semibold transition-all duration-200",
                  isActive
                    ? "border-blue-500/80 bg-blue-50/80 text-blue-600 shadow-xs ring-1 ring-blue-500/20 dark:border-blue-500/50 dark:bg-blue-500/10 dark:text-blue-400"
                    : "border-slate-200/80 bg-white/90 text-slate-600 hover:border-slate-300 hover:bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800/60"
                )}
              >
                <Icon className="h-3.5 w-3.5" /> {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          <Globe className="h-3.5 w-3.5 text-slate-400" /> Language
        </Label>
        <Select value={form.language} onValueChange={(val) => update("language", val)}>
          <SelectTrigger className="w-full text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-3.5 dark:border-slate-800/80 dark:bg-slate-900/40">
        <ToggleField
          checked={form.compactSidebar}
          onChange={(val) => update("compactSidebar", val)}
          label="Compact Sidebar"
          description="Minimize sidebar width"
        />
      </div>
    </SectionCard>
  );
}
