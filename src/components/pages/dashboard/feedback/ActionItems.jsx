"use client";

import { useState } from "react";
import {
  AlarmClock,
  CheckCircle2,
  Circle,
  ListChecks,
  Plus,
  User,
  Sparkles,
  X,
  Trash2,
  Flag,
} from "lucide-react";

const defaultItems = [
  {
    id: 1,
    title: "Implement User Authentication & JWT validation",
    completed: false,
    priority: "High",
    assignedTo: "You",
    dueDate: "Due Today",
    overdue: true,
  },
  {
    id: 2,
    title: "Refactor API response structure for dashboard metrics",
    completed: true,
    priority: "Medium",
    assignedTo: "Sarah Mentor",
    dueDate: "Sep 10",
    overdue: false,
  },
];

export default function ActionItems({ items: initialItems, onToggle, onAdd }) {
  const [items, setItems] = useState(initialItems?.length ? initialItems : defaultItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", priority: "Medium", dueDate: "" });

  const currentItems = initialItems || items;
  const completed = currentItems.filter((i) => i.completed).length;
  const progress = currentItems.length ? Math.round((completed / currentItems.length) * 100) : 0;

  const handleToggle = (id) => {
    onToggle ? onToggle(id) : setItems((prev) => prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newItem = {
      id: Date.now(),
      title: form.title,
      completed: false,
      priority: form.priority,
      assignedTo: "You",
      dueDate: form.dueDate ? `Due ${form.dueDate}` : "Due Soon",
      overdue: false,
    };

    onAdd ? onAdd(newItem) : setItems([newItem, ...items]);
    setForm({ title: "", priority: "Medium", dueDate: "" });
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100/80 p-5 sm:p-6">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500/20">
              <ListChecks className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold tracking-tight text-slate-900 sm:text-base">Action Items</h3>
                {progress === 100 && currentItems.length > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                    <Sparkles className="h-3 w-3" /> All Done
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-slate-500">Complete improvements suggested by your mentor.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-3.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Item</span>
          </button>
        </div>

        <div className="p-5 space-y-5 sm:p-6">
          {/* Progress Card */}
          <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-slate-50/80 via-white to-indigo-50/30 p-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="uppercase tracking-wider text-slate-500">Overall Progress</span>
              <span className="font-mono text-slate-800">{completed} / {currentItems.length} <span className="text-indigo-600">({progress}%)</span></span>
            </div>
            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/60 p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-2.5">
            {currentItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200/80 p-8 text-center bg-slate-50/40">
                <ListChecks className="h-8 w-8 text-slate-300" />
                <p className="mt-2 text-xs font-bold text-slate-700">No action items yet</p>
                <p className="mt-1 text-[11px] text-slate-400">Click Add Item to create one.</p>
              </div>
            ) : (
              currentItems.map((item) => (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl border p-4 transition-all ${
                    item.completed
                      ? "border-emerald-200/60 bg-emerald-50/20 opacity-80"
                      : "border-slate-200/70 bg-white hover:border-indigo-300 hover:shadow-2xs"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      type="button"
                      onClick={() => handleToggle(item.id)}
                      className="mt-0.5 shrink-0 rounded-full transition-transform active:scale-90"
                    >
                      {item.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-slate-300 group-hover:text-indigo-600" />
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-xs font-bold leading-relaxed sm:text-sm ${item.completed ? "text-slate-400 line-through" : "text-slate-800"}`}>
                          {item.title}
                        </p>

                        <div className="flex items-center gap-2 shrink-0">
                          <PriorityBadge priority={item.priority} />
                          <button
                            type="button"
                            onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                            className="rounded-lg p-1 text-slate-300 hover:bg-rose-50 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all"
                            title="Delete Item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Item Tags */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-semibold">
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100/80 px-2 py-0.5 text-slate-600">
                          <User className="h-3 w-3 text-slate-400" /> {item.assignedTo || "You"}
                        </span>

                        {item.dueDate && (
                          <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono ${item.overdue && !item.completed ? "bg-rose-50 text-rose-600 border border-rose-200/60" : "bg-slate-100/80 text-slate-500"}`}>
                            <AlarmClock className="h-3 w-3" /> {item.dueDate}
                          </span>
                        )}

                        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 uppercase tracking-wider font-extrabold ${item.completed ? "bg-emerald-100/60 text-emerald-800" : "bg-indigo-50 text-indigo-700"}`}>
                          {item.completed ? "Completed" : "In Progress"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <h3 className="text-sm font-extrabold text-slate-900">Add New Action Item</h3>
              <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><X className="h-4 w-4" /></button>
            </div>

            <form onSubmit={handleAddItem} className="mt-4 space-y-4">
              <div>
                <label className="text-[10px] font-extrabold uppercase text-slate-500">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Update database schema"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-extrabold uppercase text-slate-500">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold uppercase text-slate-500">Due Date</label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200">Cancel</button>
                <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function PriorityBadge({ priority }) {
  const styles =
    priority === "High"
      ? "bg-rose-50 text-rose-700 border-rose-200/80"
      : priority === "Medium"
      ? "bg-amber-50 text-amber-700 border-amber-200/80"
      : "bg-slate-100 text-slate-600 border-slate-200/80";

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${styles}`}>
      <Flag className="h-2.5 w-2.5" />
      {priority || "Low"}
    </span>
  );
}