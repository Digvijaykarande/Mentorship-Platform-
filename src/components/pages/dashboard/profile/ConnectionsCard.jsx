"use client";

import { Share2, Code2, BriefcaseBusiness, Globe, Link as LinkIcon } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import LinkField from "@/components/common/LinkField";
import OtherLinksList from "./OtherLinksList";

const LINK_FIELDS = [
  { label: "LinkedIn", name: "linkedin", icon: LinkIcon, iconClassName: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" },
  { label: "GitHub", name: "github", icon: Code2, iconClassName: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-200" },
  { label: "Portfolio", name: "portfolio", icon: BriefcaseBusiness, iconClassName: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400" },
  { label: "Website", name: "website", icon: Globe, iconClassName: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" },
];

export default function ConnectionsCard({
  formData,
  isEditing,
  handleChange,
  newLink,
  onLinkFieldChange,
  onAddLink,
  onRemoveLink,
}) {
  return (
    <SectionCard
      icon={Share2}
      title="Connections"
      description="Social & links"
      iconClassName="bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"
      contentClassName="space-y-3 p-5"
    >
      <div className="grid gap-2.5 sm:grid-cols-2">
        {LINK_FIELDS.map((field) => (
          <LinkField
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
            isEditing={isEditing}
          />
        ))}
      </div>

      <OtherLinksList
        links={formData.otherLinks}
        isEditing={isEditing}
        newLink={newLink}
        onLinkFieldChange={onLinkFieldChange}
        onAddLink={onAddLink}
        onRemoveLink={onRemoveLink}
      />
    </SectionCard>
  );
}
