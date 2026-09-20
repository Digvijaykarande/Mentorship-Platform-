"use client";

import { Bell } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import ToggleField from "@/components/common/ToggleField";

export const NOTIFS = [
  ["courseUpdates", "Course Updates", "New courses and lessons"],
  ["assignmentAlerts", "Assignment Alerts", "Upcoming assignment reminders"],
  ["projectUpdates", "Project Updates", "Project activity updates"],
  ["mentorMessages", "Mentor Messages", "Mentor communication alerts"],
  ["internshipUpdates", "Internship Updates", "Internship announcements"],
];

export default function NotificationsCard({ notifications, onToggle, className }) {
  return (
    <SectionCard
      icon={Bell}
      title="Notifications"
      description="Configure active alerts"
      className={className}
      contentClassName="space-y-3 p-5"
    >
      {NOTIFS.map(([key, label, desc]) => (
        <div key={key} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0 dark:border-slate-800/60">
          <ToggleField checked={notifications[key]} onChange={() => onToggle(key)} label={label} description={desc} />
        </div>
      ))}
    </SectionCard>
  );
}
