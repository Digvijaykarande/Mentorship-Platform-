"use client";

import { Sparkles, Plus, X } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Deterministic color rotation so the tag cloud reads lively without random reflows on re-render.
const TONES = [
  "border-indigo-200/70 bg-indigo-50 text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300",
  "border-blue-200/70 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300",
  "border-violet-200/70 bg-violet-50 text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300",
  "border-emerald-200/70 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300",
  "border-amber-200/70 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300",
  "border-rose-200/70 bg-rose-50 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300",
];

export default function SkillsCard({ skills, isEditing, newSkill, setNewSkill, handleAddSkill, handleRemoveSkill, className }) {
  return (
    <SectionCard
      icon={Sparkles}
      title="Skills"
      description={`${skills.length} skill${skills.length !== 1 ? "s" : ""}`}
      iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
      className={className}
      contentClassName="space-y-3 p-5"
    >
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <Badge
            key={skill}
            variant="outline"
            className={cn("gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-transform hover:-translate-y-0.5", TONES[i % TONES.length])}
          >
            {skill}
            {isEditing && (
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </Badge>
        ))}
        {skills.length === 0 && (
          <p className="text-xs italic text-slate-400 dark:text-slate-600">No skills added yet.</p>
        )}
      </div>

      {isEditing && (
        <div className="flex gap-1.5 border-t border-slate-100 pt-3 dark:border-slate-800">
          <Input
            placeholder="Add a skill and press Enter..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
            className="h-8 flex-1 text-xs"
          />
          <Button type="button" size="icon-sm" onClick={handleAddSkill} className="shrink-0 bg-indigo-600 text-white hover:bg-indigo-700">
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </SectionCard>
  );
}