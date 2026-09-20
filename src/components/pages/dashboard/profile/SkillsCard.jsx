"use client";

import { Sparkles, Plus, X } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SkillsCard({ skills, isEditing, newSkill, setNewSkill, handleAddSkill, handleRemoveSkill, className }) {
  return (
    <SectionCard
      icon={Sparkles}
      title="Skills"
      description="Expertise"
      iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
      className={className}
      contentClassName="space-y-3 p-5"
    >
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="rounded-md border border-slate-200/60 bg-slate-50/60 px-2 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-700/60 dark:bg-slate-800/40 dark:text-slate-300"
          >
            {skill}
            {isEditing && (
              <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-1 text-slate-400 hover:text-rose-500">
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </Badge>
        ))}
        {skills.length === 0 && <p className="text-xs italic text-slate-400 dark:text-slate-600">No skills added yet.</p>}
      </div>

      {isEditing && (
        <div className="flex gap-1.5">
          <Input
            placeholder="Add skill..."
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
