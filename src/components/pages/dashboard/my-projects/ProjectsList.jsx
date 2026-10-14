"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Rocket } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "./ProjectCard";

export default function ProjectsList({
  projects = [],
  selectedProjectId,
  onSelectProject,
  compact = false,
}) {
  const pageSize = compact ? 4 : 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleProjects = projects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  useEffect(() => setPage(1), [projects.length, compact]);
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <SectionCard
      icon={Rocket}
      title="Your Projects"
      description={`${projects.length} ${projects.length === 1 ? "project" : "projects"} matching your filter`}
      iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
      action={
        compact ? (
          <Badge
            variant="outline"
            className="rounded-full border-indigo-200 bg-indigo-50/50 px-2 py-0.5 text-[10.5px] font-semibold text-indigo-600 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300"
          >
            {projects.length} Total
          </Badge>
        ) : (
          <span className="hidden text-xs font-medium text-slate-400 sm:block">
            Select a project to open its details
          </span>
        )
      }
      contentClassName={
        compact ? "space-y-2 p-2.5 sm:p-3" : "space-y-4 p-4 sm:p-2"
      }
    >
      {visibleProjects.length ? (
        <div
          className={
            compact
              ? "flex flex-col gap-2"
              : "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
          }
        >
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              compact={compact}
              selected={project.id === selectedProjectId}
              onSelect={() => onSelectProject(project.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={AlertCircle}
          title="No projects found"
          description="Try a different search term or status filter."
        />
      )}

      {totalPages > 1 && (
        <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
          {!compact && (
            <div className="flex items-center justify-between px-1 pb-2 text-[11px] text-slate-400">
              <span>
                Showing {(currentPage - 1) * pageSize + 1}–
                {Math.min(currentPage * pageSize, projects.length)} of{" "}
                {projects.length}
              </span>
              <span>
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </SectionCard>
  );
}
