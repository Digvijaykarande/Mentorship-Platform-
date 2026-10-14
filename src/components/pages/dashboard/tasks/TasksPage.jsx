"use client";

import { useEffect, useMemo, useState } from "react";
import TasksHeader from "./TasksHeader";
import TaskFilters from "./TaskFilters";
import TaskList from "./TaskList";
import TaskDetails from "./TaskDetails";
import { INITIAL_TASKS, groupOf } from "./taskData";
import { INITIAL_SUBMISSIONS } from "../submit-work/submissionData";
import { getWorkspace, saveWorkspace, subscribeToWorkspace } from "../workspaceStore";

export default function TasksPage() {
  // Keep the first server and client render deterministic. localStorage is
  // loaded after mount so persisted data cannot cause a hydration mismatch.
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [selectedId, setSelectedId] = useState(INITIAL_TASKS[0]?.id ?? null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [project, setProject] = useState("all");

  useEffect(() => {
    // Submissions decide the state of the steps they are linked to, so they are loaded too.
    const workspace = getWorkspace(INITIAL_TASKS, [], INITIAL_SUBMISSIONS);
    setTasks(workspace.tasks);
    // /dashboard/tasks?task=ID opens that project (used by "View task" links).
    const wanted = new URLSearchParams(window.location.search).get("task");
    const target = wanted && workspace.tasks.find((task) => String(task.id) === wanted);
    setSelectedId(target ? target.id : (workspace.tasks[0]?.id ?? null));
    if (target) {
      setStatus("all");
      setProject("all");
      setSearch("");
      window.history.replaceState(null, "", window.location.pathname);
    }
    if (workspace.changed) {
      saveWorkspace({
        tasks: workspace.tasks,
        feedback: workspace.feedback,
        submissions: workspace.submissions,
      });
    }
  }, []);

  // Pick up mentor suggestions added from Feedback, in this tab and across tabs.
  useEffect(
    () =>
      subscribeToWorkspace((workspace) => {
        if (!workspace.tasks?.length) return;
        setTasks(workspace.tasks);
        setSelectedId((current) =>
          workspace.tasks.some((task) => task.id === current) ? current : workspace.tasks[0].id,
        );
      }),
    [],
  );

  const scoped = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter(
      (t) =>
        (project === "all" || t.project === project) &&
        (!q ||
          t.title.toLowerCase().includes(q) ||
          t.mentee.toLowerCase().includes(q) ||
          t.project.toLowerCase().includes(q)),
    );
  }, [tasks, search, project]);

  const counts = useMemo(
    () => ({
      all: scoped.length,
      todo: scoped.filter((t) => groupOf(t) === "todo").length,
      active: scoped.filter((t) => groupOf(t) === "active").length,
      done: scoped.filter((t) => groupOf(t) === "done").length,
    }),
    [scoped],
  );

  const visible = useMemo(
    () => (status === "all" ? scoped : scoped.filter((t) => groupOf(t) === status)),
    [scoped, status],
  );

  const selected = visible.find((t) => t.id === selectedId) ?? visible[0] ?? null;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-muted/30 px-4 py-6 font-sans text-[15px] leading-relaxed text-foreground antialiased sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <TasksHeader
          inProgressCount={tasks.filter((t) => t.status === "In progress").length}
          searchQuery={search}
          setSearchQuery={setSearch}
        />

        <TaskFilters
          status={status}
          setStatus={setStatus}
          project={project}
          setProject={setProject}
          counts={counts}
        />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <TaskList
            tasks={visible}
            selectedTaskId={selected?.id}
            onSelect={setSelectedId}
          />

          {selected && (
            <div className="lg:sticky lg:top-6">
              <TaskDetails key={selected.id} task={selected} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
