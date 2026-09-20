"use client";

import { FolderKanban } from "lucide-react";

import Header from "@/components/common/Header";

export default function ProjectsHeader({
  searchQuery = "",
  setSearchQuery = () => {},
  selectedStatus = "All",
  setSelectedStatus = () => {},
}) {
  return (
    <Header
      title="My Projects"
      description="Track your projects, progress, tasks, and milestones"
      icon={FolderKanban}
      iconBg="bg-blue-50 dark:bg-blue-500/10"
      iconColor="text-blue-600 dark:text-blue-400"
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      searchPlaceholder="Search projects..."
      filterValue={selectedStatus}
      setFilterValue={setSelectedStatus}
      filterPlaceholder="All Statuses"
      filterOptions={[
        {
          value: "All",
          label: "All Statuses",
        },
        {
          value: "In Progress",
          label: "In Progress",
        },
        {
          value: "Under Review",
          label: "Under Review",
        },
        {
          value: "Completed",
          label: "Completed",
        },
        {
          value: "Planning",
          label: "Planning",
        },
      ]}
    />
  );
}