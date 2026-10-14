"use client";

import Link from "next/link";
import {
  FolderKanban,
  Search,
  Sparkles,
  Upload,
  X,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
  "All",
  "In Progress",
  "Under Review",
  "Planning",
  "Completed",
];

export default function ProjectsHeader({
  searchQuery = "",
  setSearchQuery = () => {},
  selectedStatus = "All",
  setSelectedStatus = () => {},
  projectCount = 0,
}) {
  return (
    <section className="relative overflow-hidden rounded-xl bg-[#101426] px-6 py-7 text-white shadow-[0_18px_55px_-24px_rgba(15,23,42,0.55)] sm:px-8 sm:py-8 lg:px-10">
      <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-120px] right-[28%] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative flex flex-col gap-6">
        {/* Top title area */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium text-indigo-100">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              Your Internship Portfolio
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-200">
                <FolderKanban className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  Build momentum across every project.
                </h1>
                <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-300 sm:text-[15px]">
                  Track your modules, deliverables, roadmap phases, and mentor feedback all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search projects by title, tech stack, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 border-white/10 bg-white/10 pl-10 pr-9 text-xs text-white placeholder:text-slate-400 focus-visible:border-white/30 focus-visible:ring-white/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 transition-colors hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden text-xs font-medium text-slate-300 sm:inline">
                Status:
              </span>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="h-10 min-w-[140px] border-white/10 bg-white/10 text-xs text-white focus:ring-white/20">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status} className="text-xs">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="hidden items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 md:flex">
              <span>{projectCount} {projectCount === 1 ? "project" : "projects"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
