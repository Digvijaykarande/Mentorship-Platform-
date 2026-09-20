"use client";

import { User, Target, Heart, Lightbulb } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import FormField from "@/components/common/FormField";

const FIELDS = [
  { name: "bio", label: "Bio", icon: User, rows: 3 },
  { name: "careerInterests", label: "Career Interests", icon: Target, rows: 2 },
  { name: "areasOfInterest", label: "Areas of Interest", icon: Heart, rows: 2 },
  { name: "professionalGoals", label: "Professional Goals", icon: Lightbulb, rows: 2 },
];

export default function AboutSection({ isEditing, formData, handleChange }) {
  return (
    <SectionCard
      icon={User}
      title="About Me"
      description="Personal summary"
      iconClassName="bg-slate-900 text-white dark:bg-white dark:text-slate-900"
      contentClassName="grid gap-5 p-5 sm:grid-cols-2"
    >
      {FIELDS.map(({ name, label, icon, rows }) => (
        <FormField
          key={name}
          name={name}
          label={label}
          icon={icon}
          as="textarea"
          rows={rows}
          isEditing={isEditing}
          value={formData?.[name]}
          onChange={handleChange}
          emptyText="Not provided"
          className={name === "bio" ? "sm:col-span-2" : ""}
        />
      ))}
    </SectionCard>
  );
}
