"use client";

import { useState } from "react";
import { ListChecks, Plus, AlertCircle } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import FilterTabs from "@/components/common/FilterTabs";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import TaskRow from "./TaskRow";
import AddTaskDialog from "./AddTaskDialog";
import { sprintTasks as initialTasks } from "./projectsData";

export default function ProjectTasks() {
  const PAGE_SIZE = 4;
  const [tasks, setTasks] = useState(initialTasks || []);
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState(() => new Set(tasks.filter((t) => t.completed).map((t) => t.id)));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Module Task", dueDate: "" });

  const changeTab = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const toggleTask = (id) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setChecked((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleAddTask = () => {
    if (!form.title.trim()) return;
    setTasks((prev) => [
      {
        id: Date.now(),
        title: form.title,
        badgeLabel: form.category,
        badgeTone: "primary-fixed",
        dueLabel: form.dueDate ? `Due ${form.dueDate}` : "Due Today",
        dueTone: "neutral",
        completedLabel: "Submitted",
        assignee: { initials: "IN", tone: "primary" },
        completed: false,
      },
      ...prev,
    ]);
    setForm({ title: "", category: "Module Task", dueDate: "" });
    setIsModalOpen(false);
  };

  const pendingCount = tasks.filter((t) => !checked.has(t.id)).length;
  const completedCount = tasks.filter((t) => checked.has(t.id)).length;
  const completionPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const visibleTasks = tasks.filter((task) => {
    if (activeTab === "pending") return !checked.has(task.id);
    if (activeTab === "completed") return checked.has(task.id);
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(visibleTasks.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedTasks = visibleTasks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const TABS = [
    { value: "all", label: "All", count: tasks.length },
    { value: "pending", label: "Pending", count: pendingCount },
    { value: "completed", label: "Completed", count: completedCount },
  ];

  return (
    <SectionCard
      icon={ListChecks}
      title="Action Items & Deliverables"
      description="Cohort tracking"
      iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
      action={<FilterTabs options={TABS} value={activeTab} onChange={changeTab} />}
      contentClassName="space-y-4 p-2"
    >
      <div className="flex flex-col gap-2.5">
        {pagedTasks.length === 0 ? (
          <EmptyState icon={AlertCircle} title="No deliverables found" description="Nothing to show in this view." />
        ) : (
          pagedTasks.map((task) => (
            <TaskRow key={task.id} task={task} isChecked={checked.has(task.id)} onToggle={toggleTask} onDelete={deleteTask} />
          ))
        )}
      </div>

      <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10.5px] font-semibold text-slate-500 dark:text-slate-400">
          <span>Overall Completion</span>
          <span className="font-mono text-slate-400 dark:text-slate-500">{completedCount} of {tasks.length} · {completionPct}%</span>
        </div>
        <Progress value={completionPct}>
          <ProgressTrack className="h-2">
            <ProgressIndicator className="bg-emerald-500" />
          </ProgressTrack>
        </Progress>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
        <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(true)} className="gap-1.5 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
          <Plus className="h-3.5 w-3.5" />
          Add Action Item
        </Button>
        <span className="text-[10.5px] text-slate-400 dark:text-slate-500">
          Showing {pagedTasks.length} of {visibleTasks.length}
        </span>
      </div>

      <AddTaskDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        form={form}
        onFormChange={(key, val) => setForm((prev) => ({ ...prev, [key]: val }))}
        onSubmit={handleAddTask}
      />
    </SectionCard>
  );
}
