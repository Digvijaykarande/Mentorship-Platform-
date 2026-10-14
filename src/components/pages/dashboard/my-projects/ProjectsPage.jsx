"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import ProjectsHeader from "./ProjectsHeader";
import ProjectsSummary from "./ProjectsSummary";
import ProjectsList from "./ProjectsList";
import ProjectMentorCard from "./ProjectMentorCard";
import ProjectOverview from "./ProjectOverview";
import ProjectDocumentation from "./ProjectDocumentation";

import ProjectResourcesPanel from "./ProjectResourcesPanel";
import { projects, summaryStats } from "./projectsData";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState(
    () => projects.find((p) => p.featured)?.id ?? projects[0]?.id ?? null,
  );

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        [
          project.name,
          project.repoPath,
          project.description,
          ...(project.tags || []),
        ].some((value) => String(value).toLowerCase().includes(query));
      return (
        matchesSearch &&
        (selectedStatus === "All" || project.statusLabel === selectedStatus)
      );
    });
  }, [searchQuery, selectedStatus]);

  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ??
    filteredProjects[0] ??
    null;
  const handleSelectProject = (id) => setSelectedProjectId(id);
  const handleCloseDetail = () => setSelectedProjectId(null);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f7f8fc] px-4 py-5 font-sans text-slate-800 antialiased dark:bg-background dark:text-slate-200 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
        <ProjectsHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          projectCount={filteredProjects.length}
        />

        <section className="space-y-3">
          <div className="flex items-end justify-between gap-4 px-1">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-500">
                Portfolio overview
              </p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                A clearer view of your progress
              </h2>
            </div>
            <span className="hidden text-xs text-slate-400 sm:block">
              Your projects, milestones, and support in one place
            </span>
          </div>
          <ProjectsSummary
            totalProjects={summaryStats.totalProjects}
            activeProjects={summaryStats.activeProjects}
            completedProjects={summaryStats.completedProjects}
            pendingTasks={summaryStats.pendingTasks}
          />
        </section>

        {selectedProject ? (
          <>
            <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
              <div className="min-w-0 lg:col-span-4">
                <ProjectsList
                  projects={filteredProjects}
                  selectedProjectId={selectedProject.id}
                  onSelectProject={handleSelectProject}
                  compact
                />
              </div>
              <div className="relative min-w-0 lg:col-span-8">
                <ProjectOverview project={selectedProject} />
                <button
                  type="button"
                  onClick={handleCloseDetail}
                  title="Close Project Details"
                  className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="min-w-0">
              <ProjectDocumentation project={selectedProject} />
            </div>

            <div className="flex w-full min-w-0 flex-row gap-5">
              <ProjectMentorCard project={selectedProject} />

              <ProjectResourcesPanel project={selectedProject} />
            </div>
          </>
        ) : (
          <ProjectsList
            projects={filteredProjects}
            selectedProjectId={null}
            onSelectProject={handleSelectProject}
          />
        )}
      </div>
    </div>
  );
}