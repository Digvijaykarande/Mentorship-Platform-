"use client";

import { User } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import FormField from "@/components/common/FormField";

const PERSONAL_FIELDS = [
  { label: "First Name", name: "firstName" },
  { label: "Last Name", name: "lastName" },
  { label: "Username", name: "username" },
  { label: "Date of Birth", name: "dob" },
  { label: "Gender", name: "gender" },
  { label: "Location", name: "location" },
  { label: "Phone", name: "phone" },
  { label: "Address", name: "address", fullWidth: true },
];

export default function PersonalDetailsCard({ formData, isEditing, handleChange, className }) {
  return (
    <SectionCard
      icon={User}
      title="Personal Details"
      description="Basic info"
      iconClassName="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
      className={className}
      contentClassName="grid gap-4 p-5 sm:grid-cols-2"
    >
      {PERSONAL_FIELDS.map(({ label, name, fullWidth }) => (
        <FormField
          key={name}
          label={label}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          isEditing={isEditing}
          className={fullWidth ? "sm:col-span-2" : ""}
        />
      ))}
    </SectionCard>
  );
}
