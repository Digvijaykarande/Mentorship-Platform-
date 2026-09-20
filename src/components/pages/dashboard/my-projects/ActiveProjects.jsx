"use client";

import { Rocket } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import ProjectCard from "./ProjectCard";
import { activeProjects } from "./projectsData";

export default function ActiveProjects() {
  return (
    <SectionCard
      icon={Rocket}
      title="Active Internship Projects"
      description={`${activeProjects.length} projects in progress`}
      iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
      contentClassName="space-y-1 p-2"
    >
      {activeProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </SectionCard>
  );
}
