"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BookOpenText, CheckCircle2, ChevronDown, FileX, LayoutGrid } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import EmptyState from "@/components/common/EmptyState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { mentors } from "./projectsData";

/* ---------- content blocks ---------- */

function Dot({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn("mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full", className)}
    />
  );
}

function TextBlock({ content }) {
  return (
    <div className="space-y-2.5">
      {content.map((paragraph, i) => (
        <p key={i} className="max-w-4xl text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function ListBlock({ content }) {
  return (
    <ul className="space-y-2">
      {content.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300"
        >
          <Dot className="bg-slate-300 dark:bg-slate-600" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ChecklistBlock({ content }) {
  return (
    <ul className="space-y-2">
      {content.map((item, i) => (
        <li
          key={i}
          className="flex items-center gap-2.5 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700 dark:bg-slate-800/50 dark:text-slate-300"
        >
          <CheckCircle2
            className="h-3.5 w-3.5 shrink-0 text-indigo-500 dark:text-indigo-400"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function PointsBlock({ content }) {
  return (
    <ul className="space-y-4">
      {content.map((point, i) => (
        <li key={i} className="flex items-start gap-3">
          <Dot className="mt-1.5 bg-indigo-500" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">{point.title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {point.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function GroupsBlock({ content }) {
  return (
    <div className="space-y-4">
      {content.map((group, i) => (
        <div key={i} className="flex items-start gap-3">
          <Dot className="mt-1.5 bg-indigo-500" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">{group.title}</p>
            <ul className="mt-1.5 space-y-1.5">
              {group.items.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function StepsBlock({ content }) {
  return (
    <ol className="space-y-2.5">
      {content.map((step, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300"
        >
          <span
            aria-hidden="true"
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
          >
            {i + 1}
          </span>
          <span className="pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  );
}

const BLOCKS = {
  text: TextBlock,
  list: ListBlock,
  checklist: ChecklistBlock,
  points: PointsBlock,
  groups: GroupsBlock,
  steps: StepsBlock,
};

/* ---------- section ---------- */

export default function ProjectDocumentation({ project }) {
  const doc = project?.documentation;
  const sections = doc?.sections ?? [];
  const mentor = mentors[project?.mentorId];

  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);
  const scrollRef = useRef(null);
  const sectionRefs = useRef({});
  const chipsRef = useRef(null);
  const chipRefs = useRef({});

  // Reset to the top whenever a different project is selected.
  useEffect(() => {
    setActiveId(sections[0]?.id ?? null);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id]);

  // Keep the active chip visible in the horizontally scrolling tab row.
  useEffect(() => {
    const row = chipsRef.current;
    const chip = chipRefs.current[activeId];
    if (!row || !chip || row.offsetWidth === 0) return;
    row.scrollTo({
      left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [activeId]);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container || !sections.length) return;

    const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 4;
    if (atBottom) {
      setActiveId(sections[sections.length - 1].id);
      return;
    }

    let current = sections[0].id;
    for (const section of sections) {
      const el = sectionRefs.current[section.id];
      if (el && el.offsetTop - 24 <= container.scrollTop) current = section.id;
    }
    setActiveId(current);
  }, [sections]);

  const goTo = (id) => {
    const container = scrollRef.current;
    const el = sectionRefs.current[id];
    if (!container || !el) return;
    setActiveId(id);
    container.scrollTo({ top: el.offsetTop - 16, behavior: "smooth" });
  };

  return (
    <SectionCard
      icon={BookOpenText}
      title="Project Documentation"
      description={
        doc ? `${project.name} • Shared by ${mentor?.name ?? "your mentor"}` : project?.name
      }
      iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
      action={
        doc ? (
          <div className="flex items-center gap-2">
            <span className="hidden text-[10.5px] text-slate-400 dark:text-slate-500 sm:inline">
              {doc.updatedLabel}
            </span>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              {doc.version}
            </span>
          </div>
        ) : null
      }
      contentClassName="p-0"
    >
      {!sections.length ? (
        <div className="p-5">
          <EmptyState
            icon={FileX}
            title="No documentation shared yet"
            description="Your mentor will add requirements and specs for this project here."
          />
        </div>
      ) : (
        <div className="@container">
          {/* Section dropdown + horizontal section tabs */}
          <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5 dark:border-slate-800 sm:px-5">
            <nav
              ref={chipsRef}
              aria-label="Documentation sections"
              className="relative flex min-w-0 flex-1 gap-1.5 overflow-x-auto"
            >
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  ref={(el) => {
                    chipRefs.current[section.id] = el;
                  }}
                  onClick={() => goTo(section.id)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 text-[11px] font-medium transition-colors",
                    activeId === section.id
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                  )}
                >
                  {section.title}
                </button>
              ))}
            </nav>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    aria-label="Browse all sections"
                    className="group flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  />
                }
              >
                <LayoutGrid
                  className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400"
                  aria-hidden="true"
                />
                All sections
                <span className="rounded-full bg-slate-100 px-1.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {sections.length}
                </span>
                <ChevronDown
                  className="h-3.5 w-3.5 text-slate-400 transition-transform group-data-[popup-open]:rotate-180"
                  aria-hidden="true"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={6}
                className="p-2"
                style={{ width: "min(36rem, calc(100vw - 2rem))" }}
              >
                <p className="px-2 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                  Jump to section
                </p>
                <div className="grid grid-cols-3 gap-1">
                  {sections.map((section, index) => {
                    const active = activeId === section.id;
                    return (
                      <DropdownMenuItem
                        key={section.id}
                        onClick={() => goTo(section.id)}
                        className={cn(
                          "items-start gap-2 rounded-lg px-2 py-1.5 text-[11px] leading-snug",
                          active
                            ? "bg-indigo-50 font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                            : "text-slate-600 dark:text-slate-300",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-px shrink-0 font-mono text-[9.5px] text-slate-400 dark:text-slate-500"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="line-clamp-2 min-w-0">{section.title}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Documentation content */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="relative max-h-[590px] min-w-0 space-y-3 overflow-y-auto overscroll-contain bg-slate-50/50 p-4 dark:bg-slate-900/20 sm:px-5"
          >
            {sections.map((section) => {
              const Block = BLOCKS[section.type] ?? ListBlock;
              return (
                <section
                  key={section.id}
                  id={`${project.id}-${section.id}`}
                  ref={(el) => {
                    sectionRefs.current[section.id] = el;
                  }}
                  className="rounded-xl border border-slate-200/70 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <h3 className="mb-3 text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                    {section.title}
                  </h3>
                  <Block content={section.content} />
                </section>
              );
            })}
          </div>
        </div>
      )}
    </SectionCard>
  );
}