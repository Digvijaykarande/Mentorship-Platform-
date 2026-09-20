import ProjectsHeader from "./ProjectsHeader";
import ProjectsSummary from "./ProjectsSummary";
import ActiveProjects from "./ActiveProjects";
import ProjectTasks from "./ProjectTasks";
import ProjectDetails from "./ProjectDetails";
import ProjectMilestones from "./ProjectMilestones";
import ProjectMentor from "./ProjectMentor";
import ProjectResources from "./ProjectResources";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <ProjectsHeader />
        <ProjectsSummary totalProjects={4} activeProjects={3} completedProjects={1} pendingTasks={5} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
            <ActiveProjects />
            <ProjectTasks />
            <ProjectMentor />
          </div>

          <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
            <ProjectDetails />
            <ProjectMilestones />
            <ProjectResources />
          </div>
        </div>
      </div>
    </div>
  );
}
